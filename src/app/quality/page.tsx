"use client";

import Header from "@/components/layout/Header";
import Badge from "@/components/ui/Badge";
import { complaints, qaForms, satisfactionTrend, complaintsByStatus, complaintsByCategory } from "@/data/quality";
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

const statusColorMap: Record<string, string> = {
  Ouvert: "danger",
  "En cours": "warning",
  Résolu: "success",
  Fermé: "info",
};

const COLORS = ["#E74C3C", "#F39C12", "#10B981", "#4FC3C7"];

export default function QualityPage() {
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [categoryFilter, setCategoryFilter] = useState("Tous");

  const filteredComplaints = complaints.filter((c) => {
    const matchesStatus = statusFilter === "Tous" || c.status === statusFilter;
    const matchesCategory = categoryFilter === "Tous" || c.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const statuses = ["Tous", "Ouvert", "En cours", "Résolu", "Fermé"];
  const categories = ["Tous", ...Object.keys(complaintsByCategory)];

  const unresolved = complaints.filter((c) => c.status === "Ouvert" || c.status === "En cours").length;
  const avgResolutionTime = complaints
    .filter((c) => c.resolution_time !== null)
    .reduce((a, c) => a + (c.resolution_time || 0), 0) /
    complaints.filter((c) => c.resolution_time !== null).length;

  return (
    <div className="min-h-screen bg-background">
      <Header title="Qualité & Réclamations" subtitle="Suivi de la satisfaction et des réclamations" />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Total Réclamations</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{complaints.length}</p>
            <p className="text-xs text-amber-600 mt-1 font-medium">{unresolved} en attente</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Temps Résolution Moyen</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{avgResolutionTime.toFixed(1)} j</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Score Satisfaction</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {(qaForms.reduce((a, q) => a + q.satisfaction, 0) / qaForms.length).toFixed(0)}%
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Éval. Qualité</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {(qaForms.reduce((a, q) => a + q.score, 0) / qaForms.length).toFixed(1)}/20
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Satisfaction Trend */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Tendance Satisfaction</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={satisfactionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Score"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Complaints by Status */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Réclamations par Statut</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={Object.entries(complaintsByStatus).map(([status, count]) => ({
                    name: status,
                    value: count,
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {Object.entries(complaintsByStatus).map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaints by Category */}
        <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Réclamations par Catégorie</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={Object.entries(complaintsByCategory).map(([category, count]) => ({ category, count }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: "#6B7280" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
              <Bar dataKey="count" name="Nombre" fill="#4B3F99" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center bg-white rounded-xl p-4 shadow-card border border-gray-100">
          <span className="text-sm text-gray-500 font-medium">Statut :</span>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                statusFilter === s ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
          <div className="w-px h-5 bg-gray-200" />
          <span className="text-sm text-gray-500 font-medium">Catégorie :</span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                categoryFilter === c ? "bg-secondary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Titre</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Catégorie</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Statut</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Priorité</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Délai</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-3 font-medium text-gray-900">{complaint.title}</td>
                    <td className="px-6 py-3">{complaint.category}</td>
                    <td className="px-6 py-3">
                      <Badge variant={statusColorMap[complaint.status] as any}>
                        {complaint.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3">
                      <Badge
                        variant={
                          complaint.priority === "Haute"
                            ? "danger"
                            : complaint.priority === "Moyenne"
                            ? "warning"
                            : "default"
                        }
                      >
                        {complaint.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600">
                      {complaint.resolution_time ? `${complaint.resolution_time}j` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
