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
    console.log("--->token");
    console.log(token);

    //décoder le token
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
    console.log("--->decodedToken CONTENU :decodedToken");    
    console.log(decodedToken)

    // console.log("CONTENU du req avant le controle du token");
    // console.log(req);
    
    console.log("CONTENU Authentification du req.body");
    console.log(req.body);

    //récupérer le userId qu'il y a à l'intérieur du token déchiffré et le comparé avec l'user id en clair
    const userIdDecodedToken = decodedToken.userId;
    console.log("--->CONTENU userIdDecodedToken : userId du decoded TOKEN");
    console.log(userIdDecodedToken);

    console.log("--->req.body.userId  dans le body de la request");
    console.log(req.body.userId);

    console.log("--->Req.originalUrl");
    console.log(req.originalUrl);

    userIdParamsUrl = req.originalUrl.split("=")[1];
    console.log("--->affichage de l'userId userIdParamsUrl")
    console.log(userIdParamsUrl);

    //comparaison du userId qu'il y a en clair dans le req avec le userId qu'il y a dans le token    
    if(userIdParamsUrl == userIdDecodedToken){
      console.log("AUTHENTIFICATION OK je passe au middleware suivant")
      next()
    }else{
      throw "Erreur identification userId incorrect"
    }       
    
    //s'il y a des erreurs dans le try on les récupéres ici
  } catch (error) {
    res.status(401).json({
      message : "Echec Authentification" ,
      error : error
    });
  }
};
