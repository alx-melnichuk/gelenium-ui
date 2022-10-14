export class RouterConfig {
  private static routerMap: Map<string, string> = new Map();

  public static get(name: string): string {
    const result = RouterConfig.routerMap.get(name);
    if (!result) {
      throw new Error(`There is no value for the "${name}" parameter.`);
    }
    return result;
  }
  public static add(name: string, value: string | null): string | null {
    if (name) {
      if (value) {
        RouterConfig.routerMap.set(name, value);
      } else {
        RouterConfig.routerMap.delete(name);
      }
    }
    return value || null;
  }
  public static remove(name: string): void {
    if (name && RouterConfig.routerMap.has(name)) {
      RouterConfig.routerMap.delete(name);
    }
  }
  public static find(value: string): string | undefined {
    let result: string | undefined = undefined;
    const keys = RouterConfig.routerMap.keys();
    for (const key of keys) {
      const item = RouterConfig.routerMap.get(key);
      if (item && value.startsWith(item)) {
        result = item;
        break;
      }
    }
    return result;
  }
}
