export const JointEvent = {
	CELL_POINTERUP: "cell:pointerup",
	BLANK_POINTERDOWN: "blank:pointerdown",
	BLANK_POINTERUP: "blank:pointerup",
	ELEMENT_POINTERDOWN: "element:pointerdown",
	LINK_POINTERDOWN: "link:pointerdown",
	LINK_CONNECT: "link:connect",
} as const;

export const CustomEvent = {
	LINK_REMOVE: "link:remove",
	LINK_REMOVE_VERTICES: "link:removeVertices",
	LINK_OPEN: "link:open",
	LINK_UPDATED: "link:updated",
	ELEMENT_UPDATED: "element:updated",
	ELEMENT_REMOVE: "element:remove",
	ELEMENT_OPEN: "element:open",
} as const;
