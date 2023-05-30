import { eventItem } from "../domain/entities/eventItem";

export async function getAllEvent() {
	const listEvent = [];
	listEvent.push(new eventItem(1254, "10:12", 60));
	listEvent.push(new eventItem(1252, "09:10", 45));
	listEvent.push(new eventItem(1253, "14:12", 25));
	listEvent.push(new eventItem(1255, "20:12", 50));
	listEvent.push(new eventItem(1256, "18:12", 30));
	listEvent.push(new eventItem(1257, "09:30", 90));

	const myInit = { method: "GET" };
	const data = await fetch(process.env.URL_GET_ALL);
	/*
	if (data) {
		data.forEach((eventData) => {
			listEvent.push(
				new eventItem(eventData.id, eventData.start, eventData.duration)
			);
		});
	}*/

	console.log(data);

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
