"use client";

import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Candidate {
   id: string;
   name: string;
   course: string;
   university: string;
   image: string;
   quote: string;
}

interface VoteConfirmationModalProps {
   candidate: Candidate;
   role: string;
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
}

export function VoteConfirmationModal({ candidate, role, isOpen, onClose, onConfirm }: VoteConfirmationModalProps) {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isConfirmed, setIsConfirmed] = useState(false);

   if (!isOpen) return null;

   const handleConfirm = async () => {
      setIsSubmitting(true);
      // Simulate vote submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsConfirmed(true);

      // Auto close after showing success
      setTimeout(() => {
         onConfirm();
         onClose();
      }, 2000);
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
         <Card className="relative w-full max-w-md mx-4 z-10">
            {!isConfirmed ? (
               <>
                  <CardHeader className="pb-4">
                     <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Confirm Your Vote</CardTitle>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                           <X className="h-5 w-5" />
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                           <img src={candidate.image || "/placeholder.svg"} alt={candidate.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-blue-600">{candidate.course}</p>
                        <p className="text-sm text-gray-500">{candidate.university}</p>
                     </div>

                     <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-2">
                           <strong>Position:</strong> {role}
                        </p>
                        <p className="text-sm text-gray-600">
                           <strong>Your choice:</strong> {candidate.name}
                        </p>
                     </div>

                     <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-amber-800">
                           <strong>Important:</strong> Once confirmed, your vote cannot be changed. Please review your selection carefully.
                        </p>
                     </div>

                     <div className="flex space-x-3">
                        <Button variant="outline" className="flex-1" onClick={onClose}>
                           Change Selection
                        </Button>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleConfirm} disabled={isSubmitting}>
                           {isSubmitting ? "Submitting..." : "Confirm Vote"}
                        </Button>
                     </div>
                  </CardContent>
               </>
            ) : (
               <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                     <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Vote Confirmed!</h3>
                  <p className="text-gray-600 mb-4">
                     Your vote for <strong>{candidate.name}</strong> as {role} has been successfully recorded.
                  </p>
                  <p className="text-sm text-gray-500">Thank you for participating in the election.</p>
               </CardContent>
            )}
         </Card>
      </div>
   );
}
