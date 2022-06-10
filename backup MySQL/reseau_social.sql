-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 10 juin 2022 à 20:21
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `reseau_social`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments_user`
--

CREATE TABLE `comments_user` (
  `id_comments_user` int(10) UNSIGNED NOT NULL,
  `comments_user_id_posts` int(10) UNSIGNED NOT NULL,
  `comments_user_userId` int(10) UNSIGNED NOT NULL,
  `comments_user_message` text NOT NULL,
  `comments_user_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments_user`
--

INSERT INTO `comments_user` (`id_comments_user`, `comments_user_id_posts`, `comments_user_userId`, `comments_user_message`, `comments_user_date`) VALUES
(300, 748, 75, 'Bonjour, Barbara bienvenu sur le nouveau réseau social', '2022-05-31 11:43:39'),
(305, 742, 77, 'c\'est cool', '2022-05-31 22:08:34'),
(308, 752, 75, 'super , si tu as des idées, on est preneur. Envoie moi un mail', '2022-05-31 22:12:30'),
(315, 750, 2, 'c\'est super', '2022-06-04 08:37:54'),
(316, 748, 2, 'salut , moi ça fait 10 ans et je suis toujours là', '2022-06-04 08:38:23'),
(349, 808, 77, 'intéressant', '2022-06-10 20:16:22'),
(350, 748, 77, 'Salut', '2022-06-10 20:16:44');

-- --------------------------------------------------------

--
-- Structure de la table `fiche_user`
--

CREATE TABLE `fiche_user` (
  `id_fiche_user` int(10) UNSIGNED NOT NULL,
  `fiche_user_userId` int(10) UNSIGNED NOT NULL,
  `fiche_user_nom` varchar(100) NOT NULL,
  `fiche_user_prenom` varchar(100) NOT NULL,
  `fiche_user_age` tinyint(2) NOT NULL,
  `fiche_user_job` char(100) NOT NULL,
  `fiche_user_bio` text NOT NULL,
  `fiche_user_photoProfilUrl` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `fiche_user`
--

INSERT INTO `fiche_user` (`id_fiche_user`, `fiche_user_userId`, `fiche_user_nom`, `fiche_user_prenom`, `fiche_user_age`, `fiche_user_job`, `fiche_user_bio`, `fiche_user_photoProfilUrl`) VALUES
(7, 2, 'BROWN', 'Brenda', 36, 'UX Designer', 'L\'UX Designer a comme objectif de diminuer au maximum les interrogations que peut avoir un utilisateurs lors de sa navigation sur un site web. Il doit donc faire en sorte que l\'ergonomie soit adapté à la fois aux cibles définies mais aussi au message de la marque, aux messages marketing et aux éléments de réassurances', 'http://localhost:3000/images/photo-by-face-generator_femme-1.jpg.jpg_1654805514151.jpg'),
(136, 57, 'SCOTT', 'Barbara ', 32, 'Développeur front-end', 'Le développeur front end programme la partie visible, l\'interface utilisateur d\'une app ou d\'un site web ', 'http://localhost:3000/images/photo-by-face-generator_femme-2.jpg.jpg_1654805485958.jpg'),
(148, 75, 'DOE', 'John', 43, 'Développeur Web full stack javascript', 'J\'apprends les technologies pour être développeur full stack JavaScript.\nChez Groupomania je suis ADMINISTRATEUR et modérateur des messages du réseau social www\n', 'http://localhost:3000/images/fakePhoto1-512x512px-homme-1.jpg.jpg_1654839382322.jpg'),
(149, 77, 'SALISBURY', 'Danny', 36, 'Graphiste', 'Affiches, brochures publicitaires, couvertures, emballages… Au cours de leur conception, la plupart des documents écrits passent entre les mains d’un graphiste. ', 'http://localhost:3000/images/photo-by-face-generator_homme-2.jpg.jpg_1654805450634.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `likes_user`
--

CREATE TABLE `likes_user` (
  `id_likes_user` int(10) UNSIGNED NOT NULL,
  `likes_user_id_posts` int(10) UNSIGNED NOT NULL,
  `likes_user_userId` int(10) UNSIGNED NOT NULL,
  `likes_user_like` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `likes_user`
--

INSERT INTO `likes_user` (`id_likes_user`, `likes_user_id_posts`, `likes_user_userId`, `likes_user_like`) VALUES
(63, 742, 75, 0),
(64, 748, 75, 1),
(69, 750, 75, 1),
(70, 750, 77, 1),
(72, 752, 77, 0),
(76, 750, 2, 1),
(77, 750, 57, 1),
(79, 748, 2, 1),
(98, 780, 75, 1),
(106, 808, 77, 1);

-- --------------------------------------------------------

--
-- Structure de la table `posts_user`
--

CREATE TABLE `posts_user` (
  `id_posts_user` int(10) UNSIGNED NOT NULL,
  `posts_user_userId` int(10) UNSIGNED NOT NULL,
  `posts_user_message` text NOT NULL,
  `posts_user_photoUrlLink` tinytext DEFAULT NULL,
  `posts_user_videoYTUrlLink` tinytext DEFAULT NULL,
  `posts_user_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts_user`
--

INSERT INTO `posts_user` (`id_posts_user`, `posts_user_userId`, `posts_user_message`, `posts_user_photoUrlLink`, `posts_user_videoYTUrlLink`, `posts_user_date`) VALUES
(742, 75, 'Ouverture du nouveau réseau social de Groupomania. C\'est pour améliorer l\'ambiance entre collègue', NULL, NULL, '2022-05-29 11:01:29'),
(748, 57, 'salut, je suis dans la société Groupomania depuis 2 semaines', NULL, NULL, '2022-05-30 21:28:43'),
(750, 75, 'La fonctionnalité des likes sur les posts est disponible', NULL, NULL, '2022-05-31 09:42:15'),
(752, 77, 'Il faudrait améliorer le graphisme de ce site...je suis graphiste', NULL, NULL, '2022-05-31 21:48:28'),
(780, 75, 'Le lien est cliquable :\nhttps://www.youtube.com/watch?v=N0DhCV_-Qbg et c\'est une vidéo YouTube sur React18', NULL, NULL, '2022-06-08 17:04:53'),
(808, 75, 'Le lien de la nouvelle documentation react : https://beta.reactjs.org/\n', NULL, NULL, '2022-06-10 09:27:16'),
(815, 77, 'Passer des data par les props : le props drilling', 'https://beta.reactjs.org/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpassing_data_prop_drilling.dark.png&w=1920&q=75', NULL, '2022-06-10 20:18:00');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin` tinyint(3) UNSIGNED DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `admin`, `date`) VALUES
(2, 'e12895395f30e7274b08d75ce008363ad54c70ac8ad95dad48f88a36ee5cc3ee', '$2b$10$ZEelhLAYrFaJO.iY0mYE0utGfPtj/MYxDyxaftgo6chJ41FyjRb8O', NULL, '2022-04-21 11:14:29'),
(57, '4598428dd0c2833d609b43ec091ef970a6d3f3b51c4c90c07cd699a3ae7e85df', '$2b$10$HNTDfyyi8smom2bLLPp2wORQaTtiFLgWth0KXQl2uGvszB3L8ina.', NULL, '2022-05-26 14:08:13'),
(75, '27eede426cf4692668a47a3d0b653e726580a30d88eb52f687daad26658bb466', '$2b$10$5cuhZw0QKuAdLDJzZfsgyOSqA9yZfcJVkomQZ7qEcDOYI5IO4yKeS', 1, '2022-05-28 17:18:37'),
(77, 'e9c20f34a7252011fae4aec58ac3a3915ced13ab2d0968386693959cd7483bd6', '$2b$10$uQrfMi29SqZu3NWSYEyyOeNyobx9sZXS60Ilmqz2k/S8dCQEoEh0O', NULL, '2022-05-31 21:47:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments_user`
--
ALTER TABLE `comments_user`
  ADD PRIMARY KEY (`id_comments_user`),
  ADD KEY `comments_user_id_posts` (`comments_user_id_posts`),
  ADD KEY `comments_user_ibfk_1` (`comments_user_userId`);

--
-- Index pour la table `fiche_user`
--
ALTER TABLE `fiche_user`
  ADD PRIMARY KEY (`id_fiche_user`),
  ADD KEY `fiche_user_userId` (`fiche_user_userId`);

--
-- Index pour la table `likes_user`
--
ALTER TABLE `likes_user`
  ADD PRIMARY KEY (`id_likes_user`),
  ADD KEY `likes_user_id_posts` (`likes_user_id_posts`),
  ADD KEY `likes_user_userId` (`likes_user_userId`);

--
-- Index pour la table `posts_user`
--
ALTER TABLE `posts_user`
  ADD PRIMARY KEY (`id_posts_user`),
  ADD KEY `posts_User_userId` (`posts_user_userId`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments_user`
--
ALTER TABLE `comments_user`
  MODIFY `id_comments_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=351;

--
-- AUTO_INCREMENT pour la table `fiche_user`
--
ALTER TABLE `fiche_user`
  MODIFY `id_fiche_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT pour la table `likes_user`
--
ALTER TABLE `likes_user`
  MODIFY `id_likes_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT pour la table `posts_user`
--
ALTER TABLE `posts_user`
  MODIFY `id_posts_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=816;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments_user`
--
ALTER TABLE `comments_user`
  ADD CONSTRAINT `comments_user_ibfk_1` FOREIGN KEY (`comments_user_userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_user_ibfk_2` FOREIGN KEY (`comments_user_id_posts`) REFERENCES `posts_user` (`id_posts_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `fiche_user`
--
ALTER TABLE `fiche_user`
  ADD CONSTRAINT `fiche_user_ibfk_1` FOREIGN KEY (`fiche_user_userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `likes_user`
--
ALTER TABLE `likes_user`
  ADD CONSTRAINT `likes_user_ibfk_1` FOREIGN KEY (`likes_user_userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_user_ibfk_2` FOREIGN KEY (`likes_user_id_posts`) REFERENCES `posts_user` (`id_posts_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts_user`
--
ALTER TABLE `posts_user`
  ADD CONSTRAINT `posts_user_ibfk_1` FOREIGN KEY (`posts_user_userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
