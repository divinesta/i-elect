"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthLayout } from "@/components/auth/auth-layout";

const signInFormSchema = z.object({
   email: z.string().email({
      message: "Please enter a valid email address.",
   }),
   password: z.string().min(1, {
      message: "Please enter your password.",
   }),
   rememberMe: z.boolean().default(false).optional(),
});

export default function SignInPage() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);

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
         await new Promise((resolve) => setTimeout(resolve, 1000));
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
      <AuthLayout title="Welcome to iELECT" imageSrc="images/black-businessman-happy-expression.jpg" imageAlt="Person giving thumbs up">
         <div>
            <Button variant="outline" className="w-full justify-center gap-2 border-slate-200 bg-white text-slate-900">
               <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
               </svg>
               Continue with Google
            </Button>

            <div className="relative my-6">
               <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">or</span>
               </div>
            </div>

            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {form.formState.errors.root && <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{form.formState.errors.root.message}</div>}

                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-slate-700">Email Address</FormLabel>
                           <FormControl>
                              <Input type="email" placeholder="name@example.com" className="border-slate-200" {...field} />
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
                           <FormLabel className="text-slate-700">Password</FormLabel>
                           <FormControl>
                              <Input type="password" placeholder="••••••••" className="border-slate-200" {...field} />
                           </FormControl>
                           <FormMessage className="text-red-500" />
                        </FormItem>
                     )}
                  />

                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                     {isLoading ? "Signing in..." : "Login"}
                  </Button>
               </form>
            </Form>
         </div>
      </AuthLayout>
   );
}
