export interface GlnTooltipConfig {
  hideDelay?: number | undefined;
  isNoAnimation?: boolean | undefined;
  isNoHoverable?: boolean | undefined;
  isNoTouchable?: boolean | undefined;
  panelClass?: string | string[] | undefined;
  position?: string | undefined; // 'bottom[-start,-end]','top[-start,-end]','right[-start,-end]','left[-start,-end]';
  showDelay?: number | undefined;
  // backdropClass?: string | undefined; // default 'cdk-overlay-transparent-backdrop'
}
