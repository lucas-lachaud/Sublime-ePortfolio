const texts = {
    fr: {
        rights: 'Tous droits réservés.', languageLabel: 'Choisir la langue', about: 'À propos', projects: 'Projets', contact: 'Contact',
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
    },
    en: {
        rights: 'All rights reserved.', languageLabel: 'Choose language', about: 'About', projects: 'Projects', contact: 'Contact',
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
    }
};

const buttons = document.querySelectorAll('[data-lang]');
const panels = [...document.querySelectorAll('.panel')];

function setLanguage(language) {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        element.textContent = texts[language][element.dataset.i18n];
    });
    document.querySelector('.language-switch').setAttribute('aria-label', texts[language].languageLabel);

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

let scrollScheduled = false;
function updateActivePanel() {
    const threshold = window.innerHeight * .55;
    let active = panels[0];
    panels.forEach((panel) => {
        if (panel.getBoundingClientRect().top <= threshold) active = panel;
    });
    panels.forEach((panel) => panel.classList.toggle('is-active', panel === active));
    scrollScheduled = false;
}

function schedulePanelUpdate() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(updateActivePanel);
}

window.addEventListener('scroll', schedulePanelUpdate, { passive: true });
window.addEventListener('resize', schedulePanelUpdate);

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
    // Le français reste la langue par défaut.
}
setLanguage(savedLanguage === 'en' ? 'en' : 'fr');
updateActivePanel();
document.documentElement.classList.add('motion-ready');
