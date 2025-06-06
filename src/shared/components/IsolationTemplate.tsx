"use client";
import React, { useState } from "react";

type TemplateProps<T> = {
   vars: T;
   children: (vars: T, set: (newVars: Partial<T>) => void) => React.ReactNode;
};

export function IsolationTemplate<T extends object>({ vars: initialVars, children }: TemplateProps<T>) {
   const [vars, setVars] = useState<T>(initialVars);

   const set = (newVars: Partial<T>) => {
      setVars((prev) => ({ ...prev, ...newVars }));
   };

   return <>{children(vars, set)}</>;
}
