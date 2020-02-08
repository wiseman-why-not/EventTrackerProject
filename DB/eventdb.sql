-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eventdb` ;

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventdb` DEFAULT CHARACTER SET utf8 ;
USE `eventdb` ;

-- -----------------------------------------------------
-- Table `Crime`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Crime` ;

CREATE TABLE IF NOT EXISTS `Crime` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `crime_name` VARCHAR(100) NOT NULL,
  `neighborhood` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS eventuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'eventuser'@'localhost' IDENTIFIED BY 'event';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'eventuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `Crime`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventdb`;
INSERT INTO `Crime` (`id`, `crime_name`, `neighborhood`) VALUES (1, 'Murder', 'LoDo');
INSERT INTO `Crime` (`id`, `crime_name`, `neighborhood`) VALUES (2, 'Robbery', 'Cherry Creek');
INSERT INTO `Crime` (`id`, `crime_name`, `neighborhood`) VALUES (3, 'Arson', 'River North Art Distric');
INSERT INTO `Crime` (`id`, `crime_name`, `neighborhood`) VALUES (4, 'Assault', 'Washington Park');
INSERT INTO `Crime` (`id`, `crime_name`, `neighborhood`) VALUES (5, 'Body Snatching', 'West Colfax');
INSERT INTO `Crime` (`id`, `crime_name`, `neighborhood`) VALUES (6, 'Hijacking', 'Plat Park');
INSERT INTO `Crime` (`id`, `crime_name`, `neighborhood`) VALUES (7, 'Kidnapping', 'Greenwood Village');
INSERT INTO `Crime` (`id`, `crime_name`, `neighborhood`) VALUES (8, 'Prison Escape', 'Wellshire');
INSERT INTO `Crime` (`id`, `crime_name`, `neighborhood`) VALUES (9, 'Riots', 'Belcaro');
INSERT INTO `Crime` (`id`, `crime_name`, `neighborhood`) VALUES (10, 'Stalking', 'Cherry Creek');

COMMIT;

