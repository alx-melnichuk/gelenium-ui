import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';

export interface GlnTextareaConfig extends GlnFrameConfig {
  //   interface GlnFrameConfig
  // exterior?: string | undefined; // GlnFrameExteriorType
  // isLabelShrink?: boolean | undefined;
  // isNoAnimation?: boolean | undefined;
  // isRequired?: boolean | undefined;
  // size?: number | string | undefined; // 'short','small','middle','wide','large','huge'

  isError?: boolean | undefined;
  isPlaceholder?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  ornamLfAlign?: string | undefined; // GlnFrameOrnamAlignType
  ornamRgAlign?: string | undefined; // GlnFrameOrnamAlignType
}
