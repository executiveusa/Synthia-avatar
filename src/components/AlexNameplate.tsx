"use client";
import { motion } from "framer-motion";
import React from "react";
import { useTranslations } from "next-intl";
import { useAvatarContext } from "@/context/AvatarContext";

const AgentAlexLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 2 L32 10 L32 26 L18 34 L4 26 L4 10 Z"
      stroke="#FFD700"
      strokeWidth="1.5"
      fill="rgba(255,215,0,0.08)"
    />
    <text
      x="18"
      y="23"
      textAnchor="middle"
      fontSize="14"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
      fill="#FFD700"
    >
      A
    </text>
  </svg>
);

function AlexNameplate() {
  const t = useTranslations("Nameplate");
  const { triggerNoReaction, triggerYesReaction } = useAvatarContext();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 1.2 }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-auto select-none"
    >
      <div
        className="flex flex-col items-center justify-center gap-1 cursor-pointer"
        onClick={() => {
          const isYes = Math.random() > 0.5;
          if (isYes) {
            triggerYesReaction();
          } else {
            triggerNoReaction();
          }
        }}
      >
        <AgentAlexLogo />
        <span
          className="text-sm font-bold tracking-wider uppercase"
          style={{ color: "#FFD700", fontFamily: "Arial, sans-serif" }}
        >
          Agent ALEX
        </span>
      </div>
    </motion.div>
  );
}

export default AlexNameplate;
