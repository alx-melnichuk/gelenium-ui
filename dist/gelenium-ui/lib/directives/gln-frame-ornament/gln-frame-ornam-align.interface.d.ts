export declare type GlnFrameOrnamAlignType = 'default' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
export declare enum GlnFrameOrnamAlign {
    default = "default",
    center = "center",
    flexStart = "flex-start",
    flexEnd = "flex-end",
    baseline = "baseline",
    stretch = "stretch"
}
export declare class GlnFrameOrnamAlignUtil {
    static create(value: GlnFrameOrnamAlign | null, defaultValue: GlnFrameOrnamAlign | null): GlnFrameOrnamAlign;
    static convert(value: string | null, defaultValue?: GlnFrameOrnamAlign | null): GlnFrameOrnamAlign | null;
}
