/*
  Warnings:

  - You are about to drop the column `profilePictureUrl` on the `Pessoa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "profilePictureUrl",
ADD COLUMN     "urlFotoPerfil" TEXT;
