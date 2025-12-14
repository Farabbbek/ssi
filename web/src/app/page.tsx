'use client'

import { GlassCard, GlassButton } from '@/components/ui'

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900">
      {/* Navigation */}
      <nav className="backdrop-blur-glass bg-glass-dark border-b border-glass-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold bg-gradient-purple-indigo bg-clip-text text-transparent">
              SitHub
            </div>
          </div>
          <div className="flex gap-3">
            <GlassButton variant="secondary" size="sm">
              Sign In
            </GlassButton>
            <GlassButton variant="primary" size="sm">
              Get Started
            </GlassButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-purple-indigo bg-clip-text text-transparent mb-6">
            Self-Hosted Corporate Code Repository
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Secure, enterprise-grade repository management with vulnerability scanning and audit logs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <GlassButton variant="primary" size="lg">
              Start Free Trial
            </GlassButton>
            <GlassButton variant="outlined" size="lg">
              Learn More
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 mb-16">
        <h2 className="text-3xl font-bold text-center text-purple-neon mb-12">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard interactive className="p-8">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Repositories
            </h3>
            <p className="text-gray-400">
              Manage your corporate code repositories with fine-grained access control and branch protection.
            </p>
          </GlassCard>

          <GlassCard interactive className="p-8">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Security
            </h3>
            <p className="text-gray-400">
              JWT-based authentication with role-based permissions and comprehensive audit logging.
            </p>
          </GlassCard>

          <GlassCard interactive className="p-8">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Vulnerability Scanning
            </h3>
            <p className="text-gray-400">
              Automated security scanning with Trivy to detect vulnerabilities in your code.
            </p>
          </GlassCard>

          <GlassCard interactive className="p-8">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Team Management
            </h3>
            <p className="text-gray-400">
              Invite team members and assign roles. Control who can review, merge, and deploy.
            </p>
          </GlassCard>

          <GlassCard interactive className="p-8">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Analytics
            </h3>
            <p className="text-gray-400">
              Track vulnerability trends, audit activity, and team productivity with detailed reports.
            </p>
          </GlassCard>

          <GlassCard interactive className="p-8">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Fast & Reliable
            </h3>
            <p className="text-gray-400">
              Built for performance with PostgreSQL backend and optimized API endpoints.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-2xl mx-auto px-6 py-16 mb-16">
        <GlassCard variant="gradient" className="p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-300 mb-8">
            Deploy SitHub on your own infrastructure today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <GlassButton variant="primary" size="lg">
              Deploy Now
            </GlassButton>
            <GlassButton variant="secondary" size="lg">
              Documentation
            </GlassButton>
          </div>
        </GlassCard>
      </section>

      {/* Design System Link */}
      <section className="max-w-6xl mx-auto px-6 py-8 text-center border-t border-glass-border">
        <p className="text-gray-400 mb-4">
          👨‍💻 Frontend developers: Check out our design system
        </p>
        <GlassButton variant="outlined" size="md">
          View Design System
        </GlassButton>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass-border mt-16 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2025 SitHub. Self-hosted repository management platform.</p>
        </div>
      </footer>
    </main>
  )
}
