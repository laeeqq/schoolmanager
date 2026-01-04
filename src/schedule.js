// This is for the logic for scheduling the study plan
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  // Convert the exam date to a Date object
  const exam = new Date(examDate);

  // Normalize exam date (remove time)
  exam.setHours(0, 0, 0, 0);

  // Minimum study period: 3 weeks
  const DAYS_BEFORE_EXAMS = 21;

  // Create the starting date for the study period
  const startDate = new Date(exam);
  startDate.setDate(exam.getDate() - DAYS_BEFORE_EXAMS);

  let currentDate = new Date(startDate);

  // Loop day by day until the day before the exam
  while (currentDate < exam) {
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Create ONE all-day study block per day
    studyPlan.push({
      type: "study",
      topic: topics.map(t => t.topic).join(", "), // show all topics for now
      date: formattedDate,
      allDay: true, // Google Calendar style
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return studyPlan;
}
