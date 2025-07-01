import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from './Card';
import UnlockButton from './UnlockButton';
import * as topojson from 'topojson-client';

// Country coordinates (latitude, longitude)
const countries = [
  { name: 'United States', code: 'US', lat: 39.8283, lng: -98.5795, flag: '🇺🇸' },
  { name: 'India', code: 'IN', lat: 20.5937, lng: 78.9629, flag: '🇮🇳' },
  { name: 'Brazil', code: 'BR', lat: -14.2350, lng: -51.9253, flag: '🇧🇷' },
  { name: 'Germany', code: 'DE', lat: 51.1657, lng: 10.4515, flag: '🇩🇪' },
  { name: 'Japan', code: 'JP', lat: 36.2048, lng: 138.2529, flag: '🇯🇵' },
  { name: 'Australia', code: 'AU', lat: -25.2744, lng: 133.7751, flag: '🇦🇺' },
  { name: 'Canada', code: 'CA', lat: 56.1304, lng: -106.3468, flag: '🇨🇦' },
  { name: 'United Kingdom', code: 'GB', lat: 55.3781, lng: -3.4360, flag: '🇬🇧' },
  { name: 'France', code: 'FR', lat: 46.2276, lng: 2.2137, flag: '🇫🇷' },
  { name: 'South Korea', code: 'KR', lat: 35.9078, lng: 127.7669, flag: '🇰🇷' },
  { name: 'Mexico', code: 'MX', lat: 23.6345, lng: -102.5528, flag: '🇲🇽' },
  { name: 'Russia', code: 'RU', lat: 61.5240, lng: 105.3188, flag: '🇷🇺' },
  { name: 'China', code: 'CN', lat: 35.8617, lng: 104.1954, flag: '🇨🇳' },
  { name: 'Argentina', code: 'AR', lat: -38.4161, lng: -63.6167, flag: '🇦🇷' },
  { name: 'South Africa', code: 'ZA', lat: -30.5595, lng: 22.9375, flag: '🇿🇦' },
  { name: 'Egypt', code: 'EG', lat: 26.8206, lng: 30.8025, flag: '🇪🇬' },
  { name: 'Nigeria', code: 'NG', lat: 9.0820, lng: 8.6753, flag: '🇳🇬' },
  { name: 'Indonesia', code: 'ID', lat: -0.7893, lng: 113.9213, flag: '🇮🇩' },
  { name: 'Thailand', code: 'TH', lat: 15.8700, lng: 100.9925, flag: '🇹🇭' },
  { name: 'New Zealand', code: 'NZ', lat: -40.9006, lng: 174.8860, flag: '🇳🇿' }
];

const moodTypes = [
  { name: 'Energized', color: '#10B981', emoji: '😄' },
  { name: 'Focused', color: '#3B82F6', emoji: '🙂' },
  { name: 'Meh', color: '#6B7280', emoji: '😐' },
  { name: 'Overwhelmed', color: '#EF4444', emoji: '😫' }
];

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat, lng, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Helper function to draw polygon on canvas
const drawPolygon = (ctx, coordinates, fill = true, stroke = false) => {
  if (!coordinates || coordinates.length === 0) return;
  
  ctx.beginPath();
  coordinates.forEach((coord, index) => {
    // Convert longitude/latitude to canvas coordinates
    const x = ((coord[0] + 180) / 360) * 2048;
    const y = ((90 - coord[1]) / 180) * 1024;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.closePath();
  
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
};

// Helper function to draw GeoJSON feature
const drawFeature = (ctx, feature, fill = true, stroke = false) => {
  if (!feature || !feature.geometry || !feature.geometry.coordinates) return;
  
  const { type, coordinates } = feature.geometry;
  
  if (type === 'Polygon') {
    // Single polygon - coordinates is an array of rings
    coordinates.forEach(ring => {
      drawPolygon(ctx, ring, fill, stroke);
    });
  } else if (type === 'MultiPolygon') {
    // Multiple polygons - coordinates is an array of polygons
    coordinates.forEach(polygon => {
      polygon.forEach(ring => {
        drawPolygon(ctx, ring, fill, stroke);
      });
    });
  }
};

// Country Label Component with hover functionality
function CountryLabel({ country, countryMoods, position }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Count moods by type
  const moodCounts = {};
  moodTypes.forEach(mood => {
    moodCounts[mood.name] = countryMoods.filter(m => m.mood === mood.name).length;
  });
  
  const totalCount = countryMoods.length;
  
  return (
    <Html key={country.code} position={position} center>
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Simple number display (always visible) */}
        <div className="bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded-lg text-sm font-bold whitespace-nowrap pointer-events-auto border border-white/30 cursor-pointer hover:bg-white/30 transition-all duration-200 min-w-[32px] text-center">
          {totalCount}
        </div>
        
        {/* Detailed breakdown (on hover) */}
        {isHovered && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/25 backdrop-blur-lg text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none border border-white/40 z-10 animate-fade-in">
            <div className="flex items-center space-x-2 font-semibold mb-2 text-center">
              <span className="text-lg">{country.flag}</span>
              <span>{country.name}</span>
            </div>
            <div className="space-y-1">
              {moodTypes.map(mood => {
                const count = moodCounts[mood.name];
                if (count === 0) return null;
                return (
                  <div key={mood.name} className="flex items-center justify-between space-x-3">
                    <div className="flex items-center space-x-1">
                      <span>{mood.emoji}</span>
                      <span className="text-xs">{mood.name}</span>
                    </div>
                    <span className="font-semibold">{count}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-white/30 mt-2 pt-1 text-center">
              <span className="text-white/80 text-xs">Total: {totalCount}</span>
            </div>
          </div>
        )}
      </div>
    </Html>
  );
}

// Earth component with perfect geometry using world-atlas data
function Earth({ userMoods, selectedCountry, selectedMood, earthRef }) {
  const [worldData, setWorldData] = useState(null);

  // Load world atlas data for perfect geography
  useEffect(() => {
    const loadWorldData = async () => {
      try {
        // Load world atlas data
        const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
        const world = await response.json();
        
        // Convert TopoJSON to GeoJSON
        const countries = topojson.feature(world, world.objects.countries);
        const land = topojson.feature(world, world.objects.land);
        
        setWorldData({ countries, land });
      } catch (error) {
        console.error('Failed to load world data:', error);
        // Fallback to simple geometry if loading fails
        setWorldData(null);
      }
    };

    loadWorldData();
  }, []);

  // Create Earth texture with perfect geography and country borders
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Ocean background - clean blue
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(0, 0, 2048, 1024);
    
    if (worldData && worldData.land) {
      // Use real world data for perfect geography
      ctx.fillStyle = '#10b981'; // Land color - clean green
      
      // Draw land masses using GeoJSON data
      if (worldData.land.features) {
        // FeatureCollection - iterate through features
        worldData.land.features.forEach(feature => {
          drawFeature(ctx, feature, true, false);
        });
      } else if (worldData.land.geometry) {
        // Single Feature - draw directly
        drawFeature(ctx, worldData.land, true, false);
      }
    } else {
      // Fallback: Simple geometric shapes for major continents
      ctx.fillStyle = '#10b981';
      
      // North America
      ctx.beginPath();
      ctx.ellipse(300, 250, 120, 80, 0.2, 0, 2 * Math.PI);
      ctx.fill();
      
      // South America
      ctx.beginPath();
      ctx.ellipse(400, 450, 60, 120, 0.1, 0, 2 * Math.PI);
      ctx.fill();
      
      // Europe
      ctx.beginPath();
      ctx.ellipse(1000, 220, 80, 50, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      // Africa
      ctx.beginPath();
      ctx.ellipse(1050, 400, 80, 140, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      // Asia
      ctx.beginPath();
      ctx.ellipse(1400, 280, 200, 100, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      // Australia
      ctx.beginPath();
      ctx.ellipse(1550, 650, 80, 40, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Draw country borders if we have country data
    if (worldData && worldData.countries) {
      ctx.strokeStyle = '#1e40af'; // Darker blue for borders
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.8;
      
      if (worldData.countries.features) {
        // FeatureCollection - iterate through features
        worldData.countries.features.forEach(feature => {
          drawFeature(ctx, feature, false, true);
        });
      } else if (worldData.countries.geometry) {
        // Single Feature - draw directly
        drawFeature(ctx, worldData.countries, false, true);
      }
      
      ctx.globalAlpha = 1.0; // Reset alpha
    }
    
    // Ice caps - white
    ctx.fillStyle = '#f8fafc';
    
    // Arctic ice
    ctx.beginPath();
    ctx.ellipse(1024, 50, 400, 40, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Antarctic ice
    ctx.beginPath();
    ctx.ellipse(1024, 974, 500, 40, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    return new THREE.CanvasTexture(canvas);
  }, [worldData]);

  // NO AUTO-ROTATION - Earth only moves when user interacts
  // useFrame is removed to prevent automatic movement

  return (
    <group>
      {/* Main Earth sphere with perfect geometry */}
      <Sphere ref={earthRef} args={[2, 128, 64]}>
        <meshPhongMaterial 
          map={earthTexture}
          transparent
          opacity={0.95}
          shininess={30}
          specular="#4FC3F7"
        />
      </Sphere>
      
      {/* Atmosphere layers */}
      <Sphere args={[2.05, 64, 32]}>
        <meshBasicMaterial 
          color="#87CEEB"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      
      <Sphere args={[2.15, 32, 16]}>
        <meshBasicMaterial 
          color="#4FC3F7"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Country glow effects for selected country */}
      {selectedCountry && selectedMood && (
        (() => {
          const country = countries.find(c => c.code === selectedCountry);
          if (!country) return null;
          
          const position = latLngToVector3(country.lat, country.lng, 2.18);
          const moodType = moodTypes.find(m => m.name === selectedMood);
          
          return (
            <group key={`glow-${selectedCountry}`} position={position}>
              {/* Large glow effect for selected country */}
              <Sphere args={[0.25, 32, 32]}>
                <meshBasicMaterial 
                  color={moodType?.color || '#8B5CF6'}
                  transparent
                  opacity={0.3}
                />
              </Sphere>
              
              {/* Medium glow */}
              <Sphere args={[0.18, 24, 24]}>
                <meshBasicMaterial 
                  color={moodType?.color || '#8B5CF6'}
                  transparent
                  opacity={0.5}
                />
              </Sphere>
              
              {/* Inner bright core */}
              <Sphere args={[0.12, 16, 16]}>
                <meshBasicMaterial 
                  color={moodType?.color || '#8B5CF6'}
                  transparent
                  opacity={0.8}
                />
              </Sphere>
            </group>
          );
        })()
      )}
      
      {/* Mood markers for submitted moods */}
      {userMoods.map((mood, index) => {
        const country = countries.find(c => c.code === mood.country);
        if (!country) return null;
        
        const position = latLngToVector3(country.lat, country.lng, 2.18);
        const moodType = moodTypes.find(m => m.name === mood.mood);
        
        return (
          <group key={`${mood.id}-${index}`} position={position}>
            {/* Main mood marker */}
            <Sphere args={[0.06, 16, 16]}>
              <meshBasicMaterial 
                color={moodType?.color || '#8B5CF6'}
                transparent
                opacity={0.9}
              />
            </Sphere>
            
            {/* Pulsing effect */}
            <Sphere args={[0.09, 16, 16]}>
              <meshBasicMaterial 
                color={moodType?.color || '#8B5CF6'}
                transparent
                opacity={0.4}
              />
            </Sphere>
            
            {/* Glow effect */}
            <Sphere args={[0.12, 16, 16]}>
              <meshBasicMaterial 
                color={moodType?.color || '#8B5CF6'}
                transparent
                opacity={0.1}
              />
            </Sphere>
          </group>
        );
      })}
      
      {/* Country labels with hover functionality */}
      {countries.map((country) => {
        const position = latLngToVector3(country.lat, country.lng, 2.4);
        const countryMoods = userMoods.filter(m => m.country === country.code);
        
        if (countryMoods.length === 0) return null;
        
        return (
          <CountryLabel
            key={country.code}
            country={country}
            countryMoods={countryMoods}
            position={position}
          />
        );
      })}
    </group>
  );
}

// Main 3D Earth component
export default function Interactive3DEarth() {
  // Form state
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  
  // Persistent state for global mood map
  const [userMoods, setUserMoods] = useState([]);
  
  // Unlock state
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Ref for Earth to control rotation manually
  const earthRef = useRef();

  useEffect(() => {
    // Load persistent mood data
    const savedMoods = localStorage.getItem('earthUserMoods');
    
    if (savedMoods) {
      const moods = JSON.parse(savedMoods);
      setUserMoods(moods);
    }
  }, []);

  const handleSubmitMood = () => {
    if (!selectedCountry || !selectedMood) return;
    
    const newMood = {
      id: Math.random().toString(36).substr(2, 9),
      country: selectedCountry,
      mood: selectedMood,
      timestamp: Date.now()
    };
    
    const updatedMoods = [...userMoods, newMood];
    setUserMoods(updatedMoods);
    
    // Save mood data
    localStorage.setItem('earthUserMoods', JSON.stringify(updatedMoods));
    
    // Reset form
    setSelectedCountry('');
    setSelectedMood('');
    
    // Trigger small celebration
    if (window.confetti) {
      window.confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: [moodTypes.find(m => m.name === selectedMood)?.color || '#8B5CF6']
      });
    }
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <Card className="glass-enhanced shadow-xl">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white font-heading">
            🌍 Global Mood Map
          </h3>
          <p className="text-white/70 text-sm mt-1 font-body">
            Share your mood and see how the world feels • Hover over numbers for details
          </p>
        </div>
        
        {!isUnlocked ? (
          <UnlockButton
            unlockThreshold={35}
            onUnlock={handleUnlock}
            storageKey="moodMapUnlock"
            className="w-full"
          >
            <div className="space-y-4 animate-fade-in">
              {/* 3D Earth Canvas */}
              <div className="h-64 mb-4 rounded-lg overflow-hidden bg-gradient-to-b from-indigo-900/20 to-black/40 border border-white/10">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.3} />
                  <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
                  <pointLight position={[-10, -10, -10]} intensity={0.6} color="#4FC3F7" />
                  <pointLight position={[0, 10, 0]} intensity={0.4} color="#87CEEB" />
                  
                  <Earth 
                    userMoods={userMoods} 
                    selectedCountry={selectedCountry}
                    selectedMood={selectedMood}
                    earthRef={earthRef}
                  />
                  
                  <OrbitControls 
                    enableZoom={true}
                    enablePan={false}
                    minDistance={3}
                    maxDistance={8}
                    autoRotate={false}
                    autoRotateSpeed={0}
                  />
                </Canvas>
              </div>
              
              {/* Mood Submission Interface */}
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="p-2 glass-button rounded-lg text-white text-sm font-body"
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.code} className="bg-gray-800">
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                    className="p-2 glass-button rounded-lg text-white text-sm font-body"
                  >
                    <option value="">Select Mood</option>
                    {moodTypes.map(mood => (
                      <option key={mood.name} value={mood.name} className="bg-gray-800">
                        {mood.emoji} {mood.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Preview of selected country glow */}
                {selectedCountry && selectedMood && (
                  <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ 
                          backgroundColor: moodTypes.find(m => m.name === selectedMood)?.color,
                          boxShadow: `0 0 10px ${moodTypes.find(m => m.name === selectedMood)?.color}40`
                        }}
                      />
                      <span className="text-white/90 text-sm font-body">
                        {countries.find(c => c.code === selectedCountry)?.flag} {countries.find(c => c.code === selectedCountry)?.name} will glow {selectedMood.toLowerCase()}
                      </span>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={handleSubmitMood}
                  disabled={!selectedCountry || !selectedMood}
                  className="w-full glass-button px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-white/20 transition-all duration-300 disabled:cursor-not-allowed font-ui"
                >
                  Add Your Mood to Earth 🌍
                </button>
              </div>
              
              {/* Total submissions counter */}
              <div className="text-center">
                <div className="text-white/60 text-xs font-body">
                  🌍 Total global mood submissions: <span className="font-semibold text-white font-ui">{userMoods.length}</span>
                </div>
              </div>
            </div>
          </UnlockButton>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {/* 3D Earth Canvas */}
            <div className="h-64 mb-4 rounded-lg overflow-hidden bg-gradient-to-b from-indigo-900/20 to-black/40 border border-white/10">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.6} color="#4FC3F7" />
                <pointLight position={[0, 10, 0]} intensity={0.4} color="#87CEEB" />
                
                <Earth 
                  userMoods={userMoods} 
                  selectedCountry={selectedCountry}
                  selectedMood={selectedMood}
                  earthRef={earthRef}
                />
                
                <OrbitControls 
                  enableZoom={true}
                  enablePan={false}
                  minDistance={3}
                  maxDistance={8}
                  autoRotate={false}
                  autoRotateSpeed={0}
                />
              </Canvas>
            </div>
            
            {/* Mood Submission Interface */}
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="p-2 glass-button rounded-lg text-white text-sm font-body"
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code} className="bg-gray-800">
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="p-2 glass-button rounded-lg text-white text-sm font-body"
                >
                  <option value="">Select Mood</option>
                  {moodTypes.map(mood => (
                    <option key={mood.name} value={mood.name} className="bg-gray-800">
                      {mood.emoji} {mood.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Preview of selected country glow */}
              {selectedCountry && selectedMood && (
                <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ 
                        backgroundColor: moodTypes.find(m => m.name === selectedMood)?.color,
                        boxShadow: `0 0 10px ${moodTypes.find(m => m.name === selectedMood)?.color}40`
                      }}
                    />
                    <span className="text-white/90 text-sm font-body">
                      {countries.find(c => c.code === selectedCountry)?.flag} {countries.find(c => c.code === selectedCountry)?.name} will glow {selectedMood.toLowerCase()}
                    </span>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleSubmitMood}
                disabled={!selectedCountry || !selectedMood}
                className="w-full glass-button px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-white/20 transition-all duration-300 disabled:cursor-not-allowed font-ui"
              >
                Add Your Mood to Earth 🌍
              </button>
            </div>
            
            {/* Total submissions counter */}
            <div className="text-center">
              <div className="text-white/60 text-xs font-body">
                🌍 Total global mood submissions: <span className="font-semibold text-white font-ui">{userMoods.length}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}