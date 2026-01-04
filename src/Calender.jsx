import React from "react";

// Weekly calendar that supports:
// 1️⃣ Hour-based events (classes)
// 2️⃣ All-day events (study plan)
const Calendar = ({ classes, studyPlan, weekDates, hours, getHour, isClassOnDay }) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
        overflow: "auto", // scroll if needed
      }}
    >
      {/* ───────── HEADER ROW ───────── */}
      <div></div>
      {weekDays.map((day, i) => (
        <div
          key={day}
          style={{
            textAlign: "center",
            border: "1px solid white",
            backgroundColor: "#030303ff",
          }}
        >
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
          backgroundColor: "#000000ff",
        }}
      >
        All Day
      </div>

      {weekDates.map((date, dayIndex) => {
  const localDate = date.toLocaleDateString("en-CA");

  // 🔑 Find ALL-DAY study blocks for this date
  const studyBlocksToday = studyPlan.filter(function (s) {
    return s && s.date && s.allDay && s.date === localDate;
  });

  // 🔑 Also include any all-day classes (like Final Exam)
  const allDayClassesToday = classes.filter(function (c) {
    return c && c.date && c.allDay && c.date === localDate;
  });

  const allDayEvents = studyBlocksToday.concat(allDayClassesToday);

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
      {allDayEvents.map((s, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: s.type === "study" ? "#b7e4c7" : "#ffccd5",
            border: "1px solid " + (s.type === "study" ? "#40916c" : "#d00000"),
            padding: "4px",
            fontSize: "12px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {s.type === "study" ? "📘 " + s.topic : "📌 " + s.name}
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
            }}
          >
            {hour}:00
          </div>

          {/* Day cells */}
          {weekDates.map((d, dayIndex) => {
            // Only show classes with a time (skip final exams)
            const classesAtThisCell = classes.filter(function (c) {
              if (!c || !c.date || !c.time) return false;
              return isClassOnDay(c, d) && getHour(c.time) === hour;
            });

            return (
              <div
                key={`${dayIndex}-${hour}`}
                style={{
                  border: "1px solid gray",
                  height: "40px",
                  position: "relative",
                }}
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
                        backgroundColor: "#90e0ef",
                        border: "1px solid #0077b6",
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
