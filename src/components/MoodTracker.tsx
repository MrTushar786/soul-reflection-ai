import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Calendar,
  Heart,
  Brain,
  Sparkles
} from "lucide-react";

interface MoodTrackerProps {
  onNavigate: (page: string) => void;
}

export function MoodTracker({ onNavigate }: MoodTrackerProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Mock data for demonstration
  const moodData = {
    week: [
      { date: "Mon", mood: "😊", value: 8, energy: 7 },
      { date: "Tue", mood: "😔", value: 4, energy: 5 },
      { date: "Wed", mood: "😰", value: 3, energy: 4 },
      { date: "Thu", mood: "😌", value: 7, energy: 8 },
      { date: "Fri", mood: "😊", value: 9, energy: 8 },
      { date: "Sat", mood: "😴", value: 6, energy: 5 },
      { date: "Sun", mood: "🤔", value: 5, energy: 6 }
    ]
  };

  const patterns = [
    {
      title: "Weekly Pattern",
      description: "You tend to feel lower on Sundays and Wednesdays, possibly due to work anticipation.",
      trend: "down",
      confidence: 87
    },
    {
      title: "Energy Correlation",
      description: "Your mood closely follows your energy levels. Focus on sleep and exercise.",
      trend: "up",
      confidence: 92
    },
    {
      title: "Recovery Time",
      description: "You bounce back from low moods within 24-48 hours, showing good resilience.",
      trend: "up",
      confidence: 78
    }
  ];

  const insights = [
    {
      icon: Brain,
      title: "Cognitive Pattern",
      description: "Journaling on difficult days improves your next-day mood by an average of 2.3 points.",
      actionable: true
    },
    {
      icon: Heart,
      title: "Emotional Trigger",
      description: "Social interactions consistently boost your mood, especially on weekends.",
      actionable: false
    },
    {
      icon: Sparkles,
      title: "Growth Opportunity",
      description: "Your self-awareness has increased 34% since you started tracking. Keep it up!",
      actionable: false
    }
  ];

  const currentWeekAverage = moodData.week.reduce((sum, day) => sum + day.value, 0) / moodData.week.length;
  const lastWeekAverage = 5.8; // Mock previous week data
  const improvementPercentage = ((currentWeekAverage - lastWeekAverage) / lastWeekAverage) * 100;

  return (
    <div className="min-h-screen bg-gradient-healing">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onNavigate("dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Mood Tracker</h1>
              <p className="text-muted-foreground">Understand your emotional patterns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-floating">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week Average</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentWeekAverage.toFixed(1)}/10</div>
              <div className="flex items-center mt-2">
                {improvementPercentage > 0 ? (
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive mr-1" />
                )}
                <span className={`text-xs ${improvementPercentage > 0 ? 'text-success' : 'text-destructive'}`}>
                  {Math.abs(improvementPercentage).toFixed(1)}% from last week
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-floating">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stability Score</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <Progress value={72} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Emotional consistency rating
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-floating">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 days</div>
              <p className="text-xs text-muted-foreground mt-2">
                Consecutive tracking days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mood Timeline */}
        <Card className="shadow-floating">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mood Timeline</CardTitle>
                <CardDescription>Your emotional journey this week</CardDescription>
              </div>
              <div className="flex space-x-2">
                {["week", "month", "3months"].map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? "therapy" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period === "3months" ? "3M" : period}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-4">
                {moodData.week.map((day, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">{day.date}</div>
                    <div className="text-3xl mb-2">{day.mood}</div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Mood</div>
                      <Progress value={day.value * 10} className="h-2" />
                      <div className="text-xs font-medium">{day.value}/10</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Energy</div>
                      <Progress value={day.energy * 10} className="h-2" />
                      <div className="text-xs font-medium">{day.energy}/10</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patterns & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patterns */}
          <Card className="shadow-floating">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Detected Patterns</span>
              </CardTitle>
              <CardDescription>
                AI-identified trends in your emotional data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {patterns.map((pattern, index) => (
                <div key={index} className="p-4 bg-gradient-calm rounded-lg border border-primary/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{pattern.title}</h4>
                    <div className="flex items-center space-x-2">
                      {pattern.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {pattern.confidence}% confident
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{pattern.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="shadow-floating">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-primary" />
                <span>Personalized Insights</span>
              </CardTitle>
              <CardDescription>
                Research-backed recommendations for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-calm rounded-lg flex items-center justify-center flex-shrink-0">
                      <insight.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      {insight.actionable && (
                        <Button variant="calm" size="sm" className="mt-2">
                          Try This
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < insights.length - 1 && <div className="border-b border-border" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-floating border-primary/20 bg-gradient-calm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Ready to improve your patterns?
                </h3>
                <p className="text-primary/80">
                  Based on your data, journaling and talking to the AI therapist could help stabilize your mood.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="therapy" onClick={() => onNavigate("journal")}>
                  Start Journaling
                </Button>
                <Button variant="floating" onClick={() => onNavigate("therapist")}>
                  Talk to AI
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}