import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FCIMarbFellowship() {
  const fellowshipBenefits = [
    {
      icon: "fas fa-award",
      title: "Fellow Designation",
      description: "Internationally recognized FCIMArb post-nominal letters"
    },
    {
      icon: "fas fa-users",
      title: "Global Network Access", 
      description: "Connect with elite practitioners across major international cities"
    },
    {
      icon: "fas fa-gavel",
      title: "Tribunal Appointments",
      description: "Priority consideration for international arbitration panels"
    },
    {
      icon: "fas fa-infinity",
      title: "Lifetime Membership",
      description: "Permanent fellowship status with ongoing benefits"
    },
    {
      icon: "fas fa-handshake",
      title: "Referral Network",
      description: "Exclusive access to high-value case referrals"
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Continuing Education",
      description: "Advanced professional development opportunities"
    }
  ];

  const requirementSteps = [
    {
      step: 1,
      title: "Foundation Training",
      description: "Complete CIMA certified international mediation or arbitration course",
      duration: "4-6 weeks"
    },
    {
      step: 2,
      title: "Skills Assessment",
      description: "Demonstrate competency through practical exercises and case studies",
      duration: "2 weeks"
    },
    {
      step: 3,
      title: "Ethics Certification",
      description: "Complete mandatory Professional and Ethical Conduct training",
      duration: "1 week"
    },
    {
      step: 4,
      title: "Fellowship Portfolio",
      description: "Submit comprehensive portfolio demonstrating professional readiness",
      duration: "3 weeks"
    }
  ];

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-blue-900 text-primary-foreground relative overflow-hidden">
        {/* Ribbon Badge */}
        <div className="absolute top-8 right-8 z-10">
          <div className="bg-amber-500 text-amber-950 px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg transform rotate-12">
            <i className="fas fa-ribbon"></i>
            <span>International Recognition</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  Premier Qualification
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight" data-testid="title">
                  FCIMArb Fellowship
                </h1>
                <p className="text-lg text-blue-100 font-medium">
                  Fellow of the Center for International Mediators and Arbitrators
                </p>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Our most prestigious qualification. Join an elite community of certified arbitrators and mediators with global practice opportunities.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold">12 Weeks</div>
                  <div className="text-blue-200">Intensive Program</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">$4,750</div>
                  <div className="text-blue-200">Professional Investment</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  data-testid="button-apply-fellowship"
                  className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
                >
                  Apply for Fellowship
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors backdrop-blur-sm"
                  data-testid="button-fellowship-info"
                >
                  <i className="fas fa-info-circle mr-2"></i>
                  Fellowship Guide
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="FCIMArb Fellowship professional development" 
                className="rounded-xl shadow-lg w-full"
                data-testid="img-fellowship-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* Fellowship Benefits */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Fellowship Benefits</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Gain access to exclusive opportunities and recognition as a leading ADR professional.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fellowshipBenefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <i className={`${benefit.icon} text-primary text-2xl`}></i>
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Requirements & Process */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Fellowship Requirements</h2>
              <p className="text-lg text-muted-foreground">
                Complete our comprehensive skills-based competency program to earn your FCIMArb designation
              </p>
            </div>

            <div className="space-y-6">
              {requirementSteps.map((requirement, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                          {requirement.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{requirement.title}</h3>
                          <Badge variant="outline">{requirement.duration}</Badge>
                        </div>
                        <p className="text-muted-foreground">{requirement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Professional Standards */}
          <section className="bg-muted/30 rounded-xl p-8 space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Professional Standards</h2>
              <p className="text-lg text-muted-foreground">
                All Fellows must adhere to CIMA's Code of Professional and Ethical Conduct
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <i className="fas fa-shield-alt text-primary"></i>
                    <span>Ethical Standards</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-check text-primary text-sm"></i>
                    <span className="text-sm">Professional integrity and honesty</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-check text-primary text-sm"></i>
                    <span className="text-sm">Independence and impartiality</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-check text-primary text-sm"></i>
                    <span className="text-sm">Confidentiality protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-check text-primary text-sm"></i>
                    <span className="text-sm">Competence maintenance</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <i className="fas fa-laptop text-primary"></i>
                    <span>Technology Ethics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-check text-primary text-sm"></i>
                    <span className="text-sm">Responsible AI tool usage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-check text-primary text-sm"></i>
                    <span className="text-sm">Transparency in digital processes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-check text-primary text-sm"></i>
                    <span className="text-sm">Data security and privacy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-check text-primary text-sm"></i>
                    <span className="text-sm">Bias prevention measures</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/professional-standards">
                <Button variant="outline" data-testid="button-view-code">
                  <i className="fas fa-scroll mr-2"></i>
                  View Complete Code of Conduct
                </Button>
              </Link>
            </div>
          </section>

          {/* Certificate Timeline */}
          <section className="bg-primary/5 rounded-xl p-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Certificate Issuance</h2>
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center space-x-4 text-lg">
                      <i className="fas fa-clock text-primary text-2xl"></i>
                      <div>
                        <div className="font-semibold">14-Day Guarantee</div>
                        <div className="text-muted-foreground text-sm">
                          Upon fulfilling all course requirements, Fellows receive their certificate within 14 days of completion
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}