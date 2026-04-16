/**
 * Constantes EPSI - Données réelles de l'école
 * Sources: https://www.epsi.fr
 */

// CAMPUS - 13 au total
export const EPSI_CAMPUSES = [
  { id: "CA01", name: "Arras", region: "Hauts-de-France" },
  { id: "CA02", name: "Auxerre", region: "Bourgogne-Franche-Comté" },
  { id: "CA03", name: "Bordeaux", region: "Nouvelle-Aquitaine" },
  { id: "CA04", name: "Chartres", region: "Centre-Val de Loire" },
  { id: "CA05", name: "Grenoble", region: "Auvergne-Rhône-Alpes" },
  { id: "CA06", name: "Lille", region: "Hauts-de-France" },
  { id: "CA07", name: "Lyon", region: "Auvergne-Rhône-Alpes" },
  { id: "CA08", name: "Montpellier", region: "Occitanie" },
  { id: "CA09", name: "Nantes", region: "Pays de la Loire" },
  { id: "CA10", name: "Paris Courbevoie", region: "Île-de-France" },
  { id: "CA11", name: "Rennes", region: "Bretagne" },
  { id: "CA12", name: "Saint-Étienne", region: "Auvergne-Rhône-Alpes" },
  { id: "CA13", name: "Toulouse", region: "Occitanie" },
];

// FORMATIONS - 18 au total (officielles EPSI)
export interface Formation {
  id: string;
  name: string;
  level: "BTS" | "Bac+3" | "Bac+5" | "Court";
  domain: "IA" | "Cybersécurité" | "DevOps" | "Full Stack" | "Cloud" | "Systèmes & Réseaux" | "Data" | "Management" | "Fondamentaux";
  campuses: string[]; // IDs des campus
  alternance_available: boolean;
  description: string;
  year_created?: number;
}

export const EPSI_FORMATIONS: Formation[] = [
  // BTS - Niveau Bac+2
  {
    id: "F001",
    name: "BTS SIO",
    level: "BTS",
    domain: "Fondamentaux",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10"],
    alternance_available: true,
    description: "Services Informatiques aux Organisations - Accessible dès le Bac",
  },

  // Formations courtes / spéciales
  {
    id: "F002",
    name: "Les fondamentaux de l'IT",
    level: "Court",
    domain: "Fondamentaux",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10"],
    alternance_available: false,
    description: "Formation courte aux bases de l'informatique",
  },
  {
    id: "F003",
    name: "Préparation Opérationnelle à l'Emploi (POE)",
    level: "Court",
    domain: "Fondamentaux",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10"],
    alternance_available: false,
    description: "Formation qualifiante pour l'emploi",
  },
  {
    id: "F004",
    name: "Rentrée décalée FAST Track Bac+3",
    level: "Bac+3",
    domain: "Fondamentaux",
    campuses: ["CA10"],
    alternance_available: true,
    description: "Programme intensif - 1 campus",
  },
  {
    id: "F005",
    name: "Rentrée décalée FAST Track Bac+5",
    level: "Bac+5",
    domain: "Fondamentaux",
    campuses: ["CA10"],
    alternance_available: true,
    description: "Programme intensif Master - 1 campus",
  },
  {
    id: "F006",
    name: "VAE EPSI",
    level: "Court",
    domain: "Fondamentaux",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10"],
    alternance_available: false,
    description: "Validation des Acquis de l'Expérience",
  },
  {
    id: "F007",
    name: "Cyb3r Xp",
    level: "Court",
    domain: "Cybersécurité",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10"],
    alternance_available: false,
    description: "Formation courte - Cybersécurité intensif",
  },
  {
    id: "F008",
    name: "IA Xp",
    level: "Court",
    domain: "IA",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10"],
    alternance_available: false,
    description: "Formation courte - IA et Machine Learning",
  },

  // Bac+3
  {
    id: "F009",
    name: "Bac+3 Développeur IA",
    level: "Bac+3",
    domain: "IA",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10"],
    alternance_available: true,
    description: "Développeur spécialisé en IA et Machine Learning",
  },
  {
    id: "F010",
    name: "Bac+3 Développeur Full Stack",
    level: "Bac+3",
    domain: "Full Stack",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10"],
    alternance_available: true,
    description: "Développeur web et applications complètes",
  },
  {
    id: "F011",
    name: "Bac+3 Administrateur Systèmes, Réseaux et Bases de Données",
    level: "Bac+3",
    domain: "Systèmes & Réseaux",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10"],
    alternance_available: true,
    description: "Admin infrastructure - Systèmes, Réseaux et BDD",
  },
  {
    id: "F012",
    name: "AI Developer and Data Science (100% English)",
    level: "Bac+3",
    domain: "Data",
    campuses: ["CA10"],
    alternance_available: true,
    description: "Programme entièrement en anglais - Data Science",
  },

  // Bac+5
  {
    id: "F013",
    name: "Bac+5 Expert Cybersécurité",
    level: "Bac+5",
    domain: "Cybersécurité",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10", "CA11", "CA12"],
    alternance_available: true,
    description: "Expert en cybersécurité et protection des données",
  },
  {
    id: "F014",
    name: "Bac+5 Expert IA et Data Sciences",
    level: "Bac+5",
    domain: "IA",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10", "CA11"],
    alternance_available: true,
    description: "Expert en Intelligence Artificielle et Data Sciences",
  },
  {
    id: "F015",
    name: "Bac+5 Expert DevOps",
    level: "Bac+5",
    domain: "DevOps",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10", "CA11", "CA12", "CA13"],
    alternance_available: true,
    description: "Expert en DevOps et infrastructure cloud",
  },
  {
    id: "F016",
    name: "Bac+5 Manager de la Transformation Digitale",
    level: "Bac+5",
    domain: "Management",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10"],
    alternance_available: true,
    description: "Manager de projets et transformation digitale",
  },
  {
    id: "F017",
    name: "Bac+5 Expert Architecte Virtualisation Cloud",
    level: "Bac+5",
    domain: "Cloud",
    campuses: ["CA01", "CA02", "CA03", "CA04", "CA05", "CA06", "CA07", "CA08", "CA09", "CA10", "CA11", "CA12", "CA13"],
    alternance_available: true,
    description: "Architecte Cloud - Virtualisation et infrastructure",
  },
  {
    id: "F018",
    name: "Expert in Computer Science and Information System – AI Expert Track (100% English)",
    level: "Bac+5",
    domain: "IA",
    campuses: ["CA10"],
    alternance_available: true,
    description: "Programme entièrement en anglais - Expert IA",
  },
];

// Groupes de domaines pour les stats
export const DOMAINS = {
  IA: "Intelligence Artificielle",
  Cybersécurité: "Cybersécurité",
  DevOps: "DevOps & Cloud",
  "Full Stack": "Développement Full Stack",
  Cloud: "Cloud & Infrastructure",
  "Systèmes & Réseaux": "Systèmes & Réseaux",
  Data: "Data Science",
  Management: "Management Digital",
  Fondamentaux: "Fondamentaux IT",
};

// Distribution des étudiants par formation (simulated, 2024)
export const FORMATION_STUDENTS_2024 = {
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

// Mapping promotion name -> formation
export const FORMATION_PROMOTION_MAP: { [key: string]: string } = {
  "BTS SIO 2024": "F001",
  "Bac+3 Développeur IA 2024": "F009",
  "Bac+3 Développeur Full Stack 2024": "F010",
  "Bac+3 Admin Systèmes 2024": "F011",
  "Bac+5 Expert Cybersécurité 2024": "F013",
  "Bac+5 Expert IA 2024": "F014",
  "Bac+5 Expert DevOps 2024": "F015",
  "Bac+5 Manager Digital 2024": "F016",
  "Bac+5 Expert Cloud 2024": "F017",
};
