export function ApiStatusBanner() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <i className="fas fa-check-circle text-green-600"></i>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            GiftedTech API Connected
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              Your image generation system is now configured with GiftedTech APIs using the correct GET request format. 
              The system will try: Flux → Stable Diffusion → DeepSeek → Demo fallback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}