import { Composition } from "remotion";
import { OutreachVideoV2 } from "./OutreachVideoV2";

// TransitionSeries durations:
// Intro: 80f + Pipeline: 200f + Compose: 300f + Dashboard: 160f + Reply: 180f + Outro: 100f
// Transitions: 5 × 20f = 100f overlap
// Total: 1020 - 100 = 920f ≈ 30.7s
export const RemotionRoot: React.FC = () => (
  <Composition
    id="outreach"
    component={OutreachVideoV2}
    durationInFrames={920}
    fps={30}
    width={1920}
    height={1080}
  />
);
