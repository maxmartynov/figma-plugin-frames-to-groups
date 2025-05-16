export enum YesNo {
  'yes' = 'yes',
  'no' = 'no',
}

export enum ChildlessFrameActions {
  // - if has styles or children - turn into rectangle
  // - else - remove
  'auto' = 'auto',

  'remove' = 'remove',
  'turnIntoRectangle' = 'turnIntoRectangle',
}

export enum RootFrameActions {
  'leaveFrame' = 'leaveFrame',
  'turnIntoGroup' = 'turnIntoGroup',
}

export interface SettingsMap {
  createRectangleForFrame: YesNo
  childlessFrames: ChildlessFrameActions
  rootFrame: RootFrameActions
  convertInnerFrames: YesNo
}

export const settingsMapDefaults: SettingsMap = {
  createRectangleForFrame: YesNo.yes,
  childlessFrames: ChildlessFrameActions.auto,
  rootFrame: RootFrameActions.leaveFrame,
  convertInnerFrames: YesNo.yes,
}
