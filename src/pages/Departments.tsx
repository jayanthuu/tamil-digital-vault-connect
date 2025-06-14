import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DepartmentCard } from "@/components/DepartmentCard";
import { 
  Building, 
  Car, 
  GraduationCap, 
  Heart, 
  Home, 
  Shield, 
  TreePine, 
  Briefcase,
  Search,
  LogOut,
  User,
  Bell
} from "lucide-react";

interface User {
  name: string;
  username: string;
}

interface DepartmentsProps {
  user: User;
  onLogout: () => void;
}

const departments = [
  {
    id: 1,
    title: "Revenue Department",
    titleTamil: "வருவாய் துறை",
    description: "Land records, survey settlements, and revenue collection",
    icon: Building,
    documentCount: 15,
    category: "Revenue Department",
    isActive: true
  },
  {
    id: 2,
    title: "Education Department",
    titleTamil: "கல்வித் துறை",
    description: "Educational certificates, transcripts, and academic records",
    icon: GraduationCap,
    documentCount: 8,
    category: "Education",
    isActive: true
  },
  {
    id: 3,
    title: "Sports Department",
    titleTamil: "விளையாட்டுத் துறை",
    description: "Sports certificates, athlete registration, and sports facility permits",
    icon: Heart,
    documentCount: 6,
    category: "Sports Department",
    isActive: true
  },
  {
    id: 4,
    title: "Healthcare Department",
    titleTamil: "சுகாதாரத் துறை",
    description: "Medical certificates, health records, and vaccination certificates",
    icon: Heart,
    documentCount: 10,
    category: "Healthcare",
    isActive: true
  },
  {
    id: 5,
    title: "TN Police Department",
    titleTamil: "தமிழ்நாடு காவல் துறை",
    description: "Police clearance, NOC, and verification certificates",
    icon: Shield,
    documentCount: 5,
    category: "TN Police Department",
    isActive: true
  }
];

export default function Departments({ user, onLogout }: DepartmentsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAccessDocuments = (departmentId: number) => {
    navigate(`/documents/${departmentId}`);
  };

  const handleApply = (departmentId: number) => {
    navigate(`/services/${departmentId}`);
  };

  const categories = Array.from(new Set(departments.map(dept => dept.category)));

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.titleTamil.includes(searchTerm) ||
                         dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || dept.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary rounded-lg">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Tamil Document Access</h1>
                <p className="text-sm text-muted-foreground">Government of Tamil Nadu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Department Services</h2>
          <p className="text-lg text-muted-foreground">
            Access documents and services from various government departments
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold text-primary">{departments.length}</div>
            <div className="text-sm text-muted-foreground">Total Departments</div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">
              {departments.filter(d => d.isActive).length}
            </div>
            <div className="text-sm text-muted-foreground">Active Services</div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">
              {departments.reduce((sum, d) => sum + d.documentCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Documents</div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDepartments.map(department => (
            <DepartmentCard
              key={department.id}
              title={department.title}
              titleTamil={department.titleTamil}
              description={department.description}
              icon={department.icon}
              documentCount={department.documentCount}
              category={department.category}
              isActive={department.isActive}
              departmentId={department.id}
              onAccessDocuments={handleAccessDocuments}
              onApply={handleApply}
            />
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No departments found matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Government of Tamil Nadu. All rights reserved.</p>
            <p className="mt-2">
              For technical support: <a href="mailto:support@tn.gov.in" className="text-primary hover:underline">support@tn.gov.in</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}