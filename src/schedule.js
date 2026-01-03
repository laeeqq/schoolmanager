// This is for the logic for scheduling the study plan
export function generateStudyPlan(examDate, topics) {
  const studyPlan = [];

  // Convert exam date to Date object and normalize (remove time)
  const exam = new Date(examDate);
  exam.setHours(0, 0, 0, 0);

  // Number of days to plan before exam (3 weeks)
  const DAYS_BEFORE_EXAMS = 23;

  // Start date for study plan
  const startDate = new Date(exam);
  startDate.setDate(exam.getDate() - DAYS_BEFORE_EXAMS);

  // Compute number of days in the study period
  const totalDays = Math.floor((exam - startDate) / (1000 * 60 * 60 * 24));

  topics.forEach(({ topic, hoursNeeded }) => {
    // Spread hours evenly across all days
    const hoursPerDay = Math.ceil(hoursNeeded / totalDays);

    for (let i = 0; i < totalDays; i++) {
      const studyDay = new Date(startDate);
      studyDay.setDate(startDate.getDate() + i);

      const formattedDate = studyDay.toISOString().split("T")[0];

      // Push a block for this day
      studyPlan.push({
        type: "study",
        topic: topic,
        date: formattedDate,
        startHour: 18, // fixed time for now
        duration: hoursPerDay, // duration per day
      });
    }
  });

  return studyPlan;
}
