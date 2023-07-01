import { SimpleChange } from '@angular/core';

export class SimpleChangeUtil {
  /** Check for the presence of the property in both the current and previous versions of the value. */
  public static check(simpleChange: SimpleChange | undefined, property: string): boolean {
    return !!simpleChange?.previousValue?.[property] || !!simpleChange?.currentValue?.[property];
  }
}
