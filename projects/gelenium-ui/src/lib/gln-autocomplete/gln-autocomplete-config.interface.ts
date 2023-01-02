export interface GlnAutocompleteConfig {
  isMaxWd?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  position?: string | undefined; // Horizontal position = 'start'-default | 'center' | 'end';
  panelClass?: string | string[] | Set<string> | { [key: string]: unknown } | undefined;
  visibleSize?: number | undefined; // default 0
}
