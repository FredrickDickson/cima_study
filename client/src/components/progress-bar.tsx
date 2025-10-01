import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "success" | "warning";
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  className,
  showPercentage = false,
  size = "md",
  color = "primary"
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };

  const colorClasses = {
    primary: "bg-primary",
    accent: "bg-accent",
    success: "bg-green-500",
    warning: "bg-yellow-500"
  };

  return (
    <div className={cn("space-y-2", className)} data-testid="progress-container">
      {showPercentage && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium" data-testid="progress-percentage">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", sizeClasses[size])} data-testid="progress-track">
        <div 
          className={cn(
            "h-full transition-all duration-300 ease-out rounded-full",
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
          data-testid="progress-fill"
        />
      </div>
    </div>
  );
}
