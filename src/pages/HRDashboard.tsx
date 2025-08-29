import { useState } from "react";
import HRNavbar from "@/components/HRNavbar";
import ResumeProcessing from "@/components/ResumeProcessing";
import RankingView from "@/components/RankingView";
import ShortlistedCandidates from "@/components/ShortlistedCandidates";

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState("processing");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "processing":
        return <ResumeProcessing />;
      case "ranking":
        return <RankingView />;
      case "shortlisted":
        return <ShortlistedCandidates />;
      default:
        return <ResumeProcessing />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HRNavbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        hrName="Sarah Johnson"
        companyName="TechCorp Inc."
      />
      <div className="animate-fade-in">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default HRDashboard;