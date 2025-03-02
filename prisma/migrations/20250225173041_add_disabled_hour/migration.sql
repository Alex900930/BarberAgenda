/*
  Warnings:

  - You are about to drop the `DisabledHour` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DisabledHour";

-- CreateTable
CREATE TABLE "disabledHour" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hours" TEXT[],

    CONSTRAINT "disabledHour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disabledHour_date_key" ON "disabledHour"("date");
