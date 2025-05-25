"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";

const signInFormSchema = z.object({
   email: z.string().email({
      message: "Invalid email address.",
   }),
   password: z.string().min(1, {
      message: "Password is required.",
   }),
   rememberMe: z.boolean().default(false).optional(),
});

export default function SignInPage() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const form = useForm<z.infer<typeof signInFormSchema>>({
      resolver: zodResolver(signInFormSchema),
      defaultValues: {
         email: "",
         password: "",
         rememberMe: false,
      },
   });

   async function onSubmit(values: z.infer<typeof signInFormSchema>) {
      try {
         setIsLoading(true);
         console.log(values);

         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1500));

         router.push("/dashboard");
      } catch (error) {
         console.error("Authentication error:", error);
         form.setError("root", {
            type: "manual",
            message: "Invalid email or password. Please try again.",
         });
      } finally {
         setIsLoading(false);
      }
   }

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
               <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
               <p className="mt-2 text-gray-600">Sign in to your iElect account</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     {form.formState.errors.root && <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-600">{form.formState.errors.root.message}</div>}

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
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                       type={showPassword ? "text" : "password"}
                                       placeholder="Enter your password"
                                       className="pl-10 pr-10 border-gray-300 focus:border-[#1D4ED8] focus:ring-[#1D4ED8]"
                                       {...field}
                                    />
                                    <button
                                       type="button"
                                       onClick={() => setShowPassword(!showPassword)}
                                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                       {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                 </div>
                              </FormControl>
                              <FormMessage className="text-red-500" />
                           </FormItem>
                        )}
                     />

                     <div className="flex items-center justify-between">
                        <FormField
                           control={form.control}
                           name="rememberMe"
                           render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                 <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#1D4ED8] data-[state=checked]:border-[#1D4ED8]" />
                                 </FormControl>
                                 <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-normal text-gray-700">Remember me</FormLabel>
                                 </div>
                              </FormItem>
                           )}
                        />

                        <button type="button" onClick={() => router.push("/forgot-password")} className="text-sm text-[#1D4ED8] hover:underline">
                           Forgot password?
                        </button>
                     </div>

                     <Button type="submit" className="w-full bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 text-white py-3" disabled={isLoading}>
                        {isLoading ? (
                           <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Signing in...
                           </div>
                        ) : (
                           "Sign In"
                        )}
                     </Button>
                  </form>
               </Form>

               <div className="mt-6">
                  <div className="relative">
                     <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                     </div>
                     <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                     </div>
                  </div>

                  <div className="mt-6">
                     <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                           <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                           <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                           <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                           <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                     </Button>
                  </div>
               </div>

               <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                     Don&apos;t have an account?{" "}
                     <button onClick={() => router.push("/sign-up")} className="text-[#1D4ED8] hover:underline font-medium">
                        Sign up
                     </button>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
