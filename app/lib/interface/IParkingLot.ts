export interface IParkingLot {
    parkingName: string;
    parkingCapacity: number;
    parkingCoordinates?: number[][];
    created?: Date;
}