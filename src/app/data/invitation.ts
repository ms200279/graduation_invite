export const VENUE = {
  name: "홍익대학교 대학로 아트센터",
  floor: "B2 갤러리 3",
  address: "서울특별시 종로구 대학로 57",
} as const;

export const NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent(VENUE.address)}`;

export const INVITATION_PANELS = [
  {
    id: "schedule",
    label: "Schedule",
    title: "전시 일정",
    mobileScrollable: true,
  },
  {
    id: "locate",
    label: "Locate",
    title: "전시 위치",
    mobileScrollable: false,
  },
  {
    id: "parking",
    label: "Parking",
    title: "주차 안내",
    mobileScrollable: true,
  },
] as const;

export type PanelId = (typeof INVITATION_PANELS)[number]["id"];
export type InvitationPanelData = (typeof INVITATION_PANELS)[number];

export const EXHIBITION_SCHEDULE = [
  {
    date: "09.18.FRI",
    events: [
      ["13:00", "자유관람"],
      ["15:00", "졸업생 특강"],
      ["16:00", "개회식"],
      ["16:20", "졸업작품 우수작 시상"],
      ["16:30", "자유관람"],
    ],
  },
  {
    date: "09.19.SAT",
    events: [["10:00", "자유관람"]],
  },
  {
    date: "09.20.SUN",
    events: [["10:00", "자유관람"]],
  },
] as const;

export const PARKING_DETAILS = {
  floors: "B3F ~ B4F",
  lines: [
    "기본 30분 3,000원",
    "이후 20분당 2,000원",
    "이용객 주차권 지참 시 50% 할인",
    "(주차권으로만 정산 가능, 티켓정산 불가)",
  ],
  distribution: "주차권 배부 장소: B2 갤러리 3, 전시장 입구 인포데스크",
} as const;
