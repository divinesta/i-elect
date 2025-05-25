"use client";

import { BarChart3, Users, Vote, TrendingUp, Download } from "lucide-react";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
   // Sample analytics data
   const votersByPosition = [
      { position: "Student Body President", voters: 847, total: 1500 },
      { position: "Vice President", voters: 823, total: 1500 },
      { position: "Secretary", voters: 756, total: 1500 },
      { position: "Treasurer", voters: 692, total: 1500 },
   ];

   const overallStats = {
      totalVoters: 1500,
      votesCase: 847,
      participationRate: 56.5,
      activeElections: 2,
   };

   const hourlyVoting = [
      { hour: "8 AM", votes: 45 },
      { hour: "9 AM", votes: 78 },
      { hour: "10 AM", votes: 123 },
      { hour: "11 AM", votes: 156 },
      { hour: "12 PM", votes: 189 },
      { hour: "1 PM", votes: 234 },
      { hour: "2 PM", votes: 198 },
      { hour: "3 PM", votes: 167 },
      { hour: "4 PM", votes: 145 },
      { hour: "5 PM", votes: 98 },
   ];

   const maxVotes = Math.max(...hourlyVoting.map((h) => h.votes));

   return (
      <AdminLayout>
         <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                  <p className="text-gray-600 mt-1">Voter turnout and election statistics</p>
               </div>
               <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
               </Button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                           <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                           <p className="text-sm font-medium text-gray-600">Total Voters</p>
                           <p className="text-2xl font-bold text-gray-900">{overallStats.totalVoters.toLocaleString()}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                           <Vote className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                           <p className="text-sm font-medium text-gray-600">Votes Cast</p>
                           <p className="text-2xl font-bold text-gray-900">{overallStats.votesCase.toLocaleString()}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                           <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                           <p className="text-sm font-medium text-gray-600">Participation Rate</p>
                           <p className="text-2xl font-bold text-gray-900">{overallStats.participationRate}%</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardContent className="p-6">
                     <div className="flex items-center">
                        <div className="p-2 bg-orange-100 rounded-lg">
                           <BarChart3 className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                           <p className="text-sm font-medium text-gray-600">Active Elections</p>
                           <p className="text-2xl font-bold text-gray-900">{overallStats.activeElections}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Voters by Position */}
            <Card>
               <CardHeader>
                  <CardTitle>Voters by Position</CardTitle>
                  <CardDescription>Number of votes cast for each position</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="space-y-6">
                     {votersByPosition.map((position, index) => {
                        const percentage = (position.voters / position.total) * 100;
                        return (
                           <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                 <span className="text-sm font-medium text-gray-900">{position.position}</span>
                                 <span className="text-sm text-gray-600">
                                    {position.voters.toLocaleString()} / {position.total.toLocaleString()} ({percentage.toFixed(1)}
                                    %)
                                 </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                 <div className="bg-[#1D4ED8] h-3 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </CardContent>
            </Card>

            {/* Hourly Voting Pattern */}
            <Card>
               <CardHeader>
                  <CardTitle>Voting Pattern (Today)</CardTitle>
                  <CardDescription>Hourly breakdown of votes cast</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                        {hourlyVoting.map((hour, index) => {
                           const height = (hour.votes / maxVotes) * 100;
                           return (
                              <div key={index} className="flex flex-col items-center space-y-2">
                                 <div className="w-full bg-gray-200 rounded-t h-24 flex items-end">
                                    <div className="w-full bg-[#1D4ED8] rounded-t transition-all duration-500" style={{ height: `${height}%` }} />
                                 </div>
                                 <span className="text-xs text-gray-600 text-center">{hour.hour}</span>
                                 <span className="text-xs font-medium text-gray-900">{hour.votes}</span>
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Participation Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Participation by Academic Year</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {[
                           { year: "Senior", count: 234, percentage: 27.6 },
                           { year: "Junior", count: 198, percentage: 23.4 },
                           { year: "Sophomore", count: 223, percentage: 26.3 },
                           { year: "Freshman", count: 192, percentage: 22.7 },
                        ].map((item, index) => (
                           <div key={index} className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900">{item.year}</span>
                              <div className="flex items-center space-x-3">
                                 <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#1D4ED8] h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                                 </div>
                                 <span className="text-sm text-gray-600 w-16 text-right">
                                    {item.count} ({item.percentage}%)
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>Device Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {[
                           { device: "Mobile", count: 456, percentage: 53.8 },
                           { device: "Desktop", count: 267, percentage: 31.5 },
                           { device: "Tablet", count: 124, percentage: 14.7 },
                        ].map((item, index) => (
                           <div key={index} className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900">{item.device}</span>
                              <div className="flex items-center space-x-3">
                                 <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#1D4ED8] h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                                 </div>
                                 <span className="text-sm text-gray-600 w-16 text-right">
                                    {item.count} ({item.percentage}%)
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </AdminLayout>
   );
}
