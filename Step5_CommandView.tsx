import React, { useState, useEffect } from 'react';
import Map from './Map';
import type { Dot } from '../types';
import { AWSIcon, SHELTER_POINT, USER_START_POINT, SAFE_ROUTE_PATH, ShelterIcon } from '../constants';

// Explicitly define that the component takes no props for robustness.
interface Step5CommandViewProps {}

// Expanded bounds to scatter the dots more widely
const EVAC_ZONE_BOUNDS = {
  north: 34.045,
  south: 34.020,
  west: -118.725,
  east: -118.690,
};

const createDots = (enRouteCount: number, safeCount: number): Dot[] => {
  // Create the special user dot that follows the designated SafeRoute
  const userDot: Dot = {
    id: -1, // Special ID for the user
    lat: USER_START_POINT.lat,
    lng: USER_START_POINT.lng,
    status: 'orange',
    path: SAFE_ROUTE_PATH,
    progress: 0,
    speed: 0.00004, // Faster, more urgent speed
    isUser: true,
  };

  const otherEnRouteDots: Dot[] = Array.from({ length: enRouteCount - 1 }, (_, i) => {
    const startLat = EVAC_ZONE_BOUNDS.south + Math.random() * (EVAC_ZONE_BOUNDS.north - EVAC_ZONE_BOUNDS.south);
    const startLng = EVAC_ZONE_BOUNDS.west + Math.random() * (EVAC_ZONE_BOUNDS.east - EVAC_ZONE_BOUNDS.west);
    
    // Other evacuees take a direct path to the shelter
    const path = [{ lat: startLat, lng: startLng }, { lat: SHELTER_POINT.lat, lng: SHELTER_POINT.lng }];

    return {
      id: i,
      lat: startLat,
      lng: startLng,
      status: 'orange',
      path,
      progress: 0,
      speed: 0.000035 + Math.random() * 0.00002, // Faster, more urgent speeds
    };
  });

  const safeDots: Dot[] = Array.from({ length: safeCount }, (_, i) => {
      const lat = SHELTER_POINT.lat + (Math.random() - 0.5) * 0.005;
      const lng = SHELTER_POINT.lng + (Math.random() - 0.5) * 0.005;
      return {
        id: i + enRouteCount,
        lat: lat,
        lng: lng,
        status: 'blue',
        path: [{lat, lng}, {lat, lng}],
        progress: 1,
        speed: 0,
      };
  });
  
  return [userDot, ...otherEnRouteDots, ...safeDots];
};


function Step5_CommandView({}: Step5CommandViewProps) {
  const [dots, setDots] = useState<Dot[]>(() => createDots(57, 573));
  
  const enRouteCount = dots.filter(d => d.status === 'orange').length;
  const safeCount = dots.length - enRouteCount;

  useEffect(() => {
    let animationFrameId: number;
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;

      setDots(prevDots => {
        if (prevDots.every(d => d.status === 'blue')) {
          isAnimating = false;
          return prevDots;
        }
        
        const updatedDots = prevDots.map((dot): Dot => {
          if (dot.status === 'blue') {
            return dot;
          }

          const newProgress = Math.min(1, dot.progress + dot.speed);

          let lat: number;
          let lng: number;

          if (dot.isUser) {
            // Handle multi-segment path for the user dot
            const path = dot.path;
            const numSegments = path.length - 1;
            const totalProgressScaled = newProgress * numSegments;
            const segmentIndex = Math.min(Math.floor(totalProgressScaled), numSegments - 1);
            const segmentProgress = totalProgressScaled - segmentIndex;
            
            const startOfSegment = path[segmentIndex];
            const endOfSegment = path[segmentIndex + 1];
            
            lat = startOfSegment.lat + (endOfSegment.lat - startOfSegment.lat) * segmentProgress;
            lng = startOfSegment.lng + (endOfSegment.lng - startOfSegment.lng) * segmentProgress;
          } else {
            // Standard straight-line interpolation for other dots
            lat = dot.path[0].lat + (dot.path[1].lat - dot.path[0].lat) * newProgress;
            lng = dot.path[0].lng + (dot.path[1].lng - dot.path[0].lng) * newProgress;
          }

          const status: 'orange' | 'blue' = newProgress >= 1 ? 'blue' : 'orange';
          
          return { ...dot, lat, lng, progress: newProgress, status };
        });
        
        return updatedDots;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isAnimating = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full space-y-6 animate-fade-in-fast">
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-orange-500 ring-4 ring-yellow-400">
        <div className="sm:flex sm:justify-between sm:items-start">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800"><span className="text-orange-600">Amazon Q</span> Command Center: Dynamic Triage Overlay</h2>
            <p className="text-slate-500 mt-1">Live triage intelligence to orchestrate resource deployment and prioritize high-risk evacuees.</p>
          </div>
          <div className="mt-4 sm:mt-0 grid grid-cols-2 gap-4 text-center">
            <div className="bg-orange-100 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{enRouteCount}</div>
                <div className="text-sm font-semibold text-orange-700 uppercase">En Route</div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{safeCount}</div>
                <div className="text-sm font-semibold text-blue-700 uppercase">Safe</div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Map commandViewDots={dots} />
        </div>
        <div className="text-center mt-3">
          <p className="font-['IBM_Plex_Sans',_sans-serif] text-blue-700 text-xs sm:text-sm font-semibold tracking-wide">
            Triage Intelligence Powered by Anthropic's Claude in Amazon Bedrock X Amazon Q
          </p>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mr-4">
                        <ShelterIcon />
                    </div>
                    <div>
                        <p className="font-semibold text-blue-800">Safe Destination</p>
                        <p className="text-sm text-blue-600">Designated Wildfire Shelter</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-blue-900">8.5 miles</p>
                    <p className="text-sm text-blue-600">Est. 25-30 min</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Step5_CommandView;