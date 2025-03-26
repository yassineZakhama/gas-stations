type Address = {
	readonly street: string;
	readonly zipcode: number;
	readonly city: string;
};

export type GasStation = {
	readonly id: number;
	readonly address: Address;
	readonly coordinates: {
		readonly x: number;
		readonly y: number;
	};
};

class GasStationRepo {
	private gasStations: GasStation[];
	private sortedGasStations: GasStation[];

	constructor() {
		this.gasStations = [];
		this.sortedGasStations = [];
	}

	initialize(gs: GasStation[]) {
		this.gasStations = gs;
		this.sortedGasStations = [...gs].sort((a, b) => (a.address.street < b.address.street ? -1 : 1));
	}

	get() {
		return this.gasStations;
	}

	getSorted() {
		return this.sortedGasStations;
	}
}

export const gasStationRepo = new GasStationRepo();
