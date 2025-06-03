"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
   const [formData, setFormData] = useState({
      emailOrPhone: "",
      password: "",
   });
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      // Redirect to dashboard
      window.location.href = "/dashboard";
   };

   const handleInputChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   return (
      <div className="min-h-screen flex">
         {/* Image Section - Left Side */}
         <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#A0E9FF] to-[#CDF5FD]">
            <div className="flex items-center justify-center w-full p-8">
               <div className="text-center space-y-6">
                  <Image
                     src="https://images.unsplash.com/photo-1541872705-1f73c6400ec9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                     alt="Secure voting technology"
                     width={1000}
                     height={667}
                     className="rounded-lg shadow-2xl max-w-md w-full"
                  />
                  <div className="text-gray-800 space-y-2">
                     <h2 className="text-2xl font-bold">Welcome Back</h2>
                     <p className="text-lg">Continue your journey in shaping the future through secure digital voting.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Form Section - Right Side */}
         <div className="flex-1 flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md space-y-6">
               <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                  <p className="text-gray-600">Sign in to access your elections</p>
               </div>

               <Card>
                  <CardHeader>
                     <CardTitle className="text-xl text-center">Sign In to iElect</CardTitle>
                     <CardDescription className="text-center">Access your secure voting dashboard</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="emailOrPhone">Email or Phone Number</Label>
                           <Input
                              id="emailOrPhone"
                              type="text"
                              placeholder="Enter your email or phone number"
                              value={formData.emailOrPhone}
                              onChange={(e) => handleInputChange("emailOrPhone", e.target.value)}
                              required
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="password">Password</Label>
                           <div className="relative">
                              <Input
                                 id="password"
                                 type={showPassword ? "text" : "password"}
                                 placeholder="Enter your password"
                                 value={formData.password}
                                 onChange={(e) => handleInputChange("password", e.target.value)}
                                 required
                              />
                              <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                           </div>
                        </div>

                        <div className="flex items-center justify-between">
                           <div className="text-sm">
                              <Link href="/forgot-password" className="text-[#00A9FF] hover:underline">
                                 Forgot password?
                              </Link>
                           </div>
                        </div>

                        <Button type="submit" className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white" disabled={isLoading}>
                           {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                     </form>

                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                           <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                           <span className="bg-white px-2 text-gray-500 m-5">Or continue with</span>
                        </div>
                     </div>

                     <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                           <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                           <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                           <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                           <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                     </Button>

                     <div className="mt-4 text-center text-sm">
                        <span className="text-gray-600">Don&apos;t have an account? </span>
                        <Link href="/signup" className="text-[#00A9FF] hover:underline font-medium">
                           Sign Up
                        </Link>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
