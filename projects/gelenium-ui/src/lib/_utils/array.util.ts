export class ArrayUtil {
  /** Which elements of array "A" are included in array "B". */
  public static include<T>(arrayA: T[], arrayB: T[], isUnique: boolean = true): T[] {
    const result: T[] = [];
    for (let idx = 0; idx < arrayA.length; idx++) {
      const valueA = arrayA[idx];
      if (arrayB.indexOf(valueA) > -1) {
        result.push(valueA);
      }
    }
    return isUnique && result.length > 0 ? [...new Set<T>(result)] : result;
  }
  /** Which elements of array "A" are not included in array "B". */
  public static uninclude<T>(arrayA: T[], arrayB: T[], isUnique: boolean = true): T[] {
    const result: T[] = [];
    for (let idx = 0; idx < arrayA.length; idx++) {
      const valueA = arrayA[idx];
      if (arrayB.indexOf(valueA) === -1) {
        result.push(valueA);
      }
    }
    return isUnique && result.length > 0 ? [...new Set<T>(result)] : result;
  }
  public static delete<T>(arrayA: T[], arrayB: T[]): T[] {
    const result: T[] = [];
    for (let idx = 0; idx < arrayA.length; idx++) {
      if (arrayB.indexOf(arrayA[idx]) === -1) {
        result.push(arrayA[idx]);
      }
    }
    return result;
  }
}
