export interface Promotion {
  promotion_id: string;
  name: string;
  year: number;
  students_count: number;
  success_rate: number;
  dropout_rate: number;
  course_type: "Alternance" | "Stage" | "Initial";
  level: string;
}

export interface HistoricalData {
  promotion_id: string;
  year: number;
  students_count: number;
  success_rate: number;
  dropout_rate: number;
}

export const promotions: Promotion[] = [
  { promotion_id: "P001", name: "BTS SIO SLAM 2024", year: 2024, students_count: 32, success_rate: 84.4, dropout_rate: 6.2, course_type: "Alternance", level: "BTS" },
  { promotion_id: "P002", name: "BTS SIO SISR 2024", year: 2024, students_count: 28, success_rate: 78.6, dropout_rate: 7.1, course_type: "Initial", level: "BTS" },
  { promotion_id: "P003", name: "Bachelor Cyber 2024", year: 2024, students_count: 24, success_rate: 91.7, dropout_rate: 4.2, course_type: "Alternance", level: "Bachelor" },
  { promotion_id: "P004", name: "Bachelor DevOps 2024", year: 2024, students_count: 22, success_rate: 86.4, dropout_rate: 4.5, course_type: "Stage", level: "Bachelor" },
  { promotion_id: "P005", name: "MSc IA 2024", year: 2024, students_count: 18, success_rate: 94.4, dropout_rate: 5.6, course_type: "Alternance", level: "MSc" },
  { promotion_id: "P006", name: "MSc Data Science 2024", year: 2024, students_count: 20, success_rate: 90.0, dropout_rate: 5.0, course_type: "Alternance", level: "MSc" },
  { promotion_id: "P007", name: "BTS SIO SLAM 2023", year: 2023, students_count: 30, success_rate: 80.0, dropout_rate: 6.7, course_type: "Alternance", level: "BTS" },
  { promotion_id: "P008", name: "BTS SIO SISR 2023", year: 2023, students_count: 26, success_rate: 73.1, dropout_rate: 7.7, course_type: "Initial", level: "BTS" },
  { promotion_id: "P009", name: "Bachelor Cyber 2023", year: 2023, students_count: 22, success_rate: 86.4, dropout_rate: 4.5, course_type: "Alternance", level: "Bachelor" },
  { promotion_id: "P010", name: "Bachelor DevOps 2023", year: 2023, students_count: 20, success_rate: 80.0, dropout_rate: 5.0, course_type: "Stage", level: "Bachelor" },
  { promotion_id: "P011", name: "MSc IA 2023", year: 2023, students_count: 16, success_rate: 87.5, dropout_rate: 6.2, course_type: "Alternance", level: "MSc" },
  { promotion_id: "P012", name: "MSc Data Science 2023", year: 2023, students_count: 18, success_rate: 88.9, dropout_rate: 5.6, course_type: "Alternance", level: "MSc" },
];

export const historicalData: HistoricalData[] = [
  { promotion_id: "P001", year: 2021, students_count: 25, success_rate: 76.0, dropout_rate: 8.0 },
  { promotion_id: "P001", year: 2022, students_count: 28, success_rate: 78.6, dropout_rate: 7.1 },
  { promotion_id: "P001", year: 2023, students_count: 30, success_rate: 80.0, dropout_rate: 6.7 },
  { promotion_id: "P001", year: 2024, students_count: 32, success_rate: 84.4, dropout_rate: 6.2 },
];

export const yearlyEffectifs = [
  { year: "2021", total: 148, alternance: 72, stage: 34, initial: 42 },
  { year: "2022", total: 162, alternance: 81, stage: 37, initial: 44 },
  { year: "2023", total: 182, alternance: 96, stage: 40, initial: 46 },
  { year: "2024", total: 204, alternance: 112, stage: 46, initial: 46 },
];

export const successRateByPromotion = [
  { name: "BTS SLAM", taux: 84.4 },
  { name: "BTS SISR", taux: 78.6 },
  { name: "Bach. Cyber", taux: 91.7 },
  { name: "Bach. DevOps", taux: 86.4 },
  { name: "MSc IA", taux: 94.4 },
  { name: "MSc Data", taux: 90.0 },
];
