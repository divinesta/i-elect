"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Shield, CheckCircle, XCircle } from "lucide-react";

const verificationFormSchema = z.object({
   code: z
      .string()
      .min(6, {
         message: "Verification code must be 6 digits.",
      })
      .max(6)
      .regex(/^\d{6}$/, {
         message: "Code must contain only numbers.",
      }),
});

export default function VerificationPage() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const [resendCount, setResendCount] = useState(0);
   const [resendDisabled, setResendDisabled] = useState(false);
   const [countdown, setCountdown] = useState(0);
   const [phoneNumber, setPhoneNumber] = useState("");
   const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle");
   const [statusMessage, setStatusMessage] = useState("");

   const form = useForm<z.infer<typeof verificationFormSchema>>({
      resolver: zodResolver(verificationFormSchema),
      defaultValues: {
         code: "",
      },
   });

   useEffect(() => {
      // Get phone number from session storage
      const storedPhone = sessionStorage.getItem("verificationPhone");
      if (storedPhone) {
         setPhoneNumber(storedPhone);
      } else {
         // Redirect back to sign up if no phone number
         router.push("/sign-up");
      }
   }, [router]);

   useEffect(() => {
      let timer: NodeJS.Timeout;
      if (resendDisabled && countdown > 0) {
         timer = setTimeout(() => {
            setCountdown(countdown - 1);
         }, 1000);
      } else if (countdown === 0) {
         setResendDisabled(false);
      }

      return () => {
         if (timer) clearTimeout(timer);
      };
   }, [resendDisabled, countdown]);

   async function onSubmit(values: z.infer<typeof verificationFormSchema>) {
      try {
         setIsLoading(true);
         setVerificationStatus("idle");

         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 2000));

         // Simulate verification (in real app, this would be an API call)
         const isValid = values.code === "123456"; // Mock validation

         if (isValid) {
            setVerificationStatus("success");
            setStatusMessage("Verification successful!");

            // Clear stored phone number
            sessionStorage.removeItem("verificationPhone");

            // Redirect to dashboard after a short delay
            setTimeout(() => {
               router.push("/dashboard");
            }, 1500);
         } else {
            setVerificationStatus("error");
            setStatusMessage("Invalid code. Please try again.");
            form.setError("code", {
               type: "manual",
               message: "Invalid verification code.",
            });
         }
      } catch (error) {
         console.error("Verification error:", error);
         setVerificationStatus("error");
         setStatusMessage("Verification failed. Please try again.");
      } finally {
         setIsLoading(false);
      }
   }

   const handleResendCode = async () => {
      if (resendCount >= 3) {
         alert("Maximum resend attempts reached. Please try again later.");
         return;
      }

      setResendDisabled(true);
      setCountdown(60);
      setResendCount(resendCount + 1);
      setVerificationStatus("idle");

      // Simulate API call to resend code
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Verification code resent to:", phoneNumber);
   };

   const maskedPhone = phoneNumber.replace(/(\+?\d{1,3})\d{6}(\d{4})/, "$1******$2");

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
               <h2 className="text-3xl font-bold text-gray-900">Verify Your Phone</h2>
               <p className="mt-2 text-gray-600">
                  Enter the 6-digit code sent to <span className="font-medium text-gray-900">{maskedPhone}</span>
               </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Input
                                    placeholder="000000"
                                    {...field}
                                    maxLength={6}
                                    className="text-center text-2xl tracking-widest font-mono border-gray-300 focus:border-[#1D4ED8] focus:ring-[#1D4ED8] py-4"
                                    onChange={(e) => {
                                       const value = e.target.value.replace(/\D/g, "");
                                       field.onChange(value);
                                    }}
                                 />
                              </FormControl>
                              <FormMessage className="text-red-500 text-center" />
                           </FormItem>
                        )}
                     />

                     {/* Status Message */}
                     {verificationStatus !== "idle" && (
                        <div
                           className={`flex items-center justify-center space-x-2 p-3 rounded-md ${
                              verificationStatus === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                           }`}
                        >
                           {verificationStatus === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                           <span className="text-sm font-medium">{statusMessage}</span>
                        </div>
                     )}

                     <Button type="submit" className="w-full bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 text-white py-3" disabled={isLoading || verificationStatus === "success"}>
                        {isLoading ? (
                           <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Verifying...
                           </div>
                        ) : verificationStatus === "success" ? (
                           <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Verified!
                           </div>
                        ) : (
                           "Verify Code"
                        )}
                     </Button>
                  </form>
               </Form>

               {/* Resend Code */}
               <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                     Didn&apos;t receive a code?{" "}
                     {resendDisabled ? (
                        <span className="text-gray-400">
                           Resend in {countdown}s ({3 - resendCount} attempts left)
                        </span>
                     ) : resendCount >= 3 ? (
                        <span className="text-red-500">Maximum attempts reached</span>
                     ) : (
                        <button type="button" onClick={handleResendCode} className="text-[#1D4ED8] hover:underline font-medium">
                           Resend code ({3 - resendCount} attempts left)
                        </button>
                     )}
                  </p>
               </div>

               <div className="mt-4 text-center">
                  <button onClick={() => router.push("/sign-up")} className="text-sm text-gray-500 hover:text-gray-700">
                     ← Back to sign up
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
