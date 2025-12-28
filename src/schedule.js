//  This is for the logic for scheduling the study plan

export function generateStudyPlan(examDate, topics){
    const studyPlan = [];

    //convert the exam date to a Date Object
    const exam = new Date(examDate);

    // for now we will go with the minimum study plan date of three weeks 
    const DAYS_BEFORE_EXAMS = 23;

    //create the starting date for the exam period 
    const startDate = new Date(exam);
    startDate.setDate(exam.getDate() - DAYS_BEFORE_EXAMS);

    
}