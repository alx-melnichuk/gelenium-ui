export class HtmlPathUtil {
  public static getElementByPathClassOrTag(element: HTMLElement, pathToElement: string | null): HTMLElement | null {
    let result: HTMLElement | null = element;
    const list = (pathToElement || '').split('/');
    for (let idx = 0; idx < list.length && !!result; idx++) {
      let path = list[idx];
      if (!list[idx]) {
        continue;
      }
      let index = 0;
      const ind1 = path.indexOf('{');
      const ind2 = path.indexOf('}');
      if (ind1 > -1 && ind2 > -1 && ind1 < ind2) {
        const indStr = path.slice(ind1 + 1, ind2);
        index = Number(indStr);
        path = path.slice(0, ind1);
      }
      if (path[0] === '.') {
        result = result?.getElementsByClassName(path.slice(1, path.length))[index] as HTMLElement;
      } else {
        result = result?.getElementsByTagName(path)[index] as HTMLElement;
      }
    }
    return result || null;
  }
}
