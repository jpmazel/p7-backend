//Importation de mysqlconnection
const mysqlconnection = require("../db/db.mysql");

//Pour créer un POST dans le feed---------------------------------
exports.createPostComments = async (req, res) => {
  //Extractions des values pour les mettre dans des variables
  const { userId, idPost, message } = req.body;

  //Enregistrer l'objet dans la base de donnée
  try {
    //La requête SQL
    const querySql = `
   INSERT
   INTO
   comments_user(
    comments_user_userId, 
    comments_user_id_posts, 
    comments_user_message       
      )
   VALUES (?)
   `;

    const values = [userId, idPost, message];

    //L'envoie dans la base de donnée
    await mysqlconnection.query(querySql, [values], (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201).json({ results });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.readCommentsOnePost = async (req, res) => {
  // Récupération de l'userId qui est passé dans l'url de la requête
  const userId = req.originalUrl.split("=")[1];

  //Récupération de l'id_posts
  const id_posts = req.params.id;

  //Récupération des données sur la base de données MySQL
  try {
    //La requête SQL
    //SELECT * FROM `comments_user` WHERE `comments_user_id_posts`= 558
    const querySql =
      "SELECT * FROM comments_user WHERE comments_user_id_posts = ?";

    const ficheUser = await mysqlconnection.query(
      querySql,
      [id_posts],
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

exports.deleteOneComment = async (req, res) => {
  //Aller chercher 	id_comments_user à supprimer (l'id de la ligne dans la table mysql)
  const id_comments_user = req.params.id;

  const userIdUrl = userIdParamsUrl;

  try {
    //Contrôler si l'utilisateur est ADMIN de niveau 1 pour la modération des comments
    // SELECT `admin` FROM `user` WHERE `id`= 46

    const querySqlAdmin = "SELECT admin FROM user WHERE id = ?";
    await mysqlconnection.query(
      querySqlAdmin,
      [userIdUrl],
      (error, results) => {
        if (error) {
          res.status(500).json({ error });
        } else {
          console.log(results[0].admin);
          const admin = results[0].admin;
          //----------------------------------------------------
          //Récuperer le commentaire à supprimer pour contrôler comments_user_userId et userIdUrl
          //SELECT `comments_user_userId`FROM `comments_user` WHERE `id_comments_user`= 174
          const querysql =
            "SELECT comments_user_userId FROM comments_user WHERE id_comments_user= ?";
          const values = [id_comments_user];
          //L'envoie de la requête
          mysqlconnection.query(querysql, [values], (error, results) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              console.log(
                "--->Donner récupérer pour comparer userIdUrl et userIdcomments"
              );
              console.log(results);
              console.log(Boolean(results.length !== 0));
              //Controle autorisation pour la suppression
              if (
                (results.length !== 0 &&
                  results[0].comments_user_userId === Number(userIdUrl)) ||
                admin === 1
              ) {
                console.log("Autorisation pour la suppression du commentaire");
                //--------------------------------------------------------------
                //La requête pour supprimer la ligne dans la table comments_user grace à la colonne id_comments_user
                //DELETE FROM `comments_user` WHERE `id_comments_user`= 174
                const querySql = `DELETE FROM comments_user WHERE id_comments_user= ?`;
                const values = [id_comments_user];
                //L'envoie de la requête vers la base de données MySQL
                mysqlconnection.query(querySql, [values], (error, results) => {
                  if (error) {
                    res.satus(500).json({ error });
                  } else {
                    res.status(200).json({ results });
                  }
                });
                //-----------------------------------------------------------------
              } else {
                console.log(
                  "Vous n'êtes pas autorisé à supprimer le commentaire"
                );
                res.status(403).json({
                  message:
                    "Vous n'êtes pas autorisé à supprimer le commentaire",
                });
              }
            }
          });

          //--------------------------------------------------------
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateOneComment = async (req, res) => {
  //Aller chercher id_comments_user pour savoir quel message il faut modifier
  const idCommentUser = req.params.id;

  //Aller chercher l'userId dans l'url pour savoir si le user est autorisé à modifier le message
  const userIdUrl = userIdParamsUrl;

  //Récupérer le contenu du body de la requête car dedans il y a le message à MODIFIER
  const message = req.body.comments_user_message;

  try {
    //Récupérer le message pour comparer userId dans le commentaire stocké dans la bdd
    // avec l'userId qui fait la demande de modification du commentaire

    // SELECT  `comments_user_userId` FROM `comments_user` WHERE `id_comments_user`= 2
    const querysql =
      "SELECT comments_user_userId FROM comments_user WHERE id_comments_user=?";
    const values = [idCommentUser];

    //L'envoie de la requête vers la base de données SQL
    await mysqlconnection.query(querysql, [values], (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        console.log(
          "-->Donner récupérer pour comparer userIdUrl et userIdComment"
        );
        console.log(results);

        //Controle autorisation pour la MODIFICATION du commentaire
        if (
          results.length !== 0 &&
          results[0].comments_user_userId === Number(userIdUrl)
        ) {
          console.log("Autorisation pour la MODIFICATION du commentaire");

          //La requête pour faire la mise à jour du commentaire sur la table comments_user
          console.log("--->ce qui va être envoyé vers le serveur");
          console.log(idCommentUser);
          console.log(message);

          // UPDATE `comments_user` SET `comments_user_message`="je modifie" WHERE `id_comments_user`= 196
          mysqlconnection.query(
            "UPDATE comments_user SET comments_user_message = ? WHERE id_comments_user = ?",
            [message, idCommentUser],
            (error, results) => {
              if (error) {
                res.status(500).json({ error });
              } else {
                res.status(201).json({ results });
              }
            }
          );
        } else {
          console.log("Vous n'êtes pas autorisé à modifier le commentaire");
          res.status(403).json({
            message: "Vous n'êtes pas autorisé à modifier le commentaire",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
