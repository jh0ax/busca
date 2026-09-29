import { useState } from "react";
import { X } from "lucide-react";

export default function VSL() {
  const [showCTA, setShowCTA] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const currentTime = e.currentTarget.currentTime;
    if (currentTime >= 300) setShowCTA(true);
    if (currentTime >= 330) setShowModal(true);
  };

  const getCheckoutUrl = () => {
    const CHECKOUT_URL = "COLE_AQUI_EL_LINK_DEL_CHECKOUT";
    try {
      const url = new URL(CHECKOUT_URL);
      const params = new URLSearchParams(window.location.search);
      params.forEach((val, key) => url.searchParams.set(key, val));
      return url.toString();
    } catch {
      return CHECKOUT_URL + window.location.search;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl space-y-8">
        <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl relative">
          <video 
            className="w-full h-full object-contain"
            controls
            onTimeUpdate={handleTimeUpdate}
            src="/vsl-video.mp4"
          >
            Tu navegador no soporta el video.
          </video>
        </div>

        {showCTA && (
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button 
              onClick={() => window.location.href = getCheckoutUrl()}
              className="w-full max-w-lg h-20 text-xl font-bold bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-[0_0_20px_rgba(22,163,74,0.4)]"
            >
              QUIERO EMPEZAR CON LOS 5 CÓDIGOS
            </button>
          </div>
        )}
      </div>

      {showModal && !modalClosed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-in zoom-in-95 duration-300 border border-gray-100">
            <button 
              onClick={() => setModalClosed(true)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-8">
              <p className="text-2xl font-bold text-gray-900 leading-tight">
                Ya conoces los 5 códigos.<br/>Ahora puedes empezar.
              </p>
              <button 
                onClick={() => window.location.href = getCheckoutUrl()}
                className="w-full h-16 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg"
              >
                QUIERO EMPEZAR CON LOS 5 CÓDIGOS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
