-- CreateTable
CREATE TABLE `CompletedLesson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lessonId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `completedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CompletedLesson_lessonId_idx`(`lessonId`),
    INDEX `CompletedLesson_studentId_idx`(`studentId`),
    UNIQUE INDEX `CompletedLesson_lessonId_studentId_key`(`lessonId`, `studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CompletedLesson` ADD CONSTRAINT `CompletedLesson_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompletedLesson` ADD CONSTRAINT `CompletedLesson_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
