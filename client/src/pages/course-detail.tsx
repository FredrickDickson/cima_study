import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Link, useLocation } from "wouter";
import { Star, Clock, Users, BookOpen, PlayCircle, CheckCircle } from "lucide-react";
import type { CourseWithDetails, ReviewWithUser } from "@shared/schema";

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: course, isLoading } = useQuery<CourseWithDetails>({
    queryKey: [`/api/courses/${id}`],
    enabled: !!id,
  });

  const { data: enrollment } = useQuery({
    queryKey: [`/api/enrollments/check/${id}`],
    enabled: !!id && !!user,
  });

  const { data: reviews = [] } = useQuery<ReviewWithUser[]>({
    queryKey: [`/api/reviews/${id}`],
    enabled: !!id,
  });

  const enrollMutation = useMutation({
    mutationFn: async () => {
      if (course?.price && parseFloat(course.price.toString()) > 0) {
        setLocation(`/checkout/${id}`);
        return;
      }
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: id }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to enroll');
      return response.json();
    },
    onSuccess: () => {
      if (!course?.price || parseFloat(course.price.toString()) === 0) {
        queryClient.invalidateQueries({ queryKey: [`/api/enrollments/check/${id}`] });
        queryClient.invalidateQueries({ queryKey: ['/api/enrollments'] });
        toast({
          title: "Enrolled Successfully",
          description: "You can now start learning!",
        });
      }
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Enrollment Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-muted rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist.</p>
          <Link href="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isEnrolled = !!enrollment;
  const totalLessons = course.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0;
  const avgRating = course.avgRating ? parseFloat(course.avgRating.toString()) : 0;
  const ratingCount = course.ratingCount || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Course Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {course.level}
                </Badge>
                {course.category && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {course.category.name}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="course-title">
                {course.title}
              </h1>
              {course.subtitle && (
                <p className="text-lg text-primary-foreground/90 mb-6" data-testid="course-subtitle">
                  {course.subtitle}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                {course.instructor && (
                  <div className="flex items-center space-x-2">
                    <img 
                      src={course.instructor.profileImageUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100`}
                      alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                      className="w-8 h-8 rounded-full object-cover"
                      data-testid="instructor-avatar"
                    />
                    <span>By {course.instructor.firstName} {course.instructor.lastName}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{avgRating.toFixed(1)} ({ratingCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrollmentCount} students</span>
                </div>
              </div>
            </div>

            {/* Course Card Preview */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-lg">
                <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                  {course.thumbnailUrl ? (
                    <img 
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      data-testid="course-thumbnail"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/30">
                      <PlayCircle className="w-16 h-16 text-primary" />
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-foreground mb-4" data-testid="course-price">
                    {course.price && parseFloat(course.price.toString()) > 0 
                      ? `$${parseFloat(course.price.toString()).toFixed(2)} ${course.currency || 'USD'}`
                      : 'Free'
                    }
                  </div>
                  
                  {isEnrolled ? (
                    <Link href={`/learn/${course.id}/1`}>
                      <Button className="w-full" size="lg" data-testid="button-continue-learning">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      onClick={() => enrollMutation.mutate()}
                      disabled={enrollMutation.isPending}
                      className="w-full" 
                      size="lg"
                      data-testid="button-enroll"
                    >
                      {enrollMutation.isPending 
                        ? 'Processing...' 
                        : course.price && parseFloat(course.price.toString()) > 0 
                          ? 'Enroll Now' 
                          : 'Enroll Free'
                      }
                    </Button>
                  )}

                  <Separator className="my-6" />

                  <div className="space-y-4 text-sm">
                    {course.duration && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>Duration</span>
                        </div>
                        <span className="font-medium">{course.duration} hours</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span>Lessons</span>
                      </div>
                      <span className="font-medium">{totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground" />
                        <span>Certificate</span>
                      </div>
                      <span className="font-medium">Yes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum" data-testid="tab-curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="prose prose-slate max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Course Description</h3>
                    <div className="text-muted-foreground leading-relaxed mb-6" data-testid="course-description">
                      {course.description || 'No description available.'}
                    </div>

                    {course.tags && course.tags.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                        <div className="flex flex-wrap gap-2">
                          {course.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" data-testid={`tag-${index}`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Course Curriculum</h3>
                    {course.modules && course.modules.length > 0 ? (
                      <div className="space-y-4">
                        {course.modules.map((module, moduleIndex) => (
                          <Card key={module.id} data-testid={`module-${moduleIndex}`}>
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">{module.title}</h4>
                              {module.description && (
                                <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                              )}
                              {module.lessons && module.lessons.length > 0 && (
                                <div className="space-y-2 ml-4">
                                  {module.lessons.map((lesson, lessonIndex) => (
                                    <div key={lesson.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                      <div className="flex items-center space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                                          {lessonIndex + 1}
                                        </div>
                                        <span className="text-sm">{lesson.title}</span>
                                      </div>
                                      {lesson.duration && (
                                        <span className="text-xs text-muted-foreground">
                                          {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Curriculum will be available soon.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Student Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(avgRating) ? 'fill-current text-yellow-500' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                        <span className="font-medium">{avgRating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({ratingCount} reviews)</span>
                      </div>
                    </div>

                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <Card key={review.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-4">
                                <img 
                                  src={review.user.profileImageUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100`}
                                  alt={`${review.user.firstName} ${review.user.lastName}`}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <p className="font-medium">{review.user.firstName} {review.user.lastName}</p>
                                      <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                          <Star 
                                            key={i} 
                                            className={`w-3 h-3 ${i < review.rating ? 'fill-current text-yellow-500' : 'text-muted-foreground'}`} 
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
                                    </span>
                                  </div>
                                  {review.comment && (
                                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No reviews yet. Be the first to review this course!</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Instructor Info */}
            <div className="lg:col-span-1">
              {course.instructor && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Instructor</h3>
                    <div className="text-center space-y-4">
                      <img 
                        src={course.instructor.profileImageUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200`}
                        alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                        className="w-20 h-20 rounded-full object-cover mx-auto"
                        data-testid="instructor-profile-image"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">
                          {course.instructor.firstName} {course.instructor.lastName}
                        </h4>
                        {course.instructor.bio && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {course.instructor.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}