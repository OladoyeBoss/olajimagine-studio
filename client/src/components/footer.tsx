export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-sparkles text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                AiMagine
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Transform your imagination into stunning visuals with our advanced AI-powered image generation platform. Create, innovate, and inspire.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
                <i className="fab fa-discord text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
                <i className="fab fa-github text-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-indigo-400 transition-colors text-sm flex items-center space-x-2">
                  <i className="fas fa-home w-4"></i>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/profile" className="text-gray-300 hover:text-indigo-400 transition-colors text-sm flex items-center space-x-2">
                  <i className="fas fa-user w-4"></i>
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-300 hover:text-indigo-400 transition-colors text-sm flex items-center space-x-2">
                  <i className="fas fa-question-circle w-4"></i>
                  <span>Help & FAQ</span>
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-indigo-400 transition-colors text-sm flex items-center space-x-2">
                  <i className="fas fa-envelope w-4"></i>
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Features</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 text-sm flex items-center space-x-2">
                <i className="fas fa-robot text-indigo-400 w-4"></i>
                <span>AI Image Generation</span>
              </li>
              <li className="text-gray-300 text-sm flex items-center space-x-2">
                <i className="fas fa-palette text-purple-400 w-4"></i>
                <span>Multiple Art Styles</span>
              </li>
              <li className="text-gray-300 text-sm flex items-center space-x-2">
                <i className="fas fa-image text-pink-400 w-4"></i>
                <span>High Resolution Output</span>
              </li>
              <li className="text-gray-300 text-sm flex items-center space-x-2">
                <i className="fas fa-bolt text-yellow-400 w-4"></i>
                <span>Fast Processing</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 text-sm flex items-center space-x-3">
                <i className="fas fa-envelope text-indigo-400 w-4"></i>
                <span>support@aimagine.com</span>
              </li>
              <li className="text-gray-300 text-sm flex items-center space-x-3">
                <i className="fas fa-phone text-green-400 w-4"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="text-gray-300 text-sm flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-red-400 w-4"></i>
                <span>San Francisco, CA</span>
              </li>
              <li className="text-gray-300 text-sm flex items-center space-x-3">
                <i className="fas fa-clock text-blue-400 w-4"></i>
                <span>24/7 Support</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-gray-400 text-sm">
                © 2024 AiMagine. All rights reserved.
              </p>
              <div className="hidden md:block w-1 h-1 bg-gray-600 rounded-full"></div>
              <p className="text-gray-500 text-xs">
                Powered by advanced AI technology
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}