// This is for the logic for scheduling the study plan
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  // Convert the exam date to a Date object
  const exam = new Date(examDate);

  // Normalize exam date (remove time)
  exam.setHours(0, 0, 0, 0);

  // Minimum study plan date of three weeks before exam
  const DAYS_BEFORE_EXAMS = 23;

  // Create the starting date for the study period
  const startDate = new Date(exam);
  startDate.setDate(exam.getDate() - DAYS_BEFORE_EXAMS);

  let currentDate = new Date(startDate);

  topics.forEach((topicObj) => {
    const { topic, hoursNeeded } = topicObj; // extract topic and hours

    let hoursLeft = hoursNeeded;

    // Schedule study ONLY before the exam day
    while (hoursLeft > 0) {
      const studyDay = new Date(currentDate);
      studyDay.setHours(0, 0, 0, 0);

      // Stop if we reached the exam day or passed it
      if (studyDay >= exam) break;

      const formattedDate = studyDay.toISOString().split("T")[0];

      // Each study block has start time and end time
      const startHour = 18; // fixed start time for now
      const duration = 1; // 1 hour per block
      const endHour = startHour + duration;
      const startTime = `${startHour.toString().padStart(2, "0")}:00`;
      const endTime = `${endHour.toString().padStart(2, "0")}:00`;

      // Add the study block to the plan
      studyPlan.push({
        type: "study",       // type of event
        topic: topic,        // topic name
        date: formattedDate, // date string
        time: startTime,     // start time string
        endTime: endTime,    // end time string
      });

      hoursLeft--; // reduce remaining hours
      currentDate.setDate(currentDate.getDate() + 1); // move to next day
    }
  });

  return studyPlan;
}
