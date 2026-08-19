"use client";

import { useEffect, useState } from "react";
import LiquidGlass from "./liquid-glass";

const PANELS = [
  {
    id: "schedule",
    label: "Schedule",
    title: "전시 일정",
    lines: [],
  },
  {
    id: "locate",
    label: "Locate",
    title: "전시 위치",
    lines: [
      "홍익대학교 대학로 아트센터",
      "B2 갤러리 3",
      "서울특별시 종로구 대학로 57",
    ],
  },
  {
    id: "parking",
    label: "Parking",
    title: "주차 안내",
    lines: [],
  },
] as const;

const SCHEDULE = [
  {
    date: "09.18.FRI",
    events: [
      ["13:00", "자유관람"],
      ["15:00", "졸업생 홈커밍 행사"],
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

type PanelId = (typeof PANELS)[number]["id"];
const VENUE_ADDRESS = "서울특별시 종로구 대학로 57";
const NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent(VENUE_ADDRESS)}`;

export default function InvitationPanels() {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      {activePanel && (
        <button
          className="invitation__panel-backdrop"
          type="button"
          aria-label="안내 닫기"
          onClick={() => setActivePanel(null)}
        />
      )}

      <nav
        className="invitation__navigation"
        aria-label="전시 안내"
        data-expanded={activePanel ? "true" : "false"}
      >
        {PANELS.map((panel) => {
          const isActive = activePanel === panel.id;
          const isDisabled = activePanel !== null && !isActive;

          return (
            <LiquidGlass
              className={`invitation__panel-button invitation__panel-button--${panel.id}`}
              key={panel.id}
              data-active={isActive ? "true" : "false"}
              depth={8}
              strength={24}
              chromaticAberration={0.5}
            >
              <button
                className="invitation__panel-trigger"
                type="button"
                aria-expanded={isActive}
                aria-controls={`${panel.id}-panel`}
                disabled={isDisabled}
                onClick={() => setActivePanel(panel.id)}
              >
                <span className="invitation__panel-label">{panel.label}</span>
              </button>

              <span
                className="invitation__panel-content"
                id={`${panel.id}-panel`}
                aria-hidden={!isActive}
              >
                <span className="invitation__panel-title">{panel.title}</span>
                {panel.id === "schedule" ? (
                  <span className="invitation__schedule">
                    {SCHEDULE.map((day) => (
                      <span className="invitation__schedule-day" key={day.date}>
                        <span className="invitation__schedule-date">
                          {day.date}
                        </span>
                        <span className="invitation__schedule-events">
                          {day.events.map(([time, event]) => (
                            <span
                              className="invitation__schedule-event"
                              key={`${day.date}-${time}`}
                            >
                              <span>{time}</span>
                              <span>{event}</span>
                            </span>
                          ))}
                        </span>
                      </span>
                    ))}
                  </span>
                ) : panel.id === "parking" ? (
                  <span className="invitation__parking">
                    <span className="invitation__parking-floor">B3F ~ B6F</span>
                    <span className="invitation__parking-details">
                      <span>기본 30분 3,000원 / 이후 20분당 2,000원</span>
                      <span>
                        이용객 주차권 지참 시 50% 할인 및 1시간 무료이용권 제공
                      </span>
                      <strong>(주차권으로만 정산 가능, 티켓정산 불가)</strong>
                      <span className="invitation__parking-location">
                        주차권 배부 장소: B2 갤러리 3, 전시장 입구 인포데스크
                      </span>
                    </span>
                  </span>
                ) : (
                  <span className="invitation__panel-copy">
                    {panel.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                )}

                {panel.id === "locate" && (
                  <a
                    className="invitation__map-link"
                    href={NAVER_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    네이버 지도에서 보기
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </span>
            </LiquidGlass>
          );
        })}
      </nav>
    </>
  );
}
