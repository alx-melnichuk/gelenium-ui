export interface GlnFrameConfig {
  exterior?: string | undefined; // GlnFrameExteriorType
  frameSize?: string | undefined; // GlnFrameSizeType
  isLabelShrink?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  isNoLabel?: boolean | undefined; // deprecate
  isRequired?: boolean | undefined;
  size?: string | undefined; // GlnFrameSizeType
}
