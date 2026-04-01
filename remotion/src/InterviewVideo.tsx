import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
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

// ── Colors ──
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
  <img src={staticFile("images/logolaidback.svg")} style={{ width: size, height: size * 0.74, objectFit: "contain" }} />
);

const IconCalendar: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" /><path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const IconSparkles: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" />
    <path d="M4 17v2" /><path d="M5 18H3" />
  </svg>
);

const IconClock: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

const IconVideo: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
    <rect x="2" y="6" width="14" height="12" rx="2" />
  </svg>
);

const IconClipboard: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
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

const IconStar: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconChevronDown: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ProfilePhoto: React.FC<{ src: string; size: number; border?: boolean }> = ({ src, size, border = true }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    overflow: "hidden", flexShrink: 0,
    border: border ? `2px solid ${BORDER}` : "none",
  }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

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

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const iconScale = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });
  const iconRotate = interpolate(spring({ frame, fps, config: { damping: 15, stiffness: 60 } }), [0, 1], [-20, 0]);
  const sparkles = [
    { x: -35, y: -40, delay: 5, size: 14 },
    { x: 40, y: -30, delay: 10, size: 10 },
    { x: -25, y: 35, delay: 15, size: 8 },
  ];
  const titleSpring = spring({ frame: frame - 15, fps, config: { damping: 18, stiffness: 100 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const subtitleSpring = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [20, 0]);
  const lineW = interpolate(frame, [25, 60], [0, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const orb1Y = Math.sin(frame * 0.05) * 8;
  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 180 + orb1Y, right: 350, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 70%)` }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ position: "relative", transform: `scale(${iconScale}) rotate(${iconRotate}deg)` }}>
          <div style={{
            width: 100, height: 100, borderRadius: 24,
            background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 16px 50px rgba(201, 149, 107, 0.35)`,
          }}>
            <IconCalendar size={55} />
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
          Interview coordinator
        </h1>
        <div style={{ width: lineW, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
        <p style={{
          fontSize: 22, fontFamily: bodyFont, color: TEXT_SEC, margin: 0,
          opacity: subtitleSpring, transform: `translateY(${subtitleY}px)`,
        }}>
          AI-powered scheduling & interview prep
        </p>
      </div>
    </AbsoluteFill>
  );
};

const ScheduleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelSlide = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const panelX = interpolate(panelSlide, [0, 1], [-600, 0]);
  const userMsg = "Schedule an interview with Marcus Andersson";
  const userTyped = useTypewriter(userMsg, 20, 1.0);
  const userMsgDone = userTyped.length >= userMsg.length;
  const cardSpring = spring({ frame: frame - 60, fps, config: { damping: 16, stiffness: 100 } });
  const thinkingStart = 85;
  const thinkingEnd = 125;
  const showThinking = frame >= thinkingStart && frame < thinkingEnd;
  const aiText1 = "I've checked both your calendars and Marcus's availability. Here are the best time slots this week:";
  const aiTyped1 = useTypewriter(aiText1, 130, 1.5);
  const ai1Done = aiTyped1.length >= aiText1.length;
  const slot1Spring = spring({ frame: frame - 190, fps, config: { damping: 16, stiffness: 100 } });
  const slot2Spring = spring({ frame: frame - 200, fps, config: { damping: 16, stiffness: 100 } });
  const slot3Spring = spring({ frame: frame - 210, fps, config: { damping: 16, stiffness: 100 } });
  const cursorVisible = frame > 220 && frame < 270;
  const cursorMoveProgress = interpolate(frame, [220, 245], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const cursorX = interpolate(cursorMoveProgress, [0, 1], [800, 720]);
  const cursorY = interpolate(cursorMoveProgress, [0, 1], [350, 460]);
  const cursorClicking = frame >= 248 && frame < 256;
  const slotSelected = frame >= 248;
  const aiText2 = "Done! Interview scheduled with Marcus for Tuesday at 10:00 AM. I've sent a calendar invite with a Google Meet link.";
  const aiTyped2 = useTypewriter(aiText2, 265, 1.5);
  const ai2Done = aiTyped2.length >= aiText2.length;
  const zoomProgress = interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const cameraScale = interpolate(zoomProgress, [0, 1], [0.85, 1]);
  const slots = [
    { day: "Tue, Jan 14", time: "10:00 AM – 11:00 AM", available: "Both free" },
    { day: "Wed, Jan 15", time: "2:00 PM – 3:00 PM", available: "Both free" },
    { day: "Thu, Jan 16", time: "11:00 AM – 12:00 PM", available: "Marcus preferred" },
  ];
  const slotSprings = [slot1Spring, slot2Spring, slot3Spring];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)` }}>
      <div style={{ transform: `scale(${cameraScale})`, transformOrigin: "center center", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          width: 580, height: 780, background: CHAT_BG,
          borderRadius: 24, boxShadow: `0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)`,
          transform: `translateX(${panelX}px)`,
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
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
          <div style={{ flex: 1, padding: "24px 28px", overflow: "hidden" }}>
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
            {frame >= 60 && (
              <div style={{
                display: "flex", justifyContent: "flex-end", marginBottom: 24,
                opacity: cardSpring,
                transform: `translateY(${interpolate(cardSpring, [0, 1], [12, 0])}px)`,
              }}>
                <div style={{
                  background: CARD, borderRadius: 14, padding: "12px 16px",
                  border: `1px solid ${BORDER}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  display: "flex", alignItems: "center", gap: 12, maxWidth: 320,
                }}>
                  <ProfilePhoto src="images/marcus.jpg" size={40} />
                  <div>
                    <div style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>Marcus Andersson</div>
                    <div style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC, marginTop: 2 }}>Sr. Product Designer · Stockholm</div>
                  </div>
                </div>
              </div>
            )}
            {showThinking && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, opacity: interpolate(frame, [thinkingStart, thinkingStart + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {[0, 1, 2].map(d => (
                    <div key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: TEXT, opacity: interpolate((frame + d * 8) % 24, [0, 12, 24], [0.2, 0.8, 0.2]) }} />
                  ))}
                </div>
                <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT_SEC }}>Checking calendars...</span>
              </div>
            )}
            {frame >= 125 && (
              <div style={{ marginBottom: 20, opacity: spring({ frame: frame - 125, fps, config: { damping: 200 } }) }}>
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
            {frame >= 190 && slots.map((slot, i) => (
              <div key={i} style={{
                background: slotSelected && i === 0 ? GREEN_BG : CARD,
                borderRadius: 14, padding: "12px 16px",
                border: `1.5px solid ${slotSelected && i === 0 ? GREEN : BORDER}`,
                marginBottom: 10,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                opacity: slotSprings[i],
                transform: `translateY(${interpolate(slotSprings[i], [0, 1], [15, 0])}px)`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <IconClock size={16} color={slotSelected && i === 0 ? GREEN : TEXT_SEC} />
                  <div>
                    <div style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>{slot.day}</div>
                    <div style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>{slot.time}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {slotSelected && i === 0 ? (
                    <IconCheck size={16} color={GREEN} />
                  ) : (
                    <span style={{ fontSize: 11, fontFamily: bodyFont, color: TEXT_SEC, background: "#f5f3ef", padding: "3px 8px", borderRadius: 6 }}>{slot.available}</span>
                  )}
                </div>
              </div>
            ))}
            {frame >= 265 && (
              <div style={{
                marginTop: 8,
                opacity: spring({ frame: frame - 265, fps, config: { damping: 200 } }),
              }}>
                <p style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: 0 }}>
                  {aiTyped2}
                  {!ai2Done && <Cursor />}
                </p>
              </div>
            )}
          </div>
          <div style={{ padding: "0 28px 24px 28px" }}>
            <div style={{
              background: CARD, borderRadius: 18, padding: "16px 18px",
              border: `1px solid ${BORDER}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 14, fontFamily: bodyFont, color: "#bbb" }}>
                e.g. reschedule to next week
              </span>
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

const MeetingConfirmScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardSpring = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });
  const d1 = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const d2 = spring({ frame: frame - 25, fps, config: { damping: 200 } });
  const d3 = spring({ frame: frame - 35, fps, config: { damping: 200 } });
  const d4 = spring({ frame: frame - 45, fps, config: { damping: 200 } });
  const d5 = spring({ frame: frame - 55, fps, config: { damping: 200 } });
  const d6 = spring({ frame: frame - 65, fps, config: { damping: 200 } });
  const btnSpring = spring({ frame: frame - 80, fps, config: { damping: 14, stiffness: 100 } });
  const cursorVisible = frame > 100 && frame < 160;
  const cursorMoveProgress = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const cursorX = interpolate(cursorMoveProgress, [0, 1], [1050, 960]);
  const cursorY = interpolate(cursorMoveProgress, [0, 1], [400, 680]);
  const cursorClicking = frame >= 135 && frame < 143;
  const btnClicked = frame >= 135;
  const checkScale = spring({ frame: frame - 145, fps, config: { damping: 10, stiffness: 100 } });
  const cameraScale = interpolate(frame, [0, 30], [0.88, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${cameraScale})`, transformOrigin: "center center" }}>
        <div style={{
          width: 560, background: CARD, borderRadius: 24,
          boxShadow: "0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)",
          padding: "40px 44px",
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 32,
            opacity: d1,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 8px 24px rgba(201, 149, 107, 0.25)`,
            }}>
              <IconCalendar size={26} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontFamily: headingFont, color: TEXT }}>Interview scheduled</div>
              <div style={{ fontSize: 14, fontFamily: bodyFont, color: GREEN, marginTop: 2 }}>✓ Confirmed</div>
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 14, marginBottom: 28,
            padding: "16px 20px", background: "#f8f6f2", borderRadius: 16,
            opacity: d2,
            transform: `translateY(${interpolate(d2, [0, 1], [10, 0])}px)`,
          }}>
            <ProfilePhoto src="images/marcus.jpg" size={52} />
            <div>
              <div style={{ fontSize: 17, fontFamily: headingFont, color: TEXT }}>Marcus Andersson</div>
              <div style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC }}>Sr. Product Designer · 10/12 match</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 14,
              opacity: d3,
              transform: `translateY(${interpolate(d3, [0, 1], [8, 0])}px)`,
            }}>
              <IconClock size={20} color={ACCENT} />
              <div>
                <div style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>Tuesday, January 14 · 10:00 – 11:00 AM</div>
                <div style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>45 min interview</div>
              </div>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 14,
              opacity: d4,
              transform: `translateY(${interpolate(d4, [0, 1], [8, 0])}px)`,
            }}>
              <IconVideo size={20} color={ACCENT} />
              <div>
                <div style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>Google Meet</div>
                <div style={{ fontSize: 12, fontFamily: bodyFont, color: BLUE }}>meet.google.com/abc-defg-hij</div>
              </div>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 14,
              opacity: d5,
              transform: `translateY(${interpolate(d5, [0, 1], [8, 0])}px)`,
            }}>
              <IconClipboard size={20} color={ACCENT} />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>Case study deep dive</span>
                <IconChevronDown size={14} color={TEXT_SEC} />
              </div>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 14,
              opacity: d6,
              transform: `translateY(${interpolate(d6, [0, 1], [8, 0])}px)`,
            }}>
              <div style={{ display: "flex", marginLeft: 0 }}>
                <ProfilePhoto src="images/emma.jpg" size={28} border={false} />
                <div style={{ marginLeft: -8 }}>
                  <ProfilePhoto src="images/sarah.jpg" size={28} border={false} />
                </div>
              </div>
              <div style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>
                Emma Lundberg, Sarah Chen
                <span style={{ color: TEXT_SEC }}> · Interviewers</span>
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 32,
            opacity: btnSpring,
            transform: `translateY(${interpolate(btnSpring, [0, 1], [15, 0])}px)`,
          }}>
            <div style={{
              background: btnClicked ? GREEN : TEXT,
              color: "#fff", borderRadius: 16, padding: "16px 28px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              fontSize: 16, fontFamily: bodyFont, fontWeight: 500,
              boxShadow: btnClicked ? `0 8px 24px rgba(45, 157, 92, 0.3)` : "0 8px 24px rgba(0,0,0,0.15)",
              transform: btnClicked ? `scale(${interpolate(checkScale, [0, 1], [0.95, 1])})` : "scale(1)",
            }}>
              {btnClicked ? (
                <>
                  <div style={{ transform: `scale(${checkScale})` }}>
                    <IconCheck size={20} />
                  </div>
                  Confirmed
                </>
              ) : (
                <>
                  <IconCheck size={18} />
                  Proceed
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </AbsoluteFill>
  );
};

const PrepNotesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const containerSpring = spring({ frame, fps, config: { damping: 200 } });
  const headerSpring = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const aiIntro = "Here are your interview prep notes for Marcus Andersson:";
  const aiTyped = useTypewriter(aiIntro, 10, 1.5);
  const aiDone = aiTyped.length >= aiIntro.length;
  const s1 = spring({ frame: frame - 50, fps, config: { damping: 16, stiffness: 100 } });
  const s2 = spring({ frame: frame - 80, fps, config: { damping: 16, stiffness: 100 } });
  const s3 = spring({ frame: frame - 120, fps, config: { damping: 16, stiffness: 100 } });
  const makeItemSpring = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const cameraZoom = interpolate(frame, [60, 150], [1, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const cameraZoomBack = interpolate(frame, [180, 230], [1.05, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const finalScale = frame < 180 ? cameraZoom : cameraZoomBack;
  return (
    <AbsoluteFill style={{ background: CHAT_BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: 720, display: "flex", flexDirection: "column", gap: 20,
        opacity: containerSpring,
        transform: `scale(${finalScale})`, transformOrigin: "center center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: headerSpring }}>
          <IconSparkles size={18} color={ACCENT} />
          <span style={{ fontSize: 16, fontFamily: bodyFont, color: TEXT }}>Laidback</span>
        </div>
        <p style={{ fontSize: 17, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: 0, opacity: headerSpring }}>
          {aiTyped}
          {!aiDone && <Cursor />}
        </p>
        {frame >= 50 && (
          <div style={{
            background: CARD, borderRadius: 18, padding: "22px 26px",
            border: `1px solid ${BORDER}`,
            opacity: s1,
            transform: `translateY(${interpolate(s1, [0, 1], [20, 0])}px)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <IconStar size={16} color={ACCENT} />
              <span style={{ fontSize: 16, fontFamily: headingFont, color: TEXT }}>Key strengths to explore</span>
            </div>
            {[
              { text: "8 years leading design systems at Spotify and Klarna", delay: 58 },
              { text: "Built and scaled a 12-person design team", delay: 64 },
              { text: "Strong prototyping skills — Figma, Framer", delay: 70 },
            ].map((item, i) => {
              const iSpring = makeItemSpring(item.delay);
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "8px 0",
                  opacity: iSpring,
                  transform: `translateX(${interpolate(iSpring, [0, 1], [20, 0])}px)`,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, marginTop: 7, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, lineHeight: 1.5 }}>{item.text}</span>
                </div>
              );
            })}
          </div>
        )}
        {frame >= 80 && (
          <div style={{
            background: CARD, borderRadius: 18, padding: "22px 26px",
            border: `1px solid ${BORDER}`,
            opacity: s2,
            transform: `translateY(${interpolate(s2, [0, 1], [20, 0])}px)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <IconClipboard size={16} color={ACCENT} />
              <span style={{ fontSize: 16, fontFamily: headingFont, color: TEXT }}>Suggested questions</span>
            </div>
            {[
              { text: "How did you approach scaling the design system across multiple product lines at Spotify?", delay: 90 },
              { text: "Walk me through a case where you had to align stakeholders with conflicting design visions", delay: 100 },
              { text: "What's your framework for evaluating design trade-offs at speed?", delay: 110 },
            ].map((item, i) => {
              const iSpring = makeItemSpring(item.delay);
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "8px 0", borderBottom: i < 2 ? `1px solid ${BORDER}` : "none",
                  opacity: iSpring,
                  transform: `translateX(${interpolate(iSpring, [0, 1], [20, 0])}px)`,
                }}>
                  <span style={{ fontSize: 13, fontFamily: bodyFont, color: ACCENT, fontWeight: 500, flexShrink: 0, marginTop: 1 }}>Q{i + 1}</span>
                  <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, lineHeight: 1.5 }}>{item.text}</span>
                </div>
              );
            })}
          </div>
        )}
        {frame >= 120 && (
          <div style={{
            background: CARD, borderRadius: 18, padding: "22px 26px",
            border: `1px solid ${BORDER}`,
            opacity: s3,
            transform: `translateY(${interpolate(s3, [0, 1], [20, 0])}px)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ fontSize: 16, fontFamily: headingFont, color: TEXT }}>Areas to probe</span>
            </div>
            {[
              { text: "Gap in employment between 2021–2022 — unclear on LinkedIn", delay: 130 },
              { text: "No direct e-commerce experience — verify adaptability", delay: 140 },
            ].map((item, i) => {
              const iSpring = makeItemSpring(item.delay);
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "8px 0",
                  opacity: iSpring,
                  transform: `translateX(${interpolate(iSpring, [0, 1], [20, 0])}px)`,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d97706", marginTop: 7, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, lineHeight: 1.5 }}>{item.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

const CalendarScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const containerSpring = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const days = ["Mon 13", "Tue 14", "Wed 15", "Thu 16", "Fri 17"];
  const hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];
  const m1 = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 100 } });
  const m2 = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 100 } });
  const m3 = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 100 } });
  const zoomProgress = interpolate(frame, [80, 140], [1, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const zoomBack = interpolate(frame, [160, 190], [1.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const finalZoom = frame < 160 ? zoomProgress : zoomBack;
  const panX = interpolate(frame, [80, 140], [0, -100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const panXBack = interpolate(frame, [160, 190], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const finalPanX = frame < 160 ? panX : panXBack;
  const panY = interpolate(frame, [80, 140], [0, -40], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const panYBack = interpolate(frame, [160, 190], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const finalPanY = frame < 160 ? panY : panYBack;
  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `scale(${finalZoom}) translate(${finalPanX}px, ${finalPanY}px)`,
        transformOrigin: "center center",
      }}>
        <div style={{
          width: 1200, background: CARD, borderRadius: 24,
          boxShadow: "0 30px 80px rgba(0,0,0,0.1)",
          padding: "32px", overflow: "hidden",
          opacity: containerSpring,
          transform: `translateY(${interpolate(containerSpring, [0, 1], [30, 0])}px)`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <LaidbackLogo size={22} color={ACCENT} />
              <span style={{ fontSize: 24, fontFamily: headingFont, color: TEXT }}>Meetings</span>
            </div>
            <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT_SEC }}>January 2025</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "70px repeat(5, 1fr)", gap: 0 }}>
            <div />
            {days.map((day, i) => (
              <div key={i} style={{
                textAlign: "center", padding: "10px 0", borderBottom: `1px solid ${BORDER}`,
                fontSize: 13, fontFamily: bodyFont,
                color: i === 1 ? TEXT : TEXT_SEC,
                fontWeight: i === 1 ? 600 : 400,
              }}>
                {day}
              </div>
            ))}
            {hours.map((hour, hi) => (
              <>
                <div key={`h-${hi}`} style={{
                  padding: "20px 8px 20px 0", textAlign: "right",
                  fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC,
                  borderBottom: `1px solid ${BORDER}`,
                }}>
                  {hour}
                </div>
                {days.map((_, di) => (
                  <div key={`c-${hi}-${di}`} style={{
                    position: "relative",
                    borderBottom: `1px solid ${BORDER}`,
                    borderLeft: `1px solid ${BORDER}`,
                    height: 56,
                  }}>
                    {di === 1 && hi === 1 && (
                      <div style={{
                        position: "absolute", inset: 3,
                        background: `linear-gradient(135deg, #E8F0E8, #d4e8d4)`,
                        borderRadius: 12, padding: "8px 10px",
                        border: `1.5px solid ${GREEN}40`,
                        display: "flex", alignItems: "center", gap: 8,
                        opacity: m1,
                        transform: `scale(${interpolate(m1, [0, 1], [0.8, 1])})`,
                        boxShadow: `0 4px 12px rgba(45, 157, 92, 0.12)`,
                      }}>
                        <ProfilePhoto src="images/marcus.jpg" size={28} border={false} />
                        <div>
                          <div style={{ fontSize: 11, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>Marcus Andersson</div>
                          <div style={{ fontSize: 10, fontFamily: bodyFont, color: TEXT_SEC }}>10:00 · 45 min</div>
                        </div>
                      </div>
                    )}
                    {di === 0 && hi === 3 && (
                      <div style={{
                        position: "absolute", inset: 3,
                        background: "#F5F3E8", borderRadius: 10, padding: "8px 10px",
                        display: "flex", alignItems: "center", gap: 8,
                        opacity: m2,
                      }}>
                        <ProfilePhoto src="images/emma.jpg" size={24} border={false} />
                        <div style={{ fontSize: 11, fontFamily: bodyFont, color: TEXT }}>Team standup</div>
                      </div>
                    )}
                    {di === 3 && hi === 5 && (
                      <div style={{
                        position: "absolute", inset: 3,
                        background: "#E8EEF5", borderRadius: 10, padding: "8px 10px",
                        display: "flex", alignItems: "center", gap: 8,
                        opacity: m3,
                      }}>
                        <ProfilePhoto src="images/sarah.jpg" size={24} border={false} />
                        <div style={{ fontSize: 11, fontFamily: bodyFont, color: TEXT }}>Sarah Chen</div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

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

export const InterviewVideo: React.FC = () => {
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
        <TransitionSeries.Sequence durationInFrames={320}>
          <ScheduleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={200}>
          <MeetingConfirmScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={250}>
          <PrepNotesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={200}>
          <CalendarScene />
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
