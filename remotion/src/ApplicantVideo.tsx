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
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { loadFont } from "@remotion/fonts";

loadFont({ family: "CooperLight", url: staticFile("fonts/CooperLtBTLight.ttf"), weight: "400" });
loadFont({ family: "LabilGrotesk", url: staticFile("fonts/LabilGrotesk-Regular.ttf"), weight: "400" });

const headingFont = "CooperLight, serif";
const bodyFont = "LabilGrotesk, sans-serif";

const BG = "#f6f4f0";
const CARD = "#ffffff";
const TEXT = "#333333";
const TEXT_SEC = "#7a7570";
const ACCENT = "#c9956b";
const ACCENT_DEEP = "#a87a55";
const GREEN = "#2d9d5c";
const GREEN_BG = "rgba(45, 157, 92, 0.08)";
const BORDER = "#ece8e2";
const CHAT_BG = "#FAF8F4";
const BLUE = "#4a7cff";
const BLUE_BG = "rgba(74, 124, 255, 0.08)";
const PURPLE = "#7c5cbf";
const PURPLE_BG = "rgba(124, 92, 191, 0.08)";
const ORANGE = "#e8853d";
const ORANGE_BG = "rgba(232, 133, 61, 0.08)";

// ── Laidback Logo ──
const LaidbackLogo: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 20 18" fill="none">
    <path d="M12.9707 16.0295L13.0739 16.9326C13.0807 16.992 13.1442 17.0268 13.1979 17.0007C13.2026 16.9984 13.207 16.9958 13.2111 16.9927L13.2321 16.9775C13.2907 16.9347 13.3358 16.8759 13.362 16.8081L13.3757 16.7724C13.3982 16.7141 13.4098 16.6521 13.4098 16.5896V16.4565V16.2287V15.8587V15.7793C13.4098 15.586 13.4294 15.3933 13.4683 15.204C13.5072 15.0147 13.5268 14.822 13.5268 14.6287V14.3501L13.8488 11.9021L14.6098 8.77093L14.7157 8.39986C14.7374 8.32403 14.8196 8.28325 14.893 8.31183L15.2829 8.40088L15.6634 8.45781L16.1902 8.57167C16.5015 8.62843 16.8054 8.71957 17.0966 8.84344L17.1268 8.85632L17.1646 8.86682C17.2746 8.89737 17.3761 8.95254 17.4616 9.02814C17.5861 9.13821 17.6707 9.28639 17.7022 9.44956L17.7109 9.49466C17.7311 9.59959 17.7322 9.7073 17.7142 9.81262L17.7122 9.82413C17.6927 9.8998 17.6649 9.97306 17.6292 10.0425L17.6244 10.0518L17.6106 10.0855C17.5815 10.156 17.5761 10.2341 17.5951 10.308C17.6117 10.3564 17.6624 10.3842 17.7121 10.3721L17.7145 10.3715C17.7322 10.3672 17.7483 10.3583 17.7614 10.3456L17.7629 10.3441C17.7681 10.339 17.7728 10.3335 17.7769 10.3275L17.801 10.2924C17.8198 10.2649 17.836 10.2358 17.8495 10.2053L17.9171 10.0518L17.9309 10.0249C17.9411 10.005 17.9545 9.98699 17.9705 9.97144L17.9953 9.94732C18.0016 9.94118 18.0092 9.93658 18.0176 9.93387C18.0547 9.92185 18.0927 9.94948 18.0927 9.98845V10.0306C18.0927 10.0445 18.0893 10.0583 18.0829 10.0708L18.0634 10.1088C18.0247 10.1841 18 10.2657 17.9903 10.3498L17.9863 10.3855C17.9792 10.4475 17.9796 10.5101 17.9876 10.572L18.0026 10.6889C18.0041 10.7006 18.0076 10.7119 18.013 10.7223C18.0264 10.7485 18.0506 10.7675 18.0791 10.7744L18.0944 10.7781C18.1307 10.7869 18.169 10.7804 18.2003 10.7601L18.2261 10.7434C18.2347 10.7378 18.2427 10.7314 18.2501 10.7242C18.2804 10.6947 18.2976 10.6542 18.2976 10.6119V10.5358V10.365V10.2511V10.2073C18.2976 10.1807 18.3083 10.1552 18.3274 10.1367L18.3378 10.1265C18.3495 10.1152 18.3652 10.1088 18.3816 10.1088C18.4023 10.1088 18.4216 10.119 18.4333 10.136L18.5121 10.251C18.5251 10.27 18.5361 10.2903 18.5449 10.3116L18.5515 10.3276C18.577 10.3898 18.6151 10.4461 18.6633 10.493L18.7073 10.5358L18.7767 10.6032C18.7888 10.615 18.8035 10.6239 18.8196 10.6291C18.8586 10.6417 18.9013 10.6318 18.9306 10.6032L18.9411 10.5931C18.9604 10.5743 18.9736 10.5501 18.9791 10.5237L18.9874 10.483C18.9957 10.4428 18.9947 10.4012 18.9845 10.3615L18.9828 10.3548C18.9748 10.3238 18.9619 10.2943 18.9446 10.2674L18.8244 10.0803L18.5781 9.64608C18.4304 9.38585 18.2581 9.14044 18.0634 8.91325L17.8375 8.69355C17.7736 8.63139 17.7044 8.57491 17.6307 8.52474C17.51 8.44259 17.3783 8.37803 17.2394 8.33301L17.0098 8.25856L16.3659 8.08777L15.9854 8.03084L15.2244 8.00237L15.0832 7.98275C15.0414 7.97695 15.0017 7.9609 14.9676 7.93603L14.9363 7.91319C14.9143 7.89713 14.8977 7.87468 14.8889 7.8489C14.8787 7.81933 14.8793 7.78713 14.8906 7.75797L14.961 7.5754C15.0583 7.29139 15.1285 6.9988 15.1707 6.70154L15.2244 6.32294L15.3298 5.07201C15.357 4.74905 15.355 4.4243 15.3237 4.10171L15.2738 3.58765C15.2412 3.2509 15.1449 2.9234 14.9902 2.6225L14.6098 2.08167L14.3756 1.82548L14.3626 1.81412C14.1766 1.65128 13.9754 1.50657 13.7619 1.38196C13.5859 1.27929 13.4022 1.19062 13.2124 1.11677L13.2049 1.11386L13.1923 1.10928C13.0451 1.05558 12.8922 1.01891 12.7366 1H12.3268H12.0927L12.0536 1.00542C11.9435 1.02073 11.8354 1.04884 11.7318 1.08917L11.6222 1.13179C11.6042 1.13879 11.5869 1.14762 11.5707 1.15814L11.5477 1.17308C11.5212 1.19023 11.4997 1.21401 11.4853 1.24204L11.3902 1.54083L11.2732 1.79702L11.0976 2.08167C10.9433 2.26923 10.7504 2.4213 10.5319 2.5275L10.4537 2.56557L10.278 2.65097L10.2667 2.65466C10.0991 2.70898 9.92636 2.7459 9.75122 2.76483H9.58026C9.53823 2.76483 9.4963 2.76079 9.45505 2.75276C9.39908 2.74187 9.34476 2.72373 9.29348 2.6988L9.19512 2.65097L9.09116 2.60041C9.04352 2.57725 8.99844 2.54917 8.95663 2.51665C8.90126 2.47356 8.85211 2.42303 8.81057 2.36648L8.79305 2.34263C8.74905 2.28271 8.71205 2.21795 8.68277 2.14962L8.60034 1.95721C8.58716 1.92644 8.57015 1.89747 8.54971 1.87097L8.54722 1.86774C8.51135 1.82123 8.46519 1.78365 8.41237 1.75796L8.40882 1.75624C8.38674 1.7455 8.36358 1.73716 8.33973 1.73136C8.28638 1.71839 8.2307 1.71839 8.17735 1.73136C8.15349 1.73716 8.13033 1.7455 8.10825 1.75624L7.94398 1.83612C7.84167 1.88587 7.74369 1.94408 7.65106 2.01014L7.6348 2.02174C7.44683 2.1558 7.2803 2.3176 7.14088 2.50162L6.92806 2.78252C6.66516 3.12952 6.45295 3.51214 6.2978 3.9189L5.85854 5.07049C5.74161 5.5443 5.65867 6.02585 5.61035 6.51148L5.50732 7.54694L5.48315 7.73498C5.4798 7.76106 5.4703 7.78596 5.45543 7.80765C5.43231 7.84139 5.39753 7.8654 5.35778 7.87506L5.22958 7.90623C5.20016 7.91338 5.17017 7.9179 5.13995 7.91974L4.71707 7.94544L4.19024 8.00237L3.37073 8.20163L3.01951 8.31549L2.99974 8.3215C2.70157 8.41212 2.41386 8.53415 2.14146 8.68553L2.07404 8.73597C1.8664 8.89131 1.68212 9.07563 1.52683 9.2833L1.16409 9.91831C1.11342 10.007 1.07386 10.1016 1.04628 10.1999L1.01577 10.3087C1.00531 10.346 1 10.3846 1 10.4234V10.4722C1 10.4954 1.00453 10.5183 1.01333 10.5397L1.04052 10.6058C1.05142 10.6323 1.07724 10.6496 1.1059 10.6496C1.1133 10.6496 1.12066 10.6485 1.1277 10.6462L1.1414 10.6417C1.18206 10.6285 1.21585 10.5998 1.23539 10.5618L1.24883 10.5357C1.25851 10.5168 1.26558 10.4968 1.26984 10.476L1.28269 10.4135C1.28934 10.3812 1.299 10.3496 1.31155 10.3191L1.34082 10.2479C1.34769 10.2312 1.35122 10.2134 1.35122 10.1953V10.1395C1.35122 10.1207 1.36193 10.1036 1.37881 10.0954C1.39738 10.0863 1.41962 10.0899 1.43443 10.1043L1.45236 10.1217C1.4628 10.1319 1.47045 10.1446 1.47456 10.1586L1.5113 10.2836C1.52163 10.3188 1.53527 10.3529 1.55203 10.3855L1.6439 10.5642L1.67138 10.631C1.69187 10.6808 1.72236 10.7259 1.76098 10.7635L1.76557 10.7679C1.78038 10.7823 1.80262 10.7859 1.82119 10.7769C1.83807 10.7687 1.84878 10.7516 1.84878 10.7328V10.6496V10.5073V10.365L1.82214 10.1577C1.82039 10.1441 1.81727 10.1307 1.81282 10.1177L1.80215 10.0866C1.79443 10.0641 1.79443 10.0396 1.80215 10.0171L1.80843 9.99878C1.81541 9.97843 1.83155 9.96255 1.85202 9.95592C1.8839 9.94558 1.91857 9.95988 1.9339 9.98969L1.95876 10.038C1.96347 10.0472 1.96924 10.0558 1.97595 10.0636L2.1122 10.2226L2.18405 10.3158C2.19411 10.3289 2.20965 10.3365 2.22612 10.3365C2.24602 10.3365 2.26426 10.3254 2.27336 10.3077L2.27772 10.2992C2.28428 10.2864 2.28668 10.2719 2.2846 10.2578L2.25854 10.0803L2.19217 9.69304C2.17799 9.61028 2.1784 9.52568 2.19339 9.44306C2.23434 9.2174 2.38042 9.02477 2.58668 8.92447L2.72683 8.85632C3.25284 8.66685 3.79298 8.51917 4.34221 8.41466L4.86341 8.31549L5.11502 8.24875C5.1604 8.23672 5.2086 8.24139 5.25082 8.26192C5.31821 8.29469 5.36098 8.36305 5.36098 8.43798V9.39716L5.27317 10.5927L5.1561 13.2684L5.14425 13.493C5.11317 14.0825 5.12691 14.6735 5.18537 15.2609V16.4869L5.16021 16.8861C5.15851 16.9131 5.16868 16.9394 5.18804 16.9583C5.23429 17.0033 5.31121 16.9883 5.33722 16.9293L5.45087 16.6714C5.46517 16.6389 5.47336 16.6041 5.47503 16.5687L5.50732 15.8872V15.4882C5.50732 15.4317 5.5127 15.3753 5.5234 15.3198C5.56923 15.0821 5.7099 14.8734 5.913 14.7417L5.94634 14.7201L6.12739 14.5734C6.24049 14.4817 6.34313 14.3778 6.43344 14.2637L6.45277 14.2392C6.54405 14.1238 6.62027 13.9973 6.67961 13.8626L6.73609 13.7344C6.75586 13.6896 6.77004 13.6425 6.77832 13.5941L6.79018 13.525C6.81191 13.3981 6.88752 13.2869 6.99749 13.2201C7.03793 13.1955 7.08203 13.1776 7.12814 13.1669L7.67317 13.0407L8.49268 12.9553H9.16585L10.2165 13.0047C10.6984 13.0274 11.1426 13.2719 11.4195 13.6669L11.7193 14.0495C11.8312 14.1924 11.9598 14.3215 12.1024 14.4339L12.2555 14.5546C12.7072 14.9108 12.9707 15.4543 12.9707 16.0295Z" fill={color} stroke={color} strokeWidth="0.5"/>
    <path d="M9.5567 4.21875L9.21841 4.41102C9.16944 4.43886 9.12596 4.4754 9.09011 4.51886L9.05847 4.55723C9.04706 4.57107 9.03801 4.58669 9.03168 4.60347C9.01196 4.65579 9.02041 4.71456 9.05407 4.75921L9.05642 4.76232C9.07352 4.785 9.09602 4.80303 9.12187 4.81479L9.28846 4.89054C9.35705 4.92172 9.42931 4.94407 9.50352 4.95705L9.65979 4.98438L9.94841 4.99388C10.0717 4.99795 10.1951 4.98766 10.316 4.96322L10.3649 4.95334C10.4171 4.9428 10.4683 4.92802 10.5181 4.90917L10.6806 4.84757C10.7676 4.81461 10.842 4.75509 10.8932 4.67745L10.9238 4.63116C10.9724 4.55751 10.9879 4.46691 10.9668 4.38127C10.9483 4.30673 10.9034 4.24147 10.8403 4.19766L10.7637 4.14444C10.7153 4.11085 10.662 4.08505 10.6057 4.06798L10.5569 4.05317C10.4411 4.01809 10.3195 4.00704 10.1993 4.0207L10.1369 4.0278C10.0256 4.04045 9.91659 4.06875 9.81317 4.11186L9.5567 4.21875Z" fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="0.5"/>
    <path d="M12.691 3.28286L12.6723 3.30709C12.5991 3.40204 12.5525 3.51475 12.5372 3.63367L12.5312 3.67979V3.83335C12.5312 3.88245 12.5394 3.93122 12.5553 3.97768C12.578 4.04383 12.6159 4.10371 12.666 4.15247L12.6758 4.16198C12.7346 4.21919 12.8066 4.26111 12.8853 4.28409L12.9378 4.2994C13.0168 4.32246 13.1002 4.32629 13.1811 4.31057L13.1873 4.30936C13.2934 4.28872 13.3899 4.2341 13.4621 4.15376C13.5233 4.08579 13.5645 4.0023 13.5813 3.91243L13.5893 3.86978C13.6057 3.78201 13.6039 3.69181 13.584 3.60476L13.58 3.58726C13.5639 3.5165 13.5373 3.44851 13.5013 3.38549L13.4611 3.31505C13.4271 3.25545 13.3792 3.20487 13.3217 3.16753C13.2639 3.13006 13.1979 3.10702 13.1293 3.10035L13.1158 3.09903C13.0029 3.08805 12.8899 3.11753 12.7968 3.1822C12.7566 3.21014 12.7209 3.24409 12.691 3.28286Z" fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="0.5"/>
    <path d="M9.1632 11.9798L7.55256 11.9576C7.25515 11.9535 7.02479 11.696 7.05369 11.4L7.13423 10.75L7.21477 10.05L7.42953 9.125L7.5113 8.88703C7.59976 8.62961 7.7129 8.38135 7.84915 8.14572L7.89989 8.05796C7.97992 7.91955 8.071 7.78782 8.17225 7.66408L8.32943 7.47196C8.40915 7.37451 8.50275 7.2893 8.60722 7.21903C8.8195 7.07626 9.06953 7 9.32536 7H9.42968C9.52777 7 9.62561 7.0098 9.72175 7.02927C10.029 7.09146 10.3083 7.2501 10.5191 7.48209L10.5425 7.5079C10.7023 7.6837 10.8203 7.89328 10.8877 8.12102L10.9167 8.21865C10.9719 8.40524 11 8.59883 11 8.79343V9.65V10.1682C11 10.3056 10.9844 10.4426 10.9534 10.5765C10.7613 11.4072 10.0158 11.9916 9.1632 11.9798Z" fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="0.5"/>
    <path d="M7.19145 5.11569L7.15761 5.13762C7.11145 5.16755 7.05547 5.17841 7.00147 5.16791C6.96091 5.16002 6.92353 5.14047 6.89391 5.11166L6.86559 5.08412C6.85622 5.07501 6.84778 5.06499 6.8404 5.05422C6.81009 5.01 6.79907 4.95536 6.80987 4.90286L6.81511 4.87737C6.81984 4.85436 6.82768 4.83211 6.83842 4.81122L6.91004 4.67191L6.96958 4.5754C6.98792 4.54567 7.01546 4.52273 7.04802 4.51007C7.1066 4.48728 7.1731 4.50077 7.21817 4.5446L7.23199 4.55805L7.2735 4.60851C7.32236 4.6679 7.34907 4.74242 7.34907 4.81932C7.34907 4.8721 7.33648 4.92411 7.31235 4.97105L7.29931 4.99642C7.27438 5.04491 7.23719 5.08603 7.19145 5.11569Z" fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="0.5"/>
  </svg>
);

// ── Icons ──
const IconSparkles: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />
  </svg>
);
const IconArrowUp: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
  </svg>
);
const IconCheck: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = GREEN }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IconFileText: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
  </svg>
);
const IconPlay: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);
const IconUpload: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const IconTarget: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IconCalendar: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
  </svg>
);
const IconMessageCircle: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);
const IconClipboard: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

// ── Typewriter hook ──
const useTypewriter = (text: string, frame: number, startFrame: number, speed = 1.5) => {
  const charsToShow = Math.floor(Math.max(0, (frame - startFrame) * speed));
  return text.slice(0, Math.min(charsToShow, text.length));
};

// ── Animated Cursor ──
const AnimatedCursor: React.FC<{ x: number; y: number; frame: number; clickFrame?: number }> = ({ x, y, frame, clickFrame }) => {
  const clickScale = clickFrame !== undefined
    ? interpolate(frame, [clickFrame, clickFrame + 4, clickFrame + 12], [1, 0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const clickRipple = clickFrame !== undefined
    ? interpolate(frame, [clickFrame, clickFrame + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 9999, pointerEvents: "none", transform: `scale(${clickScale})` }}>
      {clickRipple > 0 && clickRipple < 1 && (
        <div style={{ position: "absolute", left: -15, top: -15, width: 30, height: 30, borderRadius: "50%", border: `2px solid ${ACCENT}`, opacity: 1 - clickRipple, transform: `scale(${1 + clickRipple * 2})` }} />
      )}
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
        <path d="M5.5 2L5.5 20.5L9.5 16.5L14 24L17.5 22L13 14.5L18.5 14.5L5.5 2Z" fill={ACCENT_DEEP} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// ── Initials Avatar ──
const InitialsAvatar: React.FC<{ name: string; bg?: string; size?: number }> = ({ name, bg = ACCENT, size = 40 }) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: size * 0.4, fontFamily: bodyFont, fontWeight: 600 }}>
      {initials}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// SCENE 1: Career Page Landing — Conversational Self-Selection
// ════════════════════════════════════════════════════════════════
const CareerPageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Page fade in
  const pageIn = spring({ frame, fps, config: { damping: 200 } });

  // Chat messages
  const msgs = [
    { role: "ai" as const, text: "Hi! I'm Laidback's career assistant. Tell me about yourself and what kind of role excites you.", start: 20 },
    { role: "user" as const, text: "I'm a product designer with 6 years of experience, focused on design systems and fintech.", start: 65 },
    { role: "ai" as const, text: "Great match! We have 2 open roles that align with your profile. Let me show you:", start: 110 },
  ];

  // Role cards appear
  const rolesStart = 155;

  const roles = [
    { title: "Senior Product Designer", team: "Design Systems", location: "Remote · EU", match: "Strong match" },
    { title: "Lead Designer, Fintech", team: "Payments", location: "London · Hybrid", match: "Great match" },
  ];

  // User selects role
  const selectFrame = 195;
  const selectMsg = { role: "user" as const, text: "The Senior Product Designer role looks perfect — I'd love to apply!", start: 210 };
  const confirmMsg = { role: "ai" as const, text: "Excellent choice! Let me walk you through a quick screening to get started.", start: 250 };

  // Cursor path
  const cursorX = interpolate(frame, [180, 195], [960, 580], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });
  const cursorY = interpolate(frame, [180, 195], [400, 518], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) });

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 72, background: CARD, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 60px", gap: 12, opacity: pageIn }}>
        <LaidbackLogo size={24} color={ACCENT_DEEP} />
        <span style={{ fontFamily: headingFont, fontSize: 22, color: TEXT }}>laidback</span>
        <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC, marginLeft: 8 }}>careers</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC }}>Open positions</span>
      </div>

      {/* Main chat area */}
      <div style={{ position: "absolute", top: 100, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 820, display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Chat messages */}
          {msgs.map((msg, i) => {
            const msgSpring = spring({ frame: frame - msg.start, fps, config: { damping: 30, stiffness: 200 } });
            if (frame < msg.start) return null;
            const typed = useTypewriter(msg.text, frame, msg.start + 8, 2);
            return (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 20, opacity: msgSpring, transform: `translateY(${(1 - msgSpring) * 15}px)`, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "ai" ? (
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <LaidbackLogo size={18} color="#fff" />
                  </div>
                ) : (
                  <InitialsAvatar name="Alex Chen" bg={BLUE} size={36} />
                )}
                <div style={{
                  maxWidth: 560,
                  padding: "14px 20px",
                  borderRadius: msg.role === "ai" ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                  background: msg.role === "ai" ? CARD : ACCENT,
                  color: msg.role === "ai" ? TEXT : "#fff",
                  fontFamily: bodyFont,
                  fontSize: 16,
                  lineHeight: 1.6,
                  border: msg.role === "ai" ? `1px solid ${BORDER}` : "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  {typed}
                </div>
              </div>
            );
          })}

          {/* Role cards */}
          {frame >= rolesStart && (
            <div style={{ display: "flex", gap: 16, marginTop: 8, marginLeft: 48 }}>
              {roles.map((role, i) => {
                const cardSpring = spring({ frame: frame - rolesStart - i * 10, fps, config: { damping: 25 } });
                const isSelected = frame >= selectFrame && i === 0;
                return (
                  <div key={i} style={{
                    flex: 1,
                    padding: "20px 24px",
                    borderRadius: 16,
                    background: CARD,
                    border: `2px solid ${isSelected ? ACCENT : BORDER}`,
                    opacity: cardSpring,
                    transform: `translateY(${(1 - cardSpring) * 20}px) scale(${isSelected ? 1.02 : 1})`,
                    boxShadow: isSelected ? `0 4px 20px ${ACCENT}20` : "0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                    <div style={{ fontFamily: headingFont, fontSize: 17, color: TEXT, marginBottom: 8 }}>{role.title}</div>
                    <div style={{ fontFamily: bodyFont, fontSize: 13, color: TEXT_SEC, marginBottom: 4 }}>{role.team} · {role.location}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 20, background: GREEN_BG, marginTop: 8 }}>
                      <IconCheck size={12} />
                      <span style={{ fontFamily: bodyFont, fontSize: 12, color: GREEN }}>{role.match}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Select message */}
          {frame >= selectMsg.start && (() => {
            const msgSpring = spring({ frame: frame - selectMsg.start, fps, config: { damping: 30 } });
            const typed = useTypewriter(selectMsg.text, frame, selectMsg.start + 8, 2);
            return (
              <div style={{ display: "flex", gap: 12, marginTop: 20, opacity: msgSpring, transform: `translateY(${(1 - msgSpring) * 15}px)`, flexDirection: "row-reverse" }}>
                <InitialsAvatar name="Alex Chen" bg={BLUE} size={36} />
                <div style={{ maxWidth: 560, padding: "14px 20px", borderRadius: "18px 4px 18px 18px", background: ACCENT, color: "#fff", fontFamily: bodyFont, fontSize: 16, lineHeight: 1.6 }}>
                  {typed}
                </div>
              </div>
            );
          })()}

          {/* Confirm message */}
          {frame >= confirmMsg.start && (() => {
            const msgSpring = spring({ frame: frame - confirmMsg.start, fps, config: { damping: 30 } });
            const typed = useTypewriter(confirmMsg.text, frame, confirmMsg.start + 8, 2);
            return (
              <div style={{ display: "flex", gap: 12, marginTop: 20, opacity: msgSpring, transform: `translateY(${(1 - msgSpring) * 15}px)` }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <LaidbackLogo size={18} color="#fff" />
                </div>
                <div style={{ maxWidth: 560, padding: "14px 20px", borderRadius: "4px 18px 18px 18px", background: CARD, color: TEXT, fontFamily: bodyFont, fontSize: 16, lineHeight: 1.6, border: `1px solid ${BORDER}` }}>
                  {typed}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Cursor */}
      {frame >= 180 && frame < 220 && <AnimatedCursor x={cursorX} y={cursorY} frame={frame} clickFrame={195} />}
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════
// SCENE 2: AI Pre-Screening
// ════════════════════════════════════════════════════════════════
const PreScreeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const msgs = [
    { role: "ai" as const, text: "Let's start with a quick screening. What's your experience with design tokens and component libraries?", start: 15 },
    { role: "user" as const, text: "I've built a design system from scratch at Stripe, serving 200+ components used by 40 engineers.", start: 60 },
    { role: "ai" as const, text: "Impressive! How do you approach collaboration with engineering teams on design handoff?", start: 105 },
    { role: "user" as const, text: "I use Figma dev mode and maintain a shared Storybook. I run weekly syncs with eng leads.", start: 145 },
  ];

  // AI Assessment card
  const assessmentStart = 195;
  const assessmentSpring = spring({ frame: frame - assessmentStart, fps, config: { damping: 25 } });

  const criteria = [
    { label: "Design Systems", verdict: "Exceeds" },
    { label: "Cross-functional Collaboration", verdict: "Strong" },
    { label: "Technical Fluency", verdict: "Strong" },
    { label: "Industry Experience", verdict: "Exceeds" },
  ];

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 72, background: CARD, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 60px", gap: 12 }}>
        <LaidbackLogo size={24} color={ACCENT_DEEP} />
        <span style={{ fontFamily: headingFont, fontSize: 22, color: TEXT }}>laidback</span>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: BLUE_BG }}>
          <IconTarget size={14} color={BLUE} />
          <span style={{ fontFamily: bodyFont, fontSize: 13, color: BLUE }}>Pre-Screening</span>
        </div>
      </div>

      <div style={{ position: "absolute", top: 100, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 820, display: "flex", flexDirection: "column" }}>
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <IconSparkles size={16} color={ACCENT} />
            <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC }}>AI is assessing your fit for Senior Product Designer</span>
          </div>

          {/* Messages */}
          {msgs.map((msg, i) => {
            const msgSpring = spring({ frame: frame - msg.start, fps, config: { damping: 30, stiffness: 200 } });
            if (frame < msg.start) return null;
            const typed = useTypewriter(msg.text, frame, msg.start + 8, 2.2);
            return (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 18, opacity: msgSpring, transform: `translateY(${(1 - msgSpring) * 15}px)`, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "ai" ? (
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <LaidbackLogo size={18} color="#fff" />
                  </div>
                ) : (
                  <InitialsAvatar name="Alex Chen" bg={BLUE} size={36} />
                )}
                <div style={{
                  maxWidth: 540,
                  padding: "14px 20px",
                  borderRadius: msg.role === "ai" ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                  background: msg.role === "ai" ? CARD : ACCENT,
                  color: msg.role === "ai" ? TEXT : "#fff",
                  fontFamily: bodyFont, fontSize: 16, lineHeight: 1.6,
                  border: msg.role === "ai" ? `1px solid ${BORDER}` : "none",
                }}>
                  {typed}
                </div>
              </div>
            );
          })}

          {/* Assessment card */}
          {frame >= assessmentStart && (
            <div style={{
              marginTop: 20, marginLeft: 48, padding: "24px 28px", borderRadius: 18,
              background: CARD, border: `1px solid ${BORDER}`,
              opacity: assessmentSpring, transform: `translateY(${(1 - assessmentSpring) * 20}px)`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <IconSparkles size={18} color={ACCENT} />
                <span style={{ fontFamily: headingFont, fontSize: 18, color: TEXT }}>Screening Assessment</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {criteria.map((c, i) => {
                  const cSpring = spring({ frame: frame - assessmentStart - 10 - i * 8, fps, config: { damping: 25 } });
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 16px", borderRadius: 12,
                      background: c.verdict === "Exceeds" ? GREEN_BG : BLUE_BG,
                      border: `1px solid ${c.verdict === "Exceeds" ? `${GREEN}15` : `${BLUE}15`}`,
                      opacity: cSpring, transform: `translateY(${(1 - cSpring) * 10}px)`,
                    }}>
                      <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT }}>{c.label}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <IconCheck size={13} color={c.verdict === "Exceeds" ? GREEN : BLUE} />
                        <span style={{ fontFamily: bodyFont, fontSize: 13, color: c.verdict === "Exceeds" ? GREEN : BLUE, fontWeight: 500 }}>{c.verdict}</span>
                      </div>
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

// ════════════════════════════════════════════════════════════════
// SCENE 3: Pipeline Progress Dashboard
// ════════════════════════════════════════════════════════════════
const PipelineDashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageIn = spring({ frame, fps, config: { damping: 200 } });

  const steps = [
    { label: "Applied", icon: <IconCheck size={16} color="#fff" />, status: "done" as const, date: "Mar 12" },
    { label: "Pre-Screening", icon: <IconCheck size={16} color="#fff" />, status: "done" as const, date: "Mar 12" },
    { label: "Design Task", icon: <IconClipboard size={16} color={ORANGE} />, status: "current" as const, date: "Due Mar 18" },
    { label: "Interview", icon: <IconCalendar size={16} color={TEXT_SEC} />, status: "upcoming" as const, date: "Mar 22" },
    { label: "Final Review", icon: <IconTarget size={16} color={TEXT_SEC} />, status: "upcoming" as const, date: "Mar 25" },
  ];

  // Task notification
  const taskNotifStart = 60;
  const taskSpring = spring({ frame: frame - taskNotifStart, fps, config: { damping: 20 } });

  // Prep notes appear
  const prepStart = 120;
  const prepSpring = spring({ frame: frame - prepStart, fps, config: { damping: 25 } });

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 72, background: CARD, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 60px", gap: 12, opacity: pageIn }}>
        <LaidbackLogo size={24} color={ACCENT_DEEP} />
        <span style={{ fontFamily: headingFont, fontSize: 22, color: TEXT }}>laidback</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC }}>My Applications</span>
        <InitialsAvatar name="Alex Chen" bg={BLUE} size={32} />
      </div>

      <div style={{ position: "absolute", top: 100, left: 80, right: 80, bottom: 60 }}>
        {/* Role header */}
        <div style={{ marginBottom: 40, opacity: pageIn }}>
          <div style={{ fontFamily: headingFont, fontSize: 32, color: TEXT, marginBottom: 6 }}>Senior Product Designer</div>
          <div style={{ fontFamily: bodyFont, fontSize: 16, color: TEXT_SEC }}>Design Systems · Remote EU · Applied 3 days ago</div>
        </div>

        {/* Pipeline stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 50, padding: "0 20px" }}>
          {steps.map((step, i) => {
            const stepSpring = spring({ frame: frame - 15 - i * 8, fps, config: { damping: 25 } });
            const isDone = step.status === "done";
            const isCurrent = step.status === "current";
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, opacity: stepSpring }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: isDone ? GREEN : isCurrent ? ORANGE : `${BORDER}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: isCurrent ? `3px solid ${ORANGE}40` : "none",
                    boxShadow: isCurrent ? `0 0 0 6px ${ORANGE}15` : "none",
                  }}>
                    {step.icon}
                  </div>
                  <span style={{ fontFamily: bodyFont, fontSize: 13, color: isCurrent ? ORANGE : isDone ? GREEN : TEXT_SEC, fontWeight: isCurrent ? 600 : 400 }}>{step.label}</span>
                  <span style={{ fontFamily: bodyFont, fontSize: 11, color: TEXT_SEC }}>{step.date}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: isDone ? GREEN : BORDER, marginTop: -26, marginLeft: 8, marginRight: 8 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Two-column layout */}
        <div style={{ display: "flex", gap: 24 }}>
          {/* Task notification */}
          <div style={{
            flex: 1, padding: "24px 28px", borderRadius: 18,
            background: CARD, border: `1px solid ${BORDER}`,
            opacity: taskSpring, transform: `translateY(${(1 - taskSpring) * 20}px)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: ORANGE_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconClipboard size={16} color={ORANGE} />
              </div>
              <div>
                <div style={{ fontFamily: headingFont, fontSize: 17, color: TEXT }}>Design Task</div>
                <div style={{ fontFamily: bodyFont, fontSize: 12, color: TEXT_SEC }}>Due in 6 days</div>
              </div>
            </div>
            <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT, lineHeight: 1.7, marginBottom: 16 }}>
              Create a design system component for a payment confirmation flow. Include states, variants, and documentation.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ padding: "8px 18px", borderRadius: 10, background: ORANGE, color: "#fff", fontFamily: bodyFont, fontSize: 13, fontWeight: 500 }}>Submit Task</div>
              <div style={{ padding: "8px 18px", borderRadius: 10, background: "transparent", border: `1px solid ${BORDER}`, color: TEXT, fontFamily: bodyFont, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <IconUpload size={14} color={TEXT_SEC} />
                Upload files
              </div>
            </div>
          </div>

          {/* Prep notes */}
          <div style={{
            flex: 1, padding: "24px 28px", borderRadius: 18,
            background: CARD, border: `1px solid ${BORDER}`,
            opacity: prepSpring, transform: `translateY(${(1 - prepSpring) * 20}px)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: PURPLE_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconFileText size={16} color={PURPLE} />
              </div>
              <div>
                <div style={{ fontFamily: headingFont, fontSize: 17, color: TEXT }}>Interview Prep Notes</div>
                <div style={{ fontFamily: bodyFont, fontSize: 12, color: TEXT_SEC }}>AI-generated for your next step</div>
              </div>
            </div>
            {[
              "Review Laidback's design system principles",
              "Prepare case study: Stripe component library",
              "Study accessibility patterns for fintech",
              "Practice presenting design decisions",
            ].map((note, i) => {
              const noteSpring = spring({ frame: frame - prepStart - 15 - i * 8, fps, config: { damping: 25 } });
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  borderRadius: 10, background: i % 2 === 0 ? PURPLE_BG : "transparent",
                  marginBottom: 6, opacity: noteSpring, transform: `translateX(${(1 - noteSpring) * 15}px)`,
                }}>
                  <IconCheck size={13} color={PURPLE} />
                  <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT }}>{note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════
// SCENE 4: Practice & Preparation
// ════════════════════════════════════════════════════════════════
const PracticeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageIn = spring({ frame, fps, config: { damping: 200 } });

  // Practice interview chat
  const msgs = [
    { role: "ai" as const, text: "Let's practice! Walk me through how you'd approach building a component library from scratch.", start: 15 },
    { role: "user" as const, text: "I'd start with an audit of existing patterns, then define core primitives — color tokens, spacing scale, typography...", start: 55 },
    { role: "ai" as const, text: "Good structure! The interviewer will likely probe deeper on governance. How do you handle contribution workflows?", start: 100 },
  ];

  // Feedback card
  const feedbackStart = 145;
  const feedbackSpring = spring({ frame: frame - feedbackStart, fps, config: { damping: 25 } });

  const feedback = [
    { area: "Structure", rating: "Strong", color: GREEN },
    { area: "Depth", rating: "Good — add more examples", color: BLUE },
    { area: "Storytelling", rating: "Practice more concisely", color: ORANGE },
  ];

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 72, background: CARD, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 60px", gap: 12, opacity: pageIn }}>
        <LaidbackLogo size={24} color={ACCENT_DEEP} />
        <span style={{ fontFamily: headingFont, fontSize: 22, color: TEXT }}>laidback</span>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: PURPLE_BG }}>
          <IconPlay size={13} color={PURPLE} />
          <span style={{ fontFamily: bodyFont, fontSize: 13, color: PURPLE }}>Practice Mode</span>
        </div>
      </div>

      <div style={{ position: "absolute", top: 100, left: 0, right: 0, bottom: 0, display: "flex", gap: 30, padding: "0 80px" }}>
        {/* Chat column */}
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: headingFont, fontSize: 24, color: TEXT, marginBottom: 6 }}>Practice Interview</div>
          <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC, marginBottom: 24 }}>AI simulates real interview questions for your role</div>

          {msgs.map((msg, i) => {
            const msgSpring = spring({ frame: frame - msg.start, fps, config: { damping: 30 } });
            if (frame < msg.start) return null;
            const typed = useTypewriter(msg.text, frame, msg.start + 8, 2);
            return (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 18, opacity: msgSpring, transform: `translateY(${(1 - msgSpring) * 15}px)`, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "ai" ? (
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: PURPLE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconPlay size={15} color="#fff" />
                  </div>
                ) : (
                  <InitialsAvatar name="Alex Chen" bg={BLUE} size={36} />
                )}
                <div style={{
                  maxWidth: 480,
                  padding: "14px 20px",
                  borderRadius: msg.role === "ai" ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                  background: msg.role === "ai" ? CARD : ACCENT,
                  color: msg.role === "ai" ? TEXT : "#fff",
                  fontFamily: bodyFont, fontSize: 16, lineHeight: 1.6,
                  border: msg.role === "ai" ? `1px solid ${BORDER}` : "none",
                }}>
                  {typed}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback column */}
        <div style={{ flex: 0.8, opacity: feedbackSpring, transform: `translateX(${(1 - feedbackSpring) * 30}px)` }}>
          <div style={{
            padding: "24px 28px", borderRadius: 18,
            background: CARD, border: `1px solid ${BORDER}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <IconSparkles size={16} color={ACCENT} />
              <span style={{ fontFamily: headingFont, fontSize: 18, color: TEXT }}>AI Feedback</span>
            </div>
            {feedback.map((f, i) => {
              const fSpring = spring({ frame: frame - feedbackStart - 10 - i * 10, fps, config: { damping: 25 } });
              return (
                <div key={i} style={{
                  padding: "14px 16px", borderRadius: 12, marginBottom: 10,
                  background: `${f.color}08`, border: `1px solid ${f.color}15`,
                  opacity: fSpring, transform: `translateY(${(1 - fSpring) * 10}px)`,
                }}>
                  <div style={{ fontFamily: bodyFont, fontSize: 13, color: TEXT_SEC, marginBottom: 4 }}>{f.area}</div>
                  <div style={{ fontFamily: bodyFont, fontSize: 15, color: f.color, fontWeight: 500 }}>{f.rating}</div>
                </div>
              );
            })}

            {/* Score */}
            {frame >= feedbackStart + 50 && (() => {
              const scoreSpring = spring({ frame: frame - feedbackStart - 50, fps, config: { damping: 20 } });
              return (
                <div style={{
                  marginTop: 16, padding: "16px", borderRadius: 12, background: GREEN_BG,
                  border: `1px solid ${GREEN}15`, textAlign: "center" as const,
                  opacity: scoreSpring, transform: `scale(${0.9 + scoreSpring * 0.1})`,
                }}>
                  <div style={{ fontFamily: headingFont, fontSize: 28, color: GREEN }}>7.5/10</div>
                  <div style={{ fontFamily: bodyFont, fontSize: 13, color: TEXT_SEC }}>Readiness Score</div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════
// SCENE 5: Task Submission & All-in-One Hub
// ════════════════════════════════════════════════════════════════
const TaskHubScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageIn = spring({ frame, fps, config: { damping: 200 } });

  // Files uploading
  const files = [
    { name: "payment-flow.fig", size: "2.4 MB", icon: "🎨", uploadFrame: 25 },
    { name: "component-docs.pdf", size: "890 KB", icon: "📄", uploadFrame: 40 },
    { name: "prototype-video.mp4", size: "12 MB", icon: "🎬", uploadFrame: 55 },
  ];

  // Confirmation
  const confirmStart = 100;
  const confirmSpring = spring({ frame: frame - confirmStart, fps, config: { damping: 20 } });

  // Timeline update
  const timelineStart = 140;

  const timeline = [
    { label: "Task submitted", time: "Just now", color: GREEN, icon: <IconCheck size={14} color="#fff" /> },
    { label: "Interview scheduled", time: "Mar 22, 2:00 PM", color: BLUE, icon: <IconCalendar size={14} color="#fff" /> },
    { label: "Prep notes updated", time: "Mar 21", color: PURPLE, icon: <IconFileText size={14} color="#fff" /> },
    { label: "Pre-screening passed", time: "Mar 12", color: GREEN, icon: <IconCheck size={14} color="#fff" /> },
  ];

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 72, background: CARD, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 60px", gap: 12, opacity: pageIn }}>
        <LaidbackLogo size={24} color={ACCENT_DEEP} />
        <span style={{ fontFamily: headingFont, fontSize: 22, color: TEXT }}>laidback</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC }}>My Applications</span>
        <InitialsAvatar name="Alex Chen" bg={BLUE} size={32} />
      </div>

      <div style={{ position: "absolute", top: 100, left: 80, right: 80, bottom: 60, display: "flex", gap: 30 }}>
        {/* Left: Task submission */}
        <div style={{ flex: 1.2 }}>
          <div style={{ fontFamily: headingFont, fontSize: 24, color: TEXT, marginBottom: 6, opacity: pageIn }}>Design Task Submission</div>
          <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC, marginBottom: 24, opacity: pageIn }}>Upload your files — everything stays in one place</div>

          {/* Upload area */}
          <div style={{
            padding: "32px", borderRadius: 18, background: CARD,
            border: `2px dashed ${BORDER}`, marginBottom: 20, opacity: pageIn,
            textAlign: "center" as const,
          }}>
            <IconUpload size={28} color={TEXT_SEC} />
            <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT_SEC, marginTop: 10 }}>Drop files here or click to browse</div>
          </div>

          {/* Uploaded files */}
          {files.map((file, i) => {
            const fSpring = spring({ frame: frame - file.uploadFrame, fps, config: { damping: 25 } });
            if (frame < file.uploadFrame) return null;
            const progress = interpolate(frame, [file.uploadFrame, file.uploadFrame + 30], [0, 100], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                borderRadius: 12, background: CARD, border: `1px solid ${BORDER}`,
                marginBottom: 8, opacity: fSpring, transform: `translateX(${(1 - fSpring) * -20}px)`,
              }}>
                <span style={{ fontSize: 20 }}>{file.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT }}>{file.name}</div>
                  <div style={{ fontFamily: bodyFont, fontSize: 12, color: TEXT_SEC }}>{file.size}</div>
                </div>
                {progress >= 100 ? (
                  <IconCheck size={16} color={GREEN} />
                ) : (
                  <div style={{ width: 60, height: 4, borderRadius: 2, background: BORDER }}>
                    <div style={{ width: `${progress}%`, height: "100%", borderRadius: 2, background: ACCENT }} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit confirmation */}
          {frame >= confirmStart && (
            <div style={{
              marginTop: 16, padding: "16px 24px", borderRadius: 14,
              background: GREEN_BG, border: `1px solid ${GREEN}20`,
              display: "flex", alignItems: "center", gap: 12,
              opacity: confirmSpring, transform: `scale(${0.95 + confirmSpring * 0.05})`,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconCheck size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: bodyFont, fontSize: 15, color: GREEN, fontWeight: 500 }}>Task submitted successfully!</div>
                <div style={{ fontFamily: bodyFont, fontSize: 13, color: TEXT_SEC }}>The hiring team has been notified</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Activity timeline */}
        <div style={{ flex: 0.8 }}>
          <div style={{
            padding: "24px 28px", borderRadius: 18,
            background: CARD, border: `1px solid ${BORDER}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}>
            <div style={{ fontFamily: headingFont, fontSize: 18, color: TEXT, marginBottom: 20 }}>Your Journey</div>
            {timeline.map((item, i) => {
              const tSpring = spring({ frame: frame - timelineStart - i * 12, fps, config: { damping: 25 } });
              return (
                <div key={i} style={{
                  display: "flex", gap: 14, marginBottom: 18, opacity: tSpring, transform: `translateX(${(1 - tSpring) * 15}px)`,
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: item.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.icon}
                    </div>
                    {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, background: BORDER, marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingTop: 2 }}>
                    <div style={{ fontFamily: bodyFont, fontSize: 14, color: TEXT, fontWeight: 500 }}>{item.label}</div>
                    <div style={{ fontFamily: bodyFont, fontSize: 12, color: TEXT_SEC }}>{item.time}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next step card */}
          {frame >= timelineStart + 60 && (() => {
            const nextSpring = spring({ frame: frame - timelineStart - 60, fps, config: { damping: 20 } });
            return (
              <div style={{
                marginTop: 16, padding: "20px 24px", borderRadius: 16,
                background: BLUE_BG, border: `1px solid ${BLUE}15`,
                opacity: nextSpring, transform: `translateY(${(1 - nextSpring) * 15}px)`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <IconCalendar size={16} color={BLUE} />
                  <span style={{ fontFamily: bodyFont, fontSize: 14, color: BLUE, fontWeight: 500 }}>Next: Interview</span>
                </div>
                <div style={{ fontFamily: bodyFont, fontSize: 13, color: TEXT_SEC }}>March 22 at 2:00 PM with Sarah K. (Design Lead)</div>
                <div style={{ fontFamily: bodyFont, fontSize: 12, color: BLUE, marginTop: 6 }}>Prep notes ready →</div>
              </div>
            );
          })()}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ════════════════════════════════════════════════════════════════
export const ApplicantVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={290}>
          <CareerPageScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={260}>
          <PreScreeningScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={250}>
          <PipelineDashboardScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={230}>
          <PracticeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })}
        />
        <TransitionSeries.Sequence durationInFrames={250}>
          <TaskHubScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
