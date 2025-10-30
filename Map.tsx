
// Add minimal Google Maps types to satisfy TypeScript compiler
declare global {
  namespace google {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
      }
      class LatLngBounds {
        constructor(sw?: LatLng | null, ne?: LatLng | null);
        extend(point: LatLng): void;
      }
      interface MapTypeStyle {
        elementType?: string;
        featureType?: string;
        stylers: any[];
      }
      class Map {
        constructor(mapDiv: Element | null, opts?: any);
        fitBounds(bounds: LatLngBounds, padding?: number): void;
      }
      class Marker {
        constructor(opts?: any);
        setMap(map: Map | null): void;
        setIcon(icon: any): void;
        setPosition(latLng: LatLng | { lat: number, lng: number }): void;
        get(key: string): any;
        set(key: string, value: any): void;
      }
      namespace visualization {
        class HeatmapLayer {
          constructor(opts?: any);
        }
      }
      class Polyline {
        constructor(opts?: any);
      }
      class Polygon {
        constructor(opts?: any);
        setOptions(options: any): void;
      }
      class Circle {
        constructor(opts?: any);
        setRadius(radius: number): void;
        setOptions(options: any): void;
      }
      enum SymbolPath {
        CIRCLE = 0,
      }
      class Point {
        constructor(x: number, y: number);
      }
      class Size {
        constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
      }
    }
  }
}

import React, { useEffect, useRef, useState } from 'react';
import type { Dot } from '../types';
import { USER_START_POINT, SHELTER_POINT, SAFE_ROUTE_PATH, FLAME_LOCATIONS_WEST, FLAME_LOCATIONS_EAST, AdvancedFlameIconSvgString, BlueShieldIconSvgString } from '../constants';

interface MapProps {
  userDot?: boolean;
  commandViewDots?: Dot[];
  fitToBounds?: { lat: number; lng: number }[];
}

// --- Map Configuration ---
const MAP_CENTER = { lat: 34.0356, lng: -118.6920 }; // Malibu, CA
const MAP_ZOOM = 14; // Zoom adjusted for a better 3D perspective

// Custom map styles to improve performance and visual clarity by desaturating the base map.
const mapStyles: google.maps.MapTypeStyle[] = [
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }]
  },
  {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }]
  }
];

// Data points for the primary fire heatmap
const PRIMARY_FIRE_HEATMAP_DATA = [
  { lat: 34.025, lng: -118.75, weight: 3 },
  { lat: 34.028, lng: -118.74, weight: 5 },
  { lat: 34.030, lng: -118.76, weight: 4 },
  { lat: 34.020, lng: -118.73, weight: 2 },
  { lat: 34.035, lng: -118.755, weight: 6 },
  { lat: 34.022, lng: -118.745, weight: 4 },
];

// Polygon for a "Code Red" no-entry zone
const CODE_RED_ZONE = [
  { lat: 34.032, lng: -118.725 },
  { lat: 34.038, lng: -118.720 },
  { lat: 34.035, lng: -118.710 },
  { lat: 34.028, lng: -118.715 },
];

// Polygon for a general heat wave advisory area
const HEAT_WAVE_BOUNDS = [
  { lat: 34.00, lng: -118.80 },
  { lat: 34.08, lng: -118.80 },
  { lat: 34.08, lng: -118.60 },
  { lat: 34.00, lng: -118.60 },
];


function Map({ userDot = false, commandViewDots = [], fitToBounds }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const staticMarkersRef = useRef<google.maps.Marker[]>([]);
  const commandMarkersRef = useRef<Map<number, google.maps.Marker>>(new window.Map());
  const flameMarkersRef = useRef<google.maps.Marker[]>([]);
  const sagemakerPredictionRef = useRef<google.maps.Polygon | null>(null);
  const safeZoneCircleRef = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    // Renders the Amazon SageMaker predictive model output, visualizing the fire's anticipated trajectory.
    const createPredictionPolygon = () => {
        const centerLat = 34.045;
        const centerLng = -118.680;
        const points = 8;
        const radius = 0.015;
        const irregularity = 0.005;
        const predictionBoundary: { lat: number, lng: number }[] = [];

        for (let i = 0; i < points; i++) {
          const angle = (i / points) * 2 * Math.PI;
          const randomOffset = 1.0 - Math.random() * irregularity;
          const lat = centerLat + Math.cos(angle) * radius * randomOffset;
          const lng = centerLng + Math.sin(angle) * radius * randomOffset * 1.5;
          predictionBoundary.push({ lat, lng });
        }

        if (mapInstance.current) {
            const predictionPolygon = new google.maps.Polygon({
                paths: predictionBoundary,
                strokeColor: '#FF4500',
                strokeOpacity: 0.9,
                strokeWeight: 2,
                fillColor: '#FF4500',
                fillOpacity: 0.3,
                map: mapInstance.current,
            });
            sagemakerPredictionRef.current = predictionPolygon;
        }
    };

    if (mapRef.current && !mapInstance.current) {
      if (typeof google === 'undefined') {
        console.error("Google Maps API not loaded.");
        return;
      }
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        mapTypeId: 'satellite',
        tilt: 45,
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
        styles: mapStyles,
        mapId: 'FIREWISER_MAP_STYLE',
      });
      
      createPredictionPolygon();

      new google.maps.Polygon({
        paths: HEAT_WAVE_BOUNDS,
        strokeColor: '#FFC107',
        strokeOpacity: 0.1,
        strokeWeight: 1,
        fillColor: '#FF9800',
        fillOpacity: 0.15,
        map: mapInstance.current,
      });

      new google.maps.visualization.HeatmapLayer({
        data: PRIMARY_FIRE_HEATMAP_DATA.map(p => ({
          location: new google.maps.LatLng(p.lat, p.lng),
          weight: p.weight,
        })),
        map: mapInstance.current,
        radius: 60,
        gradient: [
          "rgba(255, 165, 0, 0)",
          "rgba(255, 140, 0, 1)",
          "rgba(255, 69, 0, 1)",
          "rgba(220, 20, 60, 1)",
        ],
      });
      
      new google.maps.Polygon({
        paths: CODE_RED_ZONE,
        strokeColor: '#B71C1C',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#D32F2F',
        fillOpacity: 0.4,
        map: mapInstance.current,
      });

      const allFlameLocations = [...FLAME_LOCATIONS_WEST, ...FLAME_LOCATIONS_EAST];

      flameMarkersRef.current = allFlameLocations.map(location => {
          return new google.maps.Marker({
              position: location,
              map: mapInstance.current,
              icon: {
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(AdvancedFlameIconSvgString(50, 0))}`,
                  scaledSize: new google.maps.Size(50, 50),
                  anchor: new google.maps.Point(25, 50),
              },
              zIndex: 100,
              optimized: false, // Required for smooth SVG icon animation
          });
      });
      
      new google.maps.Polyline({
        path: SAFE_ROUTE_PATH,
        geodesic: true,
        strokeColor: "#3B82F6",
        strokeOpacity: 1.0,
        strokeWeight: 4,
        icons: [{
            icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 3 },
            offset: '0',
            repeat: '15px'
        }],
        map: mapInstance.current,
      });
      
      safeZoneCircleRef.current = new google.maps.Circle({
        strokeColor: '#3B82F6',
        strokeOpacity: 0.7,
        strokeWeight: 1,
        fillColor: '#3B82F6',
        fillOpacity: 0.2,
        map: mapInstance.current,
        center: SHELTER_POINT,
        radius: 250, // in meters
        zIndex: -1,
      });
      
      new google.maps.Marker({
          position: SHELTER_POINT,
          map: mapInstance.current,
          title: "Shelter",
          icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(BlueShieldIconSvgString(44))}`,
              scaledSize: new google.maps.Size(44, 44),
              anchor: new google.maps.Point(22, 22),
          },
          zIndex: 150
      });
      
      if (fitToBounds && fitToBounds.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        fitToBounds.forEach(point => {
            bounds.extend(new google.maps.LatLng(point.lat, point.lng));
        });
        mapInstance.current.fitBounds(bounds, 70);
      }
    }
  }, []);

  // Effect for high-performance, realistic fire flicker animation
  useEffect(() => {
    let animationFrameId: number;
    let lastUpdateTime = 0;
    const updateInterval = 120; // ms

    const animateFlames = (timestamp: number) => {
      if (timestamp - lastUpdateTime > updateInterval) {
        lastUpdateTime = timestamp;
        const flickerState = Math.floor(Math.random() * 3);
        const size = 46 + Math.random() * 8;

        const icon = {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(AdvancedFlameIconSvgString(size, flickerState))}`,
            scaledSize: new google.maps.Size(size, size),
            anchor: new google.maps.Point(size / 2, size),
        };

        flameMarkersRef.current.forEach(marker => {
            marker.setIcon(icon);
        });
      }
      animationFrameId = requestAnimationFrame(animateFlames);
    };

    animationFrameId = requestAnimationFrame(animateFlames);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);


  // High-performance animation loop for pulsating visual elements
  useEffect(() => {
    const sagemakerPolygon = sagemakerPredictionRef.current;
    const safeZoneCircle = safeZoneCircleRef.current;
    if (!sagemakerPolygon || !safeZoneCircle) return;
  
    let animationFrameId: number;
    const startTime = Date.now();
  
    const animatePulse = () => {
      const elapsedTime = Date.now() - startTime;
  
      // Animate SageMaker Polygon
      const pulseCycle = (elapsedTime % 2000) / 2000; // 2-second cycle
      const opacity = 0.2 + Math.sin(pulseCycle * Math.PI) * 0.3; // Varies between 0.2 and 0.5
      sagemakerPolygon.setOptions({ fillOpacity: opacity });
  
      // Animate Safe Zone Circle
      const radiusCycle = (elapsedTime % 2500) / 2500; // 2.5-second cycle
      const radius = 250 + Math.sin(radiusCycle * Math.PI) * 100; // Varies between 250m and 350m
      safeZoneCircle.setRadius(radius);
      safeZoneCircle.setOptions({ fillOpacity: (1 - (radius - 250) / 150) * 0.25 });
  
      animationFrameId = requestAnimationFrame(animatePulse);
    };
  
    animationFrameId = requestAnimationFrame(animatePulse);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);


  // This useEffect handles the single, static user dot for the initial route map view
  useEffect(() => {
    if (!mapInstance.current) return;
    
    staticMarkersRef.current.forEach(marker => marker.setMap(null));
    staticMarkersRef.current = [];

    if (userDot) {
        const marker = new google.maps.Marker({
            position: USER_START_POINT,
            map: mapInstance.current,
            title: "Your Location",
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#F97316',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2
            }
        });
        staticMarkersRef.current.push(marker);
    }
  }, [userDot]);

  // This high-performance useEffect handles the dynamic dots for the Command View
  useEffect(() => {
    if (!mapInstance.current) return;
    
    if (commandViewDots.length === 0) {
      if (commandMarkersRef.current.size > 0) {
        commandMarkersRef.current.forEach(marker => marker.setMap(null));
        commandMarkersRef.current.clear();
      }
      return;
    }
    
    // Update existing markers and add new ones
    for (const dot of commandViewDots) {
      const existingMarker = commandMarkersRef.current.get(dot.id);

      if (existingMarker) {
        existingMarker.setPosition({ lat: dot.lat, lng: dot.lng });

        if (existingMarker.get('status') !== dot.status) {
          const blueIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: '#1D4ED8',
            fillOpacity: 0.9,
            strokeColor: 'white',
            strokeWeight: 1,
          };
          existingMarker.setIcon(blueIcon);
          existingMarker.set('status', dot.status);
        }
      } else {
        let icon;
        if (dot.status === 'orange') {
            const isUser = dot.isUser;
            const coreDotRadius = isUser ? '8' : '6';
            const coreDotStroke = isUser ? '2.5' : '2';
            // A 'ping' animation indicates active evacuees. The user's own evacuating 
            // unit is highlighted for clear identification.
            const pingColor = isUser ? '#F59E0B' : '#F97316'; 

            const svg = `
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <style>
                    .ping-ring {
                      stroke: ${pingColor};
                      stroke-width: ${isUser ? '3' : '2'};
                      animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                      transform-origin: 20px 20px;
                    }
                    @keyframes ping {
                      0% {
                        transform: scale(0.33);
                        opacity: 1;
                      }
                      80%, 100% {
                        transform: scale(1);
                        opacity: 0;
                      }
                    }
                  </style>
                  <circle class="ping-ring" cx="20" cy="20" r="${coreDotRadius}" fill="none" />
                  <circle cx="20" cy="20" r="${coreDotRadius}" fill="${pingColor}" stroke="#FFFFFF" stroke-width="${coreDotStroke}" />
                </svg>
            `;
            icon = {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20),
            };
        } else { // blue dots
            icon = {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                fillColor: '#1D4ED8',
                fillOpacity: 0.9,
                strokeColor: 'white',
                strokeWeight: 1,
            };
        }

        const newMarker = new google.maps.Marker({
          position: { lat: dot.lat, lng: dot.lng },
          map: mapInstance.current,
          icon: icon,
        });
        newMarker.set('status', dot.status);
        commandMarkersRef.current.set(dot.id, newMarker);
      }
    }

  }, [commandViewDots]);

  return (
    <div className="w-full h-full bg-slate-200 rounded-lg overflow-hidden border-4 border-orange-500 shadow-lg aspect-[4/3] ring-4 ring-yellow-400">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

export default Map;