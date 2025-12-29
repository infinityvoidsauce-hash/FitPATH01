import { useState } from "react";
import { 
  User, 
  Settings, 
  Bell, 
  Target, 
  Calendar, 
  Award,
  ChevronRight,
  Moon,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import ProgressRing from "@/components/ProgressRing";

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const stats = [
    { label: "Workouts", value: "124" },
    { label: "Hours", value: "86" },
    { label: "Streak", value: "5" },
  ];

  const menuItems = [
    { icon: Target, label: "Fitness Goals", subtitle: "Weight loss, muscle gain" },
    { icon: Calendar, label: "Workout Schedule", subtitle: "5 days per week" },
    { icon: Award, label: "Achievements", subtitle: "12 badges earned" },
    { icon: Bell, label: "Notifications", hasToggle: true },
    { icon: Moon, label: "Dark Mode", hasToggle: true },
    { icon: Settings, label: "Settings", subtitle: "Account, privacy" },
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Profile Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-card border border-border/50 p-6 shadow-card text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        
        <div className="relative">
          <div className="relative inline-block mb-4">
            <ProgressRing progress={78} size={120}>
              <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-3xl font-bold text-primary-foreground">JD</span>
              </div>
            </ProgressRing>
          </div>
          
          <h1 className="text-xl font-bold mb-1">John Doe</h1>
          <p className="text-muted-foreground text-sm mb-4">Premium Member</p>
          
          <div className="flex justify-center gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-gradient-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Plan */}
      <section className="rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
            <h3 className="font-bold">12-Week Body Transformation</h3>
            <p className="text-sm text-secondary mt-1">Week 5 of 12 • 42% complete</p>
          </div>
          <div className="w-16 h-16">
            <ProgressRing progress={42} size={64} strokeWidth={6}>
              <span className="text-xs font-bold">42%</span>
            </ProgressRing>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">{item.label}</p>
                {item.subtitle && (
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                )}
              </div>
            </div>
            
            {item.hasToggle ? (
              <Switch 
                checked={item.label === "Notifications" ? notifications : darkMode}
                onCheckedChange={item.label === "Notifications" ? setNotifications : setDarkMode}
              />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        ))}
      </section>

      {/* Logout */}
      <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>
    </div>
  );
};

export default Profile;
