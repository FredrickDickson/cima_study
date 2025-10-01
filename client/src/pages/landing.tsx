import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WorldMap from "@/components/world-map";
import fellowshipImage from "@assets/stock_images/professional_arbitra_195864e0.jpg";
import maImage from "@assets/stock_images/mergers_acquisitions_0f9cf993.jpg";

export default function Landing() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-blue-900 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {t('landing.heroTitle')}{" "}
                  <span className="text-white">{t('landing.heroHighlight')}</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  {t('landing.heroSubtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  data-testid="button-explore-programs"
                  onClick={() => window.location.href = '/api/login'}
                  className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
                >
                  {t('landing.getStarted')}
                </Button>
                <Button 
                  data-testid="button-watch-overview"
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors backdrop-blur-sm"
                >
                  <i className="fas fa-play mr-2"></i>
                  {t('landing.watchOverview')}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-blue-400">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white" data-testid="stat-members">5,000+</div>
                  <div className="text-sm text-blue-200">{t('landing.globalMembers')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white" data-testid="stat-success">95%</div>
                  <div className="text-sm text-blue-200">{t('landing.successRate')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white" data-testid="stat-countries">50+</div>
                  <div className="text-sm text-blue-200">{t('landing.countries')}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional arbitration meeting" 
                className="rounded-xl shadow-2xl"
                data-testid="img-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-xl"></div>
              
              {/* Floating Achievement Card */}
              <Card className="absolute -bottom-6 -left-6 shadow-xl border border-border relative" data-testid="card-achievement">
                {/* Ribbon */}
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12">
                  <i className="fas fa-ribbon mr-1"></i>
                  Certified
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <i className="fas fa-certificate text-accent-foreground"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">FCIMArb Qualified</div>
                      <div className="text-sm text-muted-foreground">International Recognition</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{t('landing.featuredCoursesTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Accelerate your career with our internationally recognized qualification programs designed for aspiring ADR professionals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Global M&A Program */}
            <Card className="shadow-lg border border-border overflow-hidden group hover:shadow-xl transition-shadow" data-testid="card-program-ma">
              <img 
                src={maImage} 
                alt="M&A arbitration and mediation training" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Global M&A Program</h3>
                    <p className="text-sm text-accent font-medium">International Arbitration & Mediation</p>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  An expedited route for career development in international M&A dispute resolution. Master complex cross-border transactions and disputes.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-clock text-primary"></i>
                    <span className="text-sm text-muted-foreground">12 weeks intensive</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-globe text-primary"></i>
                    <span className="text-sm text-muted-foreground">International faculty</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-certificate text-primary"></i>
                    <span className="text-sm text-muted-foreground">Professional certification</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground" data-testid="price-ma">$2,950</div>
                    <div className="text-sm text-muted-foreground">USD</div>
                  </div>
                  <Button 
                    data-testid="button-learn-more-ma"
                    onClick={() => window.location.href = '/api/login'}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* FCIMArb Fellowship */}
            <Card className="shadow-lg border border-border overflow-hidden group hover:shadow-xl transition-shadow relative" data-testid="card-program-fellowship">
              {/* Ribbon Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                  <i className="fas fa-ribbon text-xs"></i>
                  <span>International Recognition</span>
                </div>
              </div>
              
              <img 
                src={fellowshipImage} 
                alt="FCIMArb Fellowship professional development" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">FCIMArb Fellowship</h3>
                    <p className="text-sm text-accent font-medium">Professional Qualification</p>
                  </div>
                  <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    Premium
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Internationally recognized and respected qualification upon program completion. Join an elite community of certified arbitrators and mediators.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-award text-accent"></i>
                    <span className="text-sm text-muted-foreground">Fellow designation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-users text-accent"></i>
                    <span className="text-sm text-muted-foreground">Global network access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-infinity text-accent"></i>
                    <span className="text-sm text-muted-foreground">Lifetime membership</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground" data-testid="price-fellowship">$4,750</div>
                    <div className="text-sm text-muted-foreground">USD</div>
                  </div>
                  <Button 
                    data-testid="button-apply-fellowship"
                    onClick={() => window.location.href = '/api/login'}
                    className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Community */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Global ADR Community</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with professionals worldwide and access opportunities in major international cities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <WorldMap />

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Worldwide Presence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join a distinguished global community with connections to prestigious international organizations in major financial and legal centers.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3" data-testid="location-london">
                    <i className="fas fa-map-marker-alt text-accent"></i>
                    <span className="font-medium text-foreground">London</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="location-accra">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                    <span className="font-medium text-foreground">Accra</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="location-singapore">
                    <i className="fas fa-map-marker-alt text-secondary"></i>
                    <span className="font-medium text-foreground">Singapore</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3" data-testid="location-dubai">
                    <i className="fas fa-map-marker-alt text-accent"></i>
                    <span className="font-medium text-foreground">Dubai</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="location-newyork">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                    <span className="font-medium text-foreground">New York</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="location-oxford">
                    <i className="fas fa-map-marker-alt text-secondary"></i>
                    <span className="font-medium text-foreground">Oxford</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="p-4 bg-muted/30" data-testid="benefit-network">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-users text-primary text-xl"></i>
                    <div>
                      <div className="font-medium text-foreground">Professional Network</div>
                      <div className="text-sm text-muted-foreground">Connect with 5,000+ ADR professionals globally</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-muted/30" data-testid="benefit-opportunities">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-briefcase text-accent text-xl"></i>
                    <div>
                      <div className="font-medium text-foreground">Career Opportunities</div>
                      <div className="text-sm text-muted-foreground">Access exclusive job postings and referrals</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-muted/30" data-testid="benefit-recognition">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-globe text-secondary text-xl"></i>
                    <div>
                      <div className="font-medium text-foreground">International Recognition</div>
                      <div className="text-sm text-muted-foreground">Credentials recognized worldwide</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
