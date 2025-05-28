"use client";

import type React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <DashboardHeader />
            <main className="flex-1 p-6 bg-gray-50">{children}</main>
         </SidebarInset>
      </SidebarProvider>
   );
}
