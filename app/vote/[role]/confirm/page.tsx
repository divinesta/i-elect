"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Shield, Clock } from "lucide-react";
import Link from "next/link";

import { VotingLayout } from "@/components/voting/voting-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConfirmVotePage({ params }: { params: { role: string } }) {
   const router = useRouter();
   const searchParams = useSearchParams();
   const candidateId = searchParams.get("candidate");

   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isConfirmed, setIsConfirmed] = useState(false);
   const [countdown, setCountdown] = useState(5);

   // Sample candidates data with real images
   const roleData = {
      president: {
         title: "Student Body President",
         candidates: [
            {
               id: "sarah-johnson",
               name: "Sarah Johnson",
               course: "Political Science",
               year: "Senior",
               image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
               quote: "Together, we can build a more inclusive and vibrant campus community.",
            },
            {
               id: "michael-chen",
               name: "Michael Chen",
               course: "Business Administration",
               year: "Junior",
               image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
               quote: "Innovation and collaboration are the keys to unlocking our potential.",
            },
            {
               id: "emily-rodriguez",
               name: "Emily Rodriguez",
               course: "Environmental Science",
               year: "Senior",
               image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
               quote: "Let's create sustainable solutions and meaningful change.",
            },
         ],
      },
      "vice-president": {
         title: "Vice President",
         candidates: [
            {
               id: "david-kim",
               name: "David Kim",
               course: "Computer Science",
               year: "Junior",
               image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
               quote: "Technology should serve students, not the other way around.",
            },
            {
               id: "maria-santos",
               name: "Maria Santos",
               course: "Psychology",
               year: "Senior",
               image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
               quote: "Mental health and student wellbeing should be at the center of everything.",
            },
         ],
      },
   };

   const currentRole = roleData[params.role as keyof typeof roleData] || roleData.president;
   const candidate = currentRole.candidates.find((c) => c.id === candidateId);

   useEffect(() => {
      if (isConfirmed && countdown > 0) {
         const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
         return () => clearTimeout(timer);
      } else if (isConfirmed && countdown === 0) {
         router.push("/vote");
      }
   }, [isConfirmed, countdown, router]);

   const handleConfirm = async () => {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsConfirmed(true);
   };

   const handleGoBack = () => {
      router.back();
   };

   if (!candidate) {
      return (
         <VotingLayout>
            <div className="max-w-md mx-auto text-center py-16">
               <h1 className="text-xl font-semibold text-gray-900 mb-4">Candidate Not Found</h1>
               <Link href="/vote" className="text-blue-600 hover:text-blue-700">
                  Return to Voting
               </Link>
            </div>
         </VotingLayout>
      );
   }

   if (isConfirmed) {
      return (
         <VotingLayout>
            <div className="max-w-md mx-auto text-center py-16 space-y-8">
               {/* Success Icon */}
               <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
               </div>

               <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-gray-900">Vote Submitted</h1>
                  <p className="text-gray-600">
                     Your vote for <span className="font-medium">{candidate.name}</span> has been recorded.
                  </p>
               </div>

               {/* Candidate Summary */}
               <Card className="border border-gray-200">
                  <CardContent className="p-4">
                     <div className="flex items-center space-x-3">
                        <img src={candidate.image || "/placeholder.svg"} alt={candidate.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="text-left">
                           <p className="font-medium text-gray-900">{candidate.name}</p>
                           <p className="text-sm text-gray-600">{currentRole.title}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Security Note */}
               <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                     <Shield className="h-4 w-4" />
                     <span>Your vote is secure and anonymous</span>
                  </div>
               </div>

               {/* Countdown */}
               <div className="text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-1">
                     <Clock className="h-4 w-4" />
                     <span>Returning in {countdown} seconds</span>
                  </div>
               </div>

               <Button onClick={() => router.push("/vote")} className="bg-gray-900 hover:bg-gray-800 text-white">
                  Continue Voting
               </Button>
            </div>
         </VotingLayout>
      );
   }

   return (
      <VotingLayout>
         <div className="max-w-md mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-4">
               <button onClick={handleGoBack} className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
               </button>

               <div>
                  <h1 className="text-2xl font-bold text-gray-900">Confirm Your Vote</h1>
                  <p className="text-gray-600 mt-1">Review your selection before submitting</p>
               </div>
            </div>

            {/* Candidate Card */}
            <Card className="border border-gray-200">
               <CardContent className="p-6 space-y-6">
                  {/* Candidate Info */}
                  <div className="flex items-center space-x-4">
                     <img src={candidate.image || "/placeholder.svg"} alt={candidate.name} className="w-16 h-16 rounded-full object-cover" />
                     <div>
                        <h2 className="text-lg font-semibold text-gray-900">{candidate.name}</h2>
                        <p className="text-gray-600">
                           {candidate.course} • {candidate.year}
                        </p>
                        <p className="text-sm text-gray-500">{currentRole.title}</p>
                     </div>
                  </div>

                  {/* Quote */}
                  <div className="bg-gray-50 rounded-lg p-4">
                     <p className="text-sm text-gray-700 italic">"{candidate.quote}"</p>
                  </div>

                  {/* Vote Summary */}
                  <div className="space-y-2 text-sm">
                     <div className="flex justify-between">
                        <span className="text-gray-600">Position:</span>
                        <span className="text-gray-900">{currentRole.title}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Candidate:</span>
                        <span className="text-gray-900">{candidate.name}</span>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
               <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Once submitted, your vote cannot be changed.
               </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
               <Button variant="outline" onClick={handleGoBack} disabled={isSubmitting} className="border-gray-300">
                  Change
               </Button>
               <Button onClick={handleConfirm} disabled={isSubmitting} className="bg-gray-900 hover:bg-gray-800 text-white">
                  {isSubmitting ? (
                     <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                     </div>
                  ) : (
                     "Confirm Vote"
                  )}
               </Button>
            </div>
         </div>
      </VotingLayout>
   );
}
