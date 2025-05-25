"use client";

import { useState, useEffect } from "react";
import { Clock, Users, ChevronRight } from "lucide-react";

import { VotingLayout } from "@/components/voting/voting-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VotePage() {
   const [timeRemaining, setTimeRemaining] = useState({
      days: 5,
      hours: 14,
      minutes: 32,
      seconds: 45,
   });

   // Sample roles data
   const roles = [
      {
         id: "president",
         title: "Student Body President",
         description: "Lead the student government and represent student interests",
         candidatesCount: 3,
      },
      {
         id: "vice-president",
         title: "Vice President",
         description: "Support the president and oversee student activities",
         candidatesCount: 2,
      },
      {
         id: "secretary",
         title: "Secretary",
         description: "Manage communications and maintain official records",
         candidatesCount: 4,
      },
      {
         id: "treasurer",
         title: "Treasurer",
         description: "Oversee student government finances and budget allocation",
         candidatesCount: 2,
      },
   ];

   useEffect(() => {
      const timer = setInterval(() => {
         setTimeRemaining((prev) => {
            if (prev.seconds > 0) {
               return { ...prev, seconds: prev.seconds - 1 };
            } else if (prev.minutes > 0) {
               return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
            } else if (prev.hours > 0) {
               return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
            } else if (prev.days > 0) {
               return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
            }
            return prev;
         });
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   return (
      <VotingLayout>
         <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
               <h1 className="text-4xl font-bold text-gray-900 mb-4">CUALA Elections 2025</h1>
               <p className="text-xl text-gray-600">Cast your vote for the future leaders of our university</p>
            </div>

            {/* Countdown Timer */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
               <CardContent className="p-8">
                  <div className="text-center">
                     <div className="flex items-center justify-center mb-4">
                        <Clock className="h-8 w-8 text-blue-600 mr-3" />
                        <h2 className="text-2xl font-semibold text-gray-900">Voting Ends In</h2>
                     </div>
                     <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                           <div className="text-3xl font-bold text-blue-600">{timeRemaining.days}</div>
                           <div className="text-sm text-gray-500">Days</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                           <div className="text-3xl font-bold text-blue-600">{timeRemaining.hours}</div>
                           <div className="text-sm text-gray-500">Hours</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                           <div className="text-3xl font-bold text-blue-600">{timeRemaining.minutes}</div>
                           <div className="text-sm text-gray-500">Minutes</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                           <div className="text-3xl font-bold text-blue-600">{timeRemaining.seconds}</div>
                           <div className="text-sm text-gray-500">Seconds</div>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Roles Section */}
            <div>
               <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Position to Vote</h2>
               <div className="grid gap-6 md:grid-cols-2">
                  {roles.map((role) => (
                     <Card key={role.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                        <CardHeader className="pb-4">
                           <div className="flex items-center justify-between">
                              <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">{role.title}</CardTitle>
                              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                           </div>
                           <CardDescription className="text-gray-600">{role.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-500">
                                 <Users className="h-4 w-4 mr-2" />
                                 <span>{role.candidatesCount} candidates</span>
                              </div>
                              <Button
                                 variant="outline"
                                 className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors"
                                 onClick={() => (window.location.href = `/vote/${role.id}`)}
                              >
                                 Vote Now
                              </Button>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>

            {/* Voting Guidelines */}
            <Card className="bg-gray-50 border-gray-200">
               <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Voting Guidelines</h3>
                  <ul className="space-y-2 text-gray-600">
                     <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        You can vote for one candidate per position
                     </li>
                     <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Your vote is anonymous and secure
                     </li>
                     <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        You can change your vote until the voting period ends
                     </li>
                     <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Results will be announced after voting closes
                     </li>
                  </ul>
               </CardContent>
            </Card>
         </div>
      </VotingLayout>
   );
}
