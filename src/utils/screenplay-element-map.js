const ScreenplayElementTypes = {
  action: 'action',
  character: 'character',
  dialog: 'dialog',
  heading: 'heading',
  parenthetical: 'parenthetical',
  transition: 'transition',
};

const nextScreenplayElementOrder = {
  'heading': 'action',
  'action': 'character',
  'character': 'dialog',
  'dialog': 'parenthetical',
  'parenthetical': 'transition',
  'transition': 'heading'
};

const NextScreenplayElement = (type) => {
  return nextScreenplayElementOrder[type];
};

export {
  ScreenplayElementTypes,
  NextScreenplayElement,
};
