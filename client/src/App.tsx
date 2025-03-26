import { Typography } from "@mui/material";
import React, { type JSX } from "react";

import { fetchAndSetGasStations } from "./gasStations/fetcher";
import { MainView } from "./MainView";

export function App(): JSX.Element {
	const [isAppBusy, setAppBusy] = React.useState<boolean>(true);

	React.useEffect(() => {
		fetchAndSetGasStations(setAppBusy);
	}, []);

	if (isAppBusy) {
		return (
			<Typography variant="h4" gutterBottom align="center">
				Loading ...
			</Typography>
		);
	}

	return <MainView />;
}
