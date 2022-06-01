# backend
Mettre les informations pour les variables d'environnement (base de donnée MongoDB Atlas)

Pour lancer le serveur : `$ npm run start`

# Routes
Toutes les routes nécessitent au authentification par TOKEN
## La route POST pour créer un compte
http://localhost:3000/api/authentification/signup

Body-->raw: 
{
    "email" : "xxxxxxx", (mot de passe fort)
    "password" : "xxxxxx"
}

## La route POST pour se logger
http://localhost:3000/api/authentification/login

Body-->raw: 
{
    "email" : "xxxxxxx",
    "password" : "xxxxxx"
}


## La route POST pour créer la fiche du user
http://localhost:3000/api/fiche_user/

Params--> KEY: userId VALUE: _id de l'user
Authorization-->Bearer Token Token: xxxxxxx
Body-->form-data-->
  KEY: ficheUser 
  VALUE:
        {   
            "userId": "XXXXXXXX",
            "nom": "XXXXXXXXX",
            "prenom": "XXXXXX",
            "age":XX,
            "photoProfilUrl" : "",
            "__v": 0
        } 

  KEY: image 
  file et sélectionner l'image
  
## La route GET pour afficher tous les objets qu'il y a dans la fiche du user
http://localhost:3000/api/fiche_user/

Authorization-->Bearer Token Token: xxxxxxx
Body-->raw :
            {
              "userId":"xxxxxxxxx"
            }

## La route GET pour afficher un objets grâce à son id 
http://localhost:3000/api/fiche_user/:id

Authorization-->Bearer Token Token: xxxxxxx
Params--> KEY: userId VALUE: _id de l'user
Body-->none


## La route PUT pour modifier un objets qui a été sélectionné par son _id
http://localhost:3000/api/fiche_user/:id

Params--> KEY: userId VALUE: _id de l'user
Authorization-->Bearer Token Token: xxxxxxx
Body-->form-data-->
  KEY: ficheUser 
  VALUE:
        {   
            "userId": "XXXXXXXX",
            "nom": "XXXXXXXXX",
            "prenom": "XXXXXX",
            "age":XX,
            "photoProfilUrl" : "",
            "__v": 0
        } 

  KEY: image 
  file et sélectionner l'image

## La route DELETE pour modifier un objets qui a été sélectionné par son _id
http://localhost:3000/api/fiche_user/:id

Params--> KEY: userId VALUE: _id de l'user

## La route POST  pour like ou dislike un objet qui a été sélectionné par son _id

http://localhost:3000/api/fiche_user/:id/like

Authorization-->Bearer Token Token: xxxxxxx
body--> raw

{
    "userId" : "xxxxxx",
    "like" : 0  (-1 dislike, 0 neutre, 1 like)
}



