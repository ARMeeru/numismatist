-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('private', 'unlisted', 'public');

-- CreateEnum
CREATE TYPE "CoinImageType" AS ENUM ('obverse', 'reverse', 'edge', 'detail', 'slab', 'other');

-- CreateEnum
CREATE TYPE "DatePrecision" AS ENUM ('exact', 'circa', 'range', 'unknown');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('password', 'google');

-- CreateEnum
CREATE TYPE "ContentKind" AS ENUM ('profile', 'coin', 'collection');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('new', 'reviewing', 'resolved', 'dismissed');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "passwordHash" TEXT,
    "authProvider" "AuthProvider" NOT NULL DEFAULT 'password',
    "providerId" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "displayName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "broadLocation" TEXT,
    "profileImage" TEXT,
    "publicProfileEnabled" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailVerificationToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "primaryImageId" TEXT,
    "countryRegion" TEXT,
    "rulerIssuer" TEXT,
    "dateDisplay" TEXT,
    "yearStart" INTEGER,
    "yearEnd" INTEGER,
    "datePrecision" "DatePrecision" NOT NULL DEFAULT 'unknown',
    "denomination" TEXT,
    "mint" TEXT,
    "material" TEXT,
    "weight" TEXT,
    "diameter" TEXT,
    "grade" TEXT,
    "gradingService" TEXT,
    "certificationNumber" TEXT,
    "varietySubtype" TEXT,
    "description" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'private',
    "unlistedToken" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinImage" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "originalImageUrl" TEXT,
    "type" "CoinImageType" NOT NULL,
    "altText" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogReference" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "CatalogReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provenance" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "acquisitionDate" TIMESTAMP(3),
    "acquisitionSource" TEXT,
    "acquisitionPrice" DECIMAL(12,2),
    "previousOwner" TEXT,
    "notes" TEXT,

    CONSTRAINT "Provenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "coverImageId" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'private',
    "unlistedToken" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionCoin" (
    "collectionId" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionCoin_pkey" PRIMARY KEY ("collectionId","coinId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinTag" (
    "coinId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "CoinTag_pkey" PRIMARY KEY ("coinId","tagId")
);

-- CreateTable
CREATE TABLE "CollectionTag" (
    "collectionId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "CollectionTag_pkey" PRIMARY KEY ("collectionId","tagId")
);

-- CreateTable
CREATE TABLE "ContentReport" (
    "id" TEXT NOT NULL,
    "targetType" "ContentKind" NOT NULL,
    "targetId" TEXT NOT NULL,
    "reporterUserId" TEXT,
    "reporterEmail" TEXT,
    "reason" TEXT NOT NULL,
    "details" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "ContentReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlugRedirect" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT,
    "contentType" "ContentKind" NOT NULL,
    "contentId" TEXT NOT NULL,
    "oldPath" TEXT NOT NULL,
    "newPath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SlugRedirect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_deletedAt_idx" ON "User"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_tokenHash_key" ON "EmailVerificationToken"("tokenHash");

-- CreateIndex
CREATE INDEX "EmailVerificationToken_userId_idx" ON "EmailVerificationToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Coin_primaryImageId_key" ON "Coin"("primaryImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Coin_unlistedToken_key" ON "Coin"("unlistedToken");

-- CreateIndex
CREATE INDEX "Coin_ownerId_idx" ON "Coin"("ownerId");

-- CreateIndex
CREATE INDEX "Coin_visibility_idx" ON "Coin"("visibility");

-- CreateIndex
CREATE INDEX "Coin_deletedAt_idx" ON "Coin"("deletedAt");

-- CreateIndex
CREATE INDEX "Coin_yearStart_yearEnd_idx" ON "Coin"("yearStart", "yearEnd");

-- CreateIndex
CREATE UNIQUE INDEX "Coin_ownerId_slug_key" ON "Coin"("ownerId", "slug");

-- CreateIndex
CREATE INDEX "CoinImage_coinId_sortOrder_idx" ON "CoinImage"("coinId", "sortOrder");

-- CreateIndex
CREATE INDEX "CatalogReference_coinId_idx" ON "CatalogReference"("coinId");

-- CreateIndex
CREATE UNIQUE INDEX "Provenance_coinId_key" ON "Provenance"("coinId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_unlistedToken_key" ON "Collection"("unlistedToken");

-- CreateIndex
CREATE INDEX "Collection_ownerId_idx" ON "Collection"("ownerId");

-- CreateIndex
CREATE INDEX "Collection_visibility_idx" ON "Collection"("visibility");

-- CreateIndex
CREATE INDEX "Collection_deletedAt_idx" ON "Collection"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_ownerId_slug_key" ON "Collection"("ownerId", "slug");

-- CreateIndex
CREATE INDEX "CollectionCoin_coinId_idx" ON "CollectionCoin"("coinId");

-- CreateIndex
CREATE INDEX "CollectionCoin_collectionId_sortOrder_idx" ON "CollectionCoin"("collectionId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "CoinTag_tagId_idx" ON "CoinTag"("tagId");

-- CreateIndex
CREATE INDEX "CollectionTag_tagId_idx" ON "CollectionTag"("tagId");

-- CreateIndex
CREATE INDEX "ContentReport_targetType_targetId_idx" ON "ContentReport"("targetType", "targetId");

-- CreateIndex
CREATE INDEX "ContentReport_status_idx" ON "ContentReport"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SlugRedirect_oldPath_key" ON "SlugRedirect"("oldPath");

-- CreateIndex
CREATE INDEX "SlugRedirect_contentType_contentId_idx" ON "SlugRedirect"("contentType", "contentId");

-- AddForeignKey
ALTER TABLE "EmailVerificationToken" ADD CONSTRAINT "EmailVerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_primaryImageId_fkey" FOREIGN KEY ("primaryImageId") REFERENCES "CoinImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinImage" ADD CONSTRAINT "CoinImage_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatalogReference" ADD CONSTRAINT "CatalogReference_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provenance" ADD CONSTRAINT "Provenance_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionCoin" ADD CONSTRAINT "CollectionCoin_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionCoin" ADD CONSTRAINT "CollectionCoin_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinTag" ADD CONSTRAINT "CoinTag_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinTag" ADD CONSTRAINT "CoinTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionTag" ADD CONSTRAINT "CollectionTag_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionTag" ADD CONSTRAINT "CollectionTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentReport" ADD CONSTRAINT "ContentReport_reporterUserId_fkey" FOREIGN KEY ("reporterUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlugRedirect" ADD CONSTRAINT "SlugRedirect_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
