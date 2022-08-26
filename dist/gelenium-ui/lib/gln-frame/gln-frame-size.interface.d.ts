export declare type GlnFrameSizeType = 'short' | 'small' | 'middle' | 'wide' | 'large' | 'huge';
export declare enum GlnFrameSize {
    short = "short",
    small = "small",
    middle = "middle",
    wide = "wide",
    large = "large",
    huge = "huge"
}
export declare enum GlnFrameSizeValue {
    short = 38,
    small = 44,
    middle = 50,
    wide = 56,
    large = 62,
    huge = 68
}
export declare class GlnFrameSizeUtil {
    static create(value: GlnFrameSize | null): GlnFrameSize;
    static convert(value: string | null): GlnFrameSize | null;
    static isShort(value: GlnFrameSize | null): boolean;
    static isSmall(value: GlnFrameSize | null): boolean;
    static isMiddle(value: GlnFrameSize | null): boolean;
    static isWide(value: GlnFrameSize | null): boolean;
    static isLarge(value: GlnFrameSize | null): boolean;
    static isHuge(value: GlnFrameSize | null): boolean;
    static getValue(frameSize: GlnFrameSize | null): number | null;
}
