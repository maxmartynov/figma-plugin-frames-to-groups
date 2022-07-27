import {
  PluginEvent,
  PluginEventAbout,
  PluginEventSettings,
} from './types/PluginEvent'
import {SettingsMap, settingsMapDefaults} from './types/SettingsMap'

const currentPage: PageNode = figma.currentPage
const selectedItems: ReadonlyArray<SceneNode> = currentPage.selection
const root: DocumentNode = figma.root

main()

function main(): void {
  switch (figma.command as PluginEvent['type']) {
    case 'convertFramesToGroups': {
      return convertFramesToGroups()
    }
    case 'view:settings': {
      return openWindow('view:settings')
    }
    case 'view:about': {
      return openWindow('view:about')
    }
    default: {
      figma.closePlugin('ERROR: Unknown command')
    }
  }
}

function openWindow(
  eventType: PluginEventSettings['type'] | PluginEventAbout['type']
): void {
  switch (eventType) {
    case 'view:settings': {
      figma.showUI(__html__, {
        width: 295,
        height: 285,
      })
      figma.ui.postMessage(
        {
          type: eventType,
          settings: getPluginSettingsMap(),
        } as PluginEvent,
        {origin: '*'}
      )
      break
    }
    case 'view:about': {
      figma.showUI(__html__, {
        width: 282,
        height: 380,
      })
      figma.ui.postMessage({type: eventType} as PluginEvent, {origin: '*'})
      break
    }
  }

  figma.ui.onmessage = (event: PluginEvent) => {
    if (event.type === 'message' && event.text) {
      figma.notify(event.text || '')
      return
    } else if (event.type === 'cancel') {
      figma.closePlugin()
      return
    } else if (event.type === 'save:settings') {
      patchPluginSettingsMap(event.settings)
      return
    }

    figma.closePlugin()
  }
}

function getPluginSettingsMap(): SettingsMap {
  const get = <T extends keyof SettingsMap>(key: T) =>
    root.getPluginData(key) as SettingsMap[T]
  return Object.assign<SettingsMap, SettingsMap>(settingsMapDefaults, {
    createRectangleForFrame: get('createRectangleForFrame'),
    emptyFrames: get('emptyFrames'),
  })
}

function patchPluginSettingsMap(settings: SettingsMap): void {
  const newSettings = Object.assign(settingsMapDefaults, settings)
  for (const key in Object.keys(settingsMapDefaults)) {
    root.setPluginData(key, String(newSettings[key]))
  }
}

function convertFramesToGroups(): void {
  const groups: GroupNode[] = createGroupsFromFrames(
    selectedItems.length ? selectedItems : currentPage.children
  )

  figma.closePlugin(
    groups.length
      ? `${groups.length} Frames converted`
      : 'There are no Frames to convert'
  )
}

function createGroupFromFrame(frameNode: FrameNode): GroupNode | null {
  if (!frameNode || !frameNode.parent) return null
  if (!Array.isArray(frameNode.children) || !frameNode.children.length)
    return null

  const parent: any = frameNode.parent
  if (parent.type === 'INSTANCE') return null

  const group: GroupNode = figma.group(frameNode.children, parent)
  if (frameNode.name) group.name = frameNode.name

  return group
}

function createGroupsFromFrames(
  items: ReadonlyArray<SceneNode> | PageNode[]
): GroupNode[] {
  const groups: GroupNode[] = []
  if (!items.length) return groups

  for (const node of items) {
    if (typeof (node as any).findAll !== 'function') continue

    const _frames: FrameNode[] = (node as any).findAll(
      (n: BaseNode) => n.type === 'FRAME'
    )

    for (const frame of _frames) {
      const group = createGroupFromFrame(frame)
      if (group) {
        groups.push(group)
        if (!frame.children.length) frame.remove()
      }
    }
  }

  return groups
}
