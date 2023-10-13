import { IParkingLot } from "../interface/IParkingLot"

export const systemParkings = () => {
  const parkingLots = [
    {
      parkingName: "P1",
      parkingCapacity: 10,
      parkingCoordinates: [
        [59.213619210517265, 10.924095429685895],
        [59.213621977684696, 10.924275808242147],
        [59.21340307045286, 10.924230881241147],
        [59.213406524071246, 10.923976741936986],
      ],
    },
    {
      parkingName: "P2",
      parkingCapacity: 50,
      parkingCoordinates: [
        [59.212468543882274, 10.91725717021598],
        [59.21240873667356, 10.920566311856966],
        [59.21181529701758, 10.920584116615991],
        [59.21187006022054, 10.91703588249663],
      ],
    },
    {
      parkingName: "P3",
      parkingCapacity: 23,
      parkingCoordinates: [
        [59.21241695508506, 10.920665509799544],
        [59.211818145031586, 10.920678227484611],
        [59.211852077068144, 10.922339157147697],
        [59.21230262947615, 10.922270481648608],
      ],
    },
  ] as IParkingLot[]
  return parkingLots
}
