import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing,
  staticFile,
  Img,
} from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { loadFont } from "@remotion/fonts";

loadFont({ family: "CooperLight", url: staticFile("fonts/CooperLtBTLight.ttf"), weight: "400" });
import { loadFont as loadGoogleFont } from "@remotion/google-fonts/Inter";
loadGoogleFont("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

const headingFont = "CooperLight, serif";
const bodyFont = "Inter, sans-serif";

const BG = "#f6f4f0";
const CARD = "#ffffff";
const TEXT = "#333333";
const TEXT_SEC = "#7a7570";
const ACCENT = "#c9956b";
const ACCENT_DEEP = "#a87a55";
const GREEN = "#2d9d5c";
const GREEN_BG = "rgba(45, 157, 92, 0.08)";
const BORDER = "#ece8e2";
const CHAT_BG = "#FAF8F4";
const BLUE = "#4a7cff";

// ── Laidback Logo ──
const LaidbackLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Img src={staticFile("images/logolaidback.svg")} style={{ width: size, height: size * 0.74, objectFit: "contain" }} />
);

// ── Icons ──
const IconSearch: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);
const IconSparkles: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />
  </svg>
);
const IconArrowUp: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
  </svg>
);
const IconCheck: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = GREEN }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IconGlobe: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
  </svg>
);
const IconCode: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" />
  </svg>
);
const IconBriefcase: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);
const IconUsers: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconStar: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth={1.5}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
const IconMessageSquare: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ProfilePhoto: React.FC<{ src: string; size: number; border?: boolean }> = ({ src, size, border = true }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: border ? `2px solid ${BORDER}` : "none" }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);



const useTypewriter = (text: string, startFrame: number, charsPerFrame = 0.8) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  return text.slice(0, Math.min(Math.floor(elapsed * charsPerFrame), text.length));
};

const Cursor: React.FC<{ color?: string }> = ({ color = ACCENT }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame % 16, [0, 8, 16], [1, 0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <span style={{ display: "inline-block", width: 2.5, height: "1.1em", background: color, marginLeft: 2, opacity, verticalAlign: "text-bottom" }} />;
};

// ═══════════════════════════════════════════════════════
// SCENE 1: INTRO — Search icon + title
// 90 frames
// ═══════════════════════════════════════════════════════
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const iconScale = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });
  const iconRotate = interpolate(spring({ frame, fps, config: { damping: 15, stiffness: 60 } }), [0, 1], [-20, 0]);
  const titleSpring = spring({ frame: frame - 15, fps, config: { damping: 18, stiffness: 100 } });
  const subtitleSpring = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const lineW = interpolate(frame, [25, 60], [0, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const orb1Y = Math.sin(frame * 0.05) * 8;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 180 + orb1Y, right: 350, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 70%)` }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ position: "relative", transform: `scale(${iconScale}) rotate(${iconRotate}deg)` }}>
          <div style={{ width: 100, height: 100, borderRadius: 24, background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 16px 50px rgba(201, 149, 107, 0.35)` }}>
            <IconSearch size={55} color="#fff" />
          </div>
          {[{ x: -35, y: -40, delay: 5, size: 14 }, { x: 40, y: -30, delay: 10, size: 10 }, { x: -25, y: 35, delay: 15, size: 8 }].map((s, i) => {
            const sSpring = spring({ frame: frame - s.delay, fps, config: { damping: 12 } });
            return <div key={i} style={{ position: "absolute", left: `calc(50% + ${s.x}px)`, top: `calc(50% + ${s.y + Math.sin((frame + i * 20) * 0.08) * 3}px)`, opacity: sSpring * 0.7, transform: `scale(${sSpring})` }}><IconSparkles size={s.size} color={ACCENT} /></div>;
          })}
        </div>
        <h1 style={{ fontSize: 72, fontFamily: headingFont, color: TEXT, margin: 0, letterSpacing: -2, transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`, opacity: titleSpring }}>Talent search</h1>
        <div style={{ width: lineW, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
        <p style={{ fontSize: 22, fontFamily: bodyFont, color: TEXT_SEC, margin: 0, opacity: subtitleSpring, transform: `translateY(${interpolate(subtitleSpring, [0, 1], [20, 0])}px)` }}>Find A-players across every source</p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 2: CHAT QUERY — User describes who they need
// 200 frames
// ═══════════════════════════════════════════════════════
const ChatQueryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelSlide = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const userMsg = "Find senior product designers with fintech experience who've led design systems at scale";
  const userTyped = useTypewriter(userMsg, 20, 0.9);
  const userMsgDone = userTyped.length >= userMsg.length;

  // AI understanding response
  const aiText = "Got it. I'll search across LinkedIn, GitHub, Behance, your talent network, and current applicants for senior product designers with fintech + design systems experience.";
  const aiTyped = useTypewriter(aiText, 100, 1.5);
  const aiDone = aiTyped.length >= aiText.length;

  const zoomProgress = interpolate(frame, [0, 60], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${zoomProgress})`, transformOrigin: "center center" }}>
        <div style={{
          width: 600, background: CHAT_BG, borderRadius: 24,
          boxShadow: `0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)`,
          transform: `translateX(${interpolate(panelSlide, [0, 1], [-600, 0])}px)`,
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          {/* Tab header */}
          <div style={{ padding: "20px 28px 0 28px", display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: `2px solid ${TEXT}`, paddingBottom: 12 }}>
              <IconSparkles size={16} color={TEXT} />
              <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>AI chat</span>
            </div>
            <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT_SEC, paddingBottom: 12 }}>Team chat</span>
          </div>
          <div style={{ height: 1, background: BORDER, margin: "0 28px" }} />

          <div style={{ padding: "24px 28px", minHeight: 340 }}>
            {/* User message */}
            {frame > 20 && (
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24, opacity: spring({ frame: frame - 20, fps, config: { damping: 200 } }) }}>
                <div style={{ background: CARD, borderRadius: 18, padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: 420, fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.6 }}>
                  {userTyped}{!userMsgDone && <Cursor />}
                </div>
              </div>
            )}

            {/* AI response */}
            {frame >= 95 && (
              <div style={{ marginBottom: 20, opacity: spring({ frame: frame - 95, fps, config: { damping: 200 } }) }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <IconSparkles size={16} color={ACCENT} />
                  <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>Laidback</span>
                </div>
                <p style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: 0 }}>
                  {aiTyped}{!aiDone && <Cursor />}
                </p>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: "0 28px 24px 28px" }}>
            <div style={{ background: CARD, borderRadius: 18, padding: "16px 18px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, fontFamily: bodyFont, color: "#bbb" }}>e.g. designers who shipped at Stripe...</span>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: TEXT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconArrowUp size={16} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 3: SOURCE SCANNING — External + Internal sources animation
// 200 frames
// ═══════════════════════════════════════════════════════
const SourceScanScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({ frame, fps, config: { damping: 200 } });

  const externalSources = [
    { name: "LinkedIn", color: "#0A66C2", icon: "images/linkedin.svg" },
    { name: "GitHub", color: "#24292e", icon: "images/github.svg" },
    { name: "Behance", color: "#1769FF", icon: "images/behance.svg" },
    { name: "Dribbble", color: "#EA4C89", icon: "images/dribbble.svg" },
    { name: "HuggingFace", color: "#FFD21E", icon: "images/huggingface.svg" },
  ];

  const internalSources = [
    { name: "Applicants", icon: <IconUsers size={22} color="#fff" />, color: ACCENT },
    { name: "Talent network", icon: <IconGlobe size={22} color="#fff" />, color: GREEN },
    { name: "Past candidates", icon: <IconBriefcase size={22} color="#fff" />, color: BLUE },
  ];

  // Scanning progress bar
  const scanProgress = interpolate(frame, [60, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });

  // Count animates
  const count = Math.floor(interpolate(frame, [80, 170], [0, 247], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));

  const orb1Y = Math.sin(frame * 0.04) * 6;
  const orb2Y = Math.sin(frame * 0.06 + 2) * 8;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 120 + orb1Y, left: 200, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(74,124,255,0.06) 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", bottom: 150 + orb2Y, right: 250, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,149,107,0.08) 0%, transparent 70%)` }} />

      <div style={{ width: 800, opacity: containerSpring }}>
        {/* External sources */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC, letterSpacing: 3, textTransform: "uppercase" }}>External sources</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 48 }}>
          {externalSources.map((src, i) => {
            const s = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 14, stiffness: 100 } });
            const pulse = frame > 60 + i * 10 ? interpolate(Math.sin((frame - 60 - i * 10) * 0.15), [-1, 1], [0.95, 1.05]) : 1;
            return (
              <div key={i} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                opacity: s, transform: `scale(${interpolate(s, [0, 1], [0.5, 1]) * pulse})`,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: `0 8px 24px ${src.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: src.name === "GitHub" ? "#24292e" : "transparent",
                }}>
                  <Img src={staticFile(src.icon)} style={{ width: src.name === "GitHub" ? "60%" : "100%", height: src.name === "GitHub" ? "60%" : "100%", objectFit: "cover", filter: src.name === "GitHub" ? "invert(1)" : "none" }} />
                </div>
                <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>{src.name}</span>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
          <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>+</span>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
        </div>

        {/* Internal sources */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC, letterSpacing: 3, textTransform: "uppercase" }}>Internal sources</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 48 }}>
          {internalSources.map((src, i) => {
            const s = spring({ frame: frame - 40 - i * 10, fps, config: { damping: 14, stiffness: 100 } });
            return (
              <div key={i} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                opacity: s, transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 20,
                  background: src.color, display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 8px 24px ${src.color}30`,
                }}>
                  {src.icon}
                </div>
                <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>{src.name}</span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT_SEC }}>
              {frame >= 60 ? "Scanning & cross-referencing..." : "Initializing search..."}
            </span>
            <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>{count}+ found</span>
          </div>
          <div style={{ width: "100%", height: 6, borderRadius: 3, background: BORDER }}>
            <div style={{ width: `${scanProgress * 100}%`, height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${ACCENT}, ${GREEN})` }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 4: RESULTS FOUND — Candidate count + stacked photos + 2-col stats
// 180 frames
// ═══════════════════════════════════════════════════════
const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });

  // Stacked photos animation
  const photos = ["images/sarah.jpg", "images/arjun.jpg", "images/lisa.jpg"];
  const p1 = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  const p2 = spring({ frame: frame - 18, fps, config: { damping: 12 } });
  const p3 = spring({ frame: frame - 26, fps, config: { damping: 12 } });
  const pSprings = [p1, p2, p3];

  const countSpring = spring({ frame: frame - 30, fps, config: { damping: 18 } });

  // Stats cards
  const stats = [
    { label: "Best matches", value: "24", sub: "10+ match score", color: GREEN },
    { label: "From applicants", value: "8", sub: "Already applied", color: ACCENT },
    { label: "External sources", value: "198", sub: "LinkedIn, GitHub, Behance", color: BLUE },
    { label: "Talent network", value: "17", sub: "Previously engaged", color: "#7c5cbf" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, opacity: containerSpring }}>
        {/* Stacked photos + count */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", position: "relative", width: 130, height: 60 }}>
            {photos.map((photo, i) => (
              <div key={i} style={{
                position: "absolute", left: i * 38, zIndex: 3 - i,
                opacity: pSprings[i],
                transform: `scale(${interpolate(pSprings[i], [0, 1], [0.5, 1])})`,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", overflow: "hidden",
                  border: `3px solid ${CARD}`, boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}>
                  <Img src={staticFile(photo)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ opacity: countSpring, transform: `translateX(${interpolate(countSpring, [0, 1], [30, 0])}px)` }}>
            <div style={{ fontSize: 56, fontFamily: headingFont, color: TEXT, lineHeight: 1 }}>247+</div>
            <div style={{ fontSize: 16, fontFamily: bodyFont, color: TEXT_SEC }}>candidates found</div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: 560 }}>
          {stats.map((stat, i) => {
            const s = spring({ frame: frame - 50 - i * 10, fps, config: { damping: 16, stiffness: 100 } });
            return (
              <div key={i} style={{
                background: CARD, borderRadius: 18, padding: "22px 24px",
                border: `1px solid ${BORDER}`,
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
              }}>
                <div style={{ fontSize: 32, fontFamily: headingFont, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, marginTop: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC, marginTop: 4 }}>{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 5: CANDIDATE PROFILE — AI summary with cross-referenced sources
// 280 frames
// ═══════════════════════════════════════════════════════
const CandidateDetailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });

  // Left panel: candidate card
  const leftSpring = spring({ frame: frame - 5, fps, config: { damping: 18 } });
  // Right panel: AI analysis
  const rightSpring = spring({ frame: frame - 20, fps, config: { damping: 18 } });

  // AI summary typewriter
  const aiSummary = "Senior Product Designer with leadership experience. Worked several years in fintech, at high-growth companies. Strong systems thinking and shipped design systems used by 200+ engineers.";
  const aiTyped = useTypewriter(aiSummary, 40, 1.2);
  const aiDone = aiTyped.length >= aiSummary.length;

  // Tags stagger
  const tags = ["Award winner", "AI Focused", "UX Strategy", "Fintech Experience", "Design Systems"];

  // Source cross-references
  const sources = [
    { platform: "LinkedIn", detail: "8 years Sr. Product Designer at Klarna", color: "#0A66C2" },
    { platform: "GitHub", detail: "142 contributions to design-tokens repo", color: "#24292e" },
    { platform: "Behance", detail: "Featured portfolio — fintech case studies", color: "#1769FF" },
    { platform: "Applicant", detail: "Applied 3 days ago to Sr. Designer role", color: ACCENT },
  ];

  const cameraScale = interpolate(frame, [0, 40], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${cameraScale})`, transformOrigin: "center center" }}>
        <div style={{
          width: 1300, height: 700,
          background: CARD, borderRadius: 24,
          boxShadow: "0 30px 80px rgba(0,0,0,0.1)",
          display: "flex", overflow: "hidden",
          opacity: containerSpring,
        }}>
          {/* Left: Candidate card */}
          <div style={{
            width: 440, borderRight: `1px solid ${BORDER}`, padding: "32px 28px",
            opacity: leftSpring,
            transform: `translateX(${interpolate(leftSpring, [0, 1], [-30, 0])}px)`,
          }}>
            {/* Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <ProfilePhoto src="images/sarah.jpg" size={72} />
              <div>
                <div style={{ fontSize: 22, fontFamily: headingFont, color: TEXT }}>Sarah Chapman</div>
                <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC }}>Stockholm · <span style={{ color: GREEN }}>10/12 Match</span></span>
              </div>
            </div>

            {/* Bio */}
            <p style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT_SEC, lineHeight: 1.6, marginBottom: 20 }}>
              Senior Product Designer with extensive leadership experience. Has dedicated several years to the fintech sector at high-growth companies. My expertise lies in creating...
            </p>

            {/* Experience badges */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT, fontWeight: 500, marginBottom: 10, display: "block" }}>Experience</span>
              {[
                { company: "Klarna", role: "Sr. Product Designer", years: "4 yrs" },
                { company: "Spotify", role: "Product Designer", years: "3 yrs" },
                { company: "Microsoft", role: "Design Intern", years: "1 yr" },
              ].map((exp, i) => {
                const eSpring = spring({ frame: frame - 30 - i * 8, fps, config: { damping: 200 } });
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 0", borderBottom: i < 2 ? `1px solid ${BORDER}` : "none",
                    opacity: eSpring,
                  }}>
                    <div>
                      <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>{exp.company}</span>
                      <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC, marginLeft: 8 }}>{exp.role}</span>
                    </div>
                    <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>{exp.years}</span>
                  </div>
                );
              })}
            </div>

            {/* Skills */}
            <div>
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT, fontWeight: 500, marginBottom: 10, display: "block" }}>Hard skills</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Design Systems", "Figma", "Prototyping", "Frontend dev", "FAANG company"].map((skill, i) => {
                  const sSpring = spring({ frame: frame - 60 - i * 5, fps, config: { damping: 200 } });
                  return (
                    <span key={i} style={{
                      fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC,
                      padding: "5px 12px", borderRadius: 8, border: `1px solid ${BORDER}`,
                      display: "flex", alignItems: "center", gap: 6, opacity: sSpring,
                    }}>
                      <IconCode size={12} color={TEXT_SEC} /> {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: AI analysis & cross-references */}
          <div style={{
            flex: 1, padding: "32px 32px",
            opacity: rightSpring,
            transform: `translateY(${interpolate(rightSpring, [0, 1], [20, 0])}px)`,
          }}>
            {/* AI Summary */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 20, fontFamily: headingFont, color: TEXT, marginBottom: 16 }}>AI summary</div>
              <div style={{
                background: "#f8f6f2", borderRadius: 16, padding: "18px 22px",
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <IconSparkles size={18} color={ACCENT} />
                  <p style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: 0 }}>
                    {aiTyped}{!aiDone && <Cursor />}
                  </p>
                </div>
                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                  {tags.map((tag, i) => {
                    const tSpring = spring({ frame: frame - 90 - i * 6, fps, config: { damping: 200 } });
                    return (
                      <span key={i} style={{
                        fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC,
                        padding: "5px 12px", borderRadius: 8, background: CARD,
                        border: `1px solid ${BORDER}`, opacity: tSpring,
                      }}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Criteria Benchmark */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 20, fontFamily: headingFont, color: TEXT, marginBottom: 16 }}>Criteria benchmark</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Fintech experience", match: true },
                  { label: "Design systems", match: true },
                  { label: "Leadership experience", match: true },
                  { label: "Scale (200+ engineers)", match: true },
                  { label: "Remote-friendly", match: false },
                ].map((criteria, i) => {
                  const cSpring = spring({ frame: frame - 100 - i * 8, fps, config: { damping: 200 } });
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 16px", borderRadius: 12,
                      background: criteria.match ? GREEN_BG : "rgba(200,190,180,0.08)",
                      border: `1px solid ${criteria.match ? `${GREEN}20` : BORDER}`,
                      opacity: cSpring,
                      transform: `translateX(${interpolate(cSpring, [0, 1], [20, 0])}px)`,
                    }}>
                      <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT }}>{criteria.label}</span>
                      {criteria.match
                        ? <div style={{ display: "flex", alignItems: "center", gap: 6 }}><IconCheck size={15} color={GREEN} /><span style={{ fontSize: 12, fontFamily: bodyFont, color: GREEN, fontWeight: 500 }}>Match</span></div>
                        : <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>No match</span>
                      }
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cross-referenced sources */}
            <div>
              <div style={{ fontSize: 20, fontFamily: headingFont, color: TEXT, marginBottom: 16 }}>Cross-referenced sources</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {sources.map((src, i) => {
                  const sSpring = spring({ frame: frame - 130 - i * 12, fps, config: { damping: 16, stiffness: 100 } });
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 18px", borderRadius: 14,
                      background: CARD, border: `1px solid ${BORDER}`,
                      opacity: sSpring,
                      transform: `translateX(${interpolate(sSpring, [0, 1], [30, 0])}px)`,
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        overflow: "hidden",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: src.platform === "GitHub" ? "#24292e" : src.platform === "Applicant" ? src.color : "transparent",
                      }}>
                        {src.platform === "Applicant" 
                          ? <IconStar size={18} color="#fff" /> 
                          : <Img src={staticFile(src.platform === "LinkedIn" ? "images/linkedin.svg" : src.platform === "GitHub" ? "images/github.svg" : "images/behance.svg")} style={{ width: src.platform === "GitHub" ? "60%" : "100%", height: src.platform === "GitHub" ? "60%" : "100%", objectFit: "cover", filter: src.platform === "GitHub" ? "invert(1)" : "none" }} />
                        }
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>{src.platform}</div>
                        <div style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>{src.detail}</div>
                      </div>
                      <IconCheck size={16} color={GREEN} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Save button */}
            {frame >= 200 && (
              <div style={{
                marginTop: 24,
                display: "flex", gap: 12,
                opacity: spring({ frame: frame - 200, fps, config: { damping: 14 } }),
                transform: `translateY(${interpolate(spring({ frame: frame - 200, fps, config: { damping: 14 } }), [0, 1], [15, 0])}px)`,
              }}>
                <div style={{
                  background: TEXT, color: "#fff", borderRadius: 12, padding: "12px 22px",
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 14, fontFamily: bodyFont,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                }}>
                  <IconMessageSquare size={14} color="#fff" />
                  Save to pipeline
                </div>
                <div style={{
                  background: CARD, color: TEXT, borderRadius: 12, padding: "12px 22px",
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 14, fontFamily: bodyFont, border: `1px solid ${BORDER}`,
                }}>
                  <IconSearch size={14} color={TEXT_SEC} />
                  Find similar
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 6: PIPELINE SAVE — Candidate saved to pipeline card
// 120 frames
// ═══════════════════════════════════════════════════════
const PipelineSaveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cards = [
    { name: "Sarah Chapman", photo: "images/sarah.jpg", match: "10/12", status: "Saved", delay: 0 },
    { name: "Arjun Patel", photo: "images/arjun.jpg", match: "9/12", status: "Saved", delay: 12 },
    { name: "David Okonkwo", photo: "images/david.jpg", match: "9/12", status: "Saved", delay: 24 },
  ];

  const headerSpring = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 700, opacity: headerSpring }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <IconSparkles size={20} color={ACCENT} />
          <span style={{ fontSize: 20, fontFamily: headingFont, color: TEXT }}>3 top candidates saved to pipeline</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {cards.map((card, i) => {
            const s = spring({ frame: frame - 15 - card.delay, fps, config: { damping: 14, stiffness: 100 } });
            const checkDelay = 40 + card.delay;
            const checkSpring = spring({ frame: frame - checkDelay, fps, config: { damping: 10, stiffness: 120 } });
            return (
              <div key={i} style={{
                background: CARD, borderRadius: 20, padding: "24px 20px",
                border: `1px solid ${BORDER}`,
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                display: "flex", flexDirection: "column", alignItems: "center",
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
              }}>
                {/* Status badge */}
                <div style={{
                  alignSelf: "flex-end", marginBottom: 12,
                  padding: "4px 10px", borderRadius: 8,
                  background: GREEN_BG, fontSize: 11, fontFamily: bodyFont, color: GREEN,
                  opacity: checkSpring, transform: `scale(${interpolate(checkSpring, [0, 1], [0.5, 1])})`,
                }}>
                  ✓ {card.status}
                </div>
                <ProfilePhoto src={card.photo} size={64} />
                <div style={{ fontSize: 16, fontFamily: headingFont, color: TEXT, marginTop: 12 }}>{card.name}</div>
                <div style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC, marginTop: 4 }}>
                  <span style={{ color: GREEN }}>{card.match} Match</span> · Just now
                </div>
                <div style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC, marginTop: 6 }}>Follow up in 2 days</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 7: OUTRO
// 90 frames
// ═══════════════════════════════════════════════════════
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const words = ["Hire", "smarter,", "faster"];
  const wordEls = words.map((word, i) => {
    const wSpring = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 18 } });
    return <span key={i} style={{ display: "inline-block", transform: `translateY(${interpolate(wSpring, [0, 1], [50, 0])}px)`, opacity: wSpring, marginRight: 16 }}>{word}</span>;
  });
  const lineW = interpolate(frame, [25, 60], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const urlSpring = spring({ frame: frame - 40, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ width: 72, height: 72, borderRadius: 18, background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`, transform: `scale(${logoScale})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 40px rgba(201, 149, 107, 0.3)` }}>
          <LaidbackLogo size={42} color="#fff" />
        </div>
        <h1 style={{ fontSize: 64, fontFamily: headingFont, color: TEXT, margin: 0, letterSpacing: -1 }}>{wordEls}</h1>
        <div style={{ width: lineW, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
        <p style={{ fontSize: 22, fontFamily: bodyFont, color: TEXT_SEC, margin: 0, letterSpacing: 1, opacity: urlSpring, transform: `translateY(${interpolate(urlSpring, [0, 1], [15, 0])}px)` }}>laidback.ai</p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN VIDEO
// Intro(90) + ChatQuery(200) + SourceScan(200) + Results(180) + CandidateDetail(340) + PipelineSave(120) + Outro(90)
// Transitions: 6 × 20f = 120f overlap
// Total: 1220 - 120 = 1100f ≈ 36.7s
// ═══════════════════════════════════════════════════════
export const SearchVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}><IntroScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={200}><ChatQueryScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={200}><SourceScanScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={180}><ResultsScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={340}><CandidateDetailScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={120}><PipelineSaveScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={90}><OutroScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
