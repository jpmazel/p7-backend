//importations
const express = require("express");

//importation du controllers/user.js
const {
  createFicheUser,
  readAllFicheUser,
  readOneFicheUser,
  updateOneFicheUser,
  deleteOneFicheUser,
  readFicheUserComment 
} = require("../controllers/ficheUser");


//importation du middleware d'autentification
const authentification = require("../middleware/authentification");

//importation du middleware multer pour la gestion des fichiers images
const multer = require("../middleware/multer");

//la fonction Router()
const router = express.Router();

//Les routes
router.post("/", authentification, multer, createFicheUser);
router.get("/", authentification, readAllFicheUser);
router.get("/fiche/", authentification, readOneFicheUser);
router.put("/:id", authentification, multer, updateOneFicheUser);
router.delete("/:id", authentification, deleteOneFicheUser);

//Dans les commentaires aller chercher le nom, prenom , photo de l'utilisateur
//et les autres colonnes
router.get("/fiche/:id", authentification, readFicheUserComment )

//exportation du module
module.exports = router;
