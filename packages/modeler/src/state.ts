import type {
	SbpmProcessNetworkOptions,
	SbpmProcessModelOptions,
	SbpmItemId,
} from "@sbpmjs/canvas";
import { dispatchItemUpdatedEvent } from "./custom-events";

export type ItemKey = SbpmItemId;

export type ItemValue = SbpmProcessNetworkOptions | SbpmProcessModelOptions;

interface State {
	items: Map<ItemKey, ItemValue>;
	getItem(id: ItemKey): ItemValue;
	setItem(id: ItemKey, value: ItemValue): void;
	updateItem(id: ItemKey, value: Partial<Omit<ItemValue, "type">>): ItemValue;
}

const items: Map<ItemKey, ItemValue> = new Map();

const state: State = {
	items: new Proxy(items, {
		get(target, property) {
			let ret = Reflect.get(target, property);
			if (property === "get" && typeof ret === "function") {
				ret = ret.bind(target);
				ret = new Proxy(ret, {
					apply(target, _thisArg, argumentsList) {
						return target(...argumentsList);
					},
				});
			} else if (typeof ret === "function") {
				ret = ret.bind(target);
			}

			return ret;
		},
	}),
	getItem(id: ItemKey): ItemValue {
		const item = this.items.get(id);
		if (!item) {
			throw new Error(`Could not get item for id: ${id}`);
		}
		return item;
	},
	setItem(id, value) {
		this.items.set(id, value);
		window.dispatchEvent(new CustomEvent("element-added", { detail: id }));
	},
	updateItem(id, value) {
		const existingItem = this.getItem(id);

		const newItem: typeof existingItem = {
			...existingItem,
			...value,
		};
		this.setItem(id, newItem);
		dispatchItemUpdatedEvent(newItem);
		return newItem;
	},
};

export function getState(): State {
	return state;
}
