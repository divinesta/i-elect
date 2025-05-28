"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get("phone") || ""

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [resendCount, setResendCount] = useState(0)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")

    if (otpCode.length !== 6) {
      setVerificationStatus("error")
      setErrorMessage("Please enter all 6 digits")
      return
    }

    setIsLoading(true)
    setVerificationStatus("idle")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate verification (in real app, this would be an API call)
    if (otpCode === "123456") {
      setVerificationStatus("success")
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 2000)
    } else {
      setVerificationStatus("error")
      setErrorMessage("Invalid verification code. Please try again.")
    }

    setIsLoading(false)
  }

  const handleResendCode = async () => {
    if (resendCount >= 3) {
      setErrorMessage("Maximum resend attempts reached. Please try again later.")
      return
    }

    setResendCount(resendCount + 1)
    setResendCooldown(60)

    // Simulate resend API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const maskedPhone = phoneNumber.replace(/(\+\d{1,3})\d+(\d{4})/, "$1****$2")

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#CDF5FD] to-[#A0E9FF]">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">Verify Your Phone Number</CardTitle>
            <CardDescription>Enter the 6-digit code sent to {maskedPhone}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {verificationStatus === "success" && (
              <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Verified! Redirecting to dashboard...</span>
              </div>
            )}

            {verificationStatus === "error" && (
              <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-[#00A9FF]"
                    disabled={isLoading || verificationStatus === "success"}
                  />
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white"
                disabled={isLoading || verificationStatus === "success"}
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">Didn't receive the code?</p>
              <Button
                variant="ghost"
                onClick={handleResendCode}
                disabled={resendCooldown > 0 || resendCount >= 3}
                className="text-[#00A9FF] hover:text-[#0088CC]"
              >
                {resendCooldown > 0
                  ? `Resend Code (${resendCooldown}s)`
                  : resendCount >= 3
                    ? "Max attempts reached"
                    : "Resend Code"}
              </Button>
              <p className="text-xs text-gray-500">Attempts remaining: {3 - resendCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
