/*
  Warnings:

  - You are about to drop the column `pessoaId` on the `Trabalho` table. All the data in the column will be lost.
  - Added the required column `trabalhoId` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trabalho" DROP CONSTRAINT "Trabalho_pessoaId_fkey";

-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "trabalhoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trabalho" DROP COLUMN "pessoaId";

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_trabalhoId_fkey" FOREIGN KEY ("trabalhoId") REFERENCES "Trabalho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
