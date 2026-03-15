"use client";
import { useState } from "react";
import { useAvatarContext } from "@/context/AvatarContext";
import { OUTFITS, BACKGROUNDS, VOICES, ASSET_SOURCES, type AvatarOutfit, type AvatarBackground, type AvatarVoice } from "@/types";
import { Lock } from "lucide-react";

/**
 * SECURITY NOTE: This dashboard uses a client-side code check for demo purposes only.
 * For real auth, use Next.js middleware + server-side session (e.g. NextAuth or Clerk).
 * The code itself should come from process.env.NEXT_PUBLIC_DASHBOARD_CODE
 * set in your .env.local or master.env — never hardcoded here.
 */
const DASHBOARD_CODE = process.env.NEXT_PUBLIC_DASHBOARD_CODE ?? "kupuri2026";

const tracks = [
  { label: "Bosque (predeterminado)", path: "/audio/birds39-forest-20772.mp3" },
  { label: "Pista 2 (próximamente)",  path: "/audio/track2.mp3" },
  { label: "Pista 3 (próximamente)",  path: "/audio/track3.mp3" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-foreground font-semibold tracking-wide text-sm uppercase">
      {children}
    </h2>
  );
}

function Dashboard() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput]       = useState("");
  const [error, setError]       = useState(false);
  const [speakInput, setSpeakInput] = useState("");
  const [activeTab, setActiveTab]   = useState<"wardrobe" | "voice" | "music" | "sources">("wardrobe");

  const {
    currentTrack, setCurrentTrack,
    currentOutfit, setCurrentOutfit,
    currentBackground, setCurrentBackground,
    currentVoice, setCurrentVoice,
    speak, stopSpeaking, isSpeaking,
  } = useAvatarContext();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === DASHBOARD_CODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="custom-bg rounded-lg p-8 max-w-sm w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-accent text-2xl font-bold tracking-widest">DASHBOARD</h1>
            <p className="text-muted text-sm">Ingresa tu código de acceso</p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Código secreto"
              className="w-full bg-background/30 border border-accent/30 rounded px-4 py-2.5 text-foreground text-sm placeholder-muted focus:outline-none focus:border-accent/70"
            />
            {error && <p className="text-red-400 text-xs text-center">Código incorrecto.</p>}
            <button
              type="submit"
              className="w-full py-2.5 border border-accent/40 rounded text-accent text-sm font-medium hover:shadow-glass-sm transition-all"
            >
              Entrar
            </button>
          </form>
          <p className="text-muted text-[10px] text-center">© 2026 Kupuri Media · Ivette Milo</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-start p-6 space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="w-full flex items-center justify-between border-b border-accent/20 pb-4">
        <h1 className="text-accent text-2xl font-bold tracking-widest">DASHBOARD</h1>
        <button
          onClick={() => setUnlocked(false)}
          className="text-muted text-xs hover:text-accent transition-colors"
        >
          Salir
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["wardrobe", "voice", "music", "sources"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1.5 rounded text-xs font-medium border transition-all ${
              activeTab === t
                ? "border-accent/70 text-accent shadow-glass-sm"
                : "border-accent/20 text-muted hover:border-accent/40"
            }`}
          >
            {t === "wardrobe" ? "👗 Outfits & Backgrounds"
              : t === "voice" ? "🎙 Voice & Lip Sync"
              : t === "music" ? "🎵 Music"
              : "🌐 3D Asset Sources"}
          </button>
        ))}
      </div>

      {/* ── Wardrobe Tab ──────────────────────────────────────────── */}
      {activeTab === "wardrobe" && (
        <>
          <section className="custom-bg rounded-lg p-6 w-full space-y-4">
            <SectionTitle>Outfits</SectionTitle>
            <p className="text-muted text-xs">
              Swaps material colors on the live 3D model instantly. Locked outfits are client upsells.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {OUTFITS.map((outfit) => (
                <button
                  key={outfit.id}
                  onClick={() => !outfit.locked && setCurrentOutfit(outfit.id as AvatarOutfit)}
                  className={`relative px-3 py-3 rounded border text-sm transition-all text-left ${
                    currentOutfit === outfit.id
                      ? "border-accent/70 text-accent shadow-glass-sm"
                      : outfit.locked
                      ? "border-accent/10 text-muted cursor-not-allowed opacity-60"
                      : "border-accent/20 text-muted hover:border-accent/40"
                  }`}
                >
                  <span className="text-xl block mb-1">{outfit.previewEmoji}</span>
                  <span className="block font-medium text-xs">{outfit.label}</span>
                  <span className="block text-[10px] text-muted/60">{outfit.labelEs}</span>
                  {outfit.locked && (
                    <span className="absolute top-2 right-2 text-accent/40">
                      <Lock size={10} />
                    </span>
                  )}
                  {outfit.price && (
                    <span className="block text-[10px] text-accent/60 mt-1">
                      ${(outfit.price / 100).toFixed(0)} USD
                    </span>
                  )}
                  {currentOutfit === outfit.id && (
                    <span className="text-[10px] tracking-wider text-accent ml-0">◆ ACTIVO</span>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="custom-bg rounded-lg p-6 w-full space-y-4">
            <SectionTitle>Backgrounds</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => !bg.locked && setCurrentBackground(bg.id as AvatarBackground)}
                  className={`relative px-3 py-2.5 rounded border text-xs transition-all text-left ${
                    currentBackground === bg.id
                      ? "border-accent/70 text-accent shadow-glass-sm"
                      : bg.locked
                      ? "border-accent/10 text-muted cursor-not-allowed opacity-60"
                      : "border-accent/20 text-muted hover:border-accent/40"
                  }`}
                >
                  <span className="font-medium block">{bg.label}</span>
                  <span className="text-[10px] text-muted/60">{bg.labelEs}</span>
                  {bg.locked && (
                    <span className="absolute top-2 right-2 text-accent/40"><Lock size={10} /></span>
                  )}
                  {currentBackground === bg.id && (
                    <span className="text-[10px] text-accent ml-0 block mt-0.5">◆ ACTIVO</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Voice & Lip Sync Tab ───────────────────────────────────── */}
      {activeTab === "voice" && (
        <>
          <section className="custom-bg rounded-lg p-6 w-full space-y-4">
            <SectionTitle>Voice Selection</SectionTitle>
            <p className="text-muted text-xs">
              Uses Web Speech API. Avatar nods while speaking. For production lip sync, connect NVIDIA Audio2Face.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {VOICES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setCurrentVoice(v.id as AvatarVoice)}
                  className={`px-4 py-2.5 rounded border text-sm transition-all text-left ${
                    currentVoice === v.id
                      ? "border-accent/70 text-accent shadow-glass-sm"
                      : "border-accent/20 text-muted hover:border-accent/40"
                  }`}
                >
                  {v.label}
                  {currentVoice === v.id && <span className="ml-2 text-[10px]">◆ ACTIVO</span>}
                </button>
              ))}
            </div>
          </section>

          <section className="custom-bg rounded-lg p-6 w-full space-y-4">
            <SectionTitle>Lip Sync — Test ALEX Voice</SectionTitle>
            <p className="text-muted text-xs">
              Type text and press Hablar. The 3D avatar nods while speaking.
              Avatar returns to idle when done.
            </p>
            <textarea
              value={speakInput}
              onChange={(e) => setSpeakInput(e.target.value)}
              rows={3}
              placeholder="Hola, soy ALEX. ¿En qué puedo ayudarte hoy?"
              className="w-full bg-background/30 border border-accent/30 rounded px-4 py-2.5 text-foreground text-sm placeholder-muted focus:outline-none focus:border-accent/70 resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => speak(speakInput)}
                disabled={!speakInput.trim() || isSpeaking}
                className="flex-1 py-2.5 border border-accent/40 rounded text-accent text-sm font-medium hover:shadow-glass-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSpeaking ? "🎙 Hablando..." : "🎙 Hablar"}
              </button>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="px-4 py-2.5 border border-red-400/40 rounded text-red-400 text-sm hover:shadow-glass-sm transition-all"
                >
                  ⏹ Detener
                </button>
              )}
            </div>
          </section>

          <section className="custom-bg rounded-lg p-6 w-full space-y-3">
            <SectionTitle>NVIDIA Audio2Face (Production Lip Sync)</SectionTitle>
            <p className="text-muted text-xs leading-relaxed">
              For realistic facial animations and lip sync, integrate{" "}
              <span className="text-accent">NVIDIA Audio2Face</span> from the Omniverse suite.
              It drives blendshape weights from audio — connect via WebSocket to Three.js morph targets.
            </p>
            <div className="space-y-2 text-xs text-muted">
              <p>① Download Audio2Face from <span className="text-accent">nvidia.com/omniverse</span></p>
              <p>② Enable the REST/WebSocket API (port 8011)</p>
              <p>③ Send audio PCM chunks → receive per-frame blendshape weights</p>
              <p>④ Apply weights to <code className="text-accent">morphTargetInfluences</code> on the Three.js mesh each frame</p>
              <p>⑤ For cloud use: <span className="text-accent">NVIDIA ACE Microservices</span> (Audio2Face-3D API)</p>
            </div>
            <a
              href="https://docs.nvidia.com/ace/latest/modules/a2f-docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 px-4 py-1.5 border border-accent/30 rounded text-xs text-accent hover:shadow-glass-sm transition-all"
            >
              Ver Documentación →
            </a>
          </section>
        </>
      )}

      {/* ── Music Tab ─────────────────────────────────────────────── */}
      {activeTab === "music" && (
        <section className="custom-bg rounded-lg p-6 w-full space-y-4">
          <SectionTitle>Música del Avatar</SectionTitle>
          <p className="text-muted text-xs">Selecciona la pista de audio para el avatar.</p>
          <div className="space-y-2">
            {tracks.map((t) => (
              <button
                key={t.path + t.label}
                onClick={() => setCurrentTrack(t.path)}
                className={`w-full text-left px-4 py-2.5 rounded border text-sm transition-all ${
                  currentTrack === t.path
                    ? "border-accent/70 text-accent shadow-glass-sm"
                    : "border-accent/20 text-muted hover:border-accent/40"
                }`}
              >
                {t.label}
                {currentTrack === t.path && <span className="ml-2 text-[10px] tracking-wider">◆ ACTIVO</span>}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Asset Sources Tab ─────────────────────────────────────── */}
      {activeTab === "sources" && (
        <section className="custom-bg rounded-lg p-6 w-full space-y-4">
          <SectionTitle>3D Avatar & Asset Sources</SectionTitle>
          <p className="text-muted text-xs">
            Swap out the 3D character or add new outfits programmatically by replacing the .glb URL
            in <code className="text-accent">useGLTF()</code>. All sources below export .glb/.gltf compatible with Three.js.
          </p>
          <div className="space-y-3">
            {ASSET_SOURCES.map((s) => (
              <div key={s.name} className="border border-accent/15 rounded p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-accent font-medium text-sm">{s.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${
                    s.free ? "border-green-500/30 text-green-400" : "border-accent/30 text-accent"
                  }`}>
                    {s.free ? "FREE" : "PAID"}
                  </span>
                </div>
                <p className="text-muted text-xs">{s.notes}</p>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent/60 text-[10px] hover:text-accent transition-colors"
                >
                  {s.url}
                </a>
              </div>
            ))}
          </div>
          <div className="border border-accent/15 rounded p-3 space-y-1">
            <span className="text-accent font-medium text-sm">Ready Player Me (Client Avatars)</span>
            <p className="text-muted text-xs">
              Each client gets their own avatar URL:{" "}
              <code className="text-accent">https://models.readyplayer.me/&#123;avatarId&#125;.glb</code>.
              Pass this URL to <code className="text-accent">useGLTF()</code> dynamically to give every
              client a unique 3D avatar without touching the code.
            </p>
          </div>
        </section>
      )}

      <p className="text-muted text-[10px] text-center w-full pb-4">
        © 2026 Kupuri Media · Agent Alex™ · Synthia 3.0™
      </p>
    </main>
  );
}

export default Dashboard;
