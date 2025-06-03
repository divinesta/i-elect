"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
   const [email, setEmail] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [isEmailSent, setIsEmailSent] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsLoading(false);
      setIsEmailSent(true);
   };

   if (isEmailSent) {
      return (
         <div className="min-h-screen flex">
            {/* Image Section - Left Side */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#3b82f6] to-[#60a5fa]">
               <div className="flex items-center justify-center w-full p-8">
                  <div className="text-center space-y-6">
                     <Image
                        src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Email sent illustration"
                        width={1000}
                        height={667}
                        className="rounded-lg shadow-2xl max-w-md w-full"
                     />
                     <div className="text-white space-y-2">
                        <h2 className="text-2xl font-bold">Check Your Email</h2>
                        <p className="text-lg opacity-90">We&apos;ve sent you a secure link to reset your password.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Success Message - Right Side */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
               <div className="w-full max-w-md space-y-6">
                  <Card>
                     <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                           <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="text-xl">Email Sent Successfully</CardTitle>
                        <CardDescription>
                           We&apos;ve sent a password reset link to <strong>{email}</strong>
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                           <div className="flex items-start space-x-3">
                              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div className="text-sm text-blue-800">
                                 <p className="font-medium mb-1">Next Steps:</p>
                                 <ul className="space-y-1 text-blue-700">
                                    <li>• Check your email inbox</li>
                                    <li>• Click the reset link (expires in 1 hour)</li>
                                    <li>• Create a new password</li>
                                    <li>• Sign in with your new password</li>
                                 </ul>
                              </div>
                           </div>
                        </div>

                        <div className="text-center space-y-3">
                           <p className="text-sm text-gray-600">Didn&apos;t receive the email? Check your spam folder or</p>
                           <Button variant="outline" onClick={() => setIsEmailSent(false)} className="text-[#1d4ed8] border-[#1d4ed8] hover:bg-[#1d4ed8] hover:text-white">
                              Try Again
                           </Button>
                        </div>

                        <div className="pt-4 border-t">
                           <Link href="/signin">
                              <Button variant="ghost" className="w-full text-gray-600 hover:text-gray-800">
                                 <ArrowLeft className="mr-2 h-4 w-4" />
                                 Back to Sign In
                              </Button>
                           </Link>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen flex">
         {/* Form Section - Left Side */}
         <div className="flex-1 flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md space-y-6">
               <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                  <p className="text-gray-600">Enter your email to receive a reset link</p>
               </div>

               <Card>
                  <CardHeader>
                     <CardTitle className="text-xl text-center">Forgot Your Password?</CardTitle>
                     <CardDescription className="text-center">No worries! Enter your email address and we&apos;ll send you a link to reset your password.</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="email">Email Address</Label>
                           <Input id="email" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                           <p className="text-xs text-gray-500">We&apos;ll send a password reset link to this email address</p>
                        </div>

                        <Button type="submit" className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white" disabled={isLoading}>
                           {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
                        </Button>
                     </form>

                     <div className="mt-6 text-center">
                        <Link href="/signin">
                           <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Back to Sign In
                           </Button>
                        </Link>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Image Section - Right Side */}
         <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#dbeafe] to-[#3b82f6]">
            <div className="flex items-center justify-center w-full p-8">
               <div className="text-center space-y-6">
                  <Image
                     src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                     alt="Password security illustration"
                     width={1000}
                     height={667}
                     className="rounded-lg shadow-2xl max-w-md w-full"
                  />
                  <div className="text-gray-800 space-y-2">
                     <h2 className="text-2xl font-bold">Secure Account Recovery</h2>
                     <p className="text-lg">Your account security is our priority. We&apos;ll help you regain access safely and securely.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
