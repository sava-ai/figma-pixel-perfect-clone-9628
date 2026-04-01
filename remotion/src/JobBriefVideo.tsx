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
const IconBriefcase: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);
const IconUsers: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconFileText: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
  </svg>
);
const IconMessageCircle: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);
const IconTarget: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IconSend: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" /><path d="m22 2-11 11" />
  </svg>
);
const IconEdit: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
  </svg>
);

const useTypewriter = (text: string, startFrame: number, charsPerFrame = 0.8) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  return text.slice(0, Math.min(Math.floor(elapsed * charsPerFrame), text.length));
};

const Cursor: React.FC<{ color?: string }> = ({ color = ACCENT }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame % 16, [0, 8, 16], [1, 0, 1]);
  return <span style={{ display: "inline-block", width: 2.5, height: "1.1em", background: color, marginLeft: 2, opacity, verticalAlign: "text-bottom" }} />;
};

// ═══════════════════════════════════════════════════════
// SCENE 1: INTRO — Briefcase icon + title
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
  const orb1Y = Math.sin(frame * 0.05) * 8;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 180 + orb1Y, right: 350, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 70%)` }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ position: "relative", transform: `scale(${iconScale}) rotate(${iconRotate}deg)` }}>
          <div style={{ width: 100, height: 100, borderRadius: 24, background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 16px 50px rgba(201, 149, 107, 0.35)` }}>
            <IconFileText size={55} color="#fff" />
          </div>
          {[{ x: -35, y: -40, delay: 5, size: 14 }, { x: 40, y: -30, delay: 10, size: 10 }, { x: -25, y: 35, delay: 15, size: 8 }].map((s, i) => {
            const sSpring = spring({ frame: frame - s.delay, fps, config: { damping: 12 } });
            return <div key={i} style={{ position: "absolute", left: `calc(50% + ${s.x}px)`, top: `calc(50% + ${s.y + Math.sin((frame + i * 20) * 0.08) * 3}px)`, opacity: sSpring * 0.7, transform: `scale(${sSpring})` }}><IconSparkles size={s.size} color={ACCENT} /></div>;
          })}
        </div>
        <h1 style={{ fontSize: 72, fontFamily: headingFont, color: TEXT, margin: 0, letterSpacing: -2, transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`, opacity: titleSpring }}>Job brief</h1>
        <div style={{ width: lineW, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
        <p style={{ fontSize: 22, fontFamily: bodyFont, color: TEXT_SEC, margin: 0, opacity: subtitleSpring, transform: `translateY(${interpolate(subtitleSpring, [0, 1], [20, 0])}px)` }}>Define roles, collaboratively</p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 2: WHO DO YOU WANT TO HIRE — Search input typewriter
// 160 frames
// ═══════════════════════════════════════════════════════
const SearchInputScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelSpring = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const query = "A senior backend engineer with experience in distributed systems";
  const typed = useTypewriter(query, 30, 0.7);
  const typingDone = typed.length >= query.length;
  const submitFlash = typingDone ? spring({ frame: frame - Math.ceil(30 + query.length / 0.7), fps, config: { damping: 12, stiffness: 120 } }) : 0;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${interpolate(panelSpring, [0, 1], [0.9, 1])})`, opacity: panelSpring }}>
        <h1 style={{ fontSize: 48, fontFamily: headingFont, color: TEXT, margin: 0, marginBottom: 24, letterSpacing: -1.7, opacity: titleSpring }}>
          Who do you want to hire?
        </h1>
        <div style={{
          width: 620, background: CARD, borderRadius: 20, padding: "22px 24px 90px 24px",
          boxShadow: `4px 4px 20px rgba(0,0,0,0.12)`,
          border: `1px solid ${BORDER}`,
        }}>
          <span style={{ fontSize: 19, fontFamily: bodyFont, color: typed.length > 0 ? TEXT : "#9c9da1", lineHeight: 1.6 }}>
            {typed.length > 0 ? typed : "For example: find a user experience designer in Warsaw"}
            {!typingDone && typed.length > 0 && <Cursor />}
          </span>
        </div>
        {/* Submit button glow */}
        {typingDone && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -56, marginRight: 16, position: "relative", zIndex: 2 }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%", background: TEXT,
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: `scale(${interpolate(submitFlash, [0, 1], [0.5, 1])})`,
              opacity: submitFlash,
              boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
            }}>
              <IconArrowUp size={18} color="#fff" />
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 3: CONVERSATIONAL BRIEF — AI asks clarifying questions
// 280 frames
// ═══════════════════════════════════════════════════════
const ConversationalBriefScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const aiQ1 = "Great choice. Let me help define this role. What's the main problem this engineer will solve?";
  const userA1 = "We're rebuilding our payment processing pipeline — it needs to handle 10x more transactions";
  const aiQ2 = "Got it — high-throughput payment infra. What tech stack does the team use today?";
  const userA2 = "Go, Kafka, PostgreSQL. We're moving some services to Rust";

  const aiQ1Typed = useTypewriter(aiQ1, 10, 1.4);
  const aiQ1Done = aiQ1Typed.length >= aiQ1.length;
  const userA1Start = 80;
  const userA1Typed = useTypewriter(userA1, userA1Start, 0.9);
  const userA1Done = userA1Typed.length >= userA1.length;
  const aiQ2Start = 165;
  const aiQ2Typed = useTypewriter(aiQ2, aiQ2Start, 1.4);
  const aiQ2Done = aiQ2Typed.length >= aiQ2.length;
  const userA2Start = 215;
  const userA2Typed = useTypewriter(userA2, userA2Start, 0.9);
  const userA2Done = userA2Typed.length >= userA2.length;

  const panelSlide = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: 620, background: CHAT_BG, borderRadius: 24,
        boxShadow: `0 30px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)`,
        transform: `translateY(${interpolate(panelSlide, [0, 1], [40, 0])}px)`,
        opacity: panelSlide,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 28px 0 28px", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: `2px solid ${TEXT}`, paddingBottom: 12 }}>
            <IconSparkles size={16} color={TEXT} />
            <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>AI chat</span>
          </div>
          <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT_SEC, paddingBottom: 12 }}>Team chat</span>
        </div>
        <div style={{ height: 1, background: BORDER, margin: "0 28px" }} />

        <div style={{ padding: "24px 28px", minHeight: 360 }}>
          {/* AI Question 1 */}
          {frame > 5 && (
            <div style={{ marginBottom: 20, opacity: spring({ frame: frame - 5, fps, config: { damping: 200 } }) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <IconSparkles size={14} color={ACCENT} />
                <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT }}>Laidback</span>
              </div>
              <p style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: 0 }}>
                {aiQ1Typed}{!aiQ1Done && <Cursor />}
              </p>
            </div>
          )}

          {/* User Answer 1 */}
          {frame > userA1Start && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20, opacity: spring({ frame: frame - userA1Start, fps, config: { damping: 200 } }) }}>
              <div style={{ background: CARD, borderRadius: 18, padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: 420, fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.6 }}>
                {userA1Typed}{!userA1Done && <Cursor />}
              </div>
            </div>
          )}

          {/* AI Question 2 */}
          {frame > aiQ2Start && (
            <div style={{ marginBottom: 20, opacity: spring({ frame: frame - aiQ2Start, fps, config: { damping: 200 } }) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <IconSparkles size={14} color={ACCENT} />
                <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT }}>Laidback</span>
              </div>
              <p style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.7, margin: 0 }}>
                {aiQ2Typed}{!aiQ2Done && <Cursor />}
              </p>
            </div>
          )}

          {/* User Answer 2 */}
          {frame > userA2Start && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20, opacity: spring({ frame: frame - userA2Start, fps, config: { damping: 200 } }) }}>
              <div style={{ background: CARD, borderRadius: 18, padding: "12px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: 420, fontSize: 15, fontFamily: bodyFont, color: TEXT, lineHeight: 1.6 }}>
                {userA2Typed}{!userA2Done && <Cursor />}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: "0 28px 24px 28px" }}>
          <div style={{ background: CARD, borderRadius: 18, padding: "16px 18px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontFamily: bodyFont, color: "#bbb" }}>Tell me more about this role...</span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: TEXT, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconArrowUp size={16} color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 4: AI GENERATES JOB BRIEF — Sections appear
// 260 frames
// ═══════════════════════════════════════════════════════
const BriefGenerationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sections = [
    { icon: <IconTarget size={18} color={ACCENT} />, title: "Role Overview", content: "Senior Backend Engineer focused on rebuilding payment processing pipeline for 10x scale", delay: 0 },
    { icon: <IconBriefcase size={18} color={ACCENT} />, title: "Technical Requirements", items: ["Go + Rust (primary)", "Kafka, PostgreSQL", "Distributed systems at scale", "Payment/fintech domain"], delay: 20 },
    { icon: <IconUsers size={18} color={ACCENT} />, title: "Soft Requirements", items: ["Led 3+ eng team", "Async communication", "Ownership mentality"], delay: 40 },
    { icon: <IconFileText size={18} color={ACCENT} />, title: "Culture Fit", content: "Builder mindset, comfortable with ambiguity, thrives in fast-paced startup environment", delay: 55 },
  ];

  const headerSpring = spring({ frame, fps, config: { damping: 200 } });
  const zoomProgress = interpolate(frame, [0, 40], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });

  // Generating label pulse
  const genPulse = frame < 120 ? interpolate(frame % 30, [0, 15, 30], [0.6, 1, 0.6]) : 1;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${zoomProgress})`, transformOrigin: "center center" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, opacity: headerSpring }}>
          <IconSparkles size={20} color={ACCENT} />
          <span style={{ fontSize: 22, fontFamily: headingFont, color: TEXT }}>AI-generated job brief</span>
          {frame < 120 && (
            <span style={{ fontSize: 13, fontFamily: bodyFont, color: ACCENT, marginLeft: 8, opacity: genPulse }}>● Generating...</span>
          )}
          {frame >= 120 && (
            <span style={{ fontSize: 13, fontFamily: bodyFont, color: GREEN, marginLeft: 8, opacity: spring({ frame: frame - 120, fps, config: { damping: 200 } }) }}>
              <IconCheck size={14} color={GREEN} /> Complete
            </span>
          )}
        </div>

        {/* Brief card */}
        <div style={{
          width: 700, background: CARD, borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          padding: "32px 36px",
          display: "flex", flexDirection: "column", gap: 24,
        }}>
          {/* Job title header */}
          <div style={{
            opacity: spring({ frame: frame - 5, fps, config: { damping: 200 } }),
            borderBottom: `1px solid ${BORDER}`, paddingBottom: 20,
          }}>
            <div style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>Job Brief</div>
            <div style={{ fontSize: 26, fontFamily: headingFont, color: TEXT, letterSpacing: -0.5 }}>Senior Backend Engineer</div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {["Remote", "Full-time", "$180k–$240k"].map((tag, i) => (
                <span key={i} style={{
                  fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC,
                  background: `${ACCENT}10`, border: `1px solid ${ACCENT}20`,
                  padding: "4px 10px", borderRadius: 8,
                  opacity: spring({ frame: frame - 15 - i * 5, fps, config: { damping: 200 } }),
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Sections */}
          {sections.map((section, i) => {
            const sSpring = spring({ frame: frame - 30 - section.delay, fps, config: { damping: 200 } });
            return (
              <div key={i} style={{
                opacity: sSpring,
                transform: `translateY(${interpolate(sSpring, [0, 1], [16, 0])}px)`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  {section.icon}
                  <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>{section.title}</span>
                </div>
                {section.content && (
                  <p style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT_SEC, lineHeight: 1.6, margin: 0, paddingLeft: 28 }}>
                    {section.content}
                  </p>
                )}
                {section.items && (
                  <div style={{ paddingLeft: 28, display: "flex", flexDirection: "column", gap: 4 }}>
                    {section.items.map((item, j) => {
                      const itemSpring = spring({ frame: frame - 40 - section.delay - j * 6, fps, config: { damping: 200 } });
                      return (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, opacity: itemSpring }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                          <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT_SEC }}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 5: TEAM COLLABORATION — Hiring manager + team comments
// 280 frames
// ═══════════════════════════════════════════════════════
const TeamCollaborationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const comments = [
    { name: "Sarah K.", role: "Hiring Manager", initials: "SK", color: ACCENT, text: "Let's add 'experience with PCI compliance' — it's critical for our payment work", delay: 0 },
    { name: "James L.", role: "Tech Lead", initials: "JL", color: BLUE, text: "Agreed. Also bump Rust from nice-to-have to required — we're going all-in on Rust for the new services", delay: 60 },
    { name: "AI Assistant", role: "", initials: "✦", color: ACCENT_DEEP, text: "Updated! I've added PCI compliance to requirements and promoted Rust to a core requirement. Brief version 2 is ready for review.", delay: 120, isAI: true },
  ];

  const panelSpring = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });

  // Brief sidebar mini-view
  const sidebarItems = [
    { label: "Role Overview", done: true },
    { label: "Technical Reqs", done: true, updated: frame > 140 },
    { label: "Soft Requirements", done: true },
    { label: "Culture Fit", done: true },
    { label: "Red Flags", done: false },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #eee9e1 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 28, transform: `scale(${interpolate(panelSpring, [0, 1], [0.92, 1])})`, opacity: panelSpring }}>
        {/* Left: Brief sidebar */}
        <div style={{
          width: 220, background: CARD, borderRadius: 20, padding: "24px 20px",
          border: `1px solid ${BORDER}`, boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          <div style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Brief sections</div>
          {sidebarItems.map((item, i) => {
            const iSpring = spring({ frame: frame - 10 - i * 6, fps, config: { damping: 200 } });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                borderRadius: 10, opacity: iSpring,
                background: item.updated ? `${ACCENT}12` : "transparent",
              }}>
                {item.done ? <IconCheck size={14} color={item.updated ? ACCENT : GREEN} /> : <div style={{ width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${BORDER}` }} />}
                <span style={{ fontSize: 13, fontFamily: bodyFont, color: item.updated ? ACCENT : TEXT }}>{item.label}</span>
                {item.updated && <span style={{ fontSize: 10, fontFamily: bodyFont, color: ACCENT, marginLeft: "auto" }}>v2</span>}
              </div>
            );
          })}
          {/* Version indicator */}
          {frame > 160 && (
            <div style={{
              marginTop: 16, padding: "8px 12px", borderRadius: 10,
              background: GREEN_BG, border: `1px solid ${GREEN}20`,
              opacity: spring({ frame: frame - 160, fps, config: { damping: 200 } }),
            }}>
              <div style={{ fontSize: 11, fontFamily: bodyFont, color: GREEN, display: "flex", alignItems: "center", gap: 6 }}>
                <IconCheck size={12} color={GREEN} /> Version 2 ready
              </div>
            </div>
          )}
        </div>

        {/* Right: Team chat */}
        <div style={{
          width: 500, background: CHAT_BG, borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT_SEC, paddingBottom: 10 }}>AI chat</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: `2px solid ${TEXT}`, paddingBottom: 10 }}>
              <IconMessageCircle size={14} color={TEXT} />
              <span style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>Team chat</span>
            </div>
            {/* Collaborator avatars */}
            <div style={{ marginLeft: "auto", display: "flex", gap: -8 }}>
              {[{ initials: "SK", color: ACCENT }, { initials: "JL", color: BLUE }].map((a, i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: "50%", background: a.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontFamily: bodyFont, color: "#fff", fontWeight: 600,
                  border: `2px solid ${CHAT_BG}`, marginLeft: i > 0 ? -8 : 0,
                  opacity: spring({ frame: frame - 5 - i * 8, fps, config: { damping: 200 } }),
                }}>{a.initials}</div>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: BORDER, margin: "0 24px" }} />

          <div style={{ padding: "20px 24px", minHeight: 320, display: "flex", flexDirection: "column", gap: 20 }}>
            {comments.map((comment, i) => {
              const cSpring = spring({ frame: frame - 20 - comment.delay, fps, config: { damping: 200 } });
              const cText = useTypewriter(comment.text, 30 + comment.delay, 1.2);
              const cDone = cText.length >= comment.text.length;
              const isAI = (comment as any).isAI;

              return (
                <div key={i} style={{
                  opacity: cSpring,
                  transform: `translateY(${interpolate(cSpring, [0, 1], [12, 0])}px)`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: isAI ? `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})` : comment.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: isAI ? 14 : 10, fontFamily: bodyFont, color: "#fff", fontWeight: 600,
                    }}>
                      {comment.initials}
                    </div>
                    <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, fontWeight: 500 }}>{comment.name}</span>
                    {comment.role && <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT_SEC }}>· {comment.role}</span>}
                  </div>
                  <div style={{ paddingLeft: 38 }}>
                    <p style={{ fontSize: 14, fontFamily: bodyFont, color: isAI ? TEXT : TEXT_SEC, lineHeight: 1.6, margin: 0 }}>
                      {cText}{!cDone && <Cursor color={isAI ? ACCENT : TEXT_SEC} />}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div style={{ padding: "0 24px 20px 24px" }}>
            <div style={{ background: CARD, borderRadius: 16, padding: "14px 16px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: "#bbb" }}>Add feedback on this brief...</span>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: TEXT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconArrowUp size={14} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 6: FINAL BRIEF OVERVIEW — Polished summary
// 180 frames
// ═══════════════════════════════════════════════════════
const FinalBriefScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const requirements = [
    { label: "Go + Rust", weight: "Required", color: GREEN },
    { label: "Kafka & PostgreSQL", weight: "Required", color: GREEN },
    { label: "Distributed systems", weight: "Required", color: GREEN },
    { label: "PCI compliance", weight: "Required", color: GREEN },
    { label: "Payment/fintech", weight: "Preferred", color: ACCENT },
    { label: "Team leadership", weight: "Preferred", color: ACCENT },
  ];

  const headerSpring = spring({ frame, fps, config: { damping: 200 } });
  const cardSpring = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 80 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 740, opacity: headerSpring }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconFileText size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 20, fontFamily: headingFont, color: TEXT }}>Senior Backend Engineer</div>
              <div style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC }}>Final brief · Version 2 · 2 collaborators</div>
            </div>
          </div>
          <div style={{
            padding: "6px 14px", borderRadius: 10,
            background: GREEN_BG, border: `1px solid ${GREEN}20`,
            fontSize: 13, fontFamily: bodyFont, color: GREEN,
            display: "flex", alignItems: "center", gap: 6,
            opacity: spring({ frame: frame - 20, fps, config: { damping: 200 } }),
          }}>
            <IconCheck size={14} color={GREEN} /> Ready to publish
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: CARD, borderRadius: 24, padding: "32px 36px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [20, 0])}px)`,
        }}>
          {/* Requirements grid */}
          <div style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <IconTarget size={16} color={ACCENT} />
            Requirements & Signals
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {requirements.map((req, i) => {
              const rSpring = spring({ frame: frame - 30 - i * 8, fps, config: { damping: 200 } });
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 14px", borderRadius: 12,
                  background: req.color === GREEN ? GREEN_BG : `${ACCENT}08`,
                  border: `1px solid ${req.color}20`,
                  opacity: rSpring,
                  transform: `translateX(${interpolate(rSpring, [0, 1], [20, 0])}px)`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {req.color === GREEN ? <IconCheck size={14} color={GREEN} /> : <div style={{ width: 14, height: 14, borderRadius: "50%", background: `${ACCENT}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: ACCENT }}>●</div>}
                    <span style={{ fontSize: 14, fontFamily: bodyFont, color: TEXT }}>{req.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: bodyFont, color: req.color, fontWeight: 500 }}>{req.weight}</span>
                </div>
              );
            })}
          </div>

          {/* Collaborators */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, fontFamily: bodyFont, color: TEXT_SEC }}>Collaborators</span>
              {[{ initials: "SK", color: ACCENT, name: "Sarah K." }, { initials: "JL", color: BLUE, name: "James L." }].map((a, i) => {
                const aSpring = spring({ frame: frame - 60 - i * 10, fps, config: { damping: 14 } });
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, opacity: aSpring, transform: `scale(${interpolate(aSpring, [0, 1], [0.8, 1])})` }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%", background: a.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontFamily: bodyFont, color: "#fff", fontWeight: 600,
                    }}>{a.initials}</div>
                    <span style={{ fontSize: 12, fontFamily: bodyFont, color: TEXT }}>{a.name}</span>
                  </div>
                );
              })}
            </div>
            <div style={{
              display: "flex", gap: 8,
              opacity: spring({ frame: frame - 80, fps, config: { damping: 200 } }),
            }}>
              <div style={{ padding: "8px 16px", borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 13, fontFamily: bodyFont, color: TEXT, display: "flex", alignItems: "center", gap: 6 }}>
                <IconEdit size={13} color={TEXT_SEC} /> Edit
              </div>
              <div style={{ padding: "8px 16px", borderRadius: 10, background: TEXT, fontSize: 13, fontFamily: bodyFont, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
                <IconSend size={13} color="#fff" /> Publish
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 7: OUTRO
// 90 frames
// ═══════════════════════════════════════════════════════
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const words = ["Define", "roles,", "together"];
  const wordEls = words.map((word, i) => {
    const wSpring = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 18 } });
    return <span key={i} style={{ display: "inline-block", transform: `translateY(${interpolate(wSpring, [0, 1], [50, 0])}px)`, opacity: wSpring, marginRight: 16 }}>{word}</span>;
  });
  const lineW = interpolate(frame, [25, 60], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const urlSpring = spring({ frame: frame - 40, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ width: 72, height: 72, borderRadius: 18, background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`, transform: `scale(${logoScale})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 40px rgba(201, 149, 107, 0.3)` }}>
          <LaidbackLogo size={42} color="#fff" />
        </div>
        <h1 style={{ fontSize: 64, fontFamily: headingFont, color: TEXT, margin: 0, letterSpacing: -1 }}>{wordEls}</h1>
        <div style={{ width: lineW, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
        <p style={{ fontSize: 22, fontFamily: bodyFont, color: TEXT_SEC, margin: 0, letterSpacing: 1, opacity: urlSpring, transform: `translateY(${interpolate(urlSpring, [0, 1], [15, 0])}px)` }}>laidback.ai</p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN VIDEO
// Intro(90) + SearchInput(160) + Conversational(280) + BriefGen(260) + TeamCollab(280) + FinalBrief(180) + Outro(90)
// Transitions: 6 × 20f = 120f overlap
// Total: 1340 - 120 = 1220f ≈ 40.7s
// ═══════════════════════════════════════════════════════
export const JobBriefVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}><IntroScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={160}><SearchInputScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={280}><ConversationalBriefScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={260}><BriefGenerationScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={280}><TeamCollaborationScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={180}><FinalBriefScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={90}><OutroScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
