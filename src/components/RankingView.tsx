import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Search, Filter, Download, Star, User, Briefcase, GraduationCap, MapPin } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  score: number;
  experience: string;
  skills: string[];
  education: string;
  location: string;
  matchingSkills: number;
  totalSkills: number;
  fileName: string;
  resumeUrl: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
}

const RankingView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - in real app this would come from API
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "Alice Johnson",
      score: 95,
      experience: "5+ years",
      skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
      education: "MS Computer Science",
      location: "San Francisco, CA",
      matchingSkills: 8,
      totalSkills: 10,
      fileName: "alice_johnson_resume.pdf",
      resumeUrl: "/resumes/alice_johnson.pdf",
      status: "new"
    },
    {
      id: "2", 
      name: "David Chen",
      score: 92,
      experience: "4+ years",
      skills: ["Python", "Machine Learning", "TensorFlow", "Docker", "Kubernetes"],
      education: "BS Computer Engineering",
      location: "Seattle, WA",
      matchingSkills: 7,
      totalSkills: 10,
      fileName: "david_chen_resume.pdf",
      resumeUrl: "/resumes/david_chen.pdf",
      status: "reviewed"
    },
    {
      id: "3",
      name: "Sarah Williams",
      score: 89,
      experience: "6+ years",
      skills: ["Java", "Spring Boot", "Microservices", "Redis", "PostgreSQL"],
      education: "MS Software Engineering",
      location: "Austin, TX",
      matchingSkills: 6,
      totalSkills: 10,
      fileName: "sarah_williams_resume.pdf",
      resumeUrl: "/resumes/sarah_williams.pdf",
      status: "shortlisted"
    },
    {
      id: "4",
      name: "Michael Brown",
      score: 85,
      experience: "3+ years",
      skills: ["Angular", "JavaScript", "Firebase", "MongoDB", "Express"],
      education: "BS Information Technology",
      location: "Denver, CO",
      matchingSkills: 5,
      totalSkills: 10,
      fileName: "michael_brown_resume.pdf",
      resumeUrl: "/resumes/michael_brown.pdf",
      status: "new"
    },
    {
      id: "5",
      name: "Emma Davis",
      score: 82,
      experience: "4+ years",
      skills: ["Vue.js", "PHP", "Laravel", "MySQL", "Git"],
      education: "BS Computer Science",
      location: "Portland, OR",
      matchingSkills: 4,
      totalSkills: 10,
      fileName: "emma_davis_resume.pdf",
      resumeUrl: "/resumes/emma_davis.pdf",
      status: "reviewed"
    }
  ];

  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = filterStatus === "all" || candidate.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.score - a.score;
        case "name":
          return a.name.localeCompare(b.name);
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return b.score - a.score;
      }
    });
  }, [candidates, searchTerm, sortBy, filterStatus]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-warning";
    return "text-muted-foreground";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-success/10 border-success/20";
    if (score >= 75) return "bg-warning/10 border-warning/20";
    return "bg-muted border-border";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted": return "status-shortlisted";
      case "reviewed": return "status-pending";
      case "rejected": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "status-active";
    }
  };

  const updateCandidateStatus = (id: string, newStatus: Candidate['status']) => {
    // In real app, this would make an API call
    console.log(`Updating candidate ${id} to status: ${newStatus}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span>Ranking View</span>
          </h1>
          <p className="text-muted-foreground">AI-ranked candidates based on job requirements</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
          {filteredAndSortedCandidates.length} Candidates
        </Badge>
      </div>

      {/* Filters and Search */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Highest Score</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredAndSortedCandidates.map((candidate, index) => (
          <Card key={candidate.id} className="gradient-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className={`px-3 py-1 rounded-full border ${getScoreBgColor(candidate.score)}`}>
                      <span className={`font-bold ${getScoreColor(candidate.score)}`}>
                        {candidate.score}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold flex items-center space-x-2">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <span>{candidate.name}</span>
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{candidate.experience}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{candidate.education}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{candidate.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className={`status-badge ${getStatusColor(candidate.status)}`}>
                    {candidate.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Resume
                  </Button>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Skills Match</span>
                  <span className="text-sm text-muted-foreground">
                    {candidate.matchingSkills}/{candidate.totalSkills} required skills
                  </span>
                </div>
                <Progress 
                  value={(candidate.matchingSkills / candidate.totalSkills) * 100} 
                  className="mb-2"
                />
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      variant="secondary"
                      className="text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  File: {candidate.fileName}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCandidateStatus(candidate.id, 'reviewed')}
                    disabled={candidate.status === 'reviewed'}
                  >
                    Mark Reviewed
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => updateCandidateStatus(candidate.id, 'shortlisted')}
                    disabled={candidate.status === 'shortlisted'}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Shortlist
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => updateCandidateStatus(candidate.id, 'rejected')}
                    disabled={candidate.status === 'rejected'}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedCandidates.length === 0 && (
        <Card className="gradient-card">
          <CardContent className="p-12 text-center">
            <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No candidates found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "Process some resumes to see rankings here"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RankingView;