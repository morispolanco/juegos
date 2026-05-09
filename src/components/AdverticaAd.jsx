import React, { useEffect } from 'react';

const AdverticaAd = ({ slotId, width = '100%', height = '90px' }) => {
  useEffect(() => {
    // Inject Advertica script dynamically if not present
    if (!document.getElementById('advertica-script')) {
      const script = document.createElement('script');
      script.id = 'advertica-script';
      script.src = 'https://ad.advertica.com/ad.js'; // Dummy URL for Advertica
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-6">
      <div 
        className="bg-parchment-200 border border-parchment-400 p-2 shadow-inner text-center text-sm text-ink-500 font-sans italic flex items-center justify-center relative overflow-hidden"
        style={{ width, height, minHeight: '90px' }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50 mix-blend-multiply"></div>
        <span className="relative z-10">Advertica Ad Slot {slotId}</span>
        {/* Actual integration would use something like <ins className="advertica-ad" data-ad-slot={slotId}></ins> */}
      </div>
    </div>
  );
};

export default AdverticaAd;
