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
const BLUE_BG = "rgba(74, 124, 255, 0.08)";
const PURPLE = "#7c5cbf";
const PURPLE_BG = "rgba(124, 92, 191, 0.08)";

// ── Laidback Logo ──
const LaidbackLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Img src={staticFile("images/logolaidback.svg")} style={{ width: size, height: size * 0.74, objectFit: "contain" }} />
);

// ── Icons ──
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
const IconBriefcase: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);
const IconUsers: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconFileText: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
  </svg>
);
const IconMessageCircle: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);
const IconTarget: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IconSend: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" /><path d="m22 2-11 11" />
  </svg>
);
const IconEdit: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
  </svg>
);

const useTypewriter = (text: string, startFrame: number, charsPerFrame = 0.8) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  return text.slice(0, Math.min(Math.floor(elapsed * charsPerFrame), text.length));
};

const Cursor: React.FC<{ color?: string }> = ({ color = ACCENT }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame % 16, [0, 8, 16], [1, 0, 1]);
  return <span style={{ display: "inline-block", width: 2.5, height: "1.1em", background: color, marginLeft: 2, opacity, verticalAlign: "text-bottom" }} />;
};

// ═══════════════════════════════════════════════════════
// SCENE 1: INTRO — Briefcase icon + title
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
            <IconFileText size={55} color="#fff" />
          </div>
          {[{ x: -35, y: -40, delay: 5, size: 14 }, { x: 40, y: -30, delay: 10, size: 10 }, { x: -25, y: 35, delay: 15, size: 8 }].map((s, i) => {
            const sSpring = spring({ frame: frame - s.delay, fps, config: { damping: 12 } });
            return <div key={i} style={{ position: "absolute", left: `calc(50% + ${s.x}px)`, top: `calc(50% + ${s.y + Math.sin((frame + i * 20) * 0.08) * 3}px)`, opacity: sSpring * 0.7, transform: `scale(${sSpring})` }}><IconSparkles size={s.size} color={ACCENT} /></div>;
          })}
        </div>
        <h1 style={{ fontSize: 72, fontFamily: headingFont, color: TEXT, margin: 0, letterSpacing: -2, transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`, opacity: titleSpring }}>Job brief</h1>
        <div style={{ width: lineW, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
        <p style={{ fontSize: 22, fontFamily: bodyFont, color: TEXT_SEC, margin: 0, opacity: subtitleSpring, transform: `translateY(${interpolate(subtitleSpring, [0, 1], [20, 0])}px)` }}>Define roles, collaboratively</p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 2: WHO DO YOU WANT TO HIRE — Search input typewriter
// 160 frames
// ═══════════════════════════════════════════════════════
const SearchInputScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelSpring = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const query = "A senior backend engineer with experience in distributed systems";
  const typed = useTypewriter(query, 30, 0.7);
  const typingDone = typed.length >= query.length;
  const submitFlash = typingDone ? spring({ frame: frame - Math.ceil(30 + query.length / 0.7), fps, config: { damping: 12, stiffness: 120 } }) : 0;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${interpolate(panelSpring, [0, 1], [0.9, 1])})`, opacity: panelSpring }}>
        <h1 style={{ fontSize: 48, fontFamily: headingFont, color: TEXT, margin: 0, marginBottom: 24, letterSpacing: -1.7, opacity: titleSpring }}>
          Who do you want to hire?
        </h1>
        <div style={{
          width: 620, background: CARD, borderRadius: 20, padding: "22px 24px 90px 24px",
          boxShadow: `4px 4px 20px rgba(0,0,0,0.12)`,
          border: `1px solid ${BORDER}`,
        }}>
          <span style={{ fontSize: 19, fontFamily: bodyFont, color: typed.length > 0 ? TEXT : "#9c9da1", lineHeight: 1.6 }}>
            {typed.length > 0 ? typed : "For example: find a user experience designer in Warsaw"}
            {!typingDone && typed.length > 0 && <Cursor />}
          </span>
        </div>
        {/* Submit button glow */}
        {typingDone && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -56, marginRight: 16, position: "relative", zIndex: 2 }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%", background: TEXT,
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: `scale(${interpolate(submitFlash, [0, 1], [0.5, 1])})`,
              opacity: submitFlash,
              boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
            }}>
              <IconArrowUp size={18} color="#fff" />
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 3: CONVERSATIONAL BRIEF — AI asks clarifying questions
// 280 frames
// ═══════════════════════════════════════════════════════
const ConversationalBriefScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const aiQ1 = "Great choice. Let me help define this role. What's the main problem this engineer will solve?";
  const userA1 = "We're rebuilding our payment processing pipeline — it needs to handle 10x more transactions";
  const aiQ2 = "Got it — high-throughput payment infra. What tech stack does the team use today?";
  const userA2 = "Go, Kafka, PostgreSQL. We're moving some services to Rust";

  const aiQ1Typed = useTypewriter(aiQ1, 10, 1.4);
  const aiQ1Done = aiQ1Typed.length >= aiQ1.length;
  const userA1Start = 80;
  const userA1Typed = useTypewriter(userA1, userA1Start, 0.9);
  const userA1Done = userA1Typed.length >= userA1.length;
  const aiQ2Start = 165;
  const aiQ2Typed = useTypewriter(aiQ2, aiQ2Start, 1.4);
  const aiQ2Done = aiQ2Typed.length >= aiQ2.length;
  const userA2Start = 215;
  const userA2Typed = useTypewriter(userA2, userA2Start, 0.9);
  const userA2Done = userA2Typed.length >= userA2.length;

  const panelSlide = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: 620, background: CHAT_BG, borderRadius: 24,
        boxShadow: `0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)`,
        transform: `translateY(${interpolate(panelSlide, [0, 1], [40, 0])}px)`,
        opacity: panelSlide,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 28px 0 28px", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: `2px solid ${TEXT}`, paddingBottom: 12 }}>
            <IconSparkles size={16} color={TEXT} />
            <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>AI chat</span>
          </div>
          <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT_SEC, paddingBottom: 12 }}>Team chat</span>
        </div>
        <div style={{ height: 1, background: BORDER, margin: "0 28px" }} />

        <div style={{ padding: "24px 28px", minHeight: 360 }}>
          {/* AI Question 1 */}
          {frame > 5 && (
            <div style={{ marginBottom: 20, opacity: spring({ frame: frame - 5, fps, config: { damping: 200 } }) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <IconSparkles size={14} color={ACCENT} />
                <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT }}>Laidback</span>
              </div>
              <p style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: 0 }}>
                {aiQ1Typed}{!aiQ1Done && <Cursor />}
              </p>
            </div>
          )}

          {/* User Answer 1 */}
          {frame > userA1Start && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20, opacity: spring({ frame: frame - userA1Start, fps, config: { damping: 200 } }) }}>
              <div style={{ background: CARD, borderRadius: 18, padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: 420, fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.6 }}>
                {userA1Typed}{!userA1Done && <Cursor />}
              </div>
            </div>
          )}

          {/* AI Question 2 */}
          {frame > aiQ2Start && (
            <div style={{ marginBottom: 20, opacity: spring({ frame: frame - aiQ2Start, fps, config: { damping: 200 } }) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <IconSparkles size={14} color={ACCENT} />
                <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT }}>Laidback</span>
              </div>
              <p style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: 0 }}>
                {aiQ2Typed}{!aiQ2Done && <Cursor />}
              </p>
            </div>
          )}

          {/* User Answer 2 */}
          {frame > userA2Start && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20, opacity: spring({ frame: frame - userA2Start, fps, config: { damping: 200 } }) }}>
              <div style={{ background: CARD, borderRadius: 18, padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: 420, fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.6 }}>
                {userA2Typed}{!userA2Done && <Cursor />}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: "0 28px 24px 28px" }}>
          <div style={{ background: CARD, borderRadius: 18, padding: "16px 18px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontFamily: bodyFont, color: "#bbb" }}>Tell me more about this role...</span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: TEXT, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconArrowUp size={16} color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 4: AI GENERATES JOB BRIEF — Sections appear
// 260 frames
// ═══════════════════════════════════════════════════════
const BriefGenerationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sections = [
    { icon: <IconTarget size={18} color={ACCENT} />, title: "Role Overview", content: "Senior Backend Engineer focused on rebuilding payment processing pipeline for 10x scale", delay: 0 },
    { icon: <IconBriefcase size={18} color={ACCENT} />, title: "Technical Requirements", items: ["Go + Rust (primary)", "Kafka, PostgreSQL", "Distributed systems at scale", "Payment/fintech domain"], delay: 20 },
    { icon: <IconUsers size={18} color={ACCENT} />, title: "Soft Requirements", items: ["Led 3+ eng team", "Async communication", "Ownership mentality"], delay: 40 },
    { icon: <IconFileText size={18} color={ACCENT} />, title: "Culture Fit", content: "Builder mindset, comfortable with ambiguity, thrives in fast-paced startup environment", delay: 55 },
  ];

  const headerSpring = spring({ frame, fps, config: { damping: 200 } });
  const zoomProgress = interpolate(frame, [0, 40], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });

  // Generating label pulse
  const genPulse = frame < 120 ? interpolate(frame % 30, [0, 15, 30], [0.6, 1, 0.6]) : 1;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${zoomProgress})`, transformOrigin: "center center" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, opacity: headerSpring }}>
          <IconSparkles size={20} color={ACCENT} />
          <span style={{ fontSize: 22, fontFamily: headingFont, color: TEXT }}>AI-generated job brief</span>
          {frame < 120 && (
            <span style={{ fontSize: 13, fontFamily: bodyFont, color: ACCENT, marginLeft: 8, opacity: genPulse }}>● Generating...</span>
          )}
          {frame >= 120 && (
            <span style={{ fontSize: 13, fontFamily: bodyFont, color: GREEN, marginLeft: 8, opacity: spring({ frame: frame - 120, fps, config: { damping: 200 } }) }}>
              <IconCheck size={14} color={GREEN} /> Complete
            </span>
          )}
        </div>

        {/* Brief card */}
        <div style={{
          width: 700, background: CARD, borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          padding: "32px 36px",
          display: "flex", flexDirection: "column", gap: 24,
        }}>
          {/* Job title header */}
          <div style={{
            opacity: spring({ frame: frame - 5, fps, config: { damping: 200 } }),
            borderBottom: `1px solid ${BORDER}`, paddingBottom: 20,
          }}>
            <div style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>Job Brief</div>
            <div style={{ fontSize: 26, fontFamily: headingFont, color: TEXT, letterSpacing: -0.5 }}>Senior Backend Engineer</div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {["Remote", "Full-time", "$180k–$240k"].map((tag, i) => (
                <span key={i} style={{
                  fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC,
                  background: `${ACCENT}10`, border: `1px solid ${ACCENT}20`,
                  padding: "4px 10px", borderRadius: 8,
                  opacity: spring({ frame: frame - 15 - i * 5, fps, config: { damping: 200 } }),
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Sections */}
          {sections.map((section, i) => {
            const sSpring = spring({ frame: frame - 30 - section.delay, fps, config: { damping: 200 } });
            return (
              <div key={i} style={{
                opacity: sSpring,
                transform: `translateY(${interpolate(sSpring, [0, 1], [16, 0])}px)`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  {section.icon}
                  <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>{section.title}</span>
                </div>
                {section.content && (
                  <p style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT_SEC, lineHeight: 1.6, margin: 0, paddingLeft: 28 }}>
                    {section.content}
                  </p>
                )}
                {section.items && (
                  <div style={{ paddingLeft: 28, display: "flex", flexDirection: "column", gap: 4 }}>
                    {section.items.map((item, j) => {
                      const itemSpring = spring({ frame: frame - 40 - section.delay - j * 6, fps, config: { damping: 200 } });
                      return (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, opacity: itemSpring }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                          <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT_SEC }}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 5: TEAM COLLABORATION — Hiring manager + team comments
// 280 frames
// ═══════════════════════════════════════════════════════
const TeamCollaborationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const comments = [
    { name: "Sarah K.", role: "Hiring Manager", initials: "SK", color: ACCENT, text: "Let's add 'experience with PCI compliance' — it's critical for our payment work", delay: 0 },
    { name: "James L.", role: "Tech Lead", initials: "JL", color: BLUE, text: "Agreed. Also bump Rust from nice-to-have to required — we're going all-in on Rust for the new services", delay: 60 },
    { name: "AI Assistant", role: "", initials: "✦", color: ACCENT_DEEP, text: "Updated! I've added PCI compliance to requirements and promoted Rust to a core requirement. Brief version 2 is ready for review.", delay: 120, isAI: true },
  ];

  const panelSpring = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });

  // Brief sidebar mini-view
  const sidebarItems = [
    { label: "Role Overview", done: true },
    { label: "Technical Reqs", done: true, updated: frame > 140 },
    { label: "Soft Requirements", done: true },
    { label: "Culture Fit", done: true },
    { label: "Red Flags", done: false },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 28, transform: `scale(${interpolate(panelSpring, [0, 1], [0.92, 1])})`, opacity: panelSpring }}>
        {/* Left: Brief sidebar */}
        <div style={{
          width: 220, background: CARD, borderRadius: 20, padding: "24px 20px",
          border: `1px solid ${BORDER}`, boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          <div style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Brief sections</div>
          {sidebarItems.map((item, i) => {
            const iSpring = spring({ frame: frame - 10 - i * 6, fps, config: { damping: 200 } });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                borderRadius: 10, opacity: iSpring,
                background: item.updated ? `${ACCENT}12` : "transparent",
              }}>
                {item.done ? <IconCheck size={14} color={item.updated ? ACCENT : GREEN} /> : <div style={{ width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${BORDER}` }} />}
                <span style={{ fontSize: 13, fontFamily: bodyFont, color: item.updated ? ACCENT : TEXT }}>{item.label}</span>
                {item.updated && <span style={{ fontSize: 10, fontFamily: bodyFont, color: ACCENT, marginLeft: "auto" }}>v2</span>}
              </div>
            );
          })}
          {/* Version indicator */}
          {frame > 160 && (
            <div style={{
              marginTop: 16, padding: "8px 12px", borderRadius: 10,
              background: GREEN_BG, border: `1px solid ${GREEN}20`,
              opacity: spring({ frame: frame - 160, fps, config: { damping: 200 } }),
            }}>
              <div style={{ fontSize: 11, fontFamily: bodyFont, color: GREEN, display: "flex", alignItems: "center", gap: 6 }}>
                <IconCheck size={12} color={GREEN} /> Version 2 ready
              </div>
            </div>
          )}
        </div>

        {/* Right: Team chat */}
        <div style={{
          width: 500, background: CHAT_BG, borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT_SEC, paddingBottom: 10 }}>AI chat</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: `2px solid ${TEXT}`, paddingBottom: 10 }}>
              <IconMessageCircle size={14} color={TEXT} />
              <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>Team chat</span>
            </div>
            {/* Collaborator avatars */}
            <div style={{ marginLeft: "auto", display: "flex", gap: -8 }}>
              {[{ initials: "SK", color: ACCENT }, { initials: "JL", color: BLUE }].map((a, i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: "50%", background: a.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontFamily: bodyFont, color: "#fff", fontWeight: 600,
                  border: `2px solid ${CHAT_BG}`, marginLeft: i > 0 ? -8 : 0,
                  opacity: spring({ frame: frame - 5 - i * 8, fps, config: { damping: 200 } }),
                }}>{a.initials}</div>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: BORDER, margin: "0 24px" }} />

          <div style={{ padding: "20px 24px", minHeight: 320, display: "flex", flexDirection: "column", gap: 20 }}>
            {comments.map((comment, i) => {
              const cSpring = spring({ frame: frame - 20 - comment.delay, fps, config: { damping: 200 } });
              const cText = useTypewriter(comment.text, 30 + comment.delay, 1.2);
              const cDone = cText.length >= comment.text.length;
              const isAI = (comment as any).isAI;

              return (
                <div key={i} style={{
                  opacity: cSpring,
                  transform: `translateY(${interpolate(cSpring, [0, 1], [12, 0])}px)`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: isAI ? `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})` : comment.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: isAI ? 14 : 10, fontFamily: bodyFont, color: "#fff", fontWeight: 600,
                    }}>
                      {comment.initials}
                    </div>
                    <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>{comment.name}</span>
                    {comment.role && <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>· {comment.role}</span>}
                  </div>
                  <div style={{ paddingLeft: 38 }}>
                    <p style={{ fontSize: 14, fontFamily: bodyFont, color: isAI ? TEXT : TEXT_SEC, lineHeight: 1.6, margin: 0 }}>
                      {cText}{!cDone && <Cursor color={isAI ? ACCENT : TEXT_SEC} />}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div style={{ padding: "0 24px 20px 24px" }}>
            <div style={{ background: CARD, borderRadius: 16, padding: "14px 16px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: "#bbb" }}>Add feedback on this brief...</span>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: TEXT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconArrowUp size={14} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 6: FINAL BRIEF OVERVIEW — Polished summary
// 180 frames
// ═══════════════════════════════════════════════════════
const FinalBriefScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const requirements = [
    { label: "Go + Rust", weight: "Required", color: GREEN },
    { label: "Kafka & PostgreSQL", weight: "Required", color: GREEN },
    { label: "Distributed systems", weight: "Required", color: GREEN },
    { label: "PCI compliance", weight: "Required", color: GREEN },
    { label: "Payment/fintech", weight: "Preferred", color: ACCENT },
    { label: "Team leadership", weight: "Preferred", color: ACCENT },
  ];

  const headerSpring = spring({ frame, fps, config: { damping: 200 } });
  const cardSpring = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 80 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 740, opacity: headerSpring }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconFileText size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 20, fontFamily: headingFont, color: TEXT }}>Senior Backend Engineer</div>
              <div style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC }}>Final brief · Version 2 · 2 collaborators</div>
            </div>
          </div>
          <div style={{
            padding: "6px 14px", borderRadius: 10,
            background: GREEN_BG, border: `1px solid ${GREEN}20`,
            fontSize: 13, fontFamily: bodyFont, color: GREEN,
            display: "flex", alignItems: "center", gap: 6,
            opacity: spring({ frame: frame - 20, fps, config: { damping: 200 } }),
          }}>
            <IconCheck size={14} color={GREEN} /> Ready to publish
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: CARD, borderRadius: 24, padding: "32px 36px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [20, 0])}px)`,
        }}>
          {/* Requirements grid */}
          <div style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <IconTarget size={16} color={ACCENT} />
            Requirements & Signals
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {requirements.map((req, i) => {
              const rSpring = spring({ frame: frame - 30 - i * 8, fps, config: { damping: 200 } });
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 14px", borderRadius: 12,
                  background: req.color === GREEN ? GREEN_BG : `${ACCENT}08`,
                  border: `1px solid ${req.color}20`,
                  opacity: rSpring,
                  transform: `translateX(${interpolate(rSpring, [0, 1], [20, 0])}px)`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {req.color === GREEN ? <IconCheck size={14} color={GREEN} /> : <div style={{ width: 14, height: 14, borderRadius: "50%", background: `${ACCENT}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: ACCENT }}>●</div>}
                    <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>{req.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: bodyFont, color: req.color, fontWeight: 500 }}>{req.weight}</span>
                </div>
              );
            })}
          </div>

          {/* Collaborators */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC }}>Collaborators</span>
              {[{ initials: "SK", color: ACCENT, name: "Sarah K." }, { initials: "JL", color: BLUE, name: "James L." }].map((a, i) => {
                const aSpring = spring({ frame: frame - 60 - i * 10, fps, config: { damping: 14 } });
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, opacity: aSpring, transform: `scale(${interpolate(aSpring, [0, 1], [0.8, 1])})` }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%", background: a.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontFamily: bodyFont, color: "#fff", fontWeight: 600,
                    }}>{a.initials}</div>
                    <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT }}>{a.name}</span>
                  </div>
                );
              })}
            </div>
            <div style={{
              display: "flex", gap: 8,
              opacity: spring({ frame: frame - 80, fps, config: { damping: 200 } }),
            }}>
              <div style={{ padding: "8px 16px", borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 13, fontFamily: bodyFont, color: TEXT, display: "flex", alignItems: "center", gap: 6 }}>
                <IconEdit size={13} color={TEXT_SEC} /> Edit
              </div>
              <div style={{ padding: "8px 16px", borderRadius: 10, background: TEXT, fontSize: 13, fontFamily: bodyFont, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
                <IconSend size={13} color="#fff" /> Publish
              </div>
            </div>
          </div>
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
  const words = ["Define", "roles,", "together"];
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
// Intro(90) + SearchInput(160) + Conversational(280) + BriefGen(260) + TeamCollab(280) + FinalBrief(180) + Outro(90)
// Transitions: 6 × 20f = 120f overlap
// Total: 1340 - 120 = 1220f ≈ 40.7s
// ═══════════════════════════════════════════════════════
export const JobBriefVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}><IntroScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={160}><SearchInputScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={280}><ConversationalBriefScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={260}><BriefGenerationScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={280}><TeamCollaborationScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={180}><FinalBriefScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={90}><OutroScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
