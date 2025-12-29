import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Dumbbell, Home, MessageCircle, TrendingUp, User } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/workouts", icon: Dumbbell, label: "Workouts" },
  { to: "/progress", icon: TrendingUp, label: "Progress" },
  { to: "/coach", icon: MessageCircle, label: "AI Coach" },
  { to: "/profile", icon: User, label: "Profile" },
];

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glow effect */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ background: "var(--gradient-glow)" }}
      />
      
      {/* Main content */}
      <main className="pb-24 relative z-10">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border/50">
        <div className="flex justify-around items-center h-20 max-w-lg mx-auto px-4">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-primary scale-110"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive ? "bg-primary/20 shadow-glow" : ""
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
