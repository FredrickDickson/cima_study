import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function CommunityForum() {
  const forumCategories = [
    {
      id: "general-discussion",
      title: "General Discussion",
      description: "Open discussions about ADR practice and industry trends",
      posts: 284,
      members: 1567,
      latestActivity: "2 hours ago",
      icon: "fas fa-comments"
    },
    {
      id: "arbitration",
      title: "International Arbitration",
      description: "Discussions on arbitration cases, procedures, and best practices",
      posts: 156,
      members: 892,
      latestActivity: "45 minutes ago",
      icon: "fas fa-gavel"
    },
    {
      id: "mediation", 
      title: "Mediation Techniques",
      description: "Share mediation strategies and conflict resolution approaches",
      posts: 98,
      members: 634,
      latestActivity: "1 hour ago",
      icon: "fas fa-handshake"
    },
    {
      id: "ethics",
      title: "Professional Ethics",
      description: "Discuss ethical challenges and professional conduct standards",
      posts: 67,
      members: 423,
      latestActivity: "3 hours ago",
      icon: "fas fa-shield-alt"
    },
    {
      id: "technology",
      title: "Technology in ADR",
      description: "Explore digital tools, AI applications, and virtual proceedings",
      posts: 89,
      members: 512,
      latestActivity: "30 minutes ago",
      icon: "fas fa-laptop"
    },
    {
      id: "career-development",
      title: "Career Development",
      description: "Professional growth, networking, and industry opportunities",
      posts: 124,
      members: 758,
      latestActivity: "4 hours ago",
      icon: "fas fa-user-graduate"
    }
  ];

  const recentDiscussions = [
    {
      title: "Best practices for virtual arbitration hearings",
      author: "Sarah M.",
      category: "Technology",
      replies: 12,
      views: 234,
      lastActivity: "2 hours ago",
      featured: true
    },
    {
      title: "Confidentiality obligations in multi-party disputes",
      author: "James K.",
      category: "Ethics", 
      replies: 8,
      views: 156,
      lastActivity: "3 hours ago",
      featured: false
    },
    {
      title: "Career transition from law to mediation",
      author: "Maria L.",
      category: "Career Development",
      replies: 15,
      views: 298,
      lastActivity: "5 hours ago",
      featured: false
    },
    {
      title: "AI tools for case analysis - ethical considerations",
      author: "David R.",
      category: "Technology",
      replies: 22,
      views: 445,
      lastActivity: "1 day ago",
      featured: true
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
            <Button data-testid="button-new-discussion">
              <i className="fas fa-plus mr-2"></i>
              New Discussion
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground" data-testid="title">Community Forum</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with ADR professionals worldwide. Share knowledge, ask questions, and build meaningful relationships in our global community.
            </p>
          </div>

          {/* Community Guidelines Notice */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <i className="fas fa-info-circle text-primary text-xl mt-1"></i>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Community Guidelines</h3>
                  <p className="text-muted-foreground text-sm">
                    All participants must adhere to CIMA's Code of Conduct. Maintain professional standards, 
                    respect confidentiality, and engage constructively. Violations may result in account suspension.
                  </p>
                  <Link href="/student-conduct">
                    <Button variant="link" className="p-0 h-auto text-primary text-sm mt-2">
                      Read Complete Guidelines →
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Forum Categories */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Discussion Categories</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forumCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <i className={`${category.icon} text-primary`}></i>
                      </div>
                      <span className="text-lg">{category.title}</span>
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-foreground">{category.posts}</div>
                        <div className="text-xs text-muted-foreground">Posts</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-foreground">{category.members}</div>
                        <div className="text-xs text-muted-foreground">Members</div>
                      </div>
                    </div>
                    
                    <div className="text-center text-xs text-muted-foreground border-t pt-3">
                      Latest activity: {category.latestActivity}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      data-testid={`enter-${category.id}`}
                    >
                      Enter Discussion
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Discussions */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Recent Discussions</h2>
              <Button variant="outline" size="sm" data-testid="button-view-all">
                View All Discussions
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentDiscussions.map((discussion, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start space-x-3">
                          {discussion.featured && (
                            <Badge className="bg-amber-500 text-amber-950 text-xs">
                              <i className="fas fa-star mr-1"></i>
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {discussion.category}
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                          {discussion.title}
                        </h3>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {discussion.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>by {discussion.author}</span>
                          </div>
                          <span><i className="fas fa-reply mr-1"></i>{discussion.replies} replies</span>
                          <span><i className="fas fa-eye mr-1"></i>{discussion.views} views</span>
                          <span><i className="fas fa-clock mr-1"></i>{discussion.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Community Stats */}
          <section className="bg-muted/30 rounded-xl p-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Community Impact</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2,847</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1,256</div>
                  <div className="text-sm text-muted-foreground">Discussions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">8,492</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">45</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
              </div>
            </div>
          </section>

          {/* Member Access */}
          <section className="text-center space-y-6">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <i className="fas fa-users text-primary text-3xl"></i>
                  <h3 className="text-xl font-bold text-foreground">Join the Conversation</h3>
                  <p className="text-muted-foreground">
                    Access to the community forum requires CIMA membership or student enrollment. 
                    Connect with professionals and expand your ADR network.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button data-testid="button-member-login">
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Member Login
                    </Button>
                    <Button variant="outline" data-testid="button-join-community">
                      Join CIMA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}