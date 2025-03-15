"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StatusIndicatorProps {
  status: "online" | "offline" | "maintenance" | "warning"
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const getStatusDetails = () => {
    switch (status) {
      case "online":
        return {
          color: "bg-emerald-500",
          label: "System Online",
          description: "All systems operational",
        }
      case "offline":
        return {
          color: "bg-rose-500",
          label: "System Offline",
          description: "Service is currently unavailable",
        }
      case "maintenance":
        return {
          color: "bg-amber-500",
          label: "Maintenance",
          description: "Scheduled maintenance in progress",
        }
      case "warning":
        return {
          color: "bg-yellow-500",
          label: "Warning",
          description: "Some services experiencing issues",
        }
      default:
        return {
          color: "bg-gray-500",
          label: "Unknown",
          description: "Status unknown",
        }
    }
  }

  const { color, label, description } = getStatusDetails()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 border-transparent">
            <motion.div
              className={`h-2.5 w-2.5 rounded-full ${color}`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
            <span className="font-medium">{label}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

