-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 22 oct. 2017 à 15:54
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `mydb`
--

-- --------------------------------------------------------

--
-- Structure de la table `t_comment`
--

DROP TABLE IF EXISTS `t_comment`;
CREATE TABLE IF NOT EXISTS `t_comment` (
  `COMMENT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CONTENT` varchar(255) DEFAULT NULL,
  `FK_USER_ID` int(11) NOT NULL,
  `FK_TOPIC_ID` int(11) NOT NULL,
  PRIMARY KEY (`COMMENT_ID`,`FK_USER_ID`,`FK_TOPIC_ID`),
  KEY `fk_T_COMMENTS_T_USER1_idx` (`FK_USER_ID`),
  KEY `fk_T_COMMENT_T_TOPIC1_idx` (`FK_TOPIC_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `t_comment`
--

INSERT INTO `t_comment` (`COMMENT_ID`, `CONTENT`, `FK_USER_ID`, `FK_TOPIC_ID`) VALUES
(1, 'trop cool ton topic funny lolz yeahaa', 2, 1),
(2, 'C\'etait vraiment très interessant ton topic biz motherfuckaa', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `t_rating_comment`
--

DROP TABLE IF EXISTS `t_rating_comment`;
CREATE TABLE IF NOT EXISTS `t_rating_comment` (
  `FK_USER_ID` int(11) NOT NULL,
  `FK_COMMENT_ID` int(11) NOT NULL,
  `RATING` int(11) DEFAULT NULL COMMENT 'Authorized value (-1,0,1)',
  PRIMARY KEY (`FK_USER_ID`,`FK_COMMENT_ID`),
  KEY `fk_T_RATING_COMMENT_T_COMMENT1_idx` (`FK_COMMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `t_rating_topic`
--

DROP TABLE IF EXISTS `t_rating_topic`;
CREATE TABLE IF NOT EXISTS `t_rating_topic` (
  `FK_USER_ID` int(11) NOT NULL,
  `FK_TOPIC_ID` int(11) NOT NULL,
  `RATING` int(11) DEFAULT NULL COMMENT 'Authorized values (-1, 0, 1)',
  PRIMARY KEY (`FK_USER_ID`,`FK_TOPIC_ID`),
  KEY `fk_T_RATING_TOPIC_T_TOPIC1_idx` (`FK_TOPIC_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `t_response`
--

DROP TABLE IF EXISTS `t_response`;
CREATE TABLE IF NOT EXISTS `t_response` (
  `RESPONSE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CONTENT` varchar(255) DEFAULT NULL,
  `FK_COMMENT_ID` int(11) NOT NULL,
  `FK_USER_ID` int(11) NOT NULL,
  PRIMARY KEY (`RESPONSE_ID`,`FK_COMMENT_ID`,`FK_USER_ID`),
  KEY `fk_T_RESPONSES_T_COMMENTS1_idx` (`FK_COMMENT_ID`),
  KEY `fk_T_RESPONSES_T_USER1_idx` (`FK_USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `t_topic`
--

DROP TABLE IF EXISTS `t_topic`;
CREATE TABLE IF NOT EXISTS `t_topic` (
  `TOPIC_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(45) DEFAULT NULL,
  `SUMMARY` varchar(45) DEFAULT NULL,
  `IS_FUN` tinyint(4) DEFAULT NULL,
  `FK_USER_ID` int(11) NOT NULL,
  PRIMARY KEY (`TOPIC_ID`),
  KEY `FK_USER_idx` (`FK_USER_ID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `t_topic`
--

INSERT INTO `t_topic` (`TOPIC_ID`, `TITLE`, `SUMMARY`, `IS_FUN`, `FK_USER_ID`) VALUES
(1, 'Coucouc je suis le topic n1', 'Bienvenu sur le topic n1 il est de type fun ç', 1, 1),
(2, 'Coucouc je suis le topic n2', 'Bienvenu sur le topic n1 il est de type biz ç', 0, 2);

-- --------------------------------------------------------

--
-- Structure de la table `t_topic_content`
--

DROP TABLE IF EXISTS `t_topic_content`;
CREATE TABLE IF NOT EXISTS `t_topic_content` (
  `TOPIC_CONTENT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DATA` blob,
  `LENGTH` double DEFAULT NULL,
  `TYPE` varchar(255) DEFAULT NULL,
  `FK_TOPIC_ID` int(11) NOT NULL,
  `IS_TEXT` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`TOPIC_CONTENT_ID`,`FK_TOPIC_ID`),
  KEY `fk_T_TOPIC_CONTENT_T_TOPIC1_idx` (`FK_TOPIC_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
CREATE TABLE IF NOT EXISTS `t_user` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `FIRST_NAME` varchar(255) NOT NULL,
  `LAST_NAME` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `PASSWORD` varchar(32) NOT NULL,
  `CREATE_DATE` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`USER_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `t_user`
--

INSERT INTO `t_user` (`USER_ID`, `FIRST_NAME`, `LAST_NAME`, `EMAIL`, `PASSWORD`, `CREATE_DATE`) VALUES
(1, 'Souhaib', 'Massrour', 'souhaib.massrour@test.fr', '1234', '2017-10-22 15:35:12'),
(2, 'tristan', 'guillaume', 'tristan.guillaume@test.fr', '1234', '2017-10-22 15:35:12');

-- --------------------------------------------------------

--
-- Structure de la table `t_user_profile`
--

DROP TABLE IF EXISTS `t_user_profile`;
CREATE TABLE IF NOT EXISTS `t_user_profile` (
  `FK_USER_ID` int(11) NOT NULL,
  `PICTURE_PROFILE_DATA` blob,
  `PICTURE_PROFILE_LENGTH` double DEFAULT NULL,
  `PICTURE_PROFILE_TYPE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`FK_USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `t_comment`
--
ALTER TABLE `t_comment`
  ADD CONSTRAINT `fk_T_COMMENTS_T_USER1` FOREIGN KEY (`FK_USER_ID`) REFERENCES `t_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_T_COMMENT_T_TOPIC1` FOREIGN KEY (`FK_TOPIC_ID`) REFERENCES `t_topic` (`TOPIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `t_rating_comment`
--
ALTER TABLE `t_rating_comment`
  ADD CONSTRAINT `fk_T_RATING_COMMENT_T_COMMENT1` FOREIGN KEY (`FK_COMMENT_ID`) REFERENCES `t_comment` (`COMMENT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_T_RATING_COMMENT_T_USER1` FOREIGN KEY (`FK_USER_ID`) REFERENCES `t_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `t_rating_topic`
--
ALTER TABLE `t_rating_topic`
  ADD CONSTRAINT `fk_T_RATING_TOPIC_T_TOPIC1` FOREIGN KEY (`FK_TOPIC_ID`) REFERENCES `t_topic` (`TOPIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_T_RATING_TOPIC_T_USER1` FOREIGN KEY (`FK_USER_ID`) REFERENCES `t_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `t_response`
--
ALTER TABLE `t_response`
  ADD CONSTRAINT `fk_T_RESPONSES_T_COMMENTS1` FOREIGN KEY (`FK_COMMENT_ID`) REFERENCES `t_comment` (`COMMENT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_T_RESPONSES_T_USER1` FOREIGN KEY (`FK_USER_ID`) REFERENCES `t_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `t_topic`
--
ALTER TABLE `t_topic`
  ADD CONSTRAINT `fk_T_TOPIC_T_USER1` FOREIGN KEY (`FK_USER_ID`) REFERENCES `t_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `t_topic_content`
--
ALTER TABLE `t_topic_content`
  ADD CONSTRAINT `fk_T_TOPIC_CONTENT_T_TOPIC1` FOREIGN KEY (`FK_TOPIC_ID`) REFERENCES `t_topic` (`TOPIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `t_user_profile`
--
ALTER TABLE `t_user_profile`
  ADD CONSTRAINT `fk_T_USER_PROFILE_T_USER` FOREIGN KEY (`FK_USER_ID`) REFERENCES `t_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
