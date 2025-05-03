import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map() {
  return (
    <div>
        <MapContainer className = "map" center={[59.436, 24.752]} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[59.436, 24.755]}>
                <Popup>
                    Viru keskus. <br /> Avatud 9.00-22.00
                </Popup>
            </Marker>

            <Marker position={[59.421, 24.793]}>
                <Popup>
                    Ülemiste <br /> Avatud 9.00-22.00
                </Popup>
            </Marker>

            <Marker position={[59.427, 24.723]}>
                <Popup>
                    Kristiine <br /> Avatud 9.00-22.00
                </Popup>
            </Marker>

        </MapContainer>
    </div>
  )
}

export default Map