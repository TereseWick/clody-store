
'use client';

export default function VideoBanner() {
    return (
        <div className="relative">
            <video 
            autoPlay loop muted playsInline 
            className="w-full h-auto block"
            src="/video.mp4" 
            poster="/media/poster.jpg"   
          />
        
         <div className="absolute inset-0 flex items-end p-6 pointer-events-none">
            <div className="bg-brand-500/80 backdrop-blur rounded-xl px-4 py-2 text-brand-300 text-sm">
                Whats in my bag?
            </div>
          </div>
        </div>
    )
}