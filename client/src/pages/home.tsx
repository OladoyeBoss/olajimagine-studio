import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ImageGenerationForm } from "@/components/image-generation-form";
import { ImageGallery } from "@/components/image-gallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Create <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Amazing Images</span> 
              with Oladoyebossimagine AI
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your ideas into stunning visuals using multiple AI providers with automatic fallback. 
              Our system tries Flux first, then Stable Diffusion, then DeepSeek to ensure reliable generation.
              Sign up to start creating and save your images!
            </p>
          </div>
        </section>

        {/* Generation Interface */}
        <section className="py-8 lg:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImageGenerationForm />
          </div>
        </section>

        {/* Image Gallery */}
        <ImageGallery />
      </main>

      <Footer />
    </div>
  );
}
