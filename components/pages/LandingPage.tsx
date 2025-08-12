'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Brain, Lock, Sparkles } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your Personal
            <span className="text-blue-600 dark:text-blue-400"> Digital Journal</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Write, reflect, and discover insights about yourself with our AI-powered journal application.
          </p>

          <div className="space-x-4">
            <Button
              size="lg"
              onClick={() => signIn('google')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign in with Google
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => signIn('github')}
            >
              Sign in with GitHub
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Write Freely</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Express your thoughts in a clean, distraction-free environment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Get meaningful insights and summaries of your journal entries.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle>Private & Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Your thoughts are encrypted and kept completely private.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Sparkles className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Track Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Discover patterns in your mood and thoughts over time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

