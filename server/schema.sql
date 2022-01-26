-- CREATE SCHEMA `memes` ;

DROP TABLE IF EXISTS `memes`;
DROP TABLE IF EXISTS `num`;

CREATE TABLE `memes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(200) NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  `fav` BOOLEAN,
  PRIMARY KEY (`id`));

CREATE TABLE `num` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `num` INT NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO memes(url, name, fav) VALUES("https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg", "Surprised Pikachu", false);

INSERT INTO memes(url, name, fav) VALUES("https://rb.gy/t0sssq", "Cute Puppy", false);

INSERT INTO num(num) VALUES(1);