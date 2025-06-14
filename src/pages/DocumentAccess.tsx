import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye } from "lucide-react";

const departments = {
  1: { name: "Revenue Department", nameTamil: "வருவாய் துறை" },
  2: { name: "Education Department", nameTamil: "கல்வித் துறை" },
  3: { name: "Sports Department", nameTamil: "விளையாட்டுத் துறை" },
  4: { name: "Healthcare Department", nameTamil: "சுகாதாரத் துறை" },
  5: { name: "TN Police Department", nameTamil: "தமிழ்நாடு காவல் துறை" }
};

const documents = {
  1: [
    { id: 1, name: "Land Title Certificate", nameTamil: "நில உரிமை சான்றிதழ்", status: "Available", date: "2024-01-15" },
    { id: 2, name: "Revenue Survey Record", nameTamil: "வருவாய் கணக்கெடுப்பு பதிவு", status: "Available", date: "2024-02-10" },
    { id: 3, name: "Property Tax Receipt", nameTamil: "சொத்து வரி ரசீது", status: "Available", date: "2024-03-05" }
  ],
  2: [
    { id: 1, name: "XII Standard Certificate", nameTamil: "XII வகுப்பு சான்றிதழ்", status: "Available", date: "2023-06-01" },
    { id: 2, name: "X Standard Certificate", nameTamil: "X வகுப்பு சான்றிதழ்", status: "Available", date: "2021-06-01" },
    { id: 3, name: "Transfer Certificate", nameTamil: "மாற்று சான்றிதழ்", status: "Available", date: "2023-07-15" }
  ],
  3: [
    { id: 1, name: "Sports Achievement Certificate", nameTamil: "விளையாட்டு சாதனை சான்றிதழ்", status: "Available", date: "2024-01-20" },
    { id: 2, name: "Athletic Registration", nameTamil: "தடகள பதிவு", status: "Available", date: "2023-09-10" }
  ],
  4: [
    { id: 1, name: "Health Certificate", nameTamil: "சுகாதார சான்றிதழ்", status: "Available", date: "2024-05-15" },
    { id: 2, name: "Vaccination Certificate", nameTamil: "தடுப்பூசி சான்றிதழ்", status: "Available", date: "2023-12-01" },
    { id: 3, name: "Medical Fitness Certificate", nameTamil: "மருத்துவ தகுதி சான்றிதழ்", status: "Available", date: "2024-03-20" }
  ],
  5: [
    { id: 1, name: "Police Clearance Certificate", nameTamil: "காவல் அனுமதி சான்றிதழ்", status: "Processing", date: "2024-06-01" },
    { id: 2, name: "Character Certificate", nameTamil: "நற்சான்றிதழ்", status: "Available", date: "2024-02-28" }
  ]
};

export default function DocumentAccess() {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const deptId = parseInt(departmentId || "1");
  const department = departments[deptId as keyof typeof departments];
  const userDocuments = documents[deptId as keyof typeof documents] || [];

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
            {department?.name} Documents
          </h1>
          <p className="text-lg text-muted-foreground">
            {department?.nameTamil}
          </p>
        </div>

        <div className="space-y-4">
          {userDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{document.name}</CardTitle>
                    <CardDescription className="text-base font-medium text-foreground">
                      {document.nameTamil}
                    </CardDescription>
                    <CardDescription className="mt-1">
                      Issued on: {new Date(document.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge variant={document.status === "Available" ? "default" : "secondary"}>
                    {document.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={document.status !== "Available"}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    disabled={document.status !== "Available"}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {userDocuments.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No documents found for this department.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}