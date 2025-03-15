"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PhoneCall, Sparkles, ArrowRight, Play, Zap, Shield, Headphones, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroSection } from "@/components/hero-section"
import { FeatureShowcase } from "@/components/feature-showcase"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { PricingCards } from "@/components/pricing-cards"
import { StatsCounter } from "@/components/stats-counter"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-background/80 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="relative">
              <PhoneCall className="h-6 w-6 text-primary" />
              <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-amber-400" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
              EchoLink
            </span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Link href="/dashboard">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="absolute top-16 left-0 right-0 border-b bg-background shadow-lg p-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-4 py-2">
                <Link
                  href="#features"
                  className="text-sm font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>

                <div className="border-t my-2 pt-2 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                    >
                      <Link href="/dashboard">
                        Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                      >
                        <Link href="/signup">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Counter */}
        <section className="py-12 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <div className="container">
            <StatsCounter />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
                  Powerful AI Features
                </span>
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the next generation of voice communication with our cutting-edge AI technology
              </p>
            </div>
            <FeatureShowcase />
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
        >
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How EchoLink Works</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI-powered voice calling system is simple to set up and use
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700/50 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">1. Connect Your Account</h3>
                  <p className="text-muted-foreground">
                    Set up your Twilio account and connect it to EchoLink with our simple configuration wizard.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-cyan-100 dark:border-cyan-900/30 hover:border-cyan-300 dark:hover:border-cyan-700/50 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-cyan-600 to-cyan-800 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2. Configure AI Model</h3>
                  <p className="text-muted-foreground">
                    Choose and customize your Meta LLAMA 3.0 model settings to match your specific needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-amber-100 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-700/50 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-700 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">3. Start Making Calls</h3>
                  <p className="text-muted-foreground">
                    Begin making AI-powered voice calls with natural language processing and real-time responses.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                  <Play className="mr-2 h-4 w-4" />
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Customers Say</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Trusted by businesses worldwide for AI-powered voice communication
              </p>
            </div>
            <TestimonialCarousel />
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="py-20 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
        >
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the plan that works best for your business needs
              </p>
            </div>
            <PricingCards />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Ready to Transform Your Voice Communication?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-white/80">
              Join thousands of businesses using EchoLink's AI-powered voice calling system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-white text-purple-600 hover:bg-gray-100">
                <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                <Link href="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

