(() => {
    const RAD = Math.PI / 180;
    const EARTH_RADIUS_KM = 6371;
    const NOUMEA = [166.458, -22.276];
    const TOULOUSE = [1.444, 43.605];
    const EXTRA_ZOOM = .75;
    const CAMERA_TILT = 18;

    const section = document.querySelector('.journey');
    const canvas = section?.querySelector('.journey__globe');

    const clamp = (x, min = 0, max = 1) => Math.min(max, Math.max(min, x));
    const smooth = (from, to, x) => { const t = clamp((x - from) / (to - from)); return t * t * (3 - 2 * t); };

    function toVector([lon, lat]) {
        const l = lon * RAD, p = lat * RAD;
        return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
    }

    function toLonLat([x, y, z]) {
        return [Math.atan2(x, z) / RAD, Math.asin(clamp(y, -1, 1)) / RAD];
    }

    // Lignes stockées à plat : xyz de chaque point + index de début de chaque ligne.
    function buildLines(lines) {
        const count = lines.reduce((sum, line) => sum + line.length, 0);
        const points = new Float32Array(count * 3);
        const starts = new Uint32Array(lines.length + 1);
        let n = 0;
        lines.forEach((line, i) => {
            starts[i] = n;
            for (const coordinates of line) points.set(toVector(coordinates), 3 * n++);
        });
        starts[lines.length] = n;
        return { points, starts };
    }

    function decodeLand(encoded) {
        return encoded.map((deltas) => {
            const line = [];
            let lon = 0, lat = 0;
            for (let i = 0; i < deltas.length; i += 2) {
                lon += deltas[i]; lat += deltas[i + 1];
                line.push([lon / 10, lat / 10]);
            }
            return line;
        });
    }

    function graticule(step = 30) {
        const lines = [];
        for (let lon = -180; lon < 180; lon += step) {
            const line = [];
            for (let lat = -80; lat <= 80; lat += 2) line.push([lon, lat]);
            lines.push(line);
        }
        for (let lat = -60; lat <= 60; lat += step) {
            const line = [];
            for (let lon = -180; lon <= 180; lon += 2) line.push([lon, lat]);
            lines.push(line);
        }
        return lines;
    }

    const start = toVector(NOUMEA);
    const end = toVector(TOULOUSE);
    const omega = Math.acos(start[0] * end[0] + start[1] * end[1] + start[2] * end[2]);
    const distanceKm = omega * EARTH_RADIUS_KM;

    // Point du grand cercle Nouméa → Toulouse à la fraction t.
    function routeAt(t) {
        const a = Math.sin((1 - t) * omega) / Math.sin(omega);
        const b = Math.sin(t * omega) / Math.sin(omega);
        return [a * start[0] + b * end[0], a * start[1] + b * end[1], a * start[2] + b * end[2]];
    }

    function utcOffset(timeZone) {
        const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' })
            .formatToParts(new Date()).find((part) => part.type === 'timeZoneName')?.value ?? '';
        return Number(/GMT([+-]\d+)/.exec(name)?.[1] ?? 0);
    }

    if (section && canvas) {
        const land = buildLines(decodeLand(window.LAND_LINES));
        const grid = buildLines(graticule());
        const steps = [...section.querySelectorAll('[data-at]')];
        const kmOutput = section.querySelector('[data-km]');
        const tzOutput = section.querySelector('[data-tz]');
        const offsetStart = utcOffset('Pacific/Noumea');
        const offsetEnd = utcOffset('Europe/Paris');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const ctx = canvas.getContext('2d');

        const css = getComputedStyle(document.documentElement);
        const color = (name) => css.getPropertyValue(name).trim();
        const colors = {
            land: color('--globe-land'), grid: color('--globe-grid'), limb: color('--globe-limb'),
            accent: color('--accent'), fg: color('--fg'), muted: color('--muted')
        };

        let width = 0, height = 0, dpr = 1;
        let sectionTop = 0, scrollSpan = 1;
        let progress = -1, activeStep = -1, visible = true, queued = false;
        let numberFormat = null, numberLang = '';

        // Vue courante : centre et rayon à l'écran, rotation qui amène `center` face à nous.
        const view = { cx: 0, cy: 0, r: 0, cl: 1, sl: 0, cp: 1, sp: 0 };

        function setView(center, zoom) {
            const [lon, lat] = toLonLat(center);
            const animated = section.classList.contains('journey--animated');
            let base;
            if (animated && width >= 900) {
                view.cx = width * .66; view.cy = height * .5; base = Math.min(width * .28, height * .38);
            } else if (animated) {
                view.cx = width * .5; view.cy = height * .34; base = Math.min(width * .42, height * .26);
            } else {
                view.cx = width * .5; view.cy = height * .5; base = Math.min(width, height) * .44;
            }
            view.r = base * zoom;
            view.cl = Math.cos(lon * RAD); view.sl = Math.sin(lon * RAD);
            view.cp = Math.cos(lat * RAD); view.sp = Math.sin(lat * RAD);
        }

        // Projection orthographique d'un vecteur unitaire → [x, y, profondeur] (profondeur > 0 = face visible).
        function project(x, y, z, out) {
            const x1 = x * view.cl - z * view.sl;
            const z1 = z * view.cl + x * view.sl;
            out[0] = x1;
            out[1] = y * view.cp - z1 * view.sp;
            out[2] = y * view.sp + z1 * view.cp;
            return out;
        }

        const cur = new Float32Array(3);
        const prev = new Float32Array(3);
        const toScreenX = (x) => view.cx + view.r * x;
        const toScreenY = (y) => view.cy - view.r * y;

        // Trace les lignes en coupant proprement au bord de la sphère.
        function trace({ points, starts }, from = 0, to = starts.length - 1) {
            for (let s = from; s < to; s++) {
                for (let i = starts[s]; i < starts[s + 1]; i++) {
                    project(points[3 * i], points[3 * i + 1], points[3 * i + 2], cur);
                    const shown = cur[2] > 0;
                    if (i === starts[s]) {
                        if (shown) ctx.moveTo(toScreenX(cur[0]), toScreenY(cur[1]));
                    } else if (shown && prev[2] > 0) {
                        ctx.lineTo(toScreenX(cur[0]), toScreenY(cur[1]));
                    } else if (shown || prev[2] > 0) {
                        const k = prev[2] / (prev[2] - cur[2]);
                        let ex = prev[0] + (cur[0] - prev[0]) * k;
                        let ey = prev[1] + (cur[1] - prev[1]) * k;
                        const n = Math.hypot(ex, ey) || 1;
                        ex /= n; ey /= n;
                        if (shown) {
                            ctx.moveTo(toScreenX(ex), toScreenY(ey));
                            ctx.lineTo(toScreenX(cur[0]), toScreenY(cur[1]));
                        } else {
                            ctx.lineTo(toScreenX(ex), toScreenY(ey));
                        }
                    }
                    prev.set(cur);
                }
            }
        }

        const ROUTE_SAMPLES = 160;
        const route = { points: new Float32Array((ROUTE_SAMPLES + 1) * 3), starts: new Uint32Array(2) };

        function traceRoute(from, to) {
            const samples = Math.max(2, Math.ceil((to - from) * ROUTE_SAMPLES));
            for (let i = 0; i <= samples; i++) route.points.set(routeAt(from + (to - from) * i / samples), 3 * i);
            route.starts[1] = samples + 1;
            trace(route);
        }

        function drawCity(vector, label) {
            project(vector[0], vector[1], vector[2], cur);
            if (cur[2] <= 0) return;
            const x = toScreenX(cur[0]), y = toScreenY(cur[1]);
            ctx.globalAlpha = clamp(cur[2] * 4);
            ctx.fillStyle = colors.accent;
            ctx.beginPath();
            ctx.arc(x, y, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = colors.muted;
            ctx.fillText(label, x + 10, y - 8);
            ctx.globalAlpha = 1;
        }

        function drawPlane(t) {
            const a = routeAt(t), b = routeAt(Math.min(1, t + .003));
            project(a[0], a[1], a[2], cur);
            project(b[0], b[1], b[2], prev);
            if (cur[2] <= 0) return;
            const x = toScreenX(cur[0]), y = toScreenY(cur[1]);
            const angle = Math.atan2(toScreenY(prev[1]) - y, toScreenX(prev[0]) - x);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fillStyle = colors.fg;
            ctx.beginPath();
            ctx.moveTo(10, 0);
            ctx.lineTo(3, -1.6); ctx.lineTo(-2, -9); ctx.lineTo(-4.5, -9); ctx.lineTo(-1.5, -1.6);
            ctx.lineTo(-6.5, -1.6); ctx.lineTo(-9, -4.5); ctx.lineTo(-10.5, -4.5); ctx.lineTo(-9, 0);
            ctx.lineTo(-10.5, 4.5); ctx.lineTo(-9, 4.5); ctx.lineTo(-6.5, 1.6);
            ctx.lineTo(-1.5, 1.6); ctx.lineTo(-4.5, 9); ctx.lineTo(-2, 9); ctx.lineTo(3, 1.6);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        function draw(p) {
            const zoomIn = smooth(.06, .2, p);
            const flight = smooth(.46, .84, p);
            const outro = smooth(.9, 1, p);
            const zoom = 1 + EXTRA_ZOOM * zoomIn * (1 - Math.sin(Math.PI * flight)) * (1 - outro);
            // Caméra décalée vers le sud en vol et à la fin pour que la trajectoire s'affiche en arc.
        const [lon, lat] = toLonLat(routeAt(flight - .5 * outro));
        const tilt = CAMERA_TILT * (Math.sin(Math.PI * flight) * (1 - outro) + 1.4 * outro);
        setView(toVector([lon, lat - tilt]), zoom);

            ctx.clearRect(0, 0, width, height);
            ctx.lineJoin = 'round';

            ctx.beginPath();
            trace(grid);
            ctx.strokeStyle = colors.grid; ctx.lineWidth = 1; ctx.stroke();

            ctx.beginPath();
            ctx.arc(view.cx, view.cy, view.r, 0, Math.PI * 2);
            ctx.strokeStyle = colors.limb; ctx.stroke();

            ctx.beginPath();
            trace(land);
            ctx.strokeStyle = colors.land; ctx.lineWidth = .8; ctx.stroke();

            ctx.beginPath();
            traceRoute(flight, 1);
            ctx.setLineDash([2, 5]);
            ctx.strokeStyle = colors.muted; ctx.lineWidth = 1; ctx.stroke();
            ctx.setLineDash([]);

            if (flight > 0) {
                ctx.beginPath();
                traceRoute(0, flight);
                ctx.strokeStyle = colors.accent; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke();
            }

            drawCity(start, 'NOUMÉA');
            drawCity(end, 'TOULOUSE');
            if (flight > 0 && flight < 1) drawPlane(flight);

            return flight;
        }

        function updateText(p, flight) {
            let index = 0;
            steps.forEach((step, i) => { if (p >= Number(step.dataset.at)) index = i; });
            if (index !== activeStep) {
                steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
                activeStep = index;
            }
            const lang = document.documentElement.lang;
            if (lang !== numberLang) { numberFormat = new Intl.NumberFormat(lang); numberLang = lang; }
            if (kmOutput) kmOutput.textContent = numberFormat.format(Math.round(distanceKm * flight / 10) * 10);
            if (tzOutput) {
                const offset = Math.round(offsetStart + (offsetEnd - offsetStart) * flight);
                tzOutput.textContent = `UTC${offset >= 0 ? '+' : '−'}${Math.abs(offset)}`;
            }
        }

        function render() {
            queued = false;
            const animated = section.classList.contains('journey--animated');
            const p = animated ? clamp((window.scrollY - sectionTop) / scrollSpan) : 1;
            if (p === progress) return;
            progress = p;
            updateText(p, draw(p));
        }

        function schedule(force = false) {
            if (force) progress = -1;
            if (queued || (!visible && !force)) return;
            queued = true;
            requestAnimationFrame(render);
        }

        function measure() {
            const box = canvas.parentElement.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = box.width; height = box.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = `11px ${color('--font-mono')}`;
            const stage = section.querySelector('.journey__stage');
            sectionTop = section.getBoundingClientRect().top + window.scrollY;
            scrollSpan = Math.max(1, section.offsetHeight - stage.offsetHeight);
            schedule(true);
        }

        function applyMotionPreference() {
            section.classList.toggle('journey--animated', !reducedMotion.matches);
            measure();
        }

        new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) schedule();
        }).observe(section);
        new ResizeObserver(measure).observe(canvas.parentElement);
        window.addEventListener('scroll', () => schedule(), { passive: true });
        reducedMotion.addEventListener('change', applyMotionPreference);
        new MutationObserver(() => schedule(true)).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

        applyMotionPreference();
    }
})();
