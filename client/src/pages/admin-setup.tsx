import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Users, Settings } from "lucide-react";

const adminSetupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  setupKey: z.string().min(1, "Setup key is required"),
});

type AdminSetupForm = z.infer<typeof adminSetupSchema>;

export default function AdminSetup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);

  const form = useForm<AdminSetupForm>({
    resolver: zodResolver(adminSetupSchema),
    defaultValues: {
      email: "",
      setupKey: "",
    },
  });

  const setupMutation = useMutation({
    mutationFn: async (data: AdminSetupForm) => {
      return await apiRequest("POST", "/api/admin/setup", data);
    },
    onSuccess: () => {
      toast({
        title: "Admin Setup Complete",
        description: "You can now access the admin dashboard. Please log in with your account.",
      });
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: "Setup Failed",
        description: error.message || "Failed to setup admin account",
        variant: "destructive",
      });
    },
  });

  const checkUserMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest("POST", "/api/admin/check-user", { email });
    },
    onSuccess: (data: any) => {
      if (data.exists) {
        toast({
          title: "User Found",
          description: `User ${data.user.firstName} ${data.user.lastName} will be made admin`,
        });
      } else {
        toast({
          title: "User Not Found",
          description: "Please make sure the user has registered first",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to check user",
        variant: "destructive",
      });
    },
  });

  const handleCheckUser = async () => {
    const email = form.getValues("email");
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address first",
        variant: "destructive",
      });
      return;
    }
    
    setIsChecking(true);
    await checkUserMutation.mutateAsync(email);
    setIsChecking(false);
  };

  const onSubmit = (data: AdminSetupForm) => {
    setupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">CIMA Learn Admin Setup</CardTitle>
            <CardDescription>
              Set up the first admin account for your platform
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Email</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="admin@thecima.org"
                          {...field}
                          data-testid="input-admin-email"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCheckUser}
                        disabled={isChecking || checkUserMutation.isPending}
                        data-testid="button-check-user"
                      >
                        <Users className="w-4 h-4" />
                      </Button>
                    </div>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">
                      Enter the email of a registered user to make them admin
                    </p>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="setupKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Setup Key</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter setup key"
                        {...field}
                        data-testid="input-setup-key"
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">
                      Contact platform developer for the setup key
                    </p>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={setupMutation.isPending}
                data-testid="button-setup-admin"
              >
                {setupMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Setting up...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Setup Admin Account
                  </div>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Setup Instructions:</h4>
            <ol className="text-xs text-muted-foreground space-y-1">
              <li>1. Register a normal user account first</li>
              <li>2. Enter that user's email above</li>
              <li>3. Use the setup key provided by the developer</li>
              <li>4. The user will be promoted to admin</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}