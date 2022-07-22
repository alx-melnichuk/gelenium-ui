export interface GlnSelectionChange<T> {
  /** Added options to the selected list. */
  added: T[];
  /** Removed options from the selected list. */
  removed: T[];
}
