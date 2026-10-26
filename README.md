# Sublime-ePortfolio

Mon portfolio personnel : de Nouméa à Toulouse, sur un globe qui tourne au fil du défilement.

Lucas Lachaud, élève ingénieur à l'ENSEEIHT (Toulouse INP), filière Systèmes et Réseaux (ASR). Le site présente mon parcours, ma formation, mon stage à la BCI, mon projet de bibliothèque RSA en C et mes compétences, en anglais et en français.

Site statique en HTML, CSS et JavaScript, sans framework ni dépendance. Le globe est dessiné dans un `<canvas>` à partir des contours de Natural Earth (domaine public).

## Voir le site en local

Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur :

```bash
python3 -m http.server 8000
```

puis aller sur http://localhost:8000.

## Organisation

- `index.html` : la page et son contenu
- `css/style.css` : les styles
- `js/main.js` : langue, menu, horloges
- `js/globe.js` : le globe et l'animation du parcours
- `js/land.js` : les contours des continents
