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
import Loading from "../shared/Loading"

const orangeOptions = { color: "purple" }

const UserParkering = ({ parkingName }: { parkingName: string }) => {
  const [selectedParking, setSelectedParking] = useState<
    IParkingLot | undefined
  >(undefined)

  const coordinates = selectedParking?.parkingCoordinates
    ? (selectedParking.parkingCoordinates[0] as LatLngExpression)
    : undefined

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
        <Loading />
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
              click: () =>
                handlePolygonClick(selectedParking.parkingName as string),
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
