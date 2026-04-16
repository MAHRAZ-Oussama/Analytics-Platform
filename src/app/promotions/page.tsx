"use client";

import Header from "@/components/layout/Header";
import Badge from "@/components/ui/Badge";
import { promotions, yearlyEffectifs, successRateByPromotion } from "@/data/promotions";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend,
  LineChart, Line,
} from "recharts";
import { Search, Download, Filter } from "lucide-react";
import clsx from "clsx";

const levelColors: Record<string, string> = {
  BTS: "info",
  Bachelor: "purple",
  MSc: "success",
};

const courseColors: Record<string, string> = {
  Alternance: "success",
  Stage: "warning",
  Initial: "default",
};

export default function PromotionsPage() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("Tous");
  const [courseFilter, setCourseFilter] = useState("Tous");
  const [yearFilter, setYearFilter] = useState("Tous");

  const filtered = promotions.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === "Tous" || p.level === levelFilter;
    const matchCourse = courseFilter === "Tous" || p.course_type === courseFilter;
    const matchYear = yearFilter === "Tous" || String(p.year) === yearFilter;
    return matchSearch && matchLevel && matchCourse && matchYear;
  });

  const exportCSV = () => {
    const header = "ID,Nom,Année,Effectif,Taux Réussite,Taux Décrochage,Parcours,Niveau\n";
    const rows = filtered.map((p) =>
      `${p.promotion_id},"${p.name}",${p.year},${p.students_count},${p.success_rate}%,${p.dropout_rate}%,${p.course_type},${p.level}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "promotions.csv"; a.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Promotions" subtitle="Gestion et suivi des promotions" />

      <div className="p-6 space-y-6">
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Effectifs par Année</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={yearlyEffectifs}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="alternance" name="Alternance" stackId="a" fill="#4FC3C7" />
                <Bar dataKey="stage" name="Stage" stackId="a" fill="#F39C12" />
                <Bar dataKey="initial" name="Initial" stackId="a" fill="#4B3F99" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Taux de Réussite par Promotion (2024)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={successRateByPromotion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} unit="%" tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="taux" name="Réussite" radius={[4, 4, 0, 0]}>
                  {successRateByPromotion.map((e, i) => (
                    <Cell key={i} fill={e.taux >= 90 ? "#10B981" : e.taux >= 80 ? "#4B3F99" : "#F39C12"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters + Table */}
        <div className="bg-white rounded-xl shadow-card border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une promotion..."
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400" />
              {["Tous", "BTS", "Bachelor", "MSc"].map((l) => (
                <button key={l} onClick={() => setLevelFilter(l)}
                  className={clsx("px-2.5 py-1.5 rounded-lg text-xs font-medium transition",
                    levelFilter === l ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}>
                  {l}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {["Tous", "Alternance", "Stage", "Initial"].map((t) => (
                <button key={t} onClick={() => setCourseFilter(t)}
                  className={clsx("px-2.5 py-1.5 rounded-lg text-xs font-medium transition",
                    courseFilter === t ? "bg-secondary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}>
                  {t}
                </button>
              ))}
            </div>

            <button onClick={exportCSV}
              className="ml-auto flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Download size={14} />
              Exporter CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Promotion</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Année</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Niveau</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Parcours</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Effectif</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Réussite</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Décrochage</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.promotion_id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500">{p.year}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={(levelColors[p.level] as any) || "default"}>{p.level}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={(courseColors[p.course_type] as any) || "default"}>{p.course_type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center font-medium">{p.students_count}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={clsx("font-semibold", p.success_rate >= 90 ? "text-emerald-600" : p.success_rate >= 80 ? "text-primary" : "text-amber-600")}>
                        {p.success_rate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={clsx("font-medium", p.dropout_rate >= 7 ? "text-red-500" : "text-gray-600")}>
                        {p.dropout_rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm">Aucune promotion trouvée</div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
            {filtered.length} promotion{filtered.length > 1 ? "s" : ""} affichée{filtered.length > 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
