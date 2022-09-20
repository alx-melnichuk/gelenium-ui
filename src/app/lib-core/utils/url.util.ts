export class UrlUtil {
  private static objMap: { [key: string]: string } = {};
  public static get(name: string): string {
    const result = name ? UrlUtil.objMap[name] : '';
    if (name && !result) {
      throw new Error(`There is no value for the "${name}" parameter.`);
    }
    return result;
  }
  public static add(name: string, value: string | null): void {
    if (name) {
      if (value) {
        UrlUtil.objMap[name] = value;
        console.log(`UrlUtil.add(${name}, ${value})`); // #
      } else {
        UrlUtil.remove(name);
      }
    }
  }
  public static remove(name: string): void {
    if (name && Object.keys(UrlUtil.objMap).includes(name)) {
      delete UrlUtil.objMap[name];
    }
  }
}
