export class Url {
  private static objMap: { [key: string]: string } = {};
  public static get(name: string): string {
    const result = name ? Url.objMap[name] : '';
    if (name && !result) {
      console.error(`There is no value for the "${name}" parameter.`);
    }
    return result;
  }
  public static add(name: string, value: string | undefined): void {
    if (name) {
      if (value) {
        Url.objMap[name] = value;
      } else {
        Url.remove(name);
      }
    }
  }
  public static remove(name: string): void {
    if (name && Object.keys(Url.objMap).includes(name)) {
      delete Url.objMap[name];
    }
  }
}
