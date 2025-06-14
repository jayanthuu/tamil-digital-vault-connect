import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Shield, Upload, FileCheck, Download, ShieldCheck, FileText, UserCheck, Lock, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tamil Nadu Document AI</h1>
          <p className="text-lg text-muted-foreground">Digital Document Management System</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Citizen Portal */}
          <Card className="p-6">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Citizen Portal</CardTitle>
              <CardDescription className="text-base">
                Access and manage your documents securely
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span>Upload and store documents</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck className="h-5 w-5 text-muted-foreground" />
                  <span>Track application status</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <span>Download certificates</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  <span>Secure OTP verification</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => navigate('/login?type=user')}
                >
                  Login as Citizen
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/register')}
                >
                  Register as Citizen
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Department Portal */}
          <Card className="p-6">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Department Portal</CardTitle>
              <CardDescription className="text-base">
                Authorized access for government officials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span>Process citizen applications</span>
                </div>
                <div className="flex items-center gap-3">
                  <UserCheck className="h-5 w-5 text-muted-foreground" />
                  <span>Verify and approve documents</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span>Issue digital certificates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span>Role-based access control</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => navigate('/login?type=department')}
                >
                  Department Login
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/department/register')}
                >
                  Apply for Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>© 2024 Government of Tamil Nadu. All rights reserved.</p>
          <p className="mt-1">For technical support, contact: support@tn.gov.in</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;