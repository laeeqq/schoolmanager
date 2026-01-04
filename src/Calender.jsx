import React from "react";

// Weekly calendar that supports:
// 1️⃣ Hour-based events (classes, final exam)
// 2️⃣ All-day events (study plan)
const Calendar = ({ classes, studyPlan, weekDates, hours, getHour, isClassOnDay }) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Convert Date → YYYY-MM-DD (NO timezone issues)
  function toYMD(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px repeat(7, 1fr)", // hours + 7 days
        gridTemplateRows: `60px 60px repeat(${hours.length}, 1fr)`,
        height: "80vh",
        width: "95vw",
        margin: "0 auto",
        border: "1px solid white",
        overflow: "auto",
      }}
    >
      {/* ───────── HEADER ROW ───────── */}
      <div></div>
      {weekDays.map((day, i) => (
        <div
          key={day}
          style={{ textAlign: "center", border: "1px solid white", backgroundColor: "#030303ff" }}
        >
          <strong>{day}</strong>
          <br />
          {toYMD(weekDates[i])}
        </div>
      ))}

      {/* ───────── ALL DAY ROW (STUDY BLOCKS) ───────── */}
      <div
        style={{
          border: "1px solid gray",
          textAlign: "center",
          fontWeight: "bold",
          backgroundColor: "#000000ff",
        }}
      >
        All Day
      </div>

      {weekDates.map((date, dayIndex) => {
        const dayKey = toYMD(date); // 🔑 stable date key

        // All-day STUDY blocks only
        const studyBlocksToday = studyPlan.filter((s) => {
          return s && s.allDay === true && s.date === dayKey;
        });

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
                  backgroundColor: "#b7e4c7",
                  border: "1px solid #40916c",
                  padding: "4px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  textAlign: "center",
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
          <div
            style={{
              border: "1px solid gray",
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
            }}
          >
            {hour}:00
          </div>

          {/* Hour cells */}
          {weekDates.map((d, dayIndex) => {
            const classesAtThisCell = classes.filter((c) => {
              if (!c || !c.date || !c.time) return false;
              return isClassOnDay(c, d) && getHour(c.time) === hour;
            });

            return (
              <div
                key={`${dayIndex}-${hour}`}
                style={{ border: "1px solid gray", height: "40px", position: "relative" }}
              >
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
                        backgroundColor:
                          c.name === "Final Exam" ? "#ffccd5" : "#90e0ef",
                        border:
                          "1px solid " +
                          (c.name === "Final Exam" ? "#d00000" : "#0077b6"),
                        fontSize: "12px",
                        padding: "2px",
                        textAlign: "center",
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
