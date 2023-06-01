import React, { useCallback } from "react";
const { useState, useRef, useLayoutEffect, useEffect } = React;
import { getAllEventFromController } from "../controllers/eventController";
import {
	convertFromEventEntityToPixelEntity,
	fromComplexeEventDataToArray,
	addPixelEventValue,
} from "../../../utils/processingFunction";

const EventBoard = () => {
	const eventBoardRef = useRef();
	const didMountRef = useRef(false);

	const [screenHeight, setHeight] = useState(300);
	const [screenWidth, setWidth] = useState(800);
	const [eventDatasList, setEventDatasList] = useState([]);
	const [eventDatasBrut, setEventDatasBrut] = useState([]);

	const getSize = () => {
		const element = eventBoardRef.current;
		const width = element.clientWidth;
		const height = element.clientHeight;
		setHeight(height);
		setWidth(width);
		getAllEvent();
	};

	useLayoutEffect(() => {
		window.addEventListener("resize", getSize);

		didMountRef.current = true;
		return () => window.removeEventListener("resize", getSize);
	}, [screenWidth, screenHeight]);

	useEffect(() => {
		initBoard();
	}, [didMountRef.current]);

	const initBoard = async () => {
		getData();
		getSize();
	};

	const getData = async () => {
		const eventDatas = await getAllEventFromController();
		setEventDatasBrut(eventDatas);
	};

	const getAllEvent = async () => {
		const eventDatasConverted = await addPixelEventValue(
			eventDatasBrut,
			screenWidth,
			screenHeight
		);
		const eventDataListArray =
			fromComplexeEventDataToArray(eventDatasConverted);
		setEventDatasList(eventDataListArray);
	};

	return (
		<div>
			<h3>Event borad management</h3>

			<div
				ref={eventBoardRef}
				style={{ height: "650px", border: "1px solid #ccc" }}
			>
				{eventDatasList.map((eventData, index) => (
					<div
						style={{
							background: "gray",
							position: "absolute",
							color: "white",
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
