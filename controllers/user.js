//importation de bcrypt pour hasher le password
const bcrypt = require("bcrypt");

//importation  de crypto-js pour chiffrer le mail
const cryptojs = require("crypto-js");

//importation de jsonwebtoken
const jwt = require("jsonwebtoken");

//importation pour utilisation des variables d'environnements
const dotenv = require("dotenv");
const result = dotenv.config();

//importation du models User.js
const User = require("../models/User");

//importation mysqlConnection
const mysqlconnection = require("../db/db.mysql");

//signup pour enregistrer le nouvel utilisateur dans la base de donnée
exports.signup = (req, res) => {
  const { email, password } = req.body;

  //Instance de la classe User
  const user = new User(email, password);

  //chiffrer l'email avant de l'envoyer dans la base de donnée
  const emailChiffre = user.emailChiffrement();

  //hasher le mot de passe avant de l'envoyer dans la base de donnée
  user
    .hashPassword()
    .then((hash) => {
      //les données à envoyer dans la requête SQL pour la table user
      const data = {
        email: emailChiffre,
        password: hash,
      };

      //la requête SQL pour envoyer les données dans la table user
      mysqlconnection.query(
        "INSERT INTO user SET ?",
        data,
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({ error });
          } else {
            console.log("-->results");
            console.log(results);
            res.json({ message: "Utilisateur enregistré" });
          }
        }
      );
    })
    .catch((error) => res.status(500).json({ error }).send(console.log(error)));
};

//login pour s'authentifier
exports.login = (req, res) => {
  //le contenu de la requête
  const { email, password } = req.body;

  //instance de la classe User
  const user = new User(email, password);

  //chiffrer l'email de la requête
  const emailChiffre = user.emailChiffrement();

  //chercher dans la base de donnée si l'utilisateur est bien présent
  mysqlconnection.query(
    "SELECT * FROM user WHERE email = ? ",
    emailChiffre,
    (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        //si l'email de l'utilisateur n'est pas présent dans la base de donnée
        if (results == 0) {
          return res
            .status(404)
            .json({ error: "utilisateur inexistant dans la bdd" });
        }

        //Controler la validité du password envoyer par le front
        bcrypt
          .compare(req.body.password, results[0].password)
          .then((controlPassword) => {
            //si le password n'est pas correct
            if (!controlPassword) {
              return res
                .status(401)
                .json({ error: "le mot de passe est incorrect" });
            }

            //si le password est correct
            //envoye dans la response du serveur : userId et le token d'authentification JWT
            //le niveau d'administrateur

            //génération du token JWT
            const token = jwt.sign(
              //3 arguments
              { userId: results[0].id },
              `${process.env.JWT_KEY_TOKEN}`,
              { expiresIn: "12h" }
            );

            //réponse du serveur avec le userId , le token et l'admin état
            res.status(201).json({
              userId: results[0].id,
              token,
              admin: results[0].admin,
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
};

//DELETE account pour supprimer le compte utilisateur
//je récupére l'id de l'utilisateur à supprimer
exports.deleteAccount = async (req, res) => {
  try {
    //Aller chercher l'id de l'utilisateur à supprimer
    const id = userIdParamsUrl;

    //La requête SQL pour la suppresion du compte
    //DELETE FROM `user` WHERE `id`=25
    const querySql = `
  DELETE FROM user
  WHERE id = ?
  `;

    const values = [id];

    //La connexion à la base de donnée mySQL
    await mysqlconnection.query(querySql, values, (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201).json({
          message: "Compte utilisateur effacé de la base de donnée",
          results,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "il y a un problème avec la suppression du compte utilisateur",
    });
  }
};
