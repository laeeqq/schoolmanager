// This is for the logic for scheduling the study plan
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  // Convert the exam date to a Date object
  const exam = new Date(examDate);
  exam.setHours(0, 0, 0, 0); // normalize exam day

  // Study starts 3 weeks before the exam (or as many days as available)
  const DAYS_BEFORE_EXAMS = 21;

  // Create the starting date
  const startDate = new Date(exam);
  startDate.setDate(exam.getDate() - DAYS_BEFORE_EXAMS);

  // Calculate total study days
  const totalDays = Math.ceil((exam - startDate) / (1000 * 60 * 60 * 24));

  let currentDate = new Date(startDate);

  // Expand topics into individual study sessions
  const studyQueue = [];
  topics.forEach((t) => {
    for (let i = 0; i < t.hoursNeeded; i++) {
      studyQueue.push(t.topic);
    }
  });

  // Shuffle topics for rotation across days
  let queueIndex = 0;

  // Determine sessions per day to evenly distribute topics
  const sessionsPerDay = Math.ceil(studyQueue.length / totalDays);

  // Create study blocks PER DAY until exam
  while (currentDate < exam && queueIndex < studyQueue.length) {
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Add multiple study sessions per day
    for (let i = 0; i < sessionsPerDay && queueIndex < studyQueue.length; i++) {
      studyPlan.push({
        type: "study",          // study event
        topic: studyQueue[queueIndex],
        date: formattedDate,
        allDay: true,           // all-day block
      });
      queueIndex++;
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return studyPlan;
}
