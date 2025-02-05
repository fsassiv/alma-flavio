/*
  Warnings:

  - Added the required column `userCVName` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCVType` to the `leads` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_leads" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "countryOfCitizenship" TEXT NOT NULL,
    "personalUrl" TEXT NOT NULL,
    "visaInterest" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "userCV" BLOB NOT NULL,
    "userCVName" TEXT NOT NULL,
    "userCVType" TEXT NOT NULL
);
INSERT INTO "new_leads" ("countryOfCitizenship", "createdAt", "email", "firstName", "id", "lastName", "message", "personalUrl", "status", "userCV", "visaInterest") SELECT "countryOfCitizenship", "createdAt", "email", "firstName", "id", "lastName", "message", "personalUrl", "status", "userCV", "visaInterest" FROM "leads";
DROP TABLE "leads";
ALTER TABLE "new_leads" RENAME TO "leads";
CREATE UNIQUE INDEX "leads_email_key" ON "leads"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
