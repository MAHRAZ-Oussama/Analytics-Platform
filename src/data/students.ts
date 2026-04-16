export type CourseType = "Alternance" | "Stage" | "Initial";
export type Gender = "M" | "F";

export interface Student {
  student_id: string;
  first_name: string;
  last_name: string;
  gender: Gender;
  country: string;
  course_type: CourseType;
  promotion_id: string;
  promotion_name: string;
  success_rate: number;
  retake_rate: number;
  failure_rate: number;
  absence_rate: number;
  engagement_score: number;
  churn_score: number;
  year: number;
}

const firstNames = {
  M: ["Alexandre", "Thomas", "Hugo", "Maxime", "Nicolas", "Antoine", "Julien", "Pierre", "Romain", "Kevin", "Mehdi", "Yassine", "Karim", "Théo", "Baptiste"],
  F: ["Camille", "Emma", "Léa", "Chloé", "Manon", "Sophie", "Julie", "Laura", "Sarah", "Amira", "Fatima", "Inès", "Clara", "Alice", "Lucie"],
};
const lastNames = ["Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Simon", "Laurent", "Lefebvre", "Michel", "Moreau", "Durand", "Lefevre", "Benali", "Khalil", "Okonkwo", "Diallo", "Ndiaye", "Mbaye", "Toure"];
const countries = ["France", "France", "France", "France", "France", "France", "Maroc", "Maroc", "Algérie", "Tunisie", "Sénégal", "Côte d'Ivoire", "Espagne", "Portugal", "Cameroun"];
const promotionMap = [
  { id: "P001", name: "BTS SIO SLAM 2024", type: "Alternance" as CourseType },
  { id: "P002", name: "BTS SIO SISR 2024", type: "Initial" as CourseType },
  { id: "P003", name: "Bachelor Cyber 2024", type: "Alternance" as CourseType },
  { id: "P004", name: "Bachelor DevOps 2024", type: "Stage" as CourseType },
  { id: "P005", name: "MSc IA 2024", type: "Alternance" as CourseType },
  { id: "P006", name: "MSc Data Science 2024", type: "Alternance" as CourseType },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateStudent(index: number): Student {
  const r = (offset = 0) => seededRandom(index * 17 + offset);
  const gender: Gender = r(1) > 0.38 ? "M" : "F";
  const firstName = firstNames[gender][Math.floor(r(2) * firstNames[gender].length)];
  const lastName = lastNames[Math.floor(r(3) * lastNames.length)];
  const country = countries[Math.floor(r(4) * countries.length)];
  const promo = promotionMap[Math.floor(r(5) * promotionMap.length)];
  const success_rate = Math.round((60 + r(6) * 40) * 10) / 10;
  const retake_rate = Math.round((r(7) * 30) * 10) / 10;
  const failure_rate = Math.round((r(8) * 20) * 10) / 10;
  const absence_rate = Math.round((r(9) * 25) * 10) / 10;
  const engagement_score = Math.round((40 + r(10) * 60) * 10) / 10;
  const churn_score = Math.round(Math.max(0, Math.min(100, (absence_rate * 2 + failure_rate * 1.5 + (100 - engagement_score) * 0.5) / 4)) * 10) / 10;

  return {
    student_id: `ETU${String(index + 1).padStart(4, "0")}`,
    first_name: firstName,
    last_name: lastName,
    gender,
    country,
    course_type: promo.type,
    promotion_id: promo.id,
    promotion_name: promo.name,
    success_rate,
    retake_rate,
    failure_rate,
    absence_rate,
    engagement_score,
    churn_score,
    year: 2024,
  };
}

export const students: Student[] = Array.from({ length: 120 }, (_, i) => generateStudent(i));

export const genderDistribution = [
  { name: "Hommes", value: students.filter((s) => s.gender === "M").length },
  { name: "Femmes", value: students.filter((s) => s.gender === "F").length },
];

export const countryDistribution = students.reduce<Record<string, number>>((acc, s) => {
  acc[s.country] = (acc[s.country] || 0) + 1;
  return acc;
}, {});

export const countryData = Object.entries(countryDistribution)
  .map(([country, count]) => ({ country, count }))
  .sort((a, b) => b.count - a.count);
