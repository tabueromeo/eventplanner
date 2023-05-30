import React, { useState } from "react";
import TimePicker from "react-time-picker";
const EventManagementCard = () => {
	const [value, onChange] = useState("10:00");
	return (
		<div>
			<h1>EventManagementCard</h1>
			<TimePicker onChange={onChange} value={value} />
		</div>
	);
};

export default EventManagementCard;
