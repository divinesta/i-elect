"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, Info } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VotePage(props: { params: Promise<{ id: string }> }) {
   const params = use(props.params);
   const router = useRouter();
   const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
   const [isVoting, setIsVoting] = useState(false);
   const [isVoted, setIsVoted] = useState(false);
   const [voteId, setVoteId] = useState("");

   // Sample data - in a real app, this would come from an API
   const election = {
      id: Number.parseInt(params.id),
      name: "City Council Election",
      description: "Vote for your local city council representatives",
      startDate: "2025-05-20",
      endDate: "2025-05-27",
      candidates: [
         { id: "1", name: "Jane Smith", party: "Progressive Party", description: "Focus on environmental initiatives" },
         { id: "2", name: "John Johnson", party: "Community First", description: "Emphasis on local business support" },
         { id: "3", name: "Maria Garcia", party: "Future Forward", description: "Advocate for education reform" },
         { id: "4", name: "Robert Lee", party: "Independent", description: "Platform of fiscal responsibility" },
      ],
   };

   // Calculate time remaining
   const endDate = new Date(election.endDate);
   const now = new Date();
   const timeRemaining = endDate.getTime() - now.getTime();
   const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

   const handleVote = () => {
      if (!selectedCandidate) return;

      setIsVoting(true);

      // Simulate blockchain transaction
      setTimeout(() => {
         setIsVoting(false);
         setIsVoted(true);
         setVoteId("0x" + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2));
      }, 2000);
   };

   const handleDone = () => {
      router.push("/dashboard/elections");
   };

   return (
      <DashboardLayout>
         <div className="flex flex-col space-y-6">
            <div>
               <h1 className="text-2xl font-bold tracking-tight">{election.name}</h1>
               <p className="text-muted-foreground">{election.description}</p>
            </div>

            {!isVoted ? (
               <>
                  <Card>
                     <CardHeader>
                        <div className="flex items-center justify-between">
                           <CardTitle>Cast Your Vote</CardTitle>
                           <div className="flex items-center space-x-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{daysRemaining} days remaining</span>
                           </div>
                        </div>
                        <CardDescription>Select one candidate from the list below</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Alert className="mb-4">
                           <Info className="h-4 w-4" />
                           <AlertTitle>Important</AlertTitle>
                           <AlertDescription>Your vote is anonymous and secure. Once submitted, you cannot change your vote.</AlertDescription>
                        </Alert>

                        <RadioGroup value={selectedCandidate || ""} onValueChange={setSelectedCandidate}>
                           <div className="space-y-4">
                              {election.candidates.map((candidate) => (
                                 <div key={candidate.id} className={`rounded-lg border p-4 ${selectedCandidate === candidate.id ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
                                    <div className="flex items-start space-x-3">
                                       <RadioGroupItem value={candidate.id} id={`candidate-${candidate.id}`} className="mt-1" />
                                       <div className="flex-1">
                                          <Label htmlFor={`candidate-${candidate.id}`} className="text-base font-medium cursor-pointer">
                                             {candidate.name}
                                          </Label>
                                          <p className="text-sm font-medium text-blue-600">{candidate.party}</p>
                                          <p className="mt-1 text-sm text-gray-500">{candidate.description}</p>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </RadioGroup>
                     </CardContent>
                     <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => router.push("/dashboard/elections")}>
                           Cancel
                        </Button>
                        <Button onClick={handleVote} disabled={!selectedCandidate || isVoting}>
                           {isVoting ? "Processing Vote..." : "Confirm Vote"}
                        </Button>
                     </CardFooter>
                  </Card>
               </>
            ) : (
               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center text-green-600">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Vote Recorded Successfully
                     </CardTitle>
                     <CardDescription>Your vote has been securely recorded on the blockchain</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <h3 className="text-sm font-medium">Your Vote ID</h3>
                        <p className="mt-1 break-all text-xs font-mono text-gray-600">{voteId}</p>
                        <p className="mt-2 text-xs text-gray-500">Save this ID to verify your vote later. It will also be available in your voting history.</p>
                     </div>

                     <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Privacy Protected</AlertTitle>
                        <AlertDescription>Your identity remains anonymous. Only you can link this vote ID to your account.</AlertDescription>
                     </Alert>
                  </CardContent>
                  <CardFooter>
                     <Button onClick={handleDone} className="w-full">
                        Done
                     </Button>
                  </CardFooter>
               </Card>
            )}
         </div>
      </DashboardLayout>
   );
}
