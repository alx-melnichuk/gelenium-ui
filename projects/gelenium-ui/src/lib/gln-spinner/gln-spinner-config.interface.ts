export interface GlnSpinnerConfig {
  isExternal?: boolean | undefined;
  isNoAnimation?: boolean | undefined;
  isNoPulsate?: boolean | undefined;
  progress?: number | undefined; // 0 to 1
  size?: number | string | undefined; // 'short','small','middle','wide','large','huge'
  strokeWd?: number | undefined;
}
