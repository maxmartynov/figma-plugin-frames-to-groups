const currentPage: PageNode = figma.currentPage
const selectedItems: ReadonlyArray<SceneNode> = currentPage.selection

main()

function main (): void {
  switch (figma.command as string) {
    case 'convertFramesToGroups': {
      return convertFramesToGroups()
    }
  }

  figma.closePlugin('ERROR: Unknown command')
}

function convertFramesToGroups (): void {
  const groups: GroupNode[] = createGroupsFromFrames(selectedItems.length
    ? selectedItems
    : currentPage.children
  )

  figma.closePlugin(groups.length
    ? `${groups.length} Frames converted`
    : 'There are no Frames to convert'
  )
}

function createGroupFromFrame (frameNode: FrameNode): GroupNode|null {
  if (!frameNode || !frameNode.parent) return null
  if (!Array.isArray(frameNode.children) || !frameNode.children.length) return null

  const parent: any = frameNode.parent
  if (parent.type === 'INSTANCE') return null

  const group: GroupNode = figma.group(frameNode.children, parent)
  if (frameNode.name) group.name = frameNode.name

  return group
}

function createGroupsFromFrames (items: ReadonlyArray<SceneNode>|PageNode[]): GroupNode[] {
  const groups: GroupNode[] = []
  if (!items.length) return groups

  for (const node of items) {
    if (typeof (node as any).findAll !== 'function') continue

    const _frames: FrameNode[] = (node as any)
      .findAll((n: BaseNode) => n.type === 'FRAME')

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
