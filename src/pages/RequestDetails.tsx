import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, XCircle, Download, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app this would come from API
const requestDetails = {
  REQ001: {
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
    applicantDetails: {
      fatherName: "Kumar Raman",
      fatherNameTamil: "குமார் ராமன்",
      address: "123, Gandhi Street, Chennai - 600001",
      addressTamil: "123, காந்தி தெரு, சென்னை - 600001",
      phone: "+91 9876543210",
      email: "rajesh.kumar@email.com",
      aadhaar: "1234 5678 9012",
      community: "BC"
    },
    documents: [
      { name: "Aadhaar Card", status: "verified", uploadDate: "2024-06-10" },
      { name: "Proof of Address", status: "verified", uploadDate: "2024-06-10" },
      { name: "Application Form", status: "verified", uploadDate: "2024-06-10" }
    ]
  }
};

export default function RequestDetails() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comments, setComments] = useState("");
  
  const request = requestDetails[requestId as keyof typeof requestDetails];

  if (!request) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-lg text-muted-foreground">Request not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleApprove = () => {
    toast({
      title: "Request Approved",
      description: "Request has been approved and sent to higher officials for final approval.",
    });
    navigate("/department");
  };

  const handleReject = () => {
    toast({
      title: "Request Rejected",
      description: "Request has been rejected and applicant will be notified.",
      variant: "destructive",
    });
    navigate("/department");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            Request Details
          </h1>
          <p className="text-lg text-muted-foreground">
            கோரிக்கை விவரங்கள்
          </p>
        </div>

        <div className="space-y-6">
          {/* Request Summary */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{request.service}</CardTitle>
                  <CardDescription className="text-base font-medium text-foreground">
                    {request.serviceTamil}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {request.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Department</Label>
                  <p className="text-sm">{request.department}</p>
                  <p className="text-xs text-muted-foreground">{request.departmentTamil}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Request Date</Label>
                  <p className="text-sm">{new Date(request.requestDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <Badge variant="outline" className="ml-2">{request.priority}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant="secondary" className="ml-2">Pending Review</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applicant Details */}
          <Card>
            <CardHeader>
              <CardTitle>Applicant Details</CardTitle>
              <CardDescription>விண்ணப்பதாரர் விவரங்கள்</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm">{request.applicantName}</p>
                  <p className="text-xs text-muted-foreground">{request.applicantNameTamil}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Father's Name</Label>
                  <p className="text-sm">{request.applicantDetails.fatherName}</p>
                  <p className="text-xs text-muted-foreground">{request.applicantDetails.fatherNameTamil}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm">{request.applicantDetails.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{request.applicantDetails.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Aadhaar Number</Label>
                  <p className="text-sm">{request.applicantDetails.aadhaar}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Community</Label>
                  <p className="text-sm">{request.applicantDetails.community}</p>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Address</Label>
                  <p className="text-sm">{request.applicantDetails.address}</p>
                  <p className="text-xs text-muted-foreground">{request.applicantDetails.addressTamil}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Submitted Documents</CardTitle>
              <CardDescription>சமர்ப்பிக்கப்பட்ட ஆவணங்கள்</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {request.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">{doc.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Review Section */}
          <Card>
            <CardHeader>
              <CardTitle>Review & Comments</CardTitle>
              <CardDescription>மதிப்பாய்வு மற்றும் கருத்துகள்</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="comments">Comments (Optional)</Label>
                  <Textarea
                    id="comments"
                    placeholder="Add any comments or notes for this request..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Separator />

                <div className="flex space-x-4">
                  <Button 
                    variant="default" 
                    onClick={handleApprove}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve & Send to Higher Officials
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleReject}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}