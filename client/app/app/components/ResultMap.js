import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3lsYXBwYXJrIiwiYSI6ImNsc21mNWwxNzBsc3oycXJ5NTAyMzZtamQifQ.FH00Q1Y2ARsOleB7tPzh0A';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5795, 39.8283], // Center on the US
      zoom: 4, // Adjusted to a more reasonable level
      pitch: 0,
      bearing: 0,
      projection: 'mercator',
      maxZoom: 10,
      maxBounds: [
        [-130.0, 23.5], // Southwest bound (Hawaii and southern US)
        [-60.0, 50.5],  // Northeast bound (Maine)
      ],
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    map.on('load', () => {
      setMapLoaded(true);

      // Add county boundaries vector source
      map.addSource('counties', {
        type: 'vector',
        url: 'mapbox://your_mapbox_tileset_id', // Replace with actual Mapbox tileset ID
      });

      // Define matchExpression (for coloring counties)
      const matchExpression = [
        'match',
        ['get', 'name'], // Property to match
        'Los Angeles', '#ff0000', // Example: LA in red
        'New York', '#0000ff', // NY in blue
        'San Diego', '#00ff00', // SD in green
        '#cccccc' // Default gray
      ];

      // Apply the county layer
      map.addLayer(
        {
          id: 'counties-layer',
          type: 'fill',
          source: 'counties',
          'source-layer': 'your_source_layer', // Replace with the actual source layer name
          paint: {
            'fill-color': matchExpression,
            'fill-opacity': 0.5,
          },
          filter: ['==', ['get', 'state_code'], 'US'], // Ensure only US counties appear
        },
        'admin-1-boundary-bg'
      );
    });

    return () => map.remove(); // Cleanup on component unmount
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '90%' }} />;
};

export default Map;

