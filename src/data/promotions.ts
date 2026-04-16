import { EPSI_FORMATIONS } from "./constants";

export interface Promotion {
  promotion_id: string;
  name: string;
  year: number;
  students_count: number;
  success_rate: number;
  dropout_rate: number;
  course_type: "Alternance" | "Initial";
  level: "BTS" | "Bac+3" | "Bac+5";
  formation_id: string; // Reference to EPSI_FORMATIONS
  domain: string;
}

export interface HistoricalData {
  promotion_id: string;
  year: number;
  students_count: number;
  success_rate: number;
  dropout_rate: number;
}

// Génération dynamique des promotions à partir des formations réelles
function generatePromotionsFromFormations(year: number): Promotion[] {
  // Filter only formations that have valid promotion levels (BTS, Bac+3, Bac+5)
  const formations = EPSI_FORMATIONS.filter((f) => {
    return f.level === "BTS" || f.level === "Bac+3" || f.level === "Bac+5";
  });
  const promos: Promotion[] = [];
  let idCounter = 1;

  formations.forEach((formation) => {
    // Générer des stats réalistes par année
    const baseStudents: Record<string, number> = {
      F001: 85, // BTS SIO
      F009: 45, // Bac+3 IA
      F010: 52, // Bac+3 Full Stack
      F011: 38, // Bac+3 Admin
      F013: 42, // Bac+5 Cyber
      F014: 35, // Bac+5 IA
      F015: 48, // Bac+5 DevOps
      F016: 28, // Bac+5 Manager
      F017: 41, // Bac+5 Cloud
    };

    const students = baseStudents[formation.id] || 30;
    const yearOffset = 2024 - year;
    const students_count = Math.max(Math.round(students * (1 - yearOffset * 0.05)), 20);

    promos.push({
      promotion_id: `P${String(idCounter++).padStart(3, "0")}`,
      name: `${formation.name} ${year}`,
      year,
      students_count,
      success_rate: Math.round((80 + Math.random() * 20) * 10) / 10,
      dropout_rate: Math.round((3 + Math.random() * 5) * 10) / 10,
      course_type: formation.alternance_available ? "Alternance" : "Initial",
      level: formation.level as "BTS" | "Bac+3" | "Bac+5",
      formation_id: formation.id,
      domain: formation.domain,
    });
  });

  return promos;
}

export const promotions: Promotion[] = [
  ...generatePromotionsFromFormations(2024),
  ...generatePromotionsFromFormations(2023),
  ...generatePromotionsFromFormations(2022),
];

export const historicalData: HistoricalData[] = [
  // BTS SIO
  { promotion_id: "P001", year: 2021, students_count: 72, success_rate: 76.0, dropout_rate: 8.0 },
  { promotion_id: "P001", year: 2022, students_count: 78, success_rate: 78.6, dropout_rate: 7.1 },
  { promotion_id: "P001", year: 2023, students_count: 82, success_rate: 80.0, dropout_rate: 6.7 },
  { promotion_id: "P001", year: 2024, students_count: 85, success_rate: 82.4, dropout_rate: 5.8 },
];

// Total par année académique (tous les cours confondus)
export const yearlyEffectifs = [
  { year: "2022", total: 340, alternance: 185, initial: 155 },
  { year: "2023", total: 385, alternance: 215, initial: 170 },
  { year: "2024", total: 414, alternance: 242, initial: 172 },
];

// Taux de réussite par formation
export const successRateByPromotion = [
  { name: "BTS SIO", taux: 82.4 },
  { name: "Bac+3 IA", taux: 87.2 },
  { name: "Bac+3 Full Stack", taux: 85.6 },
  { name: "Bac+3 Admin", taux: 83.1 },
  { name: "Bac+5 Cyber", taux: 91.7 },
  { name: "Bac+5 IA", taux: 89.3 },
  { name: "Bac+5 DevOps", taux: 88.9 },
  { name: "Bac+5 Cloud", taux: 90.4 },
];
