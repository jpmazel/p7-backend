# backend
-La base de données est `MySQL`
-Elle est stockée dans le dossier `backupMySQL`

-Pour installer la base de donnée avec `XAMPP` et `phpMyAdmin` ,il faut :
    1-Sous XAMPP lancer le module "Apache" et "MySQL" et cliquer sur Admin sur la ligne MySQL pour lancer phpMyAdmin
    2-Sous phpMyAdmin, créer une nouvelle base de données `reseau_social` et la sélectionner
    3-Sur l'onglet "Importer" et "Choisir un fichier" sélectionner le fichier dans le dossier "backupMySQL"

-Il faut créé un fichier `.env` à la racine pour les variables d'environnement. Les données à mettre dans ce fichier  sont dans le fichier `.env.example`

-Après sous VSCode, pour installer les packages : `npm install`

-Ne pas avoir oublié de créer le `.env `avec les bonnes données à l'intérieur avant de lancer le backend, et pour lancer le backend : ` npm run start`

-Et après il faut lancer le serveur React du frontend pour avoir accés à l'application Réseau Social

-Le cahier des charges est dans le dossier docs

# Routes
Toutes les routes nécessitent une authentification par TOKEN
La documentation des routes : https://documenter.getpostman.com/view/12219452/Uz5FHvvV



