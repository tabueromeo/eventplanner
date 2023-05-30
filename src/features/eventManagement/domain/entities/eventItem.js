/**
 * id sera un entier unique identiant un evenement,
 * starTime est un String l'heure de début
 * duration est un entier représentant la durée en minute
 */
export class eventItem {
	constructor(id, startTime, duration) {
		this.id = id;
		this.startTime = startTime;
		this.duration = duration;
	}
}
