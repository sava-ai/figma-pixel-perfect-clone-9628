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
import { wipe } from "@remotion/transitions/wipe";
import { loadFont } from "@remotion/fonts";
import { loadFont as loadGoogleFont } from "@remotion/google-fonts/Inter";

loadGoogleFont("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });
loadFont({ family: "CooperLight", url: staticFile("fonts/CooperLtBTLight.ttf"), weight: "400" });

const H = "CooperLight, serif";
const B = "Inter, sans-serif";

const BG = "#f6f4f0";
const CARD = "#ffffff";
const CHAT_BG = "#FAF8F4";
const T = "#333333";
const T2 = "#7a7570";
const ACC = "#c9956b";
const ACC_D = "#a87a55";
const GRN = "#2d9d5c";
const GRN_BG = "rgba(45, 157, 92, 0.08)";
const BRD = "#ece8e2";
const BLU = "#4a7cff";
const BLU_BG = "rgba(74, 124, 255, 0.08)";
const PUR = "#7c5cbf";
const PUR_BG = "rgba(124, 92, 191, 0.08)";
const ORA = "#e8853d";
const ORA_BG = "rgba(232, 133, 61, 0.08)";

const PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face";

// ── Laidback Logo (matching other videos) ──
const LaidbackLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Img src={staticFile("images/logolaidback.svg")} style={{ width: size, height: size * 0.74, objectFit: "contain" }} />
);

// ── SVG Icons ──
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
const IcoArrowUp: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = "#fff" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
  </svg>
);
const IcoUser: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = T2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IcoFile: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = T2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
  </svg>
);
const IcoTarget: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = T2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IcoUpload: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = T2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
// Figma icon
const IcoFigma: React.FC<{ s?: number }> = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83"/>
    <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF"/>
    <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E"/>
    <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262"/>
    <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE"/>
  </svg>
);
const IcoPDF: React.FC<{ s?: number }> = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="1" width="20" height="22" rx="3" fill="#E5322D"/>
    <text x="12" y="15" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="sans-serif">PDF</text>
  </svg>
);
const IcoVideo: React.FC<{ s?: number }> = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="1" width="20" height="22" rx="3" fill="#6C5CE7"/>
    <polygon points="10 8 10 16 16 12" fill="#fff"/>
  </svg>
);

// ── Helpers ──
const useType = (text: string, frame: number, start: number, speed = 1.2) => {
  const n = Math.floor(Math.max(0, (frame - start) * speed));
  return text.slice(0, Math.min(n, text.length));
};

const BlinkCursor: React.FC<{ c?: string }> = ({ c = ACC }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame % 16, [0, 8, 16], [1, 0, 1]);
  return <span style={{ display: "inline-block", width: 2.5, height: "1.1em", background: c, marginLeft: 2, opacity: op, verticalAlign: "text-bottom" }} />;
};

const Avatar: React.FC<{ src: string; size?: number }> = ({ src, size = 36 }) => (
  <Img src={src} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${BRD}` }} />
);

// ═══════════════════════════════════════════════════════
// SCENE 1 — INTRO (matching JobBrief/Search style)
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
  const orbY = Math.sin(frame * 0.05) * 8;
  // End-of-scene zoom-in
  const sceneLen = 90;
  const endZoom = interpolate(frame, [sceneLen - 30, sceneLen], [1, 1.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center", transform: `scale(${endZoom})`, transformOrigin: "center center" }}>
      <div style={{ position: "absolute", top: 180 + orbY, right: 350, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${ACC}12 0%, transparent 70%)` }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ position: "relative", transform: `scale(${iconScale}) rotate(${iconRotate}deg)` }}>
          <div style={{ width: 100, height: 100, borderRadius: 24, background: `linear-gradient(145deg, ${ACC}, ${ACC_D})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 16px 50px rgba(201, 149, 107, 0.35)` }}>
            <IcoUser s={55} c="#fff" />
          </div>
          {[{ x: -35, y: -40, delay: 5, size: 14 }, { x: 40, y: -30, delay: 10, size: 10 }, { x: -25, y: 35, delay: 15, size: 8 }].map((s, i) => {
            const sSpring = spring({ frame: frame - s.delay, fps, config: { damping: 12 } });
            return <div key={i} style={{ position: "absolute", left: `calc(50% + ${s.x}px)`, top: `calc(50% + ${s.y + Math.sin((frame + i * 20) * 0.08) * 3}px)`, opacity: sSpring * 0.7, transform: `scale(${sSpring})` }}><IcoSparkle s={s.size} c={ACC} /></div>;
          })}
        </div>
        <h1 style={{ fontSize: 72, fontFamily: H, color: T, margin: 0, letterSpacing: -2, transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`, opacity: titleSpring }}>Applicant experience</h1>
        <div style={{ width: lineW, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${ACC}, transparent)` }} />
        <p style={{ fontSize: 22, fontFamily: B, color: T2, margin: 0, opacity: subtitleSpring, transform: `translateY(${interpolate(subtitleSpring, [0, 1], [20, 0])}px)` }}>Apply conversationally, stay informed</p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 2 — Career Page Chat (floating panel, like JobBrief)
// 280 frames
// ═══════════════════════════════════════════════════════
const CareerPageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSlide = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  const aiQ1 = "Hey! Tell me about yourself and the kind of role you're looking for.";
  const userA1 = "Product designer, 6 years — focused on design systems and fintech.";
  const aiQ2 = "We have a role that fits perfectly:";

  // Timing: each message waits for previous to finish + pause
  const aiQ1Typed = useType(aiQ1, frame, 15, 1.4);
  const aiQ1Done = aiQ1Typed.length >= aiQ1.length;
  // aiQ1 finishes ~15 + 65/1.4 ≈ 61, add 15f pause
  const userA1Start = 78;
  const userA1Typed = useType(userA1, frame, userA1Start, 1.1);
  const userA1Done = userA1Typed.length >= userA1.length;
  // userA1 finishes ~78 + 66/1.1 ≈ 138, add 18f pause
  const aiQ2Start = 158;
  const aiQ2Typed = useType(aiQ2, frame, aiQ2Start, 1.4);

  // Role card after AI finishes ~158 + 33/1.4 ≈ 182, add 10f
  const roleStart = 192;
  const roleSpring = spring({ frame: frame - roleStart, fps, config: { damping: 22, stiffness: 180 } });

  const applyBtnFrame = 210;
  const applyClicked = frame >= applyBtnFrame;

  // Confirmation message after click — must finish before transition
  const confirmStart = 222;
  const confirmText = "Great! Let's start with a quick screening.";
  const confirmTyped = useType(confirmText, frame, confirmStart + 6, 1.8);

  // End-of-scene zoom-in (dive into next scene)
  const sceneLen = 310;
  const zoom = interpolate(frame, [sceneLen - 40, sceneLen], [1, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: 640, background: CHAT_BG, borderRadius: 24,
        boxShadow: `0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)`,
        transform: `translateY(${interpolate(panelSlide, [0, 1], [40, 0])}px) scale(${zoom})`,
        transformOrigin: "center 70%",
        opacity: panelSlide,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 28px 0 28px", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: `2px solid ${T}`, paddingBottom: 12 }}>
            <IcoSparkle s={16} c={T} />
            <span style={{ fontSize: 15, fontFamily: B, color: T }}>Career chat</span>
          </div>
          <span style={{ fontSize: 15, fontFamily: B, color: T2, paddingBottom: 12 }}>Open roles</span>
        </div>
        <div style={{ height: 1, background: BRD, margin: "0 28px" }} />

        <div style={{ padding: "24px 28px", minHeight: 380 }}>
          {/* AI Q1 */}
          {frame > 10 && (
            <div style={{ marginBottom: 20, opacity: spring({ frame: frame - 10, fps, config: { damping: 200 } }) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <IcoSparkle s={14} c={ACC} />
                <span style={{ fontSize: 13, fontFamily: B, color: T }}>Laidback</span>
              </div>
              <p style={{ fontSize: 15, fontFamily: B, color: T, lineHeight: 1.7, margin: 0 }}>
                {aiQ1Typed}{!aiQ1Done && <BlinkCursor />}
              </p>
            </div>
          )}

          {/* User A1 */}
          {frame > userA1Start && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20, opacity: spring({ frame: frame - userA1Start, fps, config: { damping: 200 } }) }}>
              <div style={{ background: CARD, borderRadius: 18, padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: 420, fontSize: 15, fontFamily: B, color: T, lineHeight: 1.6 }}>
                {userA1Typed}{!userA1Done && <BlinkCursor />}
              </div>
            </div>
          )}

          {/* AI Q2 */}
          {frame > aiQ2Start && (
            <div style={{ marginBottom: 16, opacity: spring({ frame: frame - aiQ2Start, fps, config: { damping: 200 } }) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <IcoSparkle s={14} c={ACC} />
                <span style={{ fontSize: 13, fontFamily: B, color: T }}>Laidback</span>
              </div>
              <p style={{ fontSize: 15, fontFamily: B, color: T, lineHeight: 1.7, margin: 0 }}>
                {aiQ2Typed}
              </p>
            </div>
          )}

          {/* Role card */}
          {frame >= roleStart && (
            <div style={{
              marginLeft: 22, padding: "18px 22px", borderRadius: 16,
              background: CARD, border: `2px solid ${applyClicked ? ACC : BRD}`,
              opacity: roleSpring, transform: `translateY(${(1 - roleSpring) * 14}px)`,
              boxShadow: applyClicked ? `0 4px 20px ${ACC}18` : "0 2px 8px rgba(0,0,0,0.04)",
              maxWidth: 380,
            }}>
              <div style={{ fontFamily: H, fontSize: 17, color: T, marginBottom: 4 }}>Senior Product Designer</div>
              <div style={{ fontFamily: B, fontSize: 13, color: T2, marginBottom: 12 }}>Design Systems · Remote EU</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: GRN_BG }}>
                  <IcoCheck s={12} />
                  <span style={{ fontFamily: B, fontSize: 12, color: GRN }}>Strong match</span>
                </div>
                <div style={{
                  padding: "6px 16px", borderRadius: 10, background: ACC, color: "#fff",
                  fontFamily: B, fontSize: 13, fontWeight: 500,
                  transform: applyClicked ? "scale(0.96)" : "scale(1)",
                }}>
                  Apply
                </div>
              </div>
            </div>
          )}

          {/* Confirm after click */}
          {frame >= confirmStart && (
            <div style={{ marginTop: 18, opacity: spring({ frame: frame - confirmStart, fps, config: { damping: 200 } }) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <IcoSparkle s={14} c={ACC} />
                <span style={{ fontSize: 13, fontFamily: B, color: T }}>Laidback</span>
              </div>
              <p style={{ fontSize: 15, fontFamily: B, color: T, lineHeight: 1.7, margin: 0 }}>
                {confirmTyped}
              </p>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div style={{ padding: "0 28px 24px 28px" }}>
          <div style={{ background: CARD, borderRadius: 18, padding: "16px 18px", border: `1px solid ${BRD}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontFamily: B, color: "#bbb" }}>Tell me more about you...</span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: T, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IcoArrowUp s={16} />
            </div>
          </div>
        </div>
      </div>

      
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 3 — AI Screening (floating panel)
// 280 frames
// ═══════════════════════════════════════════════════════
const ScreeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelSlide = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  const aiQ1 = "What's your experience with design tokens and component libraries?";
  const userA1 = "Built a design system at Stripe — 200+ components, 40 engineers.";
  const aiQ2 = "How do you handle collaboration with engineering?";
  const userA2 = "Figma dev mode + shared Storybook. Weekly syncs.";

  // aiQ1: 66 chars, speed 1.4, starts 15 → finishes ~62, +15 pause
  const aiQ1Typed = useType(aiQ1, frame, 15, 1.4);
  const aiQ1Done = aiQ1Typed.length >= aiQ1.length;
  const userA1Start = 78;
  // userA1: 63 chars, speed 1.1 → finishes ~78+57=135, +18 pause
  const userA1Typed = useType(userA1, frame, userA1Start, 1.1);
  const userA1Done = userA1Typed.length >= userA1.length;
  const aiQ2Start = 155;
  // aiQ2: 49 chars, speed 1.4 → finishes ~155+35=190, +15 pause
  const aiQ2Typed = useType(aiQ2, frame, aiQ2Start, 1.4);
  const aiQ2Done = aiQ2Typed.length >= aiQ2.length;
  const userA2Start = 208;
  // userA2: 48 chars, speed 1.1 → finishes ~208+44=252
  const userA2Typed = useType(userA2, frame, userA2Start, 1.1);
  const userA2Done = userA2Typed.length >= userA2.length;

  // Assessment card after last answer settles
  const assessStart = 260;
  const assessSpring = spring({ frame: frame - assessStart, fps, config: { damping: 22 } });
  const criteria = [
    { label: "Design Systems", v: "Exceeds", col: GRN },
    { label: "Collaboration", v: "Strong", col: BLU },
    { label: "Technical Fluency", v: "Strong", col: BLU },
    { label: "Industry Experience", v: "Exceeds", col: GRN },
  ];

  // End-of-scene zoom-in
  const sceneLen = 330;
  const zoomOut = interpolate(frame, [sceneLen - 40, sceneLen], [1, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: 640, background: CHAT_BG, borderRadius: 24,
        boxShadow: `0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)`,
        transform: `translateY(${interpolate(panelSlide, [0, 1], [40, 0])}px) scale(${zoomOut})`,
        transformOrigin: "center 80%",
        opacity: panelSlide,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 28px 0 28px", display: "flex", alignItems: "center", gap: 12 }}>
          <IcoTarget s={16} c={BLU} />
          <span style={{ fontSize: 15, fontFamily: B, color: BLU, borderBottom: `2px solid ${BLU}`, paddingBottom: 12 }}>Pre-screening</span>
          <span style={{ fontSize: 15, fontFamily: B, color: T2, paddingBottom: 12, marginLeft: 12 }}>Assessment</span>
        </div>
        <div style={{ height: 1, background: BRD, margin: "0 28px" }} />

        <div style={{ padding: "24px 28px", minHeight: 380 }}>
          {/* AI Q1 */}
          {frame > 10 && (
            <div style={{ marginBottom: 18, opacity: spring({ frame: frame - 10, fps, config: { damping: 200 } }) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <IcoSparkle s={14} c={ACC} />
                <span style={{ fontSize: 13, fontFamily: B, color: T }}>Laidback</span>
              </div>
              <p style={{ fontSize: 15, fontFamily: B, color: T, lineHeight: 1.7, margin: 0 }}>{aiQ1Typed}{!aiQ1Done && <BlinkCursor />}</p>
            </div>
          )}
          {frame > userA1Start && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18, opacity: spring({ frame: frame - userA1Start, fps, config: { damping: 200 } }) }}>
              <div style={{ background: CARD, borderRadius: 18, padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: 420, fontSize: 15, fontFamily: B, color: T, lineHeight: 1.6 }}>{userA1Typed}{!userA1Done && <BlinkCursor />}</div>
            </div>
          )}
          {frame > aiQ2Start && (
            <div style={{ marginBottom: 18, opacity: spring({ frame: frame - aiQ2Start, fps, config: { damping: 200 } }) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <IcoSparkle s={14} c={ACC} />
                <span style={{ fontSize: 13, fontFamily: B, color: T }}>Laidback</span>
              </div>
              <p style={{ fontSize: 15, fontFamily: B, color: T, lineHeight: 1.7, margin: 0 }}>{aiQ2Typed}{!aiQ2Done && <BlinkCursor />}</p>
            </div>
          )}
          {frame > userA2Start && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18, opacity: spring({ frame: frame - userA2Start, fps, config: { damping: 200 } }) }}>
              <div style={{ background: CARD, borderRadius: 18, padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: 420, fontSize: 15, fontFamily: B, color: T, lineHeight: 1.6 }}>{userA2Typed}{!userA2Done && <BlinkCursor />}</div>
            </div>
          )}

          {/* Assessment result card */}
          {frame >= assessStart && (
            <div style={{
              marginTop: 8, padding: "20px 24px", borderRadius: 16,
              background: CARD, border: `1px solid ${BRD}`,
              opacity: assessSpring, transform: `translateY(${(1 - assessSpring) * 14}px)`,
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <IcoSparkle s={16} c={ACC} />
                <span style={{ fontFamily: H, fontSize: 16, color: T }}>Screening Assessment</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {criteria.map((c, i) => {
                  const cs = spring({ frame: frame - assessStart - 8 - i * 6, fps, config: { damping: 22 } });
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "8px 12px", borderRadius: 10,
                      background: c.col === GRN ? GRN_BG : BLU_BG,
                      opacity: cs,
                    }}>
                      <span style={{ fontFamily: B, fontSize: 12.5, color: T }}>{c.label}</span>
                      <span style={{ fontFamily: B, fontSize: 11.5, color: c.col, fontWeight: 500 }}>{c.v}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div style={{ padding: "0 28px 24px 28px" }}>
          <div style={{ background: CARD, borderRadius: 18, padding: "16px 18px", border: `1px solid ${BRD}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontFamily: B, color: "#bbb" }}>Answer the question...</span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: T, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IcoArrowUp s={16} />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 4 — Pipeline + Prep Notes (floating card, centered)
// 260 frames
// ═══════════════════════════════════════════════════════
const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const prepStart = 90;
  // End-of-scene zoom-in
  const sceneLen = 260;
  const zoomOut = interpolate(frame, [sceneLen - 40, sceneLen], [1, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });
  const zoomProgress = interpolate(frame, [0, 40], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }) * zoomOut;

  const steps = [
    { label: "Applied", done: true },
    { label: "Screening", done: true },
    { label: "Design Task", current: true },
    { label: "Interview", done: false },
    { label: "Final Review", done: false },
  ];

  const prepSpring = spring({ frame: frame - prepStart, fps, config: { damping: 22 } });

  const notes = [
    "Review Laidback's design system principles",
    "Prepare case study: Stripe component library",
    "Study accessibility patterns for fintech",
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${zoomProgress})`, transformOrigin: "center center" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, opacity: cardSpring }}>
          <IcoSparkle s={20} c={ACC} />
          <span style={{ fontSize: 22, fontFamily: H, color: T }}>Your application progress</span>
        </div>

        <div style={{
          width: 720, background: CARD, borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          padding: "32px 36px",
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
        }}>
          {/* Job header */}
          <div style={{ borderBottom: `1px solid ${BRD}`, paddingBottom: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontFamily: B, color: T2, textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 6 }}>Application</div>
            <div style={{ fontSize: 24, fontFamily: H, color: T, letterSpacing: -0.5 }}>Senior Product Designer</div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              {["Design Systems", "Remote EU"].map((tag, i) => (
                <span key={i} style={{
                  fontSize: 12, fontFamily: B, color: T2,
                  background: `${ACC}10`, border: `1px solid ${ACC}20`,
                  padding: "4px 10px", borderRadius: 8,
                  opacity: spring({ frame: frame - 15 - i * 5, fps, config: { damping: 200 } }),
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Pipeline stepper */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 28, padding: "0 8px" }}>
            {steps.map((st, i) => {
              const ss = spring({ frame: frame - 12 - i * 6, fps, config: { damping: 22 } });
              const isDone = st.done;
              const isCur = (st as any).current;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, opacity: ss }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: isDone ? GRN : isCur ? ORA : BRD,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: isCur ? `0 0 0 5px ${ORA}15` : "none",
                    }}>
                      {isDone ? <IcoCheck s={14} c="#fff" /> :
                       isCur ? <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} /> :
                       <div style={{ width: 6, height: 6, borderRadius: "50%", background: T2, opacity: 0.3 }} />}
                    </div>
                    <span style={{ fontFamily: B, fontSize: 11.5, color: isCur ? ORA : isDone ? GRN : T2, fontWeight: isCur ? 600 : 400 }}>{st.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: isDone ? GRN : BRD, marginTop: -20, marginLeft: 6, marginRight: 6 }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Prep notes */}
          <div style={{ opacity: prepSpring, transform: `translateY(${(1 - prepSpring) * 14}px)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: PUR_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IcoFile s={14} c={PUR} />
              </div>
              <div>
                <div style={{ fontFamily: B, fontSize: 14, color: T, fontWeight: 500 }}>Interview Prep Notes</div>
                <div style={{ fontFamily: B, fontSize: 12, color: T2 }}>AI-generated for your next step</div>
              </div>
            </div>
            {notes.map((n, i) => {
              const ns = spring({ frame: frame - prepStart - 10 - i * 8, fps, config: { damping: 22 } });
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                  borderRadius: 8, background: i % 2 === 0 ? PUR_BG : "transparent",
                  marginBottom: 3, opacity: ns,
                }}>
                  <IcoCheck s={12} c={PUR} />
                  <span style={{ fontFamily: B, fontSize: 13, color: T }}>{n}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 5 — Task Submission (floating card, centered)
// 240 frames
// ═══════════════════════════════════════════════════════
const TaskSubmitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const submitBtnFrame = 120;
  const confirmStart = 130;
  const confirmSpring = spring({ frame: frame - confirmStart, fps, config: { damping: 18 } });
  // No end zoom needed on last scene
  const zoomProgress = interpolate(frame, [0, 40], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });

  const files = [
    { name: "payment-flow.fig", size: "2.4 MB", icon: <IcoFigma s={18} />, uploadFrame: 25 },
    { name: "component-docs.pdf", size: "890 KB", icon: <IcoPDF s={18} />, uploadFrame: 40 },
    { name: "prototype-demo.mp4", size: "12 MB", icon: <IcoVideo s={18} />, uploadFrame: 55 },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${zoomProgress})`, transformOrigin: "center center" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, opacity: cardSpring }}>
          <IcoSparkle s={20} c={ACC} />
          <span style={{ fontSize: 22, fontFamily: H, color: T }}>Submit your design task</span>
        </div>

        <div style={{
          width: 620, background: CARD, borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          padding: "32px 36px",
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
        }}>
          {/* Drop zone */}
          <div style={{
            padding: "24px", borderRadius: 14, background: `${ACC}05`,
            border: `2px dashed ${BRD}`, marginBottom: 20,
            textAlign: "center" as const, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          }}>
            <IcoUpload s={22} c={T2} />
            <span style={{ fontFamily: B, fontSize: 13, color: T2 }}>Drop files or click to browse</span>
          </div>

          {/* File list */}
          {files.map((f, i) => {
            const fs = spring({ frame: frame - f.uploadFrame, fps, config: { damping: 22 } });
            if (frame < f.uploadFrame) return null;
            const progress = interpolate(frame, [f.uploadFrame, f.uploadFrame + 25], [0, 100], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "11px 16px",
                borderRadius: 10, background: CHAT_BG, border: `1px solid ${BRD}`,
                marginBottom: 6, opacity: fs, transform: `translateX(${(1 - fs) * -10}px)`,
              }}>
                {f.icon}
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: B, fontSize: 13, color: T }}>{f.name}</div>
                  <div style={{ fontFamily: B, fontSize: 11, color: T2 }}>{f.size}</div>
                </div>
                {progress >= 100 ? <IcoCheck s={15} c={GRN} /> : (
                  <div style={{ width: 50, height: 3, borderRadius: 2, background: BRD }}>
                    <div style={{ width: `${progress}%`, height: "100%", borderRadius: 2, background: ACC }} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit */}
          <div style={{
            marginTop: 16, padding: "10px 22px", borderRadius: 10,
            background: frame >= submitBtnFrame ? GRN : ACC,
            color: "#fff", fontFamily: B, fontSize: 14, fontWeight: 500,
            display: "inline-flex", alignItems: "center", gap: 8,
            transform: frame >= submitBtnFrame && frame < submitBtnFrame + 8 ? "scale(0.96)" : "scale(1)",
          }}>
            {frame >= confirmStart ? <><IcoCheck s={14} c="#fff" /> Submitted</> : "Submit Task"}
          </div>

          {/* Success */}
          {frame >= confirmStart && (
            <div style={{
              marginTop: 14, padding: "14px 20px", borderRadius: 12,
              background: GRN_BG, border: `1px solid ${GRN}20`,
              display: "flex", alignItems: "center", gap: 10,
              opacity: confirmSpring, transform: `scale(${0.96 + confirmSpring * 0.04})`,
            }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: GRN, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IcoCheck s={13} c="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: B, fontSize: 13, color: GRN, fontWeight: 500 }}>Task submitted successfully!</div>
                <div style={{ fontFamily: B, fontSize: 11.5, color: T2 }}>The hiring team has been notified</div>
              </div>
            </div>
          )}
        </div>
      </div>

      
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN COMPOSITION — 5 scenes with transitions
// ═══════════════════════════════════════════════════════
export const ApplicantVideo: React.FC = () => {
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
        <TransitionSeries.Sequence durationInFrames={310}>
          <CareerPageScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence durationInFrames={330}>
          <ScreeningScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={260}>
          <PipelineScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence durationInFrames={240}>
          <TaskSubmitScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
