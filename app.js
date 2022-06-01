//importation de express
const express = require("express");

//importation de morgan (logger http);
const morgan = require("morgan");

// //importation connexion base de donnée mongoDB
// const mongoose = require("./db/db");

//importation connexion base de donnée mysql
const mysql = require("./db/db.mysql");

//importation des routes
const userRoutes = require("./routes/user");
const ficheUserRoutes = require("./routes/ficheUser");
const postsRoutes = require("./routes/posts");

//importation node.js utilitaires pour travailler avec les chemins de fichiers et de répertoires
const path = require('path');

//pour créer une application express
const app = express();

//logger les requests et les responses
app.use(morgan("dev"));

// //debug mongoose
// console.log("--->debug logger mongoose");
// mongoose.set('debug', true);

//gérer les problèmes de CORS (Cross-Origin Request Sharing)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//transformer le corps (le body) en json objet javascript utilisable req.body
app.use(express.json());

//la route d'authentification 
app.use("/api/authentification", userRoutes);

//la route de la fiche user
app.use("/api/fiche_user", ficheUserRoutes);

//La route des posts du feed
app.use("/api/posts", postsRoutes);

//pour accéder aux images du dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

//exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;
