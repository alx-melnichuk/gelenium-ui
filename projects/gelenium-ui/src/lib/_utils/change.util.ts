import { SimpleChange } from '@angular/core';

export class ChangeUtil {
  /** Check for the presence of the property in both the current and previous versions of the value. */
  public static check(simpleChange: SimpleChange | undefined, property: string): boolean {
    return !!property && (simpleChange?.previousValue?.[property] !== undefined || simpleChange?.currentValue?.[property] !== undefined);
  }
}
