-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_fundamentos_1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_fundamentos_1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_fundamentos_1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `db_fundamentos_1` ;

-- -----------------------------------------------------
-- Table `db_fundamentos_1`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_fundamentos_1`.`Categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_fundamentos_1`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_fundamentos_1`.`Cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nome_completo` VARCHAR(191) NOT NULL,
  `cpf` VARCHAR(191) NOT NULL,
  `celular` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `data_nascimento` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE INDEX `Cliente_cpf_key` (`cpf` ASC) VISIBLE,
  UNIQUE INDEX `Cliente_email_key` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_fundamentos_1`.`Endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_fundamentos_1`.`Endereco` (
  `id_endereco` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `logradouro` VARCHAR(191) NOT NULL,
  `numero` INT NOT NULL,
  `complemento` VARCHAR(191) NULL DEFAULT NULL,
  `cidade` VARCHAR(191) NOT NULL,
  `estado` VARCHAR(191) NOT NULL,
  `cep` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_endereco`),
  INDEX `Endereco_id_cliente_fkey` (`id_cliente` ASC) VISIBLE,
  CONSTRAINT `Endereco_id_cliente_fkey`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `db_fundamentos_1`.`Cliente` (`id_cliente`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_fundamentos_1`.`Compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_fundamentos_1`.`Compra` (
  `id_compra` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_endereco` INT NOT NULL,
  `data_hora` DATETIME(3) NOT NULL,
  `desconto` DECIMAL(65,30) NULL DEFAULT NULL,
  `forma_pagamento` VARCHAR(191) NOT NULL,
  `total` DECIMAL(65,30) NOT NULL,
  PRIMARY KEY (`id_compra`),
  INDEX `Compra_id_cliente_fkey` (`id_cliente` ASC) VISIBLE,
  INDEX `Compra_id_endereco_fkey` (`id_endereco` ASC) VISIBLE,
  CONSTRAINT `Compra_id_cliente_fkey`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `db_fundamentos_1`.`Cliente` (`id_cliente`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `Compra_id_endereco_fkey`
    FOREIGN KEY (`id_endereco`)
    REFERENCES `db_fundamentos_1`.`Endereco` (`id_endereco`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_fundamentos_1`.`Subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_fundamentos_1`.`Subcategoria` (
  `id_subcategoria` INT NOT NULL AUTO_INCREMENT,
  `id_categoria` INT NOT NULL,
  `nome` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_subcategoria`),
  INDEX `Subcategoria_id_categoria_fkey` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `Subcategoria_id_categoria_fkey`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `db_fundamentos_1`.`Categoria` (`id_categoria`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_fundamentos_1`.`Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_fundamentos_1`.`Produto` (
  `id_produto` INT NOT NULL AUTO_INCREMENT,
  `id_subcategoria` INT NOT NULL,
  `modelo` VARCHAR(191) NOT NULL,
  `fabricante` VARCHAR(191) NOT NULL,
  `preco_base` DECIMAL(65,30) NOT NULL,
  `quantidade_disponivel` INT NOT NULL,
  PRIMARY KEY (`id_produto`),
  INDEX `Produto_id_subcategoria_fkey` (`id_subcategoria` ASC) VISIBLE,
  CONSTRAINT `Produto_id_subcategoria_fkey`
    FOREIGN KEY (`id_subcategoria`)
    REFERENCES `db_fundamentos_1`.`Subcategoria` (`id_subcategoria`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_fundamentos_1`.`ItemCompra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_fundamentos_1`.`ItemCompra` (
  `id_item_compra` INT NOT NULL AUTO_INCREMENT,
  `id_compra` INT NOT NULL,
  `id_produto` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `preco_venda` DECIMAL(65,30) NOT NULL,
  PRIMARY KEY (`id_item_compra`),
  INDEX `ItemCompra_id_compra_fkey` (`id_compra` ASC) VISIBLE,
  INDEX `ItemCompra_id_produto_fkey` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `ItemCompra_id_compra_fkey`
    FOREIGN KEY (`id_compra`)
    REFERENCES `db_fundamentos_1`.`Compra` (`id_compra`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `ItemCompra_id_produto_fkey`
    FOREIGN KEY (`id_produto`)
    REFERENCES `db_fundamentos_1`.`Produto` (`id_produto`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_fundamentos_1`.`NumeroSerie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_fundamentos_1`.`NumeroSerie` (
  `id_num_serie` INT NOT NULL AUTO_INCREMENT,
  `id_produto` INT NOT NULL,
  `numero_serie` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id_num_serie`),
  UNIQUE INDEX `NumeroSerie_numero_serie_key` (`numero_serie` ASC) VISIBLE,
  INDEX `NumeroSerie_id_produto_fkey` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `NumeroSerie_id_produto_fkey`
    FOREIGN KEY (`id_produto`)
    REFERENCES `db_fundamentos_1`.`Produto` (`id_produto`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;