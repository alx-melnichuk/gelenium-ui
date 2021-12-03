export interface UrlItem {
  label: string;
  url: string;
}

export class UrlItemUtil {
  public static create(label: string, url: string): UrlItem {
    return { label, url } as UrlItem;
  }
}
