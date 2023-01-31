export interface GlnPaginationConfig {
  // The number of always visible pages at the beginning and at the end.
  countBorder?: number | undefined;
  // The number of always visible pages before and after the current page.
  countNearby?: number | undefined;
  exterior?: string | undefined;
  isHideNext?: boolean | undefined;
  isHidePrev?: boolean | undefined;
  isNoIcon?: boolean | undefined;
  isNoRound?: boolean | undefined;
  isShowFirst?: boolean | undefined;
  isShowLast?: boolean | undefined;
  size?: number | string | undefined; // 'short','small','middle','wide','large','huge'
}
