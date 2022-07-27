export enum YesNo {
  'yes' = 'yes',
  'no' = 'no',
}

export enum EmptyFramesActions {
  'remove' = 'remove',
  'turnIntoRectangle' = 'turnIntoRectangle',
}

export interface SettingsMap {
  createRectangleForFrame: YesNo
  emptyFrames: EmptyFramesActions
}

export const settingsMapDefaults: SettingsMap = {
  createRectangleForFrame: YesNo.no,
  emptyFrames: EmptyFramesActions.remove,
}
