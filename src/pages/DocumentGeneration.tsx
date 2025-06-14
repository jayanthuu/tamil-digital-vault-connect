import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileText, Send, Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for document generation
const approvedRequests = {
  REQ003: {
    id: "REQ003",
    applicantName: "Muthu Selvam",
    applicantNameTamil: "முத்து செல்வம்",
    service: "Health Certificate",
    serviceTamil: "சுகாதார சான்றிதழ்",
    department: "Healthcare Department",
    departmentTamil: "சுகாதாரத் துறை",
    approvedBy: "District Health Officer",
    approvedDate: "2024-06-13",
    applicantDetails: {
      fatherName: "Selvam Raman",
      address: "456, Anna Nagar, Chennai - 600040",
      phone: "+91 9876543211",
      email: "muthu.selvam@email.com",
      aadhaar: "9876 5432 1098"
    }
  }
};

export default function DocumentGeneration() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [certificateNumber, setCertificateNumber] = useState(`HC/${new Date().getFullYear()}/001234`);
  const [validityPeriod, setValidityPeriod] = useState("1 Year");
  const [remarks, setRemarks] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const request = approvedRequests[requestId as keyof typeof approvedRequests];

  if (!request) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-lg text-muted-foreground">Request not found or not ready for generation</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleGenerateDocument = async () => {
    setIsGenerating(true);
    
    // Simulate document generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Document Generated Successfully",
        description: "The certificate has been generated and sent to the applicant.",
      });
    }, 3000);
  };

  const handleSendToApplicant = () => {
    toast({
      title: "Document Sent",
      description: "The certificate has been sent to the applicant via email and SMS.",
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
            Document Generation
          </h1>
          <p className="text-lg text-muted-foreground">
            ஆவணம் உருவாக்கம்
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
                <Badge variant="default">Ready to Generate</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Request ID</Label>
                  <p className="text-sm">{request.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Applicant</Label>
                  <p className="text-sm">{request.applicantName}</p>
                  <p className="text-xs text-muted-foreground">{request.applicantNameTamil}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Approved By</Label>
                  <p className="text-sm">{request.approvedBy}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Approved Date</Label>
                  <p className="text-sm">{new Date(request.approvedDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Details */}
          <Card>
            <CardHeader>
              <CardTitle>Certificate Details</CardTitle>
              <CardDescription>சான்றிதழ் விவரங்கள்</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="certNumber">Certificate Number</Label>
                    <Input
                      id="certNumber"
                      value={certificateNumber}
                      onChange={(e) => setCertificateNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="validity">Validity Period</Label>
                    <Input
                      id="validity"
                      value={validityPeriod}
                      onChange={(e) => setValidityPeriod(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="remarks">Remarks (Optional)</Label>
                  <Textarea
                    id="remarks"
                    placeholder="Add any special remarks or conditions..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
              <CardDescription>ஆவண முன்னோட்டம்</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 p-6 text-center bg-muted/10">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Health Certificate Preview</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Certificate No: {certificateNumber}
                </p>
                <div className="text-left max-w-md mx-auto space-y-2 text-sm">
                  <p><strong>Name:</strong> {request.applicantName}</p>
                  <p><strong>Father's Name:</strong> {request.applicantDetails.fatherName}</p>
                  <p><strong>Address:</strong> {request.applicantDetails.address}</p>
                  <p><strong>Valid Until:</strong> {new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>செயல்கள்</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!isGenerating ? (
                  <div className="flex space-x-4">
                    <Button 
                      variant="default" 
                      onClick={handleGenerateDocument}
                      className="flex-1"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Certificate
                    </Button>
                    <Button variant="outline">
                      <Printer className="h-4 w-4 mr-2" />
                      Print Preview
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg font-medium">Generating Certificate...</p>
                    <p className="text-sm text-muted-foreground">Please wait while we create the document</p>
                  </div>
                )}

                <Separator />

                {/* Final Actions */}
                <div className="flex space-x-4">
                  <Button 
                    variant="default" 
                    onClick={handleSendToApplicant}
                    className="flex-1"
                    disabled={isGenerating}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send to Applicant
                  </Button>
                  <Button variant="outline" disabled={isGenerating}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Copy
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