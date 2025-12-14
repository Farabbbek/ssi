-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'DEVELOPER');

-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('ADMIN', 'DEVELOPER');

-- CreateEnum
CREATE TYPE "PRStatus" AS ENUM ('OPEN', 'CLOSED', 'MERGED');

-- CreateEnum
CREATE TYPE "ScanStatus" AS ENUM ('QUEUED', 'SCANNING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'DEVELOPER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "repo_path" TEXT NOT NULL,
    "is_private" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMember" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "ProjectRole" NOT NULL DEFAULT 'DEVELOPER',
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "protected" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PullRequest" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "source_branch" TEXT NOT NULL,
    "target_branch" TEXT NOT NULL,
    "status" "PRStatus" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "merged_at" TIMESTAMP(3),
    "author_id" TEXT NOT NULL,

    CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrivyScan" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "commit_hash" TEXT NOT NULL,
    "scan_results" JSONB NOT NULL,
    "severity_counts" JSONB NOT NULL,
    "status" "ScanStatus" NOT NULL DEFAULT 'QUEUED',
    "scanned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrivyScan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    "project_id" TEXT,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_repo_path_key" ON "Project"("repo_path");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMember_project_id_user_id_key" ON "ProjectMember"("project_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_project_id_name_key" ON "Branch"("project_id", "name");

-- CreateIndex
CREATE INDEX "TrivyScan_project_id_commit_hash_idx" ON "TrivyScan"("project_id", "commit_hash");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PullRequest" ADD CONSTRAINT "PullRequest_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PullRequest" ADD CONSTRAINT "PullRequest_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrivyScan" ADD CONSTRAINT "TrivyScan_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

