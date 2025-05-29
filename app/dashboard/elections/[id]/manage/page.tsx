"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, X, BarChart3, PieChart, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { EditRoleDialog } from "@/components/edit-role-dialog";

export default function ManageElectionPage() {
   const params = useParams();
   const electionId = params.id;

   const [election, setElection] = useState({
      name: "Student Council Election 2024",
      description: "Annual student council election for academic year 2024-2025",
      startDate: "2024-02-01",
      endDate: "2024-02-07",
      status: "Draft",
   });

   const [roles, setRoles] = useState([
      { id: 1, name: "President", description: "Lead the student council", candidateCount: 3 },
      { id: 2, name: "Vice President", description: "Assist the president", candidateCount: 2 },
   ]);

   const [candidates, setCandidates] = useState([
      {
         id: 1,
         roleId: 1,
         name: "Alice Johnson",
         course: "Computer Science",
         university: "Tech University",
         quote: "Leading with innovation and integrity",
         photo: "/placeholder.svg?height=200&width=200&text=Alice",
      },
      {
         id: 2,
         roleId: 1,
         name: "Bob Smith",
         course: "Business Administration",
         university: "Tech University",
         quote: "Building bridges, creating opportunities",
         photo: "/placeholder.svg?height=200&width=200&text=Bob",
      },
   ]);

   const [voters, setVoters] = useState([
      { id: 1, email: "student1@university.edu", walletAddress: "0x1234...5678", status: "Verified" },
      { id: 2, email: "student2@university.edu", walletAddress: "", status: "Pending" },
   ]);

   const [newRole, setNewRole] = useState({ name: "", description: "" });
   const [newCandidate, setNewCandidate] = useState({
      roleId: "",
      name: "",
      course: "",
      university: "",
      quote: "",
      photo: "",
   });
   const [newVoter, setNewVoter] = useState({ email: "", walletAddress: "" });

   const [editingRole, setEditingRole] = useState<{ id: number; name: string; description: string } | null>(null);
   const [showEditDialog, setShowEditDialog] = useState(false);

   const handleEditRole = (roleId: number) => {
      const role = roles.find((r) => r.id === roleId);
      if (role) {
         setEditingRole(role);
         setShowEditDialog(true);
      }
   };

   const handleDeleteRole = (roleId: number) => {
      if (confirm("Are you sure you want to delete this role? This will also remove all candidates for this role.")) {
         setRoles(roles.filter((r) => r.id !== roleId));
         setCandidates(candidates.filter((c) => c.roleId !== roleId));
      }
   };

   const handleDeleteCandidate = (candidateId: number) => {
      if (confirm("Are you sure you want to remove this candidate?")) {
         setCandidates(candidates.filter((c) => c.id !== candidateId));
      }
   };

   const handleDeleteVoter = (voterId: number) => {
      if (confirm("Are you sure you want to remove this voter?")) {
         setVoters(voters.filter((v) => v.id !== voterId));
      }
   };

   const handleAddRole = () => {
      if (newRole.name.trim()) {
         setRoles([...roles, { id: Date.now(), ...newRole, candidateCount: 0 }]);
         setNewRole({ name: "", description: "" });
      }
   };

   const handleAddCandidate = () => {
      if (newCandidate.name.trim() && newCandidate.roleId) {
         setCandidates([
            ...candidates,
            {
               id: Date.now(),
               roleId: Number(newCandidate.roleId),
               name: newCandidate.name,
               course: newCandidate.course,
               university: newCandidate.university,
               quote: newCandidate.quote,
               photo: newCandidate.photo,
            },
         ]);
         setNewCandidate({ roleId: "", name: "", course: "", university: "", quote: "", photo: "" });
      }
   };

   const handleAddVoter = () => {
      if (newVoter.email.trim()) {
         setVoters([...voters, { id: Date.now(), ...newVoter, status: "Pending" }]);
         setNewVoter({ email: "", walletAddress: "" });
      }
   };

   const handlePublishElection = () => {
      setElection((prev) => ({ ...prev, status: "Active" }));
   };

   const handleSaveEditedRole = (roleData: { name: string; description: string }) => {
      if (editingRole) {
         setRoles(roles.map((role) => (role.id === editingRole.id ? { ...role, ...roleData } : role)));
         setEditingRole(null);
      }
   };

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold text-gray-900">Manage Election</h1>
               <p className="text-gray-600">Configure your election settings and candidates</p>
            </div>
            <div className="flex space-x-2">
               <Badge className={election.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{election.status}</Badge>
               <Button onClick={handlePublishElection} disabled={election.status === "Active"} className="bg-[#00A9FF] hover:bg-[#0088CC] text-white">
                  {election.status === "Active" ? "Published" : "Publish Election"}
               </Button>
            </div>
         </div>

         <Tabs defaultValue="basic-info" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
               <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
               <TabsTrigger value="roles">Roles</TabsTrigger>
               <TabsTrigger value="candidates">Candidates</TabsTrigger>
               <TabsTrigger value="voters">Voters</TabsTrigger>
               <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <TabsContent value="basic-info">
               <Card>
                  <CardHeader>
                     <CardTitle>Election Details</CardTitle>
                     <CardDescription>Configure the basic information for your election</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="electionName">Election Name</Label>
                           <Input id="electionName" value={election.name} onChange={(e) => setElection((prev) => ({ ...prev, name: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="status">Status</Label>
                           <Select value={election.status} onValueChange={(value) => setElection((prev) => ({ ...prev, status: value }))}>
                              <SelectTrigger>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="Draft">Draft</SelectItem>
                                 <SelectItem value="Active">Active</SelectItem>
                                 <SelectItem value="Completed">Completed</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={election.description} onChange={(e) => setElection((prev) => ({ ...prev, description: e.target.value }))} rows={3} />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="startDate">Start Date</Label>
                           <Input id="startDate" type="datetime-local" value={election.startDate} onChange={(e) => setElection((prev) => ({ ...prev, startDate: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="endDate">End Date</Label>
                           <Input id="endDate" type="datetime-local" value={election.endDate} onChange={(e) => setElection((prev) => ({ ...prev, endDate: e.target.value }))} />
                        </div>
                     </div>

                     <Button className="bg-[#00A9FF] hover:bg-[#0088CC] text-white">Save Changes</Button>
                  </CardContent>
               </Card>
            </TabsContent>

            {/* Roles */}
            <TabsContent value="roles">
               <div className="space-y-6">
                  <Card>
                     <CardHeader>
                        <CardTitle>Add New Role</CardTitle>
                        <CardDescription>Create positions that candidates can run for</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="roleName">Role Name</Label>
                              <Input id="roleName" placeholder="e.g., President, Secretary" value={newRole.name} onChange={(e) => setNewRole((prev) => ({ ...prev, name: e.target.value }))} />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="roleDescription">Description</Label>
                              <Input
                                 id="roleDescription"
                                 placeholder="Brief description of the role"
                                 value={newRole.description}
                                 onChange={(e) => setNewRole((prev) => ({ ...prev, description: e.target.value }))}
                              />
                           </div>
                        </div>
                        <Button onClick={handleAddRole} className="mt-4 bg-[#00A9FF] hover:bg-[#0088CC] text-white">
                           <Plus className="h-4 w-4 mr-2" />
                           Add Role
                        </Button>
                     </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {roles.map((role) => (
                        <Card key={role.id}>
                           <CardHeader>
                              <CardTitle className="text-lg">{role.name}</CardTitle>
                              <CardDescription>{role.description}</CardDescription>
                           </CardHeader>
                           <CardContent>
                              <div className="flex items-center justify-between">
                                 <span className="text-sm text-gray-600">{role.candidateCount} candidates</span>
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                       <Button variant="outline" size="sm">
                                          <Settings className="h-4 w-4" />
                                       </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                       <DropdownMenuItem onClick={() => handleEditRole(role.id)}>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit Role
                                       </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => handleDeleteRole(role.id)} className="text-red-600">
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete Role
                                       </DropdownMenuItem>
                                    </DropdownMenuContent>
                                 </DropdownMenu>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </div>
            </TabsContent>

            {/* Candidates */}
            <TabsContent value="candidates">
               <div className="space-y-6">
                  <Card>
                     <CardHeader>
                        <CardTitle>Add New Candidate</CardTitle>
                        <CardDescription>Add candidates for the election roles</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-4">
                              <div className="space-y-2">
                                 <Label htmlFor="candidateRole">Role</Label>
                                 <Select value={newCandidate.roleId} onValueChange={(value) => setNewCandidate((prev) => ({ ...prev, roleId: value }))}>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {roles.map((role) => (
                                          <SelectItem key={role.id} value={role.id.toString()}>
                                             {role.name}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="candidateName">Full Name</Label>
                                 <Input id="candidateName" value={newCandidate.name} onChange={(e) => setNewCandidate((prev) => ({ ...prev, name: e.target.value }))} />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="candidateCourse">Course</Label>
                                 <Input id="candidateCourse" value={newCandidate.course} onChange={(e) => setNewCandidate((prev) => ({ ...prev, course: e.target.value }))} />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="candidateUniversity">University</Label>
                                 <Input id="candidateUniversity" value={newCandidate.university} onChange={(e) => setNewCandidate((prev) => ({ ...prev, university: e.target.value }))} />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="candidateQuote">Campaign Quote</Label>
                                 <Textarea id="candidateQuote" value={newCandidate.quote} onChange={(e) => setNewCandidate((prev) => ({ ...prev, quote: e.target.value }))} rows={3} />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="candidatePhoto">Photo (Max 2MB, JPG/PNG)</Label>
                                 <div className="flex items-center space-x-2">
                                    <Input id="candidatePhoto" type="file" accept="image/jpeg,image/png" />
                                    <Button variant="outline" size="sm">
                                       <Upload className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </div>

                              <Button onClick={handleAddCandidate} className="w-full bg-[#00A9FF] hover:bg-[#0088CC] text-white">
                                 <Plus className="h-4 w-4 mr-2" />
                                 Add Candidate
                              </Button>
                           </div>

                           {/* Preview Card */}
                           <div className="space-y-2">
                              <Label>Preview</Label>
                              <Card className="border-2 border-dashed border-gray-300">
                                 <CardContent className="p-4">
                                    <div className="text-center space-y-3">
                                       <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                                          <Upload className="h-8 w-8 text-gray-400" />
                                       </div>
                                       <div>
                                          <h3 className="font-semibold">{newCandidate.name || "Candidate Name"}</h3>
                                          <p className="text-sm text-gray-600">{newCandidate.course || "Course"}</p>
                                          <p className="text-xs text-gray-500">{newCandidate.university || "University"}</p>
                                       </div>
                                       <p className="text-sm italic text-gray-700">"{newCandidate.quote || "Campaign quote will appear here"}"</p>
                                    </div>
                                 </CardContent>
                              </Card>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {candidates.map((candidate) => (
                        <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                           <CardContent className="p-4">
                              <div className="text-center space-y-3">
                                 <img src={candidate.photo || "/placeholder.svg"} alt={candidate.name} className="w-20 h-20 rounded-full mx-auto object-cover" />
                                 <div>
                                    <h3 className="font-semibold">{candidate.name}</h3>
                                    <p className="text-sm text-gray-600">{candidate.course}</p>
                                    <p className="text-xs text-gray-500">{candidate.university}</p>
                                    <Badge variant="outline" className="mt-1">
                                       {roles.find((r) => r.id.toString() === candidate.roleId.toString())?.name}
                                    </Badge>
                                 </div>
                                 <p className="text-sm italic text-gray-700">"{candidate.quote}"</p>
                                 <Button variant="outline" size="sm" onClick={() => handleDeleteCandidate(candidate.id)}>
                                    <X className="h-4 w-4" />
                                 </Button>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </div>
            </TabsContent>

            {/* Voters */}
            <TabsContent value="voters">
               <div className="space-y-6">
                  <Card>
                     <CardHeader>
                        <CardTitle>Add Voters</CardTitle>
                        <CardDescription>Accredit users to vote in this election</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="voterEmail">Email Address</Label>
                              <Input
                                 id="voterEmail"
                                 type="email"
                                 placeholder="voter@university.edu"
                                 value={newVoter.email}
                                 onChange={(e) => setNewVoter((prev) => ({ ...prev, email: e.target.value }))}
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="voterWallet">Wallet Address (Optional)</Label>
                              <Input id="voterWallet" placeholder="0x..." value={newVoter.walletAddress} onChange={(e) => setNewVoter((prev) => ({ ...prev, walletAddress: e.target.value }))} />
                           </div>
                        </div>
                        <Button onClick={handleAddVoter} className="mt-4 bg-[#00A9FF] hover:bg-[#0088CC] text-white">
                           <Plus className="h-4 w-4 mr-2" />
                           Add Voter
                        </Button>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>Accredited Voters ({voters.length})</CardTitle>
                        <CardDescription>Users who can vote in this election</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-3">
                           {voters.map((voter) => (
                              <div key={voter.id} className="flex items-center justify-between p-3 border rounded-lg">
                                 <div>
                                    <p className="font-medium">{voter.email}</p>
                                    {voter.walletAddress && <p className="text-sm text-gray-600">{voter.walletAddress}</p>}
                                 </div>
                                 <div className="flex items-center space-x-2">
                                    <Badge className={voter.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{voter.status}</Badge>
                                    <Button variant="outline" size="sm" onClick={() => handleDeleteVoter(voter.id)}>
                                       <X className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <BarChart3 className="h-5 w-5" />
                           <span>Voter Participation</span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <span>Total Voters</span>
                              <span className="font-bold">{voters.length}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span>Votes Cast</span>
                              <span className="font-bold">0</span>
                           </div>
                           <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#00A9FF] h-2 rounded-full" style={{ width: "0%" }}></div>
                           </div>
                           <p className="text-sm text-gray-600">0% participation rate</p>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <PieChart className="h-5 w-5" />
                           <span>Candidates by Role</span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-3">
                           {roles.map((role) => (
                              <div key={role.id} className="flex justify-between items-center">
                                 <span>{role.name}</span>
                                 <Badge variant="outline">{candidates.filter((c) => c.roleId.toString() === role.id.toString()).length} candidates</Badge>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>
         </Tabs>
         <EditRoleDialog role={editingRole} open={showEditDialog} onOpenChange={setShowEditDialog} onSave={handleSaveEditedRole} />
      </div>
   );
}
