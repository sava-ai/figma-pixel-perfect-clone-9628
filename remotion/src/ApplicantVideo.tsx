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
loadFont({ family: "LabilGrotesk", url: staticFile("fonts/LabilGrotesk-Regular.ttf"), weight: "400" });

const headingFont = "CooperLight, serif";
const bodyFont = "LabilGrotesk, sans-serif";

const BG = "#f6f4f0";
const CARD = "#ffffff";
const TEXT = "#333333";
const TEXT_SEC = "#7a7570";
const ACCENT = "#c9956b";
const ACCENT_DEEP = "#a87a55";
const GREEN = "#2d9d5c";
const GREEN_BG = "rgba(45, 157, 92, 0.08)";
const BORDER = "#ece8e2";
const BLUE = "#4a7cff";
const BLUE_BG = "rgba(74, 124, 255, 0.08)";
const PURPLE = "#7c5cbf";
const PURPLE_BG = "rgba(124, 92, 191, 0.08)";
const ORANGE = "#e8853d";
const ORANGE_BG = "rgba(232, 133, 61, 0.08)";

// Real profile photos
const APPLICANT_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face";

// ── Icons ──
const IconSparkles: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />
  </svg>
);
const IconCheck: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = GREEN }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IconFileText: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
  </svg>
);
const IconPlay: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);
const IconUpload: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const IconTarget: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IconCalendar: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
  </svg>
);
const IconClipboard: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

// ── Typewriter hook ──
const useTypewriter = (text: string, frame: number, startFrame: number, speed = 1.5) => {
  const charsToShow = Math.floor(Math.max(0, (frame - startFrame) * speed));
  return text.slice(0, Math.min(charsToShow, text.length));
};

// ── Animated Cursor ──
const AnimatedCursor: React.FC<{ x: number; y: number; frame: number; clickFrame?: number }> = ({ x, y, frame, clickFrame }) => {
  const clickScale = clickFrame !== undefined
    ? interpolate(frame, [clickFrame, clickFrame + 4, clickFrame + 12], [1, 0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const clickRipple = clickFrame !== undefined
    ? interpolate(frame, [clickFrame, clickFrame + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 9999, pointerEvents: "none", transform: `scale(${clickScale})` }}>
      {clickRipple > 0 && clickRipple < 1 && (
        <div style={{ position: "absolute", left: -15, top: -15, width: 30, height: 30, borderRadius: "50%", border: `2px solid ${ACCENT}`, opacity: 1 - clickRipple, transform: `scale(${1 + clickRipple * 2})` }} />
      )}
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
        <path d="M5.5 2L5.5 20.5L9.5 16.5L14 24L17.5 22L13 14.5L18.5 14.5L5.5 2Z" fill={ACCENT_DEEP} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// ── Photo Avatar ──
const PhotoAvatar: React.FC<{ src: string; size?: number }> = ({ src, size = 36 }) => (
  <Img src={src} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
);

// ── Logotype Header ──
const LogoHeader: React.FC<{ rightContent?: React.ReactNode }> = ({ rightContent }) => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 72, background: CARD, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 60px", gap: 12, zIndex: 10 }}>
    <Img src={staticFile("images/logotype.svg")} style={{ height: 32 }} />
    {rightContent && <><div style={{ flex: 1 }} />{rightContent}</>}
  </div>
);

// ── Camera Zoom Wrapper ──
const CameraZoom: React.FC<{
  children: React.ReactNode;
  frame: number;
  fps: number;
  zoomStart: number;
  zoomEnd: number;
  fromScale?: number;
  toScale?: number;
  originX?: string;
  originY?: string;
}> = ({ children, frame, fps, zoomStart, zoomEnd, fromScale = 1, toScale = 1.15, originX = "50%", originY = "40%" }) => {
  const zoomProgress = interpolate(frame, [zoomStart, zoomEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const scale = interpolate(zoomProgress, [0, 1], [fromScale, toScale]);
  return (
    <div style={{ width: "100%", height: "100%", transform: `scale(${scale})`, transformOrigin: `${originX} ${originY}` }}>
      {children}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// SCENE 1: Career Page Landing — Conversational Self-Selection
// ════════════════════════════════════════════════════════════════
const CareerPageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageIn = spring({ frame, fps, config: { damping: 200 } });

  const msgs = [
    { role: "ai" as const, text: "Hi! I'm Laidback's career assistant. Tell me about yourself and what kind of role excites you.", start: 20 },
    { role: "user" as const, text: "I'm a product designer with 6 years of experience, focused on design systems and fintech.", start: 70 },
    { role: "ai" as const, text: "Great match! We have 2 open roles that align with your profile:", start: 120 },
  ];

  const rolesStart = 160;
  const roles = [
    { title: "Senior Product Designer", team: "Design Systems", location: "Remote · EU", match: "Strong match" },
    { title: "Lead Designer, Fintech", team: "Payments", location: "London · Hybrid", match: "Great match" },
  ];

  const selectFrame = 200;
  const selectMsg = { role: "user" as const, text: "The Senior Product Designer role looks perfect — I'd love to apply!", start: 215 };
  const confirmMsg = { role: "ai" as const, text: "Excellent choice! Let me walk you through a quick screening to get started.", start: 255 };

  const cursorX = interpolate(frame, [185, 200], [960, 560], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });
  const cursorY = interpolate(frame, [185, 200], [400, 530], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });

  // Zoom into chat area at the end of scene
  const zoomStart = 240;
  const zoomScale = interpolate(frame, [zoomStart, zoomStart + 60], [1, 1.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });

  return (
    <AbsoluteFill style={{ background: BG, transform: `scale(${zoomScale})`, transformOrigin: "50% 60%" }}>
      <LogoHeader rightContent={
        <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC }}>Open positions</span>
      } />

      <div style={{ position: "absolute", top: 100, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 820, display: "flex", flexDirection: "column", gap: 0 }}>
          {msgs.map((msg, i) => {
            const msgSpring = spring({ frame: frame - msg.start, fps, config: { damping: 28, stiffness: 180 } });
            if (frame < msg.start) return null;
            const typed = useTypewriter(msg.text, frame, msg.start + 8, 2);
            return (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 20, opacity: msgSpring, transform: `translateY(${(1 - msgSpring) * 12}px)`, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "ai" ? (
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconSparkles size={18} color="#fff" />
                  </div>
                ) : (
                  <PhotoAvatar src={APPLICANT_PHOTO} size={38} />
                )}
                <div style={{
                  maxWidth: 560, padding: "14px 20px",
                  borderRadius: msg.role === "ai" ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                  background: msg.role === "ai" ? CARD : ACCENT,
                  color: msg.role === "ai" ? TEXT : "#fff",
                  fontFamily: bodyFont, fontSize: 16, lineHeight: 1.6,
                  border: msg.role === "ai" ? `1px solid ${BORDER}` : "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  {typed}
                </div>
              </div>
            );
          })}

          {frame >= rolesStart && (
            <div style={{ display: "flex", gap: 16, marginTop: 8, marginLeft: 50 }}>
              {roles.map((role, i) => {
                const cardSpring = spring({ frame: frame - rolesStart - i * 12, fps, config: { damping: 22, stiffness: 180 } });
                const isSelected = frame >= selectFrame && i === 0;
                return (
                  <div key={i} style={{
                    flex: 1, padding: "20px 24px", borderRadius: 16, background: CARD,
                    border: `2px solid ${isSelected ? ACCENT : BORDER}`,
                    opacity: cardSpring, transform: `translateY(${(1 - cardSpring) * 18}px) scale(${isSelected ? 1.02 : 1})`,
                    boxShadow: isSelected ? `0 4px 24px ${ACCENT}20` : "0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                    <div style={{ fontFamily: headingFont, fontSize: 17, color: TEXT, marginBottom: 8 }}>{role.title}</div>
                    <div style={{ fontFamily: bodyFont, fontSize: 13, color: TEXT_SEC, marginBottom: 4 }}>{role.team} · {role.location}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 20, background: GREEN_BG, marginTop: 8 }}>
                      <IconCheck size={12} />
                      <span style={{ fontFamily: bodyFont, fontSize: 12, color: GREEN }}>{role.match}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {frame >= selectMsg.start && (() => {
            const msgSpring = spring({ frame: frame - selectMsg.start, fps, config: { damping: 28 } });
            const typed = useTypewriter(selectMsg.text, frame, selectMsg.start + 8, 2);
            return (
              <div style={{ display: "flex", gap: 12, marginTop: 20, opacity: msgSpring, transform: `translateY(${(1 - msgSpring) * 12}px)`, flexDirection: "row-reverse" }}>
                <PhotoAvatar src={APPLICANT_PHOTO} size={38} />
                <div style={{ maxWidth: 560, padding: "14px 20px", borderRadius: "18px 4px 18px 18px", background: ACCENT, color: "#fff", fontFamily: bodyFont, fontSize: 16, lineHeight: 1.6 }}>
                  {typed}
                </div>
              </div>
            );
          })()}

          {frame >= confirmMsg.start && (() => {
            const msgSpring = spring({ frame: frame - confirmMsg.start, fps, config: { damping: 28 } });
            const typed = useTypewriter(confirmMsg.text, frame, confirmMsg.start + 8, 2);
            return (
              <div style={{ display: "flex", gap: 12, marginTop: 20, opacity: msgSpring, transform: `translateY(${(1 - msgSpring) * 12}px)` }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconSparkles size={18} color="#fff" />
                </div>
                <div style={{ maxWidth: 560, padding: "14px 20px", borderRadius: "4px 18px 18px 18px", background: CARD, color: TEXT, fontFamily: bodyFont, fontSize: 16, lineHeight: 1.6, border: `1px solid ${BORDER}` }}>
                  {typed}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {frame >= 185 && frame < 220 && <AnimatedCursor x={cursorX} y={cursorY} frame={frame} clickFrame={200} />}
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════
// SCENE 2: AI Pre-Screening
// ════════════════════════════════════════════════════════════════
const PreScreeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Start zoomed in, slowly zoom out to reveal assessment
  const zoomScale = interpolate(frame, [0, 40, 170, 260], [1.1, 1, 1, 1.08], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });
  const panY = interpolate(frame, [0, 40, 170, 260], [-20, 0, 0, -15], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });

  const msgs = [
    { role: "ai" as const, text: "Let's start with a quick screening. What's your experience with design tokens and component libraries?", start: 15 },
    { role: "user" as const, text: "I've built a design system from scratch at Stripe, serving 200+ components used by 40 engineers.", start: 65 },
    { role: "ai" as const, text: "Impressive! How do you approach collaboration with engineering teams on design handoff?", start: 110 },
    { role: "user" as const, text: "I use Figma dev mode and maintain a shared Storybook. I run weekly syncs with eng leads.", start: 150 },
  ];

  const assessmentStart = 195;
  const assessmentSpring = spring({ frame: frame - assessmentStart, fps, config: { damping: 22 } });

  const criteria = [
    { label: "Design Systems", verdict: "Exceeds" },
    { label: "Cross-functional Collaboration", verdict: "Strong" },
    { label: "Technical Fluency", verdict: "Strong" },
    { label: "Industry Experience", verdict: "Exceeds" },
  ];

  return (
    <AbsoluteFill style={{ background: BG, transform: `scale(${zoomScale}) translateY(${panY}px)`, transformOrigin: "50% 45%" }}>
      <LogoHeader rightContent={
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: BLUE_BG }}>
          <IconTarget size={14} color={BLUE} />
          <span style={{ fontFamily: bodyFont, fontSize: 13, color: BLUE }}>Pre-Screening</span>
        </div>
      } />

      <div style={{ position: "absolute", top: 100, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 820, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <IconSparkles size={16} color={ACCENT} />
            <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC }}>AI is assessing your fit for Senior Product Designer</span>
          </div>

          {msgs.map((msg, i) => {
            const msgSpring = spring({ frame: frame - msg.start, fps, config: { damping: 28, stiffness: 180 } });
            if (frame < msg.start) return null;
            const typed = useTypewriter(msg.text, frame, msg.start + 8, 2.2);
            return (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 18, opacity: msgSpring, transform: `translateY(${(1 - msgSpring) * 12}px)`, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "ai" ? (
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconSparkles size={18} color="#fff" />
                  </div>
                ) : (
                  <PhotoAvatar src={APPLICANT_PHOTO} size={38} />
                )}
                <div style={{
                  maxWidth: 540, padding: "14px 20px",
                  borderRadius: msg.role === "ai" ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                  background: msg.role === "ai" ? CARD : ACCENT,
                  color: msg.role === "ai" ? TEXT : "#fff",
                  fontFamily: bodyFont, fontSize: 16, lineHeight: 1.6,
                  border: msg.role === "ai" ? `1px solid ${BORDER}` : "none",
                }}>
                  {typed}
                </div>
              </div>
            );
          })}

          {frame >= assessmentStart && (
            <div style={{
              marginTop: 20, marginLeft: 50, padding: "24px 28px", borderRadius: 18,
              background: CARD, border: `1px solid ${BORDER}`,
              opacity: assessmentSpring, transform: `translateY(${(1 - assessmentSpring) * 18}px)`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <IconSparkles size={18} color={ACCENT} />
                <span style={{ fontFamily: headingFont, fontSize: 18, color: TEXT }}>Screening Assessment</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {criteria.map((c, i) => {
                  const cSpring = spring({ frame: frame - assessmentStart - 10 - i * 8, fps, config: { damping: 22 } });
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 16px", borderRadius: 12,
                      background: c.verdict === "Exceeds" ? GREEN_BG : BLUE_BG,
                      border: `1px solid ${c.verdict === "Exceeds" ? `${GREEN}15` : `${BLUE}15`}`,
                      opacity: cSpring, transform: `translateY(${(1 - cSpring) * 8}px)`,
                    }}>
                      <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT }}>{c.label}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <IconCheck size={13} color={c.verdict === "Exceeds" ? GREEN : BLUE} />
                        <span style={{ fontFamily: bodyFont, fontSize: 13, color: c.verdict === "Exceeds" ? GREEN : BLUE, fontWeight: 500 }}>{c.verdict}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════
// SCENE 3: Pipeline Progress Dashboard
// ════════════════════════════════════════════════════════════════
const PipelineDashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageIn = spring({ frame, fps, config: { damping: 200 } });

  // Slow drift zoom towards the cards
  const zoomScale = interpolate(frame, [0, 250], [1, 1.06], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });

  const steps = [
    { label: "Applied", icon: <IconCheck size={16} color="#fff" />, status: "done" as const, date: "Mar 12" },
    { label: "Pre-Screening", icon: <IconCheck size={16} color="#fff" />, status: "done" as const, date: "Mar 12" },
    { label: "Design Task", icon: <IconClipboard size={16} color={ORANGE} />, status: "current" as const, date: "Due Mar 18" },
    { label: "Interview", icon: <IconCalendar size={16} color={TEXT_SEC} />, status: "upcoming" as const, date: "Mar 22" },
    { label: "Final Review", icon: <IconTarget size={16} color={TEXT_SEC} />, status: "upcoming" as const, date: "Mar 25" },
  ];

  const taskNotifStart = 60;
  const taskSpring = spring({ frame: frame - taskNotifStart, fps, config: { damping: 18, stiffness: 160 } });

  const prepStart = 120;
  const prepSpring = spring({ frame: frame - prepStart, fps, config: { damping: 22 } });

  return (
    <AbsoluteFill style={{ background: BG, transform: `scale(${zoomScale})`, transformOrigin: "50% 65%" }}>
      <LogoHeader rightContent={
        <>
          <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC }}>My Applications</span>
          <PhotoAvatar src={APPLICANT_PHOTO} size={32} />
        </>
      } />

      <div style={{ position: "absolute", top: 100, left: 80, right: 80, bottom: 60 }}>
        <div style={{ marginBottom: 40, opacity: pageIn }}>
          <div style={{ fontFamily: headingFont, fontSize: 32, color: TEXT, marginBottom: 6 }}>Senior Product Designer</div>
          <div style={{ fontFamily: bodyFont, fontSize: 16, color: TEXT_SEC }}>Design Systems · Remote EU · Applied 3 days ago</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 50, padding: "0 20px" }}>
          {steps.map((step, i) => {
            const stepSpring = spring({ frame: frame - 15 - i * 8, fps, config: { damping: 22 } });
            const isDone = step.status === "done";
            const isCurrent = step.status === "current";
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, opacity: stepSpring }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: isDone ? GREEN : isCurrent ? ORANGE : `${BORDER}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: isCurrent ? `3px solid ${ORANGE}40` : "none",
                    boxShadow: isCurrent ? `0 0 0 6px ${ORANGE}15` : "none",
                  }}>
                    {step.icon}
                  </div>
                  <span style={{ fontFamily: bodyFont, fontSize: 13, color: isCurrent ? ORANGE : isDone ? GREEN : TEXT_SEC, fontWeight: isCurrent ? 600 : 400 }}>{step.label}</span>
                  <span style={{ fontFamily: bodyFont, fontSize: 11, color: TEXT_SEC }}>{step.date}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: isDone ? GREEN : BORDER, marginTop: -26, marginLeft: 8, marginRight: 8 }} />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          <div style={{
            flex: 1, padding: "24px 28px", borderRadius: 18,
            background: CARD, border: `1px solid ${BORDER}`,
            opacity: taskSpring, transform: `translateY(${(1 - taskSpring) * 18}px)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: ORANGE_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconClipboard size={16} color={ORANGE} />
              </div>
              <div>
                <div style={{ fontFamily: headingFont, fontSize: 17, color: TEXT }}>Design Task</div>
                <div style={{ fontFamily: bodyFont, fontSize: 12, color: TEXT_SEC }}>Due in 6 days</div>
              </div>
            </div>
            <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT, lineHeight: 1.7, marginBottom: 16 }}>
              Create a design system component for a payment confirmation flow. Include states, variants, and documentation.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ padding: "8px 18px", borderRadius: 10, background: ORANGE, color: "#fff", fontFamily: bodyFont, fontSize: 13, fontWeight: 500 }}>Submit Task</div>
              <div style={{ padding: "8px 18px", borderRadius: 10, background: "transparent", border: `1px solid ${BORDER}`, color: TEXT, fontFamily: bodyFont, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <IconUpload size={14} color={TEXT_SEC} />
                Upload files
              </div>
            </div>
          </div>

          <div style={{
            flex: 1, padding: "24px 28px", borderRadius: 18,
            background: CARD, border: `1px solid ${BORDER}`,
            opacity: prepSpring, transform: `translateY(${(1 - prepSpring) * 18}px)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: PURPLE_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconFileText size={16} color={PURPLE} />
              </div>
              <div>
                <div style={{ fontFamily: headingFont, fontSize: 17, color: TEXT }}>Interview Prep Notes</div>
                <div style={{ fontFamily: bodyFont, fontSize: 12, color: TEXT_SEC }}>AI-generated for your next step</div>
              </div>
            </div>
            {[
              "Review Laidback's design system principles",
              "Prepare case study: Stripe component library",
              "Study accessibility patterns for fintech",
              "Practice presenting design decisions",
            ].map((note, i) => {
              const noteSpring = spring({ frame: frame - prepStart - 15 - i * 8, fps, config: { damping: 22 } });
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  borderRadius: 10, background: i % 2 === 0 ? PURPLE_BG : "transparent",
                  marginBottom: 6, opacity: noteSpring, transform: `translateX(${(1 - noteSpring) * 12}px)`,
                }}>
                  <IconCheck size={13} color={PURPLE} />
                  <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT }}>{note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════
// SCENE 4: Practice & Preparation
// ════════════════════════════════════════════════════════════════
const PracticeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zoom from feedback panel towards readiness score
  const zoomScale = interpolate(frame, [0, 30, 180, 230], [1.08, 1, 1, 1.1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });

  const msgs = [
    { role: "ai" as const, text: "Let's practice! Walk me through how you'd approach building a component library from scratch.", start: 15 },
    { role: "user" as const, text: "I'd start with an audit of existing patterns, then define core primitives — color tokens, spacing scale, typography...", start: 60 },
    { role: "ai" as const, text: "Good structure! The interviewer will likely probe deeper on governance. How do you handle contribution workflows?", start: 110 },
  ];

  const feedbackStart = 150;
  const feedbackSpring = spring({ frame: frame - feedbackStart, fps, config: { damping: 22 } });

  const feedback = [
    { area: "Structure", rating: "Strong", color: GREEN },
    { area: "Depth", rating: "Good — add more examples", color: BLUE },
    { area: "Storytelling", rating: "Practice more concisely", color: ORANGE },
  ];

  return (
    <AbsoluteFill style={{ background: BG, transform: `scale(${zoomScale})`, transformOrigin: "75% 55%" }}>
      <LogoHeader rightContent={
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: PURPLE_BG }}>
          <IconPlay size={13} color={PURPLE} />
          <span style={{ fontFamily: bodyFont, fontSize: 13, color: PURPLE }}>Practice Mode</span>
        </div>
      } />

      <div style={{ position: "absolute", top: 100, left: 0, right: 0, bottom: 0, display: "flex", gap: 30, padding: "0 80px" }}>
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: headingFont, fontSize: 24, color: TEXT, marginBottom: 6 }}>Practice Interview</div>
          <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC, marginBottom: 24 }}>AI simulates real interview questions for your role</div>

          {msgs.map((msg, i) => {
            const msgSpring = spring({ frame: frame - msg.start, fps, config: { damping: 28 } });
            if (frame < msg.start) return null;
            const typed = useTypewriter(msg.text, frame, msg.start + 8, 2);
            return (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 18, opacity: msgSpring, transform: `translateY(${(1 - msgSpring) * 12}px)`, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "ai" ? (
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: PURPLE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconPlay size={15} color="#fff" />
                  </div>
                ) : (
                  <PhotoAvatar src={APPLICANT_PHOTO} size={38} />
                )}
                <div style={{
                  maxWidth: 480, padding: "14px 20px",
                  borderRadius: msg.role === "ai" ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                  background: msg.role === "ai" ? CARD : ACCENT,
                  color: msg.role === "ai" ? TEXT : "#fff",
                  fontFamily: bodyFont, fontSize: 16, lineHeight: 1.6,
                  border: msg.role === "ai" ? `1px solid ${BORDER}` : "none",
                }}>
                  {typed}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ flex: 0.8, opacity: feedbackSpring, transform: `translateX(${(1 - feedbackSpring) * 25}px)` }}>
          <div style={{
            padding: "24px 28px", borderRadius: 18,
            background: CARD, border: `1px solid ${BORDER}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <IconSparkles size={16} color={ACCENT} />
              <span style={{ fontFamily: headingFont, fontSize: 18, color: TEXT }}>AI Feedback</span>
            </div>
            {feedback.map((f, i) => {
              const fSpring = spring({ frame: frame - feedbackStart - 10 - i * 10, fps, config: { damping: 22 } });
              return (
                <div key={i} style={{
                  padding: "14px 16px", borderRadius: 12, marginBottom: 10,
                  background: `${f.color}08`, border: `1px solid ${f.color}15`,
                  opacity: fSpring, transform: `translateY(${(1 - fSpring) * 8}px)`,
                }}>
                  <div style={{ fontFamily: bodyFont, fontSize: 13, color: TEXT_SEC, marginBottom: 4 }}>{f.area}</div>
                  <div style={{ fontFamily: bodyFont, fontSize: 15, color: f.color, fontWeight: 500 }}>{f.rating}</div>
                </div>
              );
            })}

            {frame >= feedbackStart + 50 && (() => {
              const scoreSpring = spring({ frame: frame - feedbackStart - 50, fps, config: { damping: 18 } });
              return (
                <div style={{
                  marginTop: 16, padding: "16px", borderRadius: 12, background: GREEN_BG,
                  border: `1px solid ${GREEN}15`, textAlign: "center" as const,
                  opacity: scoreSpring, transform: `scale(${0.92 + scoreSpring * 0.08})`,
                }}>
                  <div style={{ fontFamily: headingFont, fontSize: 28, color: GREEN }}>7.5/10</div>
                  <div style={{ fontFamily: bodyFont, fontSize: 13, color: TEXT_SEC }}>Readiness Score</div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════
// SCENE 5: Task Submission & All-in-One Hub
// ════════════════════════════════════════════════════════════════
const TaskHubScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageIn = spring({ frame, fps, config: { damping: 200 } });

  // Zoom out slightly to show full overview, then zoom into success
  const zoomScale = interpolate(frame, [0, 30, 90, 130, 250], [1.06, 1, 1, 1.04, 1.08], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });

  const files = [
    { name: "payment-flow.fig", size: "2.4 MB", icon: "🎨", uploadFrame: 25 },
    { name: "component-docs.pdf", size: "890 KB", icon: "📄", uploadFrame: 40 },
    { name: "prototype-video.mp4", size: "12 MB", icon: "🎬", uploadFrame: 55 },
  ];

  const confirmStart = 100;
  const confirmSpring = spring({ frame: frame - confirmStart, fps, config: { damping: 18 } });

  const timelineStart = 140;

  const timeline = [
    { label: "Task submitted", time: "Just now", color: GREEN, icon: <IconCheck size={14} color="#fff" /> },
    { label: "Interview scheduled", time: "Mar 22, 2:00 PM", color: BLUE, icon: <IconCalendar size={14} color="#fff" /> },
    { label: "Prep notes updated", time: "Mar 21", color: PURPLE, icon: <IconFileText size={14} color="#fff" /> },
    { label: "Pre-screening passed", time: "Mar 12", color: GREEN, icon: <IconCheck size={14} color="#fff" /> },
  ];

  return (
    <AbsoluteFill style={{ background: BG, transform: `scale(${zoomScale})`, transformOrigin: "40% 50%" }}>
      <LogoHeader rightContent={
        <>
          <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC }}>My Applications</span>
          <PhotoAvatar src={APPLICANT_PHOTO} size={32} />
        </>
      } />

      <div style={{ position: "absolute", top: 100, left: 80, right: 80, bottom: 60, display: "flex", gap: 30 }}>
        <div style={{ flex: 1.2 }}>
          <div style={{ fontFamily: headingFont, fontSize: 24, color: TEXT, marginBottom: 6, opacity: pageIn }}>Design Task Submission</div>
          <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC, marginBottom: 24, opacity: pageIn }}>Upload your files — everything stays in one place</div>

          <div style={{
            padding: "32px", borderRadius: 18, background: CARD,
            border: `2px dashed ${BORDER}`, marginBottom: 20, opacity: pageIn,
            textAlign: "center" as const,
          }}>
            <IconUpload size={28} color={TEXT_SEC} />
            <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC, marginTop: 10 }}>Drop files here or click to browse</div>
          </div>

          {files.map((file, i) => {
            const fSpring = spring({ frame: frame - file.uploadFrame, fps, config: { damping: 22 } });
            if (frame < file.uploadFrame) return null;
            const progress = interpolate(frame, [file.uploadFrame, file.uploadFrame + 30], [0, 100], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                borderRadius: 12, background: CARD, border: `1px solid ${BORDER}`,
                marginBottom: 8, opacity: fSpring, transform: `translateX(${(1 - fSpring) * -15}px)`,
              }}>
                <span style={{ fontSize: 20 }}>{file.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT }}>{file.name}</div>
                  <div style={{ fontFamily: bodyFont, fontSize: 12, color: TEXT_SEC }}>{file.size}</div>
                </div>
                {progress >= 100 ? (
                  <IconCheck size={16} color={GREEN} />
                ) : (
                  <div style={{ width: 60, height: 4, borderRadius: 2, background: BORDER }}>
                    <div style={{ width: `${progress}%`, height: "100%", borderRadius: 2, background: ACCENT }} />
                  </div>
                )}
              </div>
            );
          })}

          {frame >= confirmStart && (
            <div style={{
              marginTop: 16, padding: "16px 24px", borderRadius: 14,
              background: GREEN_BG, border: `1px solid ${GREEN}20`,
              display: "flex", alignItems: "center", gap: 12,
              opacity: confirmSpring, transform: `scale(${0.95 + confirmSpring * 0.05})`,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconCheck size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: bodyFont, fontSize: 15, color: GREEN, fontWeight: 500 }}>Task submitted successfully!</div>
                <div style={{ fontFamily: bodyFont, fontSize: 13, color: TEXT_SEC }}>The hiring team has been notified</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 0.8 }}>
          <div style={{
            padding: "24px 28px", borderRadius: 18,
            background: CARD, border: `1px solid ${BORDER}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}>
            <div style={{ fontFamily: headingFont, fontSize: 18, color: TEXT, marginBottom: 20 }}>Your Journey</div>
            {timeline.map((item, i) => {
              const tSpring = spring({ frame: frame - timelineStart - i * 12, fps, config: { damping: 22 } });
              return (
                <div key={i} style={{
                  display: "flex", gap: 14, marginBottom: 18, opacity: tSpring, transform: `translateX(${(1 - tSpring) * 12}px)`,
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: item.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.icon}
                    </div>
                    {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, background: BORDER, marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingTop: 2 }}>
                    <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT, fontWeight: 500 }}>{item.label}</div>
                    <div style={{ fontFamily: bodyFont, fontSize: 12, color: TEXT_SEC }}>{item.time}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {frame >= timelineStart + 60 && (() => {
            const nextSpring = spring({ frame: frame - timelineStart - 60, fps, config: { damping: 18 } });
            return (
              <div style={{
                marginTop: 16, padding: "20px 24px", borderRadius: 16,
                background: BLUE_BG, border: `1px solid ${BLUE}15`,
                opacity: nextSpring, transform: `translateY(${(1 - nextSpring) * 12}px)`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <IconCalendar size={16} color={BLUE} />
                  <span style={{ fontFamily: bodyFont, fontSize: 14, color: BLUE, fontWeight: 500 }}>Next: Interview</span>
                </div>
                <div style={{ fontFamily: bodyFont, fontSize: 13, color: TEXT_SEC }}>March 22 at 2:00 PM with Sarah K. (Design Lead)</div>
                <div style={{ fontFamily: bodyFont, fontSize: 12, color: BLUE, marginTop: 6 }}>Prep notes ready →</div>
              </div>
            );
          })()}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ════════════════════════════════════════════════════════════════
export const ApplicantVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={300}>
          <CareerPageScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={270}>
          <PreScreeningScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={260}>
          <PipelineDashboardScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={240}>
          <PracticeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={260}>
          <TaskHubScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
