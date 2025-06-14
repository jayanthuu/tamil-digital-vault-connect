import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, CheckCircle, Clock, Send } from "lucide-react";

// Mock data for requests
const requests = [
  {
    id: "REQ001",
    applicantName: "Rajesh Kumar",
    applicantNameTamil: "ராஜேஷ் குமார்",
    service: "Community Certificate",
    serviceTamil: "சமுதாய சான்றிதழ்",
    department: "Revenue Department",
    departmentTamil: "வருவாய் துறை",
    requestDate: "2024-06-10",
    status: "pending_review",
    priority: "normal",
    documents: ["Aadhaar Card", "Proof of Address", "Application Form"]
  },
  {
    id: "REQ002",
    applicantName: "Priya Devi",
    applicantNameTamil: "பிரியா தேவி",
    service: "XII Standard Certificate",
    serviceTamil: "XII வகுப்பு சான்றிதழ்",
    department: "Education Department",
    departmentTamil: "கல்வித் துறை",
    requestDate: "2024-06-08",
    status: "approved_pending_higher_approval",
    priority: "high",
    documents: ["X Standard Certificate", "Transfer Certificate"]
  },
  {
    id: "REQ003",
    applicantName: "Muthu Selvam",
    applicantNameTamil: "முத்து செல்வம்",
    service: "Health Certificate",
    serviceTamil: "சுகாதார சான்றிதழ்",
    department: "Healthcare Department",
    departmentTamil: "சுகாதாரத் துறை",
    requestDate: "2024-06-12",
    status: "higher_approved",
    priority: "urgent",
    documents: ["Medical Reports", "Blood Test Results"]
  }
];

const statusConfig = {
  pending_review: { label: "Pending Review", labelTamil: "மதிப்பாய்வு நிலுவையில்", variant: "secondary" as const },
  approved_pending_higher_approval: { label: "Approved - Pending Higher Approval", labelTamil: "அங்கீகரிக்கப்பட்டது - உயர் அனுமதி நிலுவையில்", variant: "default" as const },
  higher_approved: { label: "Higher Approved - Ready to Generate", labelTamil: "உயர் அனுமதி - உருவாக்க தயார்", variant: "default" as const },
  document_generated: { label: "Document Generated", labelTamil: "ஆவணம் உருவாக்கப்பட்டது", variant: "default" as const }
};

const priorityConfig = {
  normal: { label: "Normal", variant: "outline" as const },
  high: { label: "High", variant: "secondary" as const },
  urgent: { label: "Urgent", variant: "destructive" as const }
};

export default function DepartmentDashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredRequests = requests.filter(request => {
    if (selectedTab === "all") return true;
    if (selectedTab === "pending") return request.status === "pending_review";
    if (selectedTab === "approved") return request.status === "approved_pending_higher_approval";
    if (selectedTab === "ready") return request.status === "higher_approved";
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Department Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            துறை டாஷ்போர்டு
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">மொத்த கோரிக்கைகள்</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">மதிப்பாய்வு நிலுவையில்</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Waiting Higher Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">உயர் அனுமதிக்காக காத்திருக்கும்</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ready to Generate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">உருவாக்க தயார்</p>
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Service Requests</CardTitle>
            <CardDescription>சேவை கோரிக்கைகள்</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Requests</TabsTrigger>
                <TabsTrigger value="pending">Pending Review</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="ready">Ready to Generate</TabsTrigger>
              </TabsList>
            </Tabs>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.applicantName}</div>
                        <div className="text-sm text-muted-foreground">{request.applicantNameTamil}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.service}</div>
                        <div className="text-sm text-muted-foreground">{request.serviceTamil}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.department}</div>
                        <div className="text-sm text-muted-foreground">{request.departmentTamil}</div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={priorityConfig[request.priority as keyof typeof priorityConfig].variant}>
                        {priorityConfig[request.priority as keyof typeof priorityConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConfig[request.status as keyof typeof statusConfig].variant}>
                        {statusConfig[request.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/department/request/${request.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {request.status === "pending_review" && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => navigate(`/department/request/${request.id}`)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        )}
                        {request.status === "approved_pending_higher_approval" && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate(`/department/approval-tracking`)}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Track
                          </Button>
                        )}
                        {request.status === "higher_approved" && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => navigate(`/department/generate/${request.id}`)}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Generate
                          </Button>
                        )}
                      </div>
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
}