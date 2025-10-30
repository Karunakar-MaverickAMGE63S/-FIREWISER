
import React, { useEffect, useState } from 'react';

interface StepCommandLoadingProps {
  onComplete: () => void;
}

const loadingMessages = [
    "Establishing secure connection to Command Net...",
    "Calibrating satellite link...",
    "Aggregating anonymous location data...",
    "Initializing Amazon Q triage intelligence...",
    "Rendering tactical map overlay...",
    "Finalizing Command View...",
];

function CommandLoadingIcon() {
    return (
        <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <style>
                {`
                .ring {
                    fill: none;
                    stroke-width: 4;
                    stroke-linecap: round;
                    transform-origin: 50% 50%;
                }
                .ring1 {
                    stroke: #F97316;
                    animation: rotate 2s linear infinite;
                }
                .ring2 {
                    stroke: #3B82F6;
                    animation: rotate 2.5s linear infinite reverse;
                }
                .ring3 {
                    stroke: #FBBF24;
                    animation: rotate 3s linear infinite;
                }
                .pulse-dot {
                    fill: #F97316;
                    animation: pulse 1.5s ease-in-out infinite;
                    transform-origin: 50% 50%;
                }
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(0.8); opacity: 0.7; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                `}
            </style>
            <circle className="ring ring1" cx="50" cy="50" r="45" />
            <circle className="ring ring2" cx="50" cy="50" r="35" />
            <circle className="ring ring3" cx="50" cy="50" r="25" />
            <circle className="pulse-dot" cx="50" cy="50" r="10" />
        </svg>
    );
}


function Step_CommandLoading({ onComplete }: StepCommandLoadingProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const TOTAL_DURATION = 12000; // 12 seconds

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => {
        if (prevIndex < loadingMessages.length - 1) {
          return prevIndex + 1;
        }
        return prevIndex;
      });
    }, TOTAL_DURATION / loadingMessages.length);

    const progressInterval = setInterval(() => {
        setProgress(p => {
            const newProgress = p + (100 / (TOTAL_DURATION / 100));
            if (newProgress >= 100) {
                clearInterval(progressInterval);
                return 100;
            }
            return newProgress;
        });
    }, 100);

    const finalTimeout = setTimeout(() => {
      onComplete();
    }, TOTAL_DURATION);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(finalTimeout);
    };
  }, [onComplete]);

  return (
    <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl text-center animate-fade-in border-4 border-orange-500 ring-4 ring-yellow-400">
        <div className="flex justify-center items-center mb-6">
            <CommandLoadingIcon />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
            Initializing <span className="text-orange-600">Dynamic Triage Overlay</span>
        </h2>
        
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden border border-slate-300">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
        </div>
        
        <p className="text-sm sm:text-base text-slate-500 min-h-[1.5rem] flex items-center justify-center transition-opacity duration-300" aria-live="polite">
            {loadingMessages[currentMessageIndex]}
        </p>
    </div>
  );
}

export default Step_CommandLoading;