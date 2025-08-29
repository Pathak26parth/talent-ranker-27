import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Download, Star, Mail, Phone, FileText, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShortlistedCandidate {
  serialNo: number;
  name: string;
  score: number;
  experience: string;
  email: string;
  phone: string;
  topSkills: string[];
  education: string;
  fileName: string;
  shortlistedDate: string;
}

const ShortlistedCandidates = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Mock data - top 10 shortlisted candidates
  const shortlistedCandidates: ShortlistedCandidate[] = [
    {
      serialNo: 1,
      name: "Alice Johnson",
      score: 95,
      experience: "5+ years",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      topSkills: ["React", "TypeScript", "AWS"],
      education: "MS Computer Science",
      fileName: "alice_johnson_resume.pdf",
      shortlistedDate: "2024-01-15"
    },
    {
      serialNo: 2,
      name: "David Chen",
      score: 92,
      experience: "4+ years", 
      email: "david.chen@email.com",
      phone: "+1 (555) 234-5678",
      topSkills: ["Python", "ML", "Docker"],
      education: "BS Computer Engineering",
      fileName: "david_chen_resume.pdf",
      shortlistedDate: "2024-01-15"
    },
    {
      serialNo: 3,
      name: "Sarah Williams",
      score: 89,
      experience: "6+ years",
      email: "sarah.williams@email.com", 
      phone: "+1 (555) 345-6789",
      topSkills: ["Java", "Spring", "Microservices"],
      education: "MS Software Engineering",
      fileName: "sarah_williams_resume.pdf",
      shortlistedDate: "2024-01-14"
    },
    {
      serialNo: 4,
      name: "Michael Brown",
      score: 85,
      experience: "3+ years",
      email: "michael.brown@email.com",
      phone: "+1 (555) 456-7890",
      topSkills: ["Angular", "Firebase", "MongoDB"],
      education: "BS Information Technology",
      fileName: "michael_brown_resume.pdf",
      shortlistedDate: "2024-01-14"
    },
    {
      serialNo: 5,
      name: "Emma Davis",
      score: 82,
      experience: "4+ years",
      email: "emma.davis@email.com",
      phone: "+1 (555) 567-8901",
      topSkills: ["Vue.js", "PHP", "Laravel"],
      education: "BS Computer Science",
      fileName: "emma_davis_resume.pdf",
      shortlistedDate: "2024-01-13"
    },
    {
      serialNo: 6,
      name: "James Wilson",
      score: 80,
      experience: "5+ years",
      email: "james.wilson@email.com",
      phone: "+1 (555) 678-9012",
      topSkills: ["C#", ".NET", "Azure"],
      education: "MS Computer Science",
      fileName: "james_wilson_resume.pdf",
      shortlistedDate: "2024-01-13"
    },
    {
      serialNo: 7,
      name: "Lisa Anderson",
      score: 78,
      experience: "3+ years",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 789-0123",
      topSkills: ["Flutter", "Dart", "Firebase"],
      education: "BS Software Engineering",
      fileName: "lisa_anderson_resume.pdf",
      shortlistedDate: "2024-01-12"
    },
    {
      serialNo: 8,
      name: "Robert Taylor",
      score: 76,
      experience: "4+ years",
      email: "robert.taylor@email.com",
      phone: "+1 (555) 890-1234",
      topSkills: ["Ruby", "Rails", "PostgreSQL"],
      education: "BS Computer Science",
      fileName: "robert_taylor_resume.pdf",
      shortlistedDate: "2024-01-12"
    },
    {
      serialNo: 9,
      name: "Jennifer Lee",
      score: 74,
      experience: "2+ years",
      email: "jennifer.lee@email.com",
      phone: "+1 (555) 901-2345",
      topSkills: ["Go", "Kubernetes", "Docker"],
      education: "MS Data Science",
      fileName: "jennifer_lee_resume.pdf",
      shortlistedDate: "2024-01-11"
    },
    {
      serialNo: 10,
      name: "Christopher Garcia",
      score: 72,
      experience: "3+ years",
      email: "christopher.garcia@email.com",
      phone: "+1 (555) 012-3456",
      topSkills: ["Scala", "Spark", "Kafka"],
      education: "BS Computer Engineering",
      fileName: "christopher_garcia_resume.pdf",
      shortlistedDate: "2024-01-11"
    }
  ];

  const downloadPDF = async () => {
    setIsDownloading(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "PDF Downloaded Successfully!",
        description: "Shortlisted candidates list has been downloaded.",
      });
      
      // In real app, this would trigger actual PDF download
      const link = document.createElement('a');
      link.href = '#'; // Would be actual PDF blob URL
      link.download = `shortlisted-candidates-${new Date().toISOString().split('T')[0]}.pdf`;
      // link.click();
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-primary";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-success/10 text-success border-success/20";
    if (score >= 80) return "bg-warning/10 text-warning border-warning/20";
    return "bg-primary/10 text-primary border-primary/20";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Users className="w-8 h-8 text-primary" />
            <span>Shortlisted Candidates</span>
          </h1>
          <p className="text-muted-foreground">Top 10 candidates selected for further evaluation</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge className="bg-success/10 text-success border-success/20 text-lg px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            {shortlistedCandidates.length} Shortlisted
          </Badge>
          
          <Button 
            onClick={downloadPDF}
            disabled={isDownloading}
            className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-hover hover:to-secondary-hover"
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <div className="metric-value">{shortlistedCandidates.length}</div>
          <div className="metric-label">Total Shortlisted</div>
        </Card>
        
        <Card className="metric-card">
          <div className="metric-value">
            {Math.round(shortlistedCandidates.reduce((sum, c) => sum + c.score, 0) / shortlistedCandidates.length)}%
          </div>
          <div className="metric-label">Average Score</div>
        </Card>
        
        <Card className="metric-card">
          <div className="metric-value">
            {shortlistedCandidates.filter(c => c.score >= 90).length}
          </div>
          <div className="metric-label">Excellent (90+)</div>
        </Card>
        
        <Card className="metric-card">
          <div className="metric-value">
            {Math.round(shortlistedCandidates.reduce((sum, c) => sum + parseInt(c.experience), 0) / shortlistedCandidates.length)}
          </div>
          <div className="metric-label">Avg Experience (Years)</div>
        </Card>
      </div>

      {/* Candidates Table */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Shortlisted Candidates List</span>
            <Badge variant="outline" className="text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
          </CardTitle>
          <CardDescription>
            Complete list of top-ranked candidates ready for interview scheduling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Top Skills</TableHead>
                  <TableHead>Education</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shortlistedCandidates.map((candidate) => (
                  <TableRow key={candidate.serialNo} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {candidate.serialNo}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{candidate.name}</p>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Shortlisted: {candidate.shortlistedDate}</span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={getScoreBadgeColor(candidate.score)}>
                        {candidate.score}%
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <span className="font-medium">{candidate.experience}</span>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          <span className="truncate max-w-[150px]">{candidate.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span>{candidate.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {candidate.topSkills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <span className="text-sm">{candidate.education}</span>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>
            Download the shortlisted candidates in various formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={downloadPDF} disabled={isDownloading}>
              <Download className="w-4 h-4 mr-2" />
              PDF Report
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Excel Spreadsheet
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              CSV File
            </Button>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Email Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShortlistedCandidates;