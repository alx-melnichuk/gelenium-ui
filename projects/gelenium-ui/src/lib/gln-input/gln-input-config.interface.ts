import { GlnFrameOrnamAlign } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';
import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';

export interface GlnInputConfig extends GlnFrameConfig {
  // interface GlnFrameConfig
  // exterior?: string | undefined; // GlnFrameExterior
  // frameSize?: string | undefined; // GlnFrameSize
  // isLabelShrink?: boolean | undefined;
  // isNoAnimation?: boolean | undefined;
  // isNoLabel?: boolean | undefined;

  isError?: boolean | undefined; //++html
  isReadOnly?: boolean | undefined; //++html
  isRequired?: boolean | undefined; //++html
  ornamLfAlign?: GlnFrameOrnamAlign | undefined;
  ornamRgAlign?: GlnFrameOrnamAlign | undefined;
}
