import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Brain, Users, Activity, LogOut, Shield, Eye, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const loggedInHRs = [
    { id: 1, name: "Sarah Johnson", company: "TechCorp Inc.", email: "sarah@techcorp.com", loginTime: "09:15 AM", status: "active", sessionsToday: 3 },
    { id: 2, name: "Mike Chen", company: "StartupXYZ", email: "mike@startupxyz.com", loginTime: "10:30 AM", status: "active", sessionsToday: 2 },
    { id: 3, name: "Emily Rodriguez", company: "MegaCorp", email: "emily@megacorp.com", loginTime: "08:45 AM", status: "idle", sessionsToday: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  TalentRanker Admin
                </h1>
                <p className="text-sm text-muted-foreground">System Administration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-success/10 text-success border-success/20">
                <Shield className="w-4 h-4 mr-2" />
                Admin Access
              </Badge>
              <Button variant="outline" onClick={() => navigate("/")}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground">Monitor HR activities and system metrics</p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="metric-card">
            <div className="metric-value">{loggedInHRs.length}</div>
            <div className="metric-label">Active HR Users</div>
          </Card>
          <Card className="metric-card">
            <div className="metric-value">156</div>
            <div className="metric-label">Total Resumes Processed</div>
          </Card>
          <Card className="metric-card">
            <div className="metric-value">23</div>
            <div className="metric-label">Companies Registered</div>
          </Card>
          <Card className="metric-card">
            <div className="metric-value">89%</div>
            <div className="metric-label">System Uptime</div>
          </Card>
        </div>

        {/* Active HR Sessions */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Active HR Sessions</span>
            </CardTitle>
            <CardDescription>Currently logged-in HR managers and their activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>HR Manager</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Login Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sessions Today</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loggedInHRs.map((hr) => (
                  <TableRow key={hr.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{hr.name}</p>
                        <p className="text-sm text-muted-foreground">{hr.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{hr.company}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{hr.loginTime}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={hr.status === 'active' ? 'status-active' : 'status-pending'}>
                        <Activity className="w-3 h-3 mr-1" />
                        {hr.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{hr.sessionsToday}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;