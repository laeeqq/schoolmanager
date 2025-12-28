import React from "react";

// This component renders the weekly calendar grid with classes and study plan
const Calendar = ({ classes, studyPlan, weekDates, hours, getHour, isClassOnDay }) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // weekday headers

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px repeat(7, 1fr)", // 1 column for hours + 7 days
        gridTemplateRows: `80px repeat(${hours.length}, 1fr)`, // header + hours
        height: "80vh", // fill viewport height
        width: "95vw", // almost full width
        margin: "0 auto",
        borderTop: "1px solid white",
        borderLeft: "1px solid white",
        position: "relative", // for absolute positioned blocks
      }}
    >
      {/* First row: empty top-left + weekday headers */}
      <div style={{ border: "1px solid white" }}></div>
      {weekDays.map((day, idx) => (
        <div key={day} style={{ border: "1px solid white", textAlign: "center" }}>
          <strong>{day}</strong>
          <br />
          {weekDates[idx].toLocaleDateString()} {/* show actual date */}
        </div>
      ))}

      {/* Rows for each hour */}
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          <div style={{ border: "1px solid white", textAlign: "center" }}>
            {hour}:00 {/* hour label */}
          </div>

          {weekDates.map((d, dayIndex) => {
            // Classes scheduled at this hour
            const classesAtThisCell = classes.filter(
              (c) => isClassOnDay(c, d) && getHour(c.time) === hour
            );

            // Study sessions scheduled at this hour
            const studyAtThisCell = studyPlan.filter(
              (s) => s.date === d.toISOString().split("T")[0] && s.startHour === hour
            );

            return (
              <div
                key={`${dayIndex}-${hour}`}
                style={{
                  border: "1px solid gray",
                  height: "40px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Render class blocks */}
                {classesAtThisCell.map((c, idx) => {
                  const start = getHour(c.time);
                  const end = getHour(c.endTime);
                  const rowSpan = end - start + 1; // span multiple hours
                  return (
                    <div
                      key={idx}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${rowSpan * 100}%`,
                        backgroundColor: "blue",
                        border: "1px solid black",
                        boxSizing: "border-box",
                        padding: "2px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        fontSize: "12px",
                        color: "black", // class name in black
                        overflow: "hidden",
                      }}
                    >
                      {c.name} {/* class name at top-left */}
                    </div>
                  );
                })}

                {/* Render study blocks */}
                {studyAtThisCell.map((s, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${s.duration * 100}%`,
                      backgroundColor: "lightgreen",
                      border: "1px solid darkgreen",
                      boxSizing: "border-box",
                      padding: "2px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      fontSize: "12px",
                      color: "black",
                      overflow: "hidden",
                    }}
                  >
                    {s.topic} {/* topic name please*/}
                  </div>
                ))}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Calendar;
