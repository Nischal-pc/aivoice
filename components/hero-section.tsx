"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PhoneCall, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-200 dark:bg-purple-900/20 blur-3xl opacity-30" />
        <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-cyan-200 dark:bg-cyan-900/20 blur-3xl opacity-30" />
        <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-amber-200 dark:bg-amber-900/20 blur-3xl opacity-20" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-sm font-medium text-slate-800 dark:text-slate-200 mb-6">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Powered by Meta LLAMA 3.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI-Powered Voice Calling
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
                Reimagined
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Transform your communication with EchoLink's intelligent voice system. Natural conversations, real-time
              insights, and seamless integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md">
              {/* Phone mockup with glowing effect */}
              <div className="relative rounded-[40px] border-8 border-slate-800 dark:border-slate-700 overflow-hidden shadow-2xl aspect-[9/16] bg-white dark:bg-slate-800">
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 dark:bg-slate-700 flex justify-center items-center">
                  <div className="w-20 h-1 bg-slate-600 dark:bg-slate-500 rounded-full"></div>
                </div>

                {/* Phone screen content */}
                <div className="absolute inset-0 pt-6 px-2 overflow-hidden">
                  {/* Call interface */}
                  <div className="h-full flex flex-col bg-gradient-to-b from-purple-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl overflow-hidden">
                    <div className="p-4 text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-white">JD</span>
                      </div>
                      <h3 className="text-xl font-bold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">AI-Powered Call</p>
                    </div>

                    <div className="flex-1 p-4 overflow-auto">
                      <div className="space-y-4">
                        {/* Conversation bubbles */}
                        <div className="flex justify-start">
                          <div className="bg-white dark:bg-slate-700 rounded-2xl rounded-tl-none p-3 max-w-[80%] shadow-sm">
                            <p className="text-sm">Hello! How can I help you today?</p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <div className="bg-purple-500 text-white rounded-2xl rounded-tr-none p-3 max-w-[80%] shadow-sm">
                            <p className="text-sm">I'd like to check my account balance.</p>
                          </div>
                        </div>

                        <div className="flex justify-start">
                          <div className="bg-white dark:bg-slate-700 rounded-2xl rounded-tl-none p-3 max-w-[80%] shadow-sm">
                            <p className="text-sm">I can help with that. Your current balance is $1,250.75.</p>
                          </div>
                        </div>

                        <div className="flex justify-start">
                          <div className="bg-white dark:bg-slate-700 rounded-2xl rounded-tl-none p-3 max-w-[80%] shadow-sm">
                            <p className="text-sm">Would you like to know about your recent transactions?</p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <div className="bg-purple-500 text-white rounded-2xl rounded-tr-none p-3 max-w-[80%] shadow-sm">
                            <p className="text-sm">Yes, please show me the last 3 transactions.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                          <PhoneCall className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">AI Processing</p>
                          <div className="flex gap-1 justify-center mt-1">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-100"></div>
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-200"></div>
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-[48px] opacity-30 blur-xl animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

