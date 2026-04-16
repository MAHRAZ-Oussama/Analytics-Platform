import clsx from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "purple";

const variantMap: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-600",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-teal-100 text-teal-700",
  purple: "bg-primary-50 text-primary",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", variantMap[variant], className)}>
      {children}
    </span>
  );
}
