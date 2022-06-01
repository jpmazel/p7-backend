//Importations
const express = require("express");

//Importation des controllers controllers/posts
const {
  createPost,
  readAllPost,
  deleteOnePost,
  updateOnePost,
} = require("../controllers/posts");

//Importation des controllers controllers/posts.comments
const {
  createPostComments,
  readCommentsOnePost,
  updateOneComment,
  deleteOneComment,
} = require("../controllers/comments");

//Importation des controllers controllers/posts.likes
const { createLikePost, readLikeOnePost,updateLikeOnePost } = require("../controllers/likes");

//Importation du middleware d'authentification
const authentification = require("../middleware/authentification");

//La fonction router
const router = express.Router();

//Les routes du CRUD pour les posts du feed
router.post("/", authentification, createPost);
router.get("/", authentification, readAllPost);
router.delete("/:id", authentification, deleteOnePost);
router.put("/:id", authentification, updateOnePost);

//Les routes du CRUD pour les commentaires des posts du feed
router.post("/comments/", authentification, createPostComments);
router.get("/comments/:id", authentification, readCommentsOnePost);
router.put("/comment/:id", authentification, updateOneComment);
router.delete("/comment/:id", authentification, deleteOneComment);

//Les routes du CRU pour les likes des posts du feed
router.post("/likes/", authentification, createLikePost);
router.get("/likes/:id", authentification, readLikeOnePost)
router.put("/likes/:id", authentification, updateLikeOnePost)

//exportation du module
module.exports = router;
