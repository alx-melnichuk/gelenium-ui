export class ParentScrollUtil {
  /** Get a list of parents on which the scroll is located (if there are none, then the document). */
  public static getParentListWithScroll(element: Element | null): Element[] {
    const result: Element[] = [];
    let node: Node | null = element?.parentNode || null;
    while (node != null) {
      if (node instanceof Element) {
        const overflowY: string = window.getComputedStyle(node).overflowY;
        if (overflowY !== 'visible' && overflowY !== 'hidden' && node.scrollHeight >= node.clientHeight) {
          result.push(node);
        }
      }
      node = node.parentNode;
    }
    if (result.length === 0) {
      result.push(document.getRootNode() as Element);
    }
    return result;
  }
}
