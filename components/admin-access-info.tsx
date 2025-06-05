"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Users } from "lucide-react";
import Link from "next/link";

interface AdminAccessInfoProps {
   electionId: string | number;
   electionName: string;
   organization: string;
}

export function AdminAccessInfo({ electionId, electionName, organization }: AdminAccessInfoProps) {
   return (
      <Card className="border-2 border-blue-200 bg-blue-50">
         <CardHeader>
            <CardTitle className="flex items-center space-x-2">
               <Lock className="h-5 w-5 text-blue-600" />
               <span>Admin Access Available</span>
            </CardTitle>
            <CardDescription>You can access the admin panel for this election if you have the admin PIN</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <h4 className="font-medium text-blue-900 mb-2">Election Details</h4>
                  <p className="text-sm text-blue-800">{electionName}</p>
                  <p className="text-xs text-blue-600">{organization}</p>
               </div>
               <div>
                  <h4 className="font-medium text-blue-900 mb-2">Admin Features</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                     <li>• Review voter accreditations</li>
                     <li>• Approve/reject applications</li>
                     <li>• Send email notifications</li>
                     <li>• Monitor election progress</li>
                  </ul>
               </div>
            </div>

            <div className="flex space-x-3">
               <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href={`/elections/${electionId}/admin`}>
                     <Lock className="h-4 w-4 mr-2" />
                     Admin Login
                  </Link>
               </Button>
               <Button variant="outline" asChild>
                  <Link href={`/elections/${electionId}/accredit`}>
                     <Users className="h-4 w-4 mr-2" />
                     Get Accredited Instead
                  </Link>
               </Button>
            </div>

            <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
               <p className="text-xs text-blue-700">
                  <strong>Note:</strong> Admin access requires a 4-digit PIN provided by the election creator. If you don&apos;t have admin access, you can still participate as a voter by getting
                  accredited.
               </p>
            </div>
         </CardContent>
      </Card>
   );
}
