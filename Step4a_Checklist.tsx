import React from 'react';
import type { WiseOutput, AirQualityData } from '../types';
import Button from './common/Button';
import { CheckIcon, HeartIcon, WindIcon } from '../constants';

interface Step4aChecklistProps {
  output: WiseOutput;
  airQualityData: AirQualityData | null;
  onNext: () => void;
}

const getRgbString = (color: AirQualityData['color']) => {
    if (!color) return 'rgb(107, 114, 128)'; // fallback to gray
    const r = Math.round(color.red * 255);
    const g = Math.round(color.green * 255);
    const b = Math.round(color.blue * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

const getAqiAdvice = (aqi: number) => {
    if (aqi <= 50) return "Air quality is satisfactory, posing minimal risk.";
    if (aqi <= 100) return "Individuals with respiratory sensitivity should limit prolonged outdoor exertion.";
    if (aqi <= 150) return "At-risk groups (e.g., heart/lung disease, elderly) should reduce heavy outdoor exertion.";
    if (aqi <= 200) return "Health Advisory: Avoid prolonged outdoor exertion. N95 mask use is recommended for at-risk individuals.";
    return "Hazardous Conditions: Remain indoors with windows closed. Utilize air purifiers if accessible.";
}

function AirQualityCard({ data }: { data: AirQualityData }) {
    const aqiColor = getRgbString(data.color);
    const advice = getAqiAdvice(data.aqi);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 ring-4 ring-yellow-400" style={{ borderColor: aqiColor }}>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><WindIcon /> <span className="ml-2">Current Air Quality</span></h3>
            <div className="text-center mb-4">
                <p className="text-6xl font-extrabold" style={{ color: aqiColor }}>{data.aqi}</p>
                <p className="text-lg font-semibold text-slate-700" style={{ color: aqiColor }}>{data.category}</p>
                <p className="text-sm text-slate-500 mt-1">Dominant Pollutant: {data.dominantPollutant.toUpperCase()}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
                <p><span className="font-bold">Recommendation:</span> {advice}</p>
            </div>
        </div>
    );
}


function Step4a_Checklist({ output, airQualityData, onNext }: Step4aChecklistProps) {
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Part 1: Role-Based Checklist */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-orange-500 ring-4 ring-yellow-400">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><CheckIcon /> <span className="ml-2">{output.checklist.title}</span></h3>
          <ul className="space-y-3">
            {output.checklist.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Part 2: Air Quality & Mental Coach */}
        <div className="space-y-6">
            {airQualityData && <AirQualityCard data={airQualityData} />}

            <div className="bg-orange-500 text-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-orange-600 ring-4 ring-yellow-400">
                <h3 className="text-xl font-bold mb-4 flex items-center"><HeartIcon /> <span className="ml-2">{output.coach.title}</span></h3>
                <p className="text-orange-100">{output.coach.message}</p>
            </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button onClick={onNext} variant="secondary">
          Switch to Command View &rarr;
        </Button>
      </div>
    </div>
  );
}

export default Step4a_Checklist;