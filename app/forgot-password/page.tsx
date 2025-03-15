"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { PhoneCall, Sparkles, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)

      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send password reset email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 -z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-200 dark:bg-purple-900/20 blur-3xl opacity-30" />
          <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-cyan-200 dark:bg-cyan-900/20 blur-3xl opacity-30" />
          <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-amber-200 dark:bg-amber-900/20 blur-3xl opacity-20" />
        </div>
      </div>

      {/* Header */}
      <header className="w-full py-6 px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="relative">
            <PhoneCall className="h-6 w-6 text-primary" />
            <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-amber-400" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
            EchoLink
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700"
          >
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold">Reset your password</h1>
                  <p className="text-muted-foreground mt-1">
                    Enter your email and we'll send you instructions to reset your password
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-slate-50 dark:bg-slate-900"
                    />
                  </div>

                  <Button type="submit" className="w-full" variant="gradient" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send reset instructions"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Check your email</h2>
                <p className="text-muted-foreground">
                  We've sent password reset instructions to <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  If you don't see the email, check your spam folder or try another email address.
                </p>
              </div>
            )}

            <div className="mt-6 text-center text-sm">
              <Link href="/login" className="inline-flex items-center font-medium text-primary hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

