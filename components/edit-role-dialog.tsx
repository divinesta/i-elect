"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EditRoleDialogProps {
   role: { id: number; name: string; description: string } | null;
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onSave: (roleData: { name: string; description: string }) => void;
}

export function EditRoleDialog({ role, open, onOpenChange, onSave }: EditRoleDialogProps) {
   const [formData, setFormData] = useState({
      name: role?.name || "",
      description: role?.description || "",
   });

   const handleSave = () => {
      onSave(formData);
      onOpenChange(false);
   };

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Edit Role</DialogTitle>
               <DialogDescription>Make changes to the role details here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <Label htmlFor="name">Role Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} rows={3} />
               </div>
            </div>
            <DialogFooter>
               <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
               </Button>
               <Button onClick={handleSave} className="bg-[#00A9FF] hover:bg-[#0088CC] text-white">
                  Save Changes
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
