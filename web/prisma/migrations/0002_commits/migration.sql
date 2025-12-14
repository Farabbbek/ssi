-- Add missing commit/merge support on top of 0001 schema

-- Add optional references for last commit and PR merger
ALTER TABLE "Branch" ADD COLUMN     "last_commit_id" TEXT;
ALTER TABLE "PullRequest" ADD COLUMN "merged_by_id"  TEXT;

-- New commits table
CREATE TABLE "Commit" (
    "id"         TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "branch_id"  TEXT NOT NULL,
    "author_id"  TEXT NOT NULL,
    "hash"       TEXT NOT NULL,
    "message"    TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Commit_pkey" PRIMARY KEY ("id")
);

-- Indexes for commits
CREATE UNIQUE INDEX "Commit_hash_key" ON "Commit"("hash");
CREATE INDEX "Commit_project_id_branch_id_idx" ON "Commit"("project_id", "branch_id");

-- Foreign keys for commits
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_branch_id_fkey"  FOREIGN KEY ("branch_id")  REFERENCES "Branch"("id")  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_author_id_fkey"  FOREIGN KEY ("author_id")  REFERENCES "User"("id")    ON DELETE CASCADE ON UPDATE CASCADE;

-- Foreign keys for new optional columns
ALTER TABLE "Branch"      ADD CONSTRAINT "Branch_last_commit_id_fkey"   FOREIGN KEY ("last_commit_id") REFERENCES "Commit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PullRequest" ADD CONSTRAINT "PullRequest_merged_by_id_fkey" FOREIGN KEY ("merged_by_id")   REFERENCES "User"("id")   ON DELETE SET NULL ON UPDATE CASCADE;

