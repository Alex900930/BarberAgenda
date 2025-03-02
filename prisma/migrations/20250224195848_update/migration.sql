-- CreateTable
CREATE TABLE "DisabledHour" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hours" TEXT[],

    CONSTRAINT "DisabledHour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DisabledHour_date_key" ON "DisabledHour"("date");
