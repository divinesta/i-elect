import type React from "react";
import Link from "next/link";

interface AuthLayoutProps {
   children: React.ReactNode;
   title: string;
   subtitle?: string;
   imageSrc: string;
   imageAlt: string;
   isSignUp?: boolean;
}

export function AuthLayout({ children, title, subtitle, imageSrc, imageAlt, isSignUp = false }: AuthLayoutProps) {
   return (
      <div className="flex min-h-screen w-full">
         {/* Left side - Form */}
         <div className="flex w-full flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-24 md:w-1/2">
            <div className="mx-auto w-full max-w-sm">
               <div className="mb-2">
                  <Link href="/" className="text-sm font-medium text-blue-500">
                     {isSignUp ? "Register" : "Login"}
                  </Link>
               </div>
               <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome to iELECT</h1>
               {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
               <div className="mt-8">{children}</div>
               <div className="mt-8 text-center text-sm">
                  {isSignUp ? (
                     <p className="text-slate-600">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="font-medium text-blue-500 hover:text-blue-600">
                           Login
                        </Link>
                     </p>
                  ) : (
                     <p className="text-slate-600">
                        Don't have an account?{" "}
                        <Link href="/sign-up" className="font-medium text-blue-500 hover:text-blue-600">
                           Register
                        </Link>
                     </p>
                  )}
               </div>
            </div>
         </div>

         {/* Right side - Image */}
         <div className="hidden md:block md:w-1/2">
            <img src={imageSrc || "/placeholder.svg"} alt={imageAlt} className="h-full w-full object-cover" />
         </div>
      </div>
   );
}
