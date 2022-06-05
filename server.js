//importer le package HTTP de Node.js pour avoir les outils pour créé le serveur
const http = require("http");

//importer l'application app.js
const app = require("./app");

//importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

//paramètrage du port avec la méthode set de Express
app.set("port", process.env.PORT);

//La méthode createServer( ) prend en argument
//la fonction qui sera appelé à chaque requête reçu par le serveur
//ici les fonctions seront dans app.js
const server = http.createServer(app);

//le serveur écoute les requêtes sur le port
server.listen(
  process.env.PORT,
  console.log(`ecoute du port ${process.env.PORT}`)
);
