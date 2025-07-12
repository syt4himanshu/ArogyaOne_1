"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, User, Phone, MapPin, CreditCard, Calendar, Users } from "lucide-react"

interface PatientData {
  name: string
  age: string
  gender: string
  aadhaar: string
  address: string
  contact: string
  symptoms: string[]
}

interface OnboardingFormProps {
  patientData: PatientData
  setPatientData: (data: PatientData) => void
  onNavigateToChat?: () => void // Add this new prop
}

const symptoms = [
  { id: "fever", label: "Fever", emoji: "🤒" },
  { id: "cough", label: "Cough", emoji: "😷" },
  { id: "cold", label: "Cold/Runny Nose", emoji: "🤧" },
  { id: "headache", label: "Headache", emoji: "🤕" },
  { id: "fatigue", label: "Fatigue", emoji: "😴" },
  { id: "nausea", label: "Nausea", emoji: "🤢" },
]

export function OnboardingForm({ patientData, setPatientData, onNavigateToChat }: OnboardingFormProps) {
  const [isListening, setIsListening] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setPatientData({
      ...patientData,
      [field]: value,
    })
  }

  const toggleSymptom = (symptomId: string) => {
    const updatedSymptoms = patientData.symptoms.includes(symptomId)
      ? patientData.symptoms.filter((s) => s !== symptomId)
      : [...patientData.symptoms, symptomId]

    setPatientData({
      ...patientData,
      symptoms: updatedSymptoms,
    })
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice recognition implementation would go here
  }

  const handleCompleteRegistration = () => {
    setIsLoading(true)

    const messages = [
      "⏳ Measuring your vitals, please hold still…",
      "🩺 Our system is checking your health details…",
      "💓 Analyzing your heartbeat patterns…",
      "🔍 Reviewing your medical information…",
      "✨ Preparing your personalized care plan…",
    ]

    let messageIndex = 0
    setLoadingMessage(messages[0])

    // Change message every 1.8 seconds
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length
      setLoadingMessage(messages[messageIndex])
    }, 1800)

    // Complete after 9 seconds
    // setTimeout(() => {
    //   clearInterval(messageInterval)
    //   setIsLoading(false)
    //   // Navigate to chatbot or next step
    //   // This would typically be handled by parent component
    //   console.log("Registration complete - navigating to next step")
    // }, 9000)
  }

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        // Switch to AI Health Assistant tab
        if (onNavigateToChat) {
          onNavigateToChat()
        }
      }, 9000)

      return () => clearTimeout(timer)
    }
  }, [isLoading, onNavigateToChat])

  const formSteps = [
    {
      title: "Personal Information",
      fields: ["name", "age", "gender"],
    },
    {
      title: "Contact Details",
      fields: ["aadhaar", "contact", "address"],
    },
    {
      title: "Current Symptoms",
      fields: ["symptoms"],
    },
  ]

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center space-x-2">
          <User className="w-6 h-6 text-blue-500" />
          <span>Patient Registration</span>
        </CardTitle>
        <p className="text-gray-600">Please fill in your details for personalized care</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {isLoading ? (
          // Loading Screen
          <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl p-8">
            {/* Animated Heart Monitor */}
            <div className="relative mb-8">
              <svg width="120" height="80" viewBox="0 0 120 80" className="animate-pulse">
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                {/* Heart Monitor Line */}
                <path
                  d="M10,40 L30,40 L35,20 L40,60 L45,10 L50,70 L55,40 L110,40"
                  stroke="url(#heartGradient)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    values="0,200;100,200;0,200"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Moving dot */}
                <circle r="4" fill="#ef4444" className="animate-bounce">
                  <animateMotion dur="2s" repeatCount="indefinite">
                    <mpath href="#heartPath" />
                  </animateMotion>
                </circle>

                <path id="heartPath" d="M10,40 L30,40 L35,20 L40,60 L45,10 L50,70 L55,40 L110,40" opacity="0" />
              </svg>

              {/* Pulsing Heart Icon */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>

            {/* Loading Message */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 animate-fade-in">Processing Your Information</h3>
              <p className="text-lg text-blue-600 font-medium animate-fade-in" key={loadingMessage}>
                {loadingMessage}
              </p>
            </div>

            {/* Progress Ring */}
            <div className="relative mt-8">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="226"
                  className="animate-spin-slow"
                  style={{
                    animation: "progress 9s linear forwards",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Vital Signs Animation */}
            <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-md">
              <div
                className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-center animate-bounce"
                style={{ animationDelay: "0s" }}
              >
                <div className="text-red-500 text-2xl mb-1">💓</div>
                <div className="text-xs text-gray-600">Heart Rate</div>
                <div className="text-sm font-bold text-red-600">72 BPM</div>
              </div>
              <div
                className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-center animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="text-blue-500 text-2xl mb-1">🌡️</div>
                <div className="text-xs text-gray-600">Temperature</div>
                <div className="text-sm font-bold text-blue-600">98.6°F</div>
              </div>
              <div
                className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-center animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <div className="text-green-500 text-2xl mb-1">🫁</div>
                <div className="text-xs text-gray-600">Oxygen</div>
                <div className="text-sm font-bold text-green-600">98%</div>
              </div>
            </div>

            <style jsx>{`
        @keyframes progress {
          from {
            stroke-dashoffset: 226;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
          </div>
        ) : (
          // Original Form Content
          <>
            {/* Progress Indicator */}
            <div className="flex justify-center space-x-2 mb-6">
              {formSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {currentStep === 0 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Full Name</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={patientData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="h-12 text-lg rounded-xl border-2 focus:border-blue-400 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age" className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Age</span>
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Age"
                          value={patientData.age}
                          onChange={(e) => handleInputChange("age", e.target.value)}
                          className="h-12 text-lg rounded-xl border-2 focus:border-blue-400 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>Gender</span>
                        </Label>
                        <Select
                          value={patientData.gender}
                          onValueChange={(value) => handleInputChange("gender", value)}
                        >
                          <SelectTrigger className="h-12 text-lg rounded-xl border-2">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="aadhaar" className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Aadhaar Number</span>
                      </Label>
                      <Input
                        id="aadhaar"
                        placeholder="XXXX-XXXX-XXXX"
                        value={patientData.aadhaar}
                        onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                        className="h-12 text-lg rounded-xl border-2 focus:border-blue-400 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact" className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Contact Number</span>
                      </Label>
                      <Input
                        id="contact"
                        placeholder="+91 XXXXX XXXXX"
                        value={patientData.contact}
                        onChange={(e) => handleInputChange("contact", e.target.value)}
                        className="h-12 text-lg rounded-xl border-2 focus:border-blue-400 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Address</span>
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your complete address"
                        value={patientData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="min-h-[80px] text-lg rounded-xl border-2 focus:border-blue-400 transition-all resize-none"
                      />
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Current Symptoms</Label>
                    <p className="text-sm text-gray-600">Select all symptoms you're experiencing</p>

                    <div className="grid grid-cols-2 gap-3">
                      {symptoms.map((symptom) => (
                        <motion.div key={symptom.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="button"
                            variant={patientData.symptoms.includes(symptom.id) ? "default" : "outline"}
                            className={`w-full h-16 rounded-xl text-left justify-start space-x-3 transition-all ${
                              patientData.symptoms.includes(symptom.id)
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : "hover:bg-blue-50 hover:border-blue-300"
                            }`}
                            onClick={() => toggleSymptom(symptom.id)}
                          >
                            <span className="text-2xl">{symptom.emoji}</span>
                            <span className="font-medium">{symptom.label}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>

                    {patientData.symptoms.length > 0 && (
                      <div className="mt-4">
                        <Label className="text-sm font-medium text-gray-700">Selected Symptoms:</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {patientData.symptoms.map((symptomId) => {
                            const symptom = symptoms.find((s) => s.id === symptomId)
                            return (
                              <Badge key={symptomId} variant="secondary" className="text-sm">
                                {symptom?.emoji} {symptom?.label}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Voice Input Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className={`rounded-full p-4 transition-all ${
                  isListening ? "bg-red-500 text-white hover:bg-red-600" : "hover:bg-blue-50"
                }`}
                onClick={toggleVoiceInput}
              >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="rounded-xl px-6"
              >
                Previous
              </Button>

              {currentStep < formSteps.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(formSteps.length - 1, currentStep + 1))}
                  className="rounded-xl px-6 bg-blue-500 hover:bg-blue-600"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleCompleteRegistration}
                  className="rounded-xl px-6 bg-green-500 hover:bg-green-600"
                >
                  Complete Registration
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
