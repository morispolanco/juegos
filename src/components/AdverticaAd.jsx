import React from 'react';

const AdverticaAd = ({ slotId, width = '100%', height = '90px' }) => {
  // Add slotId as a placement name parameter if needed, but we'll use the default URL provided
  const adUrl = `https://data527.click/791142c1667cb4f9f0d0/c95ca09a5b/?placementName=${slotId || 'default'}`;

  return (
    <div className="w-full flex justify-center my-6">
      <div 
        className="bg-parchment-200 border border-parchment-400 p-2 shadow-inner relative overflow-hidden flex items-center justify-center"
        style={{ width, height, minHeight: '90px' }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50 mix-blend-multiply pointer-events-none"></div>
        
        <iframe 
          src={adUrl}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          className="relative z-10"
          title={`Advertica Ad ${slotId}`}
          allowFullScreen={false}
        ></iframe>
      </div>
    </div>
  );
};

export default AdverticaAd;
