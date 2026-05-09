import React, { useEffect, useRef } from 'react';

const AdverticaAd = ({ slotId }) => {
  const adRef = useRef(null);

  useEffect(() => {
    // If the script already exists in this container, don't add it again
    if (adRef.current && adRef.current.querySelector('script')) {
      return;
    }

    // Create the script element dynamically so React executes it
    const script = document.createElement('script');
    script.src = "//data527.click/js/responsive.js";
    script.async = true;

    if (adRef.current) {
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-6 overflow-hidden">
      {/* We wrap it in a div to maintain the script injection reference */}
      <div ref={adRef} className="flex justify-center items-center relative z-10 w-full max-w-full overflow-x-auto overflow-y-hidden">
        <ins 
          style={{ width: '970px', height: '250px', display: 'block' }} 
          data-width="970" 
          data-height="250" 
          className="xcb5c2634f8" 
          data-domain="//data527.click" 
          data-affquery={`/0fc8c9c0e1f7ffaacf3d/cb5c2634f8/?placementName=${slotId || 'default'}`}
        ></ins>
      </div>
    </div>
  );
};

export default AdverticaAd;
