-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "github_id" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "public_respos" INTEGER NOT NULL,
    "bio" TEXT,
    "blog" TEXT,
    "login" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
