export interface GlnTooltipConfig {
  hideDelay?: number | undefined;
  isNoAnimation?: boolean | undefined;
  isNoHoverable?: boolean | undefined;
  isNoTouchable?: boolean | undefined;
  maxHeight?: number | string | undefined;
  maxWidth?: number | string | undefined;
  minHeight?: number | string | undefined;
  minWidth?: number | string | undefined;
  panelClass?: string | string[] | undefined;
  position?: string | undefined; // 'bottom[-start,-end]','top[-start,-end]','right[-start,-end]','left[-start,-end]';
  showDelay?: number | undefined;
  // backdropClass?: string | undefined; // default 'cdk-overlay-transparent-backdrop'
}
