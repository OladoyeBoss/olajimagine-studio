
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import type { GeneratedImage } from "@shared/schema";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";

export function Profile() {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePicture: null as File | null,
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  const { data: images, isLoading: imagesLoading } = useQuery<GeneratedImage[]>({
    queryKey: ["/api/images"],
    enabled: isAuthenticated,
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (imageId: string) => {
      const res = await apiRequest("DELETE", `/api/images/${imageId}`);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Image Deleted",
        description: "The image has been successfully removed from your gallery.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      setSelectedImage(null);
    },
    onError: (error) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Unable to delete image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const regenerateImageMutation = useMutation({
    mutationFn: async (image: GeneratedImage) => {
      const res = await apiRequest("POST", "/api/generate-image", {
        prompt: image.prompt,
        style: image.style,
        size: image.size,
        quality: image.quality,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Image Regenerated",
        description: "A new version of your image has been created!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      setSelectedImage(null);
    },
    onError: (error) => {
      toast({
        title: "Regeneration Failed",
        description: error.message || "Unable to regenerate image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update profile");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setIsEditingProfile(false);
      setProfileForm({
        username: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        profilePicture: null,
      });
      setProfilePicturePreview(null);
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Unable to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    
    if (name === "profilePicture" && files && files[0]) {
      const file = files[0];
      setProfileForm(prev => ({ ...prev, profilePicture: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicturePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords don't match.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    if (profileForm.username) formData.append("username", profileForm.username);
    if (profileForm.currentPassword) formData.append("currentPassword", profileForm.currentPassword);
    if (profileForm.newPassword) formData.append("newPassword", profileForm.newPassword);
    if (profileForm.profilePicture) formData.append("profilePicture", profileForm.profilePicture);

    updateProfileMutation.mutate(formData);
  };

  const startEditingProfile = () => {
    setProfileForm(prev => ({
      ...prev,
      username: user?.username || "",
    }));
    setIsEditingProfile(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <i className="fas fa-lock text-4xl text-gray-400 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to view your profile and image gallery.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signin" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Sign In
              </Link>
              <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50">
                Create Account
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const downloadImage = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aimagine-${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleDeleteImage = (imageId: string) => {
    if (window.confirm("Are you sure you want to delete this image? This action cannot be undone.")) {
      deleteImageMutation.mutate(imageId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Profile Header */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4 overflow-hidden">
                  {user?.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <i className="fas fa-user text-indigo-600 text-2xl"></i>
                  )}
                </div>
                <button
                  onClick={startEditingProfile}
                  className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <i className="fas fa-edit text-gray-600 text-sm"></i>
                </button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.username}</h1>
              <p className="text-gray-600 mt-2">Email: {user?.email}</p>
              {user?.isPremium === "true" && (
                <span className="inline-block mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm px-4 py-2 rounded-full font-semibold">
                  <i className="fas fa-crown mr-2"></i>
                  PREMIUM MEMBER
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Your Generated Images</h3>
                <p className="text-gray-600 mt-1">
                  {images ? `${images.length} images generated` : "Loading your creations..."}
                </p>
              </div>
            </div>

            {imagesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-300"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : images && images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <div 
                    key={image.id} 
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={image.imageUrl} 
                        alt={image.prompt} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        loading="lazy"
                        onClick={() => setSelectedImage(image)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <button 
                          onClick={() => downloadImage(image.imageUrl, image.prompt)}
                          className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-lg hover:bg-white transition-colors"
                        >
                          <i className="fas fa-download text-sm"></i>
                        </button>
                        <button 
                          onClick={() => handleDeleteImage(image.id)}
                          className="bg-red-500/90 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                          disabled={deleteImageMutation.isPending}
                        >
                          {deleteImageMutation.isPending ? (
                            <i className="fas fa-spinner animate-spin text-sm"></i>
                          ) : (
                            <i className="fas fa-trash text-sm"></i>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 line-clamp-2" title={image.prompt}>
                        "{image.prompt}"
                      </p>
                      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                        <span>
                          {formatDistanceToNow(new Date(image.createdAt), { addSuffix: true })}
                        </span>
                        <div className="flex items-center space-x-2">
                          {image.provider && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                              {image.provider}
                            </span>
                          )}
                          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                            {image.size}
                          </span>
                          {image.quality === 'hd' && (
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                              HD
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <i className="fas fa-image text-gray-400 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Images Yet</h3>
                <p className="text-gray-600 mb-6">
                  You haven't generated any images yet. Start creating your AI masterpieces!
                </p>
                <Link 
                  to="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <i className="fas fa-sparkles mr-2"></i>
                  Generate Your First Image
                </Link>
              </div>
            )}

            {/* Edit Profile Modal */}
            <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                        {profilePicturePreview ? (
                          <img 
                            src={profilePicturePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : user?.profilePicture ? (
                          <img 
                            src={user.profilePicture} 
                            alt="Current" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <i className="fas fa-user text-gray-400"></i>
                        )}
                      </div>
                      <Input
                        id="profilePicture"
                        name="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleProfileFormChange}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      value={profileForm.username}
                      onChange={handleProfileFormChange}
                      placeholder="Enter new username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={profileForm.currentPassword}
                      onChange={handleProfileFormChange}
                      placeholder="Enter current password to make changes"
                    />
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={profileForm.newPassword}
                      onChange={handleProfileFormChange}
                      placeholder="Enter new password (optional)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={profileForm.confirmPassword}
                      onChange={handleProfileFormChange}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={updateProfileMutation.isPending}
                      className="flex-1"
                    >
                      {updateProfileMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner animate-spin mr-2"></i>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save mr-2"></i>
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Preview Modal */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Image Preview</DialogTitle>
                </DialogHeader>
                {selectedImage && (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage.imageUrl} 
                      alt={selectedImage.prompt}
                      className="w-full max-h-96 object-contain rounded-lg"
                    />
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">Prompt:</p>
                      <p className="text-sm text-gray-600">"{selectedImage.prompt}"</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                          {selectedImage.size}
                        </span>
                        {selectedImage.quality === 'hd' && (
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            HD
                          </span>
                        )}
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                          {selectedImage.provider}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadImage(selectedImage.imageUrl, selectedImage.prompt)}
                        >
                          <i className="fas fa-download mr-2"></i>
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => regenerateImageMutation.mutate(selectedImage)}
                          disabled={regenerateImageMutation.isPending}
                        >
                          {regenerateImageMutation.isPending ? (
                            <>
                              <i className="fas fa-spinner animate-spin mr-2"></i>
                              Regenerating...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-redo mr-2"></i>
                              Regenerate
                            </>
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteImage(selectedImage.id)}
                          disabled={deleteImageMutation.isPending}
                        >
                          {deleteImageMutation.isPending ? (
                            <>
                              <i className="fas fa-spinner animate-spin mr-2"></i>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-trash mr-2"></i>
                              Delete
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
