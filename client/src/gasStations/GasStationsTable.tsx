import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { GasStation } from "./GasStation";

interface GasStationsTableProps {
	readonly gasStations: GasStation[];
	readonly query: string;
}

export function GasStationsTable(props: GasStationsTableProps) {
	const { gasStations, query } = props;

	const filteredGasStations = query.length
		? gasStations.filter(gs => gs.address.street.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
		: gasStations;

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Street</TableCell>
						<TableCell>Postal Code</TableCell>
						<TableCell>City</TableCell>
						<TableCell align="right">X</TableCell>
						<TableCell align="right">Y</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredGasStations.map(gs => (
						<TableRow key={gs.id}>
							<TableCell>{gs.address.street}</TableCell>
							<TableCell>{gs.address.zipcode}</TableCell>
							<TableCell>{gs.address.city}</TableCell>
							<TableCell align="right">{gs.coordinates.x}</TableCell>
							<TableCell align="right">{gs.coordinates.y}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
