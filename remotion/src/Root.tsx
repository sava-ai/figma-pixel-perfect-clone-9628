import { Composition } from "remotion";
import { OutreachVideoV2 } from "./OutreachVideoV2";
import { ChatAssistantVideo } from "./ChatAssistantVideo";
import { InterviewVideo } from "./InterviewVideo";
import { SearchVideo } from "./SearchVideo";
import { JobBriefVideo } from "./JobBriefVideo";
import { ApplicantVideo } from "./ApplicantVideo";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="outreach"
      component={OutreachVideoV2}
      durationInFrames={990}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="chat-assistant"
      component={ChatAssistantVideo}
      durationInFrames={1000}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="interview"
      component={InterviewVideo}
      durationInFrames={1050}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="search"
      component={SearchVideo}
      durationInFrames={1100}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="job-brief"
      component={JobBriefVideo}
      durationInFrames={1220}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="applicant"
      component={ApplicantVideo}
      durationInFrames={1120}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
