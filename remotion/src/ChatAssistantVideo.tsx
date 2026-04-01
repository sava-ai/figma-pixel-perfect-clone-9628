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
loadFont({
  family: "CooperLight",
  url: staticFile("fonts/CooperLtBTLight.ttf"),
  weight: "400",
});
loadFont({
  family: "Inter",
  url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2",
  weight: "400",
});
loadFont({
  family: "Inter",
  url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiA.woff2",
  weight: "600",
});

const headingFont = "CooperLight, serif";
const bodyFont = "Inter, sans-serif";

// ── Colors (same as outreach video) ──
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
const CHAT_BG = "#FAF8F4";

// ── Laidback Logo ──
const LaidbackLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <img src={staticFile("images/logolaidback.svg")} style={{ width: size, height: size * 0.74, objectFit: "contain" }} />
);

// ── SVG Icons ──
const IconSparkles: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" />
    <path d="M4 17v2" /><path d="M5 18H3" />
  </svg>
);

const IconSearch: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const IconCheck: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const IconArrowUp: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
  </svg>
);

const IconMessageSquare: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconScale: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

const IconRefresh: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const IconChevronRight: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// ── Profile Photo Component ──
const ProfilePhoto: React.FC<{ src: string; size: number; border?: boolean }> = ({ src, size, border = true }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    overflow: "hidden", flexShrink: 0,
    border: border ? `2px solid ${BORDER}` : "none",
  }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

// ── Animated Cursor ──
const AnimatedCursor: React.FC<{
  x: number; y: number; visible: boolean; clicking?: boolean;
}> = ({ x, y, visible, clicking = false }) => {
  const frame = useCurrentFrame();
  if (!visible) return null;
  const clickScale = clicking ? 0.85 : 1;
  const rippleOpacity = clicking ? interpolate(frame % 20, [0, 20], [0.6, 0], { extrapolateRight: "clamp" }) : 0;
  const rippleScale = clicking ? interpolate(frame % 20, [0, 20], [1, 2.5], { extrapolateRight: "clamp" }) : 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 9999, pointerEvents: "none" }}>
      {clicking && <div style={{ position: "absolute", width: 30, height: 30, borderRadius: "50%", border: `2px solid ${ACCENT}`, opacity: rippleOpacity, transform: `translate(-50%, -50%) scale(${rippleScale})`, left: 4, top: 4 }} />}
      <svg width={24} height={24} viewBox="0 0 24 24" style={{ transform: `scale(${clickScale})`, filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.3))" }}>
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36Z" fill="#fff" stroke="#1a1817" strokeWidth={1.5} />
      </svg>
    </div>
  );
};

// ── Helpers ──
const useTypewriter = (text: string, startFrame: number, charsPerFrame = 0.8) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const chars = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
  return text.slice(0, chars);
};

const Cursor: React.FC<{ color?: string }> = ({ color = ACCENT }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame % 16, [0, 8, 16], [1, 0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <span style={{ display: "inline-block", width: 2.5, height: "1.1em", background: color, marginLeft: 2, opacity, verticalAlign: "text-bottom" }} />;
};

// ═══════════════════════════════════════════════════════
// SCENE 1: INTRO — Sparkle icon + "Chat assistant"
// 90 frames
// ═══════════════════════════════════════════════════════
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconScale = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });
  const iconRotate = interpolate(spring({ frame, fps, config: { damping: 15, stiffness: 60 } }), [0, 1], [-20, 0]);

  // Sparkle particles around logo
  const sparkles = [
    { x: -35, y: -40, delay: 5, size: 14 },
    { x: 40, y: -30, delay: 10, size: 10 },
    { x: -25, y: 35, delay: 15, size: 8 },
  ];

  const titleSpring = spring({ frame: frame - 15, fps, config: { damping: 18, stiffness: 100 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  const subtitleSpring = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [20, 0]);

  const lineW = interpolate(frame, [25, 60], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });

  const orb1Y = Math.sin(frame * 0.05) * 8;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 180 + orb1Y, right: 350, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 70%)` }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        {/* Sparkle icon with particles */}
        <div style={{ position: "relative", transform: `scale(${iconScale}) rotate(${iconRotate}deg)` }}>
          <div style={{
            width: 100, height: 100, borderRadius: 24,
            background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 16px 50px rgba(201, 149, 107, 0.35)`,
          }}>
            <LaidbackLogo size={55} />
          </div>
          {sparkles.map((s, i) => {
            const sSpring = spring({ frame: frame - s.delay, fps, config: { damping: 12 } });
            const sFloat = Math.sin((frame + i * 20) * 0.08) * 3;
            return (
              <div key={i} style={{
                position: "absolute", left: `calc(50% + ${s.x}px)`, top: `calc(50% + ${s.y + sFloat}px)`,
                opacity: sSpring * 0.7, transform: `scale(${sSpring})`,
              }}>
                <IconSparkles size={s.size} color={ACCENT} />
              </div>
            );
          })}
        </div>

        <h1 style={{
          fontSize: 72, fontFamily: headingFont, color: TEXT,
          margin: 0, letterSpacing: -2, lineHeight: 1.1,
          transform: `translateY(${titleY}px)`, opacity: titleSpring,
        }}>
          Chat assistant
        </h1>

        <div style={{ width: lineW, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />

        <p style={{
          fontSize: 22, fontFamily: bodyFont, color: TEXT_SEC, margin: 0,
          opacity: subtitleSpring, transform: `translateY(${subtitleY}px)`,
        }}>
          Your AI-powered hiring copilot
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 2: CHAT PANEL — User asks, AI responds with results
// 280 frames
// ═══════════════════════════════════════════════════════
const ChatPanelScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSlide = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const panelX = interpolate(panelSlide, [0, 1], [-600, 0]);

  // User message appears
  const userMsg = "Find candidates similar to Sarah Chen";
  const userTyped = useTypewriter(userMsg, 20, 1.0);
  const userMsgDone = userTyped.length >= userMsg.length;

  // Reference profile card appears after user message
  const refCardSpring = spring({ frame: frame - 60, fps, config: { damping: 16, stiffness: 100 } });

  // Thinking dots (frame 85-115)
  const thinkingStart = 85;
  const thinkingEnd = 120;
  const showThinking = frame >= thinkingStart && frame < thinkingEnd;

  // AI response types in
  const aiText1 = "I found 24 candidates with a similar profile to Sarah Chen — strong in B2B sales, CRM tools, and SaaS experience. 2 have already applied.";
  const aiTyped1 = useTypewriter(aiText1, 125, 1.5);
  const ai1Done = aiTyped1.length >= aiText1.length;

  // Search result card appears
  const searchCardSpring = spring({ frame: frame - 175, fps, config: { damping: 16, stiffness: 100 } });

  // Second AI text
  const aiText2 = "Save 6 standout profiles now to kick off conversations while interest is fresh.";
  const aiTyped2 = useTypewriter(aiText2, 200, 1.2);
  const ai2Done = aiTyped2.length >= aiText2.length;

  // Save button
  const saveBtnSpring = spring({ frame: frame - 250, fps, config: { damping: 14, stiffness: 100 } });

  // Camera zoom into chat
  const zoomProgress = interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const cameraScale = interpolate(zoomProgress, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)` }}>
      <div style={{ transform: `scale(${cameraScale})`, transformOrigin: "center center", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Chat panel */}
        <div style={{
          width: 580, height: 720, background: CHAT_BG,
          borderRadius: 24, boxShadow: `0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)`,
          transform: `translateX(${panelX}px)`,
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          {/* Tab header */}
          <div style={{ padding: "20px 28px 0 28px", display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: `2px solid ${TEXT}`, paddingBottom: 12 }}>
              <IconSparkles size={16} color={TEXT} />
              <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>AI chat</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 12 }}>
              <IconMessageSquare size={16} color={TEXT_SEC} />
              <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT_SEC }}>Team chat</span>
            </div>
          </div>

          <div style={{ height: 1, background: BORDER, margin: "0 28px" }} />

          {/* Messages area */}
          <div style={{ flex: 1, padding: "24px 28px", overflow: "hidden" }}>
            {/* User message bubble */}
            {frame > 20 && (
              <div style={{
                display: "flex", justifyContent: "flex-end", marginBottom: 24,
                opacity: spring({ frame: frame - 20, fps, config: { damping: 200 } }),
              }}>
                <div style={{
                  background: CARD, borderRadius: 18, padding: "12px 18px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  maxWidth: 350, fontSize: 15, fontFamily: bodyFont, color: TEXT,
                }}>
                  {userTyped}
                  {!userMsgDone && <Cursor />}
                </div>
              </div>
            )}

            {/* Reference profile card — shows WHO we're finding similar to */}
            {frame >= 60 && (
              <div style={{
                display: "flex", justifyContent: "flex-end", marginBottom: 24,
                opacity: refCardSpring,
                transform: `translateY(${interpolate(refCardSpring, [0, 1], [12, 0])}px)`,
              }}>
                <div style={{
                  background: CARD, borderRadius: 14, padding: "12px 16px",
                  border: `1px solid ${BORDER}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  display: "flex", alignItems: "center", gap: 12, maxWidth: 320,
                }}>
                  <ProfilePhoto src="images/sarah.jpg" size={40} />
                  <div>
                    <div style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>Sarah Chen</div>
                    <div style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC, marginTop: 2 }}>Sr. Business Development · SaaS · B2B</div>
                  </div>
                </div>
              </div>
            )}

            {/* Thinking dots */}
            {showThinking && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, opacity: interpolate(frame, [thinkingStart, thinkingStart + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {[0, 1, 2].map(d => (
                    <div key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: TEXT, opacity: interpolate((frame + d * 8) % 24, [0, 12, 24], [0.2, 0.8, 0.2]) }} />
                  ))}
                </div>
                <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT_SEC }}>Searching similar profiles...</span>
              </div>
            )}

            {/* AI response */}
            {frame >= 120 && (
              <div style={{ marginBottom: 20, opacity: spring({ frame: frame - 120, fps, config: { damping: 200 } }) }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <IconSparkles size={16} color={ACCENT} />
                  <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>Laidback</span>
                </div>
                <p style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: 0 }}>
                  {aiTyped1}
                  {!ai1Done && <Cursor />}
                </p>
              </div>
            )}

            {/* Search result card */}
            {frame >= 175 && (
              <div style={{
                background: CARD, borderRadius: 14, padding: "14px 18px",
                border: `1px solid ${BORDER}`, marginBottom: 20,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                opacity: searchCardSpring,
                transform: `translateY(${interpolate(searchCardSpring, [0, 1], [15, 0])}px)`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <IconSearch size={16} color={TEXT_SEC} />
                  <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>24 similar to Sarah Chen, 2 applied</span>
                </div>
                <IconChevronRight size={16} color={TEXT_SEC} />
              </div>
            )}

            {/* Second AI text */}
            {frame >= 200 && (
              <p style={{
                fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: "0 0 20px 0",
                opacity: spring({ frame: frame - 200, fps, config: { damping: 200 } }),
              }}>
                {aiTyped2}
                {!ai2Done && <Cursor />}
              </p>
            )}

            {/* Save button */}
            {frame >= 250 && (
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                opacity: saveBtnSpring,
                transform: `translateY(${interpolate(saveBtnSpring, [0, 1], [15, 0])}px)`,
              }}>
                <div style={{
                  background: TEXT, color: "#fff", borderRadius: 12, padding: "12px 22px",
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 14, fontFamily: bodyFont,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                }}>
                  <IconMessageSquare size={14} />
                  Save top 6 matches
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "#f0ede8", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <IconRefresh size={14} color={TEXT_SEC} />
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div style={{ padding: "0 28px 24px 28px" }}>
            <div style={{
              background: CARD, borderRadius: 18, padding: "16px 18px",
              border: `1px solid ${BORDER}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 14, fontFamily: bodyFont, color: "#bbb" }}>
                  e.g. product designers with startup experience
                </span>
              </div>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: TEXT, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IconArrowUp size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 3: COMPARE FLOW — Select candidates dropdown
// 200 frames
// ═══════════════════════════════════════════════════════
const COMPARE_CANDIDATES = [
  { name: "Ralph Edwards", photo: "images/ralph.jpg", selected: true },
  { name: "Sam Morris", photo: "images/sam.jpg", selected: false },
  { name: "Robert Fox", photo: "images/robert.jpg", selected: false },
  { name: "Wade Warren", photo: "images/wade.jpg", selected: false },
];

const CompareScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  // Dropdown appears
  const dropdownSpring = spring({ frame: frame - 15, fps, config: { damping: 16, stiffness: 100 } });

  // Cursor selects Wade Warren
  const cursorVisible = frame > 30 && frame < 110;
  const cursorMoveProgress = interpolate(frame, [30, 65], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  // Move from first item to Wade Warren (4th item)
  const cursorX = interpolate(cursorMoveProgress, [0, 1], [700, 700]);
  const cursorY = interpolate(cursorMoveProgress, [0, 1], [260, 455]);
  const cursorClicking = frame >= 70 && frame < 78;
  const wadeSelected = frame >= 70;

  // Compare text in input
  const compareText = wadeSelected ? "Compare Ralph Edwards and Wade Warren" : "Compare Ralph Edwards and";
  const compareTyped = frame >= 80 ? compareText : "Compare Ralph Edwards and";

  // Zoom into the compare area
  const zoomProgress = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const cameraScale = interpolate(zoomProgress, [0, 1], [0.85, 1]);

  // Input area with compare/find similar buttons
  const inputSpring = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${cameraScale})`, transformOrigin: "center center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center", opacity: panelSpring }}>
          {/* Dropdown card */}
          <div style={{
            width: 520, background: CARD, borderRadius: 18,
            boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)",
            padding: "8px 0", opacity: dropdownSpring,
            transform: `translateY(${interpolate(dropdownSpring, [0, 1], [20, 0])}px)`,
          }}>
            {COMPARE_CANDIDATES.map((c, i) => {
              const rowSpring = spring({ frame: frame - 20 - i * 6, fps, config: { damping: 200 } });
              const isHighlighted = !wadeSelected && frame > 50 && i === 3;
              const isSelected = c.selected || (i === 3 && wadeSelected);

              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 24px",
                  opacity: rowSpring,
                  background: isHighlighted ? "#f5f3ef" : "transparent",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <ProfilePhoto src={c.photo} size={36} />
                    <span style={{ fontSize: 16, fontFamily: bodyFont, color: TEXT }}>{c.name}</span>
                  </div>
                  {isSelected && <IconCheck size={18} color={TEXT} />}
                </div>
              );
            })}
          </div>

          {/* Compare mention hint */}
          <div style={{
            width: 520, display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px", background: "#f5f3ef", borderRadius: 12,
            opacity: spring({ frame: frame - 10, fps, config: { damping: 200 } }),
          }}>
            <IconScale size={16} color={TEXT_SEC} />
            <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC }}>@mention two or more people to compare</span>
          </div>

          {/* Input card with compare text */}
          <div style={{
            width: 520, background: CARD, borderRadius: 18,
            boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
            padding: "18px 22px", opacity: inputSpring,
          }}>
            <p style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, margin: "0 0 16px 0" }}>
              {compareTyped.split("Ralph Edwards").map((part, i) =>
                i === 0 ? part : <><span style={{ color: GREEN, textDecoration: "underline" }}>Ralph Edwards</span>{
                  part.split("Wade Warren").map((p2, j) =>
                    j === 0 ? p2 : <><span style={{ color: GREEN, textDecoration: "underline" }}>Wade Warren</span>{p2}</>
                  )
                }</>
              )}
              {!wadeSelected && <Cursor />}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { icon: <IconSearch size={14} />, label: "Find similar" },
                  { icon: <IconScale size={14} />, label: "Compare" },
                ].map((btn, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 14px", borderRadius: 20,
                    border: `1.5px solid ${BORDER}`, fontSize: 13,
                    fontFamily: bodyFont, color: TEXT_SEC,
                  }}>
                    {btn.icon} {btn.label}
                  </div>
                ))}
              </div>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: TEXT, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IconArrowUp size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 4: AI COMPARISON TABLE
// 240 frames
// ═══════════════════════════════════════════════════════
const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({ frame, fps, config: { damping: 200 } });

  // Header AI label
  const headerSpring = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  // AI text types in
  const aiIntro = "Ralph Edwards has the most extensive experience with Python, both in years and depth of use:";
  const aiTyped = useTypewriter(aiIntro, 15, 1.5);
  const aiDone = aiTyped.length >= aiIntro.length;

  // Table subtitle
  const tableSubSpring = spring({ frame: frame - 60, fps, config: { damping: 200 } });

  // Table header
  const tableHeaderSpring = spring({ frame: frame - 70, fps, config: { damping: 18 } });

  // Table rows
  const row1Spring = spring({ frame: frame - 85, fps, config: { damping: 18 } });
  const row2Spring = spring({ frame: frame - 100, fps, config: { damping: 18 } });

  // Follow-up question
  const followUp = "Would you like to add Ralph Edwards to the shortlist?";
  const followUpTyped = useTypewriter(followUp, 140, 1.0);
  const followUpDone = followUpTyped.length >= followUp.length;

  // Shortlist button
  const shortlistSpring = spring({ frame: frame - 190, fps, config: { damping: 14, stiffness: 100 } });

  return (
    <AbsoluteFill style={{ background: CHAT_BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: 680, display: "flex", flexDirection: "column", gap: 16,
        opacity: containerSpring,
      }}>
        {/* AI header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          opacity: headerSpring,
        }}>
          <IconSparkles size={18} color={ACCENT} />
          <span style={{ fontSize: 16, fontFamily: bodyFont, color: TEXT }}>Laidback</span>
        </div>

        {/* AI intro text */}
        <div style={{ opacity: headerSpring }}>
          <p style={{ fontSize: 17, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: 0 }}>
            {aiTyped.split("Ralph Edwards").map((part, i) =>
              i === 0 ? part : <><span style={{ color: TEXT, textDecoration: "underline", fontWeight: 500 }}>Ralph Edwards</span>{part}</>
            )}
            {!aiDone && <Cursor />}
          </p>
        </div>

        {/* Table subtitle */}
        {frame >= 60 && (
          <p style={{
            fontSize: 16, fontFamily: bodyFont, color: TEXT, margin: "8px 0 4px 0",
            opacity: tableSubSpring,
          }}>
            Here's a comparison based on Python experience:
          </p>
        )}

        {/* Comparison table */}
        {frame >= 70 && (
          <div style={{
            background: CARD, borderRadius: 16,
            border: `1px solid ${BORDER}`,
            overflow: "hidden",
            opacity: tableHeaderSpring,
            transform: `translateY(${interpolate(tableHeaderSpring, [0, 1], [15, 0])}px)`,
          }}>
            {/* Table header */}
            <div style={{
              display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 2fr",
              padding: "14px 24px", borderBottom: `1px solid ${BORDER}`,
            }}>
              {["Candidate", "Years of exp.", "Skill level", "Highlights"].map((h, i) => (
                <span key={i} style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>{h}</span>
              ))}
            </div>

            {/* Row 1: Ralph Edwards */}
            <div style={{
              display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 2fr",
              padding: "16px 24px", borderBottom: `1px solid ${BORDER}`,
              opacity: row1Spring,
              transform: `translateY(${interpolate(row1Spring, [0, 1], [10, 0])}px)`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ProfilePhoto src="images/ralph.jpg" size={32} />
                <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>Ralph Edwards</span>
              </div>
              <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>6 years</span>
              <span style={{ fontSize: 14, fontFamily: bodyFont, color: GREEN }}>5/5</span>
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC }}>Core skill in all roles, built ML and backend systems</span>
            </div>

            {/* Row 2: Wade Warren */}
            <div style={{
              display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 2fr",
              padding: "16px 24px",
              opacity: row2Spring,
              transform: `translateY(${interpolate(row2Spring, [0, 1], [10, 0])}px)`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ProfilePhoto src="images/wade.jpg" size={32} />
                <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>Wade Warren</span>
              </div>
              <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>5 years</span>
              <span style={{ fontSize: 14, fontFamily: bodyFont, color: ACCENT }}>4/5</span>
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC }}>Mentored juniors, consistent use across two roles</span>
            </div>
          </div>
        )}

        {/* Follow-up question */}
        {frame >= 140 && (
          <p style={{
            fontSize: 16, fontFamily: bodyFont, color: TEXT_SEC, margin: "8px 0 0 0",
            opacity: spring({ frame: frame - 140, fps, config: { damping: 200 } }),
          }}>
            {followUpTyped}
            {!followUpDone && <Cursor color={TEXT_SEC} />}
          </p>
        )}

        {/* Shortlist button */}
        {frame >= 190 && (
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginTop: 4,
            opacity: shortlistSpring,
            transform: `translateY(${interpolate(shortlistSpring, [0, 1], [15, 0])}px)`,
          }}>
            <div style={{
              background: TEXT, color: "#fff", borderRadius: 12, padding: "12px 22px",
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 14, fontFamily: bodyFont,
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}>
              <IconMessageSquare size={14} />
              Shortlist Ralph Edwards
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#f0ede8", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IconRefresh size={14} color={TEXT_SEC} />
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 5: FULL APP VIEW — Chat alongside candidate list
// 200 frames
// ═══════════════════════════════════════════════════════
const FullAppScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  // Left side: candidate list
  const leftSlide = spring({ frame: frame - 5, fps, config: { damping: 18 } });
  // Middle: candidate detail
  const middleSlide = spring({ frame: frame - 40, fps, config: { damping: 18 } });
  // Right: chat
  const rightSlide = spring({ frame: frame - 15, fps, config: { damping: 18 } });

  const candidates = [
    { name: "Ralph Edwards", loc: "Stockholm", match: "10/12", photo: "images/ralph.jpg", desc: "A seasoned Senior Product Designer with extensive leadership experience..." },
    { name: "Sam Morris", loc: "Stockholm", match: "9/12", photo: "images/sam.jpg", desc: "A creative Junior Graphic Designer passionate about branding..." },
    { name: "Wade Warren", loc: "Stockholm", match: "10/12", photo: "images/wade.jpg", desc: "A high-level Product Designer with a focus on e-commerce..." },
  ];

  const cameraScale = interpolate(frame, [0, 40], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `scale(${cameraScale})`, transformOrigin: "center center",
        width: 1600, height: 860,
        background: CARD, borderRadius: 20,
        boxShadow: "0 30px 80px rgba(0,0,0,0.1)",
        display: "flex", overflow: "hidden",
        opacity: containerSpring,
      }}>
        {/* Left: candidate list */}
        <div style={{
          width: 440, borderRight: `1px solid ${BORDER}`, padding: "24px",
          opacity: leftSlide,
          transform: `translateX(${interpolate(leftSlide, [0, 1], [-30, 0])}px)`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT_SEC }}>
              <span style={{ fontSize: 18, fontFamily: headingFont, color: TEXT }}>24</span> of 230 people
            </span>
          </div>

          {/* Applicants card */}
          <div style={{
            background: "#f8f6f2", borderRadius: 14, padding: "16px 20px",
            border: `1px solid ${BORDER}`, marginBottom: 20,
          }}>
            <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>Applicants</span>
            <div style={{ fontSize: 28, fontFamily: headingFont, color: TEXT, marginTop: 4 }}>24</div>
            <span style={{ fontSize: 12, fontFamily: bodyFont, color: ACCENT }}>→ Review now</span>
          </div>

          <span style={{ fontSize: 16, fontFamily: headingFont, color: TEXT, display: "block", marginBottom: 16 }}>Best matches</span>

          {/* Candidate rows */}
          {candidates.map((c, i) => {
            const rowSpring = spring({ frame: frame - 20 - i * 12, fps, config: { damping: 18 } });
            const isActive = i === 2; // Wade Warren selected

            return (
              <div key={i} style={{
                display: "flex", gap: 12, padding: "14px 12px",
                borderRadius: 12, marginBottom: 8,
                background: isActive ? ACCENT_BG : "transparent",
                border: isActive ? `1.5px solid ${ACCENT}40` : "1px solid transparent",
                opacity: rowSpring,
                transform: `translateY(${interpolate(rowSpring, [0, 1], [15, 0])}px)`,
              }}>
                <ProfilePhoto src={c.photo} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>{c.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>{c.loc} · <span style={{ color: GREEN }}>{c.match} Match</span></span>
                  <p style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC, margin: "6px 0 0 0", lineHeight: 1.4 }}>
                    {c.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle: candidate detail */}
        <div style={{
          flex: 1, padding: "24px 28px", borderRight: `1px solid ${BORDER}`,
          opacity: middleSlide,
          transform: `translateY(${interpolate(middleSlide, [0, 1], [20, 0])}px)`,
        }}>
          {/* Top actions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <span style={{ fontSize: 13, fontFamily: bodyFont, color: "#d44" }}>⚠ Not a good fit</span>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ background: TEXT, color: "#fff", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontFamily: bodyFont, display: "flex", alignItems: "center", gap: 6 }}>
                Save to job
              </div>
            </div>
          </div>

          {/* Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <ProfilePhoto src="images/wade.jpg" size={64} />
            <div>
              <div style={{ fontSize: 22, fontFamily: headingFont, color: TEXT }}>Wade Warren</div>
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC }}>Stockholm, Sweden · <span style={{ color: GREEN }}>10/12 match</span></span>
            </div>
          </div>

          {/* Match score grid */}
          <div style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, marginBottom: 16 }}>Match score</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Total match", value: "10/12", color: GREEN },
              { label: "Hard reqs", value: "6/6", color: TEXT },
              { label: "Soft reqs", value: "6/8", color: TEXT },
              { label: "In role", value: "2.5 yrs", color: TEXT },
            ].map((s, i) => {
              const sSpring = spring({ frame: frame - 50 - i * 6, fps, config: { damping: 18 } });
              return (
                <div key={i} style={{
                  textAlign: "center", padding: "12px 8px",
                  background: "#f8f6f2", borderRadius: 12,
                  opacity: sSpring,
                }}>
                  <div style={{ fontSize: 18, fontFamily: headingFont, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, fontFamily: bodyFont, color: TEXT_SEC, marginTop: 4 }}>{s.label}</div>
                </div>
              );
            })}
          </div>

          {/* Skills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Leadership experience", "Fluent english", "FAANG company", "Prototyping"].map((skill, i) => {
              const sSpring = spring({ frame: frame - 70 - i * 5, fps, config: { damping: 200 } });
              return (
                <span key={i} style={{
                  fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC,
                  padding: "6px 12px", borderRadius: 8, border: `1px solid ${BORDER}`,
                  opacity: sSpring,
                }}>
                  {skill}
                </span>
              );
            })}
          </div>
        </div>

        {/* Right: Chat panel */}
        <div style={{
          width: 360, background: CHAT_BG, padding: "20px",
          opacity: rightSlide,
          transform: `translateX(${interpolate(rightSlide, [0, 1], [30, 0])}px)`,
        }}>
          {/* Tab header */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, borderBottom: `2px solid ${TEXT}`, paddingBottom: 8 }}>
              <IconSparkles size={14} color={TEXT} />
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT }}>AI chat</span>
            </div>
            <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC, paddingBottom: 8 }}>Team chat</span>
          </div>

          {/* User compare message */}
          <div style={{
            background: "#f0ede8", borderRadius: 12, padding: "10px 14px", marginBottom: 16,
            fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC,
          }}>
            Compare Ralph Edwards and Wade Warren
          </div>

          {/* AI response */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <IconSparkles size={14} color={ACCENT} />
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT }}>Laidback</span>
            </div>

            <p style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT, lineHeight: 1.6, margin: 0 }}>
              <span style={{ textDecoration: "underline" }}>Ralph Edwards</span> has the most extensive experience with Python, both in years and depth of use:
            </p>
          </div>

          {/* Mini comparison */}
          <div style={{
            background: CARD, borderRadius: 12, border: `1px solid ${BORDER}`,
            marginBottom: 16, fontSize: 12, overflow: "hidden",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr 0.8fr", padding: "10px 14px", borderBottom: `1px solid ${BORDER}` }}>
              {["", "Yrs exp.", "Skill"].map((h, i) => (
                <span key={i} style={{ fontFamily: bodyFont, color: TEXT, fontWeight: 500, fontSize: 11 }}>{h}</span>
              ))}
            </div>
            {[
              { name: "Ralph E.", years: "6 years", skill: "5/5", skillColor: GREEN },
              { name: "Wade W.", years: "5 years", skill: "4/5", skillColor: ACCENT },
            ].map((r, i) => {
              const rSpring = spring({ frame: frame - 30 - i * 10, fps, config: { damping: 200 } });
              return (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1.2fr 0.8fr 0.8fr",
                  padding: "10px 14px",
                  borderBottom: i === 0 ? `1px solid ${BORDER}` : "none",
                  opacity: rSpring,
                }}>
                  <span style={{ fontFamily: bodyFont, color: TEXT, fontSize: 12 }}>{r.name}</span>
                  <span style={{ fontFamily: bodyFont, color: TEXT, fontSize: 12 }}>{r.years}</span>
                  <span style={{ fontFamily: bodyFont, color: r.skillColor, fontSize: 12 }}>{r.skill}</span>
                </div>
              );
            })}
          </div>

          {/* Shortlist prompt */}
          <p style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC, margin: "0 0 12px 0" }}>
            Would you like to add Ralph Edwards to the shortlist?
          </p>

          {/* Shortlist button */}
          <div style={{
            background: TEXT, color: "#fff", borderRadius: 10, padding: "10px 16px",
            display: "flex", alignItems: "center", gap: 6, width: "fit-content",
            fontSize: 13, fontFamily: bodyFont,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            opacity: spring({ frame: frame - 60, fps, config: { damping: 200 } }),
          }}>
            <IconMessageSquare size={12} />
            Shortlist Ralph Edwards
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 6: OUTRO
// 90 frames
// ═══════════════════════════════════════════════════════
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });

  const words = ["Hire", "smarter,", "faster"];
  const wordEls = words.map((word, i) => {
    const wSpring = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 18 } });
    return (
      <span key={i} style={{
        display: "inline-block",
        transform: `translateY(${interpolate(wSpring, [0, 1], [50, 0])}px)`,
        opacity: wSpring, marginRight: 16,
      }}>
        {word}
      </span>
    );
  });

  const lineW = interpolate(frame, [25, 60], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
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
          <LaidbackLogo size={42} />
        </div>

        <h1 style={{ fontSize: 64, fontFamily: headingFont, color: TEXT, margin: 0, letterSpacing: -1 }}>
          {wordEls}
        </h1>

        <div style={{ width: lineW, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />

        <p style={{
          fontSize: 22, fontFamily: bodyFont, color: TEXT_SEC, margin: 0, letterSpacing: 1,
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
// MAIN VIDEO
// Scenes: Intro(90) + Chat(280) + Compare(200) + Comparison(240) + FullApp(200) + Outro(90)
// Transitions: 5 × 20f = 100f overlap
// Total: 1100 - 100 = 1000f ≈ 33s
// ═══════════════════════════════════════════════════════
export const ChatAssistantVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={310}>
          <ChatPanelScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={200}>
          <CompareScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={240}>
          <ComparisonScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={200}>
          <FullAppScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={90}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
