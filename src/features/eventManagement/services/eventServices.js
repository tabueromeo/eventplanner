import { eventItem } from "../domain/entities/eventItem";
import { eventDatasMock } from "./../../../datasExample";

export async function getAllEvent() {
	const listEvent = [];
	/*listEvent.push(new eventItem(1254, "10:12", 60));
	listEvent.push(new eventItem(1252, "09:10", 45));
	listEvent.push(new eventItem(1253, "14:12", 25));
	listEvent.push(new eventItem(1255, "20:12", 50));
	listEvent.push(new eventItem(1256, "18:12", 30));
	listEvent.push(new eventItem(1257, "09:30", 90));

	const myInit = { method: "GET", mode: "no-cors" };
	try {
		const response = await fetch(process.env.URL_GET_ALL, myInit);
		console.log(JSON.stringify(response));
	} catch (error) {
		console.log(error);
	}
*/
	if (eventDatasMock) {
		eventDatasMock.forEach((eventData) => {
			listEvent.push(
				new eventItem(eventData.id, eventData.start, eventData.duration)
			);
		});
	}

	return listEvent;
}

export async function getEventById(id) {
	await fetch();
}

export async function createEvent(eventItem) {
	await fetch();
}

export async function deleteEvent(id) {
	await fetch();
}

export async function updateEvent(id) {
	await fetch();
}
