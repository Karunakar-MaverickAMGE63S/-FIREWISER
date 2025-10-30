
import React, { useEffect, useState } from 'react';
import { generateWiseOutput, getAirQualityData, getWeatherData } from '../services/aiService';
import type { Role, WiseOutput, AirQualityData, WeatherData } from '../types';
import { AWSIcon, USER_START_POINT } from '../constants';

interface Step3LoadingProps {
  role: Role;
  zipCode: string; // zipCode is passed for data enrichment and logging
  onComplete: (output: WiseOutput, aqData: AirQualityData | null, weatherData: WeatherData | null) => void;
}

const getRgbString = (color: AirQualityData['color']) => {
    if (!color) return 'rgb(107, 114, 128)';
    const r = Math.round(color.red * 255);
    const g = Math.round(color.green * 255);
    const b = Math.round(color.blue * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

// Compact "data pod" for showing weather data as it loads
function WeatherDataPod({ data }: { data: WeatherData }) {
    return (
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 animate-fade-in-fast">
            <h4 className="font-semibold text-slate-600 text-sm mb-2 text-left">Live Weather</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                    <p className="font-bold text-red-600 text-lg">{data.temperature}°F</p>
                    <p className="text-xs text-slate-500">Temp</p>
                </div>
                <div>
                    <p className="font-bold text-blue-600 text-lg">{data.humidity}%</p>
                    <p className="text-xs text-slate-500">Humidity</p>
                </div>
                <div>
                    <p className="font-bold text-orange-600 text-lg">{data.windSpeed}<span className="text-sm">mph</span></p>
                    <p className="text-xs text-slate-500">Wind</p>
                </div>
            </div>
        </div>
    );
}

// Compact "data pod" for showing air quality data as it loads
function AirQualityDataPod({ data }: { data: AirQualityData }) {
    const aqiColor = getRgbString(data.color);
    return (
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 animate-fade-in-fast">
            <h4 className="font-semibold text-slate-600 text-sm mb-2 text-left">Live Air Quality</h4>
            <div className="flex items-center justify-around">
                <div className="text-center">
                    <p className="text-3xl font-extrabold" style={{ color: aqiColor }}>{data.aqi}</p>
                    <p className="text-xs text-slate-500">AQI</p>
                </div>
                 <div className="text-center">
                    <p className="font-semibold text-lg" style={{ color: aqiColor }}>{data.category}</p>
                    <p className="text-xs text-slate-500">Hazard Level</p>
                </div>
            </div>
        </div>
    );
}


function Step3_Loading({ role, zipCode, onComplete }: Step3LoadingProps) {
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentMessage, setCurrentMessage] = useState("Establishing secure connection to AWS...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const TOTAL_DURATION = 12000; // 12 seconds total load time

    // Choreograph the loading messages and progress bar over 12 seconds
    const timeouts = [
      setTimeout(() => {
        if (!isMounted) return;
        setCurrentMessage("Fetching environmental data (Weather, Air Quality)...");
        // Fetch the data pods around this time
        getWeatherData(USER_START_POINT.lat, USER_START_POINT.lng).then(data => {
            if (isMounted) setWeatherData(data);
        });
        getAirQualityData(USER_START_POINT.lat, USER_START_POINT.lng).then(data => {
            if (isMounted) setAirQualityData(data);
        });
      }, TOTAL_DURATION * 0.25), // at 3 seconds

      setTimeout(() => {
        if (!isMounted) return;
        setCurrentMessage("Invoking Anthropic's Claude on Bedrock...");
      }, TOTAL_DURATION * 0.5), // at 6 seconds

      setTimeout(() => {
        if (!isMounted) return;
        setCurrentMessage("Finalizing your personalized plan...");
      }, TOTAL_DURATION * 0.9), // at ~11 seconds
    ];

    // Animate the progress bar smoothly over the total duration
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

    // This is the master trigger that completes the process
    const finalTimeout = setTimeout(async () => {
      if (!isMounted) return;
      
      // The personalized AI output is generated and fetched at the end of the data-gathering process
      const wiseOutput = await generateWiseOutput(role);
      const aqData = await getAirQualityData(USER_START_POINT.lat, USER_START_POINT.lng);
      const weatherData = await getWeatherData(USER_START_POINT.lat, USER_START_POINT.lng);

      setCurrentMessage("Your plan is ready!");
      
      // A brief moment to show "Ready!" before transitioning
      setTimeout(() => {
        if(isMounted) {
            onComplete(wiseOutput, aqData, weatherData);
        }
      }, 500);

    }, TOTAL_DURATION);

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(finalTimeout);
    };
  }, [role, zipCode, onComplete]);


  return (
    <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl text-center animate-fade-in border-4 border-orange-500 ring-4 ring-yellow-400">
        <div className="flex justify-center items-center mb-6">
             <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 bg-orange-100 rounded-full flex items-center justify-center">
                    <AWSIcon />
                </div>
            </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
            <span className="text-orange-600">AWS Bedrock</span> is Building Your Plan
        </h2>
        
        <div className="w-full bg-slate-200 rounded-full h-4 mb-4 overflow-hidden border border-slate-300">
            <div 
              className="bg-orange-500 h-full rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
        </div>
        
        <p className="text-sm sm:text-base text-slate-500 min-h-[1.5rem] flex items-center justify-center transition-opacity duration-300" aria-live="polite">
            {currentMessage}
        </p>

        {/* Container for the live data pods */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {weatherData ? <WeatherDataPod data={weatherData} /> : <div className="bg-slate-100 h-24 rounded-lg animate-pulse"></div>}
            {airQualityData ? <AirQualityDataPod data={airQualityData} /> : <div className="bg-slate-100 h-24 rounded-lg animate-pulse"></div>}
        </div>
    </div>
  );
}

export default Step3_Loading;
