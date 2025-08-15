import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateImageSchema, type GenerateImageRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function ImageGenerationForm() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Unable to generate image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GenerateImageRequest) => {
    generateImageMutation.mutate(data);
  };

  const prompt = form.watch("prompt");

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8 mb-8">
      {generateImageMutation.isPending && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-4">
              <i className="fas fa-magic text-indigo-600 text-xl animate-pulse"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Image</h3>
            <p className="text-gray-600 mb-6">Our AI is painting your vision... This usually takes 10-30 seconds.</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full animate-pulse w-2/5"></div>
            </div>
            
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-900">
                  Describe your image
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      {...field}
                      placeholder="A serene landscape with mountains reflected in a crystal-clear lake at sunset, painted in the style of Claude Monet..."
                      className="resize-none h-24 pr-16"
                      maxLength={2000}
                      data-testid="input-prompt"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {prompt?.length || 0}/2000
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border-t border-gray-200 pt-6">
            <button 
              type="button"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors mb-4"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              data-testid="button-toggle-advanced"
            >
              <i className="fas fa-sliders-h mr-2"></i>
              Advanced Options
              <i className={`fas fa-chevron-down ml-2 transform transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`}></i>
            </button>
            
            {isAdvancedOpen && (
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-style">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="photorealistic">Photorealistic</SelectItem>
                          <SelectItem value="digital-art">Digital Art</SelectItem>
                          <SelectItem value="oil-painting">Oil Painting</SelectItem>
                          <SelectItem value="sketch">Sketch</SelectItem>
                          <SelectItem value="anime">Anime</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-size">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1024x1024">1024x1024 (Square)</SelectItem>
                          <SelectItem value="1024x1792">1024x1792 (Portrait)</SelectItem>
                          <SelectItem value="1792x1024">1792x1024 (Landscape)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Quality</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-quality">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="hd">HD</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button 
              type="submit"
              disabled={generateImageMutation.isPending || !prompt?.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              data-testid="button-generate"
            >
              {generateImageMutation.isPending ? (
                <span className="flex items-center">
                  <i className="fas fa-spinner animate-spin mr-2"></i>
                  Generating...
                </span>
              ) : (
                <span className="flex items-center">
                  <i className="fas fa-sparkles mr-2"></i>
                  Generate Image
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
