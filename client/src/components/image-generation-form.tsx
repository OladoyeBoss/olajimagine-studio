
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateImageSchema, type GenerateImageRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export function ImageGenerationForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading } = useAuth();

  const form = useForm<GenerateImageRequest>({
    resolver: zodResolver(generateImageSchema),
    defaultValues: {
      prompt: "",
      style: "photorealistic",
      size: "1024x1024",
      quality: "standard",
    },
  });

  const generateImageMutation = useMutation({
    mutationFn: async (data: GenerateImageRequest) => {
      const res = await apiRequest("POST", "/api/generate-image", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Image Generated Successfully",
        description: "Your AI-generated image is ready!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      form.reset();
      setIsGenerating(false);
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Unable to generate image. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    },
  });

  const onSubmit = (data: GenerateImageRequest) => {
    setIsGenerating(true);
    generateImageMutation.mutate(data);
  };

  const prompt = form.watch("prompt");

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <i className="fas fa-lock text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Sign In Required</h3>
          <p className="text-gray-600 mb-6">
            Please sign in to start generating amazing images with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signin" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Sign In
            </Link>
            <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50">
              Create Account
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AI Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-sm font-semibold text-gray-700">
              Describe your image
            </Label>
            <Textarea
              id="prompt"
              placeholder="A majestic mountain landscape at sunset with golden light..."
              className="min-h-[100px] resize-none"
              {...form.register("prompt")}
            />
            {form.formState.errors.prompt && (
              <p className="text-sm text-red-600">{form.formState.errors.prompt.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Style</Label>
              <Select
                value={form.watch("style")}
                onValueChange={(value) => form.setValue("style", value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photorealistic">Photorealistic</SelectItem>
                  <SelectItem value="artistic">Artistic</SelectItem>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Size</Label>
              <Select
                value={form.watch("size")}
                onValueChange={(value) => form.setValue("size", value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1024x1024">Square (1024x1024)</SelectItem>
                  <SelectItem value="1792x1024">Landscape (1792x1024)</SelectItem>
                  <SelectItem value="1024x1792">Portrait (1024x1792)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Quality</Label>
              <Select
                value={form.watch("quality")}
                onValueChange={(value) => form.setValue("quality", value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="hd">HD Quality</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!prompt?.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
          >
            {isGenerating ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Generating Image...
              </>
            ) : (
              <>
                <i className="fas fa-sparkles mr-2"></i>
                Generate Image
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
