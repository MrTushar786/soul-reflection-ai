import { useState } from "react";
import { WelcomeAuth } from "@/components/WelcomeAuth";
import { Dashboard } from "@/components/Dashboard";
import { Journal } from "@/components/Journal";
import { AITherapist } from "@/components/AITherapist";
import { MoodTracker } from "@/components/MoodTracker";
import { CopingTools } from "@/components/CopingTools";

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleAuth = (userData: User) => {
    setUser(userData);
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (!user) {
    return <WelcomeAuth onAuth={handleAuth} />;
  }

  switch (currentPage) {
    case "journal":
      return <Journal onNavigate={handleNavigate} />;
    case "therapist":
      return <AITherapist onNavigate={handleNavigate} />;
    case "mood-tracker":
      return <MoodTracker onNavigate={handleNavigate} />;
    case "coping-tools":
      return <CopingTools onNavigate={handleNavigate} />;
    default:
      return <Dashboard user={user} onNavigate={handleNavigate} />;
  }
};

export default Index;
