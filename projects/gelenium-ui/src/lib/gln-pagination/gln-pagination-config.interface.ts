export interface GlnPaginationConfig {
  count?: number | undefined;
  // The number of always visible pages at the beginning and at the end.
  countBorder?: number | undefined;
  // The number of always visible pages before and after the current page.
  countNearby?: number | undefined;
  exterior?: string | undefined; // 'outlined', 'text'
  isHideNext?: boolean | undefined;
  isHidePrev?: boolean | undefined;
  isNoRipple?: boolean | undefined;
  isNoRound?: boolean | undefined;
  isShowFirst?: boolean | undefined;
  isShowLast?: boolean | undefined;
  size?: number | string | undefined; // 'short','small','middle','wide','large','huge'
}
