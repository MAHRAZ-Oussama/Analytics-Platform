export interface Teacher {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  modules_count: number;
  hours: number;
  satisfaction: number;
}

export interface Module {
  module_id: string;
  module_name: string;
  hours: number;
  type: "FOAD" | "Présentiel";
  teacher_id: string;
  promotion_id: string;
  avg_grade: number;
  pass_rate: number;
}

export interface Grade {
  student_id: string;
  module_id: string;
  module: string;
  grade: number;
}

export const teachers: Teacher[] = [
  { id: "T001", name: "Prof. Marie Dupont", specialty: "Cybersécurité", rating: 4.8, modules_count: 3, hours: 180, satisfaction: 92 },
  { id: "T002", name: "Prof. Jean-Paul Martin", specialty: "Développement Web", rating: 4.6, modules_count: 4, hours: 210, satisfaction: 88 },
  { id: "T003", name: "Prof. Sophie Lefebvre", specialty: "Data Science", rating: 4.9, modules_count: 2, hours: 120, satisfaction: 95 },
  { id: "T004", name: "Prof. Karim Benali", specialty: "DevOps / Cloud", rating: 4.7, modules_count: 3, hours: 160, satisfaction: 91 },
  { id: "T005", name: "Prof. Claire Morel", specialty: "Réseaux & Systèmes", rating: 4.4, modules_count: 4, hours: 200, satisfaction: 84 },
  { id: "T006", name: "Prof. Antoine Dubois", specialty: "Intelligence Artificielle", rating: 4.8, modules_count: 3, hours: 150, satisfaction: 93 },
  { id: "T007", name: "Prof. Fatima Zahra", specialty: "Gestion de Projet", rating: 4.3, modules_count: 2, hours: 80, satisfaction: 82 },
  { id: "T008", name: "Prof. Pierre Richard", specialty: "Base de Données", rating: 4.5, modules_count: 3, hours: 140, satisfaction: 86 },
  { id: "T009", name: "Prof. Isabelle Blanc", specialty: "UX/UI Design", rating: 4.7, modules_count: 2, hours: 100, satisfaction: 90 },
  { id: "T010", name: "Prof. Nicolas Petit", specialty: "Virtualisation", rating: 4.2, modules_count: 3, hours: 130, satisfaction: 80 },
];

export const modules: Module[] = [
  { module_id: "M001", module_name: "Sécurité des Systèmes", hours: 60, type: "Présentiel", teacher_id: "T001", promotion_id: "P003", avg_grade: 13.2, pass_rate: 88 },
  { module_id: "M002", module_name: "Cryptographie Appliquée", hours: 40, type: "Présentiel", teacher_id: "T001", promotion_id: "P003", avg_grade: 12.8, pass_rate: 82 },
  { module_id: "M003", module_name: "Développement React", hours: 60, type: "FOAD", teacher_id: "T002", promotion_id: "P001", avg_grade: 14.1, pass_rate: 91 },
  { module_id: "M004", module_name: "Node.js & API REST", hours: 50, type: "Présentiel", teacher_id: "T002", promotion_id: "P001", avg_grade: 13.5, pass_rate: 87 },
  { module_id: "M005", module_name: "Machine Learning", hours: 60, type: "Présentiel", teacher_id: "T003", promotion_id: "P005", avg_grade: 14.8, pass_rate: 94 },
  { module_id: "M006", module_name: "Big Data & Spark", hours: 40, type: "FOAD", teacher_id: "T003", promotion_id: "P006", avg_grade: 13.9, pass_rate: 89 },
  { module_id: "M007", module_name: "Docker & Kubernetes", hours: 50, type: "Présentiel", teacher_id: "T004", promotion_id: "P004", avg_grade: 13.6, pass_rate: 86 },
  { module_id: "M008", module_name: "CI/CD Pipeline", hours: 40, type: "FOAD", teacher_id: "T004", promotion_id: "P004", avg_grade: 13.0, pass_rate: 83 },
  { module_id: "M009", module_name: "Administration Linux", hours: 60, type: "Présentiel", teacher_id: "T005", promotion_id: "P002", avg_grade: 12.5, pass_rate: 79 },
  { module_id: "M010", module_name: "Réseaux TCP/IP", hours: 50, type: "Présentiel", teacher_id: "T005", promotion_id: "P002", avg_grade: 12.1, pass_rate: 76 },
  { module_id: "M011", module_name: "Deep Learning", hours: 50, type: "Présentiel", teacher_id: "T006", promotion_id: "P005", avg_grade: 14.5, pass_rate: 92 },
  { module_id: "M012", module_name: "NLP & Transformers", hours: 40, type: "FOAD", teacher_id: "T006", promotion_id: "P006", avg_grade: 14.2, pass_rate: 90 },
  { module_id: "M013", module_name: "Gestion Agile", hours: 30, type: "FOAD", teacher_id: "T007", promotion_id: "P001", avg_grade: 13.8, pass_rate: 92 },
  { module_id: "M014", module_name: "SQL Avancé", hours: 50, type: "Présentiel", teacher_id: "T008", promotion_id: "P001", avg_grade: 13.4, pass_rate: 85 },
  { module_id: "M015", module_name: "NoSQL & MongoDB", hours: 40, type: "Présentiel", teacher_id: "T008", promotion_id: "P006", avg_grade: 13.7, pass_rate: 88 },
];

export const gradeDistribution = [
  { range: "0-6", count: 8 },
  { range: "6-8", count: 12 },
  { range: "8-10", count: 18 },
  { range: "10-12", count: 35 },
  { range: "12-14", count: 48 },
  { range: "14-16", count: 42 },
  { range: "16-18", count: 25 },
  { range: "18-20", count: 12 },
];

export const moduleAvgGrades = modules.map((m) => ({
  name: m.module_name.length > 18 ? m.module_name.substring(0, 18) + "…" : m.module_name,
  moyenne: m.avg_grade,
  taux: m.pass_rate,
}));
