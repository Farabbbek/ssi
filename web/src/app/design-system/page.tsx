'use client'

import { GlassCard, GlassButton } from '@/components/ui'

/**
 * Design System Demo Page
 * 
 * This page demonstrates the Glassmorphism design system
 * including GlassCard and GlassButton components
 */
export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-navy-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-purple-indigo bg-clip-text text-transparent mb-4">
            SitHub Design System
          </h1>
          <p className="text-gray-400 text-lg">
            Glassmorphism design tokens and reusable components
          </p>
        </div>

        {/* Colors Section */}
        <GlassCard className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-6 text-purple-neon">
            🎨 Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-24 bg-navy-900 rounded-lg border-2 border-glass-border"></div>
              <p className="text-sm text-gray-400">Navy 900</p>
              <code className="text-xs text-purple-neon">#01091C</code>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-navy-800 rounded-lg border-2 border-glass-border"></div>
              <p className="text-sm text-gray-400">Navy 800</p>
              <code className="text-xs text-purple-neon">#0D1B3C</code>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-purple-neon rounded-lg"></div>
              <p className="text-sm text-gray-400">Purple Neon</p>
              <code className="text-xs text-purple-neon">#8B5CF6</code>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-indigo-neon rounded-lg"></div>
              <p className="text-sm text-gray-400">Indigo Neon</p>
              <code className="text-xs text-purple-neon">#6366F1</code>
            </div>
          </div>
        </GlassCard>

        {/* Components Section */}
        <GlassCard className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-neon">
            🧩 Components
          </h2>

          {/* GlassCard Variants */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">
              GlassCard - Variants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlassCard variant="default" className="p-4">
                <p className="text-sm text-gray-300">Default Variant</p>
                <p className="text-xs text-gray-500 mt-2">
                  Standard glass background
                </p>
              </GlassCard>
              <GlassCard variant="dark" className="p-4">
                <p className="text-sm text-gray-300">Dark Variant</p>
                <p className="text-xs text-gray-500 mt-2">
                  Darker glass background
                </p>
              </GlassCard>
              <GlassCard variant="gradient" className="p-4">
                <p className="text-sm text-gray-300">Gradient Variant</p>
                <p className="text-xs text-gray-500 mt-2">
                  Purple-indigo gradient
                </p>
              </GlassCard>
            </div>
          </div>

          {/* Interactive GlassCard */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">
              GlassCard - Interactive
            </h3>
            <GlassCard interactive className="p-6">
              <p className="text-gray-300 font-semibold">
                Hover me! 👆
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Interactive cards have smooth hover effects
              </p>
            </GlassCard>
          </div>

          {/* GlassButton Variants */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">
              GlassButton - Variants
            </h3>
            <div className="flex flex-wrap gap-4">
              <GlassButton variant="primary">
                Primary Button
              </GlassButton>
              <GlassButton variant="secondary">
                Secondary Button
              </GlassButton>
              <GlassButton variant="outlined">
                Outlined Button
              </GlassButton>
            </div>
          </div>

          {/* GlassButton Sizes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">
              GlassButton - Sizes
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <GlassButton size="sm">Small</GlassButton>
              <GlassButton size="md">Medium</GlassButton>
              <GlassButton size="lg">Large</GlassButton>
            </div>
          </div>

          {/* GlassButton States */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">
              GlassButton - States
            </h3>
            <div className="flex flex-wrap gap-4">
              <GlassButton variant="primary">Normal</GlassButton>
              <GlassButton variant="primary" isLoading>
                Loading...
              </GlassButton>
              <GlassButton variant="primary" disabled>
                Disabled
              </GlassButton>
            </div>
          </div>
        </GlassCard>

        {/* Usage Guide */}
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-purple-neon">
            📖 Usage Guide
          </h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-semibold text-indigo-neon mb-2">
                GlassCard
              </h3>
              <pre className="bg-navy-800 p-3 rounded text-xs overflow-auto">
{`import { GlassCard } from '@/components/ui'

<GlassCard variant="default" interactive>
  <p>Your content here</p>
</GlassCard>`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-neon mb-2">
                GlassButton
              </h3>
              <pre className="bg-navy-800 p-3 rounded text-xs overflow-auto">
{`import { GlassButton } from '@/components/ui'

<GlassButton 
  variant="primary" 
  size="md"
  onClick={() => {}}
>
  Click me
</GlassButton>`}
              </pre>
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  )
}
