import { useState } from "react";
import { Search, Filter, Dumbbell, Heart, Zap, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WorkoutCard from "@/components/WorkoutCard";

const categories = [
  { id: "all", label: "All", icon: Dumbbell },
  { id: "hiit", label: "HIIT", icon: Zap },
  { id: "strength", label: "Strength", icon: Dumbbell },
  { id: "cardio", label: "Cardio", icon: Heart },
  { id: "recovery", label: "Recovery", icon: Timer },
];

const workouts = [
  {
    id: 1,
    title: "Full Body HIIT",
    duration: "30 min",
    calories: 320,
    exercises: 12,
    difficulty: "Intermediate" as const,
    category: "hiit",
    gradient: "from-primary/30 to-accent/10",
  },
  {
    id: 2,
    title: "Core Crusher",
    duration: "20 min",
    calories: 180,
    exercises: 8,
    difficulty: "Beginner" as const,
    category: "strength",
    gradient: "from-secondary/30 to-primary/10",
  },
  {
    id: 3,
    title: "Upper Body Blast",
    duration: "35 min",
    calories: 280,
    exercises: 10,
    difficulty: "Advanced" as const,
    category: "strength",
    gradient: "from-accent/30 to-secondary/10",
  },
  {
    id: 4,
    title: "Cardio Burn",
    duration: "25 min",
    calories: 350,
    exercises: 6,
    difficulty: "Intermediate" as const,
    category: "cardio",
    gradient: "from-primary/30 to-secondary/10",
  },
  {
    id: 5,
    title: "Leg Day Power",
    duration: "40 min",
    calories: 400,
    exercises: 14,
    difficulty: "Advanced" as const,
    category: "strength",
    gradient: "from-secondary/30 to-accent/10",
  },
  {
    id: 6,
    title: "Stretch & Recover",
    duration: "15 min",
    calories: 80,
    exercises: 10,
    difficulty: "Beginner" as const,
    category: "recovery",
    gradient: "from-accent/20 to-primary/10",
  },
];

const Workouts = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesCategory = activeCategory === "all" || workout.category === activeCategory;
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold mb-2">Workouts</h1>
        <p className="text-muted-foreground">Find your perfect workout</p>
      </header>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search workouts..."
            className="pl-10 bg-card border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="glass" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {categories.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeCategory === id ? "default" : "glass"}
            size="sm"
            className="flex-shrink-0"
            onClick={() => setActiveCategory(id)}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Workouts Grid */}
      <div className="space-y-4">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              title={workout.title}
              duration={workout.duration}
              calories={workout.calories}
              exercises={workout.exercises}
              difficulty={workout.difficulty}
              gradient={workout.gradient}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No workouts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
