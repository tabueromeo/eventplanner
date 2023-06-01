import { eventItem } from "../domain/entities/eventItem";
import eventDatasMock from "./../../../input.json";

export async function getAllEvent() {
	const listEvent = [];

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
