"use client"

import { useState } from "react"
import { PatientOnboardingScene } from "@/components/patient-onboarding-scene"
import { OnboardingForm } from "@/components/onboarding-form"
import { HealthTipCarousel } from "@/components/health-tip-carousel"
import { VoiceChatbot } from "@/components/voice-chatbot"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, MessageCircle, Heart } from "lucide-react"

export default function HealthcareOnboarding() {
  const [activeTab, setActiveTab] = useState("onboarding")
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    aadhaar: "",
    address: "",
    contact: "",
    symptoms: [],
  })

  // Add the navigation handler function:
  const handleNavigateToChat = () => {
    setActiveTab("chatbot")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Rural Health AI</h1>
                <p className="text-sm text-gray-600">Compassionate Care, Everywhere</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                हिंदी
              </Button>
              <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                English
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/50 backdrop-blur-sm">
            <TabsTrigger
              value="onboarding"
              className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Patient Registration</span>
            </TabsTrigger>
            <TabsTrigger
              value="chatbot"
              className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span>AI Health Assistant</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="onboarding" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* 3D Scene */}
              <div className="relative bg-gradient-to-br from-blue-50/80 via-white/90 to-green-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-200/50 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200/20 rounded-full translate-y-12 -translate-x-12"></div>

                {/* Header section */}
                <div className="relative z-10 text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4 shadow-lg">
                    <Heart className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                    Welcome to Our Clinic
                  </h2>
                  <p className="text-gray-600 text-lg font-medium">
                    Your health journey starts here with compassionate AI-powered care
                  </p>
                  <div className="flex items-center justify-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>AI Doctor Available</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      <Stethoscope className="w-3 h-3" />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>

                {/* 3D Scene Container */}
                <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-sky-100/50 to-blue-50/30 border border-blue-100/50 shadow-inner">
                  <PatientOnboardingScene patientData={patientData} />

                  {/* Floating interaction hint */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-blue-200/50 animate-bounce">
                    <p className="text-xs text-gray-600 font-medium">👆 Interact with the 3D scene above</p>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 relative z-10">
                  <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100/50">
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div className="text-xs text-gray-600 font-medium">Available</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100/50">
                    <div className="text-2xl font-bold text-green-600">AI</div>
                    <div className="text-xs text-gray-600 font-medium">Powered</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100/50">
                    <div className="text-2xl font-bold text-purple-600">Safe</div>
                    <div className="text-xs text-gray-600 font-medium">& Secure</div>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <div className="space-y-6">
                <OnboardingForm
                  patientData={patientData}
                  setPatientData={setPatientData}
                  onNavigateToChat={handleNavigateToChat}
                />
                <HealthTipCarousel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chatbot">
            <VoiceChatbot patientData={patientData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
