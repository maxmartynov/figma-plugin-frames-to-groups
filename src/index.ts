import {
  PluginEvent,
  PluginEventAbout,
  PluginEventSettings,
} from './types/PluginEvent'
import {
  RootFrameActions,
  SettingsMap,
  settingsMapDefaults,
  YesNo,
} from './types/SettingsMap'

const currentPage: PageNode = figma.currentPage
const selectedItems: ReadonlyArray<SceneNode> = currentPage.selection
const root: DocumentNode = figma.root

main()

function main(): void {
  switch (figma.command as PluginEvent['type']) {
    case 'convertFramesToGroups': {
      return convertFramesToGroups()
    }
    case 'convertRootFrameToGroup': {
      return convertRootFrameToGroup()
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
        width: 320,
        height: 460,
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
  const get = <T extends keyof SettingsMap>(key: T) => {
    const val = root.getPluginData(key) as SettingsMap[T]
    if (String(val) === 'undefined') return undefined
    return val || undefined
  }
  return {
    createRectangleForFrame:
      get('createRectangleForFrame') ||
      settingsMapDefaults.createRectangleForFrame,
    // TODO: not in use
    emptyFrames: get('emptyFrames') || settingsMapDefaults.emptyFrames,
    rootFrame: get('rootFrame') || settingsMapDefaults.rootFrame,
    convertInnerFrames:
      get('convertInnerFrames') || settingsMapDefaults.convertInnerFrames,
  }
}

function patchPluginSettingsMap(settings: SettingsMap): void {
  const newSettings = Object.assign(settingsMapDefaults, settings)
  for (const key of Object.keys(settingsMapDefaults)) {
    let val = String(newSettings[key])
    if (val === 'undefined') val = ''
    root.setPluginData(key, val)
  }
}

function convertFramesToGroups(): void {
  const settings = getPluginSettingsMap()
  const groups: GroupNode[] = createGroupsFromFrames(
    selectedItems.length ? selectedItems : currentPage.children,
    settings
  )

  figma.closePlugin(
    groups.length
      ? `${groups.length} Frame(s) converted`
      : 'There are no Frames to convert'
  )
}

function convertRootFrameToGroup(): void {
  const settings = getPluginSettingsMap()
  const groups: GroupNode[] = createGroupsFromFrames(
    selectedItems.length ? selectedItems : currentPage.children,
    {
      ...settings,
      rootFrame: RootFrameActions.turnIntoGroup,
      convertInnerFrames: YesNo.no,
    }
  )

  figma.closePlugin(
    groups.length
      ? `${groups.length} Frame(s) converted`
      : 'There are no Frames to convert'
  )
}

function createGroupFromFrame(
  frameNode: FrameNode,
  settings: SettingsMap
): GroupNode | null {
  if (!frameNode || !frameNode.parent) return null
  if (!Array.isArray(frameNode.children) || !frameNode.children.length)
    return null

  const parent: any = frameNode.parent
  if (parent.type === 'INSTANCE') return null

  const group: GroupNode = figma.group(frameNode.children, parent)
  if (frameNode.name) group.name = frameNode.name

  // Create a background rectangle if enabled in settings
  if (settings.createRectangleForFrame === YesNo.yes) {
    let hasStyles = false
    const rect = figma.createRectangle()

    // Copy corner radius from frame to rectangle
    if (
      typeof frameNode.cornerRadius === 'number' &&
      frameNode.cornerRadius > 0
    ) {
      hasStyles = true
      rect.cornerRadius = frameNode.cornerRadius
    } else if (
      frameNode.topLeftRadius ||
      frameNode.topRightRadius ||
      frameNode.bottomLeftRadius ||
      frameNode.bottomRightRadius
    ) {
      // Apply individual corner radii if they exist
      hasStyles = true
      rect.topLeftRadius = frameNode.topLeftRadius || 0
      rect.topRightRadius = frameNode.topRightRadius || 0
      rect.bottomLeftRadius = frameNode.bottomLeftRadius || 0
      rect.bottomRightRadius = frameNode.bottomRightRadius || 0
    }

    // Copy background color from frame to rectangle
    if (
      frameNode.fills &&
      Array.isArray(frameNode.fills) &&
      frameNode.fills.length > 0
    ) {
      hasStyles = true
      rect.fills = JSON.parse(JSON.stringify(frameNode.fills))
    }

    // Copy stroke/border properties if they exist
    if (
      frameNode.strokes &&
      Array.isArray(frameNode.strokes) &&
      frameNode.strokes.length > 0
    ) {
      hasStyles = true
      rect.strokes = JSON.parse(JSON.stringify(frameNode.strokes))
      rect.strokeWeight = frameNode.strokeWeight
      rect.strokeAlign = frameNode.strokeAlign
      rect.strokeCap = frameNode.strokeCap
      rect.strokeJoin = frameNode.strokeJoin
      rect.dashPattern = frameNode.dashPattern
    }

    // Add the rectangle as the first child in the group (background)
    if (hasStyles) {
      rect.name = frameNode.name
        ? `${frameNode.name} Background`
        : 'Frame Background'
      rect.resize(frameNode.width, frameNode.height)
      rect.x = frameNode.x
      rect.y = frameNode.y
      group.insertChild(0, rect)
    } else {
      rect.remove()
    }
  }

  return group
}

function createGroupsFromFrames(
  items: ReadonlyArray<SceneNode> | PageNode[],
  settings: SettingsMap
): GroupNode[] {
  const groups: GroupNode[] = []
  if (!items.length) return groups

  for (const node of items) {
    if (typeof (node as any).findAll !== 'function') continue

    if (settings.convertInnerFrames === YesNo.yes) {
      const _frames: FrameNode[] = (node as any).findAll(
        (n: BaseNode) => n.type === 'FRAME'
      )

      for (const frame of _frames) {
        const group = createGroupFromFrame(frame, settings)
        if (group) {
          groups.push(group)
          if (!frame.children.length) frame.remove()
        }
      }
    }

    if (
      node.type === 'FRAME' &&
      settings.rootFrame === RootFrameActions.turnIntoGroup
    ) {
      const group = createGroupFromFrame(node, settings)
      if (group) {
        groups.push(group)
        if (!node.children.length) node.remove()
      }
    }
  }

  return groups
}
