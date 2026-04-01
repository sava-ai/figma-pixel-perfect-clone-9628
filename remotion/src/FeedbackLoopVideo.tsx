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
import { wipe } from "@remotion/transitions/wipe";
import { loadFont } from "@remotion/fonts";
import { loadFont as loadGoogleFont } from "@remotion/google-fonts/Inter";

loadGoogleFont("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });
loadFont({ family: "CooperLight", url: staticFile("fonts/CooperLtBTLight.ttf"), weight: "400" });

const H = "CooperLight, serif";
const B = "Inter, sans-serif";

const BG = "#f6f4f0";
const CARD = "#ffffff";
const T = "#333333";
const T2 = "#7a7570";
const ACC = "#c9956b";
const ACC_D = "#a87a55";
const GRN = "#2d9d5c";
const GRN_BG = "rgba(45, 157, 92, 0.08)";
const RED = "#BF4D43";
const RED_BG = "rgba(191, 77, 67, 0.08)";
const BRD = "#ece8e2";
const BLU = "#4a7cff";
const BLU_BG = "rgba(74, 124, 255, 0.08)";
const PUR = "#7c5cbf";
const PUR_BG = "rgba(124, 92, 191, 0.08)";
const ORA = "#e8853d";
const ORA_BG = "rgba(232, 133, 61, 0.08)";
const FOOTER_BG = "#F2F1ED";

const PHOTOS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
];

// ── Icons ──
const IcoSparkle: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = ACC }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />
  </svg>
);
const IcoCheck: React.FC<{ s?: number; c?: string }> = ({ s = 16, c = GRN }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IcoX: React.FC<{ s?: number; c?: string }> = ({ s = 16, c = RED }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);
const IcoBrain: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = PUR }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </svg>
);
const IcoTrending: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = GRN }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>
);
const IcoThumbDown: React.FC<{ s?: number; c?: string }> = ({ s = 16, c = RED }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
  </svg>
);
const IcoThumbUp: React.FC<{ s?: number; c?: string }> = ({ s = 16, c = GRN }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

const Avatar: React.FC<{ src: string; size?: number }> = ({ src, size = 40 }) => (
  <Img src={src} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${BRD}` }} />
);

const LaidbackLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Img src={staticFile("images/logolaidback.svg")} style={{ width: size, height: size * 0.74, objectFit: "contain" }} />
);

// ═══════════════════════════════════════════════════════
// SCENE 1 — INTRO
// ═══════════════════════════════════════════════════════
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconScale = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });
  const iconRotate = interpolate(spring({ frame, fps, config: { damping: 15, stiffness: 60 } }), [0, 1], [-20, 0]);
  const titleSpring = spring({ frame: frame - 15, fps, config: { damping: 18, stiffness: 100 } });
  const subtitleSpring = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const lineW = interpolate(frame, [25, 60], [0, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const orbY = Math.sin(frame * 0.05) * 8;
  const endZoom = interpolate(frame, [60, 90], [1, 1.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center", transform: `scale(${endZoom})`, transformOrigin: "center center" }}>
      <div style={{ position: "absolute", top: 180 + orbY, right: 350, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${PUR}12 0%, transparent 70%)` }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ position: "relative", transform: `scale(${iconScale}) rotate(${iconRotate}deg)` }}>
          <div style={{ width: 100, height: 100, borderRadius: 24, background: `linear-gradient(145deg, ${PUR}, ${ACC_D})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 16px 50px rgba(124, 92, 191, 0.35)` }}>
            <IcoBrain s={55} c="#fff" />
          </div>
          {[{ x: -35, y: -40, delay: 5, size: 14 }, { x: 40, y: -30, delay: 10, size: 10 }, { x: -25, y: 35, delay: 15, size: 8 }].map((s, i) => {
            const sSpring = spring({ frame: frame - s.delay, fps, config: { damping: 12 } });
            return <div key={i} style={{ position: "absolute", left: `calc(50% + ${s.x}px)`, top: `calc(50% + ${s.y + Math.sin((frame + i * 20) * 0.08) * 3}px)`, opacity: sSpring * 0.7, transform: `scale(${sSpring})` }}><IcoSparkle s={s.size} c={PUR} /></div>;
          })}
        </div>
        <h1 style={{ fontSize: 72, fontFamily: H, color: T, margin: 0, letterSpacing: -2, transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`, opacity: titleSpring }}>Feedback loop</h1>
        <div style={{ width: lineW, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${PUR}, transparent)` }} />
        <p style={{ fontSize: 22, fontFamily: B, color: T2, margin: 0, opacity: subtitleSpring, transform: `translateY(${interpolate(subtitleSpring, [0, 1], [20, 0])}px)` }}>It learns. It improves.</p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 2 — Candidate Review (showing profile + reject action)
// 300 frames
// ═══════════════════════════════════════════════════════
const CandidateReviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSlide = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  // Candidate info
  const candidateName = "Marcus Chen";
  const candidateRole = "Sales Manager · Berlin, DE";
  const matchScore = 72;

  // Skills appearing staggered
  const skills = [
    { label: "B2B Sales", match: true },
    { label: "CRM Tools", match: false },
    { label: "SaaS Experience", match: true },
    { label: "Lead Generation", match: false },
    { label: "English Fluent", match: true },
  ];

  // Experience items
  const experiences = [
    { company: "TechVentures GmbH", role: "Account Executive", years: "2021–2024" },
    { company: "SalesForce EU", role: "Inside Sales Rep", years: "2019–2021" },
  ];

  // Button interactions
  const rejectClickFrame = 200;
  const rejectClicked = frame >= rejectClickFrame;

  // End zoom
  const sceneLen = 300;
  const endZoom = interpolate(frame, [sceneLen - 40, sceneLen], [1, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${endZoom})`, transformOrigin: "center 70%" }}>
        {/* Floating card */}
        <div style={{
          width: 700, background: CARD, borderRadius: 24,
          boxShadow: "0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)",
          opacity: panelSlide, transform: `translateY(${interpolate(panelSlide, [0, 1], [40, 0])}px)`,
          overflow: "hidden",
        }}>
          {/* Header bar */}
          <div style={{ padding: "18px 28px", background: FOOTER_BG, borderBottom: `1px solid ${BRD}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LaidbackLogo size={18} />
              <span style={{ fontFamily: H, fontSize: 15, color: T }}>Candidate Review</span>
              <span style={{ fontFamily: B, fontSize: 12, color: T2, marginLeft: 8 }}>3 of 10</span>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {["Job", "Review (10)", "Pipeline"].map((tab, i) => (
                <span key={i} style={{
                  fontFamily: B, fontSize: 12, color: i === 1 ? T : T2,
                  padding: "4px 12px", borderRadius: 6,
                  background: i === 1 ? CARD : "transparent",
                  boxShadow: i === 1 ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                }}>{tab}</span>
              ))}
            </div>
          </div>

          {/* Candidate content */}
          <div style={{ padding: "28px 32px" }}>
            {/* Profile header */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <Avatar src={PHOTOS[0]} size={56} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: H, fontSize: 22, color: T, letterSpacing: -0.3 }}>{candidateName}</div>
                <div style={{ fontFamily: B, fontSize: 14, color: T2 }}>{candidateRole}</div>
              </div>
              {/* Match score */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 12,
                background: ORA_BG, border: `1px solid ${ORA}20`,
                opacity: spring({ frame: frame - 20, fps, config: { damping: 200 } }),
              }}>
                <span style={{ fontFamily: B, fontSize: 22, fontWeight: 700, color: ORA }}>{matchScore}%</span>
                <span style={{ fontFamily: B, fontSize: 12, color: ORA }}>match</span>
              </div>
            </div>

            {/* Skills grid */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {skills.map((sk, i) => {
                const ss = spring({ frame: frame - 30 - i * 5, fps, config: { damping: 22 } });
                return (
                  <div key={i} style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "6px 14px", borderRadius: 20,
                    background: sk.match ? GRN_BG : RED_BG,
                    border: `1px solid ${sk.match ? GRN : RED}15`,
                    opacity: ss,
                  }}>
                    {sk.match ? <IcoCheck s={12} c={GRN} /> : <IcoX s={12} c={RED} />}
                    <span style={{ fontFamily: B, fontSize: 12, color: sk.match ? GRN : RED }}>{sk.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Experience */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: B, fontSize: 12, color: T2, textTransform: "uppercase" as const, letterSpacing: 1 }}>Experience</span>
              {experiences.map((exp, i) => {
                const es = spring({ frame: frame - 55 - i * 8, fps, config: { damping: 22 } });
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 0", borderBottom: i < experiences.length - 1 ? `1px solid ${BRD}` : "none",
                    opacity: es,
                  }}>
                    <div>
                      <div style={{ fontFamily: B, fontSize: 14, color: T, fontWeight: 500 }}>{exp.company}</div>
                      <div style={{ fontFamily: B, fontSize: 12, color: T2 }}>{exp.role}</div>
                    </div>
                    <span style={{ fontFamily: B, fontSize: 12, color: T2 }}>{exp.years}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer with action buttons */}
          <div style={{
            padding: "16px 32px", background: FOOTER_BG, borderTop: `1px solid ${BRD}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontFamily: H, fontSize: 14, color: T }}>Candidates Batch 3</span>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{
                padding: "8px 20px", borderRadius: 10, border: `1px solid ${BRD}`,
                background: CARD, fontFamily: B, fontSize: 13, color: T2,
              }}>Skip</div>
              <div style={{
                padding: "8px 20px", borderRadius: 10,
                background: rejectClicked ? RED : CARD,
                border: `1px solid ${rejectClicked ? RED : BRD}`,
                color: rejectClicked ? "#fff" : RED,
                fontFamily: B, fontSize: 13, fontWeight: 500,
                transform: rejectClicked && frame < rejectClickFrame + 8 ? "scale(0.95)" : "scale(1)",
              }}>Not a good fit</div>
              <div style={{
                padding: "8px 20px", borderRadius: 10,
                background: `linear-gradient(135deg, ${ACC}, ${ACC_D})`,
                color: "#fff", fontFamily: B, fontSize: 13, fontWeight: 500,
              }}>Save to job</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 3 — Feedback Panel (expanded after reject)
// 320 frames
// ═══════════════════════════════════════════════════════
const FeedbackScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSlide = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  // Rating selection animation
  const ratingSelectFrame = 60;
  const selectedRating = frame >= ratingSelectFrame ? 2 : null;

  // Text typing
  const feedbackText = "Missing required CRM experience, no direct B2B lead generation background.";
  const textStart = 90;
  const typedChars = Math.floor(Math.max(0, (frame - textStart) * 1.2));
  const displayText = feedbackText.slice(0, Math.min(typedChars, feedbackText.length));
  const textDone = displayText.length >= feedbackText.length;

  // Train & Reject button click
  const trainClickFrame = 200;
  const trainClicked = frame >= trainClickFrame;

  // Success confirmation
  const confirmStart = 215;
  const confirmSpring = spring({ frame: frame - confirmStart, fps, config: { damping: 18 } });

  // End zoom
  const sceneLen = 320;
  const endZoom = interpolate(frame, [sceneLen - 40, sceneLen], [1, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });

  // Blinking cursor
  const cursorOp = interpolate(frame % 16, [0, 8, 16], [1, 0, 1]);

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${endZoom})`, transformOrigin: "center 70%" }}>
        <div style={{
          width: 700, background: CARD, borderRadius: 24,
          boxShadow: "0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)",
          opacity: panelSlide, transform: `translateY(${interpolate(panelSlide, [0, 1], [40, 0])}px)`,
          overflow: "hidden",
        }}>
          {/* Compact candidate header */}
          <div style={{ padding: "18px 28px", background: FOOTER_BG, borderBottom: `1px solid ${BRD}`, display: "flex", alignItems: "center", gap: 14 }}>
            <Avatar src={PHOTOS[0]} size={36} />
            <div>
              <div style={{ fontFamily: B, fontSize: 14, color: T, fontWeight: 500 }}>Marcus Chen</div>
              <div style={{ fontFamily: B, fontSize: 12, color: T2 }}>Sales Manager · Berlin, DE</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 8, background: RED_BG }}>
              <IcoThumbDown s={13} c={RED} />
              <span style={{ fontFamily: B, fontSize: 12, color: RED, fontWeight: 500 }}>Not a good fit</span>
            </div>
          </div>

          {/* Feedback form */}
          <div style={{ padding: "28px 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <IcoSparkle s={18} c={ACC} />
              <span style={{ fontFamily: H, fontSize: 20, color: T }}>Train the system</span>
            </div>

            <div style={{ display: "flex", gap: 28 }}>
              {/* Left: Rating */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontFamily: B, fontSize: 12, color: T2, fontWeight: 500, marginBottom: 10 }}>
                  How bad is this fit? <span style={{ color: RED }}>*</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[1, 2, 3].map((r) => {
                    const isSelected = selectedRating === r;
                    const rSpring = spring({ frame: frame - ratingSelectFrame, fps, config: { damping: 15 } });
                    return (
                      <div key={r} style={{
                        width: 44, height: 44, borderRadius: 10,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: B, fontSize: 15, fontWeight: 600,
                        background: isSelected ? RED : CARD,
                        color: isSelected ? "#fff" : T,
                        border: `1.5px solid ${isSelected ? RED : BRD}`,
                        transform: isSelected ? `scale(${0.92 + rSpring * 0.08})` : "scale(1)",
                      }}>{r}</div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontFamily: B, fontSize: 10, color: T2 }}>Minor</span>
                  <span style={{ fontFamily: B, fontSize: 10, color: T2 }}>Major</span>
                </div>
              </div>

              {/* Right: Text feedback */}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: B, fontSize: 12, color: T2, fontWeight: 500, marginBottom: 10 }}>
                  Why reject? <span style={{ color: RED }}>*</span>
                </div>
                <div style={{
                  minHeight: 88, padding: "12px 16px", borderRadius: 12,
                  background: CARD, border: `1.5px solid ${frame >= textStart && !textDone ? ACC : BRD}`,
                  fontFamily: B, fontSize: 14, color: T, lineHeight: 1.6,
                }}>
                  {displayText}
                  {!textDone && frame >= textStart && (
                    <span style={{ display: "inline-block", width: 2, height: "1.1em", background: ACC, marginLeft: 1, opacity: cursorOp, verticalAlign: "text-bottom" }} />
                  )}
                  {frame < textStart && (
                    <span style={{ color: "#bbb" }}>e.g., Missing required skills...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
              <div style={{
                padding: "8px 18px", borderRadius: 10, border: `1px solid ${BRD}`,
                background: CARD, fontFamily: B, fontSize: 13, color: T2,
              }}>Skip & Reject</div>
              <div style={{
                padding: "8px 18px", borderRadius: 10,
                background: trainClicked ? GRN : RED,
                color: "#fff", fontFamily: B, fontSize: 13, fontWeight: 500,
                display: "flex", alignItems: "center", gap: 6,
                transform: trainClicked && frame < trainClickFrame + 8 ? "scale(0.95)" : "scale(1)",
                opacity: textDone ? 1 : 0.5,
              }}>
                {trainClicked ? <><IcoCheck s={13} c="#fff" /> Trained!</> : "Train & Reject"}
              </div>
            </div>

            {/* Confirmation message */}
            {frame >= confirmStart && (
              <div style={{
                marginTop: 16, padding: "14px 20px", borderRadius: 12,
                background: PUR_BG, border: `1px solid ${PUR}20`,
                display: "flex", alignItems: "center", gap: 10,
                opacity: confirmSpring, transform: `scale(${0.96 + confirmSpring * 0.04})`,
              }}>
                <IcoBrain s={18} c={PUR} />
                <div>
                  <div style={{ fontFamily: B, fontSize: 13, color: PUR, fontWeight: 500 }}>Feedback recorded — brain updating</div>
                  <div style={{ fontFamily: B, fontSize: 11.5, color: T2 }}>Future matches will reflect this preference</div>
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
// SCENE 4 — Brain Adjustments (system learning visualization)
// 340 frames
// ═══════════════════════════════════════════════════════
const BrainAdjustmentsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  // Adjustments appearing staggered
  const adjustments = [
    { label: "B2B SaaS Experience", change: "+15%", direction: "up", color: GRN },
    { label: "CRM Proficiency", change: "Critical", direction: "up", color: RED },
    { label: "International Experience", change: "+10%", direction: "up", color: GRN },
    { label: "Non-Sales Roles", change: "−20%", direction: "down", color: RED },
  ];

  // Key insights typed
  const insight1 = "You prefer candidates with strong B2B sales experience at SaaS companies.";
  const insight2 = "CRM proficiency is now marked as a critical requirement.";
  const insightStart = 100;
  const i1Chars = Math.floor(Math.max(0, (frame - insightStart) * 1.5));
  const i1Text = insight1.slice(0, Math.min(i1Chars, insight1.length));
  const i1Done = i1Text.length >= insight1.length;
  const i2Start = insightStart + Math.ceil(insight1.length / 1.5) + 15;
  const i2Chars = Math.floor(Math.max(0, (frame - i2Start) * 1.5));
  const i2Text = insight2.slice(0, Math.min(i2Chars, insight2.length));

  // Feedback history
  const feedbackItems = [
    { name: "Sarah Johnson", action: "saved", rating: 3, color: GRN },
    { name: "Marcus Chen", action: "rejected", rating: 2, color: RED },
    { name: "Elena Kowalski", action: "saved", rating: 2, color: GRN },
  ];
  const historyStart = 220;

  // End zoom
  const sceneLen = 340;
  const endZoom = interpolate(frame, [sceneLen - 40, sceneLen], [1, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${endZoom})`, transformOrigin: "center center" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, opacity: cardSpring }}>
          <IcoBrain s={22} c={PUR} />
          <span style={{ fontSize: 24, fontFamily: H, color: T }}>Brain adjustments</span>
        </div>

        <div style={{
          width: 740, background: CARD, borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          padding: "32px 36px",
          opacity: cardSpring, transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
        }}>
          {/* System alignment banner */}
          <div style={{
            padding: "18px 22px", borderRadius: 16, marginBottom: 24,
            background: `linear-gradient(135deg, #EBDBBD 0%, #D5A27F 20%, #CD785C 45%, #CD785C 100%)`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontFamily: H, fontSize: 16, color: "#000", marginBottom: 2 }}>System alignment</div>
              <div style={{ fontFamily: B, fontSize: 20, color: "#000", fontWeight: 600 }}>All candidates reviewed!</div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { icon: <IcoCheck s={14} c="#000" />, label: "4 saved" },
                { icon: <IcoX s={14} c="#000" />, label: "3 rejected" },
              ].map((st, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, opacity: spring({ frame: frame - 20 - i * 8, fps, config: { damping: 200 } }) }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{st.icon}</div>
                  <span style={{ fontFamily: B, fontSize: 13, color: "#000", fontWeight: 500 }}>{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: H, fontSize: 18, color: T, marginBottom: 10 }}>Key insights</div>
            <div style={{ fontFamily: B, fontSize: 12, color: T2, marginBottom: 8 }}>What Laidback learned from your feedback</div>
            <div style={{
              padding: "14px 18px", borderRadius: 12, background: "#FAFAF7",
              border: `1px solid ${BRD}`, fontFamily: B, fontSize: 13.5, color: T, lineHeight: 1.7,
            }}>
              {i1Text}
              {i1Done && <br />}
              {i1Done && i2Text}
            </div>
          </div>

          {/* Weight adjustments */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: H, fontSize: 18, color: T, marginBottom: 12 }}>Weight adjustments</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {adjustments.map((adj, i) => {
                const as = spring({ frame: frame - 60 - i * 8, fps, config: { damping: 22 } });
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 16px", borderRadius: 12,
                    background: adj.color === GRN ? GRN_BG : RED_BG,
                    border: `1px solid ${adj.color}12`,
                    opacity: as, transform: `translateX(${(1 - as) * -10}px)`,
                  }}>
                    <span style={{ fontFamily: B, fontSize: 13, color: T }}>{adj.label}</span>
                    <span style={{ fontFamily: B, fontSize: 13, color: adj.color, fontWeight: 600 }}>{adj.change}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback history compact */}
          {frame >= historyStart && (
            <div style={{ opacity: spring({ frame: frame - historyStart, fps, config: { damping: 200 } }) }}>
              <div style={{ fontFamily: H, fontSize: 18, color: T, marginBottom: 10 }}>Feedback history</div>
              {feedbackItems.map((fi, i) => {
                const fs = spring({ frame: frame - historyStart - 8 - i * 8, fps, config: { damping: 22 } });
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 14px", borderRadius: 10,
                    background: i % 2 === 0 ? "#FAFAF7" : "transparent",
                    opacity: fs,
                  }}>
                    <Avatar src={PHOTOS[i]} size={32} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: B, fontSize: 13, color: T, fontWeight: 500 }}>{fi.name}</div>
                    </div>
                    <div style={{
                      padding: "3px 10px", borderRadius: 6,
                      background: fi.color === GRN ? GRN_BG : RED_BG,
                      fontFamily: B, fontSize: 11, color: fi.color, fontWeight: 500,
                    }}>{fi.rating}/3</div>
                    <div style={{
                      padding: "3px 10px", borderRadius: 6,
                      background: fi.color === GRN ? GRN_BG : RED_BG,
                      fontFamily: B, fontSize: 11, color: fi.color, fontWeight: 500,
                      textTransform: "capitalize" as const,
                    }}>{fi.action}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 5 — Improved Results (better matches after learning)
// 260 frames
// ═══════════════════════════════════════════════════════
const ImprovedResultsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  const candidates = [
    { name: "Alex Rivera", role: "Enterprise Sales Lead · London", score: 94, skills: ["B2B SaaS", "CRM Expert", "Lead Gen"], photo: PHOTOS[1] },
    { name: "Yuki Tanaka", role: "Senior Sales Manager · Amsterdam", score: 91, skills: ["B2B Sales", "HubSpot", "International"], photo: PHOTOS[2] },
    { name: "Lina Berger", role: "Account Executive · Munich", score: 88, skills: ["SaaS Sales", "Salesforce", "DACH Market"], photo: PHOTOS[0] },
  ];

  // Score counter animation
  const avgScoreTarget = 91;
  const avgStart = 40;
  const avgProgress = interpolate(frame, [avgStart, avgStart + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const displayScore = Math.round(avgProgress * avgScoreTarget);

  const zoomIn = interpolate(frame, [0, 40], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${zoomIn})`, transformOrigin: "center center" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, opacity: cardSpring }}>
          <IcoTrending s={22} c={GRN} />
          <span style={{ fontSize: 24, fontFamily: H, color: T }}>Improved matches</span>
          <div style={{
            marginLeft: 12, padding: "4px 14px", borderRadius: 20,
            background: GRN_BG, border: `1px solid ${GRN}20`,
            fontFamily: B, fontSize: 13, color: GRN, fontWeight: 600,
            opacity: spring({ frame: frame - 30, fps, config: { damping: 200 } }),
          }}>
            Avg. {displayScore}% match
          </div>
        </div>

        <div style={{
          width: 720, background: CARD, borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          padding: "28px 32px",
          opacity: cardSpring, transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
        }}>
          {/* Before/After comparison */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div style={{
              flex: 1, padding: "14px 18px", borderRadius: 14,
              background: RED_BG, border: `1px solid ${RED}12`,
              opacity: spring({ frame: frame - 15, fps, config: { damping: 200 } }),
            }}>
              <div style={{ fontFamily: B, fontSize: 11, color: RED, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 4 }}>Before feedback</div>
              <div style={{ fontFamily: B, fontSize: 28, color: RED, fontWeight: 700 }}>72%</div>
              <div style={{ fontFamily: B, fontSize: 12, color: T2 }}>avg match quality</div>
            </div>
            <div style={{
              flex: 1, padding: "14px 18px", borderRadius: 14,
              background: GRN_BG, border: `1px solid ${GRN}12`,
              opacity: spring({ frame: frame - 25, fps, config: { damping: 200 } }),
            }}>
              <div style={{ fontFamily: B, fontSize: 11, color: GRN, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 4 }}>After feedback</div>
              <div style={{ fontFamily: B, fontSize: 28, color: GRN, fontWeight: 700 }}>{displayScore}%</div>
              <div style={{ fontFamily: B, fontSize: 12, color: T2 }}>avg match quality</div>
            </div>
          </div>

          {/* New top candidates */}
          {candidates.map((c, i) => {
            const cs = spring({ frame: frame - 70 - i * 15, fps, config: { damping: 22 } });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 18px", borderRadius: 14,
                background: i === 0 ? `${GRN}06` : "transparent",
                border: i === 0 ? `1px solid ${GRN}15` : `1px solid transparent`,
                marginBottom: 8, opacity: cs, transform: `translateX(${(1 - cs) * -14}px)`,
              }}>
                <Avatar src={c.photo} size={42} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: B, fontSize: 14, color: T, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontFamily: B, fontSize: 12, color: T2 }}>{c.role}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 5 }}>
                    {c.skills.map((sk, si) => (
                      <span key={si} style={{
                        padding: "2px 8px", borderRadius: 6, background: GRN_BG,
                        fontFamily: B, fontSize: 10.5, color: GRN,
                      }}>{sk}</span>
                    ))}
                  </div>
                </div>
                <div style={{
                  fontFamily: B, fontSize: 22, fontWeight: 700, color: GRN,
                  opacity: spring({ frame: frame - 85 - i * 15, fps, config: { damping: 200 } }),
                }}>{c.score}%</div>
              </div>
            );
          })}

          {/* Bottom message */}
          <div style={{
            marginTop: 16, padding: "14px 20px", borderRadius: 12,
            background: PUR_BG, border: `1px solid ${PUR}15`,
            display: "flex", alignItems: "center", gap: 10,
            opacity: spring({ frame: frame - 160, fps, config: { damping: 200 } }),
          }}>
            <IcoBrain s={18} c={PUR} />
            <span style={{ fontFamily: B, fontSize: 13, color: T }}>
              Search quality improved by <span style={{ color: PUR, fontWeight: 600 }}>26%</span> — the system keeps learning with every review
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════
export const FeedbackLoopVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={300}>
          <CandidateReviewScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence durationInFrames={320}>
          <FeedbackScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={340}>
          <BrainAdjustmentsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence durationInFrames={260}>
          <ImprovedResultsScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
