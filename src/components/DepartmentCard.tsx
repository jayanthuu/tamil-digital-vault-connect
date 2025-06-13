import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface DepartmentCardProps {
  title: string;
  titleTamil: string;
  description: string;
  icon: LucideIcon;
  documentCount: number;
  category: string;
  isActive: boolean;
}

export function DepartmentCard({
  title,
  titleTamil,
  description,
  icon: Icon,
  documentCount,
  category,
  isActive
}: DepartmentCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 hover:scale-105 transform">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-lg font-semibold text-foreground">
          {titleTamil}
        </CardDescription>
        <CardDescription className="text-sm mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex justify-center space-x-2">
          <Badge variant={isActive ? "default" : "secondary"}>
            {category}
          </Badge>
          <Badge variant="outline">
            {documentCount} Documents
          </Badge>
        </div>
        
        <Button 
          className="w-full" 
          variant={isActive ? "default" : "outline"}
          disabled={!isActive}
        >
          {isActive ? "Access Documents" : "Coming Soon"}
        </Button>
        
        {!isActive && (
          <p className="text-xs text-muted-foreground">
            This department will be available soon
          </p>
        )}
      </CardContent>
    </Card>
  );
}