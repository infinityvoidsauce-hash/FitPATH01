import { Clock, Flame, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface WorkoutCardProps {
  title: string;
  duration: string;
  calories: number;
  exercises: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  image?: string;
  gradient?: string;
  onStart?: () => void;
}

const difficultyColors = {
  Beginner: "bg-secondary/20 text-secondary",
  Intermediate: "bg-primary/20 text-primary",
  Advanced: "bg-accent/20 text-accent",
};

const WorkoutCard = ({
  title,
  duration,
  calories,
  exercises,
  difficulty,
  gradient = "from-primary/20 to-transparent",
  onStart,
}: WorkoutCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-card border border-border/50 shadow-card group hover:border-primary/30 transition-all duration-300">
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />
      
      <div className="relative p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Flame className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4" />
            <span>{calories} cal</span>
          </div>
          <span>{exercises} exercises</span>
        </div>

        <Button 
          variant="glass" 
          className="w-full justify-between group/btn"
          onClick={onStart}
        >
          Start Workout
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCard;
