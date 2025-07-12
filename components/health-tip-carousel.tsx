"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Volume2, Heart, Droplets, Sun, Moon } from "lucide-react"

const healthTips = [
  {
    id: 1,
    title: "Stay Hydrated",
    content: "Drink at least 8-10 glasses of water daily to maintain good health and boost immunity.",
    icon: Droplets,
    color: "bg-blue-500",
    audio: "tip-hydration.mp3",
  },
  {
    id: 2,
    title: "Regular Exercise",
    content: "30 minutes of daily physical activity can significantly improve your cardiovascular health.",
    icon: Heart,
    color: "bg-red-500",
    audio: "tip-exercise.mp3",
  },
  {
    id: 3,
    title: "Adequate Sleep",
    content: "Get 7-9 hours of quality sleep each night to help your body recover and maintain mental health.",
    icon: Moon,
    color: "bg-purple-500",
    audio: "tip-sleep.mp3",
  },
  {
    id: 4,
    title: "Vitamin D",
    content: "Spend 15-20 minutes in sunlight daily to maintain healthy vitamin D levels naturally.",
    icon: Sun,
    color: "bg-yellow-500",
    audio: "tip-vitamin-d.mp3",
  },
]

export function HealthTipCarousel() {
  const [currentTip, setCurrentTip] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % healthTips.length)
  }

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + healthTips.length) % healthTips.length)
  }

  const playAudio = () => {
    setIsPlaying(true)
    // Audio playback implementation would go here
    setTimeout(() => setIsPlaying(false), 3000)
  }

  const tip = healthTips[currentTip]
  const IconComponent = tip.icon

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Header */}
          <div className={`${tip.color} text-white p-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Health Tip</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-full p-2"
                onClick={playAudio}
                disabled={isPlaying}
              >
                <Volume2 className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-4"
              >
                <div className={`${tip.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                <h4 className="text-xl font-bold text-gray-800">{tip.title}</h4>
                <p className="text-gray-600 leading-relaxed">{tip.content}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-4 bg-gray-50">
            <Button variant="ghost" size="sm" onClick={prevTip} className="rounded-full hover:bg-blue-100">
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {healthTips.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTip ? tip.color.replace("bg-", "bg-") : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTip(index)}
                />
              ))}
            </div>

            <Button variant="ghost" size="sm" onClick={nextTip} className="rounded-full hover:bg-blue-100">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
