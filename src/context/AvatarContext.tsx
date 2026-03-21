"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface AvatarContextType {
  isReacting: boolean;
  triggerNoReaction: () => void;
  showInviteModal: boolean;
  openInviteModal: () => void;
  closeInviteModal: () => void;
  currentTrack: string;
  setCurrentTrack: (path: string) => void;
}

const AvatarContext = createContext<AvatarContextType | null>(null);

export function AvatarProvider({ children }: { children: React.ReactNode }) {
  const [isReacting, setIsReacting] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(
    "/audio/birds39-forest-20772.mp3"
  );
  const reactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerNoReaction = useCallback(() => {
    setIsReacting(true);
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
    reactionTimer.current = setTimeout(() => {
      setIsReacting(false);
    }, 1600);
  }, []);

  const openInviteModal = useCallback(() => setShowInviteModal(true), []);
  const closeInviteModal = useCallback(() => setShowInviteModal(false), []);

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
