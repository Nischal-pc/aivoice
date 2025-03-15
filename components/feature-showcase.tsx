"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Brain, Mic, BarChart3, Globe, Lock, Zap } from "lucide-react"

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("intelligence")

  const features = [
    {
      id: "intelligence",
      title: "Advanced AI Intelligence",
      icon: Brain,
      description:
        "Powered by Meta's LLAMA 3.0, our system understands natural language and context for human-like conversations.",
      benefits: [
        "Natural language understanding",
        "Context-aware responses",
        "Sentiment analysis",
        "Multi-turn conversations",
      ],
      color: "from-purple-500 to-purple-700",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "voice",
      title: "Crystal Clear Voice",
      icon: Mic,
      description: "High-definition voice processing with noise cancellation for perfect clarity in any environment.",
      benefits: ["HD voice quality", "Background noise reduction", "Echo cancellation", "Voice enhancement"],
      color: "from-cyan-500 to-cyan-700",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "analytics",
      title: "Comprehensive Analytics",
      icon: BarChart3,
      description: "Gain valuable insights from every call with detailed analytics and reporting tools.",
      benefits: ["Call duration metrics", "Conversation analysis", "User engagement tracking", "Performance reporting"],
      color: "from-amber-500 to-amber-700",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "global",
      title: "Global Connectivity",
      icon: Globe,
      description: "Connect with anyone, anywhere with our global voice network and multi-language support.",
      benefits: ["Worldwide coverage", "Multi-language support", "Low latency connections", "Regional optimization"],
      color: "from-green-500 to-green-700",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "security",
      title: "Enterprise-Grade Security",
      icon: Lock,
      description: "Your conversations are protected with end-to-end encryption and advanced security protocols.",
      benefits: ["End-to-end encryption", "GDPR compliance", "Data sovereignty", "Regular security audits"],
      color: "from-red-500 to-red-700",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "integration",
      title: "Seamless Integration",
      icon: Zap,
      description: "Easily integrate with your existing systems through our comprehensive API and webhooks.",
      benefits: ["RESTful API", "Webhook support", "SDK for major platforms", "No-code integration options"],
      color: "from-blue-500 to-blue-700",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const activeFeature = features.find((f) => f.id === activeTab)

  return (
    <div className="space-y-8">
      <Tabs defaultValue="intelligence" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          {features.map((feature) => (
            <TabsTrigger
              key={feature.id}
              value={feature.id}
              className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col items-center gap-1">
                <feature.icon
                  className={`h-5 w-5 ${activeTab === feature.id ? "text-primary" : "text-muted-foreground"}`}
                />
                <span className="text-xs font-medium hidden md:block">{feature.title.split(" ")[0]}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {features.map((feature) => (
          <TabsContent key={feature.id} value={feature.id} className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>

                <p className="text-lg text-muted-foreground">{feature.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {feature.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div
                        className={`mt-1 h-5 w-5 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Card className="overflow-hidden border-0 shadow-xl">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

