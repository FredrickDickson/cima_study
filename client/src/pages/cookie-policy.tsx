import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Footer from "@/components/footer";

export default function CookiePolicy() {
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
            <h1 className="text-4xl font-bold text-foreground" data-testid="title">Cookie Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">What Are Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our platform.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">How We Use Cookies</h2>
              
              <h3 className="text-xl font-semibold text-foreground">Essential Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies are necessary for the website to function properly. They enable core 
                functionality such as user authentication, course progress tracking, and secure areas 
                of our platform.
              </p>

              <h3 className="text-xl font-semibold text-foreground">Performance Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use these cookies to understand how visitors interact with our website, helping us 
                improve the user experience and identify technical issues.
              </p>

              <h3 className="text-xl font-semibold text-foreground">Functionality Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies remember your preferences and settings, such as language selection, 
                course progress, and display preferences, to provide a personalized experience.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use third-party services that place cookies on your device, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Payment processing services (for secure transactions)</li>
                <li>Video hosting services (for course content delivery)</li>
                <li>Analytics services (to understand platform usage)</li>
                <li>Communication tools (for student support)</li>
              </ul>

              <h2 className="text-2xl font-semibold text-foreground">Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                You can control and manage cookies through your browser settings. However, disabling 
                certain cookies may affect the functionality of our platform and your learning experience.
              </p>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="text-foreground font-medium mb-2">Browser Cookie Settings:</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Chrome: Settings → Privacy and Security → Cookies</li>
                  <li>Firefox: Settings → Privacy & Security → Cookies</li>
                  <li>Safari: Preferences → Privacy → Cookies</li>
                  <li>Edge: Settings → Cookies and Site Permissions</li>
                </ul>
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this cookie policy from time to time to reflect changes in our practices 
                or applicable laws. We encourage you to review this policy periodically.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-foreground font-medium">Data Protection Officer</p>
                <p className="text-muted-foreground">privacy@thecima.org</p>
                <p className="text-muted-foreground">
                  Oxford Science Park, John Eccles House<br />
                  Oxford, Oxfordshire, UK
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}