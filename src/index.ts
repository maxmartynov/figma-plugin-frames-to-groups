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
  const frames: FrameNode[] = selectedItems.length
    ? getFramesFromSelection()
    : getFramesFromPage()

  frames.forEach(item => createGroupFromFrame(item))
  frames.forEach(item => item.remove())

  figma.closePlugin()
}

function createGroupFromFrame (frameNode: FrameNode): GroupNode {
  const group: GroupNode = figma.group(frameNode.children, frameNode.parent)
  group.name = frameNode.name
  return group
}

function getFramesFromSelection (): FrameNode[] {
  const frames: FrameNode[] = []
  if (!selectedItems.length) return frames

  for (const node of selectedItems) {
    const _frames: FrameNode[] = (node as any)
      .findAll((n: BaseNode) => n.type === 'FRAME')
    if (_frames.length) frames.push(..._frames)
  }

  return frames
}

function getFramesFromPage (): FrameNode[] {
  const frames: BaseNode[] = currentPage
    .findAll((n: BaseNode) => n.type === 'FRAME')

  return frames as FrameNode[]
}
