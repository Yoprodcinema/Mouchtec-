# Mouchtec — expérience interactive

Site statique français, sans dépendance : paysage alpin réactif au pointeur, neige animée, terrain de dessin à deux traces, illustration du virage télémark pilotée par un curseur. Les animations automatiques peuvent être désactivées et respectent la préférence de mouvement réduit.

Démarrage : `python3 -m http.server 8000 --bind 0.0.0.0` depuis le dossier du dépôt. GitHub Pages : branche main, dossier racine.

Le terrain utilise le pointeur ou le tactile ; les boutons permettent de montrer ou effacer une trace. Sur mobile, défiler hors du terrain. Le curseur de virage fonctionne aussi au clavier.

Les textes sont des propositions, le visuel alpin est généré. Les contacts, rendez-vous et informations historiques officiels restent à intégrer. Le lien du club renvoie vers le site existant.

Validation Chromium : dessin, démonstration, effacement, curseur clavier, désactivation du mouvement, mouvement réduit et absence de débordement horizontal à 390 px.
