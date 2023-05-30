import { getAllEvent } from "../services/eventServices";
import {
	getDiscretiseEvent,
	isOverlaping,
} from "../../../utils/processingFunction";

export async function allEventPresenter() {
	const eventItemListFormat = [];
	const eventListGroupeByOverlaping = [];
	const eventList = await getAllEvent();

	eventList?.forEach((eventItem) => {
		let eventItemDiscret = [];
		eventItemDiscret = getDiscretiseEvent(
			eventItem.startTime,
			eventItem.duration
		);

		eventItemListFormat.push({
			entity: eventItem,
			discretEvent: [...eventItemDiscret],
		});
	});

	for (let i = 0; i < eventItemListFormat.length; i++) {
		const groupOverlapingItem = []; // contiendra l'ensemble des event qui se chevauchent
		groupOverlapingItem.push(eventItemListFormat[i]); // on ajoute l'element selection du groupe de chevauchement

		for (let j = i + 1; j < eventItemListFormat.length; j++) {
			if (
				isOverlaping(
					eventItemListFormat[i].discretEvent,
					eventItemListFormat[j].discretEvent
				)
			) {
				groupOverlapingItem.push(eventItemListFormat[j]); // on ajoute l'element  qui se chevauche avec l'element selectionné
				eventItemListFormat.splice(j, 1); // on retire l'element  qui se chevauche avec l'element selectionné du tableau
			}
		}

		eventItemListFormat.splice(i, 1); // on retire l'element selection du groupe de chevauchement
		i -= 1; // on repositionne le compteur sur le premier element

		for (let k = 1; k < groupOverlapingItem.length; k++) {
			for (let l = 0; l < eventItemListFormat.length; l++) {
				if (
					isOverlaping(
						groupOverlapingItem[k].discretEvent,
						eventItemListFormat[l].discretEvent
					)
				) {
					groupOverlapingItem.push(eventItemListFormat[l]);
					eventItemListFormat.splice(l, 1);
				}
			}
		}

		eventListGroupeByOverlaping.push(groupOverlapingItem);
	}

	return eventListGroupeByOverlaping;
}
