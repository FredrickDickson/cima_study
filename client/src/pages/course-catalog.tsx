import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CourseCatalog() {
  const courses = [
    {
      id: "international-arbitration",
      title: "International Commercial Arbitration",
      level: "Professional",
      duration: "6 weeks",
      price: "$2,850",
      description: "Comprehensive training in international commercial arbitration procedures, case management, and award enforcement.",
      features: ["ICC Rules", "UNCITRAL Guidelines", "Cross-border Disputes", "Award Writing"],
      category: "Arbitration"
    },
    {
      id: "international-mediation",
      title: "International Mediation Certification",
      level: "Professional", 
      duration: "4 weeks",
      price: "$2,200",
      description: "Skills-based competency training in international mediation techniques and conflict resolution.",
      features: ["Mediation Techniques", "Cultural Sensitivity", "Settlement Agreements", "Ethics"],
      category: "Mediation"
    },
    {
      id: "fcrimarb-fellowship",
      title: "FCIMArb Fellowship Program",
      level: "Advanced",
      duration: "12 weeks",
      price: "$4,750",
      description: "Premier professional qualification providing internationally recognized credentials for elite practitioners.",
      features: ["Fellow Designation", "Global Network", "Lifetime Membership", "Professional Recognition"],
      category: "Fellowship",
      featured: true
    },
    {
      id: "ethics-professional-standards",
      title: "Ethics & Professional Standards",
      level: "Foundation",
      duration: "2 weeks", 
      price: "$850",
      description: "Mandatory training covering CIMA's Code of Professional and Ethical Conduct for all members.",
      features: ["Professional Conduct", "Confidentiality", "Technology Ethics", "Compliance"],
      category: "Ethics"
    },
    {
      id: "adr-fundamentals",
      title: "ADR Fundamentals",
      level: "Foundation",
      duration: "3 weeks",
      price: "$1,500",
      description: "Introduction to alternative dispute resolution methods, principles, and best practices.",
      features: ["ADR Overview", "Process Selection", "Neutral Skills", "Case Studies"],
      category: "Foundation"
    },
    {
      id: "technology-adr",
      title: "Technology in ADR",
      level: "Specialized",
      duration: "2 weeks",
      price: "$1,200", 
      description: "Modern technology applications in dispute resolution, including AI tools and digital platforms.",
      features: ["Digital Platforms", "AI Ethics", "Virtual Hearings", "Data Security"],
      category: "Technology"
    }
  ];

  const categories = ["All", "Foundation", "Arbitration", "Mediation", "Fellowship", "Ethics", "Technology"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" data-testid="button-back">
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground" data-testid="title">Course Catalog</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional ADR training courses designed to build competency and expertise in international mediation and arbitration.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="rounded-full"
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card 
                key={course.id} 
                className={`hover:shadow-lg transition-shadow relative ${course.featured ? 'ring-2 ring-primary' : ''}`}
                data-testid={`course-card-${course.id}`}
              >
                {course.featured && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      <i className="fas fa-star mr-1"></i>
                      Featured
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {course.category}
                      </Badge>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span><i className="fas fa-signal mr-1"></i>{course.level}</span>
                    <span><i className="fas fa-clock mr-1"></i>{course.duration}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold text-foreground">{course.price}</div>
                      <div className="text-xs text-muted-foreground">USD</div>
                    </div>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      data-testid={`button-enroll-${course.id}`}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Course Requirements */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>Course Completion Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <i className="fas fa-credit-card text-primary text-2xl"></i>
                  <h4 className="font-medium">Full Payment</h4>
                  <p className="text-sm text-muted-foreground">Complete course fee payment required before access</p>
                </div>
                <div className="text-center space-y-2">
                  <i className="fas fa-user-graduate text-primary text-2xl"></i>
                  <h4 className="font-medium">Active Participation</h4>
                  <p className="text-sm text-muted-foreground">Attend all lectures and complete assignments</p>
                </div>
                <div className="text-center space-y-2">
                  <i className="fas fa-certificate text-primary text-2xl"></i>
                  <h4 className="font-medium">Certification</h4>
                  <p className="text-sm text-muted-foreground">Certificate issued within 14 days of completion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}