"use client";

import Header from "@/components/layout/Header";
import Badge from "@/components/ui/Badge";
import { useState } from "react";
import { Save, Moon, Sun, Bell, Lock, User, LogOut, Database } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [dataRetention, setDataRetention] = useState("2years");
  const [language, setLanguage] = useState("fr");
  const [timezone, setTimezone] = useState("Europe/Paris");

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    alert("Paramètres sauvegardés avec succès!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Paramètres" subtitle="Configuration et préférences utilisateur" />

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <User size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Admin EPSI</p>
              <p className="text-sm text-gray-500">admin@epsi.fr</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="fullname" className="text-sm font-medium text-gray-700 mb-2 block">Nom complet</label>
              <input
                id="fullname"
                type="text"
                placeholder="Votre nom complet"
                defaultValue="Administrateur EPSI"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
              <input
                id="email"
                type="email"
                placeholder="votre.email@epsi.fr"
                defaultValue="admin@epsi.fr"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Téléphone</label>
              <input
                type="tel"
                placeholder="+33 ..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sun size={18} /> Affichage
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon size={16} className="text-primary" /> : <Sun size={16} className="text-amber-500" />}
                <div>
                  <p className="font-medium text-gray-900">Mode sombre</p>
                  <p className="text-xs text-gray-500">Activer le mode nuit</p>
                </div>
              </div>
              <button
                onClick={handleToggleDarkMode}
                title={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
                aria-label={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
                className={`relative w-12 h-6 rounded-full transition ${darkMode ? "bg-primary" : "bg-gray-300"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${darkMode ? "right-1" : "left-1"}`}
                />
              </button>
            </div>

            <div>
              <label htmlFor="language" className="text-sm font-medium text-gray-700 mb-2 block">Langue</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>

            <div>
              <label htmlFor="timezone" className="text-sm font-medium text-gray-700 mb-2 block">Fuseau horaire</label>
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                <option value="Europe/London">Europe/London (UTC+0)</option>
                <option value="America/New_York">America/New_York (UTC-5)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Bell size={18} /> Notifications
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Notifications dans l'app</p>
                <p className="text-xs text-gray-500">Recevoir les alertes en temps réel</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                title={notifications ? "Désactiver les notifications" : "Activer les notifications"}
                aria-label={notifications ? "Désactiver les notifications" : "Activer les notifications"}
                className={`relative w-12 h-6 rounded-full transition ${notifications ? "bg-primary" : "bg-gray-300"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${notifications ? "right-1" : "left-1"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Alertes Email</p>
                <p className="text-xs text-gray-500">Recevoir des emails pour les alertes critiques</p>
              </div>
              <button
                onClick={() => setEmailAlerts(!emailAlerts)}
                title={emailAlerts ? "Désactiver les alertes email" : "Activer les alertes email"}
                aria-label={emailAlerts ? "Désactiver les alertes email" : "Activer les alertes email"}
                className={`relative w-12 h-6 rounded-full transition ${emailAlerts ? "bg-primary" : "bg-gray-300"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${emailAlerts ? "right-1" : "left-1"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Alertes SMS</p>
                <p className="text-xs text-gray-500">Recevoir des SMS pour les alertes urgentes</p>
              </div>
              <button
                onClick={() => setSmsAlerts(!smsAlerts)}
                title={smsAlerts ? "Désactiver les alertes SMS" : "Activer les alertes SMS"}
                aria-label={smsAlerts ? "Désactiver les alertes SMS" : "Activer les alertes SMS"}
                className={`relative w-12 h-6 rounded-full transition ${smsAlerts ? "bg-primary" : "bg-gray-300"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${smsAlerts ? "right-1" : "left-1"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Database size={18} /> Données & Confidentialité
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="dataretention" className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                <Lock size={14} /> Conservation des données
              </label>
              <select
                id="dataretention"
                value={dataRetention}
                onChange={(e) => setDataRetention(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="1year">1 an</option>
                <option value="2years">2 ans (par défaut)</option>
                <option value="3years">3 ans</option>
                <option value="unlimited">Illimité</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Les données personnelles sont supprimées après la période sélectionnée, conformément au RGPD.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Télécharger les données personnelles</p>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                Exporter mes données
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lock size={18} /> Sécurité
          </h3>

          <div className="space-y-3">
            <button className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition text-left">
              Modifier le mot de passe
            </button>
            <button className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition text-left">
              Authentification à deux facteurs
            </button>
            <button className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition text-left">
              Sessions actives
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="text-lg font-semibold text-red-900 mb-4">Zone Dangereuse</h3>

          <div className="space-y-3">
            <button className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition">
              <LogOut size={14} className="inline mr-2" />
              Déconnexion
            </button>
            <button className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition">
              Supprimer le compte
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition"
          >
            <Save size={16} /> Sauvegarder
          </button>
          <button className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
