# Graduation Invitation

2026 한국공학대학교 디자인공학부 제21회 졸업전시회 온라인 초대장입니다. 모바일 환경을 우선으로 설계했으며, 데스크톱에서도 중앙에 제한된 초대장 레이아웃으로 표시됩니다.

## 기술 스택

- Next.js 16 App Router
- React 19
- TypeScript
- Pretendard Variable
- Liquid Glass: [`nikdelvin/liquid-glass`](https://github.com/nikdelvin/liquid-glass) 기반 구현

## 주요 기능

- 자동 재생되는 WebM 배경 영상
- 가독성을 위한 전체 흰색 틴트
- Schedule, Locate, Parking 안내 패널
- 원래 버튼 위치에서 확장되는 패널 애니메이션
- SVG 변위 필터 기반 Liquid Glass 효과
- SVG 필터를 지원하지 않는 모바일 브라우저용 글래스 fallback
- 전시장 주소 터치 시 클립보드 복사
- 자연스럽게 나타나고 사라지는 복사 결과 토스트
- 네이버 지도 검색 연결
- 패널 외부 또는 `Escape` 입력으로 패널 닫기
- 모션 감소 설정 지원

## 안내 내용

### 전시 일정

- `09.18.FRI`: 자유관람, 졸업생 홈커밍 행사, 개회식, 우수작 시상
- `09.19.SAT`: 자유관람
- `09.20.SUN`: 자유관람

### 전시 위치

- 홍익대학교 대학로 아트센터 B2 갤러리 3
- 서울특별시 종로구 대학로 57

### 주차 안내

- B3F ~ B6F
- 기본 30분 3,000원
- 이후 20분당 2,000원
- 이용객 주차권 지참 시 50% 할인 및 1시간 무료이용권 제공
- 주차권으로만 정산 가능하며 티켓 정산 불가

## 반응형 기준

- 모바일 초대장 최대 너비: `430px`
- 데스크톱 초대장 최대 너비: `500px`
- 모바일 콘텐츠 시작점: 화면 중앙선에서 왼쪽 `50px`
- 데스크톱 콘텐츠 시작점: 영상 중앙선에서 왼쪽 `30px`
- 데스크톱 배경 영상: 중앙 기준 `150%` 확대 및 `cover`
- 배경 흰색 틴트: `68%`
- 높이 `680px` 이하에서는 콘텐츠와 패널 위치를 위로 조정

## 프로젝트 구조

```text
src/app/
├── components/
│   ├── address-copy-button.tsx    # 주소 복사와 토스트
│   ├── invitation-panel.tsx       # 개별 안내 패널
│   ├── invitation-panels.tsx      # 패널 열림/닫힘 상태
│   ├── liquid-glass.tsx           # Liquid Glass 표시 계층
│   └── panel-content.tsx          # 일정·위치·주차 콘텐츠
├── data/
│   └── invitation.ts              # 전시 정보와 패널 데이터
├── hooks/
│   └── use-liquid-glass-filter.ts # 필터 측정과 브라우저 fallback
├── lib/
│   └── nikdelvin-liquid-glass.ts  # SVG 변위 필터 생성
├── globals.css                    # 레이아웃과 애니메이션
├── layout.tsx
└── page.tsx
```

배경 영상은 `public/videos/mbg.webm`에 있습니다. 카카오톡 등 링크 공유용 OG 이미지는 `public/images/og-image.png`에 추가하며, 배포 환경에서는 `https://graduation-invite-dusky.vercel.app/images/og-image.png`로 제공됩니다. Liquid Glass 원본 라이선스는 `src/vendor/nikdelvin-liquid-glass/LICENSE`에서 확인할 수 있습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 코드 검사

```bash
npm run lint
npx tsc --noEmit
npx next build --webpack
```

현재 실행 환경에서는 Turbopack이 내부 프로세스 포트를 생성하지 못할 수 있어 프로덕션 검증에 공식 Webpack 옵션을 사용할 수 있습니다.

## 작업 규칙

1. 모든 작업은 새로운 브랜치에서 시작합니다.
2. 변경사항은 역할에 따라 작은 커밋으로 분리합니다.
3. 사용자 승인 후 린트, 타입 검사, 프로덕션 빌드를 진행합니다.
4. 검사가 통과하면 `main`에 병합하고 원격 저장소에 푸시합니다.

## 저장소

[ms200279/graduation_invite](https://github.com/ms200279/graduation_invite)
