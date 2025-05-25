import type React from "react";
import Link from "next/link";

interface AuthFormWrapperProps {
   children: React.ReactNode;
   title: string;
   description: string;
   backLink?: {
      href: string;
      label: string;
   };
   isSignUp?: boolean;
}

export function AuthFormWrapper({ children, title, description, backLink, isSignUp = false }: AuthFormWrapperProps) {
   return (
      <div className="auth-container">
         <div className="auth-left">
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-gradient-to-br from-primary-lightest via-primary-lighter to-primary opacity-70"></div>
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <div className="h-40 w-40 rounded-full bg-white/30 backdrop-blur-sm"></div>
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary-lighter to-transparent"></div>
            </div>
            <div className="relative z-10 text-center text-white">
               <h2 className="text-2xl font-bold">Welcome to the community</h2>
               <p className="mt-2 opacity-90">{isSignUp ? "Sign up to explore" : "Login to explore"}</p>
            </div>
         </div>
         <div className="auth-right">
            <div className="mb-8 flex w-full max-w-md justify-between">
               <Link href="/" className="flex items-center">
                  <div className="mr-2 h-8 w-8 rounded-full bg-primary"></div>
                  <span className="text-xl font-bold text-primary">iElect</span>
               </Link>
               {backLink && (
                  <Link href={backLink.href} className="text-sm text-muted-foreground hover:text-primary">
                     {backLink.label}
                  </Link>
               )}
            </div>

            <div className="auth-form">
               <div className="mb-6">
                  <h1 className="auth-heading">{title}</h1>
                  <p className="auth-subheading">{description}</p>
               </div>
               {children}
            </div>
         </div>
      </div>
   );
}
