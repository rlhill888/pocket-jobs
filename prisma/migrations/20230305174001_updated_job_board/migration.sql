/*
  Warnings:

  - Added the required column `color` to the `JobBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `JobBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobBoard" ADD COLUMN     "allColumns" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
