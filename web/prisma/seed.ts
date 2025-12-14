import { PrismaClient, UserRole } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean up existing data
  console.log('🗑️  Cleaning up existing data...')
  await prisma.auditLog.deleteMany()
  await prisma.trivyScan.deleteMany()
  await prisma.pullRequest.deleteMany()
  await prisma.branch.deleteMany()
  await prisma.projectMember.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()

  // Hash password for admin user
  const adminPassword = 'password123'
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10)

  // Create admin user
  console.log('👤 Creating admin user...')
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@sithub.local',
      password_hash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
  })

  console.log(`✅ Created admin user: ${adminUser.username} (${adminUser.email})`)

  // Create developer user
  console.log('👤 Creating developer user...')
  const devPassword = 'dev123456'
  const devPasswordHash = await bcrypt.hash(devPassword, 10)

  const devUser = await prisma.user.create({
    data: {
      username: 'developer',
      email: 'dev@sithub.local',
      password_hash: devPasswordHash,
      role: UserRole.DEVELOPER,
    },
  })

  console.log(`✅ Created developer user: ${devUser.username} (${devUser.email})`)

  // Create a sample project
  console.log('📦 Creating sample project...')
  const sampleProject = await prisma.project.create({
    data: {
      name: 'Sample Repository',
      description: 'A sample repository for demonstration purposes',
      repo_path: 'sithub/sample-repo',
      is_private: false,
      created_by_id: adminUser.id,
    },
  })

  console.log(`✅ Created sample project: ${sampleProject.name}`)

  // Add admin as project member
  console.log('👥 Adding admin as project member...')
  await prisma.projectMember.create({
    data: {
      project_id: sampleProject.id,
      user_id: adminUser.id,
      role: 'ADMIN',
    },
  })

  // Add developer as project member
  console.log('👥 Adding developer as project member...')
  await prisma.projectMember.create({
    data: {
      project_id: sampleProject.id,
      user_id: devUser.id,
      role: 'DEVELOPER',
    },
  })

  console.log('✅ Project members added')

  // Create branches
  console.log('🌿 Creating branches...')
  const mainBranch = await prisma.branch.create({
    data: {
      project_id: sampleProject.id,
      name: 'main',
      is_default: true,
      protected: true,
    },
  })

  const devBranch = await prisma.branch.create({
    data: {
      project_id: sampleProject.id,
      name: 'develop',
      is_default: false,
      protected: false,
    },
  })

  console.log(`✅ Created branches: ${mainBranch.name}, ${devBranch.name}`)

  // Create a sample pull request
  console.log('🔀 Creating pull request...')
  const pr = await prisma.pullRequest.create({
    data: {
      project_id: sampleProject.id,
      title: 'Feature: Security scanning integration',
      description: 'Integrate Trivy for vulnerability scanning',
      source_branch: devBranch.name,
      target_branch: mainBranch.name,
      author_id: devUser.id,
      status: 'OPEN',
    },
  })

  console.log(`✅ Created pull request: "${pr.title}"`)

  // Create a sample Trivy scan
  console.log('🔍 Creating Trivy scan result...')
  const scan = await prisma.trivyScan.create({
    data: {
      project_id: sampleProject.id,
      commit_hash: 'abc123def456',
      scan_results: {
        vulnerabilities: [
          {
            type: 'CVE-2024-1234',
            severity: 'HIGH',
            description: 'Sample vulnerability for demonstration',
          },
        ],
        summary: {
          total: 3,
          critical: 0,
          high: 1,
          medium: 2,
          low: 0,
        },
      },
      severity_counts: {
        CRITICAL: 0,
        HIGH: 1,
        MEDIUM: 2,
        LOW: 0,
        UNKNOWN: 0,
      },
      status: 'COMPLETED',
    },
  })

  console.log(`✅ Created Trivy scan for commit: ${scan.commit_hash}`)

  // Create sample audit logs
  console.log('📝 Creating audit logs...')
  await prisma.auditLog.create({
    data: {
      action: 'PROJECT_CREATED',
      details: {
        project_id: sampleProject.id,
        project_name: sampleProject.name,
        repo_path: sampleProject.repo_path,
      },
      user_id: adminUser.id,
      project_id: sampleProject.id,
    },
  })

  await prisma.auditLog.create({
    data: {
      action: 'MEMBER_ADDED',
      details: {
        project_id: sampleProject.id,
        user_id: devUser.id,
        role: 'DEVELOPER',
      },
      user_id: adminUser.id,
      project_id: sampleProject.id,
    },
  })

  console.log('✅ Audit logs created')

  console.log('\n✨ Database seeded successfully!')
  console.log('\n📊 Summary:')
  console.log(`  ✓ Users: 2 (admin, developer)`)
  console.log(`  ✓ Projects: 1`)
  console.log(`  ✓ Project Members: 2`)
  console.log(`  ✓ Branches: 2`)
  console.log(`  ✓ Pull Requests: 1`)
  console.log(`  ✓ Trivy Scans: 1`)
  console.log(`  ✓ Audit Logs: 2`)
  console.log('\n🔐 Admin credentials:')
  console.log(`  Email: admin@sithub.local`)
  console.log(`  Password: ${adminPassword}`)
  console.log('\n👨‍💻 Developer credentials:')
  console.log(`  Email: dev@sithub.local`)
  console.log(`  Password: ${devPassword}`)
}


main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
