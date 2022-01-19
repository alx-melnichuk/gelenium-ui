export class UrlComponents {
  private static objMap: { [key: string]: string } = {};
  public static get(name: string): string {
    const result = name ? UrlComponents.objMap[name] : '';
    if (name && !result) {
      console.error(`There is no value for the "${name}" parameter.`);
    }
    return result;
  }
  public static add(name: string, value: string | undefined): void {
    if (name) {
      if (value) {
        UrlComponents.objMap[name] = value;
      } else {
        UrlComponents.remove(name);
      }
    }
  }
  public static remove(name: string): void {
    if (name && Object.keys(UrlComponents.objMap).includes(name)) {
      delete UrlComponents.objMap[name];
    }
  }
}
UrlComponents.add('URL_COMPONENTS', 'components');
