/*
  Warnings:

  - You are about to drop the `disabledHour` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "disabledHour";

-- CreateTable
CREATE TABLE "disabledhour" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hours" TEXT[],

    CONSTRAINT "disabledhour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disabledhour_date_key" ON "disabledhour"("date");
