import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";

interface QuizQuestion {
  id: string;
  question: string;
  type: string;
  points: number;
  order: number;
  answers?: QuizAnswer[];
}

interface QuizAnswer {
  id: string;
  answer: string;
  isCorrect: boolean;
  order: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  maxAttempts: number;
  questions: QuizQuestion[];
}

export default function QuizPage() {
  const { quizId } = useParams();
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You need to be logged in to take quizzes.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: quiz, isLoading: quizLoading } = useQuery({
    queryKey: [`/api/quizzes/${quizId}`],
    enabled: !!quizId && isAuthenticated,
  });

  const { data: attempts = [] } = useQuery({
    queryKey: [`/api/quizzes/${quizId}/attempts`],
    enabled: !!quizId && isAuthenticated,
  });

  // Timer effect
  useEffect(() => {
    if (!quizStarted || timeRemaining <= 0 || quizSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, timeRemaining, quizSubmitted]);

  // Submit quiz mutation
  const submitQuizMutation = useMutation({
    mutationFn: async (quizAnswers: Record<string, string>) => {
      const response = await apiRequest("POST", `/api/quizzes/${quizId}/submit`, {
        answers: quizAnswers,
        timeSpent: quiz?.timeLimit - timeRemaining
      });
      return response.json();
    },
    onSuccess: () => {
      setQuizSubmitted(true);
      queryClient.invalidateQueries({ queryKey: [`/api/quizzes/${quizId}/attempts`] });
      toast({
        title: "Quiz Submitted",
        description: "Your quiz has been submitted successfully!",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    },
  });

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeRemaining(quiz?.timeLimit || 1800); // Default 30 minutes
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    if (quizSubmitted) return;
    submitQuizMutation.mutate(answers);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const nextQuestion = () => {
    if (currentQuestion < (quiz?.questions?.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="animate-pulse p-8">
          <div className="h-64 bg-muted rounded mb-4"></div>
          <div className="h-8 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (quizLoading || !quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="animate-pulse p-8">
          <div className="h-64 bg-muted rounded mb-4"></div>
          <div className="h-8 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Check if user has exceeded max attempts
  const hasExceededAttempts = attempts.length >= (quiz.maxAttempts || 3);

  if (hasExceededAttempts && !quizSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center" data-testid="max-attempts-reached">
          <h1 className="text-2xl font-bold text-foreground mb-4">Maximum Attempts Reached</h1>
          <p className="text-muted-foreground mb-8">
            You have reached the maximum number of attempts ({quiz.maxAttempts}) for this quiz.
          </p>
          <Button onClick={() => setLocation('/dashboard')} data-testid="back-to-dashboard">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (quizSubmitted) {
    const latestAttempt = attempts[0];
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16" data-testid="quiz-results">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-primary">
                {latestAttempt?.score || 'N/A'}%
              </div>
              <div>
                <Badge 
                  variant={latestAttempt?.passed ? "default" : "destructive"}
                  className="text-lg px-4 py-2"
                >
                  {latestAttempt?.passed ? "PASSED" : "FAILED"}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Passing score: {quiz.passingScore}%
              </p>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setLocation('/dashboard')}
                  data-testid="back-to-dashboard"
                >
                  Back to Dashboard
                </Button>
                {!latestAttempt?.passed && attempts.length < quiz.maxAttempts && (
                  <Button 
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizStarted(false);
                      setAnswers({});
                      setCurrentQuestion(0);
                    }}
                    data-testid="retake-quiz"
                  >
                    Retake Quiz
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16" data-testid="quiz-intro">
          <Card>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{quiz.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Quiz Details</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Questions: {quiz.questions?.length || 0}</div>
                    <div>Time Limit: {formatTime(quiz.timeLimit)}</div>
                    <div>Passing Score: {quiz.passingScore}%</div>
                    <div>Max Attempts: {quiz.maxAttempts}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Your Attempts</h3>
                  <div className="text-sm text-muted-foreground">
                    {attempts.length > 0 ? (
                      <div>
                        <div>Attempts: {attempts.length} / {quiz.maxAttempts}</div>
                        <div>Best Score: {Math.max(...attempts.map(a => parseInt(a.score || '0')))}%</div>
                      </div>
                    ) : (
                      <div>No previous attempts</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={startQuiz} 
                  size="lg"
                  data-testid="start-quiz"
                >
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions?.[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / (quiz.questions?.length || 1)) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8" data-testid="quiz-taking">
        {/* Quiz Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-foreground">{quiz.title}</h1>
            <div className="text-right">
              <div className="text-lg font-semibold text-primary" data-testid="timer">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-muted-foreground">Time Remaining</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {quiz.questions?.length}</span>
              <span>{progressPercentage.toFixed(0)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" data-testid="quiz-progress" />
          </div>
        </div>

        {/* Current Question */}
        {currentQ && (
          <Card className="mb-6" data-testid="current-question">
            <CardHeader>
              <CardTitle className="text-lg">
                {currentQ.question}
                <Badge variant="outline" className="ml-2">
                  {currentQ.points} points
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentQ.type === 'multiple_choice' && currentQ.answers && (
                <RadioGroup
                  value={answers[currentQ.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
                  data-testid="multiple-choice-answers"
                >
                  {currentQ.answers
                    .sort((a, b) => a.order - b.order)
                    .map((answer) => (
                      <div key={answer.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={answer.id} id={answer.id} />
                        <Label htmlFor={answer.id} className="flex-1 cursor-pointer">
                          {answer.answer}
                        </Label>
                      </div>
                    ))}
                </RadioGroup>
              )}

              {currentQ.type === 'essay' && (
                <Textarea
                  placeholder="Type your answer here..."
                  value={answers[currentQ.id] || ""}
                  onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                  className="min-h-[150px]"
                  data-testid="essay-answer"
                />
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div>
            {currentQuestion > 0 && (
              <Button 
                variant="outline" 
                onClick={prevQuestion}
                data-testid="prev-question"
              >
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            {currentQuestion < (quiz.questions?.length || 0) - 1 ? (
              <Button 
                onClick={nextQuestion}
                data-testid="next-question"
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitQuiz}
                disabled={submitQuizMutation.isPending}
                data-testid="submit-quiz"
              >
                {submitQuizMutation.isPending ? "Submitting..." : "Submit Quiz"}
              </Button>
            )}
          </div>
        </div>

        {/* Question Overview */}
        <Card className="mt-6" data-testid="question-overview">
          <CardHeader>
            <CardTitle className="text-lg">Question Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {quiz.questions?.map((q, index) => (
                <Button
                  key={q.id}
                  variant={index === currentQuestion ? "default" : answers[q.id] ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setCurrentQuestion(index)}
                  className="aspect-square"
                  data-testid={`question-nav-${index + 1}`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}