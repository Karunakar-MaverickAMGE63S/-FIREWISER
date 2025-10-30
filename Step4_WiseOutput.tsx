import React from 'react';
import type { WiseOutput, WeatherData } from '../types';
import Button from './common/Button';
import Map from './Map';
import { ThermometerIcon, DropletIcon, WindIcon, SAFE_ROUTE_PATH, ShelterIcon } from '../constants';

interface Step4WiseOutputProps {
  output: WiseOutput;
  weatherData: WeatherData | null;
  onNext: () => void;
}

function WeatherCard({ data }: { data: WeatherData }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-orange-500 ring-4 ring-yellow-400">
        <h3 className="text-xl font-bold text-slate-800 mb-4 px-2">Critical Weather Conditions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {/* Temperature */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center justify-center text-slate-500 mb-1">
                    <ThermometerIcon />
                    <span className="ml-2 font-semibold">Temperature</span>
                </div>
                <p className="text-3xl font-extrabold text-red-600">{data.temperature}°F</p>
            </div>
            {/* Humidity */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center justify-center text-slate-500 mb-1">
                    <DropletIcon />
                    <span className="ml-2 font-semibold">Humidity</span>
                </div>
                <p className="text-3xl font-extrabold text-blue-600">{data.humidity}%</p>
            </div>
            {/* Wind */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center justify-center text-slate-500 mb-1">
                    <WindIcon />
                    <span className="ml-2 font-semibold">Wind</span>
                </div>
                <p className="text-3xl font-extrabold text-orange-600">{data.windSpeed}<span className="text-lg font-semibold ml-1">mph</span> {data.windDirection}</p>
            </div>
        </div>
        <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg text-sm text-red-700 font-semibold text-center">
            <p>{data.description}</p>
        </div>
    </div>
  );
}

function Step4_WiseOutput({ output, weatherData, onNext }: Step4WiseOutputProps) {
  return (
    <div className="w-full space-y-6 animate-fade-in-fast">
      {/* Part 1: Immediate Alert */}
      <div className="bg-red-600 text-white p-4 sm:p-6 rounded-2xl shadow-lg border-4 border-orange-500 ring-4 ring-yellow-400">
        <h2 className="text-xl sm:text-2xl font-extrabold text-center uppercase tracking-wider">{output.alert}</h2>
      </div>

      {/* Part 2: Custom SafeRoute Map */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-orange-500 ring-4 ring-yellow-400">
        <h3 className="text-xl font-bold text-slate-800 mb-3 px-2">Your Custom SafeRoute</h3>
        <Map userDot={true} fitToBounds={SAFE_ROUTE_PATH} />
        <div className="mt-4 px-3 py-3 bg-slate-100 rounded-lg text-slate-700 border border-slate-200">
          <div className="space-y-2 text-sm">
            <div className="flex items-center"><p>🟠 <span className="font-semibold">Current Location:</span> Orange Marker</p></div>
            <div className="flex items-center"><p>🔵 <span className="font-semibold">Evacuation Route:</span> Follow the Blue Dashed Line</p></div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-1 flex items-center justify-center"><ShelterIcon className="w-5 h-5 text-blue-700" /></div>
              <p><span className="font-semibold">Safe Destination:</span> Designated Wildfire Shelter</p>
            </div>
            <div className="flex items-center"><p>🔥 <span className="font-semibold">Wildfire Perimeters:</span> Active Fire Zones – Restricted Area</p></div>
            <div className="flex items-center"><p>🧡 <span className="font-semibold">SageMaker Predictive Boundary:</span> Predicted Fire Spread – High Risk</p></div>
            <div className="flex items-center"><p>🟥 <span className="font-semibold">Code Red Zone:</span> Extreme Danger – DO NOT ENTER</p></div>
            <div className="flex items-center"><p>🟨 <span className="font-semibold">Heat Wave:</span> Area-wide Extreme Heat Advisory</p></div>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-200 text-sm">
            You are currently located at the <span className="font-bold text-orange-600">Orange Marker</span>. Proceed along the designated <span className="font-bold text-blue-600">Blue Dashed Evacuation Route</span> to the Wildfire Shelter. Maintain a safe distance from all <span className="font-bold">fire zones</span> at all times.
          </p>
        </div>
      </div>

      {/* Part 3: Weather Conditions */}
      {weatherData && <WeatherCard data={weatherData} />}

      <div className="pt-4">
        <Button onClick={onNext}>
          View Evacuation Checklist &rarr;
        </Button>
      </div>
    </div>
  );
}

export default Step4_WiseOutput;