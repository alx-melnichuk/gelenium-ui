import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';

export interface GlnInputConfig extends GlnFrameConfig {
  //   interface GlnFrameConfig
  // exterior?: string | undefined; // 'outlined' | 'underline' | 'standard'
  // isLabelShrink?: boolean | undefined;
  // isNoAnimation?: boolean | undefined;
  // isRequired?: boolean | undefined;
  // size?: number | string | undefined; // 'short','small','middle','wide','large','huge'

  isError?: boolean | undefined;
  isPlaceholder?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  ornamLfAlign?: string | undefined; // 'default','center','flex-start','flex-end','baseline','stretch'
  ornamRgAlign?: string | undefined; // 'default','center','flex-start','flex-end','baseline','stretch'
}
