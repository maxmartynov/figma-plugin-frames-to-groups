import {SettingsMap} from './SettingsMap'

export interface PluginEventConvertFramesToGroups {
  type: 'convertFramesToGroups'
}

export interface PluginEventSettings {
  type: 'view:settings'
  settings: SettingsMap
}

export interface PluginEventSaveSettings {
  type: 'save:settings'
  settings: SettingsMap
}

export interface PluginEventAbout {
  type: 'view:about'
}

export interface PluginEventCancel {
  type: 'cancel'
}

export interface PluginEventMessage {
  type: 'message'
  text: string
}

export type PluginEvent =
  | PluginEventConvertFramesToGroups
  | PluginEventSettings
  | PluginEventSaveSettings
  | PluginEventAbout
  | PluginEventCancel
  | PluginEventMessage
