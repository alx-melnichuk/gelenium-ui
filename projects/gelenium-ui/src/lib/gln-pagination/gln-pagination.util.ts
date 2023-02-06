export class GlnPaginationUtil {
  /** Creating an array with page numbers. */
  public static createPageBuffer(countIn: number, pageIn: number, countNearbyIn: number, countBorderIn: number): number[] {
    const result: number[] = [];
    const count: number = countIn < 0 ? 0 : countIn;
    let countNearby: number = countNearbyIn < 0 ? 0 : countNearbyIn;
    let countBorder: number = countBorderIn < 0 ? 0 : countBorderIn;

    if (count > 0) {
      const cntNearby: number = countNearby || 1;
      const cntBorder: number = countBorder || 1;
      let deltaPg: number = 0;
      let isEllipsisLeft: boolean = false;
      let isEllipsisRight: boolean = false;
      let maxIdxPageLeft: number = 0;
      const countPages: number = 1 + 2 * cntNearby + 2 * cntBorder + (countNearby > 0 && countBorder > 0 ? 2 : 0);

      if (countNearby == 0 && countBorder == 0 && count > 3) {
        isEllipsisLeft = pageIn > 2;
        isEllipsisRight = pageIn <= count - 2;
        maxIdxPageLeft = count - 1;
        deltaPg = 3 - (isEllipsisLeft ? 1 : 0) - (isEllipsisRight ? 1 : 0);
      } else if (countPages < count) {
        const deltaSite = countNearby > 0 && countBorder > 0 ? 1 : 0;
        const pageLeft: number = cntNearby + cntBorder + 1 + deltaSite;
        const pageRight: number = count - cntNearby - cntBorder - deltaSite;
        isEllipsisLeft = pageIn > pageLeft;
        isEllipsisRight = pageIn < pageRight;
        maxIdxPageLeft = count - countNearby - cntNearby - cntBorder - deltaSite;
        deltaPg = 1 + (isEllipsisLeft && isEllipsisRight ? 0 : 1);
      } else {
        deltaPg = count;
        countNearby = 0;
        countBorder = 0;
      }

      let idx: number = 0;
      let idxPage: number = 1;

      const lenBr1: number = idx + countBorder;
      while (idx < lenBr1) {
        result[idx++] = idxPage++;
      }
      if (isEllipsisLeft) {
        result[idx++] = -1;
        const delta = pageIn - countNearby;
        idxPage = delta < maxIdxPageLeft ? delta : maxIdxPageLeft;
      }
      const lenNr1: number = idx + countNearby;
      while (idx < lenNr1) {
        result[idx++] = idxPage++;
      }
      const lenPg: number = idx + deltaPg;
      while (idx < lenPg) {
        result[idx++] = idxPage++;
      }
      const lenNr2: number = idx + countNearby;
      while (idx < lenNr2) {
        result[idx++] = idxPage++;
      }
      if (isEllipsisRight) {
        result[idx++] = -1;
        idxPage = count - cntBorder + 1;
      }
      const lenBr2: number = idx + countBorder;
      while (idx < lenBr2) {
        result[idx++] = idxPage++;
      }
    }
    return result;
  }
}
