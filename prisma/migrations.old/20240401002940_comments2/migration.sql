/*
  Warnings:

  - You are about to drop the column `tagId` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `doots` on the `profile` table. All the data in the column will be lost.
  - Added the required column `views` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `board` DROP COLUMN `tagId`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `post` ADD COLUMN `doots` INTEGER NULL;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `doots`,
    ADD COLUMN `views` INTEGER NOT NULL,
    MODIFY `photo` VARCHAR(191) NULL;
