export type ComplaintStatus = "Ouvert" | "En cours" | "Résolu" | "Fermé";
export type QAFormType = "Stage" | "Projet" | "Alternance" | "Cours";

export interface Complaint {
  id: string;
  title: string;
  category: string;
  status: ComplaintStatus;
  date: string;
  resolution_time: number | null;
  priority: "Haute" | "Moyenne" | "Basse";
  promotion: string;
}

export interface QAForm {
  id: string;
  type: QAFormType;
  respondent: string;
  score: number;
  satisfaction: number;
  feedback: string;
  date: string;
  promotion: string;
}

export const complaints: Complaint[] = [
  { id: "REC001", title: "Accès plateforme e-learning indisponible", category: "Technique", status: "Résolu", date: "2024-03-12", resolution_time: 2, priority: "Haute", promotion: "BTS SIO SLAM 2024" },
  { id: "REC002", title: "Retard dans la correction des examens", category: "Pédagogique", status: "En cours", date: "2024-03-18", resolution_time: null, priority: "Moyenne", promotion: "Bachelor Cyber 2024" },
  { id: "REC003", title: "Problème de planning cours", category: "Organisationnel", status: "Résolu", date: "2024-02-28", resolution_time: 4, priority: "Moyenne", promotion: "MSc IA 2024" },
  { id: "REC004", title: "Matériel de TP défaillant", category: "Infrastructure", status: "Ouvert", date: "2024-04-02", resolution_time: null, priority: "Haute", promotion: "BTS SIO SISR 2024" },
  { id: "REC005", title: "Conflit horaire alternance", category: "Organisationnel", status: "Résolu", date: "2024-01-15", resolution_time: 3, priority: "Haute", promotion: "Bachelor DevOps 2024" },
  { id: "REC006", title: "Ressources pédagogiques insuffisantes", category: "Pédagogique", status: "En cours", date: "2024-03-25", resolution_time: null, priority: "Basse", promotion: "MSc Data Science 2024" },
  { id: "REC007", title: "Absence non justifiée d'un intervenant", category: "Pédagogique", status: "Fermé", date: "2024-02-10", resolution_time: 1, priority: "Haute", promotion: "BTS SIO SLAM 2024" },
  { id: "REC008", title: "Problème de chauffage en salle 204", category: "Infrastructure", status: "Résolu", date: "2024-03-05", resolution_time: 5, priority: "Basse", promotion: "Bachelor Cyber 2024" },
  { id: "REC009", title: "Retard paiement bourse alternance", category: "Administratif", status: "Résolu", date: "2024-02-20", resolution_time: 8, priority: "Haute", promotion: "MSc IA 2024" },
  { id: "REC010", title: "Erreur dans le bulletin de notes", category: "Administratif", status: "Ouvert", date: "2024-04-08", resolution_time: null, priority: "Haute", promotion: "Bachelor DevOps 2024" },
  { id: "REC011", title: "WiFi instable en amphi A", category: "Technique", status: "En cours", date: "2024-04-10", resolution_time: null, priority: "Moyenne", promotion: "MSc Data Science 2024" },
  { id: "REC012", title: "Cours en retard sur le programme", category: "Pédagogique", status: "Fermé", date: "2024-01-28", resolution_time: 6, priority: "Moyenne", promotion: "BTS SIO SISR 2024" },
];

export const qaForms: QAForm[] = [
  { id: "QA001", type: "Stage", respondent: "Entreprise ABC", score: 17, satisfaction: 88, feedback: "Étudiant très investi, bonne maîtrise technique.", date: "2024-03-30", promotion: "BTS SIO SLAM 2024" },
  { id: "QA002", type: "Alternance", respondent: "TechCorp SAS", score: 16, satisfaction: 84, feedback: "Progression rapide, autonomie appréciée.", date: "2024-03-28", promotion: "Bachelor Cyber 2024" },
  { id: "QA003", type: "Projet", respondent: "Équipe DevOps", score: 15, satisfaction: 80, feedback: "Travail collaboratif bien géré.", date: "2024-04-01", promotion: "Bachelor DevOps 2024" },
  { id: "QA004", type: "Cours", respondent: "Promotion MSc IA", score: 18, satisfaction: 95, feedback: "Excellents contenus, formateur très pédagogue.", date: "2024-04-05", promotion: "MSc IA 2024" },
  { id: "QA005", type: "Stage", respondent: "StartupX", score: 14, satisfaction: 72, feedback: "Quelques lacunes en communication écrite.", date: "2024-03-25", promotion: "BTS SIO SISR 2024" },
  { id: "QA006", type: "Alternance", respondent: "DataLab SA", score: 17, satisfaction: 91, feedback: "Très bonne intégration en équipe.", date: "2024-04-02", promotion: "MSc Data Science 2024" },
  { id: "QA007", type: "Cours", respondent: "Promotion Bach. Cyber", score: 16, satisfaction: 86, feedback: "Contenu riche, rythme parfois soutenu.", date: "2024-04-08", promotion: "Bachelor Cyber 2024" },
  { id: "QA008", type: "Projet", respondent: "Équipe IA", score: 18, satisfaction: 94, feedback: "Innovation remarquable dans le projet final.", date: "2024-04-10", promotion: "MSc IA 2024" },
];

export const complaintsByCategory = complaints.reduce<Record<string, number>>((acc, c) => {
  acc[c.category] = (acc[c.category] || 0) + 1;
  return acc;
}, {});

export const complaintsByStatus = complaints.reduce<Record<string, number>>((acc, c) => {
  acc[c.status] = (acc[c.status] || 0) + 1;
  return acc;
}, {});

export const satisfactionTrend = [
  { month: "Nov", score: 78 },
  { month: "Déc", score: 81 },
  { month: "Jan", score: 79 },
  { month: "Fév", score: 83 },
  { month: "Mar", score: 86 },
  { month: "Avr", score: 88 },
];
