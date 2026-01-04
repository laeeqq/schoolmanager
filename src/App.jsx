import React, { useState } from "react";
import { generateStudyPlan } from "./schedule";
import Calendar from "./Calender";

function App() {
  // Store all added classes in a list
  const [classes, setClasses] = useState([]);

  // State for input fields for classes
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // State for Study Plan
  const [examDate, setExamDate] = useState("");
  const [topicsInput, setTopicsInput] = useState("");
  const [hoursNeeded, setHoursNeeded] = useState("");
  const [topicsList, setTopicsList] = useState([]);
  const [studyPlan, setStudyPlan] = useState([]);

  const [examStartTime, setExamStartTime] = useState("");
  const [examEndTime, setExamEndTime] = useState("");

  // State for current week
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    return monday;
  });

  // Navigate weeks
  function prevWeek() {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  }

  function nextWeek() {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  }

  // Helper functions
  const getHour = (timeStr) => parseInt(timeStr.split(":")[0]);

  // Helper function: check if a class is on this day (NO timezone bugs)
const isClassOnDay = (c, date) => {
  if (!c || !c.date) return false;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const dayKey = y + "-" + m + "-" + d;

  return c.date === dayKey;
};

  // Add a class
  function addClass() {
    if (!name || !date || !time || !endTime) {
      alert("Please fill all fields");
      return;
    }

    setClasses(classes.concat({ name, date, time, endTime }));
    setName(""); setDate(""); setTime(""); setEndTime("");
  }

  // Add topic
  function addTopic() {
    if (!topicsInput || !hoursNeeded) return;
    setTopicsList(topicsList.concat({ topic: topicsInput, hoursNeeded: Number(hoursNeeded) }));
    setTopicsInput(""); setHoursNeeded("");
  }

  // Generate study plan ONLY
  function generateFinalStudyPlan() {
    if (!examDate || topicsList.length === 0) {
      alert("Add exam date and topics first!");
      return;
    }
    const plan = generateStudyPlan(examDate, topicsList);
    setStudyPlan(plan);
  }

  // Add final exam ONLY
  function addFinalExam() {
  if (!examDate || !examStartTime || !examEndTime) {
    alert("Add exam date, start time, and end time!");
    return;
  }

  const examEvent = {
    name: "Final Exam",
    date: examDate,
    time: examStartTime,      // start time
    endTime: examEndTime,     // end time
    allDay: false,            // now it's a timed event
  };

  setClasses(classes.concat(examEvent));
}


  // Compute week dates
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekDates = weekDays.map(function (_, idx) {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + idx);
    return d;
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  // ───────── RENDER ─────────
  return (
    <>
      <h1>My School Manager</h1>

      {/* Week navigation */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={prevWeek}>Previous Week</button>
        <button onClick={nextWeek}>Next Week</button>
      </div>

      {/* Add class */}
      <h2>Add a Class</h2>
      <input type="text" placeholder="Class Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
      <button onClick={addClass}>Add Class</button>

      {/* Exam topics */}
      <h2>Exam Topics</h2>
      <div>
        <label>Exam Date</label><br />
        <input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} />
      </div>
      <div>
        <label>Exam Start Time</label><br />
        <input type="time" value={examStartTime} onChange={e => setExamStartTime(e.target.value)} />
      </div>
      <div>
        <label>Exam End Time</label><br />
        <input type="time" value={examEndTime} onChange={e => setExamEndTime(e.target.value)} />
      </div>

      <input type="text" placeholder="Topic Name" value={topicsInput} onChange={e => setTopicsInput(e.target.value)} />
      <input type="number" placeholder="Hours Needed" value={hoursNeeded} onChange={e => setHoursNeeded(e.target.value)} />
      <button onClick={addTopic}>Add Topic</button>

      <ul>
        {topicsList.map((t, idx) => (
          <li key={idx}>{t.topic} — {t.hoursNeeded} hour(s)</li>
        ))}
      </ul>

      {/* Separate buttons */}
      <button onClick={generateFinalStudyPlan}>Generate Study Plan</button>
      <button onClick={addFinalExam}>Add Final Exam</button>

      {/* Calendar */}
      <h2>Weekly Calendar</h2>
      <Calendar
        classes={classes}
        studyPlan={studyPlan}
        weekDates={weekDates}
        hours={hours}
        getHour={getHour}
        isClassOnDay={isClassOnDay}
      />
    </>
  );
}

export default App;
