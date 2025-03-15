"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, PhoneCall, Building, Globe } from "lucide-react"

export function StatsCounter() {
  const [counts, setCounts] = useState({
    users: 0,
    calls: 0,
    businesses: 0,
    countries: 0,
  })

  const targets = {
    users: 25000,
    calls: 1000000,
    businesses: 5000,
    countries: 120,
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds animation
    const interval = 20 // Update every 20ms
    const steps = duration / interval

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounts({
        users: Math.floor(easeOutQuad(progress) * targets.users),
        calls: Math.floor(easeOutQuad(progress) * targets.calls),
        businesses: Math.floor(easeOutQuad(progress) * targets.businesses),
        countries: Math.floor(easeOutQuad(progress) * targets.countries),
      })

      if (step >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  // Easing function for smoother animation
  const easeOutQuad = (x) => {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const stats = [
    {
      title: "Active Users",
      value: formatNumber(counts.users),
      icon: Users,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      title: "AI Calls Made",
      value: formatNumber(counts.calls),
      icon: PhoneCall,
      color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
    },
    {
      title: "Businesses",
      value: formatNumber(counts.businesses),
      icon: Building,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      title: "Countries",
      value: formatNumber(counts.countries),
      icon: Globe,
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full ${stat.color} mb-4`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

