import React, { useState } from "react"; // import React so <React.Fragment> works

function App() {
  // Store all added classes in a list
  const [classes, setClasses] = useState([]);

  // State for input fields
  const [name, setName] = useState(""); // Class name input
  const [date, setDate] = useState(""); // Class date input
  const [time, setTime] = useState(""); // Start time input
  const [endTime, setEndTime] = useState(""); // End time input

  // Function to add a new class
  function addClass() {
    // Check that all required fields are filled
    if (!name || !date || !time || !endTime) {
      alert("Please fill all fields");
      return;
    }

    // Create a new class object with start and end time
    const newClass = { name, date, time, endTime };

    // Add the new class to the existing classes list
    setClasses([...classes, newClass]);

    // Clear the input fields after adding
    setName("");
    setDate("");
    setTime("");
    setEndTime("");
  }

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Create an array of hours 0-23 for the grid rows
  const hours = Array.from({ length: 24 }, (_, i) => i); // tricky: generate numbers 0 to 23

  // Helper function: convert a date string "YYYY-MM-DD" to a day index (0=Mon, 6=Sun)
  const getDayIndex = (dateStr) => {
    const d = new Date(dateStr); // convert string to Date object
    let day = d.getDay(); // getDay(): 0=Sun, 1=Mon ... 6=Sat
    day = day === 0 ? 6 : day - 1; // convert so Mon=0, Tue=1, ..., Sun=6
    return day;
  };

  // Helper function: get hour from time string "HH:MM"
  const getHour = (timeStr) => parseInt(timeStr.split(":")[0]); // tricky: split by ":" and convert first part to integer

  return (
    <>
      <h1>My School Manager</h1>

      {/* Input fields for adding a class */}
      <input
        type="text"
        placeholder="Class Name"
        value={name} // controlled input: value is synced with state
        onChange={(e) => setName(e.target.value)} // update state when user types
      />
      <input
        type="date"
        value={date} // controlled input for date
        onChange={(e) => setDate(e.target.value)} // update state when user picks a date
      />
      <input
        type="time"
        value={time} // controlled input for start time
        onChange={(e) => setTime(e.target.value)} // update state when user picks a time
      />
      <input
        type="time"
        value={endTime} // controlled input for end time
        onChange={(e) => setEndTime(e.target.value)} // update state when user picks end time
      />
      <button onClick={addClass}>Add Class</button>

      <h2>Weekly Calendar</h2>
      {/* Calendar grid filling whole page */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px repeat(7, 1fr)", // 1 column for hours + 7 days
          gridTemplateRows: `40px repeat(${hours.length}, 1fr)`, // 40px for header row, rest equal height
          height: "80vh", // fill most of the viewport height
          width: "95vw", // almost full width
          margin: "0 auto",
          borderTop: "1px solid #000",
          borderLeft: "1px solid #000",
          position: "relative", // for class blocks spanning multiple rows
        }}
      >
        {/* First row: empty top-left cell + weekday headers */}
        <div style={{ border: "1px solid black" }}></div> {/* top-left empty cell */}
        {weekDays.map((day) => (
          <div
            key={day}
            style={{ border: "1px solid black", textAlign: "center" }}
          >
            <strong>{day}</strong> {/* weekday header */}
          </div>
        ))}

        {/* Rows for each hour */}
        {hours.map((hour) => (
          <React.Fragment key={hour}> {/* React.Fragment needed because each row has multiple elements */}
            {/* First column = hour label */}
            <div
              style={{ border: "1px solid black", textAlign: "center" }}
            >
              {hour}:00
            </div>

            {/* 7 day columns */}
            {weekDays.map((day, dayIndex) => {
              // Find all classes starting at this hour & day
              const classesAtThisCell = classes.filter(
                (c) =>
                  getDayIndex(c.date) === dayIndex && getHour(c.time) === hour
              ); // tricky: match both day index and start hour

              return (
                <div
                  key={`${day}-${hour}`}
                  style={{
                    border: "1px solid gray",
                    height: "40px",
                    textAlign: "center",
                    position: "relative", // for class block spanning rows
                  }}
                >
                  {classesAtThisCell.map((c, idx) => {
                    const start = getHour(c.time);
                    const end = getHour(c.endTime);
                    const rowSpan = end - start + 1; // number of hours to span
                    return (
                      <div
                        key={idx}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: `${rowSpan * 100}%`, // span rows
                          backgroundColor: "blue", // blue block
                          border: "1px solid black",
                          boxSizing: "border-box",
                          padding: "2px", // space for text
                          display: "flex",
                          flexDirection: "column", // allows text at top
                          justifyContent: "flex-start", // push text to top
                          alignItems: "flex-start", // push text to left
                          fontSize: "12px",
                          color: "black", // class name in black
                          overflow: "hidden", // prevent overflow if name too long
                        }}
                      >
                        {c.name} {/* class name at top-left */}
                      </div>
                    );
                  })}

                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default App;
