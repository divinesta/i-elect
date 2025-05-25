"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper";

const verificationFormSchema = z.object({
   code: z
      .string()
      .min(6, {
         message: "Verification code must be 6 digits.",
      })
      .max(6),
});

export default function VerificationPage() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const [resendDisabled, setResendDisabled] = useState(false);
   const [countdown, setCountdown] = useState(60);

   const form = useForm<z.infer<typeof verificationFormSchema>>({
      resolver: zodResolver(verificationFormSchema),
      defaultValues: {
         code: "",
      },
   });

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

         // This would be where you'd verify the code
         console.log(values);

         // Simulate API call delay
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // Redirect to dashboard
         router.push("/dashboard");
      } catch (error) {
         console.error("Verification error:", error);
         form.setError("code", {
            type: "manual",
            message: "Invalid verification code. Please try again.",
         });
      } finally {
         setIsLoading(false);
      }
   }

   const handleResendCode = async () => {
      setResendDisabled(true);
      setCountdown(60);

      // This would be where you'd resend the code
      console.log("Resending verification code");

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
   };

   return (
      <AuthFormWrapper
         title="Verify your account"
         description="We've sent a verification code to your email and phone. Please enter the code below to verify your account."
         backLink={{ href: "/sign-in", label: "Back to sign in" }}
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input placeholder="Enter 6-digit code" {...field} maxLength={6} className="text-center text-xl tracking-widest" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify Account"}
               </Button>
            </form>
         </Form>

         <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
               Didn't receive a code?{" "}
               {resendDisabled ? (
                  <span className="text-muted-foreground">Resend in {countdown}s</span>
               ) : (
                  <button type="button" onClick={handleResendCode} className="text-primary hover:underline">
                     Resend code
                  </button>
               )}
            </p>
         </div>
      </AuthFormWrapper>
   );
}
