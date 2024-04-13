CREATE TABLE IF NOT EXISTS "embeddings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"embedding" vector(768),
	"content" text,
	"metadata" jsonb,
	"document_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN IF EXISTS "embedding";--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN IF EXISTS "content";--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN IF EXISTS "metadata";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "embeddings" ADD CONSTRAINT "embeddings_document_id_notebooks_id_fk" FOREIGN KEY ("document_id") REFERENCES "notebooks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
