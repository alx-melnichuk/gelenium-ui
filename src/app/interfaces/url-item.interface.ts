export interface UrlItem {
  label: string;
  url: string;
  fragment: string;
}

export class UrlItemUtil {
  public static create(label: string, url: string, fragment: string): UrlItem {
    return { label, url, fragment } as UrlItem;
  }
}
