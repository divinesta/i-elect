"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, HelpCircle, Home, LogOut, Settings, User, Vote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardLayoutProps {
   children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
   const pathname = usePathname();
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const navigation = [
      { name: "Dashboard", href: "/dashboard", icon: Home },
      { name: "Elections", href: "/dashboard/elections", icon: Vote },
      { name: "Voting History", href: "/dashboard/history", icon: Vote },
      { name: "Account Settings", href: "/dashboard/settings", icon: Settings },
      { name: "Help", href: "/dashboard/help", icon: HelpCircle },
   ];

   return (
      <div className="flex min-h-screen bg-gray-50">
         {/* Sidebar for desktop */}
         <div className="hidden md:flex md:w-64 md:flex-col">
            <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5">
               <div className="flex items-center flex-shrink-0 px-4">
                  <Link href="/dashboard" className="flex items-center">
                     <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                        <Vote className="h-4 w-4 text-white" />
                     </div>
                     <span className="text-xl font-bold text-gray-900">iElect</span>
                  </Link>
               </div>
               <div className="mt-5 flex flex-col flex-grow">
                  <nav className="flex-1 space-y-1 px-2 pb-4">
                     {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                           <Link
                              key={item.name}
                              href={item.href}
                              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                 isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                           >
                              <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"}`} aria-hidden="true" />
                              {item.name}
                           </Link>
                        );
                     })}
                  </nav>
               </div>
            </div>
         </div>

         {/* Mobile menu */}
         <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
               <SheetTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 p-0 ml-2 mt-2">
                     <span className="sr-only">Open menu</span>
                     <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                     </svg>
                  </Button>
               </SheetTrigger>
               <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                  <div className="flex items-center mb-6">
                     <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                        <Vote className="h-4 w-4 text-white" />
                     </div>
                     <span className="text-xl font-bold text-gray-900">iElect</span>
                  </div>
                  <nav className="flex flex-col space-y-1">
                     {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                           <Link
                              key={item.name}
                              href={item.href}
                              className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                           >
                              <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"}`} aria-hidden="true" />
                              {item.name}
                           </Link>
                        );
                     })}
                  </nav>
               </SheetContent>
            </Sheet>
         </div>

         {/* Main content */}
         <div className="flex flex-1 flex-col">
            <div className="border-b border-gray-200 bg-white">
               <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
                  {/* Mobile menu button */}
                  <div className="flex items-center md:hidden">
                     <Button variant="ghost" className="h-10 w-10 p-0" onClick={() => setIsMobileMenuOpen(true)}>
                        <span className="sr-only">Open menu</span>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                     </Button>
                     <div className="ml-4 md:hidden">
                        <Link href="/dashboard" className="flex items-center">
                           <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                              <Vote className="h-4 w-4 text-white" />
                           </div>
                           <span className="text-xl font-bold text-gray-900">iElect</span>
                        </Link>
                     </div>
                  </div>

                  {/* Right side of navbar */}
                  <div className="flex items-center ml-auto">
                     {/* Notifications dropdown */}
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" size="icon" className="relative">
                              <Bell className="h-5 w-5" />
                              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                              <span className="sr-only">Notifications</span>
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                           <div className="flex items-center justify-between px-4 py-2 border-b">
                              <h2 className="text-sm font-medium">Notifications</h2>
                              <Button variant="ghost" size="sm" className="text-xs text-blue-500">
                                 Mark all as read
                              </Button>
                           </div>
                           <div className="max-h-96 overflow-y-auto">
                              <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-500">
                                 <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                       <Vote className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1">
                                       <p className="text-sm font-medium text-gray-900">New election available</p>
                                       <p className="text-xs text-gray-500">City Council Election is now open for voting</p>
                                       <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="px-4 py-3 border-b">
                                 <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                       <Settings className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1">
                                       <p className="text-sm font-medium text-gray-900">Account verified</p>
                                       <p className="text-xs text-gray-500">Your account has been successfully verified</p>
                                       <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="px-4 py-3 border-b">
                                 <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                       <Vote className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1">
                                       <p className="text-sm font-medium text-gray-900">Vote recorded</p>
                                       <p className="text-xs text-gray-500">Your vote in School Board Election has been recorded</p>
                                       <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="px-4 py-2 border-t text-center">
                              <Link href="/dashboard/notifications" className="text-xs text-blue-500 hover:text-blue-600">
                                 View all notifications
                              </Link>
                           </div>
                        </DropdownMenuContent>
                     </DropdownMenu>

                     {/* Profile dropdown */}
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" className="ml-4 flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                 <User className="h-4 w-4 text-gray-600" />
                              </div>
                              <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">John Doe</span>
                              <ChevronDown className="ml-1 h-4 w-4 text-gray-500 hidden sm:block" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem asChild>
                              <Link href="/dashboard/settings" className="cursor-pointer">
                                 <Settings className="mr-2 h-4 w-4" />
                                 <span>Account Settings</span>
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem asChild>
                              <Link href="/sign-in" className="cursor-pointer">
                                 <LogOut className="mr-2 h-4 w-4" />
                                 <span>Logout</span>
                              </Link>
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               </div>
            </div>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 md:p-8">{children}</main>
         </div>
      </div>
   );
}
