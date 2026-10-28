"use client";

import dynamic from "next/dynamic";

// Browser-only model loading belongs in a client boundary on Next 15. The
// original imports and ssr:false behavior are preserved; only ownership moves.
export const HatModel = dynamic(() => import("./Hat"), { ssr: false });
export const StaffModel = dynamic(() => import("./Staff"), { ssr: false });
export const WizardModel = dynamic(() => import("./Wizard"), { ssr: false });
