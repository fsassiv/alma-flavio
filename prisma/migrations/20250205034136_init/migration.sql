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
    "status" TEXT NOT NULL DEFAULT 'PENDING '
);
INSERT INTO "new_leads" ("countryOfCitizenship", "createdAt", "email", "firstName", "id", "lastName", "message", "personalUrl", "visaInterest") SELECT "countryOfCitizenship", "createdAt", "email", "firstName", "id", "lastName", "message", "personalUrl", "visaInterest" FROM "leads";
DROP TABLE "leads";
ALTER TABLE "new_leads" RENAME TO "leads";
CREATE UNIQUE INDEX "leads_email_key" ON "leads"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
