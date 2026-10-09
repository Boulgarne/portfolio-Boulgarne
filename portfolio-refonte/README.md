# Portfolio de Zakaria Boulgarne — refonte

Site statique HTML/CSS/JavaScript, responsive, avec mode clair/sombre, animations légères, filtre de projets et fiches Markdown de veille.

## Lancer en local

Le navigateur doit servir les fichiers via HTTP pour que `fetch()` puisse lire `veille/index.json`. Depuis ce dossier, lance par exemple :

```bash
python -m http.server 8000
```

Puis ouvre `http://localhost:8000`.

## Personnaliser avant publication

1. **CV PDF** : ajoute ton PDF final sous `assets/documents/cv-zakaria-boulgarne.pdf`. Le contenu de CV affiché sur le site reprend le document joint au projet, mais doit être relu et corrigé par toi avant diffusion.
2. **Projets** : ouvre les fichiers `projets/*.html` et remplace les consignes provisoires par tes réalisations, tests et résultats. Les boutons PDF pointent vers `assets/documents/projets/` ; ajoute les PDF avec les noms présents dans les liens.
3. **Captures et schémas** : ajoute les images anonymisées dans `assets/img/`, puis remplace les zones pointillées dans les pages de projets par des images avec un texte alternatif.
4. **Veille** : suis `veille/README.md`, duplique `veille/modele-article.md`, complète la fiche et ajoute une entrée à `veille/index.json`.
5. **Contact** : l'adresse e-mail est configurée. Remplace le lien LinkedIn générique par ton profil réel. Le formulaire ouvre un logiciel e-mail ; ce n'est pas un envoi serveur.
6. **CV/compétences** : vérifie les dates, les niveaux et les outils avant publication. Les niveaux de compétences sont des repères visuels, pas des évaluations certifiées.
7. **Légal** : complète les mentions légales selon ta situation et vérifie la politique de confidentialité avant publication.

## Publier sur GitHub Pages

1. Décompresse l'archive.
2. Copie le contenu du dossier dans le dépôt `Boulgarne.github.io`, en sauvegardant au préalable les fichiers que tu souhaites conserver.
3. Vérifie les liens relatifs et teste le site localement.
4. Depuis GitHub, ouvre **Settings → Pages**, sélectionne la branche `main` et la racine `/ (root)`, puis enregistre.
5. Attends le déploiement et teste le site publié sur `https://boulgarne.github.io/`.
6. Pour un domaine personnalisé, achète/configure le domaine, ajoute-le dans les paramètres Pages et configure les DNS demandés par GitHub. Active HTTPS lorsque l'option est disponible.

## Limites à connaître

- Le site n'a pas de backend. Pas d'espace admin, pas d'envoi de formulaire serveur, pas d'import PDF automatisé. La veille se met à jour via les fichiers du dépôt.
- Les PDF sont volontairement absents : ajoute tes documents réels. Les liens de téléchargement sont préparés mais ne fonctionneront pas tant que les fichiers ne seront pas ajoutés.
- Les animations sont réduites automatiquement si le navigateur indique `prefers-reduced-motion`.
- Pour viser un score Lighthouse élevé, teste la version déployée, optimise les futures captures (WebP/AVIF), évite les scripts tiers inutiles et héberge les polices localement si nécessaire. Un score >90 ne peut pas être garanti sans mesure sur le site final.
