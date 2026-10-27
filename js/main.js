const texts = {
    en: {
        rights: 'All rights reserved.', languageLabel: 'Choose language', navLabel: 'Main menu', journeyLabel: 'My journey',
        skip: 'Skip to content',
        about: 'About', education: 'Education', experience: 'Experience', projects: 'Projects', skills: 'Skills', contact: 'Contact',
        passionsTitle: 'Outside of computing',
        passionsIntro: "Even though computing is my passion, I'm above all a curious person, always eager to learn. I love understanding how the world works, which is why I have many different passions.",
        galleryHint: 'Click or tap a photo to see it full size.',
        astroTitle: 'Astronomy and astrophotography',
        astroText: 'I photograph nebulae and galaxies, such as the Carina Nebula, M83 and the Sombrero Galaxy (M104).',
        carina: 'Carina Nebula (NGC 3372)', orion: 'Orion Nebula (M42)', m83: 'Southern Pinwheel Galaxy (M83)',
        sombrero: 'Sombrero Galaxy (M104)', moon: 'The Moon',
        woodTitle: 'Woodwork',
        woodText: 'Building a wooden deck, from the frame to the decking boards.',
        deckFrame: 'The frame', deckBoards: 'Laying the decking boards', deckDone: 'The finished deck',
        elecTitle: 'Electronics and 3D printing',
        elecText: "I solder and 3D-print parts. I'm currently working on a BC-250 (an AMD board originally made for cryptocurrency mining) that I completely rebuilt and fully unlocked. I use it as a server that I can reach from anywhere with Tailscale.",
        bc250: 'BC-250 case, 3D model', bc250Open: 'BC-250 case, exploded view',
        financeTitle: 'Finance and markets',
        financeText: 'I was passionate about finance long before my internship, especially when it comes to tech companies such as Nvidia, AMD and Big Tech. I like following the markets because they help me understand the world and how it works, and they are closely tied to the news. I also invest personally, mostly in US markets. My internship at BCI confirmed this passion: I loved working in banking, where I also saw payment systems up close.',
        aviationTitle: 'Aviation',
        aviationText: 'I had started training for my private pilot licence (PPL), but had to stop because of the riots in New Caledonia. Aviation is still a big passion of mine.',
        amedee: 'Flying over the Amédée lighthouse', cdg: 'An Air France Boeing 777 at Paris-Charles de Gaulle', sydney: 'Over Sydney',
        viewerLabel: 'Photo viewer', close: 'Close', previous: 'Previous', next: 'Next',
        heroMeta: 'Computer science engineering student · ENSEEIHT',
        heroText: 'From Nouméa to Toulouse: 17,200 km to become an engineer.',
        scrollHint: 'Scroll',
        noumeaText: 'New Caledonia. This is where it all begins.',
        licenceMeta: '2024 · University of New Caledonia',
        licenceTitle: "Bachelor's in Computer Science",
        licenceText: 'Tutored project: a 4096-bit RSA library in C, hardened against side-channel attacks.',
        bciMeta: 'Oct. 2025 – Jan. 2026 · Internship',
        bciTitle: 'Full stack developer',
        bciText: "Banque Calédonienne d'Investissement, BCInet online banking. Angular, Spring Boot, Spring Batch, Liquibase, Azure DevOps.",
        degreeMeta: 'June 2026 · Graduation',
        degreeTitle: 'Top of the class',
        degreeText: "Bachelor's degree with highest honours.",
        flightTitle: 'Heading to Toulouse',
        n7Meta: '2026 – 2028 · 43°36′N 1°27′E',
        n7Text: 'Engineering degree in computer science, Toulouse INP. Admitted directly into second year.',
        nextMeta: "What's next?",
        nextTitle: 'Next step',
        nextText: "I'm looking for an internship for summer 2027, and I'd be glad to talk with you about it.",
        nextLink: 'Get in touch →'
    },
    fr: {
        rights: 'Tous droits réservés.', languageLabel: 'Choisir la langue', navLabel: 'Menu principal', journeyLabel: 'Parcours',
        skip: 'Aller au contenu',
        about: 'À propos', education: 'Formation', experience: 'Expérience', projects: 'Projets', skills: 'Compétences', contact: 'Contact',
        passionsTitle: "En dehors de l'informatique",
        passionsIntro: "Même si l'informatique est ma passion, je suis avant tout quelqu'un de curieux, toujours en quête de savoir. J'aime comprendre comment le monde fonctionne, c'est pourquoi j'ai beaucoup de passions, diverses et variées.",
        galleryHint: 'Cliquez ou touchez une photo pour la voir en grand.',
        astroTitle: 'Astronomie et astrophotographie',
        astroText: 'Je photographie des nébuleuses et des galaxies, comme la nébuleuse de la Carène, M83 ou la galaxie du Sombrero (M104).',
        carina: 'Nébuleuse de la Carène (NGC 3372)', orion: "Nébuleuse d'Orion (M42)", m83: 'Galaxie du Moulinet austral (M83)',
        sombrero: 'Galaxie du Sombrero (M104)', moon: 'La Lune',
        woodTitle: 'Travail du bois',
        woodText: "La construction d'une terrasse en bois, de l'ossature à la pose des lames.",
        deckFrame: "L'ossature", deckBoards: 'La pose des lames', deckDone: 'La terrasse terminée',
        elecTitle: 'Électronique et impression 3D',
        elecText: "Je fais de la soudure et j'imprime des pièces en 3D. En ce moment, je travaille sur une BC-250 (une carte AMD conçue à l'origine pour le minage de cryptomonnaies), que j'ai entièrement refaite et débloquée. Je m'en sers comme serveur, accessible de partout grâce à Tailscale.",
        bc250: 'Boîtier de la BC-250, modèle 3D', bc250Open: 'Boîtier de la BC-250, vue éclatée',
        financeTitle: 'Finance et marchés',
        financeText: "La finance me passionnait bien avant mon stage, surtout tout ce qui touche aux entreprises de la tech, comme Nvidia, AMD ou les GAFAM. J'aime suivre les marchés, parce qu'ils aident à comprendre le monde et son fonctionnement, et qu'ils sont étroitement liés à l'actualité. J'investis d'ailleurs à titre personnel, surtout sur les marchés américains. Mon stage à la BCI a confirmé cette passion : j'ai adoré travailler dans le secteur bancaire, où j'ai aussi pu voir de près les systèmes de paiement.",
        aviationTitle: 'Aviation',
        aviationText: "J'avais commencé ma formation de pilote privé (PPL), mais j'ai dû l'arrêter à cause des émeutes en Nouvelle-Calédonie. L'aviation reste une grande passion.",
        amedee: 'En vol au-dessus du phare Amédée', cdg: "Un Boeing 777 d'Air France à Paris-Charles-de-Gaulle", sydney: 'Au-dessus de Sydney',
        viewerLabel: 'Visionneuse de photos', close: 'Fermer', previous: 'Précédente', next: 'Suivante',
        heroMeta: 'Élève ingénieur en informatique · ENSEEIHT',
        heroText: 'De Nouméa à Toulouse, 17 200 km pour devenir ingénieur.',
        scrollHint: 'Faites défiler',
        noumeaText: "Nouvelle-Calédonie. C'est ici que tout commence.",
        licenceMeta: '2024 · Université de la Nouvelle-Calédonie',
        licenceTitle: 'Licence Informatique',
        licenceText: 'Projet tutoré : une bibliothèque RSA 4096 bits en C, résistante aux attaques par canaux auxiliaires.',
        bciMeta: 'Oct. 2025 – janv. 2026 · Stage',
        bciTitle: 'Développeur full stack',
        bciText: "Banque Calédonienne d'Investissement, plateforme BCInet. Angular, Spring Boot, Spring Batch, Liquibase, Azure DevOps.",
        degreeMeta: 'Juin 2026 · Diplôme',
        degreeTitle: 'Major de promotion',
        degreeText: 'Licence obtenue avec mention Très Bien.',
        flightTitle: 'Direction Toulouse',
        n7Meta: '2026 – 2028 · 43°36′N 1°27′E',
        n7Text: "Diplôme d'ingénieur en informatique, Toulouse INP. Admis directement en deuxième année.",
        nextMeta: 'Et ensuite ?',
        nextTitle: 'Prochaine étape',
        nextText: "Je suis à la recherche d'un stage pour l'été 2027 : je serais ravi d'en discuter avec vous.",
        nextLink: 'Me contacter →'
    }
};

const buttons = document.querySelectorAll('[data-lang]');
const header = document.querySelector('.site-header');
const journey = document.querySelector('.journey');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = navLinks.map((link) => document.querySelector(link.hash));

function setLanguage(language) {
    // Une clé absente (ancien script encore en cache) laisse le texte du HTML en place.
    const text = (key, fallback) => texts[language][key] ?? fallback;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        element.textContent = text(element.dataset.i18n, element.textContent);
    });
    document.querySelectorAll('[data-i18n-label]').forEach((element) => {
        element.setAttribute('aria-label', text(element.dataset.i18nLabel, element.getAttribute('aria-label')));
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
        element.alt = text(element.dataset.i18nAlt, element.alt);
    });
    document.querySelectorAll('[data-only]').forEach((element) => {
        element.hidden = element.dataset.only !== language;
    });

    buttons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.lang === language));
    });

    try {
        localStorage.setItem('portfolio-language', language);
    } catch (_) {
        // Le choix reste actif pour cette page si le stockage est indisponible.
    }
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let pendingLanguage = null;
let switchingLanguage = false;

async function changeLanguage(language) {
    pendingLanguage = language;
    if (switchingLanguage) return;
    switchingLanguage = true;

    while (pendingLanguage !== null) {
        const next = pendingLanguage;
        pendingLanguage = null;
        if (next === document.documentElement.lang) continue;

        if (document.startViewTransition && !reducedMotion.matches) {
            try {
                await document.startViewTransition(() => setLanguage(next)).finished;
            } catch (_) {
                setLanguage(next);
            }
        } else {
            setLanguage(next);
        }
    }

    switchingLanguage = false;
}

buttons.forEach((button) => {
    button.addEventListener('click', () => changeLanguage(button.dataset.lang));
});

// Menu replié (sous 1100px) : bouton « Menu », fermeture par Échap, clic à l'extérieur ou choix d'un lien.
function setMenuOpen(open, returnFocus = false) {
    menuToggle.setAttribute('aria-expanded', String(open));
    header.classList.toggle('is-open', open);
    if (!open && returnFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
navLinks.forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) setMenuOpen(false, true);
});

document.addEventListener('click', (event) => {
    if (header.classList.contains('is-open') && !header.contains(event.target)) setMenuOpen(false);
});

window.matchMedia('(min-width: 1100px)').addEventListener('change', () => setMenuOpen(false));

// Après le parcours seulement : l'en-tête revient en petite barre fixe et suit la section affichée.
let scrollScheduled = false;
function updateHeader() {
    scrollScheduled = false;
    const docked = journey.getBoundingClientRect().bottom <= 0;
    if (docked !== header.classList.contains('is-docked')) {
        header.classList.toggle('is-docked', docked);
        setMenuOpen(false);
    }

    const threshold = window.innerHeight * .4;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let current = null;
    sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= threshold) current = section;
    });
    if (atBottom && sections.at(-1).getBoundingClientRect().top < window.innerHeight) current = sections.at(-1);

    navLinks.forEach((link, i) => {
        if (sections[i] === current) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
    });
}

function scheduleHeaderUpdate() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(updateHeader);
}

window.addEventListener('scroll', scheduleHeaderUpdate, { passive: true });
window.addEventListener('resize', scheduleHeaderUpdate);

// Visionneuse : s'ouvre sur la vignette déjà chargée, passe à la grande image dès qu'elle arrive.
// Le bouton Retour du navigateur (ou du téléphone) la referme au lieu de quitter la page.
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('.lightbox__img');
const lightboxCaption = lightbox.querySelector('.lightbox__caption');
const lightboxCount = lightbox.querySelector('.lightbox__count');
let lightboxLinks = [];
let lightboxIndex = 0;
let lightboxTrigger = null;
let lightboxClosing = false;

function showPhoto(index) {
    lightboxIndex = (index + lightboxLinks.length) % lightboxLinks.length;
    const link = lightboxLinks[lightboxIndex];
    const thumbnail = link.querySelector('img');
    const full = link.href;
    lightboxImage.src = thumbnail.currentSrc || thumbnail.src;
    lightboxImage.alt = thumbnail.alt;
    lightboxCaption.textContent = link.closest('figure').querySelector('figcaption').textContent;
    lightboxCount.textContent = `${lightboxIndex + 1} / ${lightboxLinks.length}`;

    const loader = new Image();
    loader.onload = () => { if (lightboxLinks[lightboxIndex] === link) lightboxImage.src = full; };
    loader.src = full;
}

function openLightbox(link) {
    lightboxLinks = [...link.closest('.gallery__grid').querySelectorAll('a')];
    lightboxTrigger = link;
    showPhoto(lightboxLinks.indexOf(link));
    history.pushState({ lightbox: true }, '');
    document.documentElement.classList.add('has-lightbox');
    lightbox.showModal();
    requestAnimationFrame(() => lightbox.classList.add('is-visible'));
}

function finishClose() {
    if (!lightbox.open || lightboxClosing) return;
    lightboxClosing = true;
    lightbox.classList.remove('is-visible');
    setTimeout(() => {
        lightbox.close();
        lightboxClosing = false;
    }, reducedMotion.matches ? 0 : 250);
}

// Fermer revient d'une entrée dans l'historique ; c'est l'événement popstate qui referme la visionneuse.
function requestClose() {
    if (history.state?.lightbox) history.back();
    else finishClose();
}

// Sans <dialog> (très vieux navigateurs), le lien ouvre simplement l'image.
if (typeof lightbox.showModal === 'function') {
    document.querySelectorAll('.gallery__grid a').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            openLightbox(link);
        });
    });
}

lightbox.querySelector('.lightbox__close').addEventListener('click', requestClose);
lightbox.querySelector('.lightbox__prev').addEventListener('click', () => showPhoto(lightboxIndex - 1));
lightbox.querySelector('.lightbox__next').addEventListener('click', () => showPhoto(lightboxIndex + 1));
window.addEventListener('popstate', finishClose);

lightbox.addEventListener('cancel', (event) => {
    event.preventDefault();
    requestClose();
});

lightbox.addEventListener('close', () => {
    document.documentElement.classList.remove('has-lightbox');
    lightbox.classList.remove('is-visible');
    lightboxClosing = false;
    if (history.state?.lightbox) history.back();
    lightboxTrigger?.focus();
});

// Clic sur le fond sombre : on ferme.
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.classList.contains('lightbox__stage')) requestClose();
});

lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showPhoto(lightboxIndex - 1);
    if (event.key === 'ArrowRight') showPhoto(lightboxIndex + 1);
});

let touchStartX = null;
lightbox.addEventListener('touchstart', (event) => { touchStartX = event.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) > 50) showPhoto(lightboxIndex + (distance < 0 ? 1 : -1));
});

const clocks = [...document.querySelectorAll('[data-clock]')].map((element) => ({
    element,
    format: new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: element.dataset.clock })
}));

function updateClocks() {
    const now = new Date();
    clocks.forEach(({ element, format }) => { element.textContent = format.format(now); });
    // Prochaine mise à jour au début de la minute suivante.
    setTimeout(updateClocks, 60000 - (now.getTime() % 60000) + 50);
}

if (clocks.length) updateClocks();

let savedLanguage;
try {
    savedLanguage = localStorage.getItem('portfolio-language');
} catch (_) {
    // L'anglais reste la langue par défaut.
}
setLanguage(savedLanguage === 'fr' ? 'fr' : 'en');
updateHeader();
