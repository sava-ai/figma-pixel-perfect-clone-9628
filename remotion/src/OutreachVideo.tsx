import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// ── Colors ──
const BG = "#f8f7f4";
const CARD_BG = "#ffffff";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const ACCENT = "#c9956b";
const ACCENT_BG = "rgba(201, 149, 107, 0.12)";
const GREEN = "#28a745";
const GREEN_BG = "rgba(40, 167, 69, 0.1)";
const BORDER = "#e8e5e0";

// ── Helpers ──
const useTypingText = (text: string, startFrame: number, charsPerFrame = 0.8) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const chars = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
  return text.slice(0, chars);
};

// ═══════════════════════════════════════════════
// SCENE 1: Intro — Logo + "Personalized Outreach"
// ═══════════════════════════════════════════════
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const titleOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [20, 45], [40, 0], { extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [15, 50], [0, 180], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div
          style={{
            width: 90, height: 90, borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT}, #e8c4a0)`,
            transform: `scale(${logoScale})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 30px rgba(201, 149, 107, 0.3)",
          }}
        >
          <span style={{ fontSize: 42, color: "#fff", fontFamily: "sans-serif", fontWeight: 700 }}>S</span>
        </div>
        <h1 style={{
          fontSize: 68, fontFamily: "sans-serif", fontWeight: 800, color: TEXT,
          opacity: titleOpacity, transform: `translateY(${titleY}px)`,
          margin: 0, letterSpacing: -2,
        }}>
          Personalized Outreach
        </h1>
        <div style={{ width: lineW, height: 3, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
        <p style={{
          fontSize: 26, fontFamily: "sans-serif", color: TEXT_MUTED,
          opacity: subOpacity, margin: 0, fontWeight: 400,
        }}>
          AI-crafted messages that get responses
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════
// SCENE 2: Pipeline with candidates to contact
// ═══════════════════════════════════════════════
const CANDIDATES = [
  { name: "Sarah Chapman", role: "Senior Product Designer", location: "Stockholm", match: "10/12", status: "Saved", avatar: "SC" },
  { name: "Sam Morris", role: "UX Designer", location: "London", match: "9/12", status: "Saved", avatar: "SM" },
  { name: "Esther Howard", role: "Product Designer", location: "Berlin", match: "8/12", status: "To contact", avatar: "EH" },
];

const CandidateCard: React.FC<{ c: typeof CANDIDATES[0]; delay: number; selected?: boolean }> = ({ c, delay, selected }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  const y = interpolate(enter, [0, 1], [40, 0]);
  const checkScale = spring({ frame: frame - delay - 15, fps, config: { damping: 12 } });

  return (
    <div style={{
      background: CARD_BG, borderRadius: 16, padding: "24px 28px",
      border: selected ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
      opacity: enter, transform: `translateY(${y}px)`,
      display: "flex", alignItems: "center", gap: 20,
      boxShadow: selected ? `0 4px 20px rgba(201, 149, 107, 0.15)` : "0 2px 8px rgba(0,0,0,0.04)",
      width: 520, position: "relative",
    }}>
      {/* Avatar */}
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}60)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, fontWeight: 600, color: ACCENT, fontFamily: "sans-serif",
      }}>
        {c.avatar}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: TEXT, fontFamily: "sans-serif" }}>{c.name}</div>
        <div style={{ fontSize: 14, color: TEXT_MUTED, fontFamily: "sans-serif", marginTop: 2 }}>{c.role} · {c.location}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <span style={{
            fontSize: 12, fontWeight: 600, color: ACCENT,
            background: ACCENT_BG, padding: "3px 10px", borderRadius: 12, fontFamily: "sans-serif",
          }}>{c.match} Match</span>
          <span style={{
            fontSize: 12, color: TEXT_MUTED,
            background: "#f0ede8", padding: "3px 10px", borderRadius: 12, fontFamily: "sans-serif",
          }}>{c.status}</span>
        </div>
      </div>
      {/* Checkbox */}
      {selected && (
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: ACCENT,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `scale(${checkScale})`,
        }}>
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>✓</span>
        </div>
      )}
    </div>
  );
};

const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const selectAllOpacity = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: "clamp" });
  const btnScale = spring({ frame: frame - 80, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        {/* Header */}
        <div style={{ opacity: headerOpacity, marginBottom: 8, textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: TEXT, fontFamily: "sans-serif", margin: 0 }}>
            Select candidates to contact
          </h2>
          <p style={{ fontSize: 18, color: TEXT_MUTED, fontFamily: "sans-serif", marginTop: 8 }}>
            3 best matches ready for outreach
          </p>
        </div>

        {/* Candidate cards */}
        {CANDIDATES.map((c, i) => (
          <CandidateCard key={i} c={c} delay={10 + i * 12} selected={frame > 40 + i * 12} />
        ))}

        {/* Contact All button */}
        <div style={{
          opacity: selectAllOpacity,
          transform: `scale(${Math.max(0, btnScale)})`,
          marginTop: 12,
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${ACCENT}, #b8845e)`,
            color: "#fff", fontSize: 18, fontWeight: 600, fontFamily: "sans-serif",
            padding: "14px 36px", borderRadius: 12,
            boxShadow: "0 4px 16px rgba(201, 149, 107, 0.35)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            ✉️ Contact all 3 candidates
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════
// SCENE 3: AI composing personalized message (typing)
// ═══════════════════════════════════════════════
const MESSAGE_TEXT = `Hi Sarah,\n\nI came across your profile and was impressed by your work as a Senior Product Designer, especially your experience in fintech.\n\nWe're looking for someone with your exact skillset to lead product design at PriceMind AI — a fast-growing startup in Stockholm working on AI-powered pricing optimization.\n\nWould love to chat for 15 minutes this week. What does your schedule look like?`;

const ComposeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelEnter = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const panelY = interpolate(panelEnter, [0, 1], [60, 0]);

  // Typing starts at frame 25
  const typedText = useTypingText(MESSAGE_TEXT, 25, 1.2);

  // AI badge pulse
  const aiBadgeScale = 1 + Math.sin(frame * 0.1) * 0.03;

  // Subject line types first
  const subjectText = useTypingText("Re: Senior Product Designer at PriceMind AI", 10, 1.5);

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        opacity: panelEnter, transform: `translateY(${panelY}px)`,
        width: 900, background: CARD_BG, borderRadius: 20,
        boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        {/* Compose header */}
        <div style={{
          padding: "18px 28px", borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}60)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 600, color: ACCENT, fontFamily: "sans-serif",
            }}>SC</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: TEXT, fontFamily: "sans-serif" }}>Sarah Chapman</div>
              <div style={{ fontSize: 13, color: TEXT_MUTED, fontFamily: "sans-serif" }}>Senior Product Designer · Stockholm</div>
            </div>
          </div>
          <div style={{
            background: ACCENT_BG, padding: "6px 14px", borderRadius: 20,
            display: "flex", alignItems: "center", gap: 6,
            transform: `scale(${aiBadgeScale})`,
          }}>
            <span style={{ fontSize: 14, fontFamily: "sans-serif" }}>✨</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT, fontFamily: "sans-serif" }}>AI Composing</span>
          </div>
        </div>

        {/* Subject line */}
        <div style={{
          padding: "14px 28px", borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 14, color: TEXT_MUTED, fontFamily: "sans-serif", fontWeight: 500 }}>Subject:</span>
          <span style={{ fontSize: 14, color: TEXT, fontFamily: "sans-serif" }}>{subjectText}</span>
          {subjectText.length < 44 && (
            <span style={{ display: "inline-block", width: 2, height: 18, background: ACCENT, opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0 }} />
          )}
        </div>

        {/* Message body */}
        <div style={{
          padding: "24px 28px", minHeight: 320,
          fontSize: 16, fontFamily: "sans-serif", color: TEXT,
          lineHeight: 1.7, whiteSpace: "pre-wrap",
        }}>
          {typedText}
          {typedText.length < MESSAGE_TEXT.length && (
            <span style={{ display: "inline-block", width: 2, height: 20, background: ACCENT, marginLeft: 1, opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0 }} />
          )}
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: "14px 28px", borderTop: `1px solid ${BORDER}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", gap: 12 }}>
            {["📎 Attach", "🔗 Link", "📅 Schedule"].map((btn, i) => (
              <span key={i} style={{
                fontSize: 13, color: TEXT_MUTED, fontFamily: "sans-serif",
                background: "#f5f3ef", padding: "6px 12px", borderRadius: 8,
              }}>{btn}</span>
            ))}
          </div>
          {typedText.length >= MESSAGE_TEXT.length && (
            <div style={{
              background: `linear-gradient(135deg, ${ACCENT}, #b8845e)`,
              color: "#fff", fontSize: 15, fontWeight: 600, fontFamily: "sans-serif",
              padding: "10px 24px", borderRadius: 10,
            }}>
              Send message →
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════
// SCENE 4: Messages sent — outreach dashboard
// ═══════════════════════════════════════════════
const OUTREACH_STATUS = [
  { name: "Sarah Chapman", status: "Opened", time: "2 min ago", color: GREEN, icon: "📬" },
  { name: "Sam Morris", status: "Sent", time: "Just now", color: ACCENT, icon: "📤" },
  { name: "Esther Howard", status: "Replied!", time: "1 min ago", color: GREEN, icon: "💬" },
];

const OutreachDashScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerEnter = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center", width: 700 }}>
        {/* Stats bar */}
        <div style={{
          opacity: headerEnter,
          display: "flex", gap: 32, marginBottom: 12,
        }}>
          {[
            { label: "Messages Sent", value: "3", color: ACCENT },
            { label: "Opened", value: "2", color: "#e8a948" },
            { label: "Replied", value: "1", color: GREEN },
          ].map((s, i) => {
            const countUp = Math.min(
              parseInt(s.value),
              Math.floor(interpolate(frame, [15 + i * 10, 35 + i * 10], [0, parseInt(s.value)], { extrapolateRight: "clamp" }))
            );
            return (
              <div key={i} style={{
                background: CARD_BG, borderRadius: 16, padding: "20px 36px",
                textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: s.color, fontFamily: "sans-serif" }}>{countUp}</div>
                <div style={{ fontSize: 14, color: TEXT_MUTED, fontFamily: "sans-serif", marginTop: 4 }}>{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Status rows */}
        {OUTREACH_STATUS.map((r, i) => {
          const rowEnter = spring({ frame: frame - 30 - i * 15, fps, config: { damping: 18 } });
          const rowY = interpolate(rowEnter, [0, 1], [30, 0]);
          const isReply = r.status === "Replied!";
          return (
            <div key={i} style={{
              background: isReply ? GREEN_BG : CARD_BG,
              borderRadius: 14, padding: "18px 24px",
              border: isReply ? `2px solid ${GREEN}40` : `1px solid ${BORDER}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", opacity: rowEnter, transform: `translateY(${rowY}px)`,
              boxShadow: isReply ? `0 4px 20px rgba(40, 167, 69, 0.1)` : "0 2px 6px rgba(0,0,0,0.03)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 24 }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 600, color: TEXT, fontFamily: "sans-serif" }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: TEXT_MUTED, fontFamily: "sans-serif" }}>{r.time}</div>
                </div>
              </div>
              <div style={{
                fontSize: 14, fontWeight: 600, color: r.color, fontFamily: "sans-serif",
                background: r.color === GREEN ? GREEN_BG : ACCENT_BG,
                padding: "6px 16px", borderRadius: 20,
              }}>
                {r.status}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════
// SCENE 5: Reply message preview
// ═══════════════════════════════════════════════
const REPLY_TEXT = `Hi! Thanks for reaching out — I've been looking at PriceMind AI and the product challenges sound really exciting.\n\nI'd love to learn more. I'm free Thursday or Friday afternoon. Would either work?`;

const ReplyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelEnter = spring({ frame, fps, config: { damping: 18 } });
  const panelY = interpolate(panelEnter, [0, 1], [50, 0]);

  const replyTyped = useTypingText(REPLY_TEXT, 30, 1.0);

  // Notification pop
  const notifScale = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 150 } });

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      {/* Notification badge */}
      <div style={{
        position: "absolute", top: 80, right: 200,
        transform: `scale(${notifScale})`,
        background: GREEN, color: "#fff", borderRadius: 16,
        padding: "12px 24px", display: "flex", alignItems: "center", gap: 10,
        boxShadow: "0 8px 24px rgba(40, 167, 69, 0.3)",
        fontSize: 16, fontWeight: 600, fontFamily: "sans-serif",
      }}>
        💬 New reply from Sarah Chapman
      </div>

      {/* Message thread */}
      <div style={{
        opacity: panelEnter, transform: `translateY(${panelY}px)`,
        width: 800, background: CARD_BG, borderRadius: 20,
        boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "18px 28px", borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}60)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 600, color: ACCENT, fontFamily: "sans-serif",
          }}>SC</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600, color: TEXT, fontFamily: "sans-serif" }}>Sarah Chapman</div>
            <div style={{ fontSize: 13, color: GREEN, fontFamily: "sans-serif", fontWeight: 500 }}>● Online</div>
          </div>
        </div>

        {/* Sent message (yours) */}
        <div style={{ padding: "20px 28px" }}>
          <div style={{
            background: ACCENT_BG, borderRadius: "16px 16px 4px 16px",
            padding: "16px 20px", marginLeft: "auto", maxWidth: 500, marginBottom: 16,
            fontSize: 14, color: TEXT, fontFamily: "sans-serif", lineHeight: 1.6,
          }}>
            Hi Sarah, I came across your profile and was impressed by your work as a Senior Product Designer...
            <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 8, textAlign: "right" }}>You · 2 min ago</div>
          </div>

          {/* Reply bubble */}
          <div style={{
            background: "#f0f8f0", borderRadius: "16px 16px 16px 4px",
            padding: "16px 20px", maxWidth: 500,
            fontSize: 14, color: TEXT, fontFamily: "sans-serif", lineHeight: 1.6,
            whiteSpace: "pre-wrap", border: `1px solid ${GREEN}20`,
          }}>
            {replyTyped}
            {replyTyped.length < REPLY_TEXT.length && (
              <span style={{ display: "inline-block", width: 2, height: 18, background: GREEN, marginLeft: 1, opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0 }} />
            )}
            {replyTyped.length > 0 && (
              <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 8 }}>Sarah · Just now</div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════
// OUTRO
// ═══════════════════════════════════════════════
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [15, 50], [0, 280], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
        transform: `scale(${scale})`, opacity,
      }}>
        <div style={{
          width: 70, height: 70, borderRadius: "50%",
          background: `linear-gradient(135deg, ${ACCENT}, #e8c4a0)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 30px rgba(201, 149, 107, 0.3)",
        }}>
          <span style={{ fontSize: 32, color: "#fff", fontFamily: "sans-serif", fontWeight: 700 }}>S</span>
        </div>
        <h1 style={{
          fontSize: 56, fontFamily: "sans-serif", fontWeight: 800, color: TEXT,
          margin: 0, letterSpacing: -1,
        }}>
          Outreach that converts
        </h1>
        <div style={{ width: lineW, height: 3, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
        <p style={{ fontSize: 22, fontFamily: "sans-serif", color: TEXT_MUTED, margin: 0, fontWeight: 400 }}>
          sava.ai
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════
// Intro: 0-75 (2.5s)
// Pipeline: 75-225 (5s)
// Compose: 225-475 (8.3s) — longer for typing
// Dashboard: 475-600 (4.2s)
// Reply: 600-690 (3s)
// Outro: 690-750 (2s)

export const OutreachVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Sequence from={0} durationInFrames={75}>
        <IntroScene />
      </Sequence>
      <Sequence from={75} durationInFrames={150}>
        <PipelineScene />
      </Sequence>
      <Sequence from={225} durationInFrames={250}>
        <ComposeScene />
      </Sequence>
      <Sequence from={475} durationInFrames={125}>
        <OutreachDashScene />
      </Sequence>
      <Sequence from={600} durationInFrames={90}>
        <ReplyScene />
      </Sequence>
      <Sequence from={690} durationInFrames={60}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
