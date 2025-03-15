"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PhoneCall, BarChart3, Settings, Home, Sparkles, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StatusIndicator } from "@/components/status-indicator"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserDropdown } from "@/components/user-dropdown"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/calls", label: "Calls", icon: PhoneCall },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header
        className={cn(
          "sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-6 md:px-8 transition-all duration-300",
          scrolled ? "shadow-md" : "",
        )}
      >
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
          className="md:hidden ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <nav className="ml-auto hidden md:flex items-center gap-2">
          <StatusIndicator status="online" />
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button size="sm" variant="gradient">
            <PhoneCall className="mr-2 h-4 w-4" />
            New Call
          </Button>
          <UserDropdown />
        </nav>
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
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className={cn("justify-start", pathname === item.href && "bg-accent text-accent-foreground")}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
                <div className="mt-4 flex gap-2">
                  <Button variant="gradient" className="flex-1">
                    <PhoneCall className="mr-2 h-4 w-4" />
                    New Call
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1">
        <aside className="hidden w-[240px] flex-col border-r bg-background/50 backdrop-blur-sm md:flex">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={cn("justify-start", pathname === item.href && "bg-accent text-accent-foreground")}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="mt-auto p-4 border-t">
            <div className="rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-4">
              <h4 className="font-medium text-sm mb-2">Need Help?</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Check our documentation or contact support for assistance.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Documentation
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-6 md:p-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

