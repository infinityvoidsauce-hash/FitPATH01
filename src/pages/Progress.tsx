import { useState } from "react";
import { Flame, Target, TrendingUp, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import ProgressRing from "@/components/ProgressRing";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const weeklyData = [
  { day: "Mon", calories: 320, workouts: 1 },
  { day: "Tue", calories: 450, workouts: 2 },
  { day: "Wed", calories: 280, workouts: 1 },
  { day: "Thu", calories: 520, workouts: 2 },
  { day: "Fri", calories: 380, workouts: 1 },
  { day: "Sat", calories: 600, workouts: 2 },
  { day: "Sun", calories: 200, workouts: 1 },
];

const monthlyProgress = [
  { week: "Week 1", weight: 75, strength: 60 },
  { week: "Week 2", weight: 74.5, strength: 65 },
  { week: "Week 3", weight: 74, strength: 70 },
  { week: "Week 4", weight: 73.5, strength: 75 },
];

const achievements = [
  { id: 1, title: "First Workout", description: "Complete your first workout", unlocked: true },
  { id: 2, title: "Week Warrior", description: "7-day streak", unlocked: true },
  { id: 3, title: "Calorie Crusher", description: "Burn 5000 calories", unlocked: true },
  { id: 4, title: "Iron Will", description: "30-day streak", unlocked: false },
  { id: 5, title: "Beast Mode", description: "Complete 100 workouts", unlocked: false },
];

const Progress = () => {
  const [timeframe, setTimeframe] = useState<"week" | "month">("week");

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold mb-2">Progress</h1>
        <p className="text-muted-foreground">Track your fitness journey</p>
      </header>

      {/* Overview Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-card border border-border/50 p-6 shadow-card">
        <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">This Month</p>
            <h2 className="text-3xl font-bold text-gradient-secondary">85%</h2>
            <p className="text-sm text-muted-foreground">Goals completed</p>
            <div className="flex items-center gap-2 text-secondary">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+15% from last month</span>
            </div>
          </div>
          
          <ProgressRing progress={85} size={110}>
            <div className="text-center">
              <Award className="w-6 h-6 text-secondary mx-auto" />
            </div>
          </ProgressRing>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="Total Workouts"
          value="24"
          subtitle="This month"
          icon={Target}
          trend={{ value: 20, positive: true }}
          gradient="primary"
        />
        <StatsCard
          title="Calories Burned"
          value="12,450"
          subtitle="This month"
          icon={Flame}
          gradient="secondary"
        />
      </div>

      {/* Activity Chart */}
      <section className="rounded-2xl bg-gradient-card border border-border/50 p-5 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold">Activity</h3>
          <div className="flex gap-2">
            <Button
              variant={timeframe === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeframe("week")}
            >
              Week
            </Button>
            <Button
              variant={timeframe === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeframe("month")}
            >
              Month
            </Button>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            {timeframe === "week" ? (
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="caloriesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(16 100% 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(16 100% 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 20%)" />
                <XAxis dataKey="day" stroke="hsl(220 10% 60%)" fontSize={12} />
                <YAxis stroke="hsl(220 10% 60%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 18% 12%)",
                    border: "1px solid hsl(220 15% 20%)",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="hsl(16 100% 60%)"
                  strokeWidth={2}
                  fill="url(#caloriesGradient)"
                />
              </AreaChart>
            ) : (
              <LineChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 20%)" />
                <XAxis dataKey="week" stroke="hsl(220 10% 60%)" fontSize={12} />
                <YAxis stroke="hsl(220 10% 60%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 18% 12%)",
                    border: "1px solid hsl(220 15% 20%)",
                    borderRadius: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="strength"
                  stroke="hsl(175 70% 45%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(175 70% 45%)" }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Achievements</h3>
          <span className="text-sm text-muted-foreground">3/5 unlocked</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                achievement.unlocked
                  ? "bg-gradient-card border-primary/30 shadow-glow"
                  : "bg-muted/30 border-border/30 opacity-50"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                achievement.unlocked ? "bg-gradient-primary" : "bg-muted"
              }`}>
                <Award className={`w-5 h-5 ${
                  achievement.unlocked ? "text-primary-foreground" : "text-muted-foreground"
                }`} />
              </div>
              <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Progress;
