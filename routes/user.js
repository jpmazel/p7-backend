//importations
const express = require("express");

//importation du middleware/password
const password = require("../middleware/password");

const controleEmail = require("../middleware/controleEmail");

//importation du middleware d'authentification
const authentification = require("../middleware/authentification");

//importation du controllers/user.js
const {signup, login, deleteAccount} = require("../controllers/user");
// console.log("CONTENU userController - routes/User.js");
// console.log(signup, login);

//la fonction Router()
const router = express.Router();


//la route (endpoint) signup
router.post("/signup",controleEmail,password, signup);

//la route (endpoint) login
router.post("/login", login);

//la route (endpoint) delete - suppression du compte
router.delete("/delete", authentification, deleteAccount)

//exportation du module
module.exports = router;
