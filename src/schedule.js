// This is for the logic for scheduling the study plan
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  // Convert the exam date to a Date object
  const exam = new Date(examDate);

  // Normalize exam date (remove time)
  exam.setHours(0, 0, 0, 0);

  // For now we will go with the minimum study plan date of three weeks
  const DAYS_BEFORE_EXAMS = 23;

  // Create the starting date for the study period
  const startDate = new Date(exam);
  startDate.setDate(exam.getDate() - DAYS_BEFORE_EXAMS);

  let currentDate = new Date(startDate);

  topics.forEach((topicObj) => {
    const { topic, hoursNeeded } = topicObj;

    let hoursLeft = hoursNeeded;

    // Schedule study ONLY before the exam day
    while (hoursLeft > 0) {
      const studyDay = new Date(currentDate);
      studyDay.setHours(0, 0, 0, 0);

      //  Stop if we reached the exam day or passed it
      if (studyDay >= exam) break;

      const formattedDate = studyDay.toISOString().split("T")[0];

      studyPlan.push({
        type: "study",
        topic: topic,
        date: formattedDate,
        startHour: 18, // fixed time for now
        duration: 1,
      });

      hoursLeft--; // reduce remaining hours
      currentDate.setDate(currentDate.getDate() + 1); // move to next day
    }
  });

  return studyPlan;
}
