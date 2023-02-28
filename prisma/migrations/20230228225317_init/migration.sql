-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PocketedJob" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "salary" INTEGER NOT NULL,
    "jobPositionName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobUrl" TEXT NOT NULL,
    "description" TEXT,
    "extraJobColumns" TEXT NOT NULL DEFAULT '[]',
    "rejected" BOOLEAN NOT NULL DEFAULT false,
    "offerMade" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT NOT NULL DEFAULT '[]',
    "userId" TEXT NOT NULL,

    CONSTRAINT "PocketedJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currentStep" BOOLEAN NOT NULL,
    "pocketedJobId" TEXT NOT NULL,
    "dueDate" TEXT,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PocketedJob_userId_companyName_jobPositionName_key" ON "PocketedJob"("userId", "companyName", "jobPositionName");

-- AddForeignKey
ALTER TABLE "PocketedJob" ADD CONSTRAINT "PocketedJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_pocketedJobId_fkey" FOREIGN KEY ("pocketedJobId") REFERENCES "PocketedJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
