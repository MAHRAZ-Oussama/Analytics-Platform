"use client";

import Header from "@/components/layout/Header";
import KPICard from "@/components/ui/KPICard";
import RatingBar from "@/components/ui/RatingBar";
import { Users, TrendingUp, CalendarX, AlertTriangle } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { yearlyEffectifs, successRateByPromotion } from "@/data/promotions";
import { genderDistribution, countryData } from "@/data/students";
import { teachers } from "@/data/pedagogy";
import { useState } from "react";
import Badge from "@/components/ui/Badge";

const PIE_COLORS = ["#4B3F99", "#4FC3C7"];
const COUNTRY_COLORS = ["#4B3F99", "#4FC3C7", "#F39C12", "#E74C3C", "#10B981", "#8B5CF6", "#F59E0B"];

const alerts = [
  { id: 1, type: "danger", message: "Taux d'absentéisme élevé — BTS SISR 2024 (>15%)", date: "Aujourd'hui" },
  { id: 2, type: "warning", message: "Baisse du taux de réussite — BTS SIO SLAM Q1 (-3.2%)", date: "Il y a 2 jours" },
  { id: 3, type: "danger", message: "3 réclamations critiques non résolues", date: "Il y a 3 jours" },
];

export default function DashboardPage() {
  const [yearFilter, setYearFilter] = useState("Tous");
  const [courseFilter, setCourseFilter] = useState("Tous");

  const topTeachers = [...teachers].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Dashboard"
        subtitle="Vue globale — Année académique 2024"
      />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm text-gray-500 font-medium">Filtres :</span>
          {["Tous", "2022", "2023", "2024"].map((y) => (
            <button
              key={y}
              onClick={() => setYearFilter(y)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                yearFilter === y
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {y}
            </button>
          ))}
          <div className="w-px h-5 bg-gray-200" />
          {["Tous", "Alternance", "Initial"].map((t) => (
            <button
              key={t}
              onClick={() => setCourseFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                courseFilter === t
                  ? "bg-secondary text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-secondary hover:text-teal-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Effectif Total"
            value={414}
            unit="étudiants"
            trend={7.5}
            trendLabel="vs 2023"
            icon={Users}
            color="primary"
          />
          <KPICard
            title="Taux de Réussite Moyen"
            value="87.1"
            unit="%"
            trend={2.8}
            trendLabel="vs 2023"
            icon={TrendingUp}
            color="success"
          />
          <KPICard
            title="Nombre de Campus"
            value={13}
            unit="lieux"
            trend={0}
            trendLabel="depuis 1961"
            icon={Users}
            color="accent"
          />
          <KPICard
            title="Formations"
            value={18}
            unit="programmes"
            trend={8}
            trendLabel="depuis 2022"
            icon={TrendingUp}
            color="primary"
          />
          <KPICard
            title="Risque Décrochage"
            value={14}
            unit="étudiants"
            trend={-3}
            trendLabel="prédiction IA"
            icon={AlertTriangle}
            color="alert"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Effectifs par année */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Évolution des Effectifs par Parcours</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={yearlyEffectifs} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="total" name="Total" stroke="#4B3F99" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="alternance" name="Alternance" stroke="#4FC3C7" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="stage" name="Stage" stroke="#F39C12" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="initial" name="Initial" stroke="#E74C3C" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gender pie */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Répartition par Genre</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genderDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {genderDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              {genderDistribution.map((g, i) => (
                <div key={g.name} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-primary' : 'bg-secondary'}`} />
                  <span className="text-xs text-gray-600">{g.name} <strong>{g.value}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Success rate by promo */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Taux de Réussite par Promotion (2024)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={successRateByPromotion} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: "#6B7280" }} unit="%" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} formatter={(v) => [`${v}%`, "Taux"]} />
                <Bar dataKey="taux" name="Taux de réussite" fill="#4B3F99" radius={[4, 4, 0, 0]}>
                  {successRateByPromotion.map((entry, i) => (
                    <Cell key={i} fill={entry.taux >= 90 ? "#10B981" : entry.taux >= 80 ? "#4B3F99" : "#F39C12"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Country distribution */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Répartition par Pays d'Origine</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={countryData.slice(0, 7)} layout="vertical" margin={{ top: 0, right: 20, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis type="category" dataKey="country" tick={{ fontSize: 11, fill: "#6B7280" }} width={60} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
                <Bar dataKey="count" name="Étudiants" radius={[0, 4, 4, 0]}>
                  {countryData.slice(0, 7).map((_, i) => (
                    <Cell key={i} fill={COUNTRY_COLORS[i % COUNTRY_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row: Alerts + Top Teachers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Alerts */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <AlertTriangle size={15} className="text-red-500" />
              Alertes Actives
            </h3>
            <div className="space-y-3">
              {alerts.map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.type === "danger" ? "bg-red-500" : "bg-amber-500"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{a.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.date}</p>
                  </div>
                  <Badge variant={a.type === "danger" ? "danger" : "warning"}>
                    {a.type === "danger" ? "Critique" : "Attention"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Top Teachers */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Top 5 Intervenants</h3>
            <div className="space-y-3">
              {topTeachers.map((t, i) => (
                <div key={t.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700 truncate">{t.name}</p>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="text-amber-400 text-xs">★</span>
                        <span className="text-sm font-semibold text-gray-800">{t.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <RatingBar rating={t.rating} />
                      <span className="text-xs text-gray-400 whitespace-nowrap">{t.specialty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
