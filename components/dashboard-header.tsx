"use client";

import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
   return (
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
         <div className="flex items-center space-x-4">
            <SidebarTrigger className="h-8 w-8" />
         </div>

         <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
               <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Bell className="h-5 w-5 text-gray-600" />
               </Button>
               <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white flex items-center justify-center">3</Badge>
            </div>

            {/* User Dropdown */}
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 h-9 px-3">
                     <div className="w-7 h-7 bg-gradient-to-br from-[#00A9FF] to-[#89CFF3] rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                     </div>
                     <span className="text-sm font-medium text-gray-700">John Doe</span>
                     <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                     <User className="mr-2 h-4 w-4" />
                     <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Settings className="mr-2 h-4 w-4" />
                     <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                     <LogOut className="mr-2 h-4 w-4" />
                     <span>Logout</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </header>
   );
}
