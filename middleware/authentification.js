//importation
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
  try {
    //récupérer le token dans le headers authorization : bearer token
    // console.log("---->middleware authentification");
    // console.log(req.headers.authorization);

    const token = req.headers.authorization.split(" ")[1];

    //décoder le token
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);

    //récupérer le userId qu'il y a à l'intérieur du token déchiffré et le comparé avec l'user id en clair
    const userIdDecodedToken = decodedToken.userId;

    userIdParamsUrl = req.originalUrl.split("=")[1];

    //comparaison du userId qu'il y a en clair dans le req avec le userId qu'il y a dans le token
    if (userIdParamsUrl == userIdDecodedToken) {
      console.log("AUTHENTIFICATION OK je passe au middleware suivant");
      next();
    } else {
      throw "Erreur identification userId incorrect";
    }

    //s'il y a des erreurs dans le try on les récupéres ici
  } catch (error) {
    res.status(401).json({
      message: "Echec Authentification",
      error: error,
    });
  }
};
