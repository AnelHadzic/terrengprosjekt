"use client"
import React, { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"

import {
  FeatureGroup,
  MapContainer,
  Polygon,
  Popup,
  TileLayer,
} from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import { MapLayer } from "@/app/(pages)/(admin)/(parkering)/ny-parkering/page"
import axios from "axios"
import { LatLngExpression } from "leaflet"
import { ParkingLot } from "@/app/contexts/types/ParkingData"

// https://www.youtube.com/watch?v=xQmgNWLEMiM&ab_channel=ProgrammingWithPrem

interface LeafletLayerEvent {
  layers: {
    _layers: Record<number, { _leaflet_id: number }>
  }
}

const AddNewParking = ({
  mapLayers,
  setMapLayers,
}: {
  mapLayers: MapLayer[]
  setMapLayers: React.Dispatch<React.SetStateAction<MapLayer[]>>
}) => {
  const [currentCoordinates, setCurrentCoordinates] = useState<
    [number, number]
  >([59.212575443746296, 10.924253141809777])

  const [parkingList, setParkingList] = useState<ParkingLot[]>([])

  useEffect(() => {
    if (mapLayers.length > 0) {
      console.log(mapLayers[0].latlngs)
    }
  }, [mapLayers])

  const _onCreate = (e: any) => {
    const { layerType, layer } = e
    if (layerType === "polygon") {
      const { _leaflet_id } = layer

      setMapLayers((layers) => [
        ...layers,
        {
          id: _leaflet_id,
          latlngs: layer.getLatLngs()[0],
        },
      ])
    }
  }

  const _onEdited = (e: any) => {
    const {
      layers: { _layers },
    } = e

    Object.values(_layers).forEach((layer: any) => {
      const { _leaflet_id, editing } = layer

      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id ? { ...l, latlngs: editing.latlngs[0] } : l,
        ),
      )
    })
  }

  const _onDeleted = (e: LeafletLayerEvent) => {
    const {
      layers: { _layers },
    } = e

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id))
    })
  }

  const orangeOptions = { color: "orange" }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = "/api/parkingLot"
        const response = await axios.get(API_URL)
        setParkingList(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <MapContainer
        style={{ height: "300px", width: "500px" }}
        center={currentCoordinates}
        zoom={16}
        scrollWheelZoom={true}
      >
        {parkingList.map((polygons, index) => (
          <FeatureGroup key={index} pathOptions={orangeOptions}>
            <Polygon
              positions={polygons.parkingCoordinates as LatLngExpression[]}
            />
            <Popup>
              {polygons.parkingName} - Plasser: {polygons.parkingCapacity}
            </Popup>
          </FeatureGroup>
        ))}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_onCreate}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
          />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  )
}

export default AddNewParking
