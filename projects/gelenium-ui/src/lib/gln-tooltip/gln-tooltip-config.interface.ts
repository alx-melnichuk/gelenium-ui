export interface GlnTooltipConfig {
  hideDelay?: number | undefined;
  isNoAnimation?: boolean | undefined;
  panelClass?: string | string[] | undefined;
  position?: string | undefined; // 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
  showDelay?: number | undefined;
  // backdropClass?: string | undefined; // default 'cdk-overlay-transparent-backdrop'
}
