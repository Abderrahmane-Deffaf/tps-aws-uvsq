# TDS et projets web

Ce depot regroupe plusieurs mini-projets realises autour de HTML/CSS, JavaScript et Node.js/Express.

Reference utile : [https://aws-uvsq.vercel.app/](https://aws-uvsq.vercel.app/)

## Vue d'ensemble

- `index.html`
  Page d'accueil du depot. Elle centralise les liens vers les differents projets.

- `1htmlcss/`
  Projet HTML/CSS contenant une page de CV/portfolio et une page de formulaire de recherche.

- `2javascript/`
  Mini-jeu de Puissance 4 realise en JavaScript avec gestion du plateau et du tour de jeu.

- `3app-reflecteur/`
  Application Node.js/Express servant de reflecteur HTTP. Elle affiche notamment la query string, le corps de requete, les en-tetes et les cookies recus.

- `4persistance-templates/`
  Projet Express avec templates Nunjucks. Il montre l'utilisation de formulaires, du rendu HTML cote serveur, des parametres d'URL et des cookies.

- `5persistance-server/`
  Application Express avec persistance SQLite. Elle gere l'inscription, la connexion, les sessions utilisateur et l'affichage d'une liste d'utilisateurs.

## Lancer les projets

- Pour les pages statiques, ouvrez `index.html` ou les fichiers HTML concernes dans le navigateur.
- Pour les projets Node.js (`3app-reflecteur`, `4persistance-templates`, `5persistance-server`), installez les dependances si besoin avec `npm install`, puis lancez le serveur avec `npm run dev` dans le dossier du projet.

## Objectif du depot

Ce depot sert de support de TD et de petits projets progressifs : commencer par des pages statiques simples, puis ajouter de l'interactivite en JavaScript, avant de passer a des applications serveur avec templates, cookies, sessions et base de donnees.
