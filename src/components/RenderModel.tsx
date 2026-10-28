"use client";
import dynamic from "next/dynamic";
import React from "react";

interface RenderModelProps {
  children: React.ReactNode;
  className?: string;
}

// R3F 8 uses the React 18 reconciler. Next's server rendering must not execute
// this browser-only Canvas module; browser React and every scene prop stay intact.
const CanvasScene = dynamic(() => import("./CanvasScene"), { ssr: false });

function RenderModel(props: RenderModelProps) {
  return <CanvasScene {...props} />;
}

export default RenderModel;
