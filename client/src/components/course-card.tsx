import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Star, Users, Clock, Crown, ShoppingCart } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    price: string;
    currency: string;
    thumbnailUrl?: string;
    level: string;
    avgRating: string;
    ratingCount: number;
    enrollmentCount: number;
    duration?: number;
    instructor?: {
      firstName?: string;
      lastName?: string;
    };
    category?: {
      name: string;
    };
    isFeatured?: boolean;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const defaultThumbnail = course.level === 'advanced' 
    ? "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    : course.category?.name?.toLowerCase().includes('mediation')
    ? "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    : "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300";

  const levelColors = {
    beginner: "bg-secondary/10 text-secondary",
    intermediate: "bg-green-100 text-green-700",
    advanced: "bg-accent/10 text-accent"
  };

  return (
    <Card 
      className="group hover:shadow-xl transition-shadow overflow-hidden" 
      data-testid={`course-card-${course.id}`}
    >
      <div className="relative">
        <img 
          src={course.thumbnailUrl || defaultThumbnail}
          alt={course.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          data-testid="course-thumbnail"
        />
        {course.isFeatured && (
          <Badge 
            className="absolute top-3 left-3 bg-primary text-primary-foreground"
            data-testid="featured-badge"
          >
            <Crown className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        <Badge 
          className={`absolute top-3 right-3 ${levelColors[course.level as keyof typeof levelColors] || levelColors.beginner}`}
          data-testid="level-badge"
        >
          {course.level}
        </Badge>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-accent fill-current" />
            <span className="text-sm text-muted-foreground" data-testid="course-rating">
              {course.avgRating} ({course.ratingCount})
            </span>
          </div>
          {course.category && (
            <Badge variant="outline" className="text-xs" data-testid="category-badge">
              {course.category.name}
            </Badge>
          )}
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid="course-title">
          {course.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2" data-testid="course-description">
          {course.subtitle || course.description || "Professional development course for ADR practitioners."}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {course.duration && (
              <span className="flex items-center space-x-1" data-testid="course-duration">
                <Clock className="w-3 h-3" />
                <span>{course.duration} hours</span>
              </span>
            )}
            <span className="flex items-center space-x-1" data-testid="course-students">
              <Users className="w-3 h-3" />
              <span>{course.enrollmentCount}</span>
            </span>
          </div>
        </div>

        {course.instructor && (
          <div className="text-sm text-muted-foreground mb-4" data-testid="instructor-info">
            By {course.instructor.firstName} {course.instructor.lastName}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-foreground" data-testid="course-price">
              {parseFloat(course.price) > 0 ? `$${course.price}` : 'Free'}
            </div>
            {parseFloat(course.price) > 0 && (
              <div className="text-sm text-muted-foreground">{course.currency}</div>
            )}
          </div>
          <Link href={`/course/${course.id}`}>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-blue-800 transition-colors"
              data-testid="view-course-button"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              View Course
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
