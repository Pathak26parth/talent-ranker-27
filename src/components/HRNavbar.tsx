import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, FileText, TrendingUp, Users, LogOut, User, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HRNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hrName?: string;
  companyName?: string;
}

const HRNavbar = ({ activeTab, onTabChange, hrName = "John Doe", companyName = "TechCorp Inc." }: HRNavbarProps) => {
  const navigate = useNavigate();
  const [notifications] = useState(3);

  const handleLogout = () => {
    navigate("/");
  };

  const tabs = [
    {
      id: "processing",
      label: "Resume Processing",
      icon: FileText,
      description: "Upload and process resumes"
    },
    {
      id: "ranking",
      label: "Ranking View",
      icon: TrendingUp,
      description: "View ranked candidates"
    },
    {
      id: "shortlisted",
      label: "Shortlisted Candidates", 
      icon: Users,
      description: "Top 10 candidates"
    }
  ];

  return (
    <div className="border-b border-border bg-card">
      <div className="px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TalentRanker
              </h1>
              <p className="text-sm text-muted-foreground">{companyName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive">
                  {notifications}
                </Badge>
              )}
            </Button>
            
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium">{hrName}</p>
                <p className="text-muted-foreground text-xs">HR Manager</p>
              </div>
            </div>
            
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 rounded-md transition-all duration-200 flex-1
                ${activeTab === tab.id 
                  ? 'bg-background shadow-sm ring-1 ring-border text-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              <div className="text-left">
                <p className="font-medium text-sm">{tab.label}</p>
                <p className="text-xs opacity-70">{tab.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HRNavbar;