
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Building, 
  FileText, 
  CheckCircle, 
  Send, 
  Shield,
  ArrowRight,
  ArrowDown,
  Users,
  Database,
  Settings
} from "lucide-react";

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            <span className="font-bold">Tamil Document Access System</span>
          </h1>
          <h2 className="text-2xl text-muted-foreground mb-2">
            <span className="font-bold">System Architecture Diagram</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            <span className="font-bold">தமிழ்நாடு ஆவண அணுகல் அமைப்பு - கட்டமைப்பு வரைபடம்</span>
          </p>
        </div>

        {/* Architecture Flow */}
        <div className="space-y-8">
          {/* Layer 1: Entry Points */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-4">Entry Points / நுழைவு புள்ளிகள்</h3>
            <div className="flex justify-center gap-8">
              <Card className="w-64">
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-bold">User Portal</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-2 font-bold">பயனர் போர்ட்டல்</p>
                  <ul className="text-xs space-y-1">
                    <li className="font-bold">• User Registration</li>
                    <li className="font-bold">• Document Requests</li>
                    <li className="font-bold">• Progress Tracking</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="w-64">
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Building className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg font-bold">Department Portal</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-2 font-bold">துறை போர்ட்டல்</p>
                  <ul className="text-xs space-y-1">
                    <li className="font-bold">• Request Management</li>
                    <li className="font-bold">• Document Generation</li>
                    <li className="font-bold">• Approval Tracking</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Layer 2: Authentication */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-4">Authentication Layer / அங்கீகார அடுக்கு</h3>
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="font-bold">Secure Login System</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold">User Authentication</h4>
                    <p className="text-xs text-muted-foreground font-bold">Username/Mobile + Password</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Department Authentication</h4>
                    <p className="text-xs text-muted-foreground font-bold">Department ID + Password</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Layer 3: Core Workflows */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-center mb-6">Core Workflows / முக்கிய பணிப்பாய்வுகள்</h3>
            
            {/* User Workflow */}
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-4 text-blue-600">User Workflow / பயனர் பணிப்பாய்வு</h4>
              <div className="flex flex-wrap justify-center gap-4">
                <Card className="w-48">
                  <CardContent className="text-center p-4">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h5 className="font-bold">Registration</h5>
                    <p className="text-xs text-muted-foreground font-bold">பதிவு</p>
                  </CardContent>
                </Card>
                <ArrowRight className="h-6 w-6 mt-6 text-muted-foreground" />
                <Card className="w-48">
                  <CardContent className="text-center p-4">
                    <Building className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h5 className="font-bold">Select Department</h5>
                    <p className="text-xs text-muted-foreground font-bold">துறை தேர்வு</p>
                  </CardContent>
                </Card>
                <ArrowRight className="h-6 w-6 mt-6 text-muted-foreground" />
                <Card className="w-48">
                  <CardContent className="text-center p-4">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h5 className="font-bold">Request Service</h5>
                    <p className="text-xs text-muted-foreground font-bold">சேவை கோரிக்கை</p>
                  </CardContent>
                </Card>
                <ArrowRight className="h-6 w-6 mt-6 text-muted-foreground" />
                <Card className="w-48">
                  <CardContent className="text-center p-4">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h5 className="font-bold">Track Progress</h5>
                    <p className="text-xs text-muted-foreground font-bold">முன்னேற்றம் கண்காணிப்பு</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Department Workflow */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-green-600">Department Workflow / துறை பணிப்பாய்வு</h4>
              <div className="space-y-4">
                {/* Stage 1 */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Card className="w-48">
                    <CardContent className="text-center p-4">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h5 className="font-bold">Receive Request</h5>
                      <p className="text-xs text-muted-foreground font-bold">கோரிக்கை பெறுதல்</p>
                    </CardContent>
                  </Card>
                  <ArrowRight className="h-6 w-6 mt-6 text-muted-foreground" />
                  <Card className="w-48">
                    <CardContent className="text-center p-4">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h5 className="font-bold">Review & Approve</h5>
                      <p className="text-xs text-muted-foreground font-bold">மதிப்பாய்வு & ஒப்புதல்</p>
                    </CardContent>
                  </Card>
                  <ArrowRight className="h-6 w-6 mt-6 text-muted-foreground" />
                  <Card className="w-48">
                    <CardContent className="text-center p-4">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h5 className="font-bold">Send to Higher Officials</h5>
                      <p className="text-xs text-muted-foreground font-bold">உயர் அதிகாரிகளுக்கு அனுப்புதல்</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center">
                  <ArrowDown className="h-6 w-6 text-muted-foreground" />
                </div>

                {/* Stage 2 */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Card className="w-48">
                    <CardContent className="text-center p-4">
                      <Settings className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                      <h5 className="font-bold">Track Higher Approval</h5>
                      <p className="text-xs text-muted-foreground font-bold">உயர் ஒப்புதல் கண்காணிப்பு</p>
                    </CardContent>
                  </Card>
                  <ArrowRight className="h-6 w-6 mt-6 text-muted-foreground" />
                  <Card className="w-48">
                    <CardContent className="text-center p-4">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                      <h5 className="font-bold">Generate Document</h5>
                      <p className="text-xs text-muted-foreground font-bold">ஆவணம் உருவாக்குதல்</p>
                    </CardContent>
                  </Card>
                  <ArrowRight className="h-6 w-6 mt-6 text-muted-foreground" />
                  <Card className="w-48">
                    <CardContent className="text-center p-4">
                      <Send className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                      <h5 className="font-bold">Send to User</h5>
                      <p className="text-xs text-muted-foreground font-bold">பயனருக்கு அனுப்புதல்</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Layer 4: Data Layer */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-4">Data Management / தரவு மேலாண்மை</h3>
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                  <Database className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="font-bold">System Database</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-bold mb-2">User Management</h4>
                    <p className="text-xs text-muted-foreground mb-2 font-bold">பயனர் மேலாண்மை</p>
                    <ul className="text-xs space-y-1">
                      <li className="font-bold">• User Profiles</li>
                      <li className="font-bold">• Authentication</li>
                      <li className="font-bold">• Permissions</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold mb-2">Request Processing</h4>
                    <p className="text-xs text-muted-foreground mb-2 font-bold">கோரிக்கை செயலாக்கம்</p>
                    <ul className="text-xs space-y-1">
                      <li className="font-bold">• Service Requests</li>
                      <li className="font-bold">• Approval Status</li>
                      <li className="font-bold">• Progress Tracking</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold mb-2">Document Storage</h4>
                    <p className="text-xs text-muted-foreground mb-2 font-bold">ஆவண சேமிப்பு</p>
                    <ul className="text-xs space-y-1">
                      <li className="font-bold">• Generated Certificates</li>
                      <li className="font-bold">• Templates</li>
                      <li className="font-bold">• Audit Trails</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Types */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-4">Supported Departments / ஆதரிக்கப்படும் துறைகள்</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              <Card>
                <CardContent className="text-center p-4">
                  <Building className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h5 className="font-bold">Revenue Department</h5>
                  <p className="text-xs text-muted-foreground font-bold">வருவாய் துறை</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-4">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h5 className="font-bold">Education Department</h5>
                  <p className="text-xs text-muted-foreground font-bold">கல்வித் துறை</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-4">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <h5 className="font-bold">Police Department</h5>
                  <p className="text-xs text-muted-foreground font-bold">காவல் துறை</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-4">
                  <User className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h5 className="font-bold">Healthcare Department</h5>
                  <p className="text-xs text-muted-foreground font-bold">சுகாதாரத் துறை</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-4">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h5 className="font-bold">Sports Department</h5>
                  <p className="text-xs text-muted-foreground font-bold">விளையாட்டுத் துறை</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground font-bold">
            © 2024 Government of Tamil Nadu - Tamil Document Access System
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-bold">
            தமிழ்நாடு அரசு - தமிழ் ஆவண அணுகல் அமைப்பு
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
