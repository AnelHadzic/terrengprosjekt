"use client"
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import icon from "@/app/assets/marker"
import { useParkingContext } from "@/app/contexts/ParkingContext"
import { LatLngExpression } from "leaflet"

const orangeOptions = { color: "orange" }

// MapContainer er ellers immutable, så vi kan ikke bare endre center= attributt når staten til currentCoordinates endres. Så derfor må jeg lage en annen Compontent som kjører og er mutable hver gang staten endres.
// Dette skjer under her. Henter inn coordinates i form av prop. Coords er altså currentCoordinates staten. Bruker useMap hook fra leaflet for å kunne gjøre endringer. Dermed bruker jeg setView metoden for å legge inn nye koordinater og zoomer til den.
function SetViewOnChange({ coords }: { coords: LatLngExpression }) {
  const { pickedParking } = useParkingContext()
  const map = useMap()

  if (pickedParking) {
    map.setView(coords, map.getZoom())
  }

  return null
}

const ParkeringMap = () => {
  const { currentCoordinates, parkingList, pickedParking, setPickedParking } =
    useParkingContext()

  const handlePolygonClick = (name: string) => {
    console.log(name)
  }

  return (
    <>
      <MapContainer
        style={{ height: "300px", width: "500px" }}
        center={currentCoordinates}
        zoom={16}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={pickedParking ?? currentCoordinates} icon={icon} />

        {parkingList.map((polygons, index) => (
          <FeatureGroup
            key={index}
            pathOptions={orangeOptions}
            eventHandlers={{
              click: () => handlePolygonClick(polygons.parkingName),
            }}
          >
            <Polygon
              positions={polygons.parkingCoordinates as LatLngExpression[]}
            />
            <Popup>
              {polygons.parkingName} - Plasser: {polygons.parkingCapacity}
            </Popup>
          </FeatureGroup>
        ))}
        <SetViewOnChange coords={pickedParking as LatLngExpression} />
      </MapContainer>
      <div className="mb-3"></div>
      <button
        onClick={() => setPickedParking(null)}
        type="button"
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M8.884 3.116a1.25 1.25 0 0 1 0 1.768L6.018 7.75H17.5c5.937 0 10.75 4.813 10.75 10.75S23.437 29.25 17.5 29.25S6.75 24.437 6.75 18.5a1.25 1.25 0 1 1 2.5 0a8.25 8.25 0 1 0 8.25-8.25H6.018l2.866 2.866a1.25 1.25 0 0 1-1.768 1.768l-5-5a1.25 1.25 0 0 1 0-1.768l5-5a1.25 1.25 0 0 1 1.768 0Z"
          />
        </svg>
        <div className="ml-3"></div>
        Reset kartet
      </button>
    </>
  )
}

export default ParkeringMap
