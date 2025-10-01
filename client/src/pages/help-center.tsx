import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpCenter() {
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground" data-testid="title">Help Center</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions and get support for your CIMA Learn experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <i className="fas fa-graduation-cap text-primary"></i>
                  <span>Getting Started</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn how to enroll in courses, navigate the platform, and begin your ADR education journey.
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <i className="fas fa-credit-card text-primary"></i>
                  <span>Billing & Payments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Information about course fees, payment methods, refunds, and billing inquiries.
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <i className="fas fa-certificate text-primary"></i>
                  <span>Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn about our certification programs, requirements, and how to download certificates.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground text-center">Frequently Asked Questions</h2>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>How do I enroll in a course?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Browse our course catalog, select the course you're interested in, and click "Enroll Now". 
                    You'll need to create an account and complete payment to access course materials.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What is the FCIMArb Fellowship?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The FCIMArb Fellowship is our premier professional qualification program for international 
                    arbitrators and mediators. It provides comprehensive training and globally recognized credentials.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How long do I have access to course materials?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most courses provide lifetime access to materials. Professional certification programs may 
                    have specific time limits outlined in the course details.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Can I get a refund if I'm not satisfied?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We offer a 14-day money-back guarantee for most courses. Professional certification programs 
                    have different refund policies due to their intensive nature.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-muted p-8 rounded-lg text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Still Need Help?</h3>
            <p className="text-muted-foreground">
              Our support team is here to help you with any questions or technical issues.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact">
                <Button data-testid="button-contact-support">
                  <i className="fas fa-envelope mr-2"></i>
                  Contact Support
                </Button>
              </Link>
              <Link href="/technical-support">
                <Button variant="outline" data-testid="button-technical-support">
                  <i className="fas fa-tools mr-2"></i>
                  Technical Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}