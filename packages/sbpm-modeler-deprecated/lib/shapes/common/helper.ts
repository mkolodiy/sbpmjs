export const getDescriptionProperty = (description: string) =>
  description ? { 'attrs/text/textWrap/text': description } : {};
