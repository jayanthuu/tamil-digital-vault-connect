import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from "lucide-react";

// Mock data for approval tracking
const approvalRequests = [
  {
    id: "REQ002",
    applicantName: "Priya Devi",
    service: "XII Standard Certificate",
    sentToOfficial: "District Education Officer",
    sentToOfficialTamil: "மாவட்ட கல்வி அலுவலர்",
    sentDate: "2024-06-09",
    expectedDate: "2024-06-16",
    status: "under_review",
    priority: "high",
    daysWaiting: 5
  },
  {
    id: "REQ004",
    applicantName: "Kumar Rajan",
    service: "Income Certificate",
    sentToOfficial: "Tehsildar",
    sentToOfficialTamil: "தாலுகா அலுவலர்",
    sentDate: "2024-06-08",
    expectedDate: "2024-06-15",
    status: "approved",
    priority: "normal",
    daysWaiting: 6
  },
  {
    id: "REQ005",
    applicantName: "Selvam Muthu",
    service: "Nativity Certificate",
    sentToOfficial: "Village Revenue Officer",
    sentToOfficialTamil: "கிராம வருவாய் அலுவலர்",
    sentDate: "2024-06-07",
    expectedDate: "2024-06-14",
    status: "needs_clarification",
    priority: "normal",
    daysWaiting: 7
  }
];

const statusConfig = {
  under_review: { 
    label: "Under Review", 
    labelTamil: "மதிப்பாய்வில்", 
    variant: "secondary" as const,
    icon: Clock
  },
  approved: { 
    label: "Approved", 
    labelTamil: "அங்கீகரிக்கப்பட்டது", 
    variant: "default" as const,
    icon: CheckCircle
  },
  needs_clarification: { 
    label: "Needs Clarification", 
    labelTamil: "தெளிவுபடுத்தல் தேவை", 
    variant: "destructive" as const,
    icon: AlertCircle
  }
};

export default function ApprovalTracking() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/department")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Approval Tracking
          </h1>
          <p className="text-lg text-muted-foreground">
            அனुமதி கண்காணிப்பு
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending with Higher Officials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">உயர் அதிகாரிகளிடம் நிலுவையில்</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">மதிப்பாய்வில்</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">இன்று அங்கீகரிக்கப்பட்டது</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Need Clarification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">தெளிவுபடுத்தல் தேவை</p>
            </CardContent>
          </Card>
        </div>

        {/* Approval Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Requests with Higher Officials</CardTitle>
            <CardDescription>உயர் அதிகாரிகளிடம் உள்ள கோரிக்கைகள்</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Sent To</TableHead>
                  <TableHead>Sent Date</TableHead>
                  <TableHead>Expected Date</TableHead>
                  <TableHead>Days Waiting</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvalRequests.map((request) => {
                  const StatusIcon = statusConfig[request.status as keyof typeof statusConfig].icon;
                  return (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.applicantName}</TableCell>
                      <TableCell>{request.service}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.sentToOfficial}</div>
                          <div className="text-sm text-muted-foreground">{request.sentToOfficialTamil}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(request.sentDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(request.expectedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={request.daysWaiting > 5 ? "destructive" : "outline"}>
                          {request.daysWaiting} days
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusConfig[request.status as keyof typeof statusConfig].variant}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[request.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {request.status === "needs_clarification" && (
                            <Button variant="default" size="sm">
                              Respond
                            </Button>
                          )}
                          {request.status === "approved" && (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => navigate(`/department/generate/${request.id}`)}
                            >
                              Generate Document
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}