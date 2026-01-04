// schedule.js
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  // Convert exam date string → parts (timezone safe)
  const parts = examDate.split("-");
  const exam = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));

  // Minimum study period: 3 weeks
  const DAYS_BEFORE_EXAMS = 21;
  const startDate = new Date(exam);
  startDate.setDate(exam.getDate() - DAYS_BEFORE_EXAMS);

  // Total study days
  const totalDays = Math.ceil((exam - startDate) / (1000 * 60 * 60 * 24));

  // Initialize topic trackers
  const topicMap = topics.map(t => ({
    topic: t.topic,
    hoursLeft: t.hoursNeeded
  }));

  // Loop through each day and assign one topic per day
  for (let dayOffset = 0; dayOffset < totalDays; dayOffset++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayOffset);

    // Pick next topic with hours left (rotate)
    const availableTopics = topicMap.filter(t => t.hoursLeft > 0);
    if (availableTopics.length === 0) break; // all done

    const topicIndex = dayOffset % availableTopics.length;
    const currentTopic = availableTopics[topicIndex];

    // Format date YYYY-MM-DD
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, "0");
    const d = String(currentDate.getDate()).padStart(2, "0");

    studyPlan.push({
      type: "study",
      topic: currentTopic.topic,
      date: `${y}-${m}-${d}`,
      allDay: true
    });

    currentTopic.hoursLeft--;
  }

  return studyPlan;
}
