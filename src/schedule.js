// This is for the logic for scheduling the study plan
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  // Convert the exam date STRING into a LOCAL Date object (NO timezone shift)
  const parts = examDate.split("-");
  const exam = new Date(
    Number(parts[0]),        // year
    Number(parts[1]) - 1,    // month (0-indexed)
    Number(parts[2])         // day
  );

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
    // Format date as YYYY-MM-DD (LOCAL, not UTC)
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, "0");
    const d = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${y}-${m}-${d}`;

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
