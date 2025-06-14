import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Clock } from "lucide-react";

const departments = {
  1: { name: "Revenue Department", nameTamil: "வருவாய் துறை" },
  2: { name: "Education Department", nameTamil: "கல்வித் துறை" },
  3: { name: "Sports Department", nameTamil: "விளையாட்டுத் துறை" },
  4: { name: "Healthcare Department", nameTamil: "சுகாதாரத் துறை" },
  5: { name: "TN Police Department", nameTamil: "தமிழ்நாடு காவல் துறை" }
};

const services = {
  1: [
    { id: 1, name: "Land Ownership Certificate", nameTamil: "நில உரிமை சான்றிதழ்", processingTime: "7-10 days", fee: "₹50" },
    { id: 2, name: "Revenue Survey Settlement", nameTamil: "வருவாய் கணக்கெடுப்பு தீர்வு", processingTime: "15-20 days", fee: "₹100" },
    { id: 3, name: "Property Tax Assessment", nameTamil: "சொத்து வரி மதிப்பீடு", processingTime: "5-7 days", fee: "₹25" }
  ],
  2: [
    { id: 1, name: "XII Certificate Duplicate", nameTamil: "XII சான்றிதழ் நகல்", processingTime: "3-5 days", fee: "₹30" },
    { id: 2, name: "X Certificate Duplicate", nameTamil: "X சான்றிதழ் நகல்", processingTime: "3-5 days", fee: "₹30" },
    { id: 3, name: "Transfer Certificate", nameTamil: "மாற்று சான்றிதழ்", processingTime: "2-3 days", fee: "₹20" },
    { id: 4, name: "Migration Certificate", nameTamil: "இடம்பெயர்வு சான்றிதழ்", processingTime: "5-7 days", fee: "₹40" }
  ],
  3: [
    { id: 1, name: "Sports Achievement Certificate", nameTamil: "விளையாட்டு சாதனை சான்றிதழ்", processingTime: "10-15 days", fee: "₹75" },
    { id: 2, name: "Athletic Registration", nameTamil: "தடகள பதிவு", processingTime: "7-10 days", fee: "₹60" },
    { id: 3, name: "Sports Facility Booking", nameTamil: "விளையாட்டு வசதி பதிவு", processingTime: "1-2 days", fee: "₹200/day" }
  ],
  4: [
    { id: 1, name: "Health Certificate", nameTamil: "சுகாதார சான்றிதழ்", processingTime: "3-5 days", fee: "₹40" },
    { id: 2, name: "Medical Fitness Certificate", nameTamil: "மருத்துவ தகுதி சான்றிதழ்", processingTime: "5-7 days", fee: "₹60" },
    { id: 3, name: "Vaccination Certificate", nameTamil: "தடுப்பூசி சான்றிதழ்", processingTime: "1-2 days", fee: "₹20" }
  ],
  5: [
    { id: 1, name: "Police Clearance Certificate", nameTamil: "காவல் அனுமதி சான்றிதழ்", processingTime: "15-20 days", fee: "₹100" },
    { id: 2, name: "Character Certificate", nameTamil: "நற்சான்றிதழ்", processingTime: "10-15 days", fee: "₹75" },
    { id: 3, name: "NOC Certificate", nameTamil: "தடையின்மை சான்றிதழ்", processingTime: "7-10 days", fee: "₹50" }
  ]
};

export default function Services() {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    reason: ""
  });

  const deptId = parseInt(departmentId || "1");
  const department = departments[deptId as keyof typeof departments];
  const departmentServices = services[deptId as keyof typeof services] || [];
  const service = selectedService ? departmentServices.find(s => s.id === selectedService) : null;

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate application submission
    toast({
      title: "Application Submitted",
      description: `Your request for ${service?.name} has been submitted successfully. You can track the progress in the Track Progress section.`,
    });
    
    // Reset form and go back
    setFormData({ fullName: "", email: "", phone: "", address: "", reason: "" });
    setSelectedService(null);
  };

  const handleTrackProgress = () => {
    navigate("/track-progress");
  };

  if (selectedService && service) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedService(null)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>Apply for {service.name}</CardTitle>
              <CardDescription className="text-base font-medium text-foreground">
                {service.nameTamil}
              </CardDescription>
              <div className="flex space-x-4 mt-2">
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  {service.processingTime}
                </Badge>
                <Badge variant="outline">Fee: {service.fee}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="reason">Reason for Application</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Please provide the reason for this application..."
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {department?.name} Services
              </h1>
              <p className="text-lg text-muted-foreground">
                {department?.nameTamil}
              </p>
            </div>
            
            <Button variant="outline" onClick={handleTrackProgress}>
              Track Progress
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {departmentServices.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription className="text-base font-medium text-foreground">
                      {service.nameTamil}
                    </CardDescription>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.processingTime}
                      </Badge>
                      <Badge variant="outline">Fee: {service.fee}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleServiceSelect(service.id)}
                  className="w-full"
                >
                  Apply for this Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {departmentServices.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No services available for this department.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}