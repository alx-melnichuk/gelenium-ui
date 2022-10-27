export interface GlnAutocompleteTrigger {
  // Set focus to the current element.
  setFocus(): void;
  getOriginRect(): DOMRect | null;
  setValueForInput(value: string): void;
}
