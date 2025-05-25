"use client";

import { User, GraduationCap, Calendar } from "lucide-react";

import { VotingLayout } from "@/components/voting/voting-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
   const userInfo = {
      name: "John Doe",
      email: "john.doe@university.edu",
      studentId: "2021CS001",
      course: "Computer Science",
      year: "Senior",
      faculty: "Faculty of Engineering",
      votingStatus: "Eligible",
   };

   return (
      <VotingLayout>
         <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
               <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
               <p className="text-gray-600">Your account information and voting status</p>
            </div>

            {/* Profile Information */}
            <div className="grid gap-6 md:grid-cols-2">
               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        Personal Information
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div>
                        <p className="text-sm font-medium text-gray-700">Full Name</p>
                        <p className="text-gray-900">{userInfo.name}</p>
                     </div>
                     <div>
                        <p className="text-sm font-medium text-gray-700">Email Address</p>
                        <p className="text-gray-900">{userInfo.email}</p>
                     </div>
                     <div>
                        <p className="text-sm font-medium text-gray-700">Student ID</p>
                        <p className="text-gray-900">{userInfo.studentId}</p>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                        Academic Information
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div>
                        <p className="text-sm font-medium text-gray-700">Course of Study</p>
                        <p className="text-gray-900">{userInfo.course}</p>
                     </div>
                     <div>
                        <p className="text-sm font-medium text-gray-700">Academic Year</p>
                        <p className="text-gray-900">{userInfo.year}</p>
                     </div>
                     <div>
                        <p className="text-sm font-medium text-gray-700">Faculty</p>
                        <p className="text-gray-900">{userInfo.faculty}</p>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Voting Status */}
            <Card className="bg-green-50 border-green-200">
               <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                     <Calendar className="h-5 w-5 mr-2" />
                     Voting Status
                  </CardTitle>
                  <CardDescription className="text-green-600">You are eligible to participate in the current election</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-green-700">Status</p>
                        <p className="text-green-900 font-semibold">{userInfo.votingStatus}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-medium text-green-700">Verification</p>
                        <p className="text-green-900 font-semibold">Verified</p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Important Information */}
            <Card className="bg-blue-50 border-blue-200">
               <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Information</h3>
                  <ul className="space-y-2 text-blue-800">
                     <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Your vote is completely anonymous and cannot be traced back to you
                     </li>
                     <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        You can only vote once per position during the election period
                     </li>
                     <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        If you encounter any issues, contact the election committee immediately
                     </li>
                  </ul>
               </CardContent>
            </Card>
         </div>
      </VotingLayout>
   );
}
