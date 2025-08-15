
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ImageGallery } from "@/components/image-gallery";

export function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Your Image Gallery</h1>
              <p className="text-gray-600 mt-2">All your AI-generated masterpieces in one place</p>
            </div>
            <ImageGallery />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
