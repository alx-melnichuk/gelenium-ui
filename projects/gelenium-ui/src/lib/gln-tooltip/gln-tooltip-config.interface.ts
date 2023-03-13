export interface GlnTooltipConfig {
  classes?: string | string[] | undefined;
  hideDelay?: number | undefined;
  isNoAnimation?: boolean | undefined;
  isNoHideOnScroll?: boolean | undefined;
  isNoHoverable?: boolean | undefined;
  isNoTouchable?: boolean | undefined;
  maxHeight?: number | string | undefined;
  maxWidth?: number | string | undefined;
  minHeight?: number | string | undefined;
  minWidth?: number | string | undefined;
  overlayClasses?: string | string[] | undefined;
  position?: string | undefined; // 'bottom[-start,-end]','top[-start,-end]','right[-start,-end]','left[-start,-end]';
  showDelay?: number | undefined;
  // backdropClass?: string | undefined; // default 'cdk-overlay-transparent-backdrop'
}
