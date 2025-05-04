import { html, render } from "lit-html";
import { EventBus } from "../event-bus";
import { State } from "../state";
import type { SbpmElementShape, SbpmItemId, SbpmItemType } from "../types";
import { isContainerItem } from "../utils";

// type AllKeys<T> = T extends unknown ? keyof T : never;

type SelectOption<
	TLabel extends string = string,
	TValue extends string = string,
> = {
	label: TLabel;
	value?: TValue;
};

interface InputOptions<TValue = string> {
	id: SbpmItemId;
	value: TValue;
	onChange: (value: TValue) => void;
}

interface SelectOptions extends InputOptions<string | SbpmElementShape> {
	values: () => Array<SelectOption>;
}

interface UpdatableProperties {
	id?: (options: InputOptions) => void;
	type?: (options: InputOptions) => void;
	label?: (options: InputOptions) => void;
	role?: (value: Omit<SelectOptions, "values">) => void;
	message?: (value: Omit<SelectOptions, "values">) => void;
	subject?: (value: Omit<SelectOptions, "values">) => void;
}

type UpdatablePropertiesByType = {
	[key in SbpmItemType]: UpdatableProperties;
};

function createInputTemplate({
	label,
	disabled = false,
}: { label: string; disabled?: boolean }) {
	return (options: InputOptions) => {
		const onChange = (event: Event) => {
			if (event.target instanceof HTMLInputElement) {
				options.onChange(event.target.value);
			}
		};

		return html`
<label class="sbpm-properties-label">
	<span>${label}</span>
	<input id="id-input" value="${options.value}" ?disabled=${disabled} @input=${onChange}/>
</label>
`;
	};
}

function createSelectTemplate(label: string) {
	return (options: SelectOptions) => {
		const values = options.values();
		const onChange = (event: Event) => {
			if (event.target instanceof HTMLSelectElement) {
				const value = event.target.value;
				options.onChange(
					typeof options.value === "string"
						? value
						: {
								id: value,
								label: values.find((item) => item.value === value)?.label ?? "",
							},
				);
			}
		};
		const selectedId =
			typeof options.value === "string" ? options.value : options.value?.id;

		return html`
<label class="sbpm-properties-label">
	<span>${label}</span>
	<select name="item" id="item" @change=${onChange}>
		<option disabled ?selected=${!selectedId}>Select on option</option>
		${values.map((item) => html`<option value=${item.value ?? ""} ?selected=${item.value === selectedId}>${item.label}</option>`)}
	</select>
</label>
`;
	};
}

const idTemplate = createInputTemplate({ label: "Id:", disabled: true });
const typeTemplate = createInputTemplate({ label: "Type:", disabled: true });
const labelTemplate = createInputTemplate({
	label: "Label:",
});
const subjectTemplate = createSelectTemplate("Subject:");
const messageTemplate = createSelectTemplate("Message:");

const defaultUpdatableProperties: UpdatableProperties = {
	id: idTemplate,
	type: typeTemplate,
	label: labelTemplate,
};

const updatablePropertiesByType: UpdatablePropertiesByType = {
	"sbpm.FunctionState": defaultUpdatableProperties,
	"sbpm.MultiProcessModel": defaultUpdatableProperties,
	"sbpm.ProcessModel": defaultUpdatableProperties,
	"sbpm.ProcessNetwork": defaultUpdatableProperties,
	"sbpm.MessageSpecification": defaultUpdatableProperties,
	"sbpm.ReceiveState": defaultUpdatableProperties,
	"sbpm.SendState": defaultUpdatableProperties,
	"sbpm.StandardSubject": defaultUpdatableProperties,
	"sbpm.FunctionStateTransition": defaultUpdatableProperties,
	"sbpm.MessageExchange": defaultUpdatableProperties,
	"sbpm.ProcessNetworkTransition": defaultUpdatableProperties,
	"sbpm.ReceiveStateTransition": {
		id: defaultUpdatableProperties.id,
		type: defaultUpdatableProperties.type,
		subject: (options) =>
			subjectTemplate({
				...options,
				values: () => {
					const itemId = options.id;
					if (!itemId) {
						throw new Error("The item id is undefined.");
					}
					const parentId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(itemId))?.id;
					if (!parentId) {
						throw new Error("The parent item id is undefined.");
					}
					// const outgoingTransitions = State.getItems()
					// 	.filter((item) => item.type === "sbpm.MessageExchange")
					// 	.filter(
					// 		(item) =>
					// 			item.source.id === parentId && item.role === "bidirectional",
					// 	);
					const incomingTransitions = State.getItems()
						.filter((item) => item.type === "sbpm.MessageExchange")
						.filter((item) => item.toElement === parentId);

					const subjects = [
						// ...outgoingTransitions.map((transition) =>
						// 	State.getItem(transition.target.id),
						// ),
						...incomingTransitions.map((transition) =>
							State.getItem(transition.fromElement),
						),
					];
					const values: Array<SelectOption> = subjects.map((subject) => ({
						label: subject.label,
						value: subject.id,
					}));
					return values;
				},
			}),
		message: (options) =>
			messageTemplate({
				...options,
				values: () => {
					const itemId = options.id;
					if (!itemId) {
						throw new Error("The item id is undefined.");
					}
					const parentId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(itemId))?.id;
					if (!parentId) {
						throw new Error("The parent item id is undefined.");
					}
					const transitions = State.getItems()
						.filter((item) => item.type === "sbpm.MessageExchange")
						.filter(
							(item) => item.toElement === parentId,
							// (item.source.id === parentId && item.role === "bidirectional"),
						);
					const ids = transitions.flatMap((transition) => transition.contains);

					const messages = State.getItems()
						.filter((item) => item.type === "sbpm.MessageSpecification")
						.filter((item) => ids.includes(item.id));
					const values: Array<SelectOption> = messages.map((message) => {
						return {
							label: message.label,
							value: message.id as string,
						};
					});

					return values;
				},
			}),
	},
	"sbpm.SendStateTransition": {
		id: defaultUpdatableProperties.id,
		type: defaultUpdatableProperties.type,
		subject: (options) =>
			subjectTemplate({
				...options,
				values: () => {
					const itemId = options.id;
					if (!itemId) {
						throw new Error("The item id is undefined.");
					}
					const parentId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(itemId))?.id;
					if (!parentId) {
						throw new Error("The parent item id is undefined.");
					}
					const outgoingTransitions = State.getItems()
						.filter((item) => item.type === "sbpm.MessageExchange")
						.filter((item) => item.fromElement === parentId);
					// const incomingTransitions = State.getItems()
					// 	.filter((item) => item.type === "sbpm.MessageExchange")
					// 	.filter(
					// 		(item) =>
					// 			item.target.id === parentId && item.role === "bidirectional",
					// 	);
					const subjects = [
						...outgoingTransitions.map((transition) =>
							State.getItem(transition.toElement),
						),
						// ...incomingTransitions.map((transition) =>
						// 	State.getItem(transition.source.id),
						// ),
					];
					const values: Array<SelectOption> = subjects.map((subject) => ({
						label: subject.label,
						value: subject.id,
					}));
					return values;
				},
			}),
		message: (options) =>
			messageTemplate({
				...options,
				values: () => {
					const itemId = options.id;
					if (!itemId) {
						throw new Error("The item id is undefined.");
					}
					const parentId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(itemId))?.id;
					if (!parentId) {
						throw new Error("The parent item id is undefined.");
					}
					const transitions = State.getItems()
						.filter((item) => item.type === "sbpm.MessageExchange")
						.filter(
							(item) => item.fromElement === parentId,
							// (item.target.id === parentId && item.role === "bidirectional"),
						);
					const ids = transitions.flatMap((transition) => transition.contains);

					const messages = State.getItems()
						.filter((item) => item.type === "sbpm.MessageSpecification")
						.filter((item) => ids.includes(item.id));
					const values: Array<SelectOption> = messages.map((message) => {
						return {
							label: message.label,
							value: message.id as string,
						};
					});

					return values;
				},
			}),
	},
	"sbpm.Process": defaultUpdatableProperties,
	"sbpm.StandardBehavior": defaultUpdatableProperties,
	"sbpm.StandardLayer": defaultUpdatableProperties,
};

class SbpmProperties extends HTMLElement {
	#shadowRoot: ShadowRoot;
	#currentInputListener: ((event: Event) => void) | null = null;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		EventBus.on("item:selected", (data) => {
			this.#removeInputListener();
			this.#hide();
			this.#render(data.id);
		});

		EventBus.on("item:deselected", () => {
			this.#hide();
		});
	}

	disconnectedCallback() {
		this.#removeInputListener();
	}

	#hide() {
		this.#removeInputListener();
		render(undefined, this.#shadowRoot);
	}

	#removeInputListener = () => {
		const inputEl =
			this.#shadowRoot.querySelector<HTMLInputElement>("#label-input");
		if (inputEl && this.#currentInputListener) {
			inputEl.removeEventListener("input", this.#currentInputListener);
			this.#currentInputListener = null;
		}
	};

	#baseLayout(
		...components: Array<ReturnType<typeof html>>
	): ReturnType<typeof html> {
		return html`
			<style>
				.sbpm-properties-wrapper {
					display: flex;
					justify-content: flex-end;
					padding: 10px;
				}
				.sbpm-properties {
					border: 1px solid #ececec;
					background-color: #f6f6f6;
					width: fit-content;
					display: flex;
					padding: 10px;
					height: fit-content;
					flex-direction: column;
					gap: 10px;
					pointer-events: all;
				}
				.sbpm-properties-label {
					display: flex;
					flex-direction: column;
					gap: 5px;
				}
			</style>
			<div class="sbpm-properties-wrapper">
				<div class="sbpm-properties">
					${components}
				</div>
			</div>`;
	}

	#render(id: SbpmItemId) {
		const item = State.getItem(id);
		const type = item.type;
		const onChange = (key: string) => (value: unknown) => {
			State.updateItem(id, {
				[key]: value,
			});
			EventBus.trigger("item:updated", {
				id,
			});
		};
		const updatableProperties = updatablePropertiesByType[type];
		const templates: Array<ReturnType<typeof html>> = [];
		// console.log(updatableProperties);
		for (const [key, template] of Object.entries(updatableProperties)) {
			const value = item[key as keyof typeof item];
			// if (isString(value)) {
			// 	templates.push(template({ value, onChange: onChange(key), id }));
			// }
			// if (isElementShell(value)) {
			// 	templates.push(
			// 		template({ value: value.id as string, onChange: onChange(key), id }),
			// 	);
			// }
			// console.log(value);

			templates.push(template({ value, onChange: onChange(key), id }));
		}
		render(this.#baseLayout(...templates), this.#shadowRoot);
	}
}

customElements.define("sbpm-properties", SbpmProperties);
