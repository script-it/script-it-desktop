import {
  KeyBindingUtil,
  getDefaultKeyBinding,
} from 'draft-js';

const { hasCommandModifier } = KeyBindingUtil;

const keyBindingFn = (event) => {
  if (hasCommandModifier(event) && event.shiftKey && event.keyCode === 83) {
    return 'save-file-as';
  }
  if (hasCommandModifier(event) && event.keyCode === 83) {
    return 'save-file';
  }
  return getDefaultKeyBinding(event);
};

export default keyBindingFn;
