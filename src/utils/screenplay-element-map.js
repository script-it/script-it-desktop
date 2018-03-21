const ScreenplayElementTypes = {
  action: 'action',
  character: 'character',
  dialog: 'dialog',
  heading: 'heading',
  parenthetical: 'parenthetical',
  transition: 'transition',
};

const nextScreenplayElementOrder = {
  'action': 'heading',
  'heading': 'action'
};

const NextScreenplayElement = (type) => {
  return nextScreenplayElementOrder[type];
};

export {
  ScreenplayElementTypes,
  NextScreenplayElement,
};
