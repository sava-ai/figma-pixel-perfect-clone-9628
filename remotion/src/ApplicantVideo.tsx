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
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/fonts";

loadFont({ family: "CooperLight", url: staticFile("fonts/CooperLtBTLight.ttf"), weight: "400" });
loadFont({ family: "LabilGrotesk", url: staticFile("fonts/LabilGrotesk-Regular.ttf"), weight: "400" });

const H = "CooperLight, serif";
const B = "LabilGrotesk, sans-serif";

const BG = "#f6f4f0";
const CARD = "#ffffff";
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

// ── SVG Icons ──
const IcoSparkle: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = ACC }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
);
const IcoCheck: React.FC<{ s?: number; c?: string }> = ({ s = 16, c = GRN }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IcoFile: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = T2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);
const IcoPlay: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = T2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);
const IcoUpload: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = T2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const IcoTarget: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = T2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IcoCal: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = T2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
  </svg>
);
const IcoClip: React.FC<{ s?: number; c?: string }> = ({ s = 18, c = T2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);
// Figma file icon
const IcoFigma: React.FC<{ s?: number }> = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83"/>
    <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF"/>
    <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E"/>
    <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262"/>
    <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE"/>
  </svg>
);
// PDF icon
const IcoPDF: React.FC<{ s?: number }> = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="1" width="20" height="22" rx="3" fill="#E5322D"/>
    <text x="12" y="15" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="sans-serif">PDF</text>
  </svg>
);
// Video file icon
const IcoVideo: React.FC<{ s?: number }> = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="1" width="20" height="22" rx="3" fill="#6C5CE7"/>
    <polygon points="10 8 10 16 16 12" fill="#fff"/>
  </svg>
);

// ── Helpers ──
const useType = (text: string, frame: number, start: number, speed = 1.8) => {
  const n = Math.floor(Math.max(0, (frame - start) * speed));
  return text.slice(0, Math.min(n, text.length));
};

const Cursor: React.FC<{ x: number; y: number; frame: number; click?: number }> = ({ x, y, frame, click }) => {
  const cs = click !== undefined
    ? interpolate(frame, [click, click + 4, click + 12], [1, 0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const ripple = click !== undefined
    ? interpolate(frame, [click, click + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 9999, pointerEvents: "none", transform: `scale(${cs})` }}>
      {ripple > 0 && ripple < 1 && (
        <div style={{ position: "absolute", left: -12, top: -12, width: 24, height: 24, borderRadius: "50%", border: `2px solid ${ACC}`, opacity: 1 - ripple, transform: `scale(${1 + ripple * 1.5})` }} />
      )}
      <svg width="22" height="26" viewBox="0 0 24 28" fill="none">
        <path d="M5.5 2L5.5 20.5L9.5 16.5L14 24L17.5 22L13 14.5L18.5 14.5L5.5 2Z" fill={ACC_D} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const Avatar: React.FC<{ src: string; size?: number }> = ({ src, size = 36 }) => (
  <Img src={src} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
);

const Logo: React.FC = () => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 68, background: CARD, borderBottom: `1px solid ${BRD}`, display: "flex", alignItems: "center", padding: "0 56px", zIndex: 10 }}>
    <Img src={staticFile("images/logotype.svg")} style={{ height: 30 }} />
  </div>
);

// ═══════════════════════════════════════════════════════
// SCENE 1 — Career Page: Conversational Self-Selection
// ═══════════════════════════════════════════════════════
const S1_CareerPage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageIn = spring({ frame, fps, config: { damping: 200 } });

  const msgs: { role: "ai" | "user"; text: string; start: number }[] = [
    { role: "ai", text: "Hey! Tell me about yourself and the kind of role you're looking for.", start: 20 },
    { role: "user", text: "Product designer, 6 years — focused on design systems and fintech.", start: 75 },
    { role: "ai", text: "We have a role that fits perfectly:", start: 125 },
  ];

  const roleStart = 158;
  const roleSpring = spring({ frame: frame - roleStart, fps, config: { damping: 22, stiffness: 180 } });

  // Cursor moves to the "Apply" button — pre-zoom position ~(600, 287)
  const applyBtnFrame = 200;
  const cursorShow = frame >= 180 && frame < 215;
  // Pre-zoom button position
  const btnX = 600, btnY = 287;
  
  // Zoom kicks in at frame 195
  const zoom = interpolate(frame, [0, 10, 195, 215, 260, 290], [1.02, 1, 1, 1.25, 1.25, 1.35], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });
  const panX = interpolate(frame, [195, 215, 260, 290], [0, -80, -80, -80], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });
  const panY = interpolate(frame, [195, 215, 260, 290], [0, -60, -60, -120], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });
  
  // Compute screen-space cursor position (accounting for zoom+pan)
  const originX = 960, originY = 432; // 50% of 1920, 40% of 1080
  const screenBtnX = (btnX - originX) * zoom + originX + panX * zoom;
  const screenBtnY = (btnY - originY) * zoom + originY + panY * zoom;
  const cx = interpolate(frame, [180, 198], [850, screenBtnX], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });
  const cy = interpolate(frame, [180, 198], [200, screenBtnY], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });

  const applyClick = frame >= applyBtnFrame;
  const confirmMsg = { text: "Great choice! Let's get you started with a quick screening.", start: 220 };
  const confirmSpring = spring({ frame: frame - confirmMsg.start, fps, config: { damping: 28 } });

  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ width: "100%", height: "100%", transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`, transformOrigin: "50% 40%" }}>
      <Logo />
      <div style={{ position: "absolute", top: 96, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: pageIn }}>
        <div style={{ width: 740, display: "flex", flexDirection: "column" }}>
          {msgs.map((m, i) => {
            const s = spring({ frame: frame - m.start, fps, config: { damping: 28, stiffness: 180 } });
            if (frame < m.start) return null;
            const txt = useType(m.text, frame, m.start + 6);
            return (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 18, opacity: s, transform: `translateY(${(1 - s) * 10}px)`, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                {m.role === "ai" ? (
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: ACC, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IcoSparkle s={16} c="#fff" />
                  </div>
                ) : <Avatar src={PHOTO} size={36} />}
                <div style={{
                  maxWidth: 520, padding: "13px 18px",
                  borderRadius: m.role === "ai" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                  background: m.role === "ai" ? CARD : ACC, color: m.role === "ai" ? T : "#fff",
                  fontFamily: B, fontSize: 15.5, lineHeight: 1.6,
                  border: m.role === "ai" ? `1px solid ${BRD}` : "none",
                }}>
                  {txt}
                </div>
              </div>
            );
          })}

          {/* Role card */}
          {frame >= roleStart && (
            <div style={{
              marginLeft: 48, marginTop: 4, padding: "20px 24px", borderRadius: 16,
              background: CARD, border: `2px solid ${applyClick ? ACC : BRD}`,
              opacity: roleSpring, transform: `translateY(${(1 - roleSpring) * 14}px)`,
              boxShadow: applyClick ? `0 4px 20px ${ACC}18` : "0 2px 8px rgba(0,0,0,0.04)",
              maxWidth: 420,
            }}>
              <div style={{ fontFamily: H, fontSize: 17, color: T, marginBottom: 6 }}>Senior Product Designer</div>
              <div style={{ fontFamily: B, fontSize: 13, color: T2, marginBottom: 10 }}>Design Systems · Remote EU</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: GRN_BG }}>
                  <IcoCheck s={12} />
                  <span style={{ fontFamily: B, fontSize: 12, color: GRN }}>Strong match</span>
                </div>
                <div style={{
                  padding: "6px 16px", borderRadius: 10, background: ACC, color: "#fff",
                  fontFamily: B, fontSize: 13, fontWeight: 500,
                  transform: applyClick ? "scale(0.96)" : "scale(1)",
                }}>
                  Apply
                </div>
              </div>
            </div>
          )}

          {/* AI confirm after click */}
          {frame >= confirmMsg.start && (
            <div style={{ display: "flex", gap: 12, marginTop: 18, opacity: confirmSpring, transform: `translateY(${(1 - confirmSpring) * 10}px)` }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: ACC, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IcoSparkle s={16} c="#fff" />
              </div>
              <div style={{ maxWidth: 520, padding: "13px 18px", borderRadius: "4px 16px 16px 16px", background: CARD, color: T, fontFamily: B, fontSize: 15.5, lineHeight: 1.6, border: `1px solid ${BRD}` }}>
                {useType(confirmMsg.text, frame, confirmMsg.start + 6)}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      {cursorShow && <Cursor x={cx} y={cy} frame={frame} click={applyBtnFrame} />}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 2 — AI Pre-Screening
// ═══════════════════════════════════════════════════════
const S2_Screening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zoom into assessment card when it appears
  const zoom = interpolate(frame, [0, 30, 180, 220, 250], [1.06, 1, 1, 1.3, 1.35], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });
  const panY2 = interpolate(frame, [180, 220], [0, -100], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });

  const msgs: { role: "ai" | "user"; text: string; start: number }[] = [
    { role: "ai", text: "What's your experience with design tokens and component libraries?", start: 15 },
    { role: "user", text: "Built a design system from scratch at Stripe — 200+ components, used by 40 engineers.", start: 60 },
    { role: "ai", text: "How do you handle collaboration with engineering on design handoff?", start: 105 },
    { role: "user", text: "Figma dev mode + shared Storybook. Weekly syncs with eng leads.", start: 145 },
  ];

  const assessStart = 185;
  const assessSpring = spring({ frame: frame - assessStart, fps, config: { damping: 22 } });

  const criteria = [
    { label: "Design Systems", v: "Exceeds", col: GRN },
    { label: "Collaboration", v: "Strong", col: BLU },
    { label: "Technical Fluency", v: "Strong", col: BLU },
    { label: "Industry Experience", v: "Exceeds", col: GRN },
  ];

  return (
    <AbsoluteFill style={{ background: BG, transform: `scale(${zoom}) translateY(${panY2}px)`, transformOrigin: "45% 50%" }}>
      <Logo />
      <div style={{ position: "absolute", top: 96, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 740 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <IcoTarget s={14} c={BLU} />
            <span style={{ fontFamily: B, fontSize: 13, color: BLU }}>Pre-Screening in progress</span>
          </div>

          {msgs.map((m, i) => {
            const s = spring({ frame: frame - m.start, fps, config: { damping: 28 } });
            if (frame < m.start) return null;
            return (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, opacity: s, transform: `translateY(${(1 - s) * 10}px)`, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                {m.role === "ai" ? (
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: ACC, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IcoSparkle s={16} c="#fff" />
                  </div>
                ) : <Avatar src={PHOTO} size={36} />}
                <div style={{
                  maxWidth: 500, padding: "13px 18px",
                  borderRadius: m.role === "ai" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                  background: m.role === "ai" ? CARD : ACC, color: m.role === "ai" ? T : "#fff",
                  fontFamily: B, fontSize: 15.5, lineHeight: 1.6,
                  border: m.role === "ai" ? `1px solid ${BRD}` : "none",
                }}>
                  {useType(m.text, frame, m.start + 6)}
                </div>
              </div>
            );
          })}

          {frame >= assessStart && (
            <div style={{
              marginTop: 16, marginLeft: 48, padding: "22px 26px", borderRadius: 16,
              background: CARD, border: `1px solid ${BRD}`,
              opacity: assessSpring, transform: `translateY(${(1 - assessSpring) * 14}px)`,
              maxWidth: 500,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <IcoSparkle s={16} c={ACC} />
                <span style={{ fontFamily: H, fontSize: 17, color: T }}>Screening Assessment</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {criteria.map((c, i) => {
                  const cs = spring({ frame: frame - assessStart - 8 - i * 6, fps, config: { damping: 22 } });
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "9px 14px", borderRadius: 10,
                      background: c.col === GRN ? GRN_BG : BLU_BG,
                      opacity: cs,
                    }}>
                      <span style={{ fontFamily: B, fontSize: 13, color: T }}>{c.label}</span>
                      <span style={{ fontFamily: B, fontSize: 12, color: c.col, fontWeight: 500 }}>{c.v}</span>
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

// ═══════════════════════════════════════════════════════
// SCENE 3 — Pipeline + Prep Notes (combined, cleaner)
// ═══════════════════════════════════════════════════════
const S3_Pipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageIn = spring({ frame, fps, config: { damping: 200 } });
  const zoom = interpolate(frame, [0, 260], [1, 1.04], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });

  const steps = [
    { label: "Applied", done: true },
    { label: "Screening", done: true },
    { label: "Design Task", current: true },
    { label: "Interview", done: false },
    { label: "Final Review", done: false },
  ];

  const prepStart = 80;
  const prepSpring = spring({ frame: frame - prepStart, fps, config: { damping: 22 } });

  // Zoom into "Design Task" step then back out to reveal prep notes
  const focusZoom = interpolate(frame, [40, 70, 130, 170], [1, 1.3, 1.3, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });
  const focusPanX = interpolate(frame, [40, 70, 130, 170], [0, -200, -200, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });
  const focusPanY = interpolate(frame, [40, 70, 130, 170], [0, -30, -30, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });
  const combinedZoom = zoom * focusZoom;

  const notes = [
    "Review Laidback's design system principles",
    "Prepare case study: Stripe component library",
    "Study accessibility patterns for fintech",
  ];

  return (
    <AbsoluteFill style={{ background: BG, transform: `scale(${combinedZoom}) translate(${focusPanX}px, ${focusPanY}px)`, transformOrigin: "50% 30%" }}>
      <Logo />
      <div style={{ position: "absolute", top: 96, left: 80, right: 80 }}>
        <div style={{ marginBottom: 36, opacity: pageIn }}>
          <div style={{ fontFamily: H, fontSize: 30, color: T, marginBottom: 4 }}>Senior Product Designer</div>
          <div style={{ fontFamily: B, fontSize: 15, color: T2 }}>Design Systems · Remote EU</div>
        </div>

        {/* Pipeline stepper */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 44, padding: "0 16px" }}>
          {steps.map((st, i) => {
            const ss = spring({ frame: frame - 12 - i * 6, fps, config: { damping: 22 } });
            const isDone = st.done;
            const isCur = (st as any).current;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, opacity: ss }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: isDone ? GRN : isCur ? ORA : BRD,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: isCur ? `0 0 0 5px ${ORA}15` : "none",
                  }}>
                    {isDone ? <IcoCheck s={15} c="#fff" /> :
                     isCur ? <IcoClip s={14} c="#fff" /> :
                     <div style={{ width: 8, height: 8, borderRadius: "50%", background: T2, opacity: 0.3 }} />}
                  </div>
                  <span style={{ fontFamily: B, fontSize: 12, color: isCur ? ORA : isDone ? GRN : T2, fontWeight: isCur ? 600 : 400 }}>{st.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: isDone ? GRN : BRD, marginTop: -20, marginLeft: 6, marginRight: 6 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Prep notes card */}
        <div style={{
          padding: "24px 28px", borderRadius: 16, background: CARD, border: `1px solid ${BRD}`,
          maxWidth: 520, opacity: prepSpring, transform: `translateY(${(1 - prepSpring) * 14}px)`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: PUR_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IcoFile s={14} c={PUR} />
            </div>
            <div>
              <div style={{ fontFamily: H, fontSize: 16, color: T }}>Interview Prep Notes</div>
              <div style={{ fontFamily: B, fontSize: 12, color: T2 }}>AI-generated for your next step</div>
            </div>
          </div>
          {notes.map((n, i) => {
            const ns = spring({ frame: frame - prepStart - 12 - i * 8, fps, config: { damping: 22 } });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                borderRadius: 8, background: i % 2 === 0 ? PUR_BG : "transparent",
                marginBottom: 4, opacity: ns,
              }}>
                <IcoCheck s={12} c={PUR} />
                <span style={{ fontFamily: B, fontSize: 13.5, color: T }}>{n}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 4 — Task Submission (fixed icons + cursor)
// ═══════════════════════════════════════════════════════
const S4_TaskSubmit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageIn = spring({ frame, fps, config: { damping: 200 } });


  // Left sidebar tabs with proper icons
  const tabs = [
    { icon: <IcoClip s={16} c={ORA} />, label: "Task", active: true },
    { icon: <IcoFile s={16} c={T2} />, label: "Brief" },
    { icon: <IcoPlay s={16} c={T2} />, label: "Practice" },
    { icon: <IcoCal s={16} c={T2} />, label: "Schedule" },
  ];

  const files = [
    { name: "payment-flow.fig", size: "2.4 MB", icon: <IcoFigma s={18} />, uploadFrame: 30 },
    { name: "component-docs.pdf", size: "890 KB", icon: <IcoPDF s={18} />, uploadFrame: 45 },
    { name: "prototype-demo.mp4", size: "12 MB", icon: <IcoVideo s={18} />, uploadFrame: 60 },
  ];

  const submitBtnFrame = 120;
  const confirmStart = 130;
  const confirmSpring = spring({ frame: frame - confirmStart, fps, config: { damping: 18 } });

  // Cursor moves to Submit button — actual position ~(148, 387)
  const cursorShow = frame >= 105 && frame < 145;
  const cx = interpolate(frame, [105, 118], [400, 148], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });
  const cy = interpolate(frame, [105, 118], [250, 382], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });

  // Zoom into submit area on click, then pull back to show confirmation
  const s4zoom = interpolate(frame, [0, 30, 115, 135, 175, 230], [1.04, 1, 1, 1.3, 1.3, 1.1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });
  const s4panY = interpolate(frame, [115, 135, 175, 230], [0, -80, -80, -30], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });

  return (
    <AbsoluteFill style={{ background: BG, transform: `scale(${s4zoom}) translateY(${s4panY}px)`, transformOrigin: "25% 45%" }}>
      <Logo />
      <div style={{ position: "absolute", top: 68, left: 0, right: 0, bottom: 0, display: "flex" }}>
        {/* Left sidebar tabs */}
        <div style={{
          width: 72, background: CARD, borderRight: `1px solid ${BRD}`,
          display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, gap: 6,
        }}>
          {tabs.map((tab, i) => {
            const ts = spring({ frame: frame - 5 - i * 4, fps, config: { damping: 22 } });
            return (
              <div key={i} style={{
                width: 56, padding: "10px 0", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                background: tab.active ? ORA_BG : "transparent",
                border: tab.active ? `1px solid ${ORA}20` : "1px solid transparent",
                opacity: ts,
              }}>
                {tab.icon}
                <span style={{ fontFamily: B, fontSize: 10, color: tab.active ? ORA : T2 }}>{tab.label}</span>
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "28px 60px", display: "flex", gap: 28 }}>
          <div style={{ flex: 1.2, opacity: pageIn }}>
            <div style={{ fontFamily: H, fontSize: 24, color: T, marginBottom: 4 }}>Design Task</div>
            <div style={{ fontFamily: B, fontSize: 14, color: T2, marginBottom: 22 }}>Upload your files — everything in one place</div>

            {/* Drop zone */}
            <div style={{
              padding: "28px", borderRadius: 14, background: CARD,
              border: `2px dashed ${BRD}`, marginBottom: 16,
              textAlign: "center" as const, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            }}>
              <IcoUpload s={24} c={T2} />
              <span style={{ fontFamily: B, fontSize: 13, color: T2 }}>Drop files or click to browse</span>
            </div>

            {/* File list with proper icons */}
            {files.map((f, i) => {
              const fs = spring({ frame: frame - f.uploadFrame, fps, config: { damping: 22 } });
              if (frame < f.uploadFrame) return null;
              const progress = interpolate(frame, [f.uploadFrame, f.uploadFrame + 25], [0, 100], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  borderRadius: 10, background: CARD, border: `1px solid ${BRD}`,
                  marginBottom: 6, opacity: fs, transform: `translateX(${(1 - fs) * -10}px)`,
                }}>
                  {f.icon}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: B, fontSize: 13.5, color: T }}>{f.name}</div>
                    <div style={{ fontFamily: B, fontSize: 11, color: T2 }}>{f.size}</div>
                  </div>
                  {progress >= 100 ? (
                    <IcoCheck s={15} c={GRN} />
                  ) : (
                    <div style={{ width: 50, height: 3, borderRadius: 2, background: BRD }}>
                      <div style={{ width: `${progress}%`, height: "100%", borderRadius: 2, background: ACC }} />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Submit button */}
            <div style={{
              marginTop: 14, padding: "10px 22px", borderRadius: 10,
              background: frame >= submitBtnFrame ? GRN : ORA,
              color: "#fff", fontFamily: B, fontSize: 14, fontWeight: 500,
              display: "inline-flex", alignItems: "center", gap: 8,
              transform: frame >= submitBtnFrame && frame < submitBtnFrame + 8 ? "scale(0.96)" : "scale(1)",
            }}>
              {frame >= confirmStart ? <><IcoCheck s={14} c="#fff" /> Submitted</> : "Submit Task"}
            </div>

            {/* Success confirmation */}
            {frame >= confirmStart && (
              <div style={{
                marginTop: 14, padding: "14px 20px", borderRadius: 12,
                background: GRN_BG, border: `1px solid ${GRN}20`,
                display: "flex", alignItems: "center", gap: 10,
                opacity: confirmSpring, transform: `scale(${0.96 + confirmSpring * 0.04})`,
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: GRN, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IcoCheck s={14} c="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: B, fontSize: 14, color: GRN, fontWeight: 500 }}>Task submitted!</div>
                  <div style={{ fontFamily: B, fontSize: 12, color: T2 }}>Hiring team notified</div>
                </div>
              </div>
            )}
          </div>

          {/* Right — Journey timeline */}
          <div style={{ flex: 0.7 }}>
            <div style={{
              padding: "22px 24px", borderRadius: 16, background: CARD, border: `1px solid ${BRD}`,
            }}>
              <div style={{ fontFamily: H, fontSize: 17, color: T, marginBottom: 18 }}>Your Journey</div>
              {[
                { label: "Task submitted", time: "Just now", color: GRN },
                { label: "Interview scheduled", time: "Mar 22", color: BLU },
                { label: "Screening passed", time: "Mar 12", color: GRN },
              ].map((item, i) => {
                const ts = spring({ frame: frame - 20 - i * 10, fps, config: { damping: 22 } });
                return (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, opacity: ts }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: item.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IcoCheck s={12} c="#fff" />
                      </div>
                      {i < 2 && <div style={{ width: 2, flex: 1, background: BRD, marginTop: 3 }} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: B, fontSize: 13, color: T, fontWeight: 500 }}>{item.label}</div>
                      <div style={{ fontFamily: B, fontSize: 11, color: T2 }}>{item.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {cursorShow && <Cursor x={cx} y={cy} frame={frame} click={submitBtnFrame} />}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN COMPOSITION — 4 scenes, cleaner pacing
// ═══════════════════════════════════════════════════════
export const ApplicantVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={300}>
          <S1_CareerPage />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence durationInFrames={260}>
          <S2_Screening />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence durationInFrames={270}>
          <S3_Pipeline />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence durationInFrames={240}>
          <S4_TaskSubmit />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
