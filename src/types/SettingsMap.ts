export enum YesNo {
  'yes' = 'yes',
  'no' = 'no',
}

// TODO: not in use
// TODO: Use this code to copy a frame's props
// https://www.youtube.com/watch?v=hB4P00BWf3E
export enum EmptyFramesActions {
  'remove' = 'remove',
  'turnIntoRectangle' = 'turnIntoRectangle',
}

export enum RootFrameActions {
  'leaveFrame' = 'leaveFrame',
  'turnIntoGroup' = 'turnIntoGroup',
}

export interface SettingsMap {
  createRectangleForFrame: YesNo
  emptyFrames: EmptyFramesActions
  rootFrame: RootFrameActions
}

export const settingsMapDefaults: SettingsMap = {
  createRectangleForFrame: YesNo.no,
  emptyFrames: EmptyFramesActions.remove,
  rootFrame: RootFrameActions.leaveFrame,
}
