"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, MicOff, Send, Bot, User, Heart, Activity, Thermometer, Stethoscope, TrendingUp } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  emotion?: "happy" | "concerned" | "neutral"
}

interface PatientData {
  name: string
  age: string
  symptoms: string[]
}

interface VoiceChatbotProps {
  patientData: PatientData
}

const vitalsData = {
  heartRate: 72,
  temperature: 98.6,
  bloodPressure: "120/80",
  oxygenSaturation: 98,
}

export function VoiceChatbot({ patientData }: VoiceChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: `Hello ${patientData.name || "there"}! I'm Dr. AI, your virtual health assistant. How are you feeling today?`,
      timestamp: new Date(),
      emotion: "happy",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [patientMood, setPatientMood] = useState<"happy" | "neutral" | "sad">("neutral")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(content)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse.content,
        timestamp: new Date(),
        emotion: botResponse.emotion,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): { content: string; emotion: "happy" | "concerned" | "neutral" } => {
    const input = userInput.toLowerCase()

    if (input.includes("pain") || input.includes("hurt")) {
      return {
        content:
          "I understand you're experiencing pain. Can you describe where it hurts and rate it from 1-10? This will help me provide better guidance.",
        emotion: "concerned",
      }
    }

    if (input.includes("fever") || input.includes("hot")) {
      return {
        content:
          "Fever can be concerning. Make sure to stay hydrated and rest. If your temperature goes above 101°F (38.3°C), please seek immediate medical attention.",
        emotion: "concerned",
      }
    }

    if (input.includes("better") || input.includes("good")) {
      return {
        content:
          "That's wonderful to hear! Keep up with your healthy habits. Remember to stay hydrated and get adequate rest.",
        emotion: "happy",
      }
    }

    return {
      content:
        "Thank you for sharing that with me. Based on your symptoms, I recommend staying hydrated, getting plenty of rest, and monitoring your condition. If symptoms worsen, please consult with a healthcare professional.",
      emotion: "neutral",
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice recognition implementation would go here
  }

  const getDoctorEmoji = (emotion?: string) => {
    switch (emotion) {
      case "happy":
        return "😊"
      case "concerned":
        return "😟"
      default:
        return "🩺"
    }
  }

  const getPatientEmoji = () => {
    switch (patientMood) {
      case "happy":
        return "😊"
      case "sad":
        return "😔"
      default:
        return "😐"
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Dr. AI Assistant</h3>
                <p className="text-sm opacity-90">Your Virtual Healthcare Companion</p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-3 max-w-[80%] ${
                        message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                          message.type === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                        }`}
                      >
                        {message.type === "user" ? (
                          <User className="w-5 h-5" />
                        ) : (
                          <span>{getDoctorEmoji(message.emotion)}</span>
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`rounded-2xl p-4 ${
                          message.type === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-200"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message or use voice input..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage(inputMessage)}
                    className="h-12 pr-12 rounded-full border-2 focus:border-blue-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full ${
                      isListening ? "text-red-500 hover:bg-red-50" : "text-gray-500 hover:bg-gray-100"
                    }`}
                    onClick={toggleVoiceInput}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
                <Button
                  onClick={() => sendMessage(inputMessage)}
                  disabled={!inputMessage.trim()}
                  className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Summary Panel */}
      <div className="space-y-6">
        {/* Patient Mood */}
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <span className="text-2xl">{getPatientEmoji()}</span>
              <span>Patient Mood</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              {(["happy", "neutral", "sad"] as const).map((mood) => (
                <Button
                  key={mood}
                  variant={patientMood === mood ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPatientMood(mood)}
                  className="capitalize"
                >
                  {mood === "happy" ? "😊" : mood === "sad" ? "😔" : "😐"} {mood}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs */}
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Activity className="w-5 h-5 text-red-500" />
              <span>Vital Signs</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="text-lg font-bold text-red-600">{vitalsData.heartRate} BPM</p>
              </div>

              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <Thermometer className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-lg font-bold text-orange-600">{vitalsData.temperature}°F</p>
              </div>

              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Blood Pressure</p>
                <p className="text-lg font-bold text-blue-600">{vitalsData.bloodPressure}</p>
              </div>

              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Stethoscope className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">O2 Saturation</p>
                <p className="text-lg font-bold text-green-600">{vitalsData.oxygenSaturation}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Symptoms */}
        {patientData.symptoms && patientData.symptoms.length > 0 && (
          <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Current Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {patientData.symptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary" className="capitalize">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
