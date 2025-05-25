"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Vote, BarChart3, User, LogOut, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface VotingLayoutProps {
   children: React.ReactNode;
}

export function VotingLayout({ children }: VotingLayoutProps) {
   const pathname = usePathname();
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const navigation = [
      { name: "Vote", href: "/vote", icon: Vote },
      { name: "Results", href: "/vote/results", icon: BarChart3 },
      { name: "Profile", href: "/vote/profile", icon: User },
   ];

   return (
      <div className="flex min-h-screen bg-gray-50">
         {/* Desktop Sidebar */}
         <div className="hidden lg:flex lg:w-64 lg:flex-col">
            <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
               {/* Logo */}
               <div className="flex items-center h-16 px-6 border-b border-gray-200">
                  <Link href="/vote" className="flex items-center">
                     <div className="h-8 w-8 rounded-lg bg-[#1D4ED8] flex items-center justify-center mr-3">
                        <Vote className="h-5 w-5 text-white" />
                     </div>
                     <span className="text-xl font-bold text-gray-900">iElect</span>
                  </Link>
               </div>

               {/* Navigation */}
               <nav className="flex-1 px-4 py-6 space-y-1">
                  {navigation.map((item) => {
                     const isActive = pathname === item.href;
                     return (
                        <Link
                           key={item.name}
                           href={item.href}
                           className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                              isActive ? "bg-[#1D4ED8] text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                           }`}
                        >
                           <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"}`} />
                           {item.name}
                        </Link>
                     );
                  })}
               </nav>

               {/* User Profile */}
               <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                     <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                     </div>
                     <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">Computer Science</p>
                     </div>
                     <Button variant="ghost" size="icon" className="ml-2">
                        <LogOut className="h-4 w-4 text-gray-400" />
                     </Button>
                  </div>
               </div>
            </div>
         </div>

         {/* Mobile menu */}
         <div className="lg:hidden">
            {isMobileMenuOpen && (
               <div className="fixed inset-0 z-50 flex">
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
                  <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                     <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                           type="button"
                           className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                           onClick={() => setIsMobileMenuOpen(false)}
                        >
                           <X className="h-6 w-6 text-white" />
                        </button>
                     </div>
                     <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                        <div className="flex items-center flex-shrink-0 px-4">
                           <div className="h-8 w-8 rounded-lg bg-[#1D4ED8] flex items-center justify-center mr-3">
                              <Vote className="h-5 w-5 text-white" />
                           </div>
                           <span className="text-xl font-bold text-gray-900">iElect</span>
                        </div>
                        <nav className="mt-5 space-y-1 px-2">
                           {navigation.map((item) => {
                              const isActive = pathname === item.href;
                              return (
                                 <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                                       isActive ? "bg-[#1D4ED8] text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                 >
                                    <item.icon className={`mr-4 h-6 w-6 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"}`} />
                                    {item.name}
                                 </Link>
                              );
                           })}
                        </nav>
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Main content */}
         <div className="flex flex-1 flex-col">
            {/* Mobile header */}
            <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center">
                     <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu className="h-6 w-6" />
                     </Button>
                     <div className="ml-4 flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-[#1D4ED8] flex items-center justify-center mr-3">
                           <Vote className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">iElect</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Page content */}
            <main className="flex-1 p-6 lg:p-8">{children}</main>
         </div>
      </div>
   );
}
