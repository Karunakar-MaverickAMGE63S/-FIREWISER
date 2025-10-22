
import React, { useState } from 'react';
import { Step, Role } from './types';
import type { WiseOutput, AirQualityData, WeatherData } from './types';
import Header from './components/Header';
import Step1_Input from './components/Step1_Input';
import Step2_Consent from './components/Step2_Consent';
import Step3_Loading from './components/Step3_Loading';
import Step4_WiseOutput from './components/Step4_WiseOutput';
import Step4a_Checklist from './components/Step4a_Checklist';
import Step_CommandLoading from './components/Step_CommandLoading';
import Step5_CommandView from './components/Step5_CommandView';

function App() {
  const [step, setStep] = useState<Step>(Step.INPUT);
  const [role, setRole] = useState<Role>(Role.PARENT);
  const [zipCode, setZipCode] = useState<string>('');
  const [wiseOutput, setWiseOutput] = useState<WiseOutput | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleInputSubmit = (submittedZip: string, submittedRole: Role) => {
    setZipCode(submittedZip);
    setRole(submittedRole);
    setStep(Step.CONSENT);
  };

  const handleConsent = () => {
    setStep(Step.LOADING);
  };
  
  const handleLoadingComplete = (output: WiseOutput, aqData: AirQualityData | null, weatherData: WeatherData | null) => {
    setWiseOutput(output);
    setAirQualityData(aqData);
    setWeatherData(weatherData);
    setStep(Step.WISE_OUTPUT);
  };

  const handleShowChecklist = () => {
    setStep(Step.CHECKLIST);
  }
  
  const handleShowCommandView = () => {
    setStep(Step.COMMAND_LOADING);
  };

  const handleCommandLoadingComplete = () => {
    setStep(Step.COMMAND_VIEW);
  };

  const handleReset = () => {
    setWiseOutput(null);
    setAirQualityData(null);
    setWeatherData(null);
    setRole(Role.PARENT);
    setZipCode('');
    setStep(Step.INPUT);
  };

  const renderStep = () => {
    switch (step) {
      case Step.INPUT:
        return <Step1_Input onSubmit={handleInputSubmit} />;
      case Step.CONSENT:
        return <Step2_Consent onConsent={handleConsent} />;
      case Step.LOADING:
        return <Step3_Loading role={role} zipCode={zipCode} onComplete={handleLoadingComplete} />;
      case Step.WISE_OUTPUT:
        return wiseOutput && <Step4_WiseOutput output={wiseOutput} weatherData={weatherData} onNext={handleShowChecklist} />;
      case Step.CHECKLIST:
        return wiseOutput && <Step4a_Checklist output={wiseOutput} airQualityData={airQualityData} onNext={handleShowCommandView} />;
      case Step.COMMAND_LOADING:
        return <Step_CommandLoading onComplete={handleCommandLoadingComplete} />;
      case Step.COMMAND_VIEW:
        return <Step5_CommandView />;
      default:
        return <Step1_Input onSubmit={handleInputSubmit} />;
    }
  };

  // Determine max width based on the current step
  const containerMaxWidthClass = step === Step.COMMAND_VIEW ? 'max-w-4xl' : 'max-w-2xl';

  return (
    <div className="font-['Poppins',_sans-serif] min-h-screen bg-slate-50 flex flex-col items-center p-3 sm:p-4 md:p-6">
      <Header 
        maxWidthClass={containerMaxWidthClass}
        showBackButton={step !== Step.INPUT}
        onBack={handleReset}
      />
      <main className={`w-full ${containerMaxWidthClass} mx-auto flex-grow flex flex-col justify-center py-6 sm:py-8 transition-all duration-500 ease-in-out`}>
        {renderStep()}
      </main>
      <footer className="w-full py-4">
        <p className="text-center text-sm text-orange-500 font-bold">
          Developed by Karunakar24MB7
        </p>
      </footer>
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
          
          @keyframes fade-in-fast {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-in forwards; }

          @keyframes pulse-yellow-border {
            0%, 100% {
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            }
            50% {
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), 0 0 12px 2px #FBBF24;
            }
          }
          .animate-pulse-yellow {
            animation: pulse-yellow-border 2s infinite;
          }

          /* Fix for browser autofill styles */
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
            -webkit-text-fill-color: #1e293b !important;
          }
      `}</style>
    </div>
  );
}

export default App;