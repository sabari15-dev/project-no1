import { IFlightProvider, FlightSearchQuery, FlightResult } from "../../infrastructure/flight/flight.interface";
import { AmadeusProvider } from "../../infrastructure/flight/providers/amadeus.provider";
import { RiyaProvider } from "../../infrastructure/flight/providers/riya.provider";

export class FlightSearchService {
    private providers: IFlightProvider[];

    constructor() {
        // Here you can register all your providers
        this.providers = [
            new AmadeusProvider(),
            new RiyaProvider(),
        ];
    }

    async searchAll(query: FlightSearchQuery): Promise<FlightResult[]> {
        const searchPromises = this.providers.map(p => p.availability(query));
        const results = await Promise.all(searchPromises);

        // Flatten and return all results
        return results.flat();
    }
}
