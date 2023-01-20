export interface GlnFrameConfig {
  exterior?: string | undefined; // GlnFrameExteriorType
  isLabelShrink?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  isNoLabel?: boolean | undefined; // deprecate
  isRequired?: boolean | undefined;
  size?: number | string | undefined; // GlnFrameSizeType
}
