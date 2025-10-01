import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AcademicAdvising() {
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground" data-testid="title">Academic Advising</h1>
            <p className="text-lg text-muted-foreground">
              Get personalized guidance for your ADR education and career development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our academic advisors help you choose the right courses and certification 
                  programs based on your career goals and experience level.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Career Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get guidance on career pathways in international arbitration and mediation, 
                  including networking opportunities and professional development.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Schedule a Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Book a one-on-one session with our academic advisors to discuss your educational goals.
              </p>
              <Link href="/contact">
                <Button data-testid="button-schedule-consultation">
                  <i className="fas fa-calendar mr-2"></i>
                  Schedule Consultation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}