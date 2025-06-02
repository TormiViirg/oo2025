import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { ToastContainer } from 'react-toastify';

type AthleteLocation = {
  athleteId: number;
  name: string;
  latitude: number;
  longitude: number;
};

function Map() {
  const [locations, setLocations] = useState<AthleteLocation[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/athletes/locations")
      .then((res) => res.json())
      .then((json: AthleteLocation[]) => {
        setLocations(json);
      });
  }, []);

    
  return (
    <div>
      
      <MapContainer 
        className="map" 
        center={[59.436, 24.752]} 
        zoom={12} 
        scrollWheelZoom={false}
        >
            
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((athlete) => (
          <Marker 
            key = {athlete.athleteId} 
            position={[athlete.latitude, athlete.longitude]}>
              <Popup>
                {athlete.name}
              </Popup>
            </Marker>
        ))}
      </MapContainer>
      <ToastContainer/>
    </div>
  )
}

export default Map