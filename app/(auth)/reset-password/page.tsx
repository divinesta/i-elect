"use client";

import type React from "react";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Check, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordPage() {
   const searchParams = useSearchParams();
   const token = searchParams.get("token");

   const [formData, setFormData] = useState({
      password: "",
      confirmPassword: "",
   });
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);

   const passwordRequirements = [
      { text: "At least 8 characters", met: formData.password.length >= 8 },
      { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
      { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
      { text: "Contains number", met: /\d/.test(formData.password) },
      { text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
   ];

   const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!passwordsMatch) {
         return;
      }

      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsLoading(false);
      setIsSuccess(true);
   };

   const handleInputChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   if (isSuccess) {
      return (
         <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#CDF5FD] to-[#A0E9FF]">
            <Card className="w-full max-w-md shadow-xl">
               <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                     <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Password Reset Successful</CardTitle>
                  <CardDescription>Your password has been updated successfully</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                     <p className="text-green-800 font-medium">You can now sign in with your new password</p>
                  </div>
                  <Link href="/signin">
                     <Button className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white">Continue to Sign In</Button>
                  </Link>
               </CardContent>
            </Card>
         </div>
      );
   }

   if (!token) {
      return (
         <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#CDF5FD] to-[#A0E9FF]">
            <Card className="w-full max-w-md shadow-xl">
               <CardHeader className="text-center">
                  <CardTitle className="text-xl text-red-600">Invalid Reset Link</CardTitle>
                  <CardDescription>This password reset link is invalid or has expired</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                     <p className="text-red-800">Please request a new password reset link</p>
                  </div>
                  <Link href="/forgot-password">
                     <Button className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white">Request New Reset Link</Button>
                  </Link>
               </CardContent>
            </Card>
         </div>
      );
   }

   return (
      <div className="min-h-screen flex">
         {/* Form Section - Left Side */}
         <div className="flex-1 flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md space-y-6">
               <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">Create New Password</h1>
                  <p className="text-gray-600">Enter your new password below</p>
               </div>

               <Card>
                  <CardHeader>
                     <CardTitle className="text-xl text-center">Reset Your Password</CardTitle>
                     <CardDescription className="text-center">Choose a strong password to secure your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="password">New Password</Label>
                           <div className="relative">
                              <Input
                                 id="password"
                                 type={showPassword ? "text" : "password"}
                                 placeholder="Enter your new password"
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

                        <div className="space-y-2">
                           <Label htmlFor="confirmPassword">Confirm New Password</Label>
                           <div className="relative">
                              <Input
                                 id="confirmPassword"
                                 type={showConfirmPassword ? "text" : "password"}
                                 placeholder="Confirm your new password"
                                 value={formData.confirmPassword}
                                 onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                 required
                              />
                              <Button
                                 type="button"
                                 variant="ghost"
                                 size="sm"
                                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                 {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                           </div>

                           {formData.confirmPassword && (
                              <div className="flex items-center space-x-2 text-xs mt-1">
                                 {passwordsMatch ? (
                                    <>
                                       <Check className="h-3 w-3 text-green-500" />
                                       <span className="text-green-600">Passwords match</span>
                                    </>
                                 ) : (
                                    <>
                                       <X className="h-3 w-3 text-red-500" />
                                       <span className="text-red-600">Passwords don&apos;t match</span>
                                    </>
                                 )}
                              </div>
                           )}
                        </div>

                        <Button type="submit" className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white" disabled={isLoading || !passwordsMatch || !passwordRequirements.every((req) => req.met)}>
                           {isLoading ? "Updating Password..." : "Update Password"}
                        </Button>
                     </form>
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Image Section - Right Side */}
         <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#A0E9FF] to-[#CDF5FD]">
            <div className="flex items-center justify-center w-full p-8">
               <div className="text-center space-y-6">
                  <Image
                     src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                     alt="Secure password illustration"
                     width={1000}
                     height={667}
                     className="rounded-lg shadow-2xl max-w-md w-full"
                  />
                  <div className="text-gray-800 space-y-2">
                     <h2 className="text-2xl font-bold">Almost There!</h2>
                     <p className="text-lg">Create a strong password to keep your voting account secure and protected.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
