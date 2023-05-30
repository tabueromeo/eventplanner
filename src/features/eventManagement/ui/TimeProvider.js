import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useEffect } from "react";

export function TimeProvider() {
	const [value, onChange] = useState("10:00");

	useEffect(() => {
		console.log(value);
	}, [value]);

	return (
		<div>
			<TimePicker onChange={onChange} value={value} />
		</div>
	);
}
