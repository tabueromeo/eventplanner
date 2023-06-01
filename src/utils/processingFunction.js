/**
 *
 * @param {*} event1 :array
 * @param {*} event2 :array
 * @returns boolean
 */

export function isOverlaping(event1, event2) {
	if (event1?.length > 0 && event2?.length > 0) {
		const overlaping = event1.filter((x) => event2.includes(x));
		if (overlaping.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	return false;
}
/**
 *
 * @param {*} starTime :String
 * @param {*} duration :number
 * @returns :array
 */
export function getDiscretiseEvent(starTime, duration) {
	let DiscretEvent = [];

	const start =
		parseInt(starTime.split(":")[0]) * 60 + parseInt(starTime.split(":")[1]);

	const stop = start + parseInt(duration);
	DiscretEvent = Array.from(
		{ length: stop - start + 1 },
		(value, index) => start + index
	);
	return DiscretEvent;
}

/**
 *
 * @param {*} duration :number
 * @param {*} topDistance :number // temps de début en minute
 * @param {*} screenHeight :number
 * @returns :Object
 */
export function convertFromEventEntityToPixelEntity(
	duration,
	topDistance,
	screenHeight
) {
	let durationPixel = convertDistanceMinuteToPixel(duration, screenHeight);

	let topPixel = convertDistanceMinuteToPixel(
		topDistance - parseInt(process.env.TOP_PAGE_MINUTE),
		screenHeight
	);

	const eventPixel = {
		durationPixel: Math.round(durationPixel),
		topPixel: Math.round(topPixel),
	};

	return eventPixel;
}

/**
 * Permet de convertir une distance en minute en une distance en pixel suivant la hauteur de l'écran
 * @param {*} distanceMinute
 * @param {*} screenHeight
 * @returns
 */
function convertDistanceMinuteToPixel(distanceMinute, screenHeight) {
	const distancePixel =
		(screenHeight * distanceMinute) / parseFloat(process.env.HEIGHT_PAGE);

	return distancePixel;
}

/**
 *
 * @param {*} eventDatas
 * @returns
 */
export function fromComplexeEventDataToArray(eventDatas) {
	const eventDataAray = [];
	for (let i = 0; i < eventDatas.length; i++) {
		for (let j = 0; j < eventDatas[i].length; j++) {
			const element = eventDatas[i][j];
			eventDataAray.push(element);
		}
	}

	return eventDataAray;
}

/**
 *
 * @param {*} eventDatas
 * @param {*} screenWidth
 * @param {*} screenHeight
 * @returns
 */

export const addPixelEventValue = async (
	eventDatas,
	screenWidth,
	screenHeight
) => {
	//const eventDatas = await getAllEventFromController();

	for (let i = 0; i < eventDatas.length; i++) {
		eventDatas[i].sort((a, b) => a.entity.duration - b.entity.duration);
		let eventGroupOverlapingTabLength = eventDatas[i].length;

		for (let j = 0; j < eventDatas[i].length; j++) {
			if (j > 0) {
				if (
					!isOverlaping(
						eventDatas[i][j].discretEvent,
						eventDatas[i][j - 1].discretEvent
					)
				) {
					eventGroupOverlapingTabLength -= 1;
				}
			}
		}
		let k = 0;
		let compOverlaping = 0; // permet de compter le nombre de non chevauchement dans un groupe
		for (let j = 0; j < eventDatas[i].length; j++) {
			const element = eventDatas[i][j];
			const marginPixel = 5;
			const eventPixel = convertFromEventEntityToPixelEntity(
				element.entity.duration,
				element.discretEvent[0],
				screenHeight
			);

			if (j > 0) {
				if (
					!isOverlaping(element.discretEvent, eventDatas[i][j - 1].discretEvent)
				) {
					k -= 1;
				}
			}

			// eventWidthPixel la longueur en pixel d'un évènement
			const eventWidthPixel =
				(screenWidth - eventGroupOverlapingTabLength * marginPixel) /
				eventGroupOverlapingTabLength;

			// leftPixel la distance d'un event par rapport au bord gauche du board
			const leftPixel =
				((screenWidth - eventGroupOverlapingTabLength) * (j + k)) /
				eventGroupOverlapingTabLength;

			eventPixel["leftPixel"] =
				Math.round(leftPixel) + marginPixel * (1 + j + k);
			eventPixel["eventWidthPixel"] = Math.round(eventWidthPixel);

			eventDatas[i][j]["eventPixel"] = eventPixel;
		}
	}

	return eventDatas;
};
