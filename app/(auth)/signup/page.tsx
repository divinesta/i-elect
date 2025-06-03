"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
   const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      password: "",
   });
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const passwordRequirements = [
      { text: "At least 8 characters", met: formData.password.length >= 8 },
      { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
      { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
      { text: "Contains number", met: /\d/.test(formData.password) },
      { text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
   ];

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      // Redirect to verification page
      window.location.href = `/verify?phone=${encodeURIComponent(formData.phone)}`;
   };

   const handleInputChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   return (
      <div className="min-h-screen flex">
         {/* Form Section - Left Side */}
         <div className="flex-1 flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md space-y-6">
               <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                  <p className="text-gray-600">Register to create or vote in elections</p>
               </div>

               <Card>
                  <CardHeader>
                     <CardTitle className="text-xl text-center">Sign Up for iElect</CardTitle>
                     <CardDescription className="text-center">Join the future of secure, transparent voting</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="fullName">Full Name</Label>
                           <Input id="fullName" type="text" placeholder="Enter your full name" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="email">Email Address</Label>
                           <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="phone">Phone Number</Label>
                           <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required />
                           <p className="text-xs text-gray-500">We&apos;ll send a verification code to this number</p>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="password">Password</Label>
                           <div className="relative">
                              <Input
                                 id="password"
                                 type={showPassword ? "text" : "password"}
                                 placeholder="Create a strong password"
                                 value={formData.password}
                                 onChange={(e) => handleInputChange("password", e.target.value)}
                                 required
                              />
                              <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                           </div>

                           {formData.password && (
                              <div className="space-y-1 mt-2">
                                 <p className="text-xs font-medium text-gray-700">Password Requirements:</p>
                                 {passwordRequirements.map((req, index) => (
                                    <div key={index} className="flex items-center space-x-2 text-xs">
                                       {req.met ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-red-500" />}
                                       <span className={req.met ? "text-green-600" : "text-red-600"}>{req.text}</span>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>

                        <Button type="submit" className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white" disabled={isLoading}>
                           {isLoading ? "Creating Account..." : "Sign Up"}
                        </Button>
                     </form>

                     <div className="mt-4 text-center text-sm">
                        <span className="text-gray-600">Already have an account? </span>
                        <Link href="/signin" className="text-[#1d4ed8] hover:underline font-medium">
                           Sign In
                        </Link>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Image Section - Right Side */}
         <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1d4ed8] to-[#3b82f6]">
            <div className="flex items-center justify-center w-full p-8">
               <div className="text-center space-y-6">
                  <Image
                     src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                     alt="Democratic voting process"
                     width={1000}
                     height={667}
                     className="rounded-lg shadow-2xl max-w-md w-full"
                  />
                  <div className="text-white space-y-2">
                     <h2 className="text-2xl font-bold">Secure Digital Democracy</h2>
                     <p className="text-lg opacity-90">Experience transparent, blockchain-powered elections with complete security and trust.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
