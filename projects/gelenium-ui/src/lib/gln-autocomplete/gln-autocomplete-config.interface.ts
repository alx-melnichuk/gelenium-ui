export interface GlnAutocompleteConfig {
  isClearOnEscape?: boolean | undefined;
  isMaxWd?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  isNoCloseOnSelect?: boolean | undefined;
  isOpenOnFocus?: boolean | undefined;
  position?: string | undefined; // Horizontal position = 'start'-default | 'center' | 'end';
  panelClass?: string | string[] | Set<string> | { [key: string]: unknown } | undefined;
  visibleSize?: number | undefined; // default 0
}
