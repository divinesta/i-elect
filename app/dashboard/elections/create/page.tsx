"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateElectionPage() {
   const router = useRouter();
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to elections page
      router.push("/dashboard/elections");
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
               <Link href="/dashboard/elections">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Elections
               </Link>
            </Button>
            <div>
               <h1 className="text-3xl font-bold text-gray-900">Create New Election</h1>
               <p className="text-gray-600">Set up a new election for your organization</p>
            </div>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>Basic Information</CardTitle>
               <CardDescription>Enter the details for your new election</CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="electionName">Election Name</Label>
                        <Input id="electionName" placeholder="e.g., Student Council Election 2024" required />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="organization">Organization</Label>
                        <Input id="organization" placeholder="e.g., University Student Association" required />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="description">Description</Label>
                     <Textarea id="description" placeholder="Provide a brief description of the election purpose and goals" rows={3} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="datetime-local" required />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input id="endDate" type="datetime-local" required />
                     </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                     <Button type="button" variant="outline" asChild>
                        <Link href="/dashboard/elections">Cancel</Link>
                     </Button>
                     <Button type="submit" className="bg-[#00A9FF] hover:bg-[#0088CC] text-white" disabled={isSubmitting}>
                        {isSubmitting ? (
                           <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Creating...
                           </>
                        ) : (
                           "Create Election"
                        )}
                     </Button>
                  </div>
               </form>
            </CardContent>
         </Card>
      </div>
   );
}
