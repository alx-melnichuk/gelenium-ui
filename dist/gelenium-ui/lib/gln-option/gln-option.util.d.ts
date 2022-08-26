import { GlnOptionComponent } from './gln-option.component';
export declare class GlnOptionUtil {
    static setSelected(options: GlnOptionComponent[], isSelected: boolean): number;
    static findByValue(options: GlnOptionComponent[], value: unknown | null): GlnOptionComponent | null;
    /** Get a list of values for all selected options. */
    static getValues(options: GlnOptionComponent[]): unknown[];
    /** Get a list of options according to an array of values. */
    static getOptionsByValues(newValue: unknown | unknown[] | null, options: GlnOptionComponent[]): GlnOptionComponent[];
}
