//importation du models de la base de donnée MongoDB
const FicheUser = require("../models/FicheUser");

//importation du module fs de node.js pour accéder aux fichiers du serveur
const fs = require("fs");

const mysqlconnection = require("../db/db.mysql");

exports.createFicheUser = async (req, res) => {
  //créer une fiche user SANS IMAGE
  console.log("01-CONTENU : req.body - controllers/ficheUser");
  console.log(req.body);

  console.log("02-CONTENU : req.body.ficheUser - controllers/ficheUser");
  console.log(req.body.ficheUser);

  console.log("03-LE FICHIER->CONTENU POST: req.file createFicheUser");
  console.log(req.file);

  //pas besoin d'utiliser un JSON.parse() pour req.body.ficheUser
  const userFicheObject = JSON.parse(req.body.ficheUser);

  console.log("04---->CONTENU userFicheObject - controllers/ficheUser");
  console.log(userFicheObject);

  console.log("05---->POUR FABRIQUER l'URL de l'IMAGE");
  console.log(req.protocol);
  console.log(req.get("host"));
  // console.log(req.file.filename);

  //création des variables qui vont être utilisé pour l'envoie dans MySQL
  //deux cas possible avec et sans le fichier image
  const ficheUserObject = req.file
    ? {
        ...JSON.parse(req.body.ficheUser),
        photoProfilUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...JSON.parse(req.body.ficheUser),
      };

  console.log("-->POST CONTENU : ficheUserObject");
  console.log(ficheUserObject);

  const { userId, nom, prenom, age, job, bio, photoProfilUrl, newFiche } =
    ficheUserObject;

  console.log("-->POST userId, nom, prenom, age,  photoProfilUrl");
  console.log(userId, nom, prenom, age, job, bio, photoProfilUrl, newFiche);
  // INSERT INTO `fiche_user`( `fiche_user_userId`, `fiche_user_nom`, `fiche_user_prenom`, `fiche_user_age`, `fiche_user_photoProfilUrl`)

  const querySql = req.file
    ? `
            INSERT 
            INTO 
                fiche_user(
                  fiche_user_userId, 
                  fiche_user_nom, 
                  fiche_user_prenom, 
                  fiche_user_age,
                  fiche_user_job,
                  fiche_user_bio,
                  fiche_user_photoProfilUrl,
                  fiche_user_new_fiche)
            VALUES (?)
             `
    : `
            INSERT 
            INTO 
                fiche_user(
                  fiche_user_userId, 
                  fiche_user_nom, 
                  fiche_user_prenom, 
                  fiche_user_age,
                  fiche_user_job,
                  fiche_user_bio,                  
                  fiche_user_new_fiche)
            VALUES (?)
             `;

  const values = req.file
    ? [userId, nom, prenom, age, job, bio, photoProfilUrl, newFiche]
    : [userId, nom, prenom, age, job, bio, newFiche];

  console.log("--->querySql");
  console.log(querySql);
  console.log("-->values ");
  console.log(values);
  console.log([values]);
  try {
    mysqlconnection.query(querySql, [values], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        res.status(200).json({ results });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }

  //     querySql,
  //     [values],
  //     (error, results) => {
  //       if (error) {
  //         res.json({ error });
  //       } else {
  //         res.status(200).json({ results });
  //         console.log("results");
  //         console.log(results);
  //       }
  //     }
  //   );
  // } catch (err) {
  //   res.status(500).json({ error: err });
  // }

  //l'instance FicheUser
  //les variables
  // const { userId, nom, prenom, age, job, bio, photoProfilUrl, newFiche } =
  // ficheUserObject;

  // const photoProfilUrl = `${req.protocol}://${req.get("host")}/images/${
  //   req.file.filename
  // }`;

  // console.log(
  //   "06 -->userId, nom, prenom, age, job, bio,photoProfilUrl, newFiche"
  // );
  // console.log(userId, nom, prenom, age, job, bio, photoProfilUrl, newFiche);

  // //l'instance
  // const ficheUser = new FicheUser(
  //   userId,
  //   nom,
  //   prenom,
  //   age,
  //   job,
  //   bio,
  //   photoProfilUrl,
  //   newFiche
  // );

  // console.log("07-->ficheUser");
  // console.log(ficheUser);

  //enregistrer l'objet dans la base de donnée
  /*
  INSERT INTO `fiche_user`( `fiche_user_userId`, `fiche_user_nom`, `fiche_user_prenom`, `fiche_user_age`, `fiche_user_photoProfilUrl`) 
  VALUES (1,'tmetlardy','e-genieclimatique',12,'fdsfdsfdsfd')
  */
  // try {
  // const querySql = `
  // INSERT
  // INTO
  // fiche_user(
  //   fiche_user_userId,
  //   fiche_user_nom,
  //   fiche_user_prenom,
  //   fiche_user_age,
  //   fiche_user_job,
  //   fiche_user_bio,
  //   fiche_user_photoProfilUrl,
  //   fiche_user_new_fiche
  //   )
  // VALUES (?)
  //  `;

  //   const values = [
  //     userId,
  //     nom,
  //     prenom,
  //     age,
  //     job,
  //     bio,
  //     photoProfilUrl,
  //     newFiche,
  //   ];
  //   console.log("08-values");
  //   console.log(values);

  //   const ficheUser = await mysqlconnection.query(
  //     querySql,
  //     [values],
  //     (error, results) => {
  //       if (error) {
  //         res.json({ error });
  //       } else {
  //         res.status(200).json({ results });
  //         console.log("results");
  //         console.log(results);
  //       }
  //     }
  //   );
  // } catch (err) {
  //   res.status(500).json({ error: err });
  // }
};

//ECMAScript2017
exports.readAllFicheUser = async (req, res) => {
  console.log("je suis dans readAllFicheUser");
  try {
    const ficheUser = await mysqlconnection.query(
      "SELECT * FROM `fiche_user` WHERE ?",
      ["1"],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//ECMAScript2017
exports.readOneFicheUser = async (req, res) => {
  console.log("Je suis dans readOneFicheUser");
  console.log("--->res.originalUrl");
  console.log(req.originalUrl.split("=")[1]);

  try {
    const id = req.originalUrl.split("=")[1];
    console.log(id);

    const querySql = "SELECT * FROM fiche_user WHERE fiche_user_userId = ?";
    // SELECT * FROM `fiche_user` WHERE `fiche_user_userId`= 87

    const ficheUser = await mysqlconnection.query(
      querySql,
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

// // //ECMAScript2015
// exports.readOneFicheUser = (req, res) => {
//   FicheUser.findOne({ _id: req.params.id })
//     .then((lObjet) => res.status(200).json(lObjet))
//     .catch((error) => res.status(404).json({ error }));
// };

exports.updateOneFicheUser = async (req, res) => {
  console.log("-----------ROUTE PUT---------------------------------------");
  console.log("--->ROUTE PUT : updateOneFicheUser");
  console.log(req.params.id);

  console.log("--->CONTENU PUT: req.file");
  console.log(req.file);

  //Aller chercher l'objet dans la table ficheUser
  try {
    const id = req.params.id;
    //SELECT * FROM `fiche_user` WHERE `id_fiche_user`= 9
    const querySql = "SELECT * FROM fiche_user WHERE id_fiche_user = ?";

    const ficheUser = await mysqlconnection.query(
      querySql,
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          console.log("-->Sélection de l'objet que l'on veut modifier");
          console.log(results);

          //controle autorisation de la modification par l'userId
          console.log("-->userIdParamsUrl et fiche_user_userId");
          console.log(userIdParamsUrl);
          console.log(results[0].fiche_user_userId);

          if (userIdParamsUrl == results[0].fiche_user_userId) {
            console.log("Authorisation pour modification de l'objet");

            //s'il y un fichier attaché à modifier
            if (req.file) {
              //récupération du nom de la photoà supprimer dans la base de données
              const filename =
                results[0].fiche_user_photoProfilUrl.split("/images")[1];
              console.log("--->filename");
              console.log(filename);

              fs.readFile(`images/${filename}`, (error, data) => {
                if (error) {
                  console.log("--error");
                  console.log(error);
                } else {
                  console.log("--data");
                  console.log(data);
                  Boolean(data);
                }
              });

              //suppression de l'image dans le dossier images du serveur
              fs.unlink(`images/${filename}`, (error) => {
                if (error) {
                  console.log(error);
                }
              });
            }

            //l'objet qui va être mise à jour dans la base de donnée
            console.log("--->CONTENU: req.body");
            console.log(req.body);

            console.log("--->CONTENU: req.body.ficheUser");
            console.log(req.body.ficheUser);

            const userFicheObject = JSON.parse(req.body.ficheUser);
            console.log("--->CONTENU: userFicheObject");
            console.log(userFicheObject);

            //création des variables qui vont être utilisé pour l'envoie dans MySQL
            //deux cas possible avec et sans le fichier image

            const ficheUserObject = req.file
              ? {
                  ...JSON.parse(req.body.ficheUser),
                  photoProfilUrl: `${req.protocol}://${req.get(
                    "host"
                  )}/images/${req.file.filename}`,
                }
              : {
                  ...JSON.parse(req.body.ficheUser),
                };

            console.log("-->CONTENU : ficheUserObject");
            console.log(ficheUserObject);

            //Mettre à jour la base de données
            /*
              Requête SQL pour phpMyAdmin
              UPDATE
                  `fiche_user`
              SET
                  `fiche_user_nom` = 'doe',
                  `fiche_user_prenom` = 'John',
                  `fiche_user_age` = 43,
                  `fiche_user_photoProfilUrl` = 'gfdgfdgfd'
              WHERE
                  `id_fiche_user` = 19

         */
            const {
              userId,
              nom,
              prenom,
              age,
              job,
              bio,
              photoProfilUrl,
              newFiche,
            } = ficheUserObject;

            console.log("-->userId, nom, prenom, age,  photoProfilUrl");
            console.log(
              userId,
              nom,
              prenom,
              age,
              job,
              bio,
              photoProfilUrl,
              newFiche
            );

            const querySql = req.file
              ? `
          UPDATE 
            fiche_user 
          SET
            fiche_user_nom = ?,
            fiche_user_prenom = ?,
            fiche_user_age = ?,
            fiche_user_job = ?,
            fiche_user_bio = ?,
            fiche_user_photoProfilUrl = ?,
            fiche_user_new_fiche = ?
          WHERE
            id_fiche_user = ?
          `
              : `
          UPDATE
               fiche_user 
          SET
            fiche_user_nom = ?,
            fiche_user_prenom = ?,
            fiche_user_age = ?,
            fiche_user_job = ?,
            fiche_user_bio = ?,
            fiche_user_new_fiche = ?             
          WHERE 
            id_fiche_user = ?
          `;

            const values = req.file
              ? [nom, prenom, age, job, bio, photoProfilUrl, newFiche, id]
              : [nom, prenom, age, job, bio, newFiche, id];

            console.log("-->values   ");
            console.log(values);

            mysqlconnection.query(querySql, values, (error, results) => {
              if (error) {
                res.status(500).json({ error });
              } else {
                res.status(201).json({
                  message: "mise à jour OK dans la base de données ",
                  results,
                });
              }
            });
          } else {
            console.log(
              "userId différent de l'userId dans l'objet-pas autorisé à faire la modification"
            );
            // throw "userId différent de l'userId dans l'objet-pas autorisé à faire la modification";
            res.status(403).json({
              message: "vous n'étes pas autoriser à modifier les données",
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

//ECMAScript2017
exports.deleteOneFicheUser = async (req, res) => {
  //chercher le document
  try {
    //Aller chercher l'id de l'objet à supprimer dans la requête
    const id = req.params.id;
    console.log("-->id");
    console.log(id);

    const querySql = "SELECT * FROM fiche_user WHERE id_fiche_user = ?";

    await mysqlconnection.query(querySql, [id], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        console.log(
          "-->récupérer la data de la bdd pour controler la validité de l'userId"
        );
        console.log(results);

        //contrôle de l'existance de la données dans la bdd pour éviter le crash du serveur
        if (results != 0) {
          console.log("presence objet dans bdd");
        } else {
          console.log("objet non présent");
          return res
            .status(404)
            .json({ message: "pas d'objet à supprimer dans la bdd" });
        }

        //controle autorisation de la modification par l'userId
        console.log("-->userIdParamsUrl et fiche_user_userId");
        console.log(userIdParamsUrl);
        console.log(results[0].fiche_user_userId);

        if (userIdParamsUrl == results[0].fiche_user_userId) {
          console.log("Autorisation pour SUPPRESSION de l'objet");

          //récupération du nom de la photo à supprimer dans la bdd
          const filename =
            results[0].fiche_user_photoProfilUrl.split("/images")[1];
          console.log("--->filename");
          console.log(filename);

          //suppression de l'image dans le dossier images du serveur
          fs.unlink(`images/${filename}`, (error) => {
            if (error) throw error;
          });

          //Mettre à jour la base de données
          //ma requête phpMyAdmin pour supprimer la data
          //DELETE FROM `fiche_user` WHERE `id_fiche_user`= 55

          const querySql = `
            DELETE FROM fiche_user
            WHERE id_fiche_user = ?
            `;

          const values = [id];
          console.log("-->values");
          console.log(values);

          //la connexion à la base de données
          mysqlconnection.query(querySql, values, (error, results) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              res.status(201).json({
                message: "objet éffacé dans la base de données",
                results,
              });
            }
          });
        } else {
          console.log("pas autorisé");
          res.status(403).json({
            message: "vous n'étes pas autoriser à modifier les données",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "image inexistante",
    });
  }
};

exports.readFicheUserComment = async (req, res) => {
  console.log(
    "Je suis dans readFicheUserComment pour afficher la photo nom prenom dans les commentaires"
  );

  //Récupération de l'userId qui est passe dans l'url et qui est la fiche utilisateur
  // de l'userId qui a créé le commentaire
  const userIdComment = req.params.id;
  console.log(`userIdComment : ${userIdComment}`);

  try {
    // LA requête SQL
    //SELECT  `fiche_user_nom`, `fiche_user_prenom`,   `fiche_user_photoProfilUrl` FROM `fiche_user` WHERE `fiche_user_userId`= 2
    const querySql = `
    SELECT  
     *
    FROM 
      fiche_user 
    WHERE 
      fiche_user_userId= ?    
    `;

    const ficheUser = await mysqlconnection.query(
      querySql,
      [userIdComment],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

//
