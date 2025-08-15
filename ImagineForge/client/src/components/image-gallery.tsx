import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import type { GeneratedImage } from "@shared/schema";

export function ImageGallery() {
  const { data: images, isLoading, error } = useQuery<GeneratedImage[]>({
    queryKey: ["/api/images"],
  });

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-red-400 text-xl"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-red-800">Loading Failed</h3>
              <p className="mt-1 text-sm text-red-700">
                Unable to load images. Please try refreshing the page.
              </p>
            </div>
          </div>
        </div>
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

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Your Generated Images</h3>
            <p className="text-gray-600 mt-1">Recent creations from your imagination</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors" data-testid="button-grid-view">
              <i className="fas fa-th-large"></i>
            </button>
            <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors" data-testid="button-list-view">
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>

        {isLoading ? (
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
                data-testid={`card-image-${image.id}`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={image.imageUrl} 
                    alt={image.prompt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    data-testid={`img-generated-${image.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => downloadImage(image.imageUrl, image.prompt)}
                      className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-lg hover:bg-white transition-colors"
                      data-testid={`button-download-${image.id}`}
                    >
                      <i className="fas fa-download text-sm"></i>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p 
                    className="text-sm text-gray-600 line-clamp-2" 
                    title={image.prompt}
                    data-testid={`text-prompt-${image.id}`}
                  >
                    "{image.prompt}"
                  </p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span data-testid={`text-created-${image.id}`}>
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
            <p className="text-gray-600">
              Generate your first AI image using the form above.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
