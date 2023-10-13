export interface IAgreement {
    domains?: string[];
    emails?: string[];
    parkingSpots?: 
    [{
        parkingName: string,
        parkingLimit: number
    }]
}