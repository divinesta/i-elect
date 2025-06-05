"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AccreditationPage() {
   const router = useRouter();

   const [formData, setFormData] = useState({});
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

   // Mock election data - in real app, this would be fetched
   const election = {
      id: 1,
      name: "Student Council Election 2024",
      organization: "Tech University",
      description: "Annual student council election for academic year 2024-2025",
      accreditationFields: [
         { name: "Full Name", type: "text", required: true },
         { name: "Email Address", type: "email", required: true },
         { name: "Matric Number", type: "text", required: true },
         { name: "Registration Number", type: "text", required: true },
         {
            name: "Year of Study",
            type: "select",
            required: true,
            options: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"],
         },
         {
            name: "Department",
            type: "select",
            required: true,
            options: ["Computer Science", "Engineering", "Business", "Arts", "Medicine"],
         },
         { name: "Phone Number", type: "text", required: false },
      ],
   };

   const handleInputChange = (fieldName: string, value: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Validate required fields
      const missingFields = election.accreditationFields
         .filter((field) => field.required && !formData[field.name as keyof typeof formData])
         .map((field) => field.name);

      if (missingFields.length > 0) {
         setSubmitStatus("error");
         setIsSubmitting(false);
         return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setIsSubmitting(false);

      // Redirect after success
      setTimeout(() => {
         router.push("/elections");
      }, 3000);
   };

   if (submitStatus === "success") {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <Card className="w-full max-w-md text-center">
               <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Accreditation Submitted!</h2>
                  <p className="text-gray-600 mb-6">Your accreditation request has been submitted successfully. You will receive an email notification once it&apos;s approved.</p>
                  <Button className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white" asChild>
                     <Link href="/elections">Back to Elections</Link>
                  </Button>
               </CardContent>
            </Card>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
               <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/elections">
                     <ArrowLeft className="h-4 w-4 mr-2" />
                     Back to Elections
                  </Link>
               </Button>
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">Get Accredited</h1>
                  <p className="text-gray-600">Fill in the required information to participate in this election</p>
               </div>
            </div>

            {/* Election Info */}
            <Card>
               <CardHeader>
                  <CardTitle>{election.name}</CardTitle>
                  <CardDescription>
                     <span className="font-medium text-[#00A9FF]">{election.organization}</span>
                     <br />
                     {election.description}
                  </CardDescription>
               </CardHeader>
            </Card>

            {/* Accreditation Form */}
            <Card>
               <CardHeader>
                  <CardTitle>Voter Information</CardTitle>
                  <CardDescription>Please provide the following information to verify your eligibility to vote</CardDescription>
               </CardHeader>
               <CardContent>
                  {submitStatus === "error" && (
                     <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-800">Please fill in all required fields</span>
                     </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {election.accreditationFields.map((field, index) => (
                           <div key={index} className={field.type === "text" && field.name.includes("Address") ? "md:col-span-2" : ""}>
                              <Label htmlFor={field.name}>
                                 {field.name}
                                 {field.required && <span className="text-red-500 ml-1">*</span>}
                              </Label>
                              {field.type === "select" ? (
                                 <Select value={formData[field.name as keyof typeof formData] || ""} onValueChange={(value) => handleInputChange(field.name, value)}>
                                    <SelectTrigger className="mt-2">
                                       <SelectValue placeholder={`Select ${field.name.toLowerCase()}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {field.options?.map((option, optionIndex) => (
                                          <SelectItem key={optionIndex} value={option}>
                                             {option}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              ) : (
                                 <Input
                                    id={field.name}
                                    type={field.type}
                                    placeholder={`Enter your ${field.name.toLowerCase()}`}
                                    value={formData[field.name as keyof typeof formData] || ""}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                    required={field.required}
                                    className="mt-2"
                                 />
                              )}
                           </div>
                        ))}
                     </div>

                     <div className="pt-6 border-t">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                           <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                           <ul className="text-sm text-blue-800 space-y-1">
                              <li>• Your information will be reviewed by election administrators</li>
                              <li>• You&apos;ll receive an email notification once approved</li>
                              <li>• Approved voters can participate when the election starts</li>
                           </ul>
                        </div>

                        <Button type="submit" className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white h-12" disabled={isSubmitting}>
                           {isSubmitting ? (
                              <>
                                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                 Submitting...
                              </>
                           ) : (
                              "Submit Accreditation Request"
                           )}
                        </Button>
                     </div>
                  </form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
