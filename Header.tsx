
import React from 'react';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  maxWidthClass?: string;
}

function Header({ showBackButton = false, onBack, maxWidthClass = 'max-w-2xl' }: HeaderProps) {
  return (
    <header className={`w-full ${maxWidthClass} mx-auto flex items-center justify-center py-6 relative`}>
      {showBackButton && (
         <button
          onClick={onBack}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-orange-500 border-2 border-orange-500 w-10 h-10 rounded-full shadow-md transition-transform transform hover:scale-105 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-75 flex items-center justify-center ring-2 ring-yellow-400"
          aria-label="Go back to start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
          <span className="text-orange-500">FIREWISER</span>
        </h1>
        <p className="font-['IBM_Plex_Sans',_sans-serif] text-orange-600 font-semibold text-sm tracking-wide mt-1">
          Powered by AWS Bedrock &amp; Amazon Q
        </p>
      </div>
    </header>
  );
}

export default Header;