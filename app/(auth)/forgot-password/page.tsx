"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper";

const forgotPasswordFormSchema = z.object({
   email: z.string().email({
      message: "Please enter a valid email address.",
   }),
});

export default function ForgotPasswordPage() {
   const [isLoading, setIsLoading] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);

   const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
      resolver: zodResolver(forgotPasswordFormSchema),
      defaultValues: {
         email: "",
      },
   });

   async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
      try {
         setIsLoading(true);

         // This would be where you'd handle the password reset request
         console.log(values);

         // Simulate API call delay
         await new Promise((resolve) => setTimeout(resolve, 1000));

         setIsSubmitted(true);
      } catch (error) {
         console.error("Password reset error:", error);
      } finally {
         setIsLoading(false);
      }
   }

   return (
      <AuthFormWrapper title="Reset your password" description="Enter your email address and we'll send you a link to reset your password." backLink={{ href: "/sign-in", label: "Back to sign in" }}>
         {isSubmitted ? (
            <div className="space-y-4 text-center">
               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-lightest">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="h-8 w-8 text-primary"
                  >
                     <path d="M22 2L11 13"></path>
                     <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                  </svg>
               </div>
               <h3 className="text-xl font-semibold">Check your email</h3>
               <p className="text-muted-foreground">
                  We&apos;ve sent a password reset link to <span className="font-medium">{form.getValues().email}</span>. Please check your inbox and follow the instructions to reset your password.
               </p>
               <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                  Go back
               </Button>
            </div>
         ) : (
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                     {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
               </form>
            </Form>
         )}
      </AuthFormWrapper>
   );
}
