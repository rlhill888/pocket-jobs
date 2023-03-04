/*
  Warnings:

  - You are about to drop the column `extraJobColumns` on the `PocketedJob` table. All the data in the column will be lost.
  - Added the required column `jobBoardId` to the `PocketedJob` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stepDescription` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PocketedJob" DROP COLUMN "extraJobColumns",
ADD COLUMN     "jobBoardId" TEXT NOT NULL,
ADD COLUMN     "jobColumns" TEXT NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "stepDescription" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "JobBoard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "defaultJobColumns" TEXT NOT NULL DEFAULT '[]',
    "userId" TEXT NOT NULL,

    CONSTRAINT "JobBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PocketedJob" ADD CONSTRAINT "PocketedJob_jobBoardId_fkey" FOREIGN KEY ("jobBoardId") REFERENCES "JobBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobBoard" ADD CONSTRAINT "JobBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
