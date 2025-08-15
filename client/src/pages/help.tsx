
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function Help() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Help & Documentation</h1>
            <p className="text-gray-600 mt-2">Everything you need to know about Oladoyebossimagine Studio</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-question-circle text-indigo-600 mr-3"></i>
                How to Use
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold">1. Sign Up</h3>
                  <p className="text-sm">Create an account to start generating and saving images.</p>
                </div>
                <div>
                  <h3 className="font-semibold">2. Enter Your Prompt</h3>
                  <p className="text-sm">Describe the image you want to create in detail.</p>
                </div>
                <div>
                  <h3 className="font-semibold">3. Choose Settings</h3>
                  <p className="text-sm">Select image size, quality, and style preferences.</p>
                </div>
                <div>
                  <h3 className="font-semibold">4. Generate</h3>
                  <p className="text-sm">Click generate and wait for your AI-created masterpiece!</p>
                </div>
                <div>
                  <h3 className="font-semibold">5. View Gallery</h3>
                  <p className="text-sm">Access all your generated images in your personal gallery.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-star text-yellow-500 mr-3"></i>
                Premium Features
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800">Premium Users Get:</h3>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>• Unlimited image generations</li>
                    <li>• Higher quality outputs</li>
                    <li>• Priority processing</li>
                    <li>• Advanced style options</li>
                    <li>• Exclusive features access</li>
                  </ul>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Premium Access:</p>
                  <p>Currently provided to select users. Contact us for more information.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-envelope text-indigo-600 mr-3"></i>
                Contact the Creator
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="text-sm">Need help or have suggestions? Reach out to our creator:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <i className="fas fa-envelope w-5 text-indigo-600"></i>
                    <span className="ml-3 text-sm">oladoyejoel3@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone w-5 text-indigo-600"></i>
                    <span className="ml-3 text-sm">+234 703 316 4076</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fab fa-whatsapp w-5 text-green-600"></i>
                    <span className="ml-3 text-sm">+234 906 549 7700</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-lightbulb text-yellow-500 mr-3"></i>
                Tips for Better Results
              </h2>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <h3 className="font-semibold">Writing Good Prompts:</h3>
                  <ul className="mt-1 space-y-1">
                    <li>• Be specific and detailed</li>
                    <li>• Include style preferences</li>
                    <li>• Mention colors and mood</li>
                    <li>• Specify composition details</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Example:</h3>
                  <p className="italic">"A majestic lion in a golden savanna during sunset, photorealistic style, warm lighting, detailed fur texture"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
