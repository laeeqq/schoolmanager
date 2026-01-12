// schedule.js
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  if (!examDate || topics.length === 0) return studyPlan;

  // ─── Parse exam date safely (NO timezone bugs) ───
  const [y, m, d] = examDate.split("-").map(Number);
  const exam = new Date(y, m - 1, d);

  // ─── Start studying 21 days before exam ───
  const DAYS_BEFORE_EXAM = 21;
  const startDate = new Date(exam);
  startDate.setDate(startDate.getDate() - DAYS_BEFORE_EXAM);

  // ─── Build all study days (day before exam, skip weekends) ───
  const days = [];
  const current = new Date(startDate);

  while (current < exam) {
    const dayOfWeek = current.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // skip Sunday & Saturday
      days.push(new Date(current));
    }

    current.setDate(current.getDate() + 1);
  }

  if (days.length === 0) return studyPlan;

  // ─── Map priority to weight ───
  const priorityMap = {
    "High": 3,
    "Medium": 2,
    "Low": 1
  };

  // ─── Expand topics by weight ───
  const weightedTopics = [];
  for (const t of topics) {
    const w = priorityMap[t.priority] ?? 1;
    for (let i = 0; i < w; i++) {
      weightedTopics.push(t.topic);
    }
  }

  if (weightedTopics.length === 0) return studyPlan;

  // ─── Rotate topics evenly across days ───
  let topicIndex = 0;

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const topic = weightedTopics[topicIndex % weightedTopics.length];

    const yyyy = day.getFullYear();
    const mm = String(day.getMonth() + 1).padStart(2, "0");
    const dd = String(day.getDate()).padStart(2, "0");

    studyPlan.push({
      type: "study",
      topic,
      date: `${yyyy}-${mm}-${dd}`,
      allDay: true,
    });

    topicIndex++;
  }

  return studyPlan;
}
