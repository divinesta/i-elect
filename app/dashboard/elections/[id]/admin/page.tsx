"use client";

import type React from "react";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
   const params = useParams();
   const router = useRouter();
   const electionId = params.id;

   const [pin, setPin] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState("");

   // Mock election data
   const election = {
      id: 1,
      name: "Student Council Election 2024",
      organization: "Tech University",
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");

      if (pin.length !== 4) {
         setError("PIN must be 4 digits");
         setIsSubmitting(false);
         return;
      }

      // Simulate API call to verify PIN
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock PIN verification (in real app, this would be an API call)
      if (pin === "1234") {
         // Redirect to admin dashboard
         router.push(`/dashboard/elections/${electionId}/admin/dashboard`);
      } else {
         setError("Invalid PIN. Please try again.");
      }

      setIsSubmitting(false);
   };

   return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
         <div className="w-full max-w-md space-y-6">
            <div className="text-center">
               <Button variant="ghost" size="sm" asChild className="mb-4">
                  <Link href="/dashboard/elections">
                     <ArrowLeft className="h-4 w-4 mr-2" />
                     Back to Elections
                  </Link>
               </Button>
               <h1 className="text-3xl font-bold text-gray-900">Admin Access</h1>
               <p className="text-gray-600">Enter your PIN to access election management</p>
            </div>

            <Card>
               <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Lock className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>{election.name}</CardTitle>
                  <CardDescription>{election.organization}</CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="pin">Admin PIN</Label>
                        <Input
                           id="pin"
                           type="password"
                           placeholder="Enter 4-digit PIN"
                           value={pin}
                           onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                           maxLength={4}
                           className="text-center text-2xl tracking-widest"
                           required
                        />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                     </div>

                     <Button type="submit" className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white" disabled={isSubmitting || pin.length !== 4}>
                        {isSubmitting ? (
                           <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Verifying...
                           </>
                        ) : (
                           "Access Admin Panel"
                        )}
                     </Button>
                  </form>

                  <div className="mt-6 text-center text-sm text-gray-600">
                     <p>Don&apos;t have admin access?</p>
                     <Link href={`/dashboard/elections/${electionId}/accredit`} className="text-[#00A9FF] hover:underline">
                        Get accredited as a voter instead
                     </Link>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
