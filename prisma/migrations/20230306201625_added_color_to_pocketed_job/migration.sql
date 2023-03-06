/*
  Warnings:

  - Added the required column `stepNumber` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "stepNumber" INTEGER NOT NULL,
ALTER COLUMN "stepDescription" DROP NOT NULL;
