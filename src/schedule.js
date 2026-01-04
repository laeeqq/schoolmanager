// schedule.js
// Generates a study plan with 1 block per day, rotating topics and respecting hours needed
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  // Convert exam date string → parts (timezone safe)
  const parts = examDate.split("-");
  const exam = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));

  // Minimum study period: 3 weeks
  const DAYS_BEFORE_EXAMS = 21;
  const startDate = new Date(exam);
  startDate.setDate(exam.getDate() - DAYS_BEFORE_EXAMS);

  // Expand topics into "remaining hours" list
  const topicQueue = topics.map(t => ({ topic: t.topic, hoursLeft: t.hoursNeeded }));

  let currentDate = new Date(startDate);
  let topicIndex = 0;

  // Loop day by day until exam
  while (currentDate < exam && topicQueue.some(t => t.hoursLeft > 0)) {
    // Find next topic with hours left
    let tries = 0;
    while (topicQueue[topicIndex].hoursLeft === 0 && tries < topicQueue.length) {
      topicIndex = (topicIndex + 1) % topicQueue.length;
      tries++;
    }

    const currentTopic = topicQueue[topicIndex];
    if (currentTopic.hoursLeft > 0) {
      // Format date YYYY-MM-DD
      const y = currentDate.getFullYear();
      const m = String(currentDate.getMonth() + 1).padStart(2, "0");
      const d = String(currentDate.getDate()).padStart(2, "0");

      studyPlan.push({
        type: "study",
        topic: currentTopic.topic,
        date: y + "-" + m + "-" + d,
        allDay: true,
      });

      currentTopic.hoursLeft--; // reduce remaining hours
      topicIndex = (topicIndex + 1) % topicQueue.length; // rotate to next topic
    }

    // Next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return studyPlan;
}
