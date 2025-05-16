import {
  PluginEvent,
  PluginEventAbout,
  PluginEventSettings,
} from './types/PluginEvent'
import {
  ChildlessFrameActions,
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
        width: 320,
        height: 330,
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
    } else if (event.type === 'view:about') {
      openWindow('view:about')
      return
    } else if (event.type === 'view:settings') {
      openWindow('view:settings')
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
    childlessFrames:
      get('childlessFrames') || settingsMapDefaults.childlessFrames,
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
      : 'There are no Frames to convert or they are empty'
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

  const isEmpty =
    !Array.isArray(frameNode.children) || !frameNode.children.length

  if (isEmpty && settings.childlessFrames === ChildlessFrameActions.remove) {
    return null
  }

  const parent: any = frameNode.parent
  if (parent.type === 'INSTANCE') return null

  let group: GroupNode | null = null

  // Create a background rectangle if enabled in settings
  if (settings.createRectangleForFrame === YesNo.yes) {
    let hasStyles = false
    const bgRect = figma.createRectangle()

    // Copy corner radius from frame to rectangle
    if (
      typeof frameNode.cornerRadius === 'number' &&
      frameNode.cornerRadius > 0
    ) {
      hasStyles = true
      bgRect.cornerRadius = frameNode.cornerRadius
    } else if (
      frameNode.topLeftRadius ||
      frameNode.topRightRadius ||
      frameNode.bottomLeftRadius ||
      frameNode.bottomRightRadius
    ) {
      // Apply individual corner radii if they exist
      hasStyles = true
      bgRect.topLeftRadius = frameNode.topLeftRadius || 0
      bgRect.topRightRadius = frameNode.topRightRadius || 0
      bgRect.bottomLeftRadius = frameNode.bottomLeftRadius || 0
      bgRect.bottomRightRadius = frameNode.bottomRightRadius || 0
    }

    if (frameNode.cornerSmoothing) {
      hasStyles = true
      bgRect.cornerSmoothing = frameNode.cornerSmoothing
    }

    // Copy background color from frame to rectangle
    if (
      frameNode.fills &&
      Array.isArray(frameNode.fills) &&
      frameNode.fills.length > 0
    ) {
      hasStyles = true
      bgRect.fills = JSON.parse(JSON.stringify(frameNode.fills))
    }

    if (frameNode.fillStyleId) {
      hasStyles = true
      bgRect.setFillStyleIdAsync(String(frameNode.fillStyleId))
    }

    // Copy stroke/border properties if they exist
    if (
      frameNode.strokes &&
      Array.isArray(frameNode.strokes) &&
      frameNode.strokes.length > 0
    ) {
      hasStyles = true
      bgRect.strokes = JSON.parse(JSON.stringify(frameNode.strokes))
      bgRect.strokeWeight = frameNode.strokeWeight
      bgRect.strokeAlign = frameNode.strokeAlign
      bgRect.strokeCap = frameNode.strokeCap
      bgRect.strokeJoin = frameNode.strokeJoin
      bgRect.strokeMiterLimit = frameNode.strokeMiterLimit
      bgRect.dashPattern = frameNode.dashPattern
    }

    if (frameNode.strokeStyleId) {
      hasStyles = true
      bgRect.setStrokeStyleIdAsync(frameNode.strokeStyleId)
    }

    // Copy effects if they exist
    if (
      frameNode.effects &&
      Array.isArray(frameNode.effects) &&
      frameNode.effects.length > 0
    ) {
      hasStyles = true
      bgRect.effects = JSON.parse(JSON.stringify(frameNode.effects))
    }

    if (frameNode.effectStyleId) {
      hasStyles = true
      bgRect.setEffectStyleIdAsync(frameNode.effectStyleId)
    }

    // Add the rectangle as the first child in the group (background)
    if (hasStyles) {
      bgRect.name = frameNode.name
        ? `${frameNode.name} Background`
        : 'Frame Background'
      bgRect.resize(frameNode.width, frameNode.height)
      bgRect.x = frameNode.x
      bgRect.y = frameNode.y
      bgRect.rotation = frameNode.rotation

      // Copy layout properties
      bgRect.layoutAlign = frameNode.layoutAlign
      bgRect.layoutGrow = frameNode.layoutGrow

      // Copy visibility properties
      bgRect.visible = frameNode.visible
      bgRect.locked = frameNode.locked
      bgRect.opacity = frameNode.opacity
      bgRect.blendMode = frameNode.blendMode
      bgRect.isMask = frameNode.isMask

      const frameChildren = frameNode.children

      if (frameChildren.length) {
        group = figma.group(frameNode.children, parent)
        group.insertChild(0, bgRect)
      } else {
        bgRect.x = 0
        bgRect.y = 0
        bgRect.rotation = 0
        frameNode.insertChild(0, bgRect)
        group = figma.group(frameNode.children, parent)
      }

      if (frameNode.name) group.name = frameNode.name
    } else {
      bgRect.remove()
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
        if (group) groups.push(group)
        frame.remove()
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
