import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  gradient?: "primary" | "secondary" | "accent";
}

const gradientClasses = {
  primary: "from-primary/20 to-primary/5",
  secondary: "from-secondary/20 to-secondary/5",
  accent: "from-accent/20 to-accent/5",
};

const iconBgClasses = {
  primary: "bg-primary/20 text-primary",
  secondary: "bg-secondary/20 text-secondary",
  accent: "bg-accent/20 text-accent",
};

const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  gradient = "primary" 
}: StatsCardProps) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradientClasses[gradient]} border border-border/50 p-5 shadow-card`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${iconBgClasses[gradient]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend.positive 
              ? "bg-secondary/20 text-secondary" 
              : "bg-destructive/20 text-destructive"
          }`}>
            {trend.positive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground/70 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
