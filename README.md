# Serveur Node avec Express

Ce projet est un template pour démarrer un serveur web en Node.js avec le framework Express.
Il utilise les technologies suivantes :

- Express : un framework web pour Node.js qui permet de créer des applications web et des API.
- ESLint : un outil d'analyse de code qui permet de détecter et de corriger les erreurs de syntaxe et de style. Il suit les règles du style guide Airbnb et utilise des double quotes pour les chaînes de caractères.
- PostgreSQL : un système de gestion de base de données relationnelle et open source. Il est utilisé avec le module PG, qui permet de se connecter et d'interagir avec la base de données depuis Node.js.
- Jest : un framework de test pour JavaScript qui permet de vérifier le bon fonctionnement du code.
- Supertest : une bibliothèque qui permet de tester les requêtes HTTP faites par le serveur.
- Joi : une bibliothèque qui permet de valider les données entrantes selon un schéma défini.
- Swagger : un outil qui permet de documenter et de tester les API.

## Installation

Pour installer le projet, vous devez avoir Node.js et PostgreSQL installés sur votre machine.
Vous pouvez ensuite suivre ces étapes :

- Cloner le dépôt GitHub du projet : `git clone https://github.com/O-clock-Gyoza/projet-13-footfinder-back`
- Se déplacer dans le dossier du projet : `cd template-serveur-node-express`
- Installer les dépendances : `npm install`
- Créer un fichier `.env` à la racine du projet, en suivant le modèle du fichier `.env.example` (ce fichier contient les variables d'environnement nécessaires au fonctionnement du projet, comme la chaîne de connexion à la base de données ou le port du serveur).
- Créer la base de données et les tables en exécutant le script SQL fourni dans le dossier db:create `psql -d footfinder -f data/seeding/structure.sql && npm run db:views && npm run db:functions`
- Lancer le serveur : `npm start`
- Lancer les tests : `npm test`
- Accéder à la documentation de l'API : `http://localhost:3000/api-docs`
