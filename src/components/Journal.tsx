import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Brain, 
  Heart, 
  MessageCircle,
  Mic,
  MicOff
} from "lucide-react";

interface JournalProps {
  onNavigate: (page: string) => void;
}

export function Journal({ onNavigate }: JournalProps) {
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mood, setMood] = useState<string>("");
  const [aiInsight, setAiInsight] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moodOptions = [
    { emoji: "😊", label: "Happy", color: "success" },
    { emoji: "😔", label: "Sad", color: "muted" },
    { emoji: "😰", label: "Anxious", color: "destructive" },
    { emoji: "😡", label: "Angry", color: "destructive" },
    { emoji: "😌", label: "Calm", color: "primary" },
    { emoji: "🤔", label: "Thoughtful", color: "secondary" },
    { emoji: "😴", label: "Tired", color: "muted" },
    { emoji: "✨", label: "Inspired", color: "accent" }
  ];

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAiInsight(
        "I notice you're processing some challenging feelings. The way you described your day shows self-awareness, which is a strength. Consider: what would you tell a friend experiencing this situation?"
      );
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSave = () => {
    // In a real app, this would save to local storage or database
    console.log("Saving journal entry:", { content, mood, aiInsight });
    onNavigate("dashboard");
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, would implement voice recording
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setContent(content + "\n\n[Voice note: I've been feeling overwhelmed lately, but writing this down helps me process my thoughts...]");
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-healing">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
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
              <h1 className="text-2xl font-bold">New Reflection</h1>
              <p className="text-muted-foreground">Express your thoughts freely</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Mood Selection */}
        <Card className="shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary" />
              <span>How are you feeling?</span>
            </CardTitle>
            <CardDescription>
              Select the emotion that best describes your current state
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((option, index) => (
                <Badge
                  key={index}
                  variant={mood === option.label ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 text-sm hover:shadow-glow transition-all ${
                    mood === option.label ? "shadow-glow" : ""
                  }`}
                  onClick={() => setMood(option.label)}
                >
                  <span className="mr-2">{option.emoji}</span>
                  {option.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Journal Writing */}
        <Card className="shadow-floating">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>Your Thoughts</span>
                </CardTitle>
                <CardDescription>
                  Write freely about what's on your mind. No judgment, just honesty.
                </CardDescription>
              </div>
              <Button
                variant={isRecording ? "destructive" : "calm"}
                size="sm"
                onClick={toggleRecording}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isRecording ? "Stop" : "Voice Note"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing... What happened today? How did it make you feel? What thoughts are circling in your mind?"
              className="min-h-[300px] text-base leading-relaxed resize-none border-0 focus:ring-0 shadow-none p-6 bg-gradient-healing"
              style={{ fontSize: '16px' }}
            />
            
            {isRecording && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                  <span className="text-sm text-destructive font-medium">Recording...</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Analysis */}
        {content.length > 50 && (
          <Card className="shadow-floating border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>AI Insights</span>
              </CardTitle>
              <CardDescription>
                Get gentle insights and perspective on your thoughts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!aiInsight ? (
                <Button 
                  variant="therapy" 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Insight
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-calm rounded-lg border border-primary/10">
                    <p className="text-primary italic">{aiInsight}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="calm" size="sm" onClick={() => onNavigate("therapist")}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Talk to AI Therapist
                    </Button>
                    <Button variant="growth" size="sm">
                      <Brain className="w-4 h-4 mr-2" />
                      Reframe Thoughts
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Save Actions */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => onNavigate("dashboard")}>
            Save as Draft
          </Button>
          <Button 
            variant="therapy" 
            size="lg" 
            onClick={handleSave}
            disabled={!content.trim()}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Reflection
          </Button>
        </div>

        {/* Privacy Note */}
        <Card className="bg-muted/50 border-muted">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              🔒 Your reflections are private and secure. All data stays on your device unless you choose to sync.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}