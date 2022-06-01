//Importation de mysqlconnection
const mysqlconnection = require("../db/db.mysql");

exports.createLikePost = async (req, res) => {
  console.log("Je suis dans le controller createLikePost");
  console.log(req.body);

  //Récupération des values qui sont passées dans la request
  const { likes_user_id_posts, likes_user_userId, likes_user_like } = req.body;

  //Enregistrer le like dans la base de donnée
  try {
    //La requête SQL
    // INSERT INTO `likes_user`(`likes_user_id_posts`, `likes_user_userId`, `likes_user_like`) VALUES (742,75,0)
    const querySql = `
   INSERT INTO
   likes_user(
    likes_user_id_posts,
    likes_user_userId,
    likes_user_like
      )
   VALUES (?)
   `;

    const values = [likes_user_id_posts, likes_user_userId, likes_user_like];

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

exports.readLikeOnePost = async (req, res) => {
  console.log("Je suis dans readLikeOnePost");

  // Récupération de l'userId qui est passé dans l'url de la requête
  const userId = req.originalUrl.split("=")[1];
  console.log(`-->userId: ${userId}`);

  //Récupération de l'id_posts
  const id_posts = req.params.id;
  console.log(`-->id_posts :${id_posts}`);

  //Récupération des données sur la base de données MySQL
  try {
    //La requête SQL
    //SELECT `id_likes_user`,`likes_user_userId`, `likes_user_like` FROM `likes_user` WHERE `likes_user_id_posts`= 742 AND `likes_user_userId`= 75

    const ficheUser = await mysqlconnection.query(
      "SELECT id_likes_user,likes_user_userId, likes_user_like FROM likes_user WHERE likes_user_id_posts= ? AND likes_user_userId= ?",
      [id_posts, userId],
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

exports.updateLikeOnePost = async (req, res) => {
  console.log("je suis dans updateLikeOnePost");

  //Récupération de l'id_likes_user
  const id_likes = req.params.id;
  console.log(`id_likes : ${id_likes}`);

  //Récupération dans le body de la value dans la key likes_user_like
  const like = req.body.likes_user_like;
  console.log("Valeur du like dans le body");
  console.log(like);

  //Fonction pour convertir
  //si like = 0 je passe à un
  //si like = 1 je passe à 0

  const newLike = (like) => {
    if (like === 0) {
      return 1;
    } else if (like === 1) {
      return 0;
    }
  };

  console.log("-->fonction newLike");
  console.log(newLike(like));

  //La requête vers le serveur
  try {
    // la requête SQL
    // UPDATE `likes_user` SET `likes_user_like`=1 WHERE `id_likes_user`= 13
    const querySql = `
    UPDATE 
      likes_user 
    SET 
      likes_user_like= ? 
    WHERE 
      id_likes_user= ?
      `;

    // const values = [newLike(like), id_likes];

    await mysqlconnection.query(querySql, [newLike(like), id_likes], (error, results) => {
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
