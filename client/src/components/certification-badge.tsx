import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CertificationBadgeProps {
  title: string;
  issuedDate: string;
  status: "completed" | "in-progress" | "locked";
  type?: "certificate" | "badge" | "fellowship";
  className?: string;
}

export default function CertificationBadge({ 
  title, 
  issuedDate, 
  status, 
  type = "certificate",
  className 
}: CertificationBadgeProps) {
  const statusConfig = {
    completed: {
      icon: "fas fa-medal",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
      label: "Completed"
    },
    "in-progress": {
      icon: "fas fa-clock",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      label: "In Progress"
    },
    locked: {
      icon: "fas fa-lock",
      color: "text-muted-foreground",
      bgColor: "bg-muted/30",
      borderColor: "border-border",
      label: "Locked"
    }
  };

  const typeConfig = {
    certificate: "Certificate",
    badge: "Achievement",
    fellowship: "Fellowship"
  };

  const config = statusConfig[status];

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        config.bgColor,
        config.borderColor,
        status === 'locked' && "opacity-60",
        className
      )}
      data-testid={`certification-${status}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className={cn("text-xl", config.color)}>
            <i className={config.icon}></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={cn(
                "font-medium text-sm truncate",
                status === 'locked' ? "text-muted-foreground" : "text-foreground"
              )} data-testid="certification-title">
                {title}
              </h4>
              <Badge 
                variant="outline" 
                className={cn("text-xs", config.color)}
                data-testid="certification-type"
              >
                {typeConfig[type]}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-xs",
                status === 'locked' ? "text-muted-foreground" : "text-muted-foreground"
              )} data-testid="certification-date">
                {status === 'completed' ? `Earned ${issuedDate}` : 
                 status === 'in-progress' ? `Started ${issuedDate}` : 
                 'Requirements not met'}
              </span>
              <Badge 
                variant="secondary" 
                className={cn("text-xs", config.color)}
                data-testid="certification-status"
              >
                {config.label}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
