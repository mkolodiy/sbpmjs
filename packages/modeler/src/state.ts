import type { SbpmItemId, SbpmItemOptions } from "./types";

class StateImpl {
	#items: Map<SbpmItemId, SbpmItemOptions>;

	constructor() {
		this.#items = new Map();
	}

	public exists(id: SbpmItemId): boolean {
		return State.#items.has(id);
	}

	public getItems(): Array<SbpmItemOptions> {
		return Array.from(this.#items.values());
	}

	public getItem(id: SbpmItemId): SbpmItemOptions {
		const item = this.#items.get(id);
		if (!item) {
			throw new Error(`Could not get item for id: ${id}`);
		}
		return item;
	}

	public setItem(id: SbpmItemId, value: SbpmItemOptions) {
		this.#items.set(id, value);
	}

	public updateItem(
		id: SbpmItemId,
		value: Partial<Omit<SbpmItemOptions, "id" | "type">>,
	) {
		const existingItem = this.getItem(id);

		const newItem: SbpmItemOptions = {
			...existingItem,
			...value,
		};
		this.setItem(id, newItem);
		return newItem;
	}

	public clear() {
		this.#items.clear();
	}
}

export const State = new StateImpl();
