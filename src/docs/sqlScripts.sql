SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `Sasku` DEFAULT CHARACTER SET utf8 COLLATE utf8_estonian_ci ;
USE `Sasku` ;

-- -----------------------------------------------------
-- Table `Sasku`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sasku`.`groups` (
  `idgroups` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `description` VARCHAR(45) NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`idgroups`),
  UNIQUE INDEX `idgroups_UNIQUE` (`idgroups` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sasku`.`tourments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sasku`.`tourments` (
  `idtourments` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `type` ENUM('paarikas', 'individuaal', 'suvesari') NOT NULL,
  `descriptions` VARCHAR(100) NULL,
  `groups_idgroups` INT NOT NULL,
  PRIMARY KEY (`idtourments`),
  INDEX `fk_tourments_groups1_idx` (`groups_idgroups` ASC),
  UNIQUE INDEX `idtourments_UNIQUE` (`idtourments` ASC),
  CONSTRAINT `fk_tourments_groups1`
    FOREIGN KEY (`groups_idgroups`)
    REFERENCES `Sasku`.`groups` (`idgroups`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sasku`.`rounds`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sasku`.`rounds` (
  `idrounds` INT NOT NULL AUTO_INCREMENT,
  `tableNumber` INT NOT NULL,
  `roundCount` INT NOT NULL,
  `tourments_idtourments` INT NOT NULL,
  PRIMARY KEY (`idrounds`),
  INDEX `fk_rounds_tourments_idx` (`tourments_idtourments` ASC),
  UNIQUE INDEX `idrounds_UNIQUE` (`idrounds` ASC),
  CONSTRAINT `fk_rounds_tourments`
    FOREIGN KEY (`tourments_idtourments`)
    REFERENCES `Sasku`.`tourments` (`idtourments`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sasku`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sasku`.`games` (
  `idtourments` INT NOT NULL AUTO_INCREMENT,
  `rounds_idrounds` INT NOT NULL,
  PRIMARY KEY (`idtourments`),
  INDEX `fk_games_rounds1_idx` (`rounds_idrounds` ASC),
  UNIQUE INDEX `idtourments_UNIQUE` (`idtourments` ASC),
  CONSTRAINT `fk_games_rounds1`
    FOREIGN KEY (`rounds_idrounds`)
    REFERENCES `Sasku`.`rounds` (`idrounds`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sasku`.`players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sasku`.`players` (
  `idplayers` INT NOT NULL AUTO_INCREMENT,
  `firsName` VARCHAR(20) NOT NULL,
  `lasName` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(15) NULL,
  `tel` INT NOT NULL,
  `messenger` VARCHAR(20) NULL,
  `description` VARCHAR(20) NULL,
  `created` DATETIME NOT NULL,
  `role` ENUM('1', '0') NULL,
  PRIMARY KEY (`idplayers`),
  UNIQUE INDEX `idplayers_UNIQUE` (`idplayers` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sasku`.`results`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sasku`.`results` (
  `idresults` INT NOT NULL AUTO_INCREMENT,
  `points` INT NOT NULL,
  `win` ENUM('1', '0') NOT NULL,
  `karvane` ENUM('1', '0') NULL,
  `saw` ENUM('1', '0') NULL,
  `getKarvane` ENUM('1', '0') NULL,
  `getSaw` ENUM('1', '0') NULL,
  `games_idtourments` INT NOT NULL,
  `players_idplayers` INT NOT NULL,
  PRIMARY KEY (`idresults`),
  INDEX `fk_results_games1_idx` (`games_idtourments` ASC),
  INDEX `fk_results_players1_idx` (`players_idplayers` ASC),
  UNIQUE INDEX `idresults_UNIQUE` (`idresults` ASC),
  CONSTRAINT `fk_results_games1`
    FOREIGN KEY (`games_idtourments`)
    REFERENCES `Sasku`.`games` (`idtourments`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_results_players1`
    FOREIGN KEY (`players_idplayers`)
    REFERENCES `Sasku`.`players` (`idplayers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sasku`.`saw`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sasku`.`saw` (
  `idsaw` INT NOT NULL AUTO_INCREMENT,
  `players_idplayers` INT NOT NULL,
  `games_idtourments` INT NOT NULL,
  PRIMARY KEY (`idsaw`),
  INDEX `fk_saw_players1_idx` (`players_idplayers` ASC),
  INDEX `fk_saw_games1_idx` (`games_idtourments` ASC),
  UNIQUE INDEX `idsaw_UNIQUE` (`idsaw` ASC),
  CONSTRAINT `fk_saw_players1`
    FOREIGN KEY (`players_idplayers`)
    REFERENCES `Sasku`.`players` (`idplayers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_saw_games1`
    FOREIGN KEY (`games_idtourments`)
    REFERENCES `Sasku`.`games` (`idtourments`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sasku`.`groups_players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sasku`.`groups_players` (
  `idgroups_players` INT NOT NULL AUTO_INCREMENT,
  `players_idplayers` INT NOT NULL,
  `groups_idgroups` INT NOT NULL,
  PRIMARY KEY (`idgroups_players`),
  INDEX `fk_groups_players_players1_idx` (`players_idplayers` ASC),
  INDEX `fk_groups_players_groups1_idx` (`groups_idgroups` ASC),
  UNIQUE INDEX `idgroups_players_UNIQUE` (`idgroups_players` ASC),
  CONSTRAINT `fk_groups_players_players1`
    FOREIGN KEY (`players_idplayers`)
    REFERENCES `Sasku`.`players` (`idplayers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_groups_players_groups1`
    FOREIGN KEY (`groups_idgroups`)
    REFERENCES `Sasku`.`groups` (`idgroups`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sasku`.`karvane`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sasku`.`karvane` (
  `idkarvane` INT NOT NULL AUTO_INCREMENT,
  `players_idplayers` INT NOT NULL,
  `games_idtourments` INT NOT NULL,
  PRIMARY KEY (`idkarvane`),
  INDEX `fk_karvane_players1_idx` (`players_idplayers` ASC),
  INDEX `fk_karvane_games1_idx` (`games_idtourments` ASC),
  UNIQUE INDEX `idkarvane_UNIQUE` (`idkarvane` ASC),
  CONSTRAINT `fk_karvane_players1`
    FOREIGN KEY (`players_idplayers`)
    REFERENCES `Sasku`.`players` (`idplayers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_karvane_games1`
    FOREIGN KEY (`games_idtourments`)
    REFERENCES `Sasku`.`games` (`idtourments`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
