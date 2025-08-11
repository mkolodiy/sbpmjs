import { html, render } from "lit-html";
import { EventBus } from "../event-bus";
import { State } from "../state";
import type { SbpmItemId, SbpmItemType } from "../types";
import { isContainerItem } from "../utils";
import type { SbpmItemReferenceOptions } from "@sbpmjs/canvas";

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

interface SelectOptions
	extends InputOptions<string | SbpmItemReferenceOptions> {
	values: () => Array<SelectOption>;
}

interface UpdatableProperties {
	id?: (options: InputOptions) => void;
	type?: (options: InputOptions) => void;
	label?: (options: InputOptions) => void;
	role?: (value: Omit<SelectOptions, "values">) => void;
	message?: (value: Omit<SelectOptions, "values">) => void;
	receiverSubject?: (value: Omit<SelectOptions, "values">) => void;
	senderSubject?: (value: Omit<SelectOptions, "values">) => void;
	references?: (options: InputOptions) => void;
	startState?: (options: InputOptions) => void;
	endState?: (options: InputOptions) => void;
}

type UpdatablePropertiesByType = {
	[key in SbpmItemType]: UpdatableProperties;
};

function createInputTemplate({
	label,
	disabled = false,
}: { label: string; disabled?: boolean }) {
	return (options: InputOptions) => {
		console.log("createInputTemplate", options);
		const id = `${options.id}-${label.replace(":", "").toLowerCase()}`;

		const onChange = (event: Event) => {
			if (event.target instanceof HTMLInputElement) {
				options.onChange(event.target.value);
			}
		};

		return html`
<label class="sbpm-properties-label">
	<span>${label}</span>
	<input id=${id} value=${options.value} ?disabled=${disabled} @input=${onChange}/>
</label>
`;
	};
}

function createSelectTemplate({
	label,
	isValueAnObject = false,
}: { label: string; isValueAnObject?: boolean }) {
	return (options: SelectOptions) => {
		const values = options.values();
		const onChange = (event: Event) => {
			if (event.target instanceof HTMLSelectElement) {
				const value = event.target.value;
				console.log("onChange", value);

				options.onChange(
					isValueAnObject
						? {
								id: value,
								label: values.find((item) => item.value === value)?.label ?? "",
							}
						: value,
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
const subjectTemplate = createSelectTemplate({
	label: "Subject:",
	isValueAnObject: true,
});
const messageTemplate = createSelectTemplate({
	label: "Message:",
	isValueAnObject: true,
});
const referencesTemplate = createInputTemplate({
	label: "References:",
});
const roleTemplate = createSelectTemplate({
	label: "Role:",
});
const startStateTemplate = createInputTemplate({
	label: "Start state:",
	disabled: true,
});
const endStateTemplate = createInputTemplate({
	label: "End state:",
	disabled: true,
});

const defaultUpdatableProperties: UpdatableProperties = {
	id: idTemplate,
	type: typeTemplate,
	label: labelTemplate,
};

const updatablePropertiesByType: UpdatablePropertiesByType = {
	"sbpm.FunctionState": {
		...defaultUpdatableProperties,
		role: (options) =>
			roleTemplate({
				...options,
				values: () => [
					{ label: "None", value: undefined },
					{ label: "Start", value: "start" },
					{ label: "End", value: "end" },
				],
			}),
	},
	"sbpm.MultiProcessModel": defaultUpdatableProperties,
	"sbpm.ProcessModel": defaultUpdatableProperties,
	"sbpm.ProcessNetwork": defaultUpdatableProperties,
	"sbpm.MessageSpecification": defaultUpdatableProperties,
	"sbpm.ReceiveState": {
		...defaultUpdatableProperties,
		role: (options) =>
			roleTemplate({
				...options,
				values: () => [
					{ label: "None", value: undefined },
					{ label: "Start", value: "start" },
					{ label: "End", value: "end" },
				],
			}),
	},
	"sbpm.SendState": {
		...defaultUpdatableProperties,
		role: (options) =>
			roleTemplate({
				...options,
				values: () => [
					{ label: "None", value: undefined },
					{ label: "Start", value: "start" },
					{ label: "End", value: "end" },
				],
			}),
	},
	"sbpm.StandardSubject": defaultUpdatableProperties,
	"sbpm.FunctionStateTransition": defaultUpdatableProperties,
	"sbpm.MessageExchange": defaultUpdatableProperties,
	"sbpm.ProcessNetworkTransition": defaultUpdatableProperties,
	"sbpm.ReceiveStateTransition": {
		id: defaultUpdatableProperties.id,
		type: defaultUpdatableProperties.type,
		senderSubject: (options) =>
			subjectTemplate({
				...options,
				values: () => {
					const itemId = options.id;
					if (!itemId) {
						throw new Error("The item id is undefined.");
					}
					const standardBehaviorId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(itemId))?.id;
					if (!standardBehaviorId) {
						throw new Error("The parent item id is undefined.");
					}
					const standardSubjectId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(standardBehaviorId))?.id;
					if (!standardSubjectId) {
						throw new Error("The parent item id is undefined.");
					}

					const incomingTransitions = State.getItems()
						.filter((item) => item.type === "sbpm.MessageExchange")
						.filter((item) => item.toElement === standardSubjectId);
					console.log("incomingTransitions", incomingTransitions);
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
					const standardBehaviorId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(itemId))?.id;
					if (!standardBehaviorId) {
						throw new Error("The parent item id is undefined.");
					}
					const standardSubjectId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(standardBehaviorId))?.id;
					if (!standardSubjectId) {
						throw new Error("The parent item id is undefined.");
					}
					const transitions = State.getItems()
						.filter((item) => item.type === "sbpm.MessageExchange")
						.filter(
							(item) => item.toElement === standardSubjectId,
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
		receiverSubject: (options) =>
			subjectTemplate({
				...options,
				values: () => {
					const itemId = options.id;
					if (!itemId) {
						throw new Error("The item id is undefined.");
					}
					const standardBehaviorId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(itemId))?.id;
					if (!standardBehaviorId) {
						throw new Error("The parent item id is undefined.");
					}
					const standardSubjectId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(standardBehaviorId))?.id;
					if (!standardSubjectId) {
						throw new Error("The parent item id is undefined.");
					}
					const outgoingTransitions = State.getItems()
						.filter((item) => item.type === "sbpm.MessageExchange")
						.filter((item) => item.fromElement === standardSubjectId);
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
					const standardBehaviorId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(itemId))?.id;
					if (!standardBehaviorId) {
						throw new Error("The parent item id is undefined.");
					}
					const standardSubjectId = State.getItems()
						.filter(isContainerItem)
						.find((item) => item.contains.includes(standardBehaviorId))?.id;
					if (!standardSubjectId) {
						throw new Error("The parent item id is undefined.");
					}
					const transitions = State.getItems()
						.filter((item) => item.type === "sbpm.MessageExchange")
						.filter(
							(item) => item.fromElement === standardSubjectId,
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
	"sbpm.StandardBehavior": {
		...defaultUpdatableProperties,
		startState: (options) => startStateTemplate(options),
		endState: (options) => endStateTemplate(options),
	},
	"sbpm.StandardLayer": defaultUpdatableProperties,
	"sbpm.InterfaceSubject": {
		...defaultUpdatableProperties,
		references: referencesTemplate,
	},
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
					/* min-width: 300px; */
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
		console.log("Rendering properties for item:", item);

		const type = item.type;
		const onChange = (key: string) => (value: unknown) => {
			State.updateItem(id, {
				[key]: value === "" ? undefined : value,
			});
			EventBus.trigger("item:updated", {
				id,
			});
		};
		const updatableProperties = updatablePropertiesByType[type];
		const templates: Array<ReturnType<typeof html>> = [];
		for (const [key, template] of Object.entries(updatableProperties)) {
			const value = item[key as keyof typeof item];
			templates.push(template({ value, onChange: onChange(key), id }));
		}
		render(this.#baseLayout(...templates), this.#shadowRoot);
	}
}

customElements.define("sbpm-properties", SbpmProperties);
