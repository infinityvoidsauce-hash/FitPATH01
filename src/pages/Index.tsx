import { Flame, Target, Timer, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import WorkoutCard from "@/components/WorkoutCard";
import ProgressRing from "@/components/ProgressRing";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const dailyGoal = 75;

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Good morning</p>
          <h1 className="text-2xl font-bold">Let's Crush It! 💪</h1>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
          <span className="text-lg font-bold text-primary-foreground">JD</span>
        </div>
      </header>

      {/* Daily Progress */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-card border border-border/50 p-6 shadow-card">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Daily Goal</p>
              <h2 className="text-3xl font-bold">
                <span className="text-gradient-primary">{dailyGoal}%</span>
                <span className="text-lg text-muted-foreground ml-2">completed</span>
              </h2>
            </div>
            <Button onClick={() => navigate("/workouts")}>
              <Zap className="w-4 h-4" />
              Continue Workout
            </Button>
          </div>
          
          <ProgressRing progress={dailyGoal} size={130}>
            <div className="text-center">
              <Flame className="w-8 h-8 text-primary mx-auto animate-pulse-glow rounded-full" />
              <p className="text-xs text-muted-foreground mt-1">On Fire!</p>
            </div>
          </ProgressRing>
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <h2 className="text-lg font-bold mb-4">Today's Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            title="Calories Burned"
            value="486"
            subtitle="Goal: 600"
            icon={Flame}
            trend={{ value: 12, positive: true }}
            gradient="primary"
          />
          <StatsCard
            title="Active Minutes"
            value="45"
            subtitle="Goal: 60"
            icon={Timer}
            gradient="secondary"
          />
          <StatsCard
            title="Workouts Done"
            value="2"
            subtitle="This week: 8"
            icon={Target}
            gradient="accent"
          />
          <StatsCard
            title="Weekly Streak"
            value="5 days"
            subtitle="Best: 14 days"
            icon={TrendingUp}
            trend={{ value: 25, positive: true }}
            gradient="primary"
          />
        </div>
      </section>

      {/* Recommended Workouts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recommended For You</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate("/workouts")}>
            See all
          </Button>
        </div>
        <div className="space-y-4">
          <WorkoutCard
            title="Full Body HIIT"
            duration="30 min"
            calories={320}
            exercises={12}
            difficulty="Intermediate"
            gradient="from-primary/30 to-accent/10"
            onStart={() => navigate("/workouts")}
          />
          <WorkoutCard
            title="Core Crusher"
            duration="20 min"
            calories={180}
            exercises={8}
            difficulty="Beginner"
            gradient="from-secondary/30 to-primary/10"
            onStart={() => navigate("/workouts")}
          />
        </div>
      </section>

      {/* AI Coach Prompt */}
      <section 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 p-6 cursor-pointer hover:border-primary/50 transition-all duration-300"
        onClick={() => navigate("/coach")}
      >
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-bold">AI Coach Available</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Get personalized workout advice, form tips, and motivation from your AI fitness coach.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
