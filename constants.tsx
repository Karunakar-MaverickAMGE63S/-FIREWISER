
import { Role, type WiseOutput } from './types';

export const ROLE_BASED_GUIDANCE: Record<Role, WiseOutput> = {
  [Role.PARENT]: {
    alert: "EVACUATE IMMEDIATELY. A MANDATORY EVACUATION has been issued for ZIP Code 90265. Wildfire approaching. This is not a drill.",
    checklist: {
      title: "Parents: Evacuation Checklist",
      items: [
        "Secure Children First: Immediately gather children to a central, safe location.",
        "Grab Family Go-Bag: Prioritize documents, water, and child-specific needs (meds, formula).",
        "Dress for Safety: Ensure everyone wears long sleeves, pants, and sturdy closed-toe shoes.",
        "Pack One Comfort Item: A small toy or blanket can significantly reduce a child's anxiety.",
        "Project Calm Confidence: Your demeanor is critical for keeping children focused and calm."
      ],
    },
    coach: {
      title: "Stay Calm, Stay Focused",
      message: "Your children look to you for safety. Breathe. You have a plan. Follow the route. You are capable and in control."
    }
  },
  [Role.ADULTS_ONLY]: {
    alert: "EVACUATE IMMEDIATELY. A MANDATORY EVACUATION has been issued for ZIP Code 90265. Wildfire approaching. This is not a drill.",
    checklist: {
      title: "Adults-Only: Evacuation Checklist",
      items: [
        "Confirm Partner Readiness: Verbally sync your immediate evacuation actions.",
        "Secure Critical Documents & Backups: Grab Go-Bag with passports, insurance, and digital backups.",
        "Execute Home Shutdown Protocol (Time Permitting): Turn off gas and utilities.",
        "Verify Vehicle Readiness: Confirm fuel level and that the emergency kit is accessible.",
        "Activate Communication Tree: Notify your designated out-of-state emergency contact."
      ],
    },
    coach: {
      title: "Act Decisively",
      message: "Your coordination is your strength. Execute your plan efficiently. Focus on a swift and safe departure. You are prepared for this."
    }
  },
   [Role.TEENS_MS]: {
    alert: "EVACUATE IMMEDIATELY. A MANDATORY EVACUATION has been issued for ZIP Code 90265. Wildfire approaching. This is not a drill.",
    checklist: {
      title: "Household w/ Middle Schoolers: Evacuation Checklist",
      items: [
        "Delegate Pre-Assigned Tasks: Have teens execute their roles (e.g., pack chargers, secure pets).",
        "Power & Communication Check: Ensure all mobile devices and power banks are packed.",
        "Confirm Protective Attire: Verify everyone is wearing long pants and sturdy, closed-toe shoes.",
        "Personal Go-Bag Accountability: Confirm each teen has their pre-packed emergency bag.",
        "Review Evacuation Protocols: Briefly reiterate the family communication and rally point plan."
      ],
    },
    coach: {
      title: "Lead Your Team",
      message: "Your teens can be a great help. Give clear, calm instructions. Their focus will mirror yours. Work together to get to safety quickly."
    }
  },
  [Role.TEENS_HS]: {
    alert: "EVACUATE IMMEDIATELY. A MANDATORY EVACUATION has been issued for ZIP Code 90265. Wildfire approaching. This is not a drill.",
    checklist: {
      title: "Household w/ High Schoolers: Evacuation Checklist",
      items: [
        "Execute Coordinated Shutdown: Task teens with securing all windows and doors.",
        "Verify Critical Supplies: Confirm teens have packed their personal documents and medications.",
        "Coordinate Vehicle & Pet Duties: Designate one teen for vehicle prep, another for pets.",
        "Route Confirmation: Briefly review the primary and secondary digital evacuation routes.",
        "Establish Digital Check-in: Activate a group chat for continuous communication during transit."
      ],
    },
    coach: {
      title: "Rely on Your Crew",
      message: "Your older teens are capable partners in this. Trust them with responsibilities. Clear communication is key. Move out as a unified team."
    }
  },
  [Role.UNIVERSITY_STUDENT]: {
    alert: "EVACUATE IMMEDIATELY. A MANDATORY EVACUATION has been issued for ZIP Code 90265. Wildfire approaching. This is not a drill.",
    checklist: {
      title: "University Student: Evacuation Checklist",
      items: [
        "Secure Academic & Personal IDs: Pack laptop, phone, chargers, government and student IDs.",
        "Pack Essentials Only: Prioritize medications, a water bottle, and one change of clothes.",
        "Activate Communication Plan: Notify family/emergency contact and monitor official university alerts.",
        "Confirm Evacuation Point: Identify the designated university assembly area or your personal route.",
        "Secure Residence (Time Permitting): Close windows and lock your door upon exiting."
      ],
    },
    coach: {
      title: "Stay Sharp and Informed",
      message: "Focus on your personal safety first. Gather your essentials quickly and move to a designated safe area. You've got this."
    }
  },
  [Role.YOUNG_ADULTS]: {
    alert: "EVACUATE IMMEDIATELY. A MANDATORY EVACUATION has been issued for ZIP Code 90265. Wildfire approaching. This is not a drill.",
    checklist: {
      title: "Roommates: Evacuation Checklist",
      items: [
        "Immediate Household Huddle: Confirm all roommates are accounted for and establish a carpool plan.",
        "Personal Go-Bags Only: Each person is responsible for their own pre-packed emergency kit.",
        "Designate a Shutdown Lead: One person is responsible for a final check of windows and utilities (if safe).",
        "Establish Digital Comms: Create a group chat for status updates during evacuation.",
        "Perform Final Headcount: Verbally confirm everyone is present before departing the residence."
      ],
    },
    coach: {
      title: "Work Together, Move Fast",
      message: "Your biggest advantage is teamwork. Communicate clearly, divide tasks, and get out safely. Look out for each other."
    }
  },
  [Role.ELDERLY]: {
    alert: "EVACUATE IMMEDIATELY. A MANDATORY EVACUATION has been issued for ZIP Code 90265. Wildfire approaching. This is not a drill.",
    checklist: {
      title: "Seniors: Evacuation Checklist",
      items: [
        "Prioritize Medical Essentials: Pack a 7-day supply of all medications and prescriptions.",
        "Secure Mobility & Sensory Aids: Ensure you have walkers, canes, glasses, and hearing aids.",
        "Grab Critical Documents Go-Bag: Must include ID, insurance cards, and emergency contacts.",
        "Dress for Safety & Comfort: Wear sturdy, closed-toe shoes and layered clothing.",
        "Activate Support Network: Notify a designated family member or contact that you are evacuating."
      ],
    },
    coach: {
      title: "You Are Prepared",
      message: "Take your time, but do not delay. Follow each step carefully. Help is available at the destination. You are strong and capable."
    }
  },
};

// --- Map Configuration Constants ---
export const USER_START_POINT = { lat: 34.031, lng: -118.705 };
export const SHELTER_POINT = { lat: 34.058, lng: -118.645 };

export const SAFE_ROUTE_PATH = [
  USER_START_POINT,
  { lat: 34.038, lng: -118.700 },
  { lat: 34.045, lng: -118.680 },
  { lat: 34.050, lng: -118.660 },
  SHELTER_POINT,
];

// Locations for the animated flame icons on the map perimeter
// 7 flames on the western (left) side of the fire
export const FLAME_LOCATIONS_WEST = [
  { lat: 34.026, lng: -118.755 },
  { lat: 34.032, lng: -118.762 },
  { lat: 34.036, lng: -118.750 },
  { lat: 34.029, lng: -118.735 },
  { lat: 34.020, lng: -118.728 },
  { lat: 34.024, lng: -118.745 },
  { lat: 34.039, lng: -118.758 },
];

// 5 flames on the eastern (right) side of the fire, near the predicted spread
export const FLAME_LOCATIONS_EAST = [
  { lat: 34.040, lng: -118.690 },
  { lat: 34.052, lng: -118.675 },
  { lat: 34.045, lng: -118.665 },
  { lat: 34.038, lng: -118.678 },
  { lat: 34.050, lng: -118.685 },
];

/**
 * Generates a dynamic, multi-layered SVG flame icon with a glow effect 
 * for realistic fire visualization on the map.
 */
export function AdvancedFlameIconSvgString(size = 50, state = 0) {
    const paths = [
        // State 0 - Base wide flame
        {
            red: "M 25,50 C 0,45 0,20 15,10 C 20,0 30,0 35,10 C 50,20 50,45 25,50 Z",
            orange: "M 25,50 C 5,45 5,25 18,15 C 22,5 28,5 32,15 C 45,25 45,45 25,50 Z",
            yellow: "M 25,50 C 10,48 10,35 20,25 C 23,18 27,18 30,25 C 40,35 40,48 25,50 Z"
        },
        // State 1 - Taller flicker
        {
            red: "M 25,50 C 0,45 0,15 18,5 C 22,-5 28,-5 32,5 C 50,15 50,45 25,50 Z",
            orange: "M 25,50 C 5,45 5,20 20,10 C 23,2 27,2 30,10 C 45,20 45,45 25,50 Z",
            yellow: "M 25,50 C 10,48 10,30 22,20 C 24,14 26,14 28,20 C 40,30 40,48 25,50 Z"
        },
        // State 2 - Asymmetrical flicker
        {
            red: "M 25,50 C 0,45 0,20 12,5 C 18,-5 25,5 35,12 C 50,22 50,45 25,50 Z",
            orange: "M 25,50 C 5,45 5,25 16,12 C 20,2 27,10 32,18 C 45,28 45,45 25,50 Z",
            yellow: "M 25,50 C 10,48 10,35 18,22 C 22,15 26,20 30,28 C 40,35 40,48 25,50 Z"
        }
    ];

    const currentPath = paths[state % paths.length];

    return `
    <svg width="${size}" height="${size}" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
        <defs>
            <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g filter="url(#flameGlow)">
            <path d="${currentPath.red}" fill="rgb(220, 38, 38)"/>
            <path d="${currentPath.orange}" fill="rgb(249, 115, 22)"/>
            <path d="${currentPath.yellow}" fill="rgb(252, 211, 77)"/>
        </g>
    </svg>
    `;
}

export function FireIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.362-3.797A8.33 8.33 0 0 1 15.362 5.214Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75a7.5 7.5 0 0 0 15 0v-1.5a7.5 7.5 0 0 0-15 0v1.5Z" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

export function AWSIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-orange-500">
      <path d="M13.4,12.2c-0.2,0-0.5,0.1-0.6,0.2c-0.1,0.2-0.2,0.4-0.2,0.6c0,0.1,0,0.2,0,0.2c0,0,0,0.1,0,0.1c0,0.2,0.1,0.5,0.2,0.6 s0.4,0.2,0.6,0.2c0.2,0,0.5-0.1,0.6-0.2c0.2-0.1,0.2-0.4,0.2-0.6c0-0.1,0-0.1,0-0.2c0,0,0-0.1,0-0.1c0-0.2-0.1-0.5-0.2-0.6 C13.9,12.3,13.6,12.2,13.4,12.2z M20.9,12.2c-0.2,0-0.5,0.1-0.6,0.2c-0.1,0.2-0.2,0.4-0.2,0.6c0,0.1,0,0.2,0,0.2c0,0,0,0.1,0,0.1 c0,0.2,0.1,0.5,0.2,0.6s0.4,0.2,0.6,0.2s0.5-0.1,0.6-0.2c0.2-0.1,0.2-0.4,0.2-0.6c0-0.1,0-0.1,0-0.2c0,0,0-0.1,0-0.1 c0-0.2-0.1-0.5-0.2-0.6C21.4,12.3,21.1,12.2,20.9,12.2z M17.2,12.2c-0.2,0-0.5,0.1-0.6,0.2c-0.1,0.2-0.2,0.4-0.2,0.6 c0,0.1,0,0.2,0,0.2c0,0,0,0.1,0,0.1c0,0.2,0.1,0.5,0.2,0.6s0.4,0.2,0.6,0.2s0.5-0.1,0.6-0.2c0.2-0.1,0.2-0.4,0.2-0.6 c0-0.1,0-0.1,0-0.2c0,0,0-0.1,0-0.1c0-0.2-0.1-0.5-0.2-0.6C17.6,12.3,17.4,12.2,17.2,12.2z M12,2C6.5,2,2,6.5,2,12 c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16,17.2c-2.2,2.2-5.9,2.2-8,0c-0.2-0.2-0.2-0.5,0-0.7l0.4-0.4 c0.2-0.2,0.5-0.2,0.7,0c1.8,1.8,4.6,1.8,6.4,0c0.2-0.2,0.5-0.2,0.7,0l0.4,0.4C16.2,16.7,16.2,17,16,17.2z" />
    </svg>
  );
}

export function WindIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.125 1.125 0 0 1 0 2.25H5.625a1.125 1.125 0 0 1 0-2.25Z" />
    </svg>
  );
}

export function ThermometerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v10.5a3 3 0 0 0 3 3Z" />
    </svg>
  );
}

export function DropletIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.18 0-9.42 4.24-9.42 9.42 0 4.14 2.68 7.65 6.33 8.84.2.07.43.1.65.1h4.88c.22 0 .45-.03.65-.1 3.65-1.19 6.33-4.7 6.33-8.84C21.42 6.49 17.18 2.25 12 2.25Z" />
    </svg>
  );
}

export function ShelterIcon({ className = "w-8 h-8 text-blue-700" }: { className?: string }) {
  // This is now the Shield with a Checkmark icon for UI consistency
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" />
        <path d="M10.5 15.5l-3-3 1-1 2 2 4.5-4.5 1 1 -5.5 5.5z" fill="#FFFFFF"/>
    </svg>
  );
}


// SVG String version for Google Maps markers
export function BlueShieldIconSvgString(size = 40) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shieldGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        </filter>
      </defs>
      <g>
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" fill="#1D4ED8" filter="url(#shieldGlow)"/>
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" fill="#3B82F6" stroke="#FFFFFF" stroke-width="1"/>
        <path d="M10.5 15.5l-3-3 1-1 2 2 4.5-4.5 1 1 -5.5 5.5z" fill="#FFFFFF"/>
      </g>
    </svg>
  `;
}