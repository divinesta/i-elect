import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from '@radix-ui/react-progress';
import { Target, TrendingUp, Users, Clock, Crown } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const hourlyVotingData = [
   { hour: "9 AM", votes: 45 },
   { hour: "10 AM", votes: 78 },
   { hour: "11 AM", votes: 92 },
   { hour: "12 PM", votes: 156 },
   { hour: "1 PM", votes: 134 },
   { hour: "2 PM", votes: 167 },
   { hour: "3 PM", votes: 145 },
   { hour: "4 PM", votes: 75 },
];


const realTimeResults = [
   {
      position: "President",
      totalVotes: 456,
      candidates: [
         {
            id: 1,
            name: "Sarah Johnson",
            votes: 158,
            percentage: 34.6,
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
            trend: "+2.3%",
            isLeading: true,
         },
         {
            id: 2,
            name: "Michael Chen",
            votes: 156,
            percentage: 34.2,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            trend: "+1.8%",
            isLeading: false,
         },
         {
            id: 3,
            name: "Dr. Emily Rodriguez",
            votes: 142,
            percentage: 31.1,
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
            trend: "-0.5%",
            isLeading: false,
         },
      ],
   },
   {
      position: "Vice President",
      totalVotes: 423,
      candidates: [
         {
            id: 4,
            name: "James Wilson",
            votes: 234,
            percentage: 55.3,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            trend: "+3.1%",
            isLeading: true,
         },
         {
            id: 5,
            name: "Lisa Anderson",
            votes: 189,
            percentage: 44.7,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
            trend: "-1.2%",
            isLeading: false,
         },
      ],
   },
   {
      position: "Secretary",
      totalVotes: 398,
      candidates: [
         {
            id: 6,
            name: "David Kim",
            votes: 145,
            percentage: 36.4,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
            trend: "+1.5%",
            isLeading: true,
         },
         {
            id: 7,
            name: "Maria Garcia",
            votes: 132,
            percentage: 33.2,
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
            trend: "+0.8%",
            isLeading: false,
         },
         {
            id: 8,
            name: "Robert Taylor",
            votes: 121,
            percentage: 30.4,
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
            trend: "-2.1%",
            isLeading: false,
         },
      ],
   },
];


const RealtimeResults = () => {
   return (

   <div className="space-y-6">
      <div className="flex items-center justify-between">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Real-time Results</h1>
             <p className="text-gray-600 mt-2">Live voting results and detailed analytics</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
             <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
             Live Updates
          </div>
       </div>

       {/* Overall Stats */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-gray-200 shadow-sm">
             <CardContent className="p-6">
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-gray-600 text-sm font-medium">Total Votes</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">1,277</p>
                      <p className="text-green-600 text-sm mt-1">+23 in last hour</p>
                   </div>
                   <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Target className="h-6 w-6 text-blue-600" />
                   </div>
                </div>
             </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
             <CardContent className="p-6">
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-gray-600 text-sm font-medium">Participation Rate</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">71.5%</p>
                      <p className="text-green-600 text-sm mt-1">+1.2% today</p>
                   </div>
                   <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                   </div>
                </div>
             </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
             <CardContent className="p-6">
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-gray-600 text-sm font-medium">Active Positions</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">6</p>
                      <p className="text-gray-600 text-sm mt-1">All positions live</p>
                   </div>
                   <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                   </div>
                </div>
             </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
             <CardContent className="p-6">
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-gray-600 text-sm font-medium">Time Remaining</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">2d 5h</p>
                      <p className="text-orange-600 text-sm mt-1">Until deadline</p>
                   </div>
                   <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-600" />
                   </div>
                </div>
             </CardContent>
          </Card>
       </div>

       {/* Voting Activity Chart */}
       <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
             <CardTitle className="text-lg">Voting Activity Today</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={hourlyVotingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="votes" stroke="#3B82F6" strokeWidth={3} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
       </Card>

       {/* Position Results */}
       <div className="space-y-6">
          {realTimeResults.map((position, index) => (
             <Card key={index} className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                   <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{position.position}</CardTitle>
                      <Badge variant="outline" className="text-[#1d4ed8] border-[#1d4ed8]/20">
                         {position.totalVotes} votes cast
                      </Badge>
                   </div>
                </CardHeader>
                <CardContent>
                   <div className="space-y-4">
                      {position.candidates.map((candidate, candidateIndex) => (
                         <div key={candidateIndex} className={`p-4 rounded-xl border-2 transition-all ${candidate.isLeading ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"}`}>
                            <div className="flex items-center justify-between mb-3">
                               <div className="flex items-center gap-4">
                                  <div className="relative">
                                     <Avatar className="h-12 w-12">
                                        <AvatarImage src={candidate.image || "/placeholder.svg"} alt={candidate.name} />
                                        <AvatarFallback>
                                           {candidate.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                        </AvatarFallback>
                                     </Avatar>
                                     {candidate.isLeading && (
                                        <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                           <Crown className="h-3 w-3 text-yellow-800" />
                                        </div>
                                     )}
                                  </div>
                                  <div>
                                     <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                                     <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-600">{candidate.votes} votes</span>
                                        <span className={`text-sm font-medium ${candidate.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{candidate.trend}</span>
                                     </div>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <div className="text-2xl font-bold text-gray-900">{candidate.percentage}%</div>
                                  {candidate.isLeading && <Badge className="bg-blue-600 text-white text-xs">Leading</Badge>}
                               </div>
                            </div>
                            <div className="space-y-2">
                               <Progress value={candidate.percentage} className="h-3" />
                               <div className="flex justify-between text-xs text-gray-500">
                                  <span>0%</span>
                                  <span>50%</span>
                                  <span>100%</span>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </CardContent>
             </Card>
          ))}
       </div>
   </div>
   );
}

export default RealtimeResults;