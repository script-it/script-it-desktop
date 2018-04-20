import { ElementTypes } from './screenplay-format-utils';

export default function FormatToFountain(type, text) {
  switch (type) {
    case ElementTypes.action:
    case ElementTypes.dialog:
      return text;
    case ElementTypes.heading:
      return `.${text.toUpperCase()}`;
    case ElementTypes.character:
      return `${text.toUpperCase()}`;
      // and the other cases
    default:
      return text;
  }

  // If I do ElementTypes.diaglog I get undefined...
  // It would be better if it threw an error.
};
