export interface GlnAutocompleteConfig {
  // Clear the input field when pressing 'Escape'.
  isClearOnEscape?: boolean | undefined;
  isMaxWd?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  isNoCloseOnSelect?: boolean | undefined;
  // The options panel will not open/close on mouse click.
  isNoOpenOnMouse?: boolean | undefined;
  // Disables the ripple effect.
  isNoRipple?: boolean | undefined;
  // The options panel opens after receiving input focus.
  isOpenOnFocus?: boolean | undefined;
  position?: string | undefined; // Horizontal position = 'start'-default | 'center' | 'end';
  panelClass?: string | string[] | Set<string> | { [key: string]: unknown } | undefined;
  visibleSize?: number | undefined; // default 0
}
