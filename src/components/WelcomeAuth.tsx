import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Heart, MessageCircle, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

interface WelcomeAuthProps {
  onAuth: (user: { name: string; email: string }) => void;
}

export function WelcomeAuth({ onAuth }: WelcomeAuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth - in real app would connect to auth service
    onAuth({
      name: formData.name || "Alex",
      email: formData.email || "alex@example.com"
    });
  };

  const handleStartOffline = () => {
    onAuth({
      name: "Guest",
      email: "offline@mindmirror.app"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-healing flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center gap-8">
        {/* Hero Section */}
        <div className="flex-1 hidden lg:block">
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Peaceful wellness"
              className="rounded-2xl shadow-floating w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            <div className="absolute bottom-8 left-8 text-white">
              <h1 className="text-4xl font-bold mb-2">MindMirror</h1>
              <p className="text-xl opacity-90">Your private space to think, reflect, and grow</p>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <div className="flex-1 max-w-md mx-auto">
          <Card className="shadow-floating border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-calm rounded-2xl flex items-center justify-center shadow-glow">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Welcome to MindMirror</CardTitle>
                <CardDescription className="text-base">
                  Your AI-powered companion for mental wellness and personal growth
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      className="transition-calm"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="transition-calm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Enter your password"
                    className="transition-calm"
                  />
                </div>
                
                <Button type="submit" variant="therapy" size="lg" className="w-full">
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>
              
              <div className="text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-primary transition-calm"
                >
                  {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              
              <Button 
                variant="calm" 
                size="lg" 
                className="w-full" 
                onClick={handleStartOffline}
              >
                Start Offline Mode
              </Button>
              
              <div className="text-xs text-center text-muted-foreground">
                Offline mode keeps all data on your device for complete privacy
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-gradient-calm rounded-lg mx-auto flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Emotion Tracking</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-gradient-calm rounded-lg mx-auto flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">AI Therapist</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-gradient-calm rounded-lg mx-auto flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Growth Insights</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-gradient-calm rounded-lg mx-auto flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Pattern Detection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}