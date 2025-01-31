import type { SbpmItemId } from "./types";

type EventType =
	| "item:selected"
	| "item:deselected"
	| "item:opened"
	| "item:updated";

type Data = {
	"item:selected": { id: SbpmItemId };
	"item:deselected": undefined;
	"item:opened": { id: SbpmItemId };
	"item:updated": { id: SbpmItemId };
};

type Listener = (event: Event) => void;

type Callback<TData> = (data: TData) => void;

class EventBusImpl<
	TType extends EventType = EventType,
	TData extends Data = Data,
> {
	#listeners: Map<EventType, Listener>;
	// biome-ignore lint/suspicious/noExplicitAny: Use `any` since we handle narrowing later
	#callbacks: Map<EventType, Set<Callback<any>>>;

	constructor() {
		this.#listeners = new Map();
		this.#callbacks = new Map();
	}

	public trigger<T extends TType>(type: T, data: TData[T]): void {
		window.dispatchEvent(new CustomEvent(type, { detail: data }));
	}

	public on<T extends TType>(type: T, cb: (data: TData[T]) => void): void {
		let listener = this.#listeners.get(type);
		let callbacks = this.#callbacks.get(type);

		if (callbacks) {
			callbacks.add(cb);
		} else {
			callbacks = new Set();
			callbacks.add(cb);
			this.#callbacks.set(type, callbacks);
		}

		if (listener) {
			return;
		}

		listener = (event: Event): void => {
			if (event instanceof CustomEvent) {
				for (const callback of callbacks) {
					callback(event.detail);
				}
			}
		};

		this.#listeners.set(type, listener);
		window.addEventListener(type, listener);
	}

	public off(): void {
		for (const [type, listener] of this.#listeners) {
			window.removeEventListener(type, listener);
		}
	}
}

export const EventBus = new EventBusImpl();
