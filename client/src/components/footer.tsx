export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <img 
              src="https://files.catbox.moe/i0abuj.jpg" 
              alt="Oladoyebossimagine Studio" 
              className="w-6 h-6 rounded-lg object-cover"
            />
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Oladoyebossimagine Studio
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Powered by AI image generation with multi-provider fallback
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <a 
              href="https://www.instagram.com/oladoyeauthor?igsh=MThkMHl4NGJ4cXg2cg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a 
              href="https://www.facebook.com/OladoyeAuthor1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a 
              href="https://wa.me/2349065497700" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <i className="fab fa-whatsapp text-xl"></i>
            </a>
          </div>
          <p className="text-xs text-gray-500">
            All rights reserved. This is a property of <strong>Oladoye Author</strong>. Use at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
}