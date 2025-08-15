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
      return apiRequest("POST", "/api/auth/signout");
    },
    onSuccess: () => {
      // Clear all queries to reset authentication state
      queryClient.clear();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
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
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-sparkles text-white text-lg"></i>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AiMagine
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {isAuthenticated && (
                <Link
                  to="/profile"
                  className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-indigo-50 flex items-center space-x-2"
                >
                  <i className="fas fa-user text-sm"></i>
                  <span>Profile</span>
                </Link>
              )}
              <Link
                to="/help"
                className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-indigo-50 flex items-center space-x-2"
              >
                <i className="fas fa-question-circle text-sm"></i>
                <span>Help</span>
              </Link>
              <Link
                to="/contact"
                className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-indigo-50 flex items-center space-x-2"
              >
                <i className="fas fa-envelope text-sm"></i>
                <span>Contact</span>
              </Link>
              {user?.email === "admin@example.com" && (
                <Link
                  to="/admin"
                  className="relative text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-amber-50 flex items-center space-x-2"
                >
                  <i className="fas fa-crown text-sm"></i>
                  <span>Admin</span>
                </Link>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              ) : isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                      {user?.profilePicture ? (
                        <img 
                          src={user.profilePicture} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="fas fa-user text-white text-xs"></i>
                      )}
                    </div>
                    <div className="hidden lg:block">
                      <span className="text-sm font-medium text-gray-900">
                        {user?.username}
                      </span>
                      {user?.isPremium === "true" && (
                        <div className="flex items-center space-x-1">
                          <i className="fas fa-crown text-yellow-500 text-xs"></i>
                          <span className="text-xs text-yellow-600 font-medium">Premium</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSignout}
                    disabled={signoutMutation.isPending}
                    className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50 flex items-center space-x-2"
                  >
                    {signoutMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner animate-spin text-sm"></i>
                        <span>Signing out...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-out-alt text-sm"></i>
                        <span>Sign out</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Navigation (Hamburger Menu) */}
          <div className="md:hidden flex items-center space-x-4">
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            ) : isAuthenticated ? (
              <button
                onClick={handleSignout}
                disabled={signoutMutation.isPending}
                className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 p-2 rounded-lg hover:bg-red-50"
                aria-label="Sign Out"
              >
                {signoutMutation.isPending ? (
                  <i className="fas fa-spinner animate-spin text-sm"></i>
                ) : (
                  <i className="fas fa-sign-out-alt text-sm"></i>
                )}
              </button>
            ) : (
              <Link
                to="/signin"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                Sign In
              </Link>
            )}
            <button
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label="Open menu"
              // onClick={toggleMobileMenu} // Function to toggle mobile menu needs to be implemented
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}