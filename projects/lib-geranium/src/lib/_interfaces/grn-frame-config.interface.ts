import { InputExterior } from './input-exterior.interface';
import { FrameSize } from './frame-size.interface';
import { OrnamAlign } from './ornam-align.interface';

export interface GrnFrameConfig {
  exterior?: InputExterior;
  frameSize?: FrameSize;
  frameSizeValue?: number;
  isLabelShrink?: boolean;
  hiddenLabel?: boolean;
  labelPd?: number; // px
  ornamLfAlign?: OrnamAlign;
  ornamRgAlign?: OrnamAlign;
}
