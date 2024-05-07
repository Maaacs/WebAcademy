/*
  Warnings:

  - You are about to drop the column `quantidae` on the `compras_produtos` table. All the data in the column will be lost.
  - Added the required column `quantidade` to the `compras_produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `compras_produtos` DROP COLUMN `quantidae`,
    ADD COLUMN `quantidade` INTEGER NOT NULL;
