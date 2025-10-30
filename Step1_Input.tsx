
import React, { useState } from 'react';
import { Role } from '../types';
import Button from './common/Button';

interface Step1InputProps {
  onSubmit: (zipCode: string, role: Role) => void;
}

function Step1_Input({ onSubmit }: Step1InputProps) {
  const [zipCode, setZipCode] = useState('');
  const [role, setRole] = useState<Role>(Role.PARENT);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zipCode.trim())) {
      setError('Please provide a valid 5-digit ZIP code.');
      return;
    }
    setError('');
    onSubmit(zipCode, role);
  };

  const errorId = 'zip-error';

  return (
    <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl text-center animate-fade-in border-4 border-orange-500 ring-4 ring-yellow-400">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Activate your FIREWISER</h2>
      <p className="text-sm sm:text-base text-slate-500 mb-6">Enter your ZIP code and select your household profile to generate an immediate, personalized evacuation plan.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="zip" className="block text-sm font-semibold text-blue-600 text-left mb-1">ZIP Code</label>
          <input
            id="zip"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 bg-blue-600 text-white placeholder-gray-200"
            placeholder="e.g., 90265"
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
          />
          {error && <p id={errorId} className="text-red-500 text-sm mt-2 text-left">{error}</p>}
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-pink-600 text-left mb-1">Select Your Household Profile</label>
          <div className="relative">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full px-4 py-3 border-2 border-pink-500 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-500 bg-pink-500 text-white font-semibold appearance-none pr-10"
            >
              {Object.values(Role).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={!zipCode}
          variant="primary"
          className={zipCode ? 'animate-pulse-yellow border-yellow-400' : ''}
        >
          Generate Evacuation Plan
        </Button>
      </form>
    </div>
  );
}

export default Step1_Input;
