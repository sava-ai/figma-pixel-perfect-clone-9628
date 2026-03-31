import { Composition } from "remotion";
import { OutreachVideo } from "./OutreachVideo";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="outreach"
      component={OutreachVideo}
      durationInFrames={750}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
