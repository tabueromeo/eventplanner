import React from "react";
const { useState, useRef, useLayoutEffect, useEffect } = React;
import { getAllEventFromController } from "../controllers/eventController";
import {
	convertFromEventEntityToPixelEntity,
	fromComplexeEventDataToArray,
	addPixelEventValue,
} from "../../../utils/processingFunction";

const EventBoard = () => {
	const eventBoardRef = useRef();
	const [screenHeight, setHeight] = useState(300);
	const [screenWidth, setWidth] = useState(800);
	const [eventDatasList, setEventDatasList] = useState([]);

	const getSize = () => {
		const element = eventBoardRef.current;
		const width = element.offsetWidth;
		const height = element.offsetHeight;
		setHeight(height);
		setWidth(width);
		getAllEvent();
	};

	useLayoutEffect(() => {
		getSize();
		window.addEventListener("resize", getSize);

		return () => window.removeEventListener("resize", getSize);
	}, [screenWidth, screenHeight]);

	useEffect(() => {}, []);

	const getAllEvent = async () => {
		const eventDatas = await getAllEventFromController();
		const eventDatasConverted = await addPixelEventValue(
			eventDatas,
			screenWidth,
			screenHeight
		);
		const eventDataListArray =
			fromComplexeEventDataToArray(eventDatasConverted);
		setEventDatasList(eventDataListArray);
		console.log(eventDatasConverted);
	};

	return (
		<div>
			<h3>React Js Get Element Height and Width</h3>

			<div
				ref={eventBoardRef}
				style={{ height: "500px", border: "1px solid #ccc" }}
			>
				{eventDatasList.map((eventData, index) => (
					<div
						style={{
							background: "green",
							position: "absolute",
							width: eventData.eventPixel.eventWidthPixel,
							height: eventData.eventPixel.durationPixel,
							left: `${
								eventBoardRef.current.offsetLeft +
								eventData.eventPixel.leftPixel
							}px`,
							top: `${
								eventBoardRef.current.offsetTop + eventData.eventPixel.topPixel
							}px`,
						}}
						key={index}
					>
						{eventData.entity.id}
					</div>
				))}
			</div>
		</div>
	);
};

export default EventBoard;
