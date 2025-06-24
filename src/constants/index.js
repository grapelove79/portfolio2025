import skill01 from "../assets/img/ico_html.svg";
import skill02 from "../assets/img/ico_css.svg";
import skill03 from "../assets/img/ico_js.svg";
import skill04 from "../assets/img/ico_jquery.svg";
import skill05 from "../assets/img/ico_sass.svg";
import skill06 from "../assets/img/ico_vs.svg";
import skill07 from "../assets/img/ico_git.svg";
import skill08 from "../assets/img/ico_github.svg";
import port01 from "../assets/img/ee.png";
import port02 from "../assets/img/wms.png";
import port03 from "../assets/img/bn.png";
import port04 from "../assets/img/zaram.png";
import port05 from "../assets/img/cns.png";
import port06 from "../assets/img/studio.png";
import port07 from "../assets/img/vzon.png";
import port08 from "../assets/img/tovsoft.png";
import port09 from "../assets/img/chunjae_lee.png";
import port10 from "../assets/img/chunjae_kim.png";
import port11 from "../assets/img/dokdo.png";
import port12 from "../assets/img/donga_saf_20.png";
import port13 from "../assets/img/donga_saf_10.png";
import port14 from "../assets/img/donga_sci_41.png";
import port15 from "../assets/img/donga_soc_41.png";

export const headerNav = [
  {
    title: "홈",
    url: "#home"
  },
  {
    title: "소개",
    url: "#intro"
  },
  {
    title: "기술",
    url: "#skill"
  },
  {
    title: "경력",
    url: "#career"
  },
  {
    title: "포트폴리오",
    url: "#port"
  },
  {
    title: "연락",
    url: "#contact"
  }
]

export const intro = [
  {
    title: "반응형 웹 및  \n 웹 접근성을 고려",
    desc: "단순한 마크업 작업을 넘어, 사용자 경험(UX)과 접근성을 \n 고려한 UI 개발을 지향하고 있습니다."
  },
  {
    title: "사용자 경험을 극대화",
    desc: "사용자가 직관적으로 경험할 수 있는 인터페이스를 \n 구현하는 데 주력하고 있습니다."
  },
]

export const introText = {
  title: ["Explore and Strive", "for the essence"],
  subtitle: "안녕하세요. 웹퍼블리셔 김영선입니다.",
  desc: ["보다 나은 사용자 경험을 제공하고 재사용성 높은 코드 개발하기 위해 \n 끊임없이 노력하고 있습니다.", "웹 표준과 웹 접근성 준수하며, 성공적인 프로젝트를 위해 \n 기획, 디자인, 개발팀과의 원활한 협력과 소통에 힘쓰고 있습니다."]
}

export const skill = [
  {
    icon: skill01,
    info: "HTML"
  },
  {
    icon: skill02,
    info: "CSS"
  },
  {
    icon: skill03,
    info: "JavaScript"
  },
  {
    icon: skill04,
    info: "jQuery"
  },
  {
    icon: skill05,
    info: "Git"
  },
  {
    icon: skill06,
    info: "GitHup"
  },
  {
    icon: skill07,
    info: "Sass"
  },
  {
    icon: skill08,
    info: "VSCode"
  },
]

export const careerText = [
  {
    date: "2022. 11. ~ 2024. 8.",
    title: "(주)비엔시스템",
    info: [
      "개발팀",
      "웹퍼블리셔",
      "반응형 웹, 적응형 웹•모바일•키오스크, 디지털 교과서, 하이브리드 앱, WMS",
    ],
  },
  {
    date: "2017. 4. ~ 2021. 12.",
    title: "(주)토브소프트",
    info: [
      "콘텐츠개발팀",
      "웹퍼블리셔",
      "교과서기반으로 웹 교육콘텐츠, 디지털 교과서, eBook",
    ],
  },
  {
    date: "2011. 4. ~ 2013. 12.",
    title: "(주)가이스트코리아",
    info: [
      "웹디자인팀",
      "웹디자너",
      "관공서나 공기업을 상대로 웹사이트 프로토타입과 프로젝트 디자인 및 UI/UX 디자인 및 유지보수",
    ],
  },
];

export const portText = [
  {
    num: "01",
    company: "미래엔",
    title: "영어 4학년 디지털교과서 구축",
    desc: "퍼블리싱 40%, React 개발 환경, TypeScript",
    img: port01,
    // code: "/",
    view: "https://relieved-brace-db4.notion.site/4-81780bda20474058a90f8d55df811437",
    name: "교육컨텐츠",
  },
  {
    num: "02",
    company: "이지스틸넷",
    title: "WMS 2.0 철강 물류관리시스템 구축",
    desc: "퍼블리싱 40%, Vue.js 개발 환경, 적응형 웹ㆍ모바일ㆍ키오스크",
    img: port02,
    // code: "/",
    view: "https://relieved-brace-db4.notion.site/WMS-2-0-f92e3e49e3744628a5005ac8ac1485d8",
    name: "웹",
  },
  {
    num: "03",
    company: "비엔시스템",
    title: "영업용 웹 사이트 구축",
    desc: "퍼블리싱 100%, 반응형 웹",
    img: port03,
    // code: "/",
    view: "http://bn-system.com/it_sub/index.php",
    name: "웹",
  },
  {
    num: "04",
    company: "자람패밀리",
    title: "자람부모강점 진단 웹 사이트 구축",
    desc: "퍼블리싱 70%, 반응형 웹, html2canvas 화면 캡쳐 라이브러리 사용",
    img: port04,
    // code: "/",
    view: "https://zaramstrength.com",
    name: "웹",
  },
  {
    num: "05",
    company: "강남구청",
    title: "이노 CNS 파킹위드 주차관제 (거주자 주차공유) 하이브리드앱 구축",
    desc: "퍼블리싱 100%, 네이버 지도Api 사용",
    img: port05,
    // code: "/",
    view: "https://app.parkingwith.com/main/",
    name: "앱",
  },
  {
    num: "06",
    company: "스튜디오25",
    title: "스튜디오 포트폴리오 신규 웹 사이트 구축",
    desc: "퍼블리싱 100%, 그누보드 기반의 반응형 웹",
    img: port06,
    // code: "/",
    view: "https://www.studio25.ai",
    name: "웹",
  },
  {
    num: "07",
    company: "밸모어 주식회사",
    title: "브이존 Vzon SW 솔루션 홍보 웹 사이트 구축",
    desc: "메인 맟 서브페이지 디자인 및 반응형 퍼블리싱 60%",
    img: port07,
    // code: "/",
    view: "https://www.vzon.co.kr",
    name: "웹",
  },
  {
    num: "08",
    company: "토브소프트",
    title: "기업 웹사이트 운영",
    desc: "페이지 수정 및 추가 페이지 퍼블리싱",
    img: port08,
    // code: "/",
    view: "https://tovsoft.com/index.html",
    name: "웹",
  },
  {
    num: "09",
    company: "천재교육",
    title: "고등 영어(이재영) 디지털교과서 구축",
    desc: "퍼블리싱 80%, PM을 담당하여 고객사와 외주 협력으로 일정/업무 조율, UI동작 되는 부분은 일부 JavaScript 사용",
    img: port09,
    // code: "/",
    view: "https://han.gl/JdPVdl",
    name: "디지털콘텐츠",
  },
  {
    num: "10",
    company: "천재교육",
    title: "고등 영어(김태영) 디지털교과서 구축",
    desc: "페이지 수정 및 추가 페이지 퍼블리싱",
    img: port10,
    code: "/",
    view: "https://han.gl/Gl36g",
    name: "디지털콘텐츠",
  },
  {
    num: "11",
    company: "동북아역사재단",
    title: "동북아역사넷 5~6학년군 독도 디지털교재 구축",
    desc: "퍼블리싱 90%, UI가 동작되는 부분은 JavaScript 사용",
    img: port11,
    // code: "/",
    view: "https://relieved-brace-db4.notion.site/5-6-1f0e0003bcaa80e8b08fe7dfa9ac0dbf?pvs=4",
    name: "디지털콘텐츠",
  },
  {
    num: "12",
    company: "동아출판",
    title: "두클래스 초등학교 안전한 생활 2학년 2학기 콘텐츠 구축",
    desc: "퍼블리싱 80%, PL",
    img: port12,
    code: "/",
    view: "http://un.douclass.easypub.kr/#SAF_20",
    name: "디지털콘텐츠",
  },
  {
    num: "13",
    company: "동아출판",
    title: "두클래스 초등학교 안전한 생활 1학년 2학기 콘텐츠 구축",
    desc: "퍼블리싱 80%, PL",
    img: port13,
    // code: "/",
    view: "http://un.douclass.easypub.kr/#SAF_10",
    name: "디지털콘텐츠",
  },
  {
    num: "14",
    company: "동아출판",
    title: "두클래스 초등학교 과학 4학년 1학기 구축",
    desc: "UI마크업 50%, 수학 프로토타입 제작하였고 사회와 과학은 고객사 검수서 수정 및 페이지 추가 제작, 현재 수사과 전체 가이드 작업",
    img: port14,
    // code: "/",
    view: "https://un.douclass.easypub.kr/#SCI_41",
    name: "디지털콘텐츠",
  },
  {
    num: "15",
    company: "동아출판",
    title: "두클래스 초등학교 사회 4학년 1학기 구축",
    desc: "UI마크업 50%, 수학 프로토타입 제작하였고 사회와 과학은 고객사 검수서 수정 및 페이지 추가 제작, 현재 수사과 전체 가이드 작업",
    img: port15,
    // code: "/",
    view: "https://un.douclass.easypub.kr/#SOC_41",
    name: "디지털콘텐츠",
  },
];

export const contactText = [
  {
    link: "mailto:grapelove79@gmail.com",
    title: "grapelove79@gmail.com",
  },
];
