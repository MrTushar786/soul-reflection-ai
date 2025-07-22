import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw,
  Heart,
  Wind,
  Brain,
  Sparkles,
  Volume2,
  VolumeX
} from "lucide-react";

interface CopingToolsProps {
  onNavigate: (page: string) => void;
}

export function CopingTools({ onNavigate }: CopingToolsProps) {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale" | "pause">("inhale");
  const [breathingCycle, setBreathingCycle] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const breathingExercises = [
    {
      id: "box",
      name: "Box Breathing",
      description: "4-4-4-4 pattern for calm focus",
      pattern: [4, 4, 4, 4], // inhale, hold, exhale, pause
      totalCycles: 8,
      color: "primary"
    },
    {
      id: "calm",
      name: "4-7-8 Calming",
      description: "Deep relaxation technique",
      pattern: [4, 7, 8, 0],
      totalCycles: 6,
      color: "success"
    },
    {
      id: "energize",
      name: "Quick Energizer",
      description: "2-2-2 for quick energy boost",
      pattern: [2, 2, 2, 0],
      totalCycles: 10,
      color: "accent"
    }
  ];

  const affirmations = [
    "I am capable of handling whatever comes my way.",
    "This feeling is temporary, and I will get through it.",
    "I choose peace over worry.",
    "I am worthy of love and respect.",
    "Every breath I take calms my mind and body.",
    "I trust in my ability to navigate challenges.",
    "I am present, grounded, and safe.",
    "My thoughts do not define me; I am in control."
  ];

  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  const copingStrategies = [
    {
      title: "5-4-3-2-1 Grounding",
      description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
      icon: Brain,
      action: "Try Now",
      category: "Mindfulness"
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and release muscle groups to reduce physical tension",
      icon: Heart,
      action: "Start Session",
      category: "Physical"
    },
    {
      title: "Cognitive Reframing",
      description: "Challenge negative thoughts with balanced perspectives",
      icon: Sparkles,
      action: "Learn More",
      category: "Cognitive"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && activeExercise) {
      const exercise = breathingExercises.find(ex => ex.id === activeExercise);
      if (!exercise) return;

      interval = setInterval(() => {
        setBreathingTimer(prev => {
          const currentPattern = exercise.pattern;
          let phaseIndex = 0;
          let totalTime = 0;
          
          // Determine current phase
          for (let i = 0; i < currentPattern.length; i++) {
            if (prev < totalTime + currentPattern[i]) {
              phaseIndex = i;
              break;
            }
            totalTime += currentPattern[i];
          }
          
          const phases: ("inhale" | "hold" | "exhale" | "pause")[] = ["inhale", "hold", "exhale", "pause"];
          setBreathingPhase(phases[phaseIndex]);
          
          const cycleTime = currentPattern.reduce((a, b) => a + b, 0);
          
          if (prev >= cycleTime - 1) {
            setBreathingCycle(cycle => {
              if (cycle >= exercise.totalCycles - 1) {
                setIsPlaying(false);
                setActiveExercise(null);
                return 0;
              }
              return cycle + 1;
            });
            return 0;
          }
          
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeExercise, breathingExercises]);

  const startBreathingExercise = (exerciseId: string) => {
    if (activeExercise === exerciseId && isPlaying) {
      setIsPlaying(false);
    } else {
      setActiveExercise(exerciseId);
      setBreathingTimer(0);
      setBreathingCycle(0);
      setBreathingPhase("inhale");
      setIsPlaying(true);
    }
  };

  const resetBreathingExercise = () => {
    setIsPlaying(false);
    setActiveExercise(null);
    setBreathingTimer(0);
    setBreathingCycle(0);
    setBreathingPhase("inhale");
  };

  const getPhaseInstruction = () => {
    switch (breathingPhase) {
      case "inhale": return "Breathe In";
      case "hold": return "Hold";
      case "exhale": return "Breathe Out";
      case "pause": return "Pause";
    }
  };

  const getPhaseColor = () => {
    switch (breathingPhase) {
      case "inhale": return "text-primary";
      case "hold": return "text-accent";
      case "exhale": return "text-success";
      case "pause": return "text-muted-foreground";
    }
  };

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
              <h1 className="text-2xl font-bold">Coping Tools</h1>
              <p className="text-muted-foreground">Find peace and build resilience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Breathing Exercises */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Breathing Exercises</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Exercise Selection */}
            <div className="space-y-4">
              {breathingExercises.map((exercise) => (
                <Card 
                  key={exercise.id} 
                  className={`cursor-pointer transition-all shadow-floating hover:shadow-glow ${
                    activeExercise === exercise.id ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                  onClick={() => startBreathingExercise(exercise.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                        <CardDescription>{exercise.description}</CardDescription>
                      </div>
                      <Button
                        variant={activeExercise === exercise.id && isPlaying ? "therapy" : "calm"}
                        size="icon"
                      >
                        {activeExercise === exercise.id && isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{exercise.pattern.join("-")} pattern</span>
                      <span>{exercise.totalCycles} cycles</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Breathing Visualizer */}
            <Card className="shadow-floating">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Breathing Guide</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAudioEnabled(!audioEnabled)}
                    >
                      {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={resetBreathingExercise}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {activeExercise ? (
                  <>
                    {/* Breathing Circle */}
                    <div className="relative w-48 h-48 mx-auto">
                      <div className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
                        breathingPhase === "inhale" ? "scale-110 border-primary bg-primary/10" :
                        breathingPhase === "hold" ? "scale-110 border-accent bg-accent/10" :
                        breathingPhase === "exhale" ? "scale-90 border-success bg-success/10" :
                        "scale-90 border-muted bg-muted/10"
                      }`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Wind className={`w-12 h-12 ${getPhaseColor()}`} />
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-2">
                      <h3 className={`text-2xl font-bold ${getPhaseColor()}`}>
                        {getPhaseInstruction()}
                      </h3>
                      <p className="text-muted-foreground">
                        Cycle {breathingCycle + 1} of {breathingExercises.find(ex => ex.id === activeExercise)?.totalCycles}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <Progress 
                        value={(breathingCycle / (breathingExercises.find(ex => ex.id === activeExercise)?.totalCycles || 1)) * 100} 
                        className="h-2"
                      />
                      <p className="text-sm text-muted-foreground">
                        Overall Progress
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="py-16 space-y-4">
                    <Wind className="w-16 h-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Select a breathing exercise to begin
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Daily Affirmations */}
        <Card className="shadow-floating border-primary/20 bg-gradient-calm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Daily Affirmations</span>
            </CardTitle>
            <CardDescription>Positive reminders tailored for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <blockquote className="text-lg font-medium text-primary italic px-6">
                "{affirmations[currentAffirmation]}"
              </blockquote>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="therapy" 
                  onClick={() => setCurrentAffirmation((prev) => (prev > 0 ? prev - 1 : affirmations.length - 1))}
                >
                  Previous
                </Button>
                <Button 
                  variant="growth"
                  onClick={() => setCurrentAffirmation((prev) => (prev + 1) % affirmations.length)}
                >
                  Next
                </Button>
              </div>
              <p className="text-sm text-primary/70">
                {currentAffirmation + 1} of {affirmations.length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Coping Strategies */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Coping Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copingStrategies.map((strategy, index) => (
              <Card key={index} className="shadow-floating hover:shadow-glow transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-calm rounded-lg flex items-center justify-center">
                      <strategy.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{strategy.title}</CardTitle>
                      <div className="text-xs text-primary bg-primary/10 rounded-full px-2 py-1 inline-block">
                        {strategy.category}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {strategy.description}
                  </CardDescription>
                  <Button variant="calm" size="sm" className="w-full">
                    {strategy.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Support */}
        <Card className="shadow-floating border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Need Immediate Support?</CardTitle>
            <CardDescription>
              If you're experiencing a mental health crisis, please reach out for professional help
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="destructive" className="w-full">
                Crisis Text Line: Text HOME to 741741
              </Button>
              <Button variant="outline" className="w-full">
                National Suicide Prevention: 988
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}