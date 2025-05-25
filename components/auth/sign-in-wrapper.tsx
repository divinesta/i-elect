import type React from "react";
import Link from "next/link";
import Image from 'next/image';
import { LockIcon, ShieldCheckIcon, CheckCircleIcon, ServerIcon, DatabaseIcon } from "lucide-react";

interface SignInWrapperProps {
   children: React.ReactNode;
   title: string;
   description: string;
   backLink?: {
      href: string;
      label: string;
   };
}

export function SignInWrapper({ children, title, description, backLink }: SignInWrapperProps) {
   return (
      <div className="auth-container">
         {/* Background elements */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full opacity-30 blur-3xl"></div>
         </div>

         {/* Curved divider elements */}
         <div className="curve-divider top-[-5%] left-[45%] md:left-[48%]"></div>
         <div className="curve-divider bottom-[-5%] left-[45%] md:left-[48%]"></div>

         {/* Left side - Form */}
         <div className="auth-left">
            <div className="mb-8 flex w-full max-w-md justify-between mx-auto">
               <Link href="/" className="flex items-center">
                  <div className="mr-2 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                     <LockIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-slate-800">iElect</span>
               </Link>
               {backLink && (
                  <Link href={backLink.href} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                     {backLink.label}
                  </Link>
               )}
            </div>

            <div className="auth-form-container">
               <div className="mb-6">
                  <h1 className="auth-heading">{title}</h1>
                  <p className="auth-subheading">{description}</p>
               </div>
               {children}
            </div>
         </div>

         {/* Right side - Image and floating elements */}
         <div className="auth-right">
            <div className="absolute inset-0 z-0 rounded-tl-[80px] md:rounded-l-[80px] overflow-hidden">
               {/* Background gradient */}
               <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>

               {/* Network sphere */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[80%] max-w-[500px] aspect-square">
                     <Image src="/images/network-sphere.jpg" alt="Network sphere" className="absolute inset-0 w-full h-full object-contain floating-slow" />
                     {/* Glow effect */}
                     <div className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
                  </div>
               </div>
            </div>

            {/* Floating elements */}
            <div className="relative z-10 w-full h-full">
               {/* Lock icon */}
               <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="glass-icon floating">
                     <LockIcon className="h-8 w-8 text-blue-600" />
                  </div>
               </div>

               {/* Shield icon */}
               <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2">
                  <div className="glass-icon floating-reverse">
                     <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
                  </div>
               </div>

               {/* Check icon */}
               <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                  <div className="glass-icon floating-slow">
                     <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                  </div>
               </div>

               {/* Server icon */}
               <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2">
                  <div className="glass-icon floating-fast">
                     <ServerIcon className="h-6 w-6 text-blue-600" />
                  </div>
               </div>

               {/* Database icon */}
               <div className="absolute top-2/3 right-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <div className="glass-icon floating">
                     <DatabaseIcon className="h-6 w-6 text-blue-600" />
                  </div>
               </div>

               {/* Glowing dots */}
               <div className="absolute top-1/5 right-1/5 h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.7)] pulsing"></div>
               <div className="absolute bottom-1/4 right-1/3 h-4 w-4 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.7)] pulsing"></div>
               <div className="absolute top-2/3 left-1/4 h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.7)] pulsing"></div>
               <div className="absolute top-1/3 left-1/5 h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.7)] pulsing"></div>
               <div className="absolute bottom-1/5 right-1/4 h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.7)] pulsing"></div>
            </div>

            <div className="relative z-10 text-center max-w-md px-6 hidden md:block">
               <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl border border-slate-200 shadow-xl">
                  <h2 className="text-2xl font-bold mb-2 text-slate-800">Secure Blockchain Voting</h2>
                  <p className="text-slate-600">Your vote is secure, transparent, and immutable with our advanced blockchain technology.</p>
               </div>
            </div>
         </div>
      </div>
   );
}
