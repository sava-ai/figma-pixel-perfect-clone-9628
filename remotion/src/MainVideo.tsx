import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Img,
  staticFile,
} from "remotion";

const SCENES = [
  {
    image: "images/dashboard.png",
    title: "Smart Job Dashboard",
    subtitle: "Track applicants, matches & pipeline at a glance",
  },
  {
    image: "images/candidate.png",
    title: "AI-Powered Candidate Review",
    subtitle: "Deep profile analysis with intelligent matching criteria",
  },
  {
    image: "images/pipeline.png",
    title: "Visual Pipeline Management",
    subtitle: "Organize candidates through every hiring stage",
  },
];

const SCENE_DURATION = 150; // 5 seconds each
const TRANSITION_DURATION = 30; // 1 second transition
const INTRO_DURATION = 60; // 2 second intro
const OUTRO_DURATION = 60; // 2 second outro

const BG_COLOR_1 = "#1a1a2e";
const BG_COLOR_2 = "#16213e";
const ACCENT = "#c9956b";
const ACCENT_LIGHT = "#e8c4a0";

const PersistentBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const gradientAngle = interpolate(frame, [0, durationInFrames], [135, 225]);

  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(${gradientAngle}deg, ${BG_COLOR_1} 0%, ${BG_COLOR_2} 40%, #0f3460 70%, #1a1a2e 100%)`,
        }}
      />
      {/* Subtle floating orbs */}
      {[0, 1, 2].map((i) => {
        const x = interpolate(
          frame,
          [0, durationInFrames],
          [100 + i * 500, 300 + i * 400]
        );
        const y =
          400 +
          Math.sin((frame + i * 80) * 0.008) * 150;
        const size = 300 + i * 100;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${ACCENT}15 0%, transparent 70%)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const titleOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [15, 40], [30, 0], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [10, 45], [0, 200], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
            transform: `scale(${logoScale})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 36, color: "#fff", fontFamily: "sans-serif", fontWeight: 700 }}>S</span>
        </div>

        <h1
          style={{
            fontSize: 72,
            fontFamily: "sans-serif",
            fontWeight: 800,
            color: "#fff",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            margin: 0,
            letterSpacing: -2,
          }}
        >
          Sava AI
        </h1>

        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
          }}
        />

        <p
          style={{
            fontSize: 28,
            fontFamily: "sans-serif",
            color: ACCENT_LIGHT,
            opacity: subtitleOpacity,
            margin: 0,
            fontWeight: 300,
          }}
        >
          Intelligent Hiring, Reimagined
        </p>
      </div>
    </AbsoluteFill>
  );
};

const ScreenScene: React.FC<{
  image: string;
  title: string;
  subtitle: string;
}> = ({ image, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Screen enters with spring
  const screenScale = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const screenY = interpolate(
    spring({ frame, fps, config: { damping: 20, stiffness: 80 } }),
    [0, 1],
    [60, 0]
  );

  // Text fades in after screen
  const titleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const titleX = interpolate(frame, [20, 40], [-30, 0], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  // Subtle float during hold
  const floatY = Math.sin(frame * 0.04) * 3;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Title and subtitle - left side */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 80,
          maxWidth: 400,
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontFamily: "sans-serif",
            fontWeight: 700,
            color: "#fff",
            opacity: titleOpacity,
            transform: `translateX(${titleX}px)`,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: 20,
            fontFamily: "sans-serif",
            color: ACCENT_LIGHT,
            opacity: subtitleOpacity,
            margin: "12px 0 0",
            fontWeight: 300,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Screenshot in a window frame */}
      <div
        style={{
          position: "absolute",
          right: 40,
          transform: `scale(${screenScale * 0.85 + 0.15}) translateY(${screenY + floatY}px)`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)`,
          width: 1200,
        }}
      >
        {/* macOS title bar */}
        <div
          style={{
            height: 36,
            background: "linear-gradient(180deg, #3a3a4a, #2a2a3a)",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <Img
          src={staticFile(image)}
          style={{ width: "100%", display: "block" }}
        />
      </div>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [15, 45], [0, 300], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontFamily: "sans-serif",
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            letterSpacing: -1,
          }}
        >
          Start Hiring Smarter
        </h1>
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
          }}
        />
        <p
          style={{
            fontSize: 24,
            fontFamily: "sans-serif",
            color: ACCENT_LIGHT,
            margin: 0,
            fontWeight: 300,
          }}
        >
          sava.ai
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <PersistentBackground />

      {/* Intro */}
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroScene />
      </Sequence>

      {/* 3 Screen scenes */}
      {SCENES.map((scene, i) => (
        <Sequence
          key={i}
          from={INTRO_DURATION + i * SCENE_DURATION}
          durationInFrames={SCENE_DURATION}
        >
          <ScreenScene
            image={scene.image}
            title={scene.title}
            subtitle={scene.subtitle}
          />
        </Sequence>
      ))}

      {/* Outro */}
      <Sequence
        from={INTRO_DURATION + SCENES.length * SCENE_DURATION}
        durationInFrames={OUTRO_DURATION}
      >
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
