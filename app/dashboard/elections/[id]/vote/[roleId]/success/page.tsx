"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Receipt } from "lucide-react";
import Link from "next/link";

export default function VoteSuccessPage() {
   const params = useParams();
   const router = useRouter();
   const { id: electionId } = params;

   const [countdown, setCountdown] = useState(5);

   const candidate = {
      name: "Michael Chen",
      role: "President",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
   };

   const transactionId = "0x7f9a...3b4c";

   useEffect(() => {
      const timer = setInterval(() => {
         setCountdown((prev) => {
            if (prev <= 1) {
               router.push(`/dashboard/elections/${electionId}/vote`);
               return 0;
            }
            return prev - 1;
         });
      }, 1000);

      return () => clearInterval(timer);
   }, [router, electionId]);

   return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
         <div className="max-w-md mx-auto space-y-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
               <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* Success Message */}
            <div className="space-y-2">
               <h1 className="text-3xl font-bold text-gray-900">Vote Cast!</h1>
               <p className="text-gray-600">Your vote has been securely recorded</p>
            </div>

            {/* Candidate Info */}
            <Card className="border-2 border-green-200 bg-green-50">
               <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                     <Image src={candidate.image || "/placeholder.svg"} alt={candidate.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                     <div className="text-left">
                        <h3 className="font-bold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">for {candidate.role}</p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Transaction Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
               <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Receipt className="h-4 w-4" />
                  <span>TX: {transactionId}</span>
               </div>
            </div>

            {/* Auto-redirect notice */}
            <div className="text-sm text-gray-500">
               <p>Returning in {countdown} seconds</p>
            </div>

            {/* Action Button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
               <Link href={`/dashboard/elections/${electionId}/vote`}>Continue Voting</Link>
            </Button>
         </div>
      </div>
   );
}
