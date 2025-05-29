"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function ConfirmVotePage() {
   const params = useParams();
   const router = useRouter();
   const searchParams = useSearchParams();
   const { id: electionId, roleId } = params;
   const candidateId = searchParams.get("candidate");

   const [timeLeft, setTimeLeft] = useState({
      days: 2,
      hours: 5,
      minutes: 32,
   });

   const [isSubmitting, setIsSubmitting] = useState(false);

   const role = {
      name: "President",
      description: "Chief Executive Officer of the Association",
   };

   const candidate = {
      id: 2,
      name: "Michael Chen",
      title: "Operations Manager",
      company: "Global Dynamics Inc",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      quote: "Innovation and collaboration are the keys to unlocking our potential.",
   };

   const handleConfirmVote = async () => {
      setIsSubmitting(true);
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000));
      router.push(`/dashboard/elections/${electionId}/vote/${roleId}/success?candidate=${candidateId}`);
   };

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" asChild>
                     <Link href={`/dashboard/elections/${electionId}/vote/${roleId}`}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                     </Link>
                  </Button>
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">Confirm Your Vote</h1>
                     <p className="text-gray-600">Review your selection before casting your vote</p>
                  </div>
               </div>

               <div className="flex items-center space-x-2 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                     {timeLeft.days} days, {timeLeft.hours} hours remaining
                  </span>
               </div>
            </div>

            {/* Voting For Section */}
            <div className="text-center">
               <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">VOTING FOR</p>
               <h2 className="text-2xl font-bold text-gray-900 mt-1">{role.name}</h2>
               <p className="text-gray-600">{role.description}</p>
            </div>

            {/* Candidate Card */}
            <Card className="border-2 border-blue-200 bg-blue-50">
               <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                     <img src={candidate.image || "/placeholder.svg"} alt={candidate.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                     <div className="flex-1">
                        <div className="flex items-center space-x-2">
                           <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                           <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Selected
                           </Badge>
                        </div>
                        <p className="text-sm text-blue-600">{candidate.title}</p>
                        <p className="text-sm text-gray-600">{candidate.company}</p>
                     </div>
                  </div>

                  <blockquote className="mt-4 text-sm italic text-gray-700 border-l-4 border-blue-300 pl-4 bg-white/50 py-2 rounded-r">"{candidate.quote}"</blockquote>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                     <div>
                        <span className="font-medium text-gray-700">Position:</span>
                        <p className="text-gray-900">{role.name}</p>
                     </div>
                     <div>
                        <span className="font-medium text-gray-700">Candidate:</span>
                        <p className="text-gray-900">{candidate.name}</p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
               <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                     <p className="font-medium text-yellow-800">Important:</p>
                     <p className="text-sm text-yellow-700">Once confirmed, your vote cannot be changed or withdrawn.</p>
                  </div>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
               <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/dashboard/elections/${electionId}/vote/${roleId}`}>
                     <ArrowLeft className="h-4 w-4 mr-2" />
                     Change Selection
                  </Link>
               </Button>
               <Button onClick={handleConfirmVote} disabled={isSubmitting} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  {isSubmitting ? (
                     <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Confirming Vote...
                     </>
                  ) : (
                     "Confirm Vote"
                  )}
               </Button>
            </div>

            <p className="text-xs text-center text-gray-500">By confirming, you acknowledge that your vote is final and cannot be changed.</p>
         </div>
      </div>
   );
}
