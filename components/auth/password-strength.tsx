"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
   password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
   const [strength, setStrength] = useState({
      score: 0,
      label: "",
      color: "",
   });

   useEffect(() => {
      if (!password) {
         setStrength({ score: 0, label: "", color: "" });
         return;
      }

      let score = 0;

      // Length check
      if (password.length >= 8) score++;
      if (password.length >= 12) score++;

      // Complexity checks
      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      // Determine label and color based on score
      let label = "";
      let color = "";

      if (score <= 2) {
         label = "Weak";
         color = "bg-red-500";
      } else if (score <= 4) {
         label = "Fair";
         color = "bg-yellow-500";
      } else if (score <= 5) {
         label = "Good";
         color = "bg-blue-500";
      } else {
         label = "Strong";
         color = "bg-green-500";
      }

      setStrength({ score, label, color });
   }, [password]);

   if (!password) return null;

   const strengthPercentage = Math.min((strength.score / 6) * 100, 100);

   return (
      <div className="mt-2 space-y-2">
         <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
               <div className={cn("h-2 rounded-full transition-all duration-300", strength.color)} style={{ width: `${strengthPercentage}%` }} />
            </div>
            <span
               className={cn("text-xs font-medium", {
                  "text-red-500": strength.score <= 2,
                  "text-yellow-500": strength.score > 2 && strength.score <= 4,
                  "text-blue-500": strength.score > 4 && strength.score <= 5,
                  "text-green-500": strength.score > 5,
               })}
            >
               {strength.label}
            </span>
         </div>

         <div className="text-xs text-gray-500 space-y-1">
            <div className="flex flex-wrap gap-2">
               <span className={password.length >= 8 ? "text-green-600" : "text-gray-400"}>✓ 8+ characters</span>
               <span className={/[A-Z]/.test(password) ? "text-green-600" : "text-gray-400"}>✓ Uppercase</span>
               <span className={/[a-z]/.test(password) ? "text-green-600" : "text-gray-400"}>✓ Lowercase</span>
               <span className={/[0-9]/.test(password) ? "text-green-600" : "text-gray-400"}>✓ Number</span>
               <span className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : "text-gray-400"}>✓ Special char</span>
            </div>
         </div>
      </div>
   );
}
