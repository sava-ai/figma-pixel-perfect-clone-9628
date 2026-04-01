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

// ── Load Custom Fonts ──
import { loadFont as loadGoogleFont } from "@remotion/google-fonts/Inter";

loadFont({
  family: "CooperLight",
  url: staticFile("fonts/CooperLtBTLight.ttf"),
  weight: "400",
});

const { fontFamily: interFamily } = loadGoogleFont("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

const headingFont = "CooperLight, serif";
const bodyFont = `${interFamily}, sans-serif`;

// ── Colors ──
const BG = "#f6f4f0";
const CARD = "#ffffff";
const TEXT = "#333333";
const TEXT_SEC = "#7a7570";
const ACCENT = "#c9956b";
const ACCENT_DEEP = "#a87a55";
const ACCENT_BG = "rgba(201, 149, 107, 0.10)";
const GREEN = "#2d9d5c";
const GREEN_BG = "rgba(45, 157, 92, 0.08)";
const BORDER = "#ece8e2";
const BLUE = "#4a7cff";
const BLUE_BG = "rgba(74, 124, 255, 0.08)";

// ── Laidback Logo Icon SVG ──
const LaidbackLogo: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 20 18" fill="none">
    <path d="M12.9707 16.0295L13.0739 16.9326C13.0807 16.992 13.1442 17.0268 13.1979 17.0007C13.2026 16.9984 13.207 16.9958 13.2111 16.9927L13.2321 16.9775C13.2907 16.9347 13.3358 16.8759 13.362 16.8081L13.3757 16.7724C13.3982 16.7141 13.4098 16.6521 13.4098 16.5896V16.4565V16.2287V15.8587V15.7793C13.4098 15.586 13.4294 15.3933 13.4683 15.204C13.5072 15.0147 13.5268 14.822 13.5268 14.6287V14.3501L13.8488 11.9021L14.6098 8.77093L14.7157 8.39986C14.7374 8.32403 14.8196 8.28325 14.893 8.31183C14.8993 8.31427 14.9057 8.31623 14.9123 8.3177L15.2829 8.40088L15.6634 8.45781L16.1902 8.57167C16.5015 8.62843 16.8054 8.71957 17.0966 8.84344L17.1268 8.85632L17.1646 8.86682C17.2746 8.89737 17.3761 8.95254 17.4616 9.02814C17.5861 9.13821 17.6707 9.28639 17.7022 9.44956L17.7109 9.49466C17.7311 9.59959 17.7322 9.7073 17.7142 9.81262L17.7122 9.82413C17.6927 9.8998 17.6649 9.97306 17.6292 10.0425L17.6244 10.0518L17.6106 10.0855C17.5815 10.156 17.5761 10.2341 17.5951 10.308C17.6117 10.3564 17.6624 10.3842 17.7121 10.3721L17.7145 10.3715C17.7322 10.3672 17.7483 10.3583 17.7614 10.3456L17.7629 10.3441C17.7681 10.339 17.7728 10.3335 17.7769 10.3275L17.801 10.2924C17.8198 10.2649 17.836 10.2358 17.8495 10.2053L17.9171 10.0518L17.9309 10.0249C17.9411 10.005 17.9545 9.98699 17.9705 9.97144L17.9953 9.94732C18.0016 9.94118 18.0092 9.93658 18.0176 9.93387C18.0547 9.92185 18.0927 9.94948 18.0927 9.98845V10.0306C18.0927 10.0445 18.0893 10.0583 18.0829 10.0708L18.0634 10.1088C18.0247 10.1841 18 10.2657 17.9903 10.3498L17.9863 10.3855C17.9792 10.4475 17.9796 10.5101 17.9876 10.572L18.0026 10.6889C18.0041 10.7006 18.0076 10.7119 18.013 10.7223C18.0264 10.7485 18.0506 10.7675 18.0791 10.7744L18.0944 10.7781C18.1307 10.7869 18.169 10.7804 18.2003 10.7601L18.2261 10.7434C18.2347 10.7378 18.2427 10.7314 18.2501 10.7242C18.2804 10.6947 18.2976 10.6542 18.2976 10.6119V10.5358V10.365V10.2511V10.2073C18.2976 10.1807 18.3083 10.1552 18.3274 10.1367L18.3378 10.1265C18.3495 10.1152 18.3652 10.1088 18.3816 10.1088C18.4023 10.1088 18.4216 10.119 18.4333 10.136L18.5121 10.251C18.5251 10.27 18.5361 10.2903 18.5449 10.3116L18.5515 10.3276C18.577 10.3898 18.6151 10.4461 18.6633 10.493L18.7073 10.5358L18.7767 10.6032C18.7888 10.615 18.8035 10.6239 18.8196 10.6291C18.8586 10.6417 18.9013 10.6318 18.9306 10.6032L18.9411 10.5931C18.9604 10.5743 18.9736 10.5501 18.9791 10.5237L18.9874 10.483C18.9957 10.4428 18.9947 10.4012 18.9845 10.3615L18.9828 10.3548C18.9748 10.3238 18.9619 10.2943 18.9446 10.2674L18.8244 10.0803L18.5781 9.64608C18.4304 9.38585 18.2581 9.14044 18.0634 8.91325L17.8375 8.69355C17.7736 8.63139 17.7044 8.57491 17.6307 8.52474C17.51 8.44259 17.3783 8.37803 17.2394 8.33301L17.0098 8.25856L16.3659 8.08777L15.9854 8.03084L15.2244 8.00237L15.0832 7.98275C15.0414 7.97695 15.0017 7.9609 14.9676 7.93603L14.9363 7.91319C14.9143 7.89713 14.8977 7.87468 14.8889 7.8489C14.8787 7.81933 14.8793 7.78713 14.8906 7.75797L14.961 7.5754C15.0583 7.29139 15.1285 6.9988 15.1707 6.70154L15.2244 6.32294L15.3298 5.07201C15.357 4.74905 15.355 4.4243 15.3237 4.10171L15.2738 3.58765C15.2412 3.2509 15.1449 2.9234 14.9902 2.6225L14.6098 2.08167L14.3756 1.82548L14.3626 1.81412C14.1766 1.65128 13.9754 1.50657 13.7619 1.38196C13.5859 1.27929 13.4022 1.19062 13.2124 1.11677L13.2049 1.11386L13.1923 1.10928C13.0451 1.05558 12.8922 1.01891 12.7366 1H12.3268H12.0927L12.0536 1.00542C11.9435 1.02073 11.8354 1.04884 11.7318 1.08917L11.6222 1.13179C11.6042 1.13879 11.5869 1.14762 11.5707 1.15814L11.5477 1.17308C11.5212 1.19023 11.4997 1.21401 11.4853 1.24204C11.4805 1.25145 11.4765 1.26127 11.4734 1.27138L11.3902 1.54083L11.2732 1.79702L11.0976 2.08167C10.9433 2.26923 10.7504 2.4213 10.5319 2.5275L10.4537 2.56557L10.278 2.65097L10.2667 2.65466C10.0991 2.70898 9.92636 2.7459 9.75122 2.76483H9.58026C9.53823 2.76483 9.4963 2.76079 9.45505 2.75276C9.39908 2.74187 9.34476 2.72373 9.29348 2.6988L9.19512 2.65097L9.09116 2.60041C9.04352 2.57725 8.99844 2.54917 8.95663 2.51665C8.90126 2.47356 8.85211 2.42303 8.81057 2.36648L8.79305 2.34263C8.74905 2.28271 8.71205 2.21795 8.68277 2.14962L8.60034 1.95721C8.58716 1.92644 8.57015 1.89747 8.54971 1.87097L8.54722 1.86774C8.51135 1.82123 8.46519 1.78365 8.41237 1.75796L8.40882 1.75624C8.38674 1.7455 8.36358 1.73716 8.33973 1.73136C8.28638 1.71839 8.2307 1.71839 8.17735 1.73136C8.15349 1.73716 8.13033 1.7455 8.10825 1.75624L7.94398 1.83612C7.84167 1.88587 7.74369 1.94408 7.65106 2.01014L7.6348 2.02174C7.44683 2.1558 7.2803 2.3176 7.14088 2.50162L6.92806 2.78252C6.66516 3.12952 6.45295 3.51214 6.2978 3.9189L5.85854 5.07049C5.74161 5.5443 5.65867 6.02585 5.61035 6.51148L5.50732 7.54694L5.48315 7.73498C5.4798 7.76106 5.4703 7.78596 5.45543 7.80765C5.43231 7.84139 5.39753 7.8654 5.35778 7.87506L5.22958 7.90623C5.20016 7.91338 5.17017 7.9179 5.13995 7.91974L4.71707 7.94544L4.19024 8.00237L3.37073 8.20163L3.01951 8.31549L2.99974 8.3215C2.70157 8.41212 2.41386 8.53415 2.14146 8.68553L2.07404 8.73597C1.8664 8.89131 1.68212 9.07563 1.52683 9.2833L1.16409 9.91831C1.11342 10.007 1.07386 10.1016 1.04628 10.1999L1.01577 10.3087C1.00531 10.346 1 10.3846 1 10.4234V10.4722C1 10.4954 1.00453 10.5183 1.01333 10.5397L1.04052 10.6058C1.05142 10.6323 1.07724 10.6496 1.1059 10.6496C1.1133 10.6496 1.12066 10.6485 1.1277 10.6462L1.1414 10.6417C1.18206 10.6285 1.21585 10.5998 1.23539 10.5618L1.24883 10.5357C1.25851 10.5168 1.26558 10.4968 1.26984 10.476L1.28269 10.4135C1.28934 10.3812 1.299 10.3496 1.31155 10.3191L1.34082 10.2479C1.34769 10.2312 1.35122 10.2134 1.35122 10.1953V10.1395C1.35122 10.1207 1.36193 10.1036 1.37881 10.0954C1.39738 10.0863 1.41962 10.0899 1.43443 10.1043L1.45236 10.1217C1.4628 10.1319 1.47045 10.1446 1.47456 10.1586L1.5113 10.2836C1.52163 10.3188 1.53527 10.3529 1.55203 10.3855L1.6439 10.5642L1.67138 10.631C1.69187 10.6808 1.72236 10.7259 1.76098 10.7635L1.76557 10.7679C1.78038 10.7823 1.80262 10.7859 1.82119 10.7769C1.83807 10.7687 1.84878 10.7516 1.84878 10.7328V10.6496V10.5073V10.365L1.82214 10.1577C1.82039 10.1441 1.81727 10.1307 1.81282 10.1177L1.80215 10.0866C1.79443 10.0641 1.79443 10.0396 1.80215 10.0171L1.80843 9.99878C1.81541 9.97843 1.83155 9.96255 1.85202 9.95592C1.8839 9.94558 1.91857 9.95988 1.9339 9.98969L1.95876 10.038C1.96347 10.0472 1.96924 10.0558 1.97595 10.0636L2.1122 10.2226L2.18405 10.3158C2.19411 10.3289 2.20965 10.3365 2.22612 10.3365C2.24602 10.3365 2.26426 10.3254 2.27336 10.3077L2.27772 10.2992C2.28428 10.2864 2.28668 10.2719 2.2846 10.2578L2.25854 10.0803L2.19217 9.69304C2.17799 9.61028 2.1784 9.52568 2.19339 9.44306C2.23434 9.2174 2.38042 9.02477 2.58668 8.92447L2.72683 8.85632C3.25284 8.66685 3.79298 8.51917 4.34221 8.41466L4.86341 8.31549L5.11502 8.24875C5.1604 8.23672 5.2086 8.24139 5.25082 8.26192C5.31821 8.29469 5.36098 8.36305 5.36098 8.43798V9.39716L5.27317 10.5927L5.1561 13.2684L5.14425 13.493C5.11317 14.0825 5.12691 14.6735 5.18537 15.2609V16.4869L5.16021 16.8861C5.15851 16.9131 5.16868 16.9394 5.18804 16.9583C5.23429 17.0033 5.31121 16.9883 5.33722 16.9293L5.45087 16.6714C5.46517 16.6389 5.47336 16.6041 5.47503 16.5687L5.50732 15.8872V15.4882C5.50732 15.4317 5.5127 15.3753 5.5234 15.3198C5.56923 15.0821 5.7099 14.8734 5.913 14.7417L5.94634 14.7201L6.12739 14.5734C6.24049 14.4817 6.34313 14.3778 6.43344 14.2637L6.45277 14.2392C6.54405 14.1238 6.62027 13.9973 6.67961 13.8626L6.73609 13.7344C6.75586 13.6896 6.77004 13.6425 6.77832 13.5941L6.79018 13.525C6.81191 13.3981 6.88752 13.2869 6.99749 13.2201C7.03793 13.1955 7.08203 13.1776 7.12814 13.1669L7.67317 13.0407L8.49268 12.9553H9.16585L10.2165 13.0047C10.6984 13.0274 11.1426 13.2719 11.4195 13.6669L11.7193 14.0495C11.8312 14.1924 11.9598 14.3215 12.1024 14.4339L12.2555 14.5546C12.7072 14.9108 12.9707 15.4543 12.9707 16.0295Z" fill={color} stroke={color} strokeWidth="0.5"/>
    <path d="M9.5567 4.21875L9.21841 4.41102C9.16944 4.43886 9.12596 4.4754 9.09011 4.51886L9.05847 4.55723C9.04706 4.57107 9.03801 4.58669 9.03168 4.60347C9.01196 4.65579 9.02041 4.71456 9.05407 4.75921L9.05642 4.76232C9.07352 4.785 9.09602 4.80303 9.12187 4.81479L9.28846 4.89054C9.35705 4.92172 9.42931 4.94407 9.50352 4.95705L9.65979 4.98438L9.94841 4.99388C10.0717 4.99795 10.1951 4.98766 10.316 4.96322L10.3649 4.95334C10.4171 4.9428 10.4683 4.92802 10.5181 4.90917L10.6806 4.84757C10.7676 4.81461 10.842 4.75509 10.8932 4.67745L10.9238 4.63116C10.9724 4.55751 10.9879 4.46691 10.9668 4.38127C10.9483 4.30673 10.9034 4.24147 10.8403 4.19766L10.7637 4.14444C10.7153 4.11085 10.662 4.08505 10.6057 4.06798L10.5569 4.05317C10.4411 4.01809 10.3195 4.00704 10.1993 4.0207L10.1369 4.0278C10.0256 4.04045 9.91659 4.06875 9.81317 4.11186L9.5567 4.21875Z" fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="0.5"/>
    <path d="M12.691 3.28286L12.6723 3.30709C12.5991 3.40204 12.5525 3.51475 12.5372 3.63367L12.5312 3.67979V3.83335C12.5312 3.88245 12.5394 3.93122 12.5553 3.97768C12.578 4.04383 12.6159 4.10371 12.666 4.15247L12.6758 4.16198C12.7346 4.21919 12.8066 4.26111 12.8853 4.28409L12.9378 4.2994C13.0168 4.32246 13.1002 4.32629 13.1811 4.31057L13.1873 4.30936C13.2934 4.28872 13.3899 4.2341 13.4621 4.15376C13.5233 4.08579 13.5645 4.0023 13.5813 3.91243L13.5893 3.86978C13.6057 3.78201 13.6039 3.69181 13.584 3.60476L13.58 3.58726C13.5639 3.5165 13.5373 3.44851 13.5013 3.38549L13.4611 3.31505C13.4271 3.25545 13.3792 3.20487 13.3217 3.16753C13.2639 3.13006 13.1979 3.10702 13.1293 3.10035L13.1158 3.09903C13.0029 3.08805 12.8899 3.11753 12.7968 3.1822C12.7566 3.21014 12.7209 3.24409 12.691 3.28286Z" fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="0.5"/>
    <path d="M9.1632 11.9798L7.55256 11.9576C7.25515 11.9535 7.02479 11.696 7.05369 11.4L7.13423 10.75L7.21477 10.05L7.42953 9.125L7.5113 8.88703C7.59976 8.62961 7.7129 8.38135 7.84915 8.14572L7.89989 8.05796C7.97992 7.91955 8.071 7.78782 8.17225 7.66408L8.32943 7.47196C8.40915 7.37451 8.50275 7.2893 8.60722 7.21903C8.8195 7.07626 9.06953 7 9.32536 7H9.42968C9.52777 7 9.62561 7.0098 9.72175 7.02927C10.029 7.09146 10.3083 7.2501 10.5191 7.48209L10.5425 7.5079C10.7023 7.6837 10.8203 7.89328 10.8877 8.12102L10.9167 8.21865C10.9719 8.40524 11 8.59883 11 8.79343V9.65V10.1682C11 10.3056 10.9844 10.4426 10.9534 10.5765C10.7613 11.4072 10.0158 11.9916 9.1632 11.9798Z" fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="0.5"/>
    <path d="M7.19145 5.11569L7.15761 5.13762C7.11145 5.16755 7.05547 5.17841 7.00147 5.16791C6.96091 5.16002 6.92353 5.14047 6.89391 5.11166L6.86559 5.08412C6.85622 5.07501 6.84778 5.06499 6.8404 5.05422C6.81009 5.01 6.79907 4.95536 6.80987 4.90286L6.81511 4.87737C6.81984 4.85436 6.82768 4.83211 6.83842 4.81122L6.91004 4.67191L6.96958 4.5754C6.98792 4.54567 7.01546 4.52273 7.04802 4.51007C7.1066 4.48728 7.1731 4.50077 7.21817 4.5446L7.23199 4.55805L7.2735 4.60851C7.32236 4.6679 7.34907 4.74242 7.34907 4.81932C7.34907 4.8721 7.33648 4.92411 7.31235 4.97105L7.29931 4.99642C7.27438 5.04491 7.23719 5.08603 7.19145 5.11569Z" fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="0.5"/>
  </svg>
);

// ── SVG Icon Components ──
const IconMail: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconSend: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
    <path d="m21.854 2.147-10.94 10.939" />
  </svg>
);

const IconSparkles: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" />
    <path d="M4 17v2" /><path d="M5 18H3" />
  </svg>
);

const IconUsers: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconCalendar: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" /><path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const IconMessageCircle: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
  </svg>
);

const IconCheck: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const IconArrowRight: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const IconPaperclip: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const IconRefresh: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const IconPhone: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconVideo: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" />
    <rect x="2" y="6" width="14" height="12" rx="2" />
  </svg>
);

const IconMoreHorizontal: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = TEXT_SEC }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

const IconTrendingUp: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = GREEN }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const IconTarget: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const IconZap: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#e8a230" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
);

// ── Profile Photo Component ──
const ProfilePhoto: React.FC<{ src: string; size: number }> = ({ src, size }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    overflow: "hidden", flexShrink: 0,
    border: `2px solid ${BORDER}`,
  }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

// ── Animated Cursor Component ──
const AnimatedCursor: React.FC<{
  x: number;
  y: number;
  visible: boolean;
  clicking?: boolean;
  scale?: number;
}> = ({ x, y, visible, clicking = false, scale = 1 }) => {
  const frame = useCurrentFrame();

  if (!visible) return null;

  const clickScale = clicking ? 0.85 : 1;
  const rippleOpacity = clicking
    ? interpolate(frame % 20, [0, 20], [0.6, 0], { extrapolateRight: "clamp" })
    : 0;
  const rippleScale = clicking
    ? interpolate(frame % 20, [0, 20], [1, 2.5], { extrapolateRight: "clamp" })
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 9999,
        transform: `scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      {clicking && (
        <div
          style={{
            position: "absolute",
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: `2px solid ${ACCENT}`,
            opacity: rippleOpacity,
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            left: 4,
            top: 4,
          }}
        />
      )}
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        style={{ transform: `scale(${clickScale})`, filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.3))" }}
      >
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36Z"
          fill="#fff"
          stroke="#1a1817"
          strokeWidth={1.5}
        />
      </svg>
    </div>
  );
};

// ── Helpers ──
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

// ═══════════════════════════════════════════════════════
// SCENE 1: INTRO — Laidback Logo + Staggered word reveal
// ═══════════════════════════════════════════════════════
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const logoRotate = interpolate(
    spring({ frame, fps, config: { damping: 15, stiffness: 60 } }),
    [0, 1],
    [-15, 0]
  );

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

  const subDelay = 30;
  const subProgress = spring({ frame: frame - subDelay, fps, config: { damping: 200 } });
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  const lineW = interpolate(frame, [20, 55], [0, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const orb1Y = Math.sin(frame * 0.05) * 8;
  const orb2Y = Math.cos(frame * 0.04) * 10;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        position: "absolute", top: 200 + orb1Y, right: 300,
        width: 200, height: 200, borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}15 0%, transparent 70%)`,
      }} />
      <div style={{
        position: "absolute", bottom: 180 + orb2Y, left: 250,
        width: 260, height: 260, borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}0a 0%, transparent 70%)`,
      }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{
          width: 88, height: 88, borderRadius: 22,
          background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`,
          transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 12px 40px rgba(201, 149, 107, 0.35), 0 0 0 1px rgba(201, 149, 107, 0.1)`,
        }}>
          <LaidbackLogo size={50} color="#fff" />
        </div>

        <h1 style={{
          fontSize: 76, fontFamily: headingFont, fontWeight: 400, color: TEXT,
          margin: 0, letterSpacing: -2, lineHeight: 1.1,
        }}>
          {wordElements}
        </h1>

        <div style={{
          width: lineW, height: 3, borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
        }} />

        <p style={{
          fontSize: 24, fontFamily: bodyFont, color: TEXT_SEC,
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
// SCENE 2: PIPELINE — Select candidates with cursor
// ═══════════════════════════════════════════════════════
const CANDIDATES = [
  { name: "Sarah Chapman", role: "Senior Product Designer", company: "Fintech Corp", loc: "Stockholm", match: "10/12", matchPct: 83, photo: "images/sarah.jpg", skills: ["Product Design", "UX Strategy", "Figma"] },
  { name: "Sam Morris", role: "UX Designer", company: "CreativeLab", loc: "London", match: "9/12", matchPct: 75, photo: "images/sam.jpg", skills: ["UI Design", "Research", "Prototyping"] },
  { name: "Esther Howard", role: "Product Designer", company: "TechStart", loc: "Berlin", match: "8/12", matchPct: 67, photo: "images/esther.jpg", skills: ["Design Systems", "Interaction", "Framer"] },
];

const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoomProgress = interpolate(frame, [0, 200], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const cameraScale = interpolate(zoomProgress, [0, 0.5, 1], [0.82, 0.92, 1.05]);
  const cameraY = interpolate(zoomProgress, [0, 0.5, 1], [30, 10, -20]);

  const cursorTargets = [
    { x: 1390, y: 495, clickFrame: 65 },
    { x: 1390, y: 595, clickFrame: 85 },
    { x: 1390, y: 695, clickFrame: 105 },
    { x: 870, y: 790, clickFrame: 155 },
  ];

  let cursorX = 960;
  let cursorY = 300;
  let cursorVisible = frame > 40;
  let cursorClicking = false;

  for (let i = cursorTargets.length - 1; i >= 0; i--) {
    const target = cursorTargets[i];
    const prevTarget = i > 0 ? cursorTargets[i - 1] : { x: 960, y: 300, clickFrame: 40 };
    const moveStart = prevTarget.clickFrame + 8;
    const moveEnd = target.clickFrame - 5;

    if (frame >= moveStart) {
      const moveProgress = interpolate(frame, [moveStart, moveEnd], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic),
      });
      cursorX = interpolate(moveProgress, [0, 1], [prevTarget.x, target.x]);
      cursorY = interpolate(moveProgress, [0, 1], [prevTarget.y, target.y]);
    }

    if (frame >= target.clickFrame && frame < target.clickFrame + 8) {
      cursorClicking = true;
    }
  }

  if (frame <= 65) {
    const enterProgress = interpolate(frame, [40, 60], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    cursorX = interpolate(enterProgress, [0, 1], [1600, cursorTargets[0].x]);
    cursorY = interpolate(enterProgress, [0, 1], [200, cursorTargets[0].y]);
  }

  const headerSpring = spring({ frame, fps, config: { damping: 200 } });
  const statsDelay = 8;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)` }}>
      <div style={{
        transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        transformOrigin: "center 40%",
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 24,
      }}>
        {/* Top nav bar */}
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
              <LaidbackLogo size={18} color="#fff" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 400, color: TEXT, fontFamily: bodyFont }}>
              BD Representative / Sales Manager
            </span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Job", "Review (10)", "Pipeline"].map((tab, i) => (
              <span key={i} style={{
                fontSize: 14, fontFamily: bodyFont, fontWeight: 400,
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
            { label: "To contact", value: 6, icon: <IconUsers size={20} color={ACCENT} /> },
            { label: "To Schedule", value: 4, icon: <IconCalendar size={20} color={BLUE} /> },
            { label: "Interviewing", value: 2, icon: <IconMessageCircle size={20} color={GREEN} /> },
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
                  {stat.icon}
                  <span style={{ fontSize: 13, color: TEXT_SEC, fontFamily: bodyFont }}>{stat.label}</span>
                </div>
                <span style={{ fontSize: 28, fontWeight: 400, color: TEXT, fontFamily: headingFont }}>{countUp}</span>
              </div>
            );
          })}
        </div>

        {/* Section header */}
        <div style={{
          width: 900, display: "flex", justifyContent: "space-between", alignItems: "center",
          opacity: spring({ frame: frame - 20, fps, config: { damping: 200 } }),
        }}>
          <span style={{ fontSize: 20, fontFamily: headingFont, color: TEXT }}>Best Matches</span>
          <span style={{ fontSize: 13, color: ACCENT, fontFamily: bodyFont, display: "flex", alignItems: "center", gap: 4 }}>
            View all <IconArrowRight size={14} color={ACCENT} />
          </span>
        </div>

        {/* Candidate cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 900 }}>
          {CANDIDATES.map((c, i) => {
            const cardDelay = 25 + i * 14;
            const cardSpring = spring({ frame: frame - cardDelay, fps, config: { damping: 20, stiffness: 120 } });
            const cardY = interpolate(cardSpring, [0, 1], [35, 0]);

            const checkClickFrame = cursorTargets[i].clickFrame;
            const isSelected = frame > checkClickFrame;
            const checkSpring = spring({ frame: frame - checkClickFrame, fps, config: { damping: 10, stiffness: 150 } });

            const barProgress = interpolate(
              spring({ frame: frame - cardDelay - 10, fps, config: { damping: 200 } }),
              [0, 1],
              [0, c.matchPct]
            );

            const floatY = Math.sin((frame + i * 30) * 0.03) * 1.5;

            const highlightOpacity = isSelected
              ? interpolate(frame - checkClickFrame, [0, 10, 30], [0, 0.15, 0], { extrapolateRight: "clamp" })
              : 0;

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
                  ? `0 6px 24px rgba(201, 149, 107, 0.15)`
                  : "0 2px 8px rgba(0,0,0,0.03)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: ACCENT,
                  opacity: highlightOpacity,
                  borderRadius: 16,
                }} />

                {/* Profile Photo */}
                <ProfilePhoto src={c.photo} size={48} />

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, fontFamily: bodyFont, color: TEXT }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: GREEN, fontFamily: bodyFont }}>{c.match} Match</span>
                  </div>
                  <div style={{ fontSize: 13, color: TEXT_SEC, fontFamily: bodyFont, marginTop: 2 }}>
                    {c.role} · {c.company} · {c.loc}
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    {c.skills.map((skill, si) => (
                      <span key={si} style={{
                        fontSize: 11, color: TEXT_SEC, fontFamily: bodyFont,
                        background: "#f5f3ef", padding: "3px 10px", borderRadius: 10,
                      }}>{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Match bar */}
                <div style={{ width: 80, flexShrink: 0 }}>
                  <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#f0ede8" }}>
                    <div style={{
                      width: `${barProgress}%`, height: "100%", borderRadius: 2,
                      background: `linear-gradient(90deg, ${ACCENT}, ${GREEN})`,
                    }} />
                  </div>
                  <div style={{
                    fontSize: 11, color: TEXT_SEC, fontFamily: bodyFont, textAlign: "right", marginTop: 3,
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
                  {isSelected && <IconCheck size={14} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact button */}
        {(() => {
          const btnDelay = 120;
          const btnSpring = spring({ frame: frame - btnDelay, fps, config: { damping: 14, stiffness: 100 } });
          const btnScale = interpolate(btnSpring, [0, 1], [0.85, 1]);

          const btnClickFrame = cursorTargets[3].clickFrame;
          const isClicked = frame > btnClickFrame;
          const clickPulse = isClicked
            ? interpolate(frame - btnClickFrame, [0, 5, 10], [1, 0.95, 1.02], { extrapolateRight: "clamp" })
            : 1;

          return (
            <div style={{
              opacity: btnSpring,
              transform: `scale(${btnScale * clickPulse})`,
              marginTop: 8,
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                color: "#fff", fontSize: 16, fontFamily: bodyFont,
                padding: "14px 32px", borderRadius: 14,
                boxShadow: isClicked
                  ? `0 4px 12px rgba(201, 149, 107, 0.2)`
                  : `0 8px 24px rgba(201, 149, 107, 0.3), 0 2px 6px rgba(201, 149, 107, 0.2)`,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <IconMail size={18} color="#fff" />
                Contact 3 selected candidates
              </div>
            </div>
          );
        })()}
      </div>

      <AnimatedCursor
        x={cursorX}
        y={cursorY}
        visible={cursorVisible}
        clicking={cursorClicking}
        scale={1 / cameraScale}
      />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 3: AI COMPOSE — Template then "Make Relevant" click
// ═══════════════════════════════════════════════════════
const GENERIC_MESSAGE = `Hi there,

I came across your profile and thought you might be a good fit for a role we're looking to fill. We're a growing company looking for talented individuals.

If you're interested, I'd love to chat. Let me know if you have time for a quick call.

Best regards,
Tom`;

const AI_MESSAGE = `Hi Sarah,

I came across your profile and was genuinely impressed by your work as a Senior Product Designer — especially your experience leading design in the fintech space at Fintech Corp.

We're building PriceMind AI, a fast-growing startup in Stockholm working on AI-powered pricing optimization. We're looking for a Lead Product Designer who can own the product experience end-to-end.

Given your background in design systems, UX strategy, and your 10/12 match score, I think you'd be a great fit.

Would you be open to a 15-minute chat this week?

Best regards,
Tom`;

const ComposeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const panelY = interpolate(panelSpring, [0, 1], [80, 0]);
  const panelScale = interpolate(panelSpring, [0, 1], [0.92, 1]);

  const genericTyped = useTypewriter(GENERIC_MESSAGE, 10, 1.8);

  const makeRelevantBtnY = 210;
  const makeRelevantBtnX = 780;

  const cursorVisible = frame > 75 && frame < 180;
  const cursorMoveProgress = interpolate(frame, [75, 100], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorX = interpolate(cursorMoveProgress, [0, 1], [500, makeRelevantBtnX]);
  const cursorY = interpolate(cursorMoveProgress, [0, 1], [600, makeRelevantBtnY]);
  const cursorClicking = frame >= 105 && frame < 113;

  const zoomProgress = interpolate(frame, [90, 115], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const cameraScale = interpolate(zoomProgress, [0, 1], [1, 1.3]);
  const cameraX = interpolate(zoomProgress, [0, 1], [0, -200]);
  const cameraCY = interpolate(zoomProgress, [0, 1], [0, -80]);

  const zoomOutProgress = interpolate(frame, [120, 145], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const cameraScaleOut = interpolate(zoomOutProgress, [0, 1], [1.3, 1]);
  const cameraXOut = interpolate(zoomOutProgress, [0, 1], [-200, 0]);
  const cameraCYOut = interpolate(zoomOutProgress, [0, 1], [-80, 0]);

  const finalCameraScale = frame < 120 ? cameraScale : cameraScaleOut;
  const finalCameraX = frame < 120 ? cameraX : cameraXOut;
  const finalCameraCY = frame < 120 ? cameraCY : cameraCYOut;

  const aiProcessing = frame >= 113 && frame < 150;
  const aiProcessingProgress = interpolate(frame, [113, 150], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const aiMessageStart = 155;
  const showAiMessage = frame >= aiMessageStart;

  const aiTyped = useTypewriter(AI_MESSAGE, aiMessageStart, 2.0, "Hi Sarah,", 12);

  const btnClicked = frame >= 105;
  const btnClickScale = btnClicked
    ? interpolate(frame - 105, [0, 4, 12], [1, 0.92, 1], { extrapolateRight: "clamp" })
    : 1;

  const aiBadgeVisible = frame > 113;
  const aiBadgeSpring = spring({ frame: frame - 113, fps, config: { damping: 14 } });
  const aiBadgeGlow = 0.6 + Math.sin(frame * 0.15) * 0.4;

  const aiTypingDone = aiTyped.length >= AI_MESSAGE.length;
  const sendSpring = spring({
    frame: aiTypingDone ? frame : -999,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const oldTextOpacity = interpolate(frame, [110, 145], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `scale(${finalCameraScale}) translate(${finalCameraX}px, ${finalCameraCY}px)`,
        transformOrigin: "center center",
      }}>
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
              <ProfilePhoto src="images/sarah.jpg" size={40} />
              <div>
                <div style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>Sarah Chapman</div>
                <div style={{ fontSize: 12, color: TEXT_SEC, fontFamily: bodyFont }}>Senior Product Designer · Stockholm · 10/12 Match</div>
              </div>
            </div>

            {/* Make Relevant Button */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
            }}>
              {aiBadgeVisible && (
                <div style={{
                  background: ACCENT_BG, padding: "6px 14px", borderRadius: 20,
                  display: "flex", alignItems: "center", gap: 6,
                  opacity: aiBadgeSpring,
                  transform: `scale(${aiBadgeSpring})`,
                  boxShadow: `0 0 ${12 * aiBadgeGlow}px rgba(201, 149, 107, ${0.15 * aiBadgeGlow})`,
                }}>
                  <IconSparkles size={14} color={ACCENT_DEEP} />
                  <span style={{ fontSize: 12, color: ACCENT_DEEP, fontFamily: bodyFont }}>AI Enhanced</span>
                </div>
              )}
              <div style={{
                background: btnClicked
                  ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`
                  : ACCENT_BG,
                padding: "10px 20px", borderRadius: 12,
                display: "flex", alignItems: "center", gap: 8,
                transform: `scale(${btnClickScale})`,
                boxShadow: btnClicked ? `0 4px 16px rgba(201, 149, 107, 0.3)` : "none",
              }}>
                <IconSparkles size={16} color={btnClicked ? "#fff" : ACCENT_DEEP} />
                <span style={{
                  fontSize: 14, fontFamily: bodyFont,
                  color: btnClicked ? "#fff" : ACCENT_DEEP,
                }}>Make Relevant</span>
              </div>
            </div>
          </div>

          {/* Subject line */}
          <div style={{
            padding: "12px 28px", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 13, color: TEXT_SEC, fontFamily: bodyFont }}>Subject:</span>
            <span style={{ fontSize: 14, color: TEXT, fontFamily: bodyFont }}>
              {showAiMessage ? "Opportunity at PriceMind AI — Lead Product Designer" : "Exciting Job Opportunity"}
            </span>
          </div>

          {/* Body */}
          <div style={{
            padding: "20px 28px", minHeight: 320,
            fontSize: 14.5, fontFamily: bodyFont, color: TEXT,
            lineHeight: 1.75, whiteSpace: "pre-wrap",
            position: "relative",
          }}>
            {!showAiMessage && (
              <div style={{ opacity: frame < 110 ? 1 : oldTextOpacity }}>
                {genericTyped}
                {genericTyped.length < GENERIC_MESSAGE.length && <Cursor />}
              </div>
            )}

            {aiProcessing && !showAiMessage && (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `rgba(255,255,255,${interpolate(aiProcessingProgress, [0, 0.3], [0, 0.9], { extrapolateRight: "clamp" })})`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <IconSparkles size={16} color="#fff" />
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map((d) => (
                      <div key={d} style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: ACCENT,
                        opacity: interpolate((frame + d * 8) % 24, [0, 12, 24], [0.3, 1, 0.3]),
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 14, color: ACCENT_DEEP, fontFamily: bodyFont }}>
                    AI is personalizing your message...
                  </span>
                </div>
              </div>
            )}

            {showAiMessage && (
              <div style={{
                opacity: spring({ frame: frame - aiMessageStart, fps, config: { damping: 200 } }),
              }}>
                {aiTyped}
                {aiTyped.length < AI_MESSAGE.length && <Cursor />}
              </div>
            )}
          </div>

          {/* Bottom toolbar */}
          <div style={{
            padding: "12px 28px", borderTop: `1px solid ${BORDER}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: <IconPaperclip size={14} color={TEXT_SEC} />, label: "Attach" },
                { icon: <IconCalendar size={14} color={TEXT_SEC} />, label: "Schedule" },
                { icon: <IconRefresh size={14} color={TEXT_SEC} />, label: "Regenerate" },
              ].map((btn, i) => (
                <span key={i} style={{
                  fontSize: 13, color: TEXT_SEC, fontFamily: bodyFont,
                  background: "#f5f3ef", padding: "7px 14px", borderRadius: 10,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  {btn.icon}
                  {btn.label}
                </span>
              ))}
            </div>

            {aiTypingDone && (
              <div style={{
                transform: `scale(${sendSpring})`,
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                color: "#fff", fontSize: 14, fontFamily: bodyFont,
                padding: "10px 24px", borderRadius: 12,
                boxShadow: `0 4px 16px rgba(201, 149, 107, 0.3)`,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <IconSend size={15} />
                Send message
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatedCursor
        x={cursorX}
        y={cursorY}
        visible={cursorVisible}
        clicking={cursorClicking}
      />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 4: OUTREACH DASHBOARD — Stats + Status
// ═══════════════════════════════════════════════════════
const OutreachDashScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({ frame, fps, config: { damping: 200 } });

  const STATS = [
    { label: "Messages Sent", value: 3, color: ACCENT, icon: <IconSend size={22} color={ACCENT} /> },
    { label: "Opened", value: 2, color: "#e8a230", icon: <IconZap size={22} color="#e8a230" /> },
    { label: "Replied", value: 1, color: GREEN, icon: <IconMessageCircle size={22} color={GREEN} /> },
    { label: "Response Rate", value: 33, suffix: "%", color: GREEN, icon: <IconTrendingUp size={22} color={GREEN} /> },
  ];

  const STATUSES = [
    { name: "Sarah Chapman", status: "Replied", time: "2 min ago", statusColor: GREEN, bgColor: GREEN_BG, icon: <IconMessageCircle size={20} color={GREEN} />, photo: "images/sarah.jpg" },
    { name: "Sam Morris", status: "Opened", time: "5 min ago", statusColor: "#e8a230", bgColor: "rgba(232, 162, 48, 0.08)", icon: <IconZap size={20} color="#e8a230" />, photo: "images/sam.jpg" },
    { name: "Esther Howard", status: "Sent", time: "8 min ago", statusColor: ACCENT, bgColor: ACCENT_BG, icon: <IconSend size={20} color={ACCENT} />, photo: "images/esther.jpg" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        display: "flex", flexDirection: "column", gap: 20, alignItems: "center",
        width: 800, opacity: containerSpring,
      }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h2 style={{ fontSize: 32, fontFamily: headingFont, color: TEXT, margin: 0 }}>
            Outreach Performance
          </h2>
        </div>

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
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>{s.icon}</div>
                <div style={{
                  fontSize: 34, fontFamily: headingFont, color: s.color, marginTop: 4,
                }}>
                  {countUp}{s.suffix || ""}
                </div>
                <div style={{ fontSize: 12, color: TEXT_SEC, fontFamily: bodyFont, marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

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
                  <ProfilePhoto src={r.photo} size={36} />
                  <div>
                    <div style={{ fontSize: 15, fontFamily: bodyFont, color: TEXT }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: TEXT_SEC, fontFamily: bodyFont }}>{r.time}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: 13, color: r.statusColor, fontFamily: bodyFont,
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
// ═══════════════════════════════════════════════════════
const REPLY_TEXT = `Hi! Thanks for reaching out — I've actually been following PriceMind AI and the product challenges sound really exciting.

I'd love to learn more about the role. I'm free Thursday or Friday afternoon — would either work for a quick call?`;

const ReplyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const notifSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 120 } });
  const notifY = interpolate(notifSpring, [0, 1], [-60, 0]);

  const panelSpring = spring({ frame: frame - 15, fps, config: { damping: 20, stiffness: 80 } });
  const panelY = interpolate(panelSpring, [0, 1], [50, 0]);
  const panelScale = interpolate(panelSpring, [0, 1], [0.95, 1]);

  const sentSpring = spring({ frame: frame - 25, fps, config: { damping: 200 } });

  const replyTyped = useTypewriter(REPLY_TEXT, 45, 1.0, "really exciting.", 18);

  const replyDone = replyTyped.length >= REPLY_TEXT.length;
  const schedBtnSpring = spring({
    frame: replyDone ? frame : -999,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      {/* Notification toast */}
      <div style={{
        position: "absolute", top: 60,
        transform: `translateY(${notifY}px)`,
        opacity: notifSpring,
        background: GREEN, color: "#fff", borderRadius: 16,
        padding: "14px 28px",
        display: "flex", alignItems: "center", gap: 12,
        boxShadow: "0 10px 30px rgba(45, 157, 92, 0.25)",
        fontSize: 15, fontFamily: bodyFont,
      }}>
        <IconMessageCircle size={18} color="#fff" />
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
          <ProfilePhoto src="images/sarah.jpg" size={42} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontFamily: bodyFont, color: TEXT }}>Sarah Chapman</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN }} />
              <span style={{ fontSize: 12, color: GREEN, fontFamily: bodyFont }}>Online</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              <IconPhone size={16} color={TEXT_SEC} />,
              <IconVideo size={16} color={TEXT_SEC} />,
              <IconMoreHorizontal size={16} color={TEXT_SEC} />,
            ].map((icon, i) => (
              <span key={i} style={{
                width: 36, height: 36, borderRadius: 10,
                background: "#f5f3ef", display: "flex", alignItems: "center", justifyContent: "center",
              }}>{icon}</span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ padding: "24px 28px", minHeight: 300 }}>
          {/* Sent message */}
          <div style={{
            display: "flex", justifyContent: "flex-end", marginBottom: 20,
            opacity: sentSpring,
          }}>
            <div style={{
              background: ACCENT_BG,
              borderRadius: "18px 18px 4px 18px",
              padding: "14px 20px",
              maxWidth: 480,
              fontSize: 14, color: TEXT, fontFamily: bodyFont, lineHeight: 1.6,
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
                fontSize: 14, color: TEXT, fontFamily: bodyFont, lineHeight: 1.6,
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

        {/* Schedule button */}
        {replyDone && (
          <div style={{
            padding: "12px 28px", borderTop: `1px solid ${BORDER}`,
            display: "flex", justifyContent: "center",
          }}>
            <div style={{
              transform: `scale(${schedBtnSpring})`,
              background: `linear-gradient(135deg, ${GREEN}, #238c4d)`,
              color: "#fff", fontSize: 14, fontFamily: bodyFont,
              padding: "12px 28px", borderRadius: 12,
              boxShadow: `0 6px 20px rgba(45, 157, 92, 0.25)`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <IconCalendar size={16} color="#fff" />
              Schedule Interview
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// SCENE 6: OUTRO — Laidback branding
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
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${BG} 0%, #f0ece5 100%)`, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 18,
          background: `linear-gradient(145deg, ${ACCENT}, ${ACCENT_DEEP})`,
          transform: `scale(${logoScale})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 12px 40px rgba(201, 149, 107, 0.3)`,
        }}>
          <LaidbackLogo size={42} color="#fff" />
        </div>

        <h1 style={{
          fontSize: 64, fontFamily: headingFont, color: TEXT,
          margin: 0, letterSpacing: -1,
        }}>
          {wordEls}
        </h1>

        <div style={{
          width: lineW, height: 3, borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
        }} />

        <p style={{
          fontSize: 22, fontFamily: bodyFont, color: TEXT_SEC,
          margin: 0, letterSpacing: 1,
          opacity: urlSpring,
          transform: `translateY(${interpolate(urlSpring, [0, 1], [15, 0])}px)`,
        }}>
          laidback.ai
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN VIDEO — TransitionSeries
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

        <TransitionSeries.Sequence durationInFrames={220}>
          <PipelineScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        <TransitionSeries.Sequence durationInFrames={350}>
          <ComposeScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })}
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
