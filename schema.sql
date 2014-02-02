DROP DATABASE IF EXISTS `chatterbox`;
CREATE DATABASE `chatterbox`;
USE chatterbox;


CREATE TABLE `messages` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `text` VARCHAR(200) NULL DEFAULT NULL,
  `username` VARCHAR(20) NULL DEFAULT NULL,
  `roomname` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`username`)
);


DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `roomname` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`roomname`)
);


DROP TABLE IF EXISTS `friends`;
CREATE TABLE `friends` (
  `username` VARCHAR(20) NULL DEFAULT NULL,
  `friends` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`username`)
);


ALTER TABLE `messages` ADD FOREIGN KEY (`username`) REFERENCES `users` (`username`);
ALTER TABLE `messages` ADD FOREIGN KEY (`roomname`) REFERENCES `rooms` (`roomname`);
ALTER TABLE `friends` ADD FOREIGN KEY (`username`) REFERENCES `users` (`username`);
