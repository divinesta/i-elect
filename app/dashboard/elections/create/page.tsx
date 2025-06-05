"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";

interface VoterField {
   name: string;
   type: string;
   required: boolean;
}

interface Admin {
   name: string;
   email: string;
   pin: string;
}

export default function CreateElectionPage() {
   const router = useRouter();
   const [isSubmitting, setIsSubmitting] = useState(false);

   const [voterFields, setVoterFields] = useState<VoterField[]>([
      { name: "Email Address", type: "email", required: true },
      { name: "Full Name", type: "text", required: true },
   ]);

   const [admins, setAdmins] = useState<Admin[]>([]);

   const addVoterField = () => {
      setVoterFields([...voterFields, { name: "", type: "text", required: false }]);
   };
   const removeVoterField = (index: number): void => {
      setVoterFields(voterFields.filter((_, i) => i !== index));
   };

   const updateVoterField = (index: number, field: keyof VoterField, value: string | boolean): void => {
      const updatedVoterFields = [...voterFields];
      const voterFieldToUpdate = updatedVoterFields[index];

      if (voterFieldToUpdate) {
        if (field === 'required') {
          if (typeof value === 'boolean') {
            voterFieldToUpdate.required = value;
          }
        } else { // field is 'name' or 'type'
          if (typeof value === 'string') {
            // TypeScript knows 'field' here is 'name' | 'type',
            // and voterFieldToUpdate[field] will be 'string'.
            voterFieldToUpdate[field] = value;
          }
        }
      }
      setVoterFields(updatedVoterFields);
   };

   const addAdmin = (): void => {
      setAdmins([...admins, { name: "", email: "", pin: "" }]);
   };

   const removeAdmin = (index: number): void => {
      setAdmins(admins.filter((_, i) => i !== index));
   };

   const updateAdmin = (index: number, field: keyof Admin, value: string): void => {
      const updatedAdmins = admins.map((admin, i) =>
        i === index ? { ...admin, [field]: value } : admin
      );
      setAdmins(updatedAdmins);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to elections page
      router.push("/dashboard/elections");
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
               <Link href="/dashboard/elections">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Elections
               </Link>
            </Button>
            <div>
               <h1 className="text-3xl font-bold text-gray-900">Create New Election</h1>
               <p className="text-gray-600">Set up a new election for your organization</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <Card>
               <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details for your election</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="electionName">Election Name</Label>
                        <Input id="electionName" placeholder="e.g., Student Council Election 2024" required />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="organization">Organization</Label>
                        <Input id="organization" placeholder="e.g., University Student Association" required />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="description">Description</Label>
                     <Textarea id="description" placeholder="Provide a brief description of the election purpose and goals" rows={3} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="datetime-local" required />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input id="endDate" type="datetime-local" required />
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Voter Accreditation Fields Section */}
            <Card>
               <CardHeader>
                  <CardTitle>Voter Accreditation Requirements</CardTitle>
                  <CardDescription>Define what information voters need to provide to participate</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="space-y-4">
                     {voterFields.map((field, index) => (
                        <div key={index} className="flex items-end space-x-4 p-4 border rounded-lg">
                           <div className="flex-1 space-y-2">
                              <Label>Field Name</Label>
                              <Input placeholder="e.g., Matric Number, Registration Number" value={field.name} onChange={(e) => updateVoterField(index, "name", e.target.value)} />
                           </div>
                           <div className="w-32 space-y-2">
                              <Label>Type</Label>
                              <Select value={field.type} onValueChange={(value) => updateVoterField(index, "type", value)}>
                                 <SelectTrigger>
                                    <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="select">Dropdown</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                           <div className="flex items-center space-x-2">
                              <input type="checkbox" checked={field.required} onChange={(e) => updateVoterField(index, "required", e.target.checked)} className="rounded" />
                              <Label className="text-sm">Required</Label>
                           </div>
                           <Button type="button" variant="outline" size="sm" onClick={() => removeVoterField(index)}>
                              <X className="h-4 w-4" />
                           </Button>
                        </div>
                     ))}
                  </div>
                  <Button type="button" variant="outline" onClick={addVoterField}>
                     <Plus className="h-4 w-4 mr-2" />
                     Add Field
                  </Button>
               </CardContent>
            </Card>

            {/* Admin Management Section */}
            <Card>
               <CardHeader>
                  <CardTitle>Admin & Collaborators</CardTitle>
                  <CardDescription>Add people who can help manage this election</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="space-y-4">
                     {admins.map((admin, index) => (
                        <div key={index} className="flex items-end space-x-4 p-4 border rounded-lg">
                           <div className="flex-1 space-y-2">
                              <Label>Name</Label>
                              <Input placeholder="Admin name" value={admin.name} onChange={(e) => updateAdmin(index, "name", e.target.value)} />
                           </div>
                           <div className="flex-1 space-y-2">
                              <Label>Email</Label>
                              <Input type="email" placeholder="admin@example.com" value={admin.email} onChange={(e) => updateAdmin(index, "email", e.target.value)} />
                           </div>
                           <div className="w-32 space-y-2">
                              <Label>PIN</Label>
                              <Input placeholder="4-digit PIN" maxLength={4} value={admin.pin} onChange={(e) => updateAdmin(index, "pin", e.target.value)} />
                           </div>
                           <Button type="button" variant="outline" size="sm" onClick={() => removeAdmin(index)}>
                              <X className="h-4 w-4" />
                           </Button>
                        </div>
                     ))}
                  </div>
                  <Button type="button" variant="outline" onClick={addAdmin}>
                     <Plus className="h-4 w-4 mr-2" />
                     Add Admin
                  </Button>
               </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
               <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/elections">Cancel</Link>
               </Button>
               <Button type="submit" className="bg-[#00A9FF] hover:bg-[#0088CC] text-white" disabled={isSubmitting}>
                  {isSubmitting ? (
                     <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                     </>
                  ) : (
                     "Create Election"
                  )}
               </Button>
            </div>
         </form>
      </div>
   );
}
