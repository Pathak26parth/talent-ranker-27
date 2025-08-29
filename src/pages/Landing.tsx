import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, FileText, TrendingUp, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Resume Ranking",
      description: "Advanced ML algorithms analyze and rank resumes based on job requirements"
    },
    {
      icon: FileText,
      title: "Multi-Format Support",
      description: "Process PDF, DOC, DOCX and other resume formats seamlessly"
    },
    {
      icon: Users,
      title: "Smart Candidate Shortlisting",
      description: "Automatically identify top candidates with detailed analytics"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track HR performance and recruitment metrics in real-time"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-0 border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TalentRanker
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="hero" onClick={() => navigate("/signup")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered Recruitment
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              Smart Talent
              <br />
              Ranking Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your hiring process with AI-powered resume analysis, intelligent ranking, and automated candidate shortlisting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" onClick={() => navigate("/signup")}>
                Start Free Trial
              </Button>
              <Button variant="outline" size="xl" className="group">
                <Shield className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Enterprise Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to streamline your recruitment process and find the best talent faster.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`gradient-card cursor-pointer transition-all duration-300 ${
                  activeFeature === index ? 'ring-2 ring-primary scale-105' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="metric-card">
              <div className="metric-value">95%</div>
              <div className="metric-label">Accuracy Rate</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">10x</div>
              <div className="metric-label">Faster Screening</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">500+</div>
              <div className="metric-label">Companies Trust Us</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto glass-card p-12 animate-scale-in">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join hundreds of companies already using TalentRanker to find the best talent faster.
            </p>
            <Button variant="hero" size="xl" onClick={() => navigate("/signup")}>
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">TalentRanker</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 TalentRanker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;