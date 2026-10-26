const texts = {
    en: {
        rights: 'All rights reserved.', languageLabel: 'Choose language', navLabel: 'Main menu', journeyLabel: 'My journey',
        skip: 'Skip to content', journeyLink: 'See this step on my journey ↑',
        about: 'About', education: 'Education', experience: 'Experience', projects: 'Projects', skills: 'Skills', contact: 'Contact',
        heroMeta: 'Computer science engineering student · ENSEEIHT',
        heroText: 'From banking back-ends to cryptography.',
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
        nextText: "I'm looking for an internship for summer 2027.",
        nextLink: 'Get in touch →'
    },
    fr: {
        rights: 'Tous droits réservés.', languageLabel: 'Choisir la langue', navLabel: 'Menu principal', journeyLabel: 'Parcours',
        skip: 'Aller au contenu', journeyLink: 'Voir cette étape sur mon parcours ↑',
        about: 'À propos', education: 'Formation', experience: 'Expérience', projects: 'Projets', skills: 'Compétences', contact: 'Contact',
        heroMeta: 'Élève ingénieur en informatique · ENSEEIHT',
        heroText: 'Du back-end bancaire à la cryptographie.',
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
        nextText: "Je cherche un stage pour l'été 2027.",
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
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        element.textContent = texts[language][element.dataset.i18n];
    });
    document.querySelectorAll('[data-i18n-label]').forEach((element) => {
        element.setAttribute('aria-label', texts[language][element.dataset.i18nLabel]);
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

// Chaque section renvoie au moment du défilement où son étape s'affiche sur le globe.
document.querySelectorAll('[data-step]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const at = Number(link.dataset.step);
        const step = journey.querySelector(`[data-at="${link.dataset.step}"]`);
        event.preventDefault();
        setMenuOpen(false);

        if (journey.classList.contains('journey--animated')) {
            const stage = journey.querySelector('.journey__stage');
            const top = journey.getBoundingClientRect().top + window.scrollY;
            const span = journey.offsetHeight - stage.offsetHeight;
            window.scrollTo(0, Math.ceil(top + at * span) + 1);
        } else if (step) {
            step.scrollIntoView({ block: 'center' });
        }
    });
});

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
