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

// ── Load Custom Fonts ──
import { loadFont as loadGoogleFont } from "@remotion/google-fonts/Inter";

loadFont({
  family: "CooperLight",
  url: staticFile("fonts/CooperLtBTLight.ttf"),
  weight: "400",
});

const { fontFamily: interFamily } = loadGoogleFont("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

const headingFont = "CooperLight, serif";
const bodyFont = `${interFamily}, sans-serif`;

// ── Colors ──
const BG = "#f6f4f0";
const CARD = "#ffffff";
const TEXT = "#333333";
const TEXT_SEC = "#7a7570";
const ACCENT = "#c9956b";
const ACCENT_DEEP = "#a87a55";
const ACCENT_BG = "rgba(201, 149, 107, 0.10)";
const GREEN = "#2d9d5c";
const GREEN_BG = "rgba(45, 157, 92, 0.08)";
const BORDER = "#ece8e2";
const BLUE = "#4a7cff";
const BLUE_BG = "rgba(74, 124, 255, 0.08)";

// ── Laidback Logo Icon (uses uploaded SVG) ──
const LaidbackLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Img src={staticFile("images/logolaidback.svg")} style={{ width: size, height: size * 0.74, objectFit: "contain" }} />
);

// ── SVG Icon Components ──
const IconMail: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconSend: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
    <path d="m21.854 2.147-10.94 10.939" />
  </svg>
);

const IconSparkles: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" />
    <path d="M4 17v2" /><path d="M5 18H3" />
  </svg>
);

const IconUsers: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconCalendar: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" /><path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const IconMessageCircle: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
  </svg>
);

const IconCheck: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const IconArrowRight: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const IconPaperclip: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const IconRefresh: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const IconPhone: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconVideo: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" />
    <rect x="2" y="6" width="14" height="12" rx="2" />
  </svg>
);

const IconMoreHorizontal: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

const IconTrendingUp: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = GREEN }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const IconTarget: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const IconZap: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#e8a230" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
);

// ── Profile Photo Component ──
const ProfilePhoto: React.FC<{ src: string; size: number }> = ({ src, size }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    overflow: "hidden", flexShrink: 0,
    border: `2px solid ${BORDER}`,
  }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

// ── Helpers ──
const useTypewriter = (
  text: string,
  startFrame: number,
  charsPerFrame = 0.8,
  pauseAfter?: string,
  pauseFrames = 20
) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);

  if (!pauseAfter) {
    const chars = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
    return text.slice(0, chars);
  }

  const pauseIdx = text.indexOf(pauseAfter);
  const preLen = pauseIdx >= 0 ? pauseIdx + pauseAfter.length : text.length;
  const preFrames = preLen / charsPerFrame;

  if (elapsed < preFrames) {
    return text.slice(0, Math.floor(elapsed * charsPerFrame));
  } else if (elapsed < preFrames + pauseFrames) {
    return text.slice(0, preLen);
  } else {
    const postElapsed = elapsed - preFrames - pauseFrames;
    return text.slice(0, Math.min(text.length, preLen + Math.floor(postElapsed * charsPerFrame)));
  }
};

const Cursor: React.FC<{ color?: string }> = ({ color = ACCENT }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame % 16, [0, 8, 16], [1, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <span
      style={{
        display: "inline-block",
        width: 2.5,
        height: "1.1em",
        background: color,
        marginLeft: 2,
        opacity,
        verticalAlign: "text-bottom",
      }}
    />
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 1: INTRO — Laidback Logo + Staggered word reveal
// ═══════════════════════════════════════════════════════
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const logoRotate = interpolate(
    spring({ frame, fps, config: { damping: 15, stiffness: 60 } }),
    [0, 1],
    [-15, 0]
  );

  const words = ["Personalized", "Outreach"];
  const wordElements = words.map((word, i) => {
    const wordDelay = 12 + i * 10;
    const wordSpring = spring({ frame: frame - wordDelay, fps, config: { damping: 18, stiffness: 100 } });
    const wordY = interpolate(wordSpring, [0, 1], [60, 0]);
    const wordOpacity = interpolate(wordSpring, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
    return (
      <span
        key={i}
        style={{
          display: "inline-block",
          transform: `translateY(${wordY}px)`,
          opacity: wordOpacity,
          marginRight: 20,
        }}
      >
        {word}
      </span>
    );
  });

  const subDelay = 30;
  const subProgress = spring({ frame: frame - subDelay, fps, config: { damping: 200 } });
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  const lineW = interpolate(frame, [20, 55], [0, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const orb1Y = Math.sin(frame * 0.05) * 8;
  const orb2Y = Math.cos(frame * 0.04) * 10;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        position: "absolute", top: 200 + orb1Y, right: 300,
        width: 200, height: 200, borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}15 0%, transparent 70%)`,
      }} />
      <div style={{
        position: "absolute", bottom: 180 + orb2Y, left: 250,
        width: 260, height: 260, borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}0a 0%, transparent 70%)`,
      }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{
          width: 88, height: 88, borderRadius: 22,
          background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`,
          transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 12px 40px rgba(201, 149, 107, 0.35), 0 0 0 1px rgba(201, 149, 107, 0.1)`,
        }}>
          <LaidbackLogo size={50} color="#fff" />
        </div>

        <h1 style={{
          fontSize: 76, fontFamily: headingFont, fontWeight: 400, color: TEXT,
          margin: 0, letterSpacing: -2, lineHeight: 1.1,
        }}>
          {wordElements}
        </h1>

        <div style={{
          width: lineW, height: 3, borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
        }} />

        <p style={{
          fontSize: 24, fontFamily: bodyFont, color: TEXT_SEC,
          opacity: subProgress, transform: `translateY(${subY}px)`,
          margin: 0, fontWeight: 400, letterSpacing: 0.5,
        }}>
          AI-crafted messages that get responses
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 2: PIPELINE — Select candidates with cursor
// ═══════════════════════════════════════════════════════
const CANDIDATES = [
  { name: "Sarah Chapman", role: "Senior Product Designer", company: "Fintech Corp", loc: "Stockholm", match: "10/12", matchPct: 83, photo: "images/sarah.jpg", skills: ["Product Design", "UX Strategy", "Figma"] },
  { name: "Sam Morris", role: "UX Designer", company: "CreativeLab", loc: "London", match: "9/12", matchPct: 75, photo: "images/sam.jpg", skills: ["UI Design", "Research", "Prototyping"] },
  { name: "Esther Howard", role: "Product Designer", company: "TechStart", loc: "Berlin", match: "8/12", matchPct: 67, photo: "images/esther.jpg", skills: ["Design Systems", "Interaction", "Framer"] },
];

const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoomProgress = interpolate(frame, [0, 200], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const cameraScale = interpolate(zoomProgress, [0, 0.5, 1], [0.82, 0.92, 1.05]);
  const cameraY = interpolate(zoomProgress, [0, 0.5, 1], [30, 10, -20]);

  const cursorTargets = [
    { x: 1390, y: 495, clickFrame: 65 },
    { x: 1390, y: 595, clickFrame: 85 },
    { x: 1390, y: 695, clickFrame: 105 },
    { x: 870, y: 790, clickFrame: 155 },
  ];

  let cursorX = 960;
  let cursorY = 300;
  let cursorVisible = frame > 40;
  let cursorClicking = false;

  const headerSpring = spring({ frame, fps, config: { damping: 200 } });
  const statsDelay = 8;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)` }}>
      <div style={{
        transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        transformOrigin: "center 40%",
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 24,
      }}>
        {/* Top nav bar */}
        <div style={{
          width: 900, display: "flex", alignItems: "center",
          justifyContent: "space-between", opacity: headerSpring, padding: "0 4px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <LaidbackLogo size={18} color="#fff" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 400, color: TEXT, fontFamily: bodyFont }}>
              BD Representative / Sales Manager
            </span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Job", "Review (10)", "Pipeline"].map((tab, i) => (
              <span key={i} style={{
                fontSize: 14, fontFamily: bodyFont, fontWeight: 400,
                color: i === 2 ? TEXT : TEXT_SEC,
                padding: "6px 16px", borderRadius: 8,
                background: i === 2 ? CARD : "transparent",
                boxShadow: i === 2 ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
              }}>{tab}</span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 16, width: 900 }}>
          {[
            { label: "To contact", value: 6, icon: <IconUsers size={20} color={ACCENT} /> },
            { label: "To Schedule", value: 4, icon: <IconCalendar size={20} color={BLUE} /> },
            { label: "Interviewing", value: 2, icon: <IconMessageCircle size={20} color={GREEN} /> },
          ].map((stat, i) => {
            const statSpring = spring({
              frame: frame - statsDelay - i * 6,
              fps,
              config: { damping: 18, stiffness: 120 },
            });
            const countUp = Math.round(
              interpolate(
                spring({ frame: frame - statsDelay - i * 6 - 10, fps, config: { damping: 200 } }),
                [0, 1],
                [0, stat.value]
              )
            );

            return (
              <div key={i} style={{
                flex: 1, background: CARD, borderRadius: 14, padding: "16px 20px",
                border: `1px solid ${BORDER}`,
                opacity: statSpring,
                transform: `translateY(${interpolate(statSpring, [0, 1], [20, 0])}px)`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  {stat.icon}
                  <span style={{ fontSize: 13, color: TEXT_SEC, fontFamily: bodyFont }}>{stat.label}</span>
                </div>
                <span style={{ fontSize: 28, fontWeight: 400, color: TEXT, fontFamily: headingFont }}>{countUp}</span>
              </div>
            );
          })}
        </div>

        {/* Section header */}
        <div style={{
          width: 900, display: "flex", justifyContent: "space-between", alignItems: "center",
          opacity: spring({ frame: frame - 20, fps, config: { damping: 200 } }),
        }}>
          <span style={{ fontSize: 20, fontFamily: headingFont, color: TEXT }}>Best Matches</span>
          <span style={{ fontSize: 13, color: ACCENT, fontFamily: bodyFont, display: "flex", alignItems: "center", gap: 4 }}>
            View all <IconArrowRight size={14} color={ACCENT} />
          </span>
        </div>

        {/* Candidate cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 900 }}>
          {CANDIDATES.map((c, i) => {
            const cardDelay = 25 + i * 14;
            const cardSpring = spring({ frame: frame - cardDelay, fps, config: { damping: 20, stiffness: 120 } });
            const cardY = interpolate(cardSpring, [0, 1], [35, 0]);

            const checkFrame = checkClickFrames[i];
            const isSelected = frame > checkFrame;
            const checkSpring = spring({ frame: frame - checkFrame, fps, config: { damping: 10, stiffness: 150 } });
            const checkSpring = spring({ frame: frame - checkClickFrame, fps, config: { damping: 10, stiffness: 150 } });

            const barProgress = interpolate(
              spring({ frame: frame - cardDelay - 10, fps, config: { damping: 200 } }),
              [0, 1],
              [0, c.matchPct]
            );

            const floatY = Math.sin((frame + i * 30) * 0.03) * 1.5;

            const highlightOpacity = isSelected
              ? interpolate(frame - checkClickFrame, [0, 10, 30], [0, 0.15, 0], { extrapolateRight: "clamp" })
              : 0;

            return (
              <div key={i} style={{
                background: CARD,
                borderRadius: 16,
                padding: "20px 24px",
                border: isSelected ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
                opacity: cardSpring,
                transform: `translateY(${cardY + floatY}px)`,
                display: "flex",
                alignItems: "center",
                gap: 18,
                boxShadow: isSelected
                  ? `0 6px 24px rgba(201, 149, 107, 0.15)`
                  : "0 2px 8px rgba(0,0,0,0.03)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: ACCENT,
                  opacity: highlightOpacity,
                  borderRadius: 16,
                }} />

                {/* Profile Photo */}
                <ProfilePhoto src={c.photo} size={48} />

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, fontFamily: bodyFont, color: TEXT }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: GREEN, fontFamily: bodyFont }}>{c.match} Match</span>
                  </div>
                  <div style={{ fontSize: 13, color: TEXT_SEC, fontFamily: bodyFont, marginTop: 2 }}>
                    {c.role} · {c.company} · {c.loc}
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    {c.skills.map((skill, si) => (
                      <span key={si} style={{
                        fontSize: 11, color: TEXT_SEC, fontFamily: bodyFont,
                        background: "#f5f3ef", padding: "3px 10px", borderRadius: 10,
                      }}>{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Match bar */}
                <div style={{ width: 80, flexShrink: 0 }}>
                  <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#f0ede8" }}>
                    <div style={{
                      width: `${barProgress}%`, height: "100%", borderRadius: 2,
                      background: `linear-gradient(90deg, ${ACCENT}, ${GREEN})`,
                    }} />
                  </div>
                  <div style={{
                    fontSize: 11, color: TEXT_SEC, fontFamily: bodyFont, textAlign: "right", marginTop: 3,
                  }}>{Math.round(barProgress)}%</div>
                </div>

                {/* Checkbox */}
                <div style={{
                  width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                  background: isSelected ? ACCENT : "transparent",
                  border: isSelected ? "none" : `2px solid ${BORDER}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: `scale(${isSelected ? checkSpring : 1})`,
                }}>
                  {isSelected && <IconCheck size={14} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact button */}
        {(() => {
          const btnDelay = 120;
          const btnSpring = spring({ frame: frame - btnDelay, fps, config: { damping: 14, stiffness: 100 } });
          const btnScale = interpolate(btnSpring, [0, 1], [0.85, 1]);

          const btnClickFrame = cursorTargets[3].clickFrame;
          const isClicked = frame > btnClickFrame;
          const clickPulse = isClicked
            ? interpolate(frame - btnClickFrame, [0, 5, 10], [1, 0.95, 1.02], { extrapolateRight: "clamp" })
            : 1;

          return (
            <div style={{
              opacity: btnSpring,
              transform: `scale(${btnScale * clickPulse})`,
              marginTop: 8,
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                color: "#fff", fontSize: 16, fontFamily: bodyFont,
                padding: "14px 32px", borderRadius: 14,
                boxShadow: isClicked
                  ? `0 4px 12px rgba(201, 149, 107, 0.2)`
                  : `0 8px 24px rgba(201, 149, 107, 0.3), 0 2px 6px rgba(201, 149, 107, 0.2)`,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <IconMail size={18} color="#fff" />
                Contact 3 selected candidates
              </div>
            </div>
          );
        })()}
      </div>

      <AnimatedCursor
        x={cursorX}
        y={cursorY}
        visible={cursorVisible}
        clicking={cursorClicking}
        scale={1 / cameraScale}
      />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 3: AI COMPOSE — Template then "Make Relevant" click
// ═══════════════════════════════════════════════════════
const GENERIC_MESSAGE = `Hi there,

I came across your profile and thought you might be a good fit for a role we're looking to fill. We're a growing company looking for talented individuals.

If you're interested, I'd love to chat. Let me know if you have time for a quick call.

Best regards,
Tom`;

const AI_MESSAGE = `Hi Sarah,

I came across your profile and was genuinely impressed by your work as a Senior Product Designer — especially your experience leading design in the fintech space at Fintech Corp.

We're building PriceMind AI, a fast-growing startup in Stockholm working on AI-powered pricing optimization. We're looking for a Lead Product Designer who can own the product experience end-to-end.

Given your background in design systems, UX strategy, and your 10/12 match score, I think you'd be a great fit.

Would you be open to a 15-minute chat this week?

Best regards,
Tom`;

const ComposeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const panelY = interpolate(panelSpring, [0, 1], [80, 0]);
  const panelScale = interpolate(panelSpring, [0, 1], [0.92, 1]);

  const genericTyped = useTypewriter(GENERIC_MESSAGE, 10, 1.8);

  const makeRelevantBtnY = 210;
  const makeRelevantBtnX = 780;

  const cursorVisible = frame > 75 && frame < 180;
  const cursorMoveProgress = interpolate(frame, [75, 100], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorX = interpolate(cursorMoveProgress, [0, 1], [500, makeRelevantBtnX]);
  const cursorY = interpolate(cursorMoveProgress, [0, 1], [600, makeRelevantBtnY]);
  const cursorClicking = frame >= 105 && frame < 113;

  const zoomProgress = interpolate(frame, [90, 115], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const cameraScale = interpolate(zoomProgress, [0, 1], [1, 1.3]);
  const cameraX = interpolate(zoomProgress, [0, 1], [0, -200]);
  const cameraCY = interpolate(zoomProgress, [0, 1], [0, -80]);

  const zoomOutProgress = interpolate(frame, [120, 145], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const cameraScaleOut = interpolate(zoomOutProgress, [0, 1], [1.3, 1]);
  const cameraXOut = interpolate(zoomOutProgress, [0, 1], [-200, 0]);
  const cameraCYOut = interpolate(zoomOutProgress, [0, 1], [-80, 0]);

  const finalCameraScale = frame < 120 ? cameraScale : cameraScaleOut;
  const finalCameraX = frame < 120 ? cameraX : cameraXOut;
  const finalCameraCY = frame < 120 ? cameraCY : cameraCYOut;

  const aiProcessing = frame >= 113 && frame < 150;
  const aiProcessingProgress = interpolate(frame, [113, 150], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const aiMessageStart = 155;
  const showAiMessage = frame >= aiMessageStart;

  const aiTyped = useTypewriter(AI_MESSAGE, aiMessageStart, 2.0, "Hi Sarah,", 12);

  const btnClicked = frame >= 105;
  const btnClickScale = btnClicked
    ? interpolate(frame - 105, [0, 4, 12], [1, 0.92, 1], { extrapolateRight: "clamp" })
    : 1;

  const aiBadgeVisible = frame > 113;
  const aiBadgeSpring = spring({ frame: frame - 113, fps, config: { damping: 14 } });
  const aiBadgeGlow = 0.6 + Math.sin(frame * 0.15) * 0.4;

  const aiTypingDone = aiTyped.length >= AI_MESSAGE.length;
  const sendSpring = spring({
    frame: aiTypingDone ? frame : -999,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const oldTextOpacity = interpolate(frame, [110, 145], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `scale(${finalCameraScale}) translate(${finalCameraX}px, ${finalCameraCY}px)`,
        transformOrigin: "center center",
      }}>
        <div style={{
          opacity: panelSpring,
          transform: `translateY(${panelY}px) scale(${panelScale})`,
          width: 920,
          background: CARD,
          borderRadius: 20,
          boxShadow: `0 30px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)`,
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            padding: "16px 28px",
            borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <ProfilePhoto src="images/sarah.jpg" size={40} />
              <div>
                <div style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>Sarah Chapman</div>
                <div style={{ fontSize: 12, color: TEXT_SEC, fontFamily: bodyFont }}>Senior Product Designer · Stockholm · 10/12 Match</div>
              </div>
            </div>

            {/* Make Relevant Button */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
            }}>
              {aiBadgeVisible && (
                <div style={{
                  background: ACCENT_BG, padding: "6px 14px", borderRadius: 20,
                  display: "flex", alignItems: "center", gap: 6,
                  opacity: aiBadgeSpring,
                  transform: `scale(${aiBadgeSpring})`,
                  boxShadow: `0 0 ${12 * aiBadgeGlow}px rgba(201, 149, 107, ${0.15 * aiBadgeGlow})`,
                }}>
                  <IconSparkles size={14} color={ACCENT_DEEP} />
                  <span style={{ fontSize: 12, color: ACCENT_DEEP, fontFamily: bodyFont }}>AI Enhanced</span>
                </div>
              )}
              <div style={{
                background: btnClicked
                  ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`
                  : ACCENT_BG,
                padding: "10px 20px", borderRadius: 12,
                display: "flex", alignItems: "center", gap: 8,
                transform: `scale(${btnClickScale})`,
                boxShadow: btnClicked ? `0 4px 16px rgba(201, 149, 107, 0.3)` : "none",
              }}>
                <IconSparkles size={16} color={btnClicked ? "#fff" : ACCENT_DEEP} />
                <span style={{
                  fontSize: 14, fontFamily: bodyFont,
                  color: btnClicked ? "#fff" : ACCENT_DEEP,
                }}>Make Relevant</span>
              </div>
            </div>
          </div>

          {/* Subject line */}
          <div style={{
            padding: "12px 28px", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 13, color: TEXT_SEC, fontFamily: bodyFont }}>Subject:</span>
            <span style={{ fontSize: 14, color: TEXT, fontFamily: bodyFont }}>
              {showAiMessage ? "Opportunity at PriceMind AI — Lead Product Designer" : "Exciting Job Opportunity"}
            </span>
          </div>

          {/* Body */}
          <div style={{
            padding: "20px 28px", minHeight: 320,
            fontSize: 14.5, fontFamily: bodyFont, color: TEXT,
            lineHeight: 1.75, whiteSpace: "pre-wrap",
            position: "relative",
          }}>
            {!showAiMessage && (
              <div style={{ opacity: frame < 110 ? 1 : oldTextOpacity }}>
                {genericTyped}
                {genericTyped.length < GENERIC_MESSAGE.length && <Cursor />}
              </div>
            )}

            {aiProcessing && !showAiMessage && (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `rgba(255,255,255,${interpolate(aiProcessingProgress, [0, 0.3], [0, 0.9], { extrapolateRight: "clamp" })})`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <IconSparkles size={16} color="#fff" />
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map((d) => (
                      <div key={d} style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: ACCENT,
                        opacity: interpolate((frame + d * 8) % 24, [0, 12, 24], [0.3, 1, 0.3]),
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 14, color: ACCENT_DEEP, fontFamily: bodyFont }}>
                    AI is personalizing your message...
                  </span>
                </div>
              </div>
            )}

            {showAiMessage && (
              <div style={{
                opacity: spring({ frame: frame - aiMessageStart, fps, config: { damping: 200 } }),
              }}>
                {aiTyped}
                {aiTyped.length < AI_MESSAGE.length && <Cursor />}
              </div>
            )}
          </div>

          {/* Bottom toolbar */}
          <div style={{
            padding: "12px 28px", borderTop: `1px solid ${BORDER}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: <IconPaperclip size={14} color={TEXT_SEC} />, label: "Attach" },
                { icon: <IconCalendar size={14} color={TEXT_SEC} />, label: "Schedule" },
                { icon: <IconRefresh size={14} color={TEXT_SEC} />, label: "Regenerate" },
              ].map((btn, i) => (
                <span key={i} style={{
                  fontSize: 13, color: TEXT_SEC, fontFamily: bodyFont,
                  background: "#f5f3ef", padding: "7px 14px", borderRadius: 10,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  {btn.icon}
                  {btn.label}
                </span>
              ))}
            </div>

            {aiTypingDone && (
              <div style={{
                transform: `scale(${sendSpring})`,
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                color: "#fff", fontSize: 14, fontFamily: bodyFont,
                padding: "10px 24px", borderRadius: 12,
                boxShadow: `0 4px 16px rgba(201, 149, 107, 0.3)`,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <IconSend size={15} />
                Send message
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatedCursor
        x={cursorX}
        y={cursorY}
        visible={cursorVisible}
        clicking={cursorClicking}
      />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 4: OUTREACH DASHBOARD — Stats + Status
// ═══════════════════════════════════════════════════════
const OutreachDashScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({ frame, fps, config: { damping: 200 } });

  const STATS = [
    { label: "Messages Sent", value: 3, color: ACCENT, icon: <IconSend size={22} color={ACCENT} /> },
    { label: "Opened", value: 2, color: "#e8a230", icon: <IconZap size={22} color="#e8a230" /> },
    { label: "Replied", value: 1, color: GREEN, icon: <IconMessageCircle size={22} color={GREEN} /> },
    { label: "Response Rate", value: 33, suffix: "%", color: GREEN, icon: <IconTrendingUp size={22} color={GREEN} /> },
  ];

  const STATUSES = [
    { name: "Sarah Chapman", status: "Replied", time: "2 min ago", statusColor: GREEN, bgColor: GREEN_BG, icon: <IconMessageCircle size={20} color={GREEN} />, photo: "images/sarah.jpg" },
    { name: "Sam Morris", status: "Opened", time: "5 min ago", statusColor: "#e8a230", bgColor: "rgba(232, 162, 48, 0.08)", icon: <IconZap size={20} color="#e8a230" />, photo: "images/sam.jpg" },
    { name: "Esther Howard", status: "Sent", time: "8 min ago", statusColor: ACCENT, bgColor: ACCENT_BG, icon: <IconSend size={20} color={ACCENT} />, photo: "images/esther.jpg" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        display: "flex", flexDirection: "column", gap: 20, alignItems: "center",
        width: 800, opacity: containerSpring,
      }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h2 style={{ fontSize: 32, fontFamily: headingFont, color: TEXT, margin: 0 }}>
            Outreach Performance
          </h2>
        </div>

        <div style={{ display: "flex", gap: 14, width: "100%" }}>
          {STATS.map((s, i) => {
            const statSpring = spring({ frame: frame - 8 - i * 8, fps, config: { damping: 18 } });
            const countUp = Math.round(
              interpolate(
                spring({ frame: frame - 15 - i * 8, fps, config: { damping: 200 } }),
                [0, 1],
                [0, s.value]
              )
            );
            return (
              <div key={i} style={{
                flex: 1, background: CARD, borderRadius: 16, padding: "20px 16px",
                textAlign: "center", border: `1px solid ${BORDER}`,
                opacity: statSpring,
                transform: `translateY(${interpolate(statSpring, [0, 1], [25, 0])}px)`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>{s.icon}</div>
                <div style={{
                  fontSize: 34, fontFamily: headingFont, color: s.color, marginTop: 4,
                }}>
                  {countUp}{s.suffix || ""}
                </div>
                <div style={{ fontSize: 12, color: TEXT_SEC, fontFamily: bodyFont, marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          {STATUSES.map((r, i) => {
            const rowDelay = 40 + i * 14;
            const rowSpring = spring({ frame: frame - rowDelay, fps, config: { damping: 18 } });
            const rowY = interpolate(rowSpring, [0, 1], [25, 0]);
            const isReply = r.status === "Replied";

            return (
              <div key={i} style={{
                background: isReply ? r.bgColor : CARD,
                borderRadius: 14, padding: "16px 22px",
                border: isReply ? `2px solid ${GREEN}30` : `1px solid ${BORDER}`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                opacity: rowSpring, transform: `translateY(${rowY}px)`,
                boxShadow: isReply ? `0 4px 20px rgba(45, 157, 92, 0.08)` : "0 1px 4px rgba(0,0,0,0.02)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <ProfilePhoto src={r.photo} size={36} />
                  <div>
                    <div style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: TEXT_SEC, fontFamily: bodyFont }}>{r.time}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: 13, color: r.statusColor, fontFamily: bodyFont,
                  background: r.bgColor, padding: "5px 14px", borderRadius: 20,
                }}>
                  {r.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 5: REPLY THREAD — Notification + conversation
// ═══════════════════════════════════════════════════════
const REPLY_TEXT = `Hi! Thanks for reaching out — I've actually been following PriceMind AI and the product challenges sound really exciting.

I'd love to learn more about the role. I'm free Thursday or Friday afternoon — would either work for a quick call?`;

const ReplyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const notifSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 120 } });
  const notifY = interpolate(notifSpring, [0, 1], [-60, 0]);

  const panelSpring = spring({ frame: frame - 15, fps, config: { damping: 20, stiffness: 80 } });
  const panelY = interpolate(panelSpring, [0, 1], [50, 0]);
  const panelScale = interpolate(panelSpring, [0, 1], [0.95, 1]);

  const sentSpring = spring({ frame: frame - 25, fps, config: { damping: 200 } });

  const replyTyped = useTypewriter(REPLY_TEXT, 45, 1.0, "really exciting.", 18);

  const replyDone = replyTyped.length >= REPLY_TEXT.length;
  const schedBtnSpring = spring({
    frame: replyDone ? frame : -999,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      {/* Notification toast */}
      <div style={{
        position: "absolute", top: 60,
        transform: `translateY(${notifY}px)`,
        opacity: notifSpring,
        background: GREEN, color: "#fff", borderRadius: 16,
        padding: "14px 28px",
        display: "flex", alignItems: "center", gap: 12,
        boxShadow: "0 10px 30px rgba(45, 157, 92, 0.25)",
        fontSize: 15, fontFamily: bodyFont,
      }}>
        <IconMessageCircle size={18} color="#fff" />
        New reply from Sarah Chapman
      </div>

      {/* Chat panel */}
      <div style={{
        opacity: panelSpring,
        transform: `translateY(${panelY}px) scale(${panelScale})`,
        width: 820,
        background: CARD,
        borderRadius: 20,
        boxShadow: `0 30px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)`,
        overflow: "hidden",
        marginTop: 40,
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 28px", borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <ProfilePhoto src="images/sarah.jpg" size={42} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontFamily: bodyFont, color: TEXT }}>Sarah Chapman</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN }} />
              <span style={{ fontSize: 12, color: GREEN, fontFamily: bodyFont }}>Online</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              <IconPhone size={16} color={TEXT_SEC} />,
              <IconVideo size={16} color={TEXT_SEC} />,
              <IconMoreHorizontal size={16} color={TEXT_SEC} />,
            ].map((icon, i) => (
              <span key={i} style={{
                width: 36, height: 36, borderRadius: 10,
                background: "#f5f3ef", display: "flex", alignItems: "center", justifyContent: "center",
              }}>{icon}</span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ padding: "24px 28px", minHeight: 300 }}>
          {/* Sent message */}
          <div style={{
            display: "flex", justifyContent: "flex-end", marginBottom: 20,
            opacity: sentSpring,
          }}>
            <div style={{
              background: ACCENT_BG,
              borderRadius: "18px 18px 4px 18px",
              padding: "14px 20px",
              maxWidth: 480,
              fontSize: 14, color: TEXT, fontFamily: bodyFont, lineHeight: 1.6,
            }}>
              Hi Sarah, I came across your profile and was impressed by your work as a Senior Product Designer, especially your experience in fintech at Fintech Corp...
              <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 8, textAlign: "right" }}>You · 10:32 AM</div>
            </div>
          </div>

          {/* Sarah's reply */}
          {replyTyped.length > 0 && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{
                background: GREEN_BG,
                borderRadius: "18px 18px 18px 4px",
                padding: "14px 20px",
                maxWidth: 480,
                fontSize: 14, color: TEXT, fontFamily: bodyFont, lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                border: `1px solid ${GREEN}15`,
              }}>
                {replyTyped}
                {replyTyped.length < REPLY_TEXT.length && <Cursor color={GREEN} />}
                <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 8 }}>Sarah · Just now</div>
              </div>
            </div>
          )}
        </div>

        {/* Schedule button */}
        {replyDone && (
          <div style={{
            padding: "12px 28px", borderTop: `1px solid ${BORDER}`,
            display: "flex", justifyContent: "center",
          }}>
            <div style={{
              transform: `scale(${schedBtnSpring})`,
              background: `linear-gradient(135deg, ${GREEN}, #238c4d)`,
              color: "#fff", fontSize: 14, fontFamily: bodyFont,
              padding: "12px 28px", borderRadius: 12,
              boxShadow: `0 6px 20px rgba(45, 157, 92, 0.25)`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <IconCalendar size={16} color="#fff" />
              Schedule Interview
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 6: OUTRO — Laidback branding
// ═══════════════════════════════════════════════════════
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });

  const words = ["Outreach", "that", "converts"];
  const wordEls = words.map((word, i) => {
    const wSpring = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 18 } });
    const wY = interpolate(wSpring, [0, 1], [50, 0]);
    return (
      <span key={i} style={{
        display: "inline-block",
        transform: `translateY(${wY}px)`,
        opacity: wSpring,
        marginRight: 16,
      }}>
        {word}
      </span>
    );
  });

  const lineW = interpolate(frame, [25, 60], [0, 200], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const urlSpring = spring({ frame: frame - 40, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 18,
          background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`,
          transform: `scale(${logoScale})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 12px 40px rgba(201, 149, 107, 0.3)`,
        }}>
          <LaidbackLogo size={42} color="#fff" />
        </div>

        <h1 style={{
          fontSize: 64, fontFamily: headingFont, color: TEXT,
          margin: 0, letterSpacing: -1,
        }}>
          {wordEls}
        </h1>

        <div style={{
          width: lineW, height: 3, borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
        }} />

        <p style={{
          fontSize: 22, fontFamily: bodyFont, color: TEXT_SEC,
          margin: 0, letterSpacing: 1,
          opacity: urlSpring,
          transform: `translateY(${interpolate(urlSpring, [0, 1], [15, 0])}px)`,
        }}>
          laidback.ai
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN VIDEO — TransitionSeries
// ═══════════════════════════════════════════════════════
export const OutreachVideoV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={80}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={220}>
          <PipelineScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={350}>
          <ComposeScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={160}>
          <OutreachDashScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={180}>
          <ReplyScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={100}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
