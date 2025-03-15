"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip if still loading
    if (isLoading) return

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/signup", "/forgot-password"]
    const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/reset-password")

    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to login if trying to access protected route while not authenticated
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
    } else if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
      // Redirect to dashboard if trying to access login/signup while authenticated
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

