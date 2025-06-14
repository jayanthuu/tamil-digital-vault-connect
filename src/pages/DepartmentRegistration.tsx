import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DepartmentRegistration = () => {
  const [formData, setFormData] = useState({
    departmentName: "",
    officerName: "",
    designation: "",
    employeeId: "",
    officialEmail: "",
    phoneNumber: "",
    verificationDocument: null as File | null,
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, verificationDocument: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = [
      'departmentName', 'officerName', 'designation', 'employeeId', 
      'officialEmail', 'phoneNumber', 'password', 'confirmPassword'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0 || !formData.verificationDocument) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields and upload verification document",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration Submitted",
        description: "Your application has been submitted for verification. You will be notified once approved.",
      });
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Tamil Nadu Document AI</h1>
            <p className="text-muted-foreground">Digital Document Management System</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <CardTitle>Department Authority Registration</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="departmentName">Department Name</Label>
                  <Input
                    id="departmentName"
                    type="text"
                    placeholder="e.g., Revenue Department"
                    value={formData.departmentName}
                    onChange={(e) => handleInputChange('departmentName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officerName">Officer Name</Label>
                  <Input
                    id="officerName"
                    type="text"
                    placeholder="Enter full name"
                    value={formData.officerName}
                    onChange={(e) => handleInputChange('officerName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    type="text"
                    placeholder="e.g., District Collector"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    type="text"
                    placeholder="Government Employee ID"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officialEmail">Official Email</Label>
                  <Input
                    id="officialEmail"
                    type="email"
                    placeholder="office@tn.gov.in"
                    value={formData.officialEmail}
                    onChange={(e) => handleInputChange('officialEmail', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Contact number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verificationDocument">Verification Document</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="verificationDocument"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('verificationDocument')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {formData.verificationDocument ? formData.verificationDocument.name : "Choose File"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload ID card or authorization letter (PDF, JPG, PNG)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting for Verification..." : "Submit for Verification"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already registered?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary"
                    onClick={() => navigate('/login?type=department')}
                  >
                    Login here
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DepartmentRegistration;