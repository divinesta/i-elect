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
   });

   useEffect(() => {
      if (!password) {
         setStrength({ score: 0, label: "" });
         return;
      }

      let score = 0;

      // Length check
      if (password.length >= 8) score++;

      // Complexity checks
      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      // Determine label based on score
      let label = "";
      if (score === 1) label = "Weak";
      else if (score === 2) label = "Fair";
      else if (score === 3 || score === 4) label = "Good";
      else if (score === 5) label = "Strong";

      setStrength({ score, label });
   }, [password]);

   if (!password) return null;

   return (
      <div className="mt-1 space-y-1">
         <div className="flex">
            <div
               className={cn("password-strength", {
                  "strength-weak": strength.score >= 1,
                  "strength-fair": strength.score >= 2,
                  "strength-good": strength.score >= 3,
                  "strength-strong": strength.score === 5,
               })}
            />
         </div>
         {strength.label && (
            <p
               className={cn("text-xs", {
                  "text-red-500": strength.score === 1,
                  "text-yellow-500": strength.score === 2,
                  "text-blue-500": strength.score === 3 || strength.score === 4,
                  "text-green-500": strength.score === 5,
               })}
            >
               Password strength: {strength.label}
            </p>
         )}
      </div>
   );
}
