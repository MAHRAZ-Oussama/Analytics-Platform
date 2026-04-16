"use client";

import Header from "@/components/layout/Header";
import Badge from "@/components/ui/Badge";
import { teachers, modules, gradeDistribution, moduleAvgGrades } from "@/data/pedagogy";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { useState } from "react";
import clsx from "clsx";

const moduleTypeVariants: Record<string, string> = {
  FOAD: "info",
  Présentiel: "purple",
};

export default function PedagogyPage() {
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  const teacher = teachers.find((t) => t.id === selectedTeacher);
  const teacherModules = selectedTeacher ? modules.filter((m) => m.teacher_id === selectedTeacher) : [];

  const radarData = teacher
    ? [
        { subject: "Note", value: (teacher.rating / 5) * 100 },
        { subject: "Satisfaction", value: teacher.satisfaction },
        { subject: "Heures", value: Math.min(100, (teacher.hours / 250) * 100) },
        { subject: "Modules", value: Math.min(100, (teacher.modules_count / 5) * 100) },
      ]
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header title="Pédagogie" subtitle="Modules, intervenants et résultats académiques" />

      <div className="p-6 space-y-6">
        {/* Grade distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Distribution des Notes (toutes promotions)</h3>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="count" name="Étudiants" fill="#4B3F99" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Moyenne par Module</h3>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={moduleAvgGrades} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" domain={[0, 20]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={120} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="moyenne" name="Moyenne" fill="#4FC3C7" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Teachers grid + detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Teachers list */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-card border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">Intervenants</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {teachers.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTeacher(selectedTeacher === t.id ? null : t.id)}
                  className={clsx(
                    "w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition text-left",
                    selectedTeacher === t.id && "bg-primary-50"
                  )}
                >
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">
                      {t.name.split(" ").filter((w) => w !== "Prof.").map((w) => w[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.specialty} · {t.modules_count} modules · {t.hours}h</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 text-sm">★</span>
                        <span className="text-sm font-bold text-gray-800">{t.rating}</span>
                      </div>
                      <p className="text-xs text-gray-400">Satisfaction {t.satisfaction}%</p>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Teacher detail */}
          <div className="bg-white rounded-xl shadow-card border border-gray-100">
            {teacher ? (
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {teacher.name.split(" ").filter((w) => w !== "Prof.").map((w) => w[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{teacher.name}</p>
                    <p className="text-xs text-gray-500">{teacher.specialty}</p>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={180}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#F1F5F9" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar name={teacher.name} dataKey="value" stroke="#4B3F99" fill="#4B3F99" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Modules enseignés</p>
                  <div className="space-y-2">
                    {teacherModules.map((m) => (
                      <div key={m.module_id} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50">
                        <div>
                          <p className="text-xs font-medium text-gray-700">{m.module_name}</p>
                          <p className="text-xs text-gray-400">{m.hours}h · Moy. {m.avg_grade}/20</p>
                        </div>
                        <Badge variant={(moduleTypeVariants[m.type] as any) || "default"}>{m.type}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <span className="text-2xl">👆</span>
                </div>
                <p className="text-sm text-gray-500">Sélectionnez un intervenant pour voir son profil détaillé</p>
              </div>
            )}
          </div>
        </div>

        {/* Modules table */}
        <div className="bg-white rounded-xl shadow-card border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Catalogue des Modules</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Module</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Heures</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Intervenant</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Moyenne</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Taux Réussite</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((m) => {
                  const t = teachers.find((t) => t.id === m.teacher_id);
                  return (
                    <tr key={m.module_id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium text-gray-800">{m.module_name}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={(moduleTypeVariants[m.type] as any) || "default"}>{m.type}</Badge>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">{m.hours}h</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{t?.name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={clsx("font-semibold", m.avg_grade >= 14 ? "text-emerald-600" : m.avg_grade >= 12 ? "text-primary" : "text-amber-600")}>
                          {m.avg_grade}/20
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                            <div className="h-1.5 rounded-full bg-primary" style={{ width: `${m.pass_rate}%` }} />
                          </div>
                          <span className="text-xs font-medium text-gray-700">{m.pass_rate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
