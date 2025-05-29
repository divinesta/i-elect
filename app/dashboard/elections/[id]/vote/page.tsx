"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VotingPage() {
   const params = useParams();
   const electionId = params.id;

   const [timeLeft, setTimeLeft] = useState({
      days: 2,
      hours: 5,
      minutes: 32,
      seconds: 45,
   });

   const election = {
      name: "Student Council Election 2024",
      description: "Annual student council election for academic year 2024-2025",
      endDate: "2024-02-07T23:59:59",
   };

   const roles = [
      {
         id: 1,
         name: "President",
         description: "Chief Executive Officer of the Association",
         candidateCount: 3,
         hasVoted: false,
      },
      {
         id: 2,
         name: "Vice President",
         description: "Deputy Chief Executive Officer",
         candidateCount: 2,
         hasVoted: true,
      },
      {
         id: 3,
         name: "Secretary General",
         description: "Administrative Head and Record Keeper",
         candidateCount: 4,
         hasVoted: false,
      },
      {
         id: 4,
         name: "Treasurer",
         description: "Financial Officer and Budget Manager",
         candidateCount: 2,
         hasVoted: false,
      },
      {
         id: 5,
         name: "Public Relations Officer",
         description: "Communications and External Relations",
         candidateCount: 3,
         hasVoted: true,
      },
      {
         id: 6,
         name: "Board Member",
         description: "Advisory Board Representatives (3 positions)",
         candidateCount: 8,
         hasVoted: false,
      },
   ];

   // Countdown timer effect
   useEffect(() => {
      const timer = setInterval(() => {
         setTimeLeft((prev) => {
            if (prev.seconds > 0) {
               return { ...prev, seconds: prev.seconds - 1 };
            } else if (prev.minutes > 0) {
               return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
            } else if (prev.hours > 0) {
               return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
            } else if (prev.days > 0) {
               return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
            }
            return prev;
         });
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
               <h1 className="text-4xl font-bold text-gray-900">{election.name}</h1>
               <p className="text-lg text-gray-600">{election.description}</p>

               {/* Countdown Timer */}
               <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                     {timeLeft.days} days, {timeLeft.hours} hours remaining
                  </span>
               </div>
            </div>

            {/* Available Positions */}
            <div className="space-y-6">
               <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Positions</h2>
                  <p className="text-gray-600">Click on any position to cast your vote</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {roles.map((role) => (
                     <Card
                        key={role.id}
                        className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
                           role.hasVoted ? "bg-green-50 border-green-200" : "bg-white border-gray-200 hover:border-blue-300"
                        }`}
                     >
                        <CardContent className="p-6">
                           <div className="space-y-4">
                              <div className="flex items-start justify-between">
                                 <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{role.name}</h3>
                                    <p className="text-sm text-gray-600">{role.description}</p>
                                 </div>
                                 <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                              </div>

                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Users className="h-4 w-4" />
                                    <span>{role.candidateCount} candidates</span>
                                 </div>

                                 {role.hasVoted ? (
                                    <Badge className="bg-green-100 text-green-800 border-green-200">
                                       <CheckCircle className="h-3 w-3 mr-1" />
                                       Voted
                                    </Badge>
                                 ) : (
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                                       <Link href={`/dashboard/elections/${electionId}/vote/${role.id}`}>Vote Now</Link>
                                    </Button>
                                 )}
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-2 pt-8 border-t">
               <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Election is Live</span>
               </div>
               <p className="text-sm text-gray-600">Your votes are secured by blockchain technology and cannot be altered once cast.</p>
            </div>
         </div>
      </div>
   );
}
