CREATE TABLE `posts` (
	`id` text PRIMARY KEY,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`authorId` text NOT NULL,
	`createdAt` integer NOT NULL,
	CONSTRAINT `fk_posts_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
