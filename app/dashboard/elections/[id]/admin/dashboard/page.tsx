"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Mail, CheckCircle, Clock, X, Send } from "lucide-react";

export default function AdminDashboardPage() {
   const [pendingAccreditations, setPendingAccreditations] = useState([
      {
         id: 1,
         name: "John Smith",
         email: "john.smith@university.edu",
         matricNumber: "CS/2021/001",
         regNumber: "REG001",
         yearOfStudy: "3rd Year",
         department: "Computer Science",
         submittedAt: "2024-01-15 10:30 AM",
         status: "pending",
      },
      {
         id: 2,
         name: "Sarah Johnson",
         email: "sarah.j@university.edu",
         matricNumber: "CS/2021/002",
         regNumber: "REG002",
         yearOfStudy: "2nd Year",
         department: "Computer Science",
         submittedAt: "2024-01-15 11:45 AM",
         status: "pending",
      },
   ]);

   const [approvedVoters, setApprovedVoters] = useState([
      {
         id: 3,
         name: "Mike Davis",
         email: "mike.davis@university.edu",
         matricNumber: "CS/2020/003",
         approvedAt: "2024-01-14 2:15 PM",
         status: "approved",
      },
   ]);

   const handleApprove = async (accreditationId: number) => {
      const accreditation = pendingAccreditations.find((a) => a.id === accreditationId);
      if (accreditation) {
         // Move to approved list
         setApprovedVoters((prev) => [
            ...prev,
            {
               ...accreditation,
               approvedAt: new Date().toLocaleString(),
               status: "approved",
            },
         ]);

         // Remove from pending
         setPendingAccreditations((prev) => prev.filter((a) => a.id !== accreditationId));

         // Simulate sending email
         console.log(`Sending approval email to ${accreditation.email}`);
      }
   };

   const handleReject = async (accreditationId: number) => {
      const accreditation = pendingAccreditations.find((a) => a.id === accreditationId);
      if (accreditation) {
         // Remove from pending
         setPendingAccreditations((prev) => prev.filter((a) => a.id !== accreditationId));

         // Simulate sending rejection email
         console.log(`Sending rejection email to ${accreditation.email}`);
      }
   };

   const sendBulkEmails = () => {
      console.log("Sending bulk emails to all approved voters");
   };

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
               <h1 className="text-3xl font-bold text-gray-900">Election Admin Dashboard</h1>
               <p className="text-gray-600">Manage voter accreditations and election settings</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center space-x-4">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                           <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                           <p className="text-sm text-gray-600">Pending Accreditations</p>
                           <p className="text-3xl font-bold text-gray-900">{pendingAccreditations.length}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                           <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                           <p className="text-sm text-gray-600">Approved Voters</p>
                           <p className="text-3xl font-bold text-gray-900">{approvedVoters.length}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                           <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                           <p className="text-sm text-gray-600">Total Eligible</p>
                           <p className="text-3xl font-bold text-gray-900">{pendingAccreditations.length + approvedVoters.length}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            <Tabs defaultValue="pending" className="space-y-6">
               <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pending">Pending Accreditations</TabsTrigger>
                  <TabsTrigger value="approved">Approved Voters</TabsTrigger>
                  <TabsTrigger value="communications">Communications</TabsTrigger>
               </TabsList>

               {/* Pending Accreditations */}
               <TabsContent value="pending">
                  <Card>
                     <CardHeader>
                        <CardTitle>Pending Accreditation Requests</CardTitle>
                        <CardDescription>Review and approve voter accreditation requests</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           {pendingAccreditations.map((accreditation) => (
                              <div key={accreditation.id} className="border rounded-lg p-4">
                                 <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                       <div className="flex items-center space-x-2">
                                          <h3 className="font-semibold text-gray-900">{accreditation.name}</h3>
                                          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                                             Pending
                                          </Badge>
                                       </div>
                                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                          <div>
                                             <span className="text-gray-600">Email:</span>
                                             <p className="font-medium">{accreditation.email}</p>
                                          </div>
                                          <div>
                                             <span className="text-gray-600">Matric Number:</span>
                                             <p className="font-medium">{accreditation.matricNumber}</p>
                                          </div>
                                          <div>
                                             <span className="text-gray-600">Year of Study:</span>
                                             <p className="font-medium">{accreditation.yearOfStudy}</p>
                                          </div>
                                          <div>
                                             <span className="text-gray-600">Department:</span>
                                             <p className="font-medium">{accreditation.department}</p>
                                          </div>
                                       </div>
                                       <p className="text-xs text-gray-500">Submitted: {accreditation.submittedAt}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                       <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleApprove(accreditation.id)}>
                                          <CheckCircle className="h-4 w-4 mr-1" />
                                          Approve
                                       </Button>
                                       <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleReject(accreditation.id)}>
                                          <X className="h-4 w-4 mr-1" />
                                          Reject
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                           ))}

                           {pendingAccreditations.length === 0 && (
                              <div className="text-center py-8">
                                 <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                 <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending accreditations</h3>
                                 <p className="text-gray-600">All accreditation requests have been processed</p>
                              </div>
                           )}
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* Approved Voters */}
               <TabsContent value="approved">
                  <Card>
                     <CardHeader>
                        <CardTitle>Approved Voters</CardTitle>
                        <CardDescription>List of voters approved to participate in the election</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           {approvedVoters.map((voter) => (
                              <div key={voter.id} className="border rounded-lg p-4">
                                 <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                       <div className="flex items-center space-x-2">
                                          <h3 className="font-semibold text-gray-900">{voter.name}</h3>
                                          <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                                       </div>
                                       <p className="text-sm text-gray-600">{voter.email}</p>
                                       <p className="text-xs text-gray-500">Approved: {voter.approvedAt}</p>
                                    </div>
                                    <Button size="sm" variant="outline">
                                       <Mail className="h-4 w-4 mr-1" />
                                       Send Email
                                    </Button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* Communications */}
               <TabsContent value="communications">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card>
                        <CardHeader>
                           <CardTitle>Bulk Communications</CardTitle>
                           <CardDescription>Send emails to all approved voters</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <Button className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white" onClick={sendBulkEmails}>
                              <Send className="h-4 w-4 mr-2" />
                              Send Election Reminder
                           </Button>
                           <Button variant="outline" className="w-full">
                              <Send className="h-4 w-4 mr-2" />
                              Send Voting Instructions
                           </Button>
                           <Button variant="outline" className="w-full">
                              <Send className="h-4 w-4 mr-2" />
                              Send Results Notification
                           </Button>
                        </CardContent>
                     </Card>

                     <Card>
                        <CardHeader>
                           <CardTitle>Email Templates</CardTitle>
                           <CardDescription>Manage email templates for communications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                              <h4 className="font-medium">Available Templates:</h4>
                              <ul className="text-sm space-y-1">
                                 <li>• Accreditation Approval</li>
                                 <li>• Accreditation Rejection</li>
                                 <li>• Election Reminder</li>
                                 <li>• Voting Instructions</li>
                                 <li>• Results Announcement</li>
                              </ul>
                           </div>
                           <Button variant="outline" className="w-full">
                              Customize Templates
                           </Button>
                        </CardContent>
                     </Card>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}
