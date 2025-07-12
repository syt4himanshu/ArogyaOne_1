"use client"

import { VoiceChatbot } from "@/components/voice-chatbot"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  // You'd need to get patient data from localStorage, context, or URL params
  const patientData = {
    name: "Patient",
    age: "",
    symptoms: [],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="bg-blue-500 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">AI Health Assistant</h1>
                <p className="text-sm text-gray-600">Your Virtual Healthcare Companion</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <VoiceChatbot patientData={patientData} />
      </main>
    </div>
  )
}
