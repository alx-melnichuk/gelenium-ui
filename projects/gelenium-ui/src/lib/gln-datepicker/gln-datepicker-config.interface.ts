import { GlnCalendarConfig } from '../gln-calendar/gln-calendar-config.interface';
import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';

export interface GlnDatepickerConfig extends GlnFrameConfig {
  //   interface GlnFrameConfig
  // exterior?: string | undefined; // 'outlined' | 'underline' | 'standard'
  // isLabelShrink?: boolean | undefined;
  // isNoAnimation?: boolean | undefined;
  // isRequired?: boolean | undefined;
  // size?: number | string | undefined; // 'short','small','middle','wide','large','huge'

  backdropClass?: string | undefined; // default 'cdk-overlay-transparent-backdrop'
  configCalendar?: GlnCalendarConfig | undefined;
  classes?: string | string[] | Set<string> | { [key: string]: unknown } | undefined;
  isError?: boolean | undefined;
  isMaxWd?: boolean | undefined;
  isNoIcon?: boolean | undefined;
  isNoRipple?: boolean | undefined;
  isPlaceholder?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  ornamLfAlign?: string | undefined; // 'default','center','flex-start','flex-end','baseline','stretch'
  ornamRgAlign?: string | undefined; // 'default','center','flex-start','flex-end','baseline','stretch'
  overlayClasses?: string | string[] | undefined;
  position?: string | undefined; // Horizontal position = 'start'-default | 'center' | 'end';
}
