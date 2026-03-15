"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { AvatarOutfit, AvatarBackground, AvatarVoice } from "@/types";

interface AvatarContextType {
  isReacting: boolean;
  triggerNoReaction: () => void;
  showInviteModal: boolean;
  openInviteModal: () => void;
  closeInviteModal: () => void;
  currentTrack: string;
  setCurrentTrack: (path: string) => void;
  // Wardrobe
  currentOutfit: AvatarOutfit;
  setCurrentOutfit: (o: AvatarOutfit) => void;
  currentBackground: AvatarBackground;
  setCurrentBackground: (b: AvatarBackground) => void;
  currentVoice: AvatarVoice;
  setCurrentVoice: (v: AvatarVoice) => void;
  // Lip sync
  isSpeaking: boolean;
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

const AvatarContext = createContext<AvatarContextType | null>(null);

export function AvatarProvider({ children }: { children: React.ReactNode }) {
  const [isReacting, setIsReacting] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(
    "/audio/birds39-forest-20772.mp3"
  );
  const [currentOutfit, setCurrentOutfit] = useState<AvatarOutfit>("wizard");
  const [currentBackground, setCurrentBackground] = useState<AvatarBackground>("forest");
  const [currentVoice, setCurrentVoice] = useState<AvatarVoice>("es-MX-female");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const reactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // FIX: clear reactionTimer on unmount to prevent state updates after unmount
  useEffect(() => {
    return () => {
      if (reactionTimer.current) clearTimeout(reactionTimer.current);
    };
  }, []);

  const triggerNoReaction = useCallback(() => {
    setIsReacting(true);
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
    reactionTimer.current = setTimeout(() => {
      setIsReacting(false);
    }, 1600);
  }, []);

  const openInviteModal  = useCallback(() => setShowInviteModal(true), []);
  const closeInviteModal = useCallback(() => setShowInviteModal(false), []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      const langMap: Record<AvatarVoice, string> = {
        "es-MX-female": "es-MX",
        "es-MX-male":   "es-MX",
        "en-US-female": "en-US",
        "en-US-male":   "en-US",
      };
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find((v) => v.lang.startsWith(langMap[currentVoice]));
      if (match) utt.voice = match;
      utt.onstart = () => setIsSpeaking(true);
      utt.onend   = () => setIsSpeaking(false);
      utt.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utt);
    },
    [currentVoice]
  );

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  return (
    <AvatarContext.Provider
      value={{
        isReacting,
        triggerNoReaction,
        showInviteModal,
        openInviteModal,
        closeInviteModal,
        currentTrack,
        setCurrentTrack,
        currentOutfit,
        setCurrentOutfit,
        currentBackground,
        setCurrentBackground,
        currentVoice,
        setCurrentVoice,
        isSpeaking,
        speak,
        stopSpeaking,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatarContext() {
  const ctx = useContext(AvatarContext);
  if (!ctx) throw new Error("useAvatarContext must be used inside AvatarProvider");
  return ctx;
}

export default AvatarContext;
