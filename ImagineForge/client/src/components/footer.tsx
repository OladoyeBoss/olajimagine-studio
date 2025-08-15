export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-magic text-white text-xs"></i>
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Olajimagine Studio
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Powered by AI image generation with multi-provider fallback
          </p>
          <p className="text-xs text-gray-500">
            All rights reserved. This is a property of <strong>Oladoye author</strong>. Use at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
}