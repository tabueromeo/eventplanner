import { allEventPresenter } from "../presenters/eventPresenter";
export async function getAllEventFromController() {
	return await allEventPresenter();
}
