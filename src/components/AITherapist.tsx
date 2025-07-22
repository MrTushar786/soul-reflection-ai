import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  Mic,
  MicOff,
  Heart,
  Brain,
  Shield,
  Sparkles
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AITherapistProps {
  onNavigate: (page: string) => void;
}

export function AITherapist({ onNavigate }: AITherapistProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm here to listen and support you. What's on your mind today? Remember, this is a safe space where you can share anything you're feeling.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: "I'm feeling anxious", icon: Heart, color: "destructive" },
    { text: "I'm overthinking everything", icon: Brain, color: "muted" },
    { text: "I need confidence", icon: Sparkles, color: "accent" },
    { text: "Help me reframe my thoughts", icon: Shield, color: "primary" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API call to Perplexity
    const perplexityApiKey = "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";
    
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a compassionate AI therapist trained in cognitive behavioral therapy (CBT) and mindfulness techniques. Respond with empathy, ask thoughtful questions, and provide gentle guidance. Keep responses supportive, non-judgmental, and focused on helping the user process their emotions and thoughts. Be concise but warm.'
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
          return_images: false,
          return_related_questions: false
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0]?.message?.content || "I hear you. Can you tell me more about what you're experiencing?";
      }
    } catch (error) {
      console.error('Perplexity API error:', error);
    }

    // Fallback responses for demo
    const fallbackResponses = [
      "I hear you, and what you're feeling is completely valid. It takes courage to share these thoughts. What do you think might be contributing to these feelings?",
      "Thank you for trusting me with this. Sometimes just naming our emotions can be the first step toward understanding them better. How long have you been feeling this way?",
      "It sounds like you're going through something difficult. Remember that it's okay to feel this way - emotions are information, not facts. What would you say to a friend experiencing this?",
      "I can sense the weight of what you're carrying. You're not alone in this. What's one small thing that has brought you even a moment of peace recently?",
      "Your awareness of these patterns shows real insight. That's actually a strength, even when it doesn't feel like it. What do you think your mind is trying to protect you from?"
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(content);
      
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: aiResponse,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, would implement voice recording
    if (!isRecording) {
      setTimeout(() => {
        setInputValue("I've been feeling really overwhelmed with work lately...");
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-healing flex flex-col">
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-calm rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Therapist</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Online & Ready to Listen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.type === 'ai' 
                ? 'bg-gradient-calm' 
                : 'bg-primary-soft'
            }`}>
              {message.type === 'ai' ? (
                <Bot className="w-4 h-4 text-primary" />
              ) : (
                <User className="w-4 h-4 text-primary-foreground" />
              )}
            </div>
            
            <Card className={`max-w-[80%] shadow-gentle ${
              message.type === 'user' 
                ? 'bg-primary-soft text-primary-foreground' 
                : 'bg-card'
            }`}>
              <CardContent className="p-4">
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className={`text-xs mt-2 block ${
                  message.type === 'user' 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </CardContent>
            </Card>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-calm">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <Card className="bg-card shadow-gentle">
              <CardContent className="p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="max-w-4xl mx-auto w-full px-4 pb-4">
          <p className="text-sm text-muted-foreground mb-3">Quick ways to start:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer px-3 py-2 hover:shadow-glow transition-all"
                onClick={() => handleQuickPrompt(prompt.text)}
              >
                <prompt.icon className="w-3 h-3 mr-2" />
                {prompt.text}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Share what's on your mind..."
                className="text-base"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }
                }}
              />
            </div>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button
              variant="therapy"
              size="icon"
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {isRecording && (
            <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                <span className="text-xs text-destructive">Recording... Speak freely</span>
              </div>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            🔒 This conversation is private and secure. Powered by research-backed therapeutic AI.
          </p>
        </div>
      </div>
    </div>
  );
}