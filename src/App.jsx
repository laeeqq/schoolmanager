import React, { useState } from "react"; // import React so <React.Fragment> works
import { generateStudyPlan } from "./schedule"; // import the logic for generating study blocks
import Calendar from "./Calender"; // import calendar component

function App() {
  // Store all added classes in a list
  const [classes, setClasses] = useState([]); // list of regular classes

  // State for input fields for classes
  const [name, setName] = useState(""); // Class name input
  const [date, setDate] = useState(""); // Class date input
  const [time, setTime] = useState(""); // Start time input
  const [endTime, setEndTime] = useState(""); // End time input

  // State for Study Plan (generated logic-based)
  const [examDate, setExamDate] = useState(""); // final exam date input
  const [topicsInput, setTopicsInput] = useState(""); // topic name input
  const [hoursNeeded, setHoursNeeded] = useState(""); // hours needed for topic
  const [topicsList, setTopicsList] = useState([]); // array of topics for exam
  const [studyPlan, setStudyPlan] = useState([]); // generated study plan array


  const [examStartTime, setExamStartTime] = useState(""); // exam start time
  const [examEndTime, setExamEndTime] = useState(""); // exam end time

  // State for current week (start date of the week)
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay(); // 0=Sun, 1=Mon...
    const diffToMonday = day === 0 ? -6 : 1 - day; // if Sun, go back 6 days
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    return monday;
  });

  // Function to go to previous week
  function prevWeek() {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7); // go back 7 days
    setCurrentWeekStart(newDate);
  }

  // Function to go to next week
  function nextWeek() {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7); // go forward 7 days
    setCurrentWeekStart(newDate);
  }

  // Compute the dates for the week (Mon-Sun)
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // weekday headers
  const weekDates = weekDays.map((_, idx) => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + idx); // add 0..6 days
    return d;
  });

  // Create an array of hours 0-23 for the grid rows
  const hours = Array.from({ length: 24 }, (_, i) => i); // generate numbers 0 to 23

  // Function to add a new class
  function addClass() {
    // Check that all required fields are filled
    if (!name || !date || !time || !endTime) {
      alert("Please fill all fields"); // alert user
      return;
    }

    // Create a new class object with start and end time
    const newClass = { name, date, time, endTime };

    // Add the new class to the existing classes list
    setClasses([...classes, newClass]); // update state

    // Clear the input fields after adding
    setName("");
    setDate("");
    setTime("");
    setEndTime("");
  }

  // Function to add topic for the study plan
  function addTopic() {
    if (!topicsInput || !hoursNeeded) return; // skip if empty
    setTopicsList([...topicsList, { topic: topicsInput, hoursNeeded: Number(hoursNeeded) }]); // add to list
    setTopicsInput(""); // clear topic input
    setHoursNeeded(""); // clear hours input
  }

  // Function to generate the study plan
  function generateFinalStudyPlan() {
    if (!examDate || topicsList.length === 0) {
      alert("Add exam date and topics first!"); // validation
      return;
    }

    const plan = generateStudyPlan(examDate, topicsList); // generate plan
    setStudyPlan(plan); // save in state
    console.log("Generated Study Plan:", plan); // <- check the data
  }

  //Function to add final exams and generate a study plan
  function addExam(){
    if(!examDate || topicsList.length == 0){
      alert("Add exam date and topics first");
      return;
    }

    //add final exam 
    const examEvent = {
      name: "Final Exam",
      date: examDate,
      time: "09:00",
      endTime: "12:00",

    };
    setClasses([...classes,examEvent]);

    const plan =generateStudyPlan(examDate,topicsList);
    setStudyPlan(plan);

    console.log("Exam added and study plan generated");
  }

  // Helper function: get hour from time string "HH:MM"
  const getHour = (timeStr) => parseInt(timeStr.split(":")[0]); // split by ":" and take first part

  // Helper function: check if a class/study session is on this day
  const isClassOnDay = (c, date) => {
    return new Date(c.date).toDateString() === date.toDateString();
  };

  return (
    <>
      <h1>My School Manager</h1> {/* App title */}

      {/* Week navigation */}
      <div>
        <button onClick={prevWeek}>Previous Week</button> {/* previous week */}
        <button onClick={nextWeek}>Next Week</button> {/* next week */}
      </div>

      {/* Input fields for adding a class */}
      <h2>Add a Class</h2>
      <input type="text" placeholder="Class Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <button onClick={addClass}>Add Class</button> {/* add class button */}

      {/* Input fields for adding exam topics */}
      <h2>Exam Topics</h2>
      <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
      <input type="text" placeholder="Topic Name" value={topicsInput} onChange={(e) => setTopicsInput(e.target.value)} />
      <input type="number" placeholder="Hours Needed" value={hoursNeeded} onChange={(e) => setHoursNeeded(e.target.value)} />
      <button onClick={addTopic}>Add Topic</button> {/* add topic button */}

      {/* Display topics list */}
      <ul>
        {topicsList.map((t, idx) => (
          <li key={idx}>
            {t.topic} — {t.hoursNeeded} hour(s)
          </li>
        ))}
      </ul>

      {/* Generate study plan */}
      <button onClick={generateFinalStudyPlan}>Generate Study Plan</button>
      <button onClick={addExam}>Add Final Exam & Generate Study Plan</button>

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
