import React from 'react';
import Button from './common/Button';

interface Step2ConsentProps {
  onConsent: () => void;
}

function Step2_Consent({ onConsent }: Step2ConsentProps) {
  return (
    <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl text-center animate-fade-in border-4 border-orange-500 ring-4 ring-yellow-400">
       <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
         </svg>
       </div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Activate Dynamic Triage Overlay</h2>
       <p className="text-sm sm:text-base text-slate-500 mb-4">
        Activate Dynamic Triage Overlay to anonymously share your current location. This enables first responders to prioritize rescue operations based on real-time proximity and risk level.
      </p>
       <div className="text-left bg-slate-50 border border-slate-200 p-4 rounded-lg mb-6 text-slate-600 text-sm sm:text-base">
        <p>
          <span role="img" aria-label="lock" className="mr-1">🔒</span> <span className="font-bold">Privacy First:</span> Your location is shared anonymously and will be automatically removed once you reach a verified safe zone.
        </p>
      </div>
      <div className="space-y-4">
        <Button onClick={onConsent}>
         <span role="img" aria-label="check mark" className="mr-1">✅</span> Activate Anonymous Location Sharing
        </Button>
      </div>
    </div>
  );
}

export default Step2_Consent;