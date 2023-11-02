"use client"
import {
  FeatureGroup,
  MapContainer,
  Polygon,
  Popup,
  TileLayer,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { LatLngExpression } from "leaflet"
import { IParkingLot } from "@/app/lib/interface/IParkingLot"
import { useEffect, useState } from "react"
import axios from "axios"

const orangeOptions = { color: "purple" }

const UserParkering = ({ parkingName }: { parkingName: string }) => {
  const [selectedParking, setSelectedParking] = useState<
    IParkingLot | undefined
  >(undefined)

  const coordinates = selectedParking?.parkingCoordinates[0] as LatLngExpression

  useEffect(() => {
    if (parkingName) {
      const findParking = async (parkingName: string) => {
        try {
          const API_URL = `/api/parkingLot/${parkingName}`

          const response = await axios.get(API_URL)

          console.log(response.data.data)

          setSelectedParking(response.data.data)
        } catch (error) {
          console.log(error)
        }
      }
      findParking(parkingName)
    }
  }, [parkingName])

  const handlePolygonClick = (name: string) => {
    console.log(name)
  }

  if (!selectedParking) {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="blue" stroke-linecap="round" stroke-width="2">
            <path
              stroke-dasharray="60"
              stroke-dashoffset="60"
              stroke-opacity=".3"
              d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="1.3s"
                values="60;0"
              />
            </path>
            <path
              stroke-dasharray="15"
              stroke-dashoffset="15"
              d="M12 3C16.9706 3 21 7.02944 21 12"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="15;0"
              />
              <animateTransform
                attributeName="transform"
                dur="1.5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </g>
        </svg>
      </>
    )
  } else {
    return (
      <>
        <MapContainer
          style={{ height: "300px", width: "300px" }}
          center={coordinates}
          zoom={16}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup
            pathOptions={orangeOptions}
            eventHandlers={{
              click: () => handlePolygonClick(selectedParking.parkingName),
            }}
          >
            <Polygon
              positions={
                selectedParking.parkingCoordinates as LatLngExpression[]
              }
            />
            <Popup>
              {selectedParking.parkingName} - Plasser:{" "}
              {selectedParking.parkingCapacity}
            </Popup>
          </FeatureGroup>
        </MapContainer>
        <div className="mb-3"></div>
      </>
    )
  }
}

export default UserParkering
