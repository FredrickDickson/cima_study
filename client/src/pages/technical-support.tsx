import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TechnicalSupport() {
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
            <h1 className="text-4xl font-bold text-foreground" data-testid="title">Technical Support</h1>
            <p className="text-lg text-muted-foreground">
              Get technical assistance for platform issues and troubleshooting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Login and password problems</li>
                  <li>• Video playback issues</li>
                  <li>• Course access difficulties</li>
                  <li>• Payment processing errors</li>
                  <li>• Mobile app troubleshooting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Modern web browser (Chrome, Firefox, Safari)</li>
                  <li>• Stable internet connection</li>
                  <li>• JavaScript enabled</li>
                  <li>• Cookies enabled</li>
                  <li>• Updated browser version</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit a Technical Issue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For technical support, please contact us with detailed information about your issue.
              </p>
              <Link href="/contact">
                <Button data-testid="button-contact-tech">
                  <i className="fas fa-tools mr-2"></i>
                  Contact Technical Support
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