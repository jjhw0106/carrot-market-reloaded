-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SmsToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "SmsToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SmsToken" ("created_at", "id", "token", "updated_at", "userId") SELECT "created_at", "id", "token", "updated_at", "userId" FROM "SmsToken";
DROP TABLE "SmsToken";
ALTER TABLE "new_SmsToken" RENAME TO "SmsToken";
CREATE UNIQUE INDEX "SmsToken_token_key" ON "SmsToken"("token");
PRAGMA foreign_key_check("SmsToken");
PRAGMA foreign_keys=ON;
