"use client";

import Header from "@/components/layout/Header";
import Badge from "@/components/ui/Badge";
import { students } from "@/data/students";
import { useState, useMemo } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Search, Download, ChevronUp, ChevronDown, AlertTriangle, Users } from "lucide-react";
import clsx from "clsx";

const courseVariants: Record<string, string> = {
  Alternance: "success",
  Stage: "warning",
  Initial: "default",
};

const genderLabel: Record<string, string> = { M: "Homme", F: "Femme" };

type SortKey = "last_name" | "success_rate" | "absence_rate" | "churn_score" | "engagement_score";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("Tous");
  const [genderFilter, setGenderFilter] = useState("Tous");
  const [sortKey, setSortKey] = useState<SortKey>("last_name");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const PER_PAGE = 15;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
    setPage(0);
  };

  const filtered = useMemo(() => {
    return students
      .filter((s) => {
        const q = search.toLowerCase();
        const matchSearch = s.last_name.toLowerCase().includes(q) || s.first_name.toLowerCase().includes(q) || s.student_id.toLowerCase().includes(q);
        const matchCourse = courseFilter === "Tous" || s.course_type === courseFilter;
        const matchGender = genderFilter === "Tous" || s.gender === genderFilter;
        return matchSearch && matchCourse && matchGender;
      })
      .sort((a, b) => {
        const va = a[sortKey], vb = b[sortKey];
        if (typeof va === "string" && typeof vb === "string") return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
        return sortAsc ? (va as number) - (vb as number) : (vb as number) - (va as number);
      });
  }, [search, courseFilter, genderFilter, sortKey, sortAsc]);

  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const atRisk = students.filter((s) => s.churn_score > 50).length;

  const exportCSV = () => {
    const header = "ID,Nom,Prénom,Genre,Pays,Parcours,Promotion,Réussite,Absentéisme,Score Décrochage\n";
    const rows = filtered.map((s) =>
      `${s.student_id},"${s.last_name}","${s.first_name}",${genderLabel[s.gender]},${s.country},${s.course_type},"${s.promotion_name}",${s.success_rate}%,${s.absence_rate}%,${s.churn_score}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "students.csv"; a.click();
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ChevronUp size={12} className="text-gray-300" />;
    return sortAsc ? <ChevronUp size={12} className="text-primary" /> : <ChevronDown size={12} className="text-primary" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Étudiants" subtitle={`${students.length} étudiants — Promotion 2024`} />

      <div className="p-6 space-y-6">
        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Étudiants", value: students.length, icon: Users, color: "text-primary bg-primary-50" },
            { label: "À Risque Décrochage", value: atRisk, icon: AlertTriangle, color: "text-red-500 bg-red-50" },
            { label: "Taux Réussite Moyen", value: `${(students.reduce((a, s) => a + s.success_rate, 0) / students.length).toFixed(1)}%`, icon: Users, color: "text-emerald-600 bg-emerald-50" },
            { label: "Absentéisme Moyen", value: `${(students.reduce((a, s) => a + s.absence_rate, 0) / students.length).toFixed(1)}%`, icon: Users, color: "text-amber-600 bg-amber-50" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-card border border-gray-100 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${kpi.color}`}>
                <kpi.icon size={18} />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-xs text-gray-500">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scatter: Engagement vs Churn */}
        <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Engagement vs Score de Décrochage</h3>
          <p className="text-xs text-gray-400 mb-4">Chaque point = un étudiant. Rouge = risque élevé (&gt;50)</p>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis type="number" dataKey="engagement_score" name="Engagement" unit="%" tick={{ fontSize: 12 }} label={{ value: "Engagement (%)", position: "insideBottom", offset: -2, fontSize: 11, fill: "#9CA3AF" }} />
              <YAxis type="number" dataKey="churn_score" name="Décrochage" tick={{ fontSize: 12 }} label={{ value: "Score Décrochage", angle: -90, position: "insideLeft", offset: 10, fontSize: 11, fill: "#9CA3AF" }} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Scatter data={students} fill="#4B3F99">
                {students.map((s, i) => (
                  <Cell key={i} fill={s.churn_score > 50 ? "#E74C3C" : s.churn_score > 30 ? "#F39C12" : "#4B3F99"} fillOpacity={0.7} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-card border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                placeholder="Nom, prénom, ID..."
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            {["Tous", "Alternance", "Stage", "Initial"].map((t) => (
              <button key={t} onClick={() => { setCourseFilter(t); setPage(0); }}
                className={clsx("px-2.5 py-1.5 rounded-lg text-xs font-medium transition",
                  courseFilter === t ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                {t}
              </button>
            ))}
            {["Tous", "M", "F"].map((g) => (
              <button key={g} onClick={() => { setGenderFilter(g); setPage(0); }}
                className={clsx("px-2.5 py-1.5 rounded-lg text-xs font-medium transition",
                  genderFilter === g ? "bg-secondary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                {g === "Tous" ? "Tous" : g === "M" ? "Hommes" : "Femmes"}
              </button>
            ))}
            <button onClick={exportCSV} className="ml-auto flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Download size={14} /> Exporter CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                  <th onClick={() => handleSort("last_name")} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-primary">
                    <div className="flex items-center gap-1">Nom <SortIcon k="last_name" /></div>
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Parcours</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pays</th>
                  <th onClick={() => handleSort("success_rate")} className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-primary">
                    <div className="flex items-center justify-center gap-1">Réussite <SortIcon k="success_rate" /></div>
                  </th>
                  <th onClick={() => handleSort("absence_rate")} className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-primary">
                    <div className="flex items-center justify-center gap-1">Absentéisme <SortIcon k="absence_rate" /></div>
                  </th>
                  <th onClick={() => handleSort("churn_score")} className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-primary">
                    <div className="flex items-center justify-center gap-1">Risque <SortIcon k="churn_score" /></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((s) => (
                  <tr key={s.student_id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">{s.student_id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-primary">{s.first_name[0]}{s.last_name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{s.first_name} {s.last_name}</p>
                          <p className="text-xs text-gray-400">{s.promotion_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={(courseVariants[s.course_type] as any) || "default"}>{s.course_type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{s.country}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={clsx("font-semibold text-sm", s.success_rate >= 80 ? "text-emerald-600" : s.success_rate >= 60 ? "text-amber-600" : "text-red-500")}>
                        {s.success_rate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={clsx("font-medium text-sm", s.absence_rate > 15 ? "text-red-500" : s.absence_rate > 8 ? "text-amber-600" : "text-gray-600")}>
                        {s.absence_rate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                          <div className={`h-1.5 rounded-full ${s.churn_score > 50 ? "bg-red-500" : s.churn_score > 30 ? "bg-amber-400" : "bg-emerald-400"}`}
                            style={{ width: `${s.churn_score}%` }} />
                        </div>
                        <span className={clsx("text-xs font-medium", s.churn_score > 50 ? "text-red-500" : s.churn_score > 30 ? "text-amber-600" : "text-emerald-600")}>
                          {s.churn_score}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">{filtered.length} étudiant{filtered.length > 1 ? "s" : ""} — page {page + 1}/{totalPages}</span>
            <div className="flex gap-1">
              <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition">Préc.</button>
              <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition">Suiv.</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
