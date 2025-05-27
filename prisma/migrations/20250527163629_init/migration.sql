-- CreateTable
CREATE TABLE "TempEmail" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TempEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tempEmailId" TEXT NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TempEmail_address_key" ON "TempEmail"("address");

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_tempEmailId_fkey" FOREIGN KEY ("tempEmailId") REFERENCES "TempEmail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
