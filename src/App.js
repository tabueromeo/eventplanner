import React, { useEffect } from "react";
import EventManagementCard from "./features/eventManagement/ui/EventManagementCard";
import EventBoard from "./features/eventManagement/ui/EventBoard";

const App = () => {
	return (
		<div>
			<EventBoard />
			<EventManagementCard />
		</div>
	);
};

export default App;
