export interface GlnFrameConfig {
  exterior?: string | undefined; // 'outlined' | 'underline' | 'standard'
  isLabelShrink?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  isRequired?: boolean | undefined;
  size?: number | string | undefined; // 'short','small','middle','wide','large','huge'
}
