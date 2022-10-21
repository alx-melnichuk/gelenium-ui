export interface GlnAutocompleteConfig {
  panelClass?: string | string[] | Set<string> | { [key: string]: any } | undefined;
  position?: string | undefined; // Position the panel to the right.
  visibleSize?: number | undefined; // default 0
}
