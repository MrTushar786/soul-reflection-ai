import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  PenTool, 
  MessageCircle, 
  TrendingUp, 
  Heart, 
  Brain, 
  Calendar,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface User {
  name: string;
  email: string;
}

interface DashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const [currentMood] = useState("🟡 Anxious");
  const [focusTrend] = useState(72);
  const [streakDays] = useState(7);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const quickActions = [
    {
      title: "New Reflection",
      description: "Journal your thoughts and feelings",
      icon: PenTool,
      color: "therapy",
      onClick: () => onNavigate("journal")
    },
    {
      title: "AI Therapist",
      description: "Talk through what's on your mind",
      icon: MessageCircle,
      color: "calm",
      onClick: () => onNavigate("therapist")
    },
    {
      title: "Mood Tracker",
      description: "See your emotional patterns",
      icon: TrendingUp,
      color: "growth",
      onClick: () => onNavigate("mood-tracker")
    },
    {
      title: "Coping Tools",
      description: "Find peace and grounding",
      icon: Heart,
      color: "floating",
      onClick: () => onNavigate("coping-tools")
    }
  ];

  const insights = [
    {
      icon: Brain,
      title: "Pattern Detected",
      description: "You tend to feel low every Sunday evening. This could be related to anticipating the work week.",
      action: "Explore Pattern"
    },
    {
      icon: Sparkles,
      title: "Growth Moment",
      description: "Your confidence has increased 23% since you started regular journaling.",
      action: "View Progress"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-healing">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {getGreeting()}, {user.name} 
                <span className="ml-2">{new Date().getHours() >= 18 ? "🌙" : "☀️"}</span>
              </h1>
              <p className="text-muted-foreground">How are you feeling today?</p>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Quick Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-floating">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Mood</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentMood}</div>
              <p className="text-xs text-muted-foreground">
                Last updated 2 hours ago
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-floating">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Focus Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{focusTrend}%</div>
              <Progress value={focusTrend} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                +12% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-floating">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{streakDays} days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up! You're building healthy habits
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="hover:shadow-glow transition-[all_0.3s_ease] cursor-pointer group"
                onClick={action.onClick}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      action.color === 'therapy' ? 'bg-primary-soft' :
                      action.color === 'calm' ? 'bg-gradient-calm' :
                      action.color === 'growth' ? 'bg-gradient-growth' :
                      'bg-card/90'
                    }`}>
                      <action.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <Card key={index} className="shadow-floating">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-calm rounded-lg flex items-center justify-center">
                      <insight.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {insight.description}
                  </CardDescription>
                  <Button 
                    variant="calm" 
                    size="sm"
                    className="hover:scale-105 transition-all duration-200 cursor-pointer"
                    onClick={() => {
                      if (insight.action === "Explore Pattern") {
                        onNavigate("mood-tracker");
                      } else if (insight.action === "View Progress") {
                        onNavigate("journal");
                      }
                    }}
                  >
                    {insight.action}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Reflection Prompt */}
        <Card className="shadow-floating border-primary/20 bg-gradient-calm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Today's Reflection Prompt
                </h3>
                <p className="text-primary/80 mb-4">
                  "What's one thing you accomplished today that you're proud of, no matter how small?"
                </p>
                <Button variant="therapy" onClick={() => onNavigate("journal")}>
                  Start Reflecting
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}