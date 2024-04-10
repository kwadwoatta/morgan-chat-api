ALTER TABLE "documents" ALTER COLUMN "embedding" SET DATA TYPE vector(768);--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN IF EXISTS "storage_link";