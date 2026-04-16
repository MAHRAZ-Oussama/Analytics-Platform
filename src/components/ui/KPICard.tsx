import clsx from "clsx";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  color?: "primary" | "secondary" | "accent" | "alert" | "success";
  description?: string;
}

const colorMap = {
  primary: { 
    bg: "bg-gradient-to-br from-[#4B3F99]/5 to-[#4FC3C7]/5", 
    icon: "text-[#4B3F99]", 
    border: "border-[#4B3F99]/10",
    gradient: "from-[#4B3F99]"
  },
  secondary: { 
    bg: "bg-gradient-to-br from-[#4FC3C7]/5 to-teal-100/5", 
    icon: "text-[#4FC3C7]", 
    border: "border-[#4FC3C7]/10",
    gradient: "from-[#4FC3C7]"
  },
  accent: { 
    bg: "bg-gradient-to-br from-[#F39C12]/5 to-amber-100/5", 
    icon: "text-[#F39C12]", 
    border: "border-[#F39C12]/10",
    gradient: "from-[#F39C12]"
  },
  alert: { 
    bg: "bg-gradient-to-br from-[#E74C3C]/5 to-red-100/5", 
    icon: "text-[#E74C3C]", 
    border: "border-[#E74C3C]/10",
    gradient: "from-[#E74C3C]"
  },
  success: { 
    bg: "bg-gradient-to-br from-emerald-100/5 to-emerald-50/5", 
    icon: "text-emerald-500", 
    border: "border-emerald-100/20",
    gradient: "from-emerald-500"
  },
};

export default function KPICard({ title, value, unit, trend, trendLabel, icon: Icon, color = "primary", description }: KPICardProps) {
  const c = colorMap[color];
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <div className={clsx(
      "bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 group",
      c.border,
      c.bg
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={clsx("w-12 h-12 rounded-lg flex items-center justify-center", c.bg, "group-hover:scale-110 transition-transform")}>
          <Icon size={24} className={c.icon} />
        </div>
        {trend !== undefined && (
          <div className={clsx(
            "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full",
            isPositive ? "bg-emerald-100 text-emerald-700" : isNegative ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
          )}>
            {isPositive ? <TrendingUp size={13} /> : isNegative ? <TrendingDown size={13} /> : <Minus size={13} />}
            <span>{trend > 0 ? "+" : ""}{trend}%</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-gray-600 text-sm font-semibold tracking-tight">{title}</p>
        <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {value}
          {unit && <span className="text-lg font-semibold text-gray-500 ml-2">{unit}</span>}
        </p>
        {(description || trendLabel) && (
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">{description || trendLabel}</p>
        )}
      </div>

      {/* Decorative gradient bar */}
      <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={clsx("h-full w-1/3 bg-gradient-to-r to-transparent opacity-60", c.gradient)}></div>
      </div>
    </div>
  );
}
