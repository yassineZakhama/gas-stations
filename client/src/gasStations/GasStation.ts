type Address = {
	street: string;
	zipcode: number;
	city: string;
};

export type GasStation = {
	id: number;
	address: Address;
	coordinates: {
		x: number;
		y: number;
	};
};

class GasStations {
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

export const gasStations = new GasStations();
