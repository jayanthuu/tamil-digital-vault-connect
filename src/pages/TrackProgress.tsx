import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react";

const applications = [
  {
    id: "APP001",
    serviceName: "XII Certificate Duplicate",
    serviceTamil: "XII சான்றிதழ் நகல்",
    department: "Education Department",
    status: "In Progress",
    progress: 60,
    submittedDate: "2024-06-10",
    expectedDate: "2024-06-17",
    stages: [
      { name: "Application Submitted", completed: true, date: "2024-06-10" },
      { name: "Document Verification", completed: true, date: "2024-06-12" },
      { name: "Processing", completed: false, date: "" },
      { name: "Quality Check", completed: false, date: "" },
      { name: "Ready for Collection", completed: false, date: "" }
    ]
  },
  {
    id: "APP002",
    serviceName: "Police Clearance Certificate",
    serviceTamil: "காவல் அனுமதி சான்றிதழ்",
    department: "TN Police Department",
    status: "Under Review",
    progress: 25,
    submittedDate: "2024-06-08",
    expectedDate: "2024-06-23",
    stages: [
      { name: "Application Submitted", completed: true, date: "2024-06-08" },
      { name: "Background Verification", completed: false, date: "" },
      { name: "Field Verification", completed: false, date: "" },
      { name: "Final Approval", completed: false, date: "" },
      { name: "Certificate Generation", completed: false, date: "" }
    ]
  },
  {
    id: "APP003",
    serviceName: "Health Certificate",
    serviceTamil: "சுகாதார சான்றிதழ்",
    department: "Healthcare Department",
    status: "Completed",
    progress: 100,
    submittedDate: "2024-06-05",
    expectedDate: "2024-06-10",
    stages: [
      { name: "Application Submitted", completed: true, date: "2024-06-05" },
      { name: "Medical Examination", completed: true, date: "2024-06-06" },
      { name: "Report Generation", completed: true, date: "2024-06-08" },
      { name: "Certificate Issued", completed: true, date: "2024-06-10" }
    ]
  }
];

export default function TrackProgress() {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "In Progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "Under Review":
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "outline";
      case "Under Review":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Departments
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Track Application Progress
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor the status of your submitted applications
          </p>
        </div>

        <div className="space-y-6">
          {applications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{application.serviceName}</CardTitle>
                    <CardDescription className="text-base font-medium text-foreground">
                      {application.serviceTamil}
                    </CardDescription>
                    <CardDescription className="mt-1">
                      Application ID: {application.id} • {application.department}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(application.status)}
                    <Badge variant={getStatusColor(application.status) as any}>
                      {application.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Submitted:</span>
                    <div className="font-medium">{new Date(application.submittedDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected Completion:</span>
                    <div className="font-medium">{new Date(application.expectedDate).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{application.progress}%</span>
                  </div>
                  <Progress value={application.progress} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Application Stages:</h4>
                  {application.stages.map((stage, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        stage.completed 
                          ? 'bg-green-600' 
                          : index === application.stages.findIndex(s => !s.completed)
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      }`}>
                        {stage.completed && (
                          <CheckCircle className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm ${stage.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {stage.name}
                        </div>
                        {stage.date && (
                          <div className="text-xs text-muted-foreground">
                            {new Date(stage.date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {applications.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No applications found. Submit an application to track its progress.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}