import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const signoutMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("/api/auth/signout", {
        method: "POST",
      });
    },
    onSuccess: () => {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSignout = () => {
    signoutMutation.mutate();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-magic text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Olajimagine Studio
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            ) : isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  Welcome, {user.username}
                </span>
                <button
                  onClick={handleSignout}
                  disabled={signoutMutation.isPending}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-signout"
                >
                  {signoutMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Signing out...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Sign Out
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                  data-testid="link-signin"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  data-testid="link-signup"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}