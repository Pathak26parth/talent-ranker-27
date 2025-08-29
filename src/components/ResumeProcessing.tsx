import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Trash2, Play, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ResumeFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'ready' | 'processing' | 'completed' | 'error';
}

const ResumeProcessing = () => {
  const [files, setFiles] = useState<ResumeFile[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    
    uploadedFiles.forEach((file) => {
      const fileId = Math.random().toString(36).substr(2, 9);
      const newFile: ResumeFile = {
        id: fileId,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        type: file.type,
        status: 'uploading'
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'ready' } : f
        ));
      }, 1500);
    });

    event.target.value = '';
  }, []);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const startProcessing = async () => {
    if (files.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload resume files before processing.",
        variant: "destructive"
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please provide a job description for accurate ranking.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    // Mark all files as processing
    setFiles(prev => prev.map(f => ({ ...f, status: 'processing' })));

    // Simulate ML processing with progress
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Mark all files as completed
          setFiles(prev => prev.map(f => ({ ...f, status: 'completed' })));
          setIsProcessing(false);
          
          toast({
            title: "Processing Complete!",
            description: `Successfully processed ${files.length} resumes. Check the Ranking View for results.`,
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const getStatusColor = (status: ResumeFile['status']) => {
    switch (status) {
      case 'uploading': return 'bg-warning/10 text-warning border-warning/20';
      case 'ready': return 'bg-primary/10 text-primary border-primary/20';
      case 'processing': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'error': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: ResumeFile['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      default: return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resume Processing</h1>
          <p className="text-muted-foreground">Upload resumes and job description for AI-powered ranking</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20">
          {files.filter(f => f.status === 'completed').length} / {files.length} Processed
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* File Upload Section */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Resumes</span>
            </CardTitle>
            <CardDescription>
              Supported formats: PDF, DOC, DOCX (Max 10MB each)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="upload-zone">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer group">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
                <p className="text-lg font-medium mb-2">Click to upload resumes</p>
                <p className="text-sm text-muted-foreground">or drag and drop files here</p>
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(file.status)}
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`status-badge ${getStatusColor(file.status)}`}>
                        {file.status}
                      </Badge>
                      {file.status !== 'processing' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Job Description Section */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>
              Provide detailed job requirements for accurate resume ranking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="job-description">Job Requirements</Label>
              <Textarea
                id="job-description"
                placeholder="Enter the complete job description including required skills, experience, qualifications, and responsibilities..."
                className="min-h-[300px] resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>💡 <strong>Tips for better results:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Include specific technical skills and tools</li>
                <li>Mention required years of experience</li>
                <li>List educational qualifications</li>
                <li>Describe key responsibilities</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Section */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>AI Processing</span>
          </CardTitle>
          <CardDescription>
            Start the ML model to analyze and rank uploaded resumes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing resumes...</span>
                <span>{Math.round(processingProgress)}%</span>
              </div>
              <Progress value={processingProgress} className="w-full" />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Ready to process {files.filter(f => f.status === 'ready').length} resumes
            </div>
            <Button
              onClick={startProcessing}
              disabled={isProcessing || files.length === 0 || !jobDescription.trim()}
              className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-hover hover:to-secondary-hover"
            >
              {isProcessing ? "Processing..." : "Start AI Analysis"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeProcessing;