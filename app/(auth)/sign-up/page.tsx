"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Wallet, Shield, Phone, Mail, User } from "lucide-react";

// Type declaration for Ethereum
declare global {
   interface Window {
      ethereum?: {
         request: (args: { method: string }) => Promise<string[]>;
         isMetaMask?: boolean;
      };
   }
}

const signUpFormSchema = z.object({
   fullName: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
   }),
   email: z.string().email({
      message: "Invalid email address.",
   }),
   phoneNumber: z
      .string()
      .min(10, {
         message: "Phone number must be at least 10 digits.",
      })
      .regex(/^\+?[\d\s-()]+$/, {
         message: "Invalid phone number format.",
      }),
   password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
   }),
});

export default function SignUpPage() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const [isWalletConnected, setIsWalletConnected] = useState(false);
   const [walletAddress, setWalletAddress] = useState("");

   const form = useForm<z.infer<typeof signUpFormSchema>>({
      resolver: zodResolver(signUpFormSchema),
      defaultValues: {
         fullName: "",
         email: "",
         phoneNumber: "",
         password: "",
      },
   });

   async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
      try {
         setIsLoading(true);
         console.log(values);

         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1500));

         // Store phone number for verification page
         sessionStorage.setItem("verificationPhone", values.phoneNumber);

         router.push("/verification");
      } catch (error) {
         console.error("Registration error:", error);
         form.setError("root", {
            type: "manual",
            message: "Registration failed. Please try again.",
         });
      } finally {
         setIsLoading(false);
      }
   }

   const connectWallet = async () => {
      try {
         if (typeof window !== "undefined" && window.ethereum) {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            setIsWalletConnected(true);
         } else {
            alert("Please install MetaMask to connect your wallet");
         }
      } catch (error) {
         console.error("Wallet connection failed:", error);
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
               <div className="flex justify-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-[#1D4ED8] flex items-center justify-center">
                     <Shield className="h-6 w-6 text-white" />
                  </div>
               </div>
               <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
               <p className="mt-2 text-gray-600">Fill in your details to register for voting</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     {form.formState.errors.root && <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-600">{form.formState.errors.root.message}</div>}

                     <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input placeholder="Enter your full name" className="pl-10 border-gray-300 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]" {...field} />
                                 </div>
                              </FormControl>
                              <FormMessage className="text-red-500" />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input type="email" placeholder="Enter your email" className="pl-10 border-gray-300 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]" {...field} />
                                 </div>
                              </FormControl>
                              <FormMessage className="text-red-500" />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input type="tel" placeholder="+1 (555) 123-4567" className="pl-10 border-gray-300 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]" {...field} />
                                 </div>
                              </FormControl>
                              <FormMessage className="text-red-500" />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                              <FormControl>
                                 <Input type="password" placeholder="Create a strong password" className="border-gray-300 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]" {...field} />
                              </FormControl>
                              <PasswordStrength password={field.value} />
                              <FormMessage className="text-red-500" />
                           </FormItem>
                        )}
                     />

                     {/* Wallet Connection */}
                     <div className="space-y-3">
                        <Button
                           type="button"
                           variant="outline"
                           onClick={connectWallet}
                           className={`w-full border-2 ${isWalletConnected ? "border-green-500 bg-green-50 text-green-700" : "border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white"}`}
                        >
                           <Wallet className="mr-2 h-4 w-4" />
                           {isWalletConnected ? "Wallet Connected" : "Connect Wallet"}
                        </Button>
                        {isWalletConnected && (
                           <p className="text-xs text-green-600 text-center">
                              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                           </p>
                        )}
                        <p className="text-xs text-gray-500 text-center">Connect your wallet to secure your vote</p>
                     </div>

                     {/* reCAPTCHA placeholder */}
                     <div className="flex justify-center">
                        <div className="bg-gray-100 border border-gray-300 rounded p-4 text-center text-sm text-gray-600">
                           <div className="flex items-center justify-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span>I&apos;m not a robot</span>
                           </div>
                           <p className="text-xs mt-1 text-gray-500">reCAPTCHA</p>
                        </div>
                     </div>

                     <Button type="submit" className="w-full bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 text-white py-3" disabled={isLoading}>
                        {isLoading ? (
                           <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Creating Account...
                           </div>
                        ) : (
                           "Sign Up"
                        )}
                     </Button>
                  </form>
               </Form>

               <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                     Already have an account?{" "}
                     <button onClick={() => router.push("/sign-in")} className="text-[#1D4ED8] hover:underline font-medium">
                        Sign in
                     </button>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
