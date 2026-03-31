import { Composition } from "remotion";
import { OutreachVideoV2 } from "./OutreachVideoV2";

// TransitionSeries durations:
// Intro: 80f + Pipeline: 220f + Compose: 350f + Dashboard: 160f + Reply: 180f + Outro: 100f
// Transitions: 5 × 20f = 100f overlap
// Total: 1090 - 100 = 990f = 33s
export const RemotionRoot: React.FC = () => (
  <Composition
    id="outreach"
    component={OutreachVideoV2}
    durationInFrames={990}
    fps={30}
    width={1920}
    height={1080}
  />
);
