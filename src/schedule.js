// This is for the logic for scheduling the study plan
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  // Convert exam date string → parts (timezone safe)
  const parts = examDate.split("-");
  const exam = new Date(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2])
  );

  // Minimum study period: 3 weeks
  const DAYS_BEFORE_EXAMS = 21;

  // Create the starting date for the study period
  const startDate = new Date(exam);
  startDate.setDate(startDate.getDate() - DAYS_BEFORE_EXAMS);

  // Expand topics into a queue based on hoursNeeded
  const topicQueue = [];
  for (let i = 0; i < topics.length; i++) {
    for (let h = 0; h < topics[i].hoursNeeded; h++) {
      topicQueue.push(topics[i].topic);
    }
  }

  let topicIndex = 0;
  let currentDate = new Date(startDate);

  // Loop day by day until the day before the exam
  while (currentDate < exam && topicIndex < topicQueue.length) {
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, "0");
    const d = String(currentDate.getDate()).padStart(2, "0");

    studyPlan.push({
      type: "study",
      topic: topicQueue[topicIndex], // ONE topic per day
      date: y + "-" + m + "-" + d,
      allDay: true, // all-day study block
    });

    topicIndex++;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return studyPlan;
}
