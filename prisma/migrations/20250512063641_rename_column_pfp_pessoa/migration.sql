/*
  Warnings:

  - You are about to drop the column `urlFotoPerfil` on the `Pessoa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "urlFotoPerfil",
ADD COLUMN     "fotoPerfil" TEXT;
