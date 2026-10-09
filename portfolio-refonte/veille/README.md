# Ajouter une fiche de veille

Le portfolio lit la liste `index.json` puis récupère chaque fichier Markdown indiqué dans `file`.

## Étapes
1. Duplique `modele-article.md` et donne-lui un nom court, par exemple `securite-active-directory.md`.
2. Renseigne le titre, la date ISO (`AAAA-MM-JJ`), la source et les tags dans les métadonnées en haut du fichier.
3. Complète les sections Résumé, Points clés, Analyse personnelle et Application en BTS SIO.
4. Ajoute une entrée dans `index.json` : `{"file":"securite-active-directory.md","title":"Titre de la fiche","date":"2026-10-09","source":"Nom de la source"}`.
5. Enregistre les deux fichiers et pousse-les sur GitHub. La page de veille les affichera après publication.

## Conseils
- Privilégie les sources officielles et indique toujours la date de consultation.
- Sépare les faits de ton analyse personnelle.
- Ne copie pas un article : résume-le et cite la source originale.
- GitHub Pages est statique : il n'y a pas d'espace administrateur ni d'import direct depuis le navigateur.
