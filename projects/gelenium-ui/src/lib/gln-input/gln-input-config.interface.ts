import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';

export interface GlnInputConfig extends GlnFrameConfig {
  //   interface GlnFrameConfig
  // exterior?: string | undefined; // GlnFrameExteriorType
  // frameSize?: string | undefined; // GlnFrameSizeType
  // isLabelShrink?: boolean | undefined;
  // isNoAnimation?: boolean | undefined;
  // isRequired?: boolean | undefined;

  isError?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  ornamLfAlign?: string | undefined; // GlnFrameOrnamAlignType
  ornamRgAlign?: string | undefined; // GlnFrameOrnamAlignType
  isPlaceholder?: boolean | undefined;
}
