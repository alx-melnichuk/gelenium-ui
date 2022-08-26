export declare class ArrayUtil {
    /** Which elements of array "A" are included in array "B". */
    static include<T>(arrayA: T[], arrayB: T[], isUnique?: boolean): T[];
    /** Which elements of array "A" are not included in array "B". */
    static uninclude<T>(arrayA: T[], arrayB: T[], isUnique?: boolean): T[];
    static delete<T>(arrayA: T[], arrayB: T[]): T[];
}
