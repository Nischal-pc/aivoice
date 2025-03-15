"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO, TechCorp",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "EchoLink has transformed our customer service operations. The AI-powered voice calling system understands customer needs better than any solution we've used before. Our resolution times have decreased by 40%.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager, InnovateCo",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "Implementing EchoLink was surprisingly easy. The integration with our existing systems was seamless, and the AI's ability to handle complex conversations is impressive. Our team loves it!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Customer Success, RetailGiant",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "Our customers have noticed the difference. The natural-sounding AI voice and intelligent responses have significantly improved our customer satisfaction scores. EchoLink is now an essential part of our tech stack.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Kim",
    role: "IT Director, HealthPlus",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "In the healthcare industry, accuracy and privacy are paramount. EchoLink delivers on both fronts with its secure infrastructure and precise understanding of medical terminology. Highly recommended.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Operations Manager, LogisticsPro",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "The analytics capabilities of EchoLink have given us incredible insights into our customer interactions. We've been able to identify patterns and improve our services based on real data.",
    rating: 4,
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrevious = () => {
    setAutoplay(false)
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Card className="overflow-hidden bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonials[current].rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="mb-8 text-xl italic text-slate-700 dark:text-slate-300">
                    "{testimonials[current].content}"
                  </blockquote>
                  <Avatar className="h-16 w-16 mb-4 ring-4 ring-purple-100 dark:ring-purple-900">
                    <AvatarImage src={testimonials[current].avatar} alt={testimonials[current].name} />
                    <AvatarFallback>
                      {testimonials[current].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-semibold">{testimonials[current].name}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === current ? "w-6 bg-primary" : "bg-slate-300 dark:bg-slate-600"
            }`}
            onClick={() => {
              setAutoplay(false)
              setCurrent(index)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

