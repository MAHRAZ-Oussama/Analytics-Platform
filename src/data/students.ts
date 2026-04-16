import { promotions } from "./promotions";
import { EPSI_CAMPUSES } from "./constants";

export type CourseType = "Alternance" | "Initial";
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
  campus: string;
  success_rate: number;
  retake_rate: number;
  failure_rate: number;
  absence_rate: number;
  engagement_score: number;
  churn_score: number;
  year: number;
}

const firstNames = {
  M: ["Alexandre", "Thomas", "Hugo", "Maxime", "Nicolas", "Antoine", "Julien", "Pierre", "Romain", "Kevin", "Mehdi", "Yassine", "Karim", "Théo", "Baptiste", "Olivier", "Marc", "Laurent", "David"],
  F: ["Camille", "Emma", "Léa", "Chloé", "Manon", "Sophie", "Julie", "Laura", "Sarah", "Amira", "Fatima", "Inès", "Clara", "Alice", "Lucie", "Marine", "Nathalie", "Isabelle"],
};

const lastNames = ["Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Simon", "Laurent", "Lefebvre", "Michel", "Moreau", "Durand", "Benali", "Khalil", "Okonkwo", "Diallo", "Ndiaye", "Mbaye", "Toure", "Perrin"];

const countries = ["France", "France", "France", "France", "France", "France", "France", "Maroc", "Maroc", "Algérie", "Tunisie", "Sénégal", "Côte d'Ivoire", "Espagne", "Cameroun", "Belgique"];

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
  
  // Assign promotion from actual promotions
  const promo = promotions[Math.floor(r(5) * promotions.length)];
  
  // Assign campus randomly from EPSI campuses
  const campus = EPSI_CAMPUSES[Math.floor(r(6) * EPSI_CAMPUSES.length)];
  
  const success_rate = Math.round((60 + r(7) * 40) * 10) / 10;
  const retake_rate = Math.round((r(8) * 30) * 10) / 10;
  const failure_rate = Math.round((r(9) * 20) * 10) / 10;
  const absence_rate = Math.round((r(10) * 25) * 10) / 10;
  const engagement_score = Math.round((40 + r(11) * 60) * 10) / 10;
  const churn_score = Math.round(Math.max(0, Math.min(100, (absence_rate * 2 + failure_rate * 1.5 + (100 - engagement_score) * 0.5) / 4)) * 10) / 10;

  return {
    student_id: `ETU${String(index + 1).padStart(4, "0")}`,
    first_name: firstName,
    last_name: lastName,
    gender,
    country,
    course_type: promo.course_type,
    promotion_id: promo.promotion_id,
    promotion_name: promo.name,
    campus: campus.name,
    success_rate,
    retake_rate,
    failure_rate,
    absence_rate,
    engagement_score,
    churn_score,
    year: promo.year,
  };
}

// Generate 414 students (2024 enrollment)
export const students: Student[] = Array.from({ length: 414 }, (_, i) => generateStudent(i));

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
