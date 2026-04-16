"use client";

import Header from "@/components/layout/Header";
import Badge from "@/components/ui/Badge";
import { students } from "@/data/students";
import { useState } from "react";
import { Brain, TrendingDown, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis,
} from "recharts";

const CHURN_COLORS = ["#10B981", "#F39C12", "#E74C3C"];

export default function AIInsightsPage() {
  const [sortBy, setSortBy] = useState("churn");

  // Analyze churn risk
  const riskStudents = students
    .map((s) => ({
      ...s,
      riskLevel: s.churn_score > 0.7 ? "Très élevé" : s.churn_score > 0.5 ? "Élevé" : s.churn_score > 0.3 ? "Moyen" : "Faible",
      riskColor:
        s.churn_score > 0.7 ? "danger" : s.churn_score > 0.5 ? "warning" : s.churn_score > 0.3 ? "accent" : "success",
    }))
    .sort((a, b) => {
      if (sortBy === "churn") return b.churn_score - a.churn_score;
      if (sortBy === "success") return a.success_rate - b.success_rate;
      return b.engagement_score - a.engagement_score;
    })
    .slice(0, 15);

  const highRiskCount = students.filter((s) => s.churn_score > 0.7).length;
  const mediumRiskCount = students.filter((s) => s.churn_score > 0.5 && s.churn_score <= 0.7).length;
  const lowRiskCount = students.filter((s) => s.churn_score <= 0.5).length;

  // Scatter data for correlation
  const scatterData = students.slice(0, 50).map((s) => ({
    attendance: 100 - s.absence_rate,
    engagement: s.engagement_score * 10,
    churn: s.churn_score * 100,
    name: `${s.first_name} ${s.last_name}`,
  }));

  // Distribution of churn scores
  const churnDistribution = [
    { range: "0-0.2", count: students.filter((s) => s.churn_score <= 0.2).length },
    { range: "0.2-0.4", count: students.filter((s) => s.churn_score > 0.2 && s.churn_score <= 0.4).length },
    { range: "0.4-0.6", count: students.filter((s) => s.churn_score > 0.4 && s.churn_score <= 0.6).length },
    { range: "0.6-0.8", count: students.filter((s) => s.churn_score > 0.6 && s.churn_score <= 0.8).length },
    { range: "0.8-1.0", count: students.filter((s) => s.churn_score > 0.8).length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header title="IA & Prédictions" subtitle="Analyse prédictive et insights basés sur l'IA" />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Risque Très Élevé</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{highRiskCount}</p>
              </div>
              <AlertTriangle size={20} className="text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Risque Élevé</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{mediumRiskCount}</p>
              </div>
              <TrendingDown size={20} className="text-amber-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Faible Risque</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{lowRiskCount}</p>
              </div>
              <CheckCircle size={20} className="text-emerald-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Score IA Moyen</p>
                <p className="text-2xl font-bold text-primary mt-1">
                  {(students.reduce((a, s) => a + s.churn_score, 0) / students.length * 100).toFixed(0)}%
                </p>
              </div>
              <Brain size={20} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Churn Distribution */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Distribution des Scores de Risque</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={churnDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: "#6B7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
                <Bar dataKey="count" name="Étudiants" fill="#4B3F99" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter: Engagement vs Churn */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Engagement vs Risque Décrochage</h3>
            <ResponsiveContainer width="100%" height={240}>
              <ScatterChart margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis type="number" dataKey="attendance" name="Assiduité %" tick={{ fontSize: 11, fill: "#6B7280" }} />
                <YAxis type="number" dataKey="engagement" name="Engagement" tick={{ fontSize: 11, fill: "#6B7280" }} />
                <ZAxis type="number" dataKey="churn" range={[20, 400]} name="Churn %" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Étudiants" data={scatterData} fill="#4B3F99" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-3">
          <span className="text-sm text-gray-500 font-medium flex items-center">Trier par :</span>
          <button
            onClick={() => setSortBy("churn")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              sortBy === "churn" ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary"
            }`}
          >
            Score Risque
          </button>
          <button
            onClick={() => setSortBy("success")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              sortBy === "success" ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary"
            }`}
          >
            Taux Réussite
          </button>
          <button
            onClick={() => setSortBy("engagement")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              sortBy === "engagement" ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary"
            }`}
          >
            Engagement
          </button>
        </div>

        {/* At-Risk Students Table */}
        <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Étudiant</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Promotion</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Score Risque</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Niveau</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Réussite</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Engagement</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Assiduité</th>
                </tr>
              </thead>
              <tbody>
                {riskStudents.map((student) => (
                  <tr key={student.student_id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {student.first_name} {student.last_name}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-xs">{student.promotion_name}</td>
                    <td className="px-6 py-3 text-center">
                      <span className="font-semibold text-gray-900">{(student.churn_score * 100).toFixed(0)}%</span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <Badge variant={student.riskColor as any}>{student.riskLevel}</Badge>
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600">{student.success_rate.toFixed(1)}%</td>
                    <td className="px-6 py-3 text-center text-gray-600">{(student.engagement_score * 10).toFixed(0)}/10</td>
                    <td className="px-6 py-3 text-center text-gray-600">{(100 - student.absence_rate).toFixed(0)}%</td>
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
