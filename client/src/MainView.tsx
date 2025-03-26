import React, { type JSX } from "react";
import { Typography, TextField, FormControlLabel, Switch } from "@mui/material";
import styled from "styled-components";

import { GasStationsTable } from "./gasStations/GasStationsTable";
import { gasStations } from "./gasStations/GasStation";

export function MainView(): JSX.Element {
	const [sorted, setSorted] = React.useState<boolean>(false);
	const [query, setQuery] = React.useState<string>("");

	return (
		<>
			<AppBar>
				<div >
					<TextField placeholder="Search street ..." onChange={e => setQuery(e.target.value.trim())}/>
					<SortSwitch
						control={<Switch checked={sorted} onChange={() => setSorted(current => !current)} />}
						label="Sort Entries"
					/>
				</div>
				<Typography variant="h4" alignSelf={"center"}>Gas Stations</Typography>
			</AppBar>
			<GasStationsTable gasStations={sorted ? gasStations.getSorted() : gasStations.get()} query={query} />
		</>
	);
}

const AppBar = styled.header`
	display: flex;
	justify-content: space-between;
`;

const SortSwitch = styled(FormControlLabel)`
	margin-left: 10px;
	align-self: "center";
	height: 100%;
`


