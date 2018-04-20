export const ElementTypes = {
  action: 'action',
  character: 'character',
  dialog: 'dialog',
  heading: 'heading',
  parenthetical: 'parenthetical',
  transition: 'transition',
};

const TabSequence = {
  [ElementTypes.heading]: ElementTypes.action,
  [ElementTypes.action]: ElementTypes.character,
  [ElementTypes.character]: ElementTypes.dialog,
  [ElementTypes.dialog]: ElementTypes.parenthetical,
  [ElementTypes.parenthetical]: ElementTypes.transition,
  [ElementTypes.transition]: ElementTypes.heading
};

const ReturnSequence = {
  [ElementTypes.heading]: ElementTypes.action,
  [ElementTypes.action]: ElementTypes.action,
  [ElementTypes.character]: ElementTypes.dialog,
  [ElementTypes.dialog]: ElementTypes.character,
  [ElementTypes.parenthetical]: ElementTypes.dialog,
  [ElementTypes.transition]: ElementTypes.heading
};

export const NextInTabSequence = (type) => {
  return TabSequence[type];
};

export const NextInReturnSequence = (type) => {
  return ReturnSequence[type];
};

