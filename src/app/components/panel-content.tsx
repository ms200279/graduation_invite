import {
  EXHIBITION_SCHEDULE,
  NAVER_MAP_URL,
  PARKING_DETAILS,
  type PanelId,
  VENUE,
} from "../data/invitation";

function ScheduleContent() {
  return (
    <span className="invitation__schedule">
      {EXHIBITION_SCHEDULE.map((day) => (
        <span className="invitation__schedule-day" key={day.date}>
          <span className="invitation__schedule-date">{day.date}</span>
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
  );
}

function LocationContent() {
  return (
    <>
      <span className="invitation__panel-copy">
        <span>{VENUE.name}</span>
        <span>{VENUE.floor}</span>
        <span>{VENUE.address}</span>
      </span>
      <a
        className="invitation__map-link"
        href={NAVER_MAP_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        네이버 지도에서 보기
        <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}

function ParkingContent() {
  return (
    <span className="invitation__parking">
      <span className="invitation__parking-floor">
        {PARKING_DETAILS.floors}
      </span>
      <span className="invitation__parking-details">
        {PARKING_DETAILS.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
        <span className="invitation__parking-location">
          {PARKING_DETAILS.distribution}
        </span>
      </span>
    </span>
  );
}

export default function PanelContent({ panelId }: { panelId: PanelId }) {
  switch (panelId) {
    case "schedule":
      return <ScheduleContent />;
    case "locate":
      return <LocationContent />;
    case "parking":
      return <ParkingContent />;
  }
}
