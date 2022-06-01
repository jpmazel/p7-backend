//importer le package pour utiliser les varaibles d'environnement
const dotenv = require("dotenv");
dotenv.config();

//importer mongoose pour me connecter à la base de donnée mongoDB || @cluster0.7fts7.mongodb.net/
const mongoose = require('mongoose');
mongoose.connect(
  `${process.env.DB_PROTOCOLE}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("Connexion à MongoDB réussi"))
  .catch((err) => console.log("Connexion à MongoDB échoué", err));

  //
  module.exports = mongoose;