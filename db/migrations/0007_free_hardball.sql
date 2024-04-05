ALTER TABLE "notes" RENAME TO "notebooks";--> statement-breakpoint
ALTER TABLE "documents" RENAME COLUMN "note_id" TO "notebook_id";--> statement-breakpoint
ALTER TABLE "documents" DROP CONSTRAINT "documents_note_id_notes_id_fk";
--> statement-breakpoint
ALTER TABLE "notebooks" DROP CONSTRAINT "notes_author_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "embedding" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "pending" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "notebook_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "notebook_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notebooks" ALTER COLUMN "author_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "notebooks" ALTER COLUMN "author_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_notebook_id_notebooks_id_fk" FOREIGN KEY ("notebook_id") REFERENCES "notebooks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notebooks" ADD CONSTRAINT "notebooks_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
