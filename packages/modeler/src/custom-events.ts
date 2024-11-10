import type { ItemKey, ItemValue } from "./state";

interface ElementSelectedDetail {
	id: ItemKey;
}

export class ElementSelectedEvent extends CustomEvent<ElementSelectedDetail> {
	constructor(detail: ElementSelectedDetail) {
		super("element-selected", { detail });
	}
}

type ItemUpdatedEventDetail = ItemValue;
const ItemUpdatedEventType = "item-updated-event";

class ItemUpdatedEvent extends CustomEvent<ItemUpdatedEventDetail> {
	constructor(detail: ItemUpdatedEventDetail) {
		super(ItemUpdatedEventType, { detail });
	}
}

export function dispatchItemUpdatedEvent(detail: ItemUpdatedEventDetail) {
	window.dispatchEvent(new ItemUpdatedEvent(detail));
}

export function listenForItemUpdatedEvent(
	cb: (event: ItemUpdatedEvent) => void,
) {
	window.addEventListener(ItemUpdatedEventType, (event) => {
		if (event instanceof ItemUpdatedEvent) {
			cb(event);
		}
	});
}
