//importation du models de la base de donnée MongoDB
const FicheUser = require("../models/FicheUser");

exports.likeFicheUser = (req, res, next) => {
  console.log("je suis dans le controller like");

  //affichage du req.body
  /* la req sera envoyé par body--->raw au format JSON avec ces 2 propriétés
  {
    "userId" : "600d2a68b91b5b6bb045cca5",
    "like" : -1
}
  */
  console.log("-->CONTENU req.body.likes - ctrl like");
  console.log(req.body.like);

  //récupérer l'id dans l'url de la requête
  console.log("--->CONTENU req.params - ctrl like");
  console.log(req.params);

  //mise au format de l'id pour pouvoir aller chercher l'objet correspondant dans la base de donnée
  console.log("--->id en _id");
  console.log({ _id: req.params.id });

  //Aller chercher l'objet dans la base de donnée
  FicheUser.findOne({ _id: req.params.id })
    .then((objet) => {
      console.log("--->CONTENU resultat promise : objet");
      console.log(objet);
      //like = 1 (likes = +1)
      //-->utilisation de la méthode javascript includes()
      //-->utilisation de l'opérateur $inc (mongoDB)
      //-->utilisation de l'opérateur $push (mongoDB)
      //-->utilisation de l'opérateur $pull (mongoDB)

      //mise en place d'un switch case( )
      switch (req.body.like) {
        case 1:
          //si le userliked est FALSE ET si like === 1
          if (
            !objet.usersLiked.includes(req.body.userId) &&
            req.body.like === 1
          ) {
            console.log(
              "--->userId n'est pas dans usersLiked BDD et requete front like a 1"
            );

            //mise à jour objet BDD
            FicheUser.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
              }
            )
              .then(() =>
                res.status(201).json({ message: "FicheUser like +1" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case -1:
          //like = -1 (dislikes = +1)
          if (
            !objet.usersDisliked.includes(req.body.userId) &&
            req.body.like === -1
          ) {
            console.log("--->userId est dans usersDisliked ET disLikes = 1");

            //mise à jour objet BDD
            FicheUser.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
              }
            )
              .then(() =>
                res.status(201).json({ message: "FicheUser disLike +1" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case 0:
          //like = 0  (likes = 0 , pas de vote)
          if (objet.usersLiked.includes(req.body.userId)) {
            console.log("--->userId est dans userLiked ET case = 0");

            //mise à jour objet BDD
            FicheUser.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "FicheUser like 0" }))
              .catch((error) => res.status(400).json({ error }));
          }

          //Après un like = -1 on met un like = 0  (likes = 0 , pas de vote, on enléve le dislike)
          if (objet.usersDisliked.includes(req.body.userId)) {
            console.log("--->userId est dans usersDisliked ET like = 0");

            //mise à jour objet BDD
            FicheUser.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
              }
            )
              .then(() =>
                res.status(201).json({ message: "FicheUser dislike 0" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
      }
    })

    .catch((error) => res.status(404).json({ error }));

  //like = 0 ( dislikes = 0)
};
