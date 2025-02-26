
"use client";

import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap() {
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: { fill: "#17e1b3ff", stroke: "#FFFFFF" },
                hover: { fill: "#F53", stroke: "#FFFFFF" },
                pressed: { fill: "#E42", stroke: "#FFFFFF" },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}

// "use client";

// import React from "react";
// import { ComposableMap, Geographies, Geography, Line } from "react-simple-maps";
// import { useSpring, animated } from "@react-spring/web";
// import {geoEquirectangular} from "d3-geo"

// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// const paths = [
//   // { from: [-74.006, 40.7128], to: [2.3522, 40.7128] },  // NYC → Paris (horizontal)
//   // { from: [-118.2437, 34.0522], to: [139.6917, 34.0522] },  // LA → Tokyo (horizontal)
//   // { from: [116.4074, 39.9042], to: [-0.1276, 39.9042] },  // Beijing → London (horizontal)
//   // { from: [139.6917, 35.6895], to: [28.7041, 35.6895] },  // Tokyo → Delhi (horizontal)
//   // { from: [-3.7038, 40.4168], to: [48.8566, 40.4168] },  // Madrid → Paris (horizontal)
//   // { from: [-0.1276, 51.5074], to: [39.9042, 51.5074] },  // London → Beijing (horizontal)
//   // { from: [121.4737, 31.2304], to: [-58.4438, 31.2304] },  // Shanghai → Buenos Aires (horizontal)
//   // { from: [2.3522, 48.8566], to: [55.7558, 48.8566] },  // Paris → Moscow (horizontal)
//   // { from: [-74.006, 40.7128], to: [34.0522, 40.7128] },  // NYC → LA (horizontal)
//   // { from: [39.9042, 116.4074], to: [40.73061, 116.4074] },  // Beijing → NYC (horizontal)
//   // { from: [55.7558, 37.6173], to: [41.9028, 37.6173] },  // Moscow → Rome (horizontal)
//   // { from: [48.8566, 2.3522], to: [34.0522, 2.3522] },  // Paris → LA (horizontal)
//   // { from: [-58.4438, -34.6037], to: [40.7128, -34.6037] },  // Buenos Aires → NYC (horizontal)
//   // { from: [116.4074, 39.9042], to: [34.0522, 39.9042] },  // Beijing → LA (horizontal)
//   // { from: [-3.7038, 40.4168], to: [40.73061, 40.4168] },  // Madrid → NYC (horizontal)
//   // { from: [51.5074, -0.1278], to: [48.8566, -0.1278] },  // London → Paris (horizontal)
//   // { from: [34.0522, -118.2437], to: [-74.006, -118.2437] },  // LA → NYC (horizontal)
//   // { from: [41.9028, 12.4964], to: [55.7558, 12.4964] },  // Rome → Moscow (horizontal)
//   // { from: [28.7041, 77.1025], to: [139.6917, 77.1025] },  // Delhi → Tokyo (horizontal)
//   // { from: [-58.4438, -34.6037], to: [2.3522, -34.6037] },  // Buenos Aires → Paris (horizontal)
// ];


// export default function WorldMap() {
//   const projection = geoEquirectangular().scale(150);
//   return (
//     <ComposableMap 
//       projection="geoEquirectangular" // Flat projection (Equirectangular)
//       projectionConfig={{ scale: 150 }}  // Adjust scale to fit better
//     >
//       {/* Map Background */}
//       <Geographies geography={geoUrl}>
//         {({ geographies }) =>
//           geographies.map((geo) => (
//             <Geography
//               key={geo.rsmKey}
//               geography={geo}
//               style={{
//                 default: { fill: "#D6D6DA", stroke: "#FFFFFF" },
//                 hover: { fill: "#F53", stroke: "#FFFFFF" },
//                 pressed: { fill: "#E42", stroke: "#FFFFFF" },
//               }}
//             />
//           ))
//         }
//       </Geographies>

//       {/* Animated Lines */}
//       {paths.map((path, i) => (
//         <MovingLine key={i} from={path.from} to={path.to} projection={projection} />
//       ))}

//       <defs>
//         {/* Gradient for glowing line */}
//         <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" style={{ stopColor: "#FF5733", stopOpacity: 1 }} />
//           <stop offset="100%" style={{ stopColor: "#FFC300", stopOpacity: 1 }} />
//         </linearGradient>

//         {/* Glowing effect filter */}
//         <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//           <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//           <feMerge>
//             <feMergeNode in="coloredBlur" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//       </defs>
//     </ComposableMap>
//   );
// }

// // Animated line component
// function MovingLine({ from, to, projection }) {
//   const { x } = useSpring({
//     from: { x: 0 },
//     to: { x: 1 },
//     loop: { reverse: true },
//     config: { duration: 3000 },
//   });
  
//   const projectedFrom = projection(from);
//   const projectedTo = projection(to);

//   return (
//     <>
//       {/* Line */}
//       <Line
//         from={from}
//         to={to}
//         stroke="url(#gradient)"
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeDasharray="5,5"
//       />
//     </>
//   );
// }

