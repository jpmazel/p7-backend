//Importation de mysqlconnection
const mysqlconnection = require("../db/db.mysql");

//Pour créer un POST dans le feed---------------------------------
exports.createPost = async (req, res) => {
  //Extractions des values pour les mettre dans des variables
  const { userId, message, photoUrlLink, videoYTUrlLink } = req.body;

  //Enregistrer l'objet dans la base de donnée
  try {
    //La requête SQL
    const querySql = `
   INSERT
   INTO
    posts_user(
      posts_user_userId, 
      posts_user_message, 
      posts_user_photoUrlLink,	
      posts_user_videoYTUrlLink
      )
   VALUES (?)
   `;

    const values = [userId, message, photoUrlLink, videoYTUrlLink];

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

//Pour récupérer tous les posts pour les afficher dans le feed
exports.readAllPost = async (req, res) => {
  try {
    //La requête SQL JOINTURE INTERNE
    //INNER JOIN pour récupérer tous les posts sur la table posts_user
    const querySql = `
    SELECT
      fiche_user_nom,
      fiche_user_prenom,   
      fiche_user_photoProfilUrl,
      posts_user_message,
      posts_user_photoUrlLink,
      posts_user_videoYTUrlLink,
      posts_user_date,
      posts_user_userId,
      id_posts_user    

    FROM
      user
    INNER JOIN fiche_user ON USER.id = fiche_user.fiche_user_userId
    INNER JOIN posts_user ON USER.id = posts_user.posts_user_userId
      ?
    `;
    const values = [];

    //L'envoie de la requête vers la base de donnée MySQL
    await mysqlconnection.query(querySql, [values], (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(200).json({ results });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteOnePost = async (req, res) => {
  //Aller chercher id_posts_user à supprimer (l'id de la ligne dans la table mysql)
  const id_posts_user = req.params.id;

  const userIdUrl = userIdParamsUrl;

  try {
    //Contrôler si l'utilisateur est ADMIN de niveau 1 pour la modération des POST
    // SELECT  `admin` FROM `user` WHERE `id`= 46
    const querySqlAdmin = `SELECT  admin FROM user WHERE id = ?`;

    await mysqlconnection.query(
      querySqlAdmin,
      [userIdUrl],
      (error, results) => {
        if (error) {
          res.status(500).json({ error });
        } else {
          console.log(results[0].admin);
          const admin = results[0].admin;
          //----------------------------------------------
          //Récuperer le post à supprimer pour contrôler id_posts_user et userIdUrl
          //SELECT  `posts_user_userId` FROM `posts_user` WHERE `id_posts_user`= 218
          const querysql =
            "SELECT  posts_user_userId FROM posts_user WHERE id_posts_user=?";
          const values = [id_posts_user];

          //L'envoie de la requête
          mysqlconnection.query(querysql, [values], (error, results) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              console.log(
                "--->Donner récupérer pour comparer userIdUrl et userIdPost"
              );
              console.log(results);
              console.log(Boolean(results.length !== 0));

              //Controle autorisation pour la suppression
              if (
                (results.length !== 0 &&
                  results[0].posts_user_userId === Number(userIdUrl)) ||
                admin === 1
              ) {
                console.log("Autorisation pour la suppression du post");
                //--------------------------------------------------------------
                //La requête pour supprimer la ligne dans la table posts_user grace à la colonne id_posts_user
                //DELETE FROM `posts_user` WHERE `id_posts_user`= 211
                const querySql = `DELETE FROM posts_user WHERE id_posts_user = ?`;
                const values = [id_posts_user];

                // L'envoie de la requête vers la base de données MySQL
                mysqlconnection.query(querySql, [values], (error, results) => {
                  if (error) {
                    res.satus(500).json({ error });
                  } else {
                    res.status(200).json({ results });
                  }
                });

                //-----------------------------------------------------------------
              } else {
                console.log("Vous n'êtes pas autorisé à supprimer le post");
                res.status(403).json({
                  message: "Vous n'êtes pas autorisé à supprimer le post",
                });
              }
            }
          });
          //----------------------------------------------
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateOnePost = async (req, res) => {
  //Aller chercher id_posts_user pour savoir quel message il faut modifier
  const idPostsUser = req.params.id;

  //Aller chercher l'userId dans l'url pour savoir si le user est autorisé à modifier le message
  const userIdUrl = userIdParamsUrl;

  //Récupérer le contenu du body de la requête car dedans il y a le message à MODIFIER
  const message = req.body.posts_user_message;

  try {
    //Récupérer le message pour comparer userId dans le message stocké dans la bdd
    // avec l'userId qui fait la demande de modification de message

    // SELECT  `posts_user_userId` FROM `posts_user` WHERE `id_posts_user`= 2
    const querysql =
      "SELECT posts_user_userId FROM posts_user WHERE id_posts_user=?";
    const values = [idPostsUser];

    //L'envoie de la requête vers la base de données SQL
    await mysqlconnection.query(querysql, [values], (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        console.log(
          "-->Donner récupérer pour comparer userIdUrl et userIdPost"
        );
        console.log(results);

        //Controle autorisation pour la MODIFICATION du post (message)
        if (
          results.length !== 0 &&
          results[0].posts_user_userId === Number(userIdUrl)
        ) {
          console.log("Autorisation pour la MODIFICATION du post");

          //La requête pour faire la mise à jour du post sur la table posts_user

          //UPDATE `posts_user` SET `posts_user_message`="test modif" WHERE `id_posts_user`= 261
          // const querySql =
          //   "UPDATE posts_user SET posts_user_message = ? WHERE id_posts_user = ?";
          // const values = [message, idPostsUser];

          mysqlconnection.query(
            "UPDATE posts_user SET posts_user_message = ? WHERE id_posts_user = ?",
            [message, idPostsUser],
            (error, results) => {
              if (error) {
                res.status(500).json({ error });
              } else {
                res.status(201).json({ results });
              }
            }
          );
        } else {
          console.log("Vous n'êtes pas autorisé à modifier le post");
          res.status(403).json({
            message: "Vous n'êtes pas autorisé à modifier le post",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
