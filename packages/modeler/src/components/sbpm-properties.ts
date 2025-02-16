import {
	type SbpmFunctionStateOptions,
	type SbpmFunctionStateTransitionOptions,
	SbpmFunctionStateTransitionType,
	SbpmFunctionStateType,
	type SbpmMessageOptions,
	type SbpmMessageTransitionOptions,
	SbpmMessageTransitionType,
	SbpmMessageType,
	type SbpmProcessModelOptions,
	SbpmProcessModelType,
	type SbpmProcessNetworkOptions,
	SbpmProcessNetworkType,
	type SbpmReceiveStateOptions,
	type SbpmReceiveStateTransitionOptions,
	SbpmReceiveStateTransitionType,
	SbpmReceiveStateType,
	type SbpmSendStateOptions,
	type SbpmSendStateTransitionOptions,
	SbpmSendStateTransitionType,
	SbpmSendStateType,
	type SbpmSubjectOptions,
	SbpmSubjectType,
} from "@sbpmjs/canvas";
import { html, render } from "lit-html";
import { EventBus } from "../event-bus";
import { State } from "../state";
import type {
	SbpmElementShape,
	SbpmItemId,
	SbpmItemOptions,
	SbpmItemType,
} from "../types";
import { isContainerItem, isElementShell, isString } from "../utils";

type AllKeys<T> = T extends unknown ? keyof T : never;

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
const roleTemplate = createSelectTemplate("Role:");
const subjectTemplate = createSelectTemplate("Subject:");
const messageTemplate = createSelectTemplate("Message:");

const defaultUpdatableProperties: UpdatableProperties = {
	id: idTemplate,
	type: typeTemplate,
	label: labelTemplate,
};

const updatablePropertiesByType: UpdatablePropertiesByType = {
	"sbpm.sbd.SbpmFunctionState": defaultUpdatableProperties,
	"sbpm.pnd.SbpmProcessModel": {
		...defaultUpdatableProperties,
		role: (options) =>
			roleTemplate({
				...options,
				values: () => {
					const values: Array<
						SelectOption<
							Required<SbpmProcessModelOptions>["role"],
							Required<SbpmProcessModelOptions>["role"]
						>
					> = [
						{ label: "single", value: "single" },
						{
							label: "multi",
							value: "multi",
						},
					];
					return values;
				},
			}),
	},
	"sbpm.pnd.SbpmProcessNetwork": defaultUpdatableProperties,
	"sbpm.pnd.SbpmMessage": defaultUpdatableProperties,
	"sbpm.sbd.SbpmReceiveState": defaultUpdatableProperties,
	"sbpm.sbd.SbpmSendState": defaultUpdatableProperties,
	"sbpm.sid.SbpmSubject": defaultUpdatableProperties,
	"sbpm.sbd.SbpmFunctionStateTransition": defaultUpdatableProperties,
	"sbpm.sid.SbpmMessageTransition": {
		...defaultUpdatableProperties,
		role: (options) =>
			roleTemplate({
				...options,
				values: () => {
					const values: Array<
						SelectOption<Required<SbpmMessageTransitionOptions>["role"]>
					> = [
						{ label: "bidirectional", value: "bidirectional" },
						{
							label: "unidirectional",
							value: "unidirectional",
						},
					];
					return values;
				},
			}),
	},
	"sbpm.pnd.SbpmProcessTransition": defaultUpdatableProperties,
	"sbpm.sbd.SbpmReceiveStateTransition": {
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
						.filter((item) => item.type === "sbpm.sid.SbpmMessageTransition")
						.filter(
							(item) =>
								item.source.id === parentId && item.role === "bidirectional",
						);
					const incomingTransitions = State.getItems()
						.filter((item) => item.type === "sbpm.sid.SbpmMessageTransition")
						.filter((item) => item.target.id === parentId);

					const subjects = [
						...outgoingTransitions.map((transition) =>
							State.getItem(transition.target.id),
						),
						...incomingTransitions.map((transition) =>
							State.getItem(transition.source.id),
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
						.filter((item) => item.type === "sbpm.sid.SbpmMessageTransition")
						.filter(
							(item) =>
								item.target.id === parentId ||
								(item.source.id === parentId && item.role === "bidirectional"),
						);
					const ids = transitions.flatMap((transition) => transition.contains);

					const messages = State.getItems()
						.filter((item) => item.type === "sbpm.pnd.SbpmMessage")
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
	"sbpm.sbd.SbpmSendStateTransition": {
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
						.filter((item) => item.type === "sbpm.sid.SbpmMessageTransition")
						.filter((item) => item.source.id === parentId);
					const incomingTransitions = State.getItems()
						.filter((item) => item.type === "sbpm.sid.SbpmMessageTransition")
						.filter(
							(item) =>
								item.target.id === parentId && item.role === "bidirectional",
						);
					const subjects = [
						...outgoingTransitions.map((transition) =>
							State.getItem(transition.target.id),
						),
						...incomingTransitions.map((transition) =>
							State.getItem(transition.source.id),
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
						.filter((item) => item.type === "sbpm.sid.SbpmMessageTransition")
						.filter(
							(item) =>
								item.source.id === parentId ||
								(item.target.id === parentId && item.role === "bidirectional"),
						);
					const ids = transitions.flatMap((transition) => transition.contains);

					const messages = State.getItems()
						.filter((item) => item.type === "sbpm.pnd.SbpmMessage")
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
	"sbpm.pnd.SbpmProcess": defaultUpdatableProperties,
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
