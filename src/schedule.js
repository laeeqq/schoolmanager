// This is for the logic for scheduling the study plan
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  // Convert the exam date to a Date object
  const exam = new Date(examDate);

  // For now we will go with the minimum study plan date of three weeks
  const DAYS_BEFORE_EXAMS = 23;

  // Create the starting date for the study period
  const startDate = new Date(exam);
  startDate.setDate(exam.getDate() - DAYS_BEFORE_EXAMS);

  let currentDate = new Date(startDate);

  topics.forEach((topicObj) => {
    const { topic, hoursNeeded } = topicObj; // fixed variable name

    for (let i = 0; i < hoursNeeded; i++) {
      const formatDate = currentDate.toISOString().split("T")[0];

      studyPlan.push({
        type: "study",
        topic: topic, 
        date: formatDate,
        startHour: 18, // fixed time for now
        duration: 1,
      });

      currentDate.setDate(currentDate.getDate() + 1); // move to next day

      if (currentDate >= exam) {
        break;
      }
    }
  });

  return studyPlan;
}
