import React from "react";

import { GasStation, gasStations } from "./GasStation";

export async function fetchAndSetGasStations(setAppBusy: React.Dispatch<React.SetStateAction<boolean>>) {
	const API_URL =
		"https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson";

	try {
		const response = await fetch(API_URL);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		gasStations.initialize(parseGasStations(result.features));
		setAppBusy(false);
	} catch (err) {
		console.error(err);
	}
}

type RawGasStation = {
	attributes: {
		adresse: string;
		objectid: string;
	};
	geometry: {
		x: number;
		y: number;
	};
};

function parseGasStations(rawGasStations: RawGasStation[]): GasStation[] {
	return rawGasStations.map(gs => ({
		id: Number(gs.attributes.objectid),
		address: { ...parseAddress(gs.attributes.adresse) },
		coordinates: gs.geometry
	}));
}

function parseAddress(address: string) {
	const match = address.match(/(.+) \((\d{5}) ([^)]+)\)/);

	if (!match) {
		throw new Error(`${address} is not a valid address format.`);
	}

	return {
		street: match[1].trim(),
		zipcode: Number(match[2]),
		city: match[3].trim()
	};
}
