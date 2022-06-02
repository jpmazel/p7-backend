# backend
-La base de données est MySQL
-Elle est stockée dans le dossier "backupMySQL"
-Pour installer la base de donnée avec XAMPP et phpMyAdminIl faut :
    1-Il faut sous XAMPP lancer le module "Apache" et "MySQL" et cliquer sur Admin sur la ligne MySQL pour lancer         phpMyAdmin
    2-Sous phpMyAdmin, créer une nouvelle base de données et la sélectionner
    3-Sur l'onglet "Importer" et "Choisir un fichier" sélectionner le fichier dans le dossier "backupMySQL"

-Il faut créé un fichier .env à la racine pour les variables d'environnement. Les données sont dans le fichier .env.

-Après sous VSCode , il faut lancer le backend : `$ npm run start`

-Et après il faut lancer le serveur React du frontend

# Routes
Toutes les routes nécessitent une authentification par TOKEN
La documentation des routes : https://documenter.getpostman.com/view/12219452/Uz5FHvvV



