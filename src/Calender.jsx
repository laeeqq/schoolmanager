import React from "react";

// Weekly calendar that supports:
// 1️⃣ Hour-based events (classes)
// 2️⃣ All-day events (study plan)
const Calendar = ({
  classes,
  studyPlan,
  weekDates,
  hours,
  getHour,
  isClassOnDay,
}) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px repeat(7, 1fr)", // hours + 7 days
        gridTemplateRows: `60px 60px repeat(${hours.length}, 1fr)`,
        // ↑ header row + ALL DAY row + hours
        height: "80vh",
        width: "95vw",
        margin: "0 auto",
        border: "1px solid white",
      }}
    >
      {/* ───────── HEADER ROW ───────── */}
      <div></div>
      {weekDays.map((day, i) => (
        <div key={day} style={{ textAlign: "center", border: "1px solid white" }}>
          <strong>{day}</strong>
          <br />
          {weekDates[i].toLocaleDateString()}
        </div>
      ))}

      {/* ───────── ALL DAY ROW (STUDY BLOCKS) ───────── */}
      <div
        style={{
          border: "1px solid gray",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        All Day
      </div>

      {weekDates.map((date, dayIndex) => {
        const localDate = date.toLocaleDateString("en-CA");

        // 🔑 Find ALL-DAY study blocks for this date
        const studyBlocksToday = studyPlan.filter(
          (s) => s.date === localDate && s.allDay
        );

        return (
          <div
            key={dayIndex}
            style={{
              border: "1px solid gray",
              padding: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {studyBlocksToday.map((s, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "lightgreen",
                  border: "1px solid darkgreen",
                  padding: "4px",
                  fontSize: "12px",
                  borderRadius: "4px",
                }}
              >
                📘 {s.topic}
              </div>
            ))}
          </div>
        );
      })}

      {/* ───────── HOURLY GRID ───────── */}
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          {/* Hour label */}
          <div style={{ border: "1px solid gray", textAlign: "center" }}>
            {hour}:00
          </div>

          {/* Day cells */}
          {weekDates.map((d, dayIndex) => {
            const classesAtThisCell = classes.filter(
              (c) => isClassOnDay(c, d) && getHour(c.time) === hour
            );

            return (
              <div
                key={`${dayIndex}-${hour}`}
                style={{
                  border: "1px solid gray",
                  height: "40px",
                  position: "relative",
                }}
              >
                {/* Render classes only (study is all-day now) */}
                {classesAtThisCell.map((c, idx) => {
                  const start = getHour(c.time);
                  const end = getHour(c.endTime);
                  const span = end - start + 1;

                  return (
                    <div
                      key={idx}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${span * 100}%`,
                        backgroundColor: "lightblue",
                        border: "1px solid blue",
                        fontSize: "12px",
                        padding: "2px",
                      }}
                    >
                      {c.name}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Calendar;
