/*
  Warnings:

  - You are about to drop the column `status` on the `appointments` table. All the data in the column will be lost.
*/

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

-- Crear la nueva tabla
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Copiar datos de appointments a new_appointments
INSERT INTO "new_appointments" ("clientEmail", "clientName", "clientPhone", "createdAt", "date", "id", "time", "updatedAt") 
SELECT "clientEmail", "clientName", "clientPhone", "createdAt", "date", "id", "time", "updatedAt" 
FROM "appointments";

-- Eliminar la tabla original
DROP TABLE "appointments";

-- Renombrar la nueva tabla
ALTER TABLE "new_appointments" RENAME TO "appointments";

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;