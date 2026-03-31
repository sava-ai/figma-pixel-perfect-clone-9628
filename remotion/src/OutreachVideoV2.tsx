import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";

// ── Load Fonts ──
const { fontFamily: sansFont } = loadDMSans("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const { fontFamily: serifFont } = loadFraunces("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

// ── Colors ──
const BG = "#f6f4f0";
const BG_WARM = "#faf8f5";
const CARD = "#ffffff";
const TEXT = "#1a1817";
const TEXT_SEC = "#7a7570";
const ACCENT = "#c9956b";
const ACCENT_DEEP = "#a87a55";
const ACCENT_BG = "rgba(201, 149, 107, 0.10)";
const GREEN = "#2d9d5c";
const GREEN_BG = "rgba(45, 157, 92, 0.08)";
const BORDER = "#ece8e2";
const SKELETON = "#e8e4de";

// ── Helpers ──
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

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

// Skeleton placeholder bar
const SkeletonBar: React.FC<{
  width: number;
  height?: number;
  delay: number;
  revealFrame: number;
  children?: React.ReactNode;
}> = ({ width, height = 16, delay, revealFrame, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const revealProgress = spring({
    frame: frame - revealFrame,
    fps,
    config: { damping: 200 },
  });

  const shimmerX = interpolate(frame % 60, [0, 60], [-width, width * 2]);

  if (revealProgress > 0.5 && children) {
    return (
      <div style={{ opacity: revealProgress }}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        width,
        height,
        borderRadius: height / 2,
        background: SKELETON,
        opacity: enterProgress,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: shimmerX,
          width: width * 0.4,
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        }}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 1: INTRO — Logo + Staggered word reveal
// 80 frames
// ═══════════════════════════════════════════════════════
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo bounces in
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const logoRotate = interpolate(
    spring({ frame, fps, config: { damping: 15, stiffness: 60 } }),
    [0, 1],
    [-15, 0]
  );

  // Words stagger in
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

  // Subtitle
  const subDelay = 30;
  const subProgress = spring({ frame: frame - subDelay, fps, config: { damping: 200 } });
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  // Accent line
  const lineW = interpolate(frame, [20, 55], [0, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Floating ambient shapes
  const orb1Y = Math.sin(frame * 0.05) * 8;
  const orb2Y = Math.cos(frame * 0.04) * 10;

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      {/* Ambient orbs */}
      <div style={{
        position: "absolute", top: 200 + orb1Y, right: 300,
        width: 200, height: 200, borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 70%)`,
      }} />
      <div style={{
        position: "absolute", bottom: 180 + orb2Y, left: 250,
        width: 260, height: 260, borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`,
      }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {/* Logo */}
        <div style={{
          width: 88, height: 88, borderRadius: 22,
          background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`,
          transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 12px 40px rgba(201, 149, 107, 0.35), 0 0 0 1px rgba(201, 149, 107, 0.1)`,
        }}>
          <span style={{ fontSize: 40, color: "#fff", fontFamily: sansFont, fontWeight: 700 }}>S</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 76, fontFamily: serifFont, fontWeight: 700, color: TEXT,
          margin: 0, letterSpacing: -2, lineHeight: 1.1,
        }}>
          {wordElements}
        </h1>

        {/* Line */}
        <div style={{
          width: lineW, height: 3, borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
        }} />

        {/* Subtitle */}
        <p style={{
          fontSize: 24, fontFamily: sansFont, color: TEXT_SEC,
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
// SCENE 2: PIPELINE — Select candidates (camera zoom)
// 200 frames
// ═══════════════════════════════════════════════════════
const CANDIDATES = [
  { name: "Sarah Chapman", role: "Senior Product Designer", company: "Fintech Corp", loc: "Stockholm", match: "10/12", matchPct: 83, avatar: "SC", skills: ["Product Design", "UX Strategy", "Figma"] },
  { name: "Sam Morris", role: "UX Designer", company: "CreativeLab", loc: "London", match: "9/12", matchPct: 75, avatar: "SM", skills: ["UI Design", "Research", "Prototyping"] },
  { name: "Esther Howard", role: "Product Designer", company: "TechStart", loc: "Berlin", match: "8/12", matchPct: 67, avatar: "EH", skills: ["Design Systems", "Interaction", "Framer"] },
];

const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera zoom: starts showing full view, slowly zooms to candidates
  const zoomProgress = interpolate(frame, [0, 180], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const scale = interpolate(zoomProgress, [0, 1], [0.88, 1.0]);
  const translateY = interpolate(zoomProgress, [0, 1], [20, 0]);

  // Header
  const headerSpring = spring({ frame, fps, config: { damping: 200 } });

  // Stats bar
  const statsDelay = 8;

  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{
        transform: `scale(${scale}) translateY(${translateY}px)`,
        transformOrigin: "center 40%",
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 24,
      }}>
        {/* Top nav bar mockup */}
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
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: sansFont }}>S</span>
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: TEXT, fontFamily: sansFont }}>
              BD Representative / Sales Manager
            </span>
            <span style={{ fontSize: 12, color: TEXT_SEC, fontFamily: sansFont }}>▾</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Job", "Review (10)", "Pipeline"].map((tab, i) => (
              <span key={i} style={{
                fontSize: 14, fontFamily: sansFont, fontWeight: i === 2 ? 600 : 400,
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
            { label: "To contact", value: 6, icon: "📋" },
            { label: "To Schedule", value: 4, icon: "📅" },
            { label: "Interviewing", value: 2, icon: "💬" },
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
                  <span style={{ fontSize: 14 }}>{stat.icon}</span>
                  <span style={{ fontSize: 13, color: TEXT_SEC, fontFamily: sansFont, fontWeight: 500 }}>{stat.label}</span>
                </div>
                <span style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: sansFont }}>{countUp}</span>
              </div>
            );
          })}
        </div>

        {/* Section header */}
        <div style={{
          width: 900, display: "flex", justifyContent: "space-between", alignItems: "center",
          opacity: spring({ frame: frame - 20, fps, config: { damping: 200 } }),
        }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: TEXT, fontFamily: serifFont }}>Best Matches</span>
          <span style={{ fontSize: 13, color: ACCENT, fontFamily: sansFont, fontWeight: 600 }}>View all →</span>
        </div>

        {/* Candidate cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 900 }}>
          {CANDIDATES.map((c, i) => {
            const cardDelay = 25 + i * 14;
            const cardSpring = spring({ frame: frame - cardDelay, fps, config: { damping: 20, stiffness: 120 } });
            const cardY = interpolate(cardSpring, [0, 1], [35, 0]);

            // Checkbox appears after card
            const checkDelay = cardDelay + 25;
            const checkSpring = spring({ frame: frame - checkDelay, fps, config: { damping: 10, stiffness: 150 } });
            const isSelected = frame > checkDelay;

            // Match bar animation
            const barProgress = interpolate(
              spring({ frame: frame - cardDelay - 10, fps, config: { damping: 200 } }),
              [0, 1],
              [0, c.matchPct]
            );

            // Subtle hover-like float
            const floatY = Math.sin((frame + i * 30) * 0.03) * 1.5;

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
                  ? `0 6px 24px rgba(201, 149, 107, 0.12)`
                  : "0 2px 8px rgba(0,0,0,0.03)",
              }}>
                {/* Avatar */}
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${ACCENT}25, ${ACCENT}50)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 600, color: ACCENT_DEEP, fontFamily: sansFont,
                  flexShrink: 0,
                }}>
                  {c.avatar}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: TEXT, fontFamily: sansFont }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: GREEN, fontWeight: 600, fontFamily: sansFont }}>{c.match} Match</span>
                  </div>
                  <div style={{ fontSize: 13, color: TEXT_SEC, fontFamily: sansFont, marginTop: 2 }}>
                    {c.role} · {c.company} · {c.loc}
                  </div>
                  {/* Skill tags */}
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    {c.skills.map((skill, si) => (
                      <span key={si} style={{
                        fontSize: 11, color: TEXT_SEC, fontFamily: sansFont, fontWeight: 500,
                        background: "#f5f3ef", padding: "3px 10px", borderRadius: 10,
                      }}>{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Match progress bar */}
                <div style={{ width: 80, flexShrink: 0 }}>
                  <div style={{
                    width: "100%", height: 4, borderRadius: 2, background: "#f0ede8",
                  }}>
                    <div style={{
                      width: `${barProgress}%`, height: "100%", borderRadius: 2,
                      background: `linear-gradient(90deg, ${ACCENT}, ${GREEN})`,
                    }} />
                  </div>
                  <div style={{
                    fontSize: 11, color: TEXT_SEC, fontFamily: sansFont, textAlign: "right", marginTop: 3,
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
                  {isSelected && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact button */}
        {(() => {
          const btnDelay = 85;
          const btnSpring = spring({ frame: frame - btnDelay, fps, config: { damping: 14, stiffness: 100 } });
          const btnScale = interpolate(btnSpring, [0, 1], [0.85, 1]);
          const btnPulse = 1 + Math.sin((frame - btnDelay) * 0.08) * 0.015;
          return (
            <div style={{
              opacity: btnSpring,
              transform: `scale(${btnScale * (frame > btnDelay + 20 ? btnPulse : 1)})`,
              marginTop: 8,
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                color: "#fff", fontSize: 16, fontWeight: 600, fontFamily: sansFont,
                padding: "14px 32px", borderRadius: 14,
                boxShadow: `0 8px 24px rgba(201, 149, 107, 0.3), 0 2px 6px rgba(201, 149, 107, 0.2)`,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: 18 }}>✉</span>
                Contact 3 selected candidates
              </div>
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 3: AI COMPOSE — Typing animation with detail
// 300 frames
// ═══════════════════════════════════════════════════════
const MESSAGE_SUBJECT = "Opportunity: Lead Product Designer at PriceMind AI";
const MESSAGE_BODY = `Hi Sarah,

I came across your profile and was genuinely impressed by your work as a Senior Product Designer — especially your experience leading design in the fintech space at Fintech Corp.

We're building PriceMind AI, a fast-growing startup in Stockholm working on AI-powered pricing optimization. We're looking for a Lead Product Designer who can own the product experience end-to-end.

Given your background in design systems, UX strategy, and your 10/12 match score, I think you'd be a great fit.

Would you be open to a 15-minute chat this week?

Best regards,
Tom`;

const ComposeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Panel enters
  const panelSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const panelY = interpolate(panelSpring, [0, 1], [80, 0]);
  const panelScale = interpolate(panelSpring, [0, 1], [0.92, 1]);

  // Subject types
  const typedSubject = useTypewriter(MESSAGE_SUBJECT, 15, 1.2);

  // Body types after subject is done
  const bodyStart = 15 + Math.ceil(MESSAGE_SUBJECT.length / 1.2) + 10;
  const typedBody = useTypewriter(MESSAGE_BODY, bodyStart, 1.4, "Hi Sarah,", 15);

  // AI badge
  const aiBadgeGlow = 0.6 + Math.sin(frame * 0.12) * 0.4;

  // "Send" button appears after typing
  const typingDone = typedBody.length >= MESSAGE_BODY.length;
  const sendSpring = spring({
    frame: typingDone ? frame : -999,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Floating orb
  const orbY = Math.sin(frame * 0.04) * 6;

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      {/* Ambient orb */}
      <div style={{
        position: "absolute", top: 100 + orbY, left: 200,
        width: 300, height: 300, borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`,
      }} />

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
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: `linear-gradient(135deg, ${ACCENT}25, ${ACCENT}55)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 600, color: ACCENT_DEEP, fontFamily: sansFont,
            }}>SC</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, fontFamily: sansFont }}>Sarah Chapman</div>
              <div style={{ fontSize: 12, color: TEXT_SEC, fontFamily: sansFont }}>Senior Product Designer · Stockholm · 10/12 Match</div>
            </div>
          </div>
          <div style={{
            background: ACCENT_BG, padding: "6px 16px", borderRadius: 20,
            display: "flex", alignItems: "center", gap: 8,
            boxShadow: `0 0 ${12 * aiBadgeGlow}px rgba(201, 149, 107, ${0.15 * aiBadgeGlow})`,
          }}>
            <span style={{ fontSize: 13 }}>✨</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT_DEEP, fontFamily: sansFont }}>AI Composing</span>
          </div>
        </div>

        {/* To / Subject */}
        <div style={{ padding: "0 28px" }}>
          <div style={{
            padding: "12px 0", borderBottom: `1px solid ${BORDER}`,
            display: "flex", gap: 10, alignItems: "center",
          }}>
            <span style={{ fontSize: 13, color: TEXT_SEC, fontFamily: sansFont, fontWeight: 500, width: 60 }}>To:</span>
            <span style={{ fontSize: 13, color: TEXT, fontFamily: sansFont }}>sarah.chapman@email.com</span>
          </div>
          <div style={{
            padding: "12px 0", borderBottom: `1px solid ${BORDER}`,
            display: "flex", gap: 10, alignItems: "center",
          }}>
            <span style={{ fontSize: 13, color: TEXT_SEC, fontFamily: sansFont, fontWeight: 500, width: 60 }}>Subject:</span>
            <span style={{ fontSize: 13, color: TEXT, fontFamily: sansFont }}>
              {typedSubject}
              {typedSubject.length < MESSAGE_SUBJECT.length && <Cursor />}
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{
          padding: "20px 28px", minHeight: 340,
          fontSize: 14.5, fontFamily: sansFont, color: TEXT,
          lineHeight: 1.75, whiteSpace: "pre-wrap",
        }}>
          {typedBody}
          {typedBody.length < MESSAGE_BODY.length && typedSubject.length >= MESSAGE_SUBJECT.length && <Cursor />}
        </div>

        {/* Bottom toolbar */}
        <div style={{
          padding: "12px 28px", borderTop: `1px solid ${BORDER}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { icon: "📎", label: "Attach" },
              { icon: "📅", label: "Schedule" },
              { icon: "🔄", label: "Regenerate" },
            ].map((btn, i) => (
              <span key={i} style={{
                fontSize: 13, color: TEXT_SEC, fontFamily: sansFont, fontWeight: 500,
                background: "#f5f3ef", padding: "7px 14px", borderRadius: 10,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ fontSize: 13 }}>{btn.icon}</span>
                {btn.label}
              </span>
            ))}
          </div>

          {typingDone && (
            <div style={{
              transform: `scale(${sendSpring})`,
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
              color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: sansFont,
              padding: "10px 24px", borderRadius: 12,
              boxShadow: `0 4px 16px rgba(201, 149, 107, 0.3)`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              Send message
              <span style={{ fontSize: 16 }}>→</span>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 4: OUTREACH DASHBOARD — Stats + Status
// 160 frames
// ═══════════════════════════════════════════════════════
const OutreachDashScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({ frame, fps, config: { damping: 200 } });

  const STATS = [
    { label: "Messages Sent", value: 3, color: ACCENT, icon: "📤" },
    { label: "Opened", value: 2, color: "#e8a230", icon: "📬" },
    { label: "Replied", value: 1, color: GREEN, icon: "💬" },
    { label: "Response Rate", value: 33, suffix: "%", color: GREEN, icon: "📊" },
  ];

  const STATUSES = [
    { name: "Sarah Chapman", status: "Replied", time: "2 min ago", statusColor: GREEN, bgColor: GREEN_BG, icon: "💬" },
    { name: "Sam Morris", status: "Opened", time: "5 min ago", statusColor: "#e8a230", bgColor: "rgba(232, 162, 48, 0.08)", icon: "📬" },
    { name: "Esther Howard", status: "Sent", time: "8 min ago", statusColor: ACCENT, bgColor: ACCENT_BG, icon: "📤" },
  ];

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        display: "flex", flexDirection: "column", gap: 20, alignItems: "center",
        width: 800, opacity: containerSpring,
      }}>
        {/* Title */}
        <div style={{
          textAlign: "center", marginBottom: 8,
          opacity: spring({ frame, fps, config: { damping: 200 } }),
        }}>
          <h2 style={{ fontSize: 32, fontFamily: serifFont, fontWeight: 700, color: TEXT, margin: 0 }}>
            Outreach Performance
          </h2>
        </div>

        {/* Stats grid */}
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
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div style={{
                  fontSize: 34, fontWeight: 800, color: s.color, fontFamily: sansFont, marginTop: 4,
                }}>
                  {countUp}{s.suffix || ""}
                </div>
                <div style={{ fontSize: 12, color: TEXT_SEC, fontFamily: sansFont, marginTop: 4, fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Status list */}
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
                  <span style={{ fontSize: 20 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, fontFamily: sansFont }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: TEXT_SEC, fontFamily: sansFont }}>{r.time}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 600, color: r.statusColor, fontFamily: sansFont,
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
// 180 frames
// ═══════════════════════════════════════════════════════
const REPLY_TEXT = `Hi! Thanks for reaching out — I've actually been following PriceMind AI and the product challenges sound really exciting.

I'd love to learn more about the role. I'm free Thursday or Friday afternoon — would either work for a quick call?`;

const ReplyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Notification slides in from top
  const notifSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 120 } });
  const notifY = interpolate(notifSpring, [0, 1], [-60, 0]);

  // Chat panel
  const panelSpring = spring({ frame: frame - 15, fps, config: { damping: 20, stiffness: 80 } });
  const panelY = interpolate(panelSpring, [0, 1], [50, 0]);
  const panelScale = interpolate(panelSpring, [0, 1], [0.95, 1]);

  // Your sent message appears
  const sentSpring = spring({ frame: frame - 25, fps, config: { damping: 200 } });

  // Reply types
  const replyTyped = useTypewriter(REPLY_TEXT, 45, 1.0, "really exciting.", 18);

  // Schedule button appears when reply is done
  const replyDone = replyTyped.length >= REPLY_TEXT.length;
  const schedBtnSpring = spring({
    frame: replyDone ? frame : -999,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      {/* Notification toast */}
      <div style={{
        position: "absolute", top: 60,
        transform: `translateY(${notifY}px)`,
        opacity: notifSpring,
        background: GREEN, color: "#fff", borderRadius: 16,
        padding: "14px 28px",
        display: "flex", alignItems: "center", gap: 12,
        boxShadow: "0 10px 30px rgba(45, 157, 92, 0.25)",
        fontSize: 15, fontWeight: 600, fontFamily: sansFont,
      }}>
        <span style={{ fontSize: 18 }}>💬</span>
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
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT}25, ${ACCENT}55)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 600, color: ACCENT_DEEP, fontFamily: sansFont,
          }}>SC</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: TEXT, fontFamily: sansFont }}>Sarah Chapman</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN }} />
              <span style={{ fontSize: 12, color: GREEN, fontFamily: sansFont, fontWeight: 500 }}>Online</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["📞", "📹", "⋯"].map((icon, i) => (
              <span key={i} style={{
                width: 36, height: 36, borderRadius: 10,
                background: "#f5f3ef", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16,
              }}>{icon}</span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ padding: "24px 28px", minHeight: 300 }}>
          {/* Your sent message */}
          <div style={{
            display: "flex", justifyContent: "flex-end", marginBottom: 20,
            opacity: sentSpring,
          }}>
            <div style={{
              background: ACCENT_BG,
              borderRadius: "18px 18px 4px 18px",
              padding: "14px 20px",
              maxWidth: 480,
              fontSize: 14, color: TEXT, fontFamily: sansFont, lineHeight: 1.6,
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
                fontSize: 14, color: TEXT, fontFamily: sansFont, lineHeight: 1.6,
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

        {/* Bottom — Schedule button */}
        {replyDone && (
          <div style={{
            padding: "12px 28px", borderTop: `1px solid ${BORDER}`,
            display: "flex", justifyContent: "center",
          }}>
            <div style={{
              transform: `scale(${schedBtnSpring})`,
              background: `linear-gradient(135deg, ${GREEN}, #238c4d)`,
              color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: sansFont,
              padding: "12px 28px", borderRadius: 12,
              boxShadow: `0 6px 20px rgba(45, 157, 92, 0.25)`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>📅</span>
              Schedule Interview
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 6: OUTRO
// 100 frames
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
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 18,
          background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`,
          transform: `scale(${logoScale})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 12px 40px rgba(201, 149, 107, 0.3)`,
        }}>
          <span style={{ fontSize: 34, color: "#fff", fontFamily: sansFont, fontWeight: 700 }}>S</span>
        </div>

        <h1 style={{
          fontSize: 64, fontFamily: serifFont, fontWeight: 700, color: TEXT,
          margin: 0, letterSpacing: -1,
        }}>
          {wordEls}
        </h1>

        <div style={{
          width: lineW, height: 3, borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
        }} />

        <p style={{
          fontSize: 22, fontFamily: sansFont, color: TEXT_SEC,
          margin: 0, fontWeight: 500, letterSpacing: 1,
          opacity: urlSpring,
          transform: `translateY(${interpolate(urlSpring, [0, 1], [15, 0])}px)`,
        }}>
          sava.ai
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN VIDEO — TransitionSeries with fades/slides
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

        <TransitionSeries.Sequence durationInFrames={200}>
          <PipelineScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={300}>
          <ComposeScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
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
