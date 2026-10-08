# Mouchtec — première proposition

Site statique en français : HTML, CSS et JavaScript, sans dépendance à installer.

## Démarrage

Depuis `/workspace/Mouchtec-` :

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

## Contenus

La direction artistique est alpine et cinématographique. Le visuel est une création générée, pas une photo du club. Les textes sont des propositions éditoriales. L’histoire officielle, les événements, les coordonnées et les modalités d’adhésion restent à intégrer : le site existant n’était pas accessible depuis l’environnement de travail.

Le bouton d’adhésion ouvre une information provisoire et un lien vers le site actuel ; aucun formulaire ni traitement de données n’est connecté.

## Validation

Affichage desktop et mobile (390 px), absence de débordement horizontal, navigation vers les chapitres, ouverture et fermeture de la fenêtre de contact, et absence d’erreurs JavaScript vérifiés avec Chromium et Playwright.
