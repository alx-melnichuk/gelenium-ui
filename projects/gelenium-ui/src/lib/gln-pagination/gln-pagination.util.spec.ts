import { GlnPaginationUtil } from './gln-pagination.util';

describe('GlnPaginationUtil.createPageBuffer()', () => {
  let count = 0;
  count = 1;
  if (1 === count) {
    it('count=1, page=1, countNearby=1, countBorder=1 => [1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(1, 1, 1, 1)).toEqual([1]);
    });

    it('count=1, page=1, countNearby=1, countBorder=0 => [1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(1, 1, 1, 0)).toEqual([1]);
    });
    it('count=1, page=1, countNearby=0, countBorder=1 => [1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(1, 1, 0, 1)).toEqual([1]);
    });

    //
    it('count=1, page=1, countNearby=0, countBorder=0 => [1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(1, 1, 0, 0)).toEqual([1]);
    });
  }

  count = 2;
  if (2 === count) {
    it('count=2, page=1, countNearby=1, countBorder=1 => [1, 2]', () => {
      expect(GlnPaginationUtil.createPageBuffer(2, 1, 1, 1)).toEqual([1, 2]);
    });

    it('count=2, page=1, countNearby=1, countBorder=0 => [1, 2]', () => {
      expect(GlnPaginationUtil.createPageBuffer(2, 1, 1, 0)).toEqual([1, 2]);
    });
    it('count=2, page=1, countNearby=0, countBorder=1 => [1, 2]', () => {
      expect(GlnPaginationUtil.createPageBuffer(2, 1, 0, 1)).toEqual([1, 2]);
    });

    it('count=2, page=1, countNearby=2, countBorder=0 => [1, 2]', () => {
      expect(GlnPaginationUtil.createPageBuffer(2, 1, 2, 0)).toEqual([1, 2]);
    });
    it('count=2, page=1, countNearby=0, countBorder=2 => [1, 2]', () => {
      expect(GlnPaginationUtil.createPageBuffer(2, 1, 0, 2)).toEqual([1, 2]);
    });

    //
    it('count=2, page=1, countNearby=0, countBorder=0 => [1, 2]', () => {
      expect(GlnPaginationUtil.createPageBuffer(2, 1, 0, 0)).toEqual([1, 2]);
    });
  }

  count = 3;
  if (3 === count) {
    it('count=3, page=1, countNearby=1, countBorder=1 => [1, 2, 3]', () => {
      expect(GlnPaginationUtil.createPageBuffer(3, 1, 1, 1)).toEqual([1, 2, 3]);
    });

    it('count=3, page=1, countNearby=1, countBorder=0 => [1, 2, 3]', () => {
      expect(GlnPaginationUtil.createPageBuffer(3, 1, 1, 0)).toEqual([1, 2, 3]);
    });
    it('count=3, page=1, countNearby=0, countBorder=1 => [1, 2, 3]', () => {
      expect(GlnPaginationUtil.createPageBuffer(3, 1, 0, 1)).toEqual([1, 2, 3]);
    });

    it('count=3, page=1, countNearby=2, countBorder=0 => [1, 2, 3]', () => {
      expect(GlnPaginationUtil.createPageBuffer(3, 1, 2, 0)).toEqual([1, 2, 3]);
    });
    it('count=3, page=1, countNearby=0, countBorder=2 => [1, 2, 3]', () => {
      expect(GlnPaginationUtil.createPageBuffer(3, 1, 0, 2)).toEqual([1, 2, 3]);
    });

    //
    it('count=3, page=1, countNearby=0, countBorder=0 => [1, 2, 3]', () => {
      expect(GlnPaginationUtil.createPageBuffer(3, 1, 0, 0)).toEqual([1, 2, 3]);
    });
  }

  count = 4;
  if (4 === count) {
    it('count=4, page=1, countNearby=1, countBorder=1 => [1, 2, 3, 4]', () => {
      expect(GlnPaginationUtil.createPageBuffer(4, 1, 1, 1)).toEqual([1, 2, 3, 4]);
    });

    it('count=4, page=1, countNearby=1, countBorder=0 => [1, 2, 3, 4]', () => {
      expect(GlnPaginationUtil.createPageBuffer(4, 1, 1, 0)).toEqual([1, 2, 3, 4]);
    });
    it('count=4, page=1, countNearby=0, countBorder=1 => [1, 2, 3, 4]', () => {
      expect(GlnPaginationUtil.createPageBuffer(4, 1, 0, 1)).toEqual([1, 2, 3, 4]);
    });

    it('count=4, page=1, countNearby=2, countBorder=0 => [1, 2, 3, 4]', () => {
      expect(GlnPaginationUtil.createPageBuffer(4, 1, 2, 0)).toEqual([1, 2, 3, 4]);
    });
    it('count=4, page=1, countNearby=0, countBorder=2 => [1, 2, 3, 4]', () => {
      expect(GlnPaginationUtil.createPageBuffer(4, 1, 0, 2)).toEqual([1, 2, 3, 4]);
    });

    //
    it('count=4, page=1, countNearby=0, countBorder=0 => [1, 2, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(4, 1, 0, 0)).toEqual([1, 2, -1]);
    });

    it('count=4, page=3, countNearby=0, countBorder=0 => [-1, 3, 4]', () => {
      expect(GlnPaginationUtil.createPageBuffer(4, 3, 0, 0)).toEqual([-1, 3, 4]);
    });
  }

  count = 5;
  if (5 === count) {
    it('count=5, page=1, countNearby=1, countBorder=1 => [1, 2, 3, 4, 5]', () => {
      expect(GlnPaginationUtil.createPageBuffer(5, 1, 1, 1)).toEqual([1, 2, 3, 4, 5]);
    });

    it('count=5, page=1, countNearby=1, countBorder=0 => [1, 2, 3, 4, 5]', () => {
      expect(GlnPaginationUtil.createPageBuffer(5, 1, 1, 0)).toEqual([1, 2, 3, 4, 5]);
    });
    it('count=5, page=1, countNearby=0, countBorder=1 => [1, 2, 3, 4, 5]', () => {
      expect(GlnPaginationUtil.createPageBuffer(5, 1, 0, 1)).toEqual([1, 2, 3, 4, 5]);
    });

    it('count=5, page=1, countNearby=2, countBorder=0 => [1, 2, 3, 4, 5]', () => {
      expect(GlnPaginationUtil.createPageBuffer(5, 1, 2, 0)).toEqual([1, 2, 3, 4, 5]);
    });
    it('count=5, page=1, countNearby=0, countBorder=2 => [1, 2, 3, 4, 5]', () => {
      expect(GlnPaginationUtil.createPageBuffer(5, 1, 0, 2)).toEqual([1, 2, 3, 4, 5]);
    });

    //
    it('count=5, page=1, countNearby=0, countBorder=0 => [1, 2, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(5, 1, 0, 0)).toEqual([1, 2, -1]);
    });

    it('count=5, page=3, countNearby=0, countBorder=0 => [-1, 3, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(5, 3, 0, 0)).toEqual([-1, 3, -1]);
    });

    it('count=5, page=4, countNearby=0, countBorder=0 => [-1, 4, 5]', () => {
      expect(GlnPaginationUtil.createPageBuffer(5, 4, 0, 0)).toEqual([-1, 4, 5]);
    });
  }

  count = 6;
  if (6 === count) {
    it('count=6, page=1, countNearby=1, countBorder=1 => [1, 2, 3, 4, 5, 6]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 1, 1, 1)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('count=6, page=1, countNearby=1, countBorder=0 => [1, 2, 3, 4, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 1, 1, 0)).toEqual([1, 2, 3, 4, -1]);
    });
    it('count=6, page=1, countNearby=0, countBorder=1 => [1, 2, 3, -1, 6]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 1, 0, 1)).toEqual([1, 2, 3, -1, 6]);
    });

    it('count=6, page=1, countNearby=2, countBorder=0 => [1, 2, 3, 4, 5, 6]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 1, 2, 0)).toEqual([1, 2, 3, 4, 5, 6]);
    });
    it('count=6, page=1, countNearby=0, countBorder=2 => [1, 2, 3, 4, 5, 6]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 1, 0, 2)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('count=6, page=1, countNearby=3, countBorder=0 => [1, 2, 3, 4, 5, 6]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 1, 3, 0)).toEqual([1, 2, 3, 4, 5, 6]);
    });
    it('count=6, page=1, countNearby=0, countBorder=3 => [1, 2, 3, 4, 5, 6]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 1, 0, 3)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    //
    it('count=6, page=1, countNearby=0, countBorder=0 => [1, 2, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 1, 0, 0)).toEqual([1, 2, -1]);
    });

    it('count=6, page=3, countNearby=0, countBorder=0 => [-1, 3, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 3, 0, 0)).toEqual([-1, 3, -1]);
    });

    it('count=6, page=4, countNearby=0, countBorder=0 => [-1, 4, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 4, 0, 0)).toEqual([-1, 4, -1]);
    });

    it('count=6, page=5, countNearby=0, countBorder=0 => [-1, 5, 6]', () => {
      expect(GlnPaginationUtil.createPageBuffer(6, 5, 0, 0)).toEqual([-1, 5, 6]);
    });
  }

  count = 7;
  if (7 === count) {
    it('count=7, page=1, countNearby=1, countBorder=1 => [1, 2, 3, 4, 5, 6, 7]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 1, 1, 1)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('count=7, page=1, countNearby=1, countBorder=0 => [1, 2, 3, 4, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 1, 1, 0)).toEqual([1, 2, 3, 4, -1]);
    });
    it('count=7, page=1, countNearby=0, countBorder=1 => [1, 2, 3, -1, 7]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 1, 0, 1)).toEqual([1, 2, 3, -1, 7]);
    });

    it('count=7, page=1, countNearby=2, countBorder=0 => [1, 2, 3, 4, 5, 6, 7]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 1, 2, 0)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
    it('count=7, page=1, countNearby=0, countBorder=2 => [1, 2, 3, 4, 5, 6, 7]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 1, 0, 2)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('count=7, page=1, countNearby=3, countBorder=0 => [1, 2, 3, 4, 5, 6, 7]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 1, 3, 0)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
    it('count=7, page=1, countNearby=0, countBorder=3 => [1, 2, 3, 4, 5, 6, 7]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 1, 0, 3)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    //
    it('count=7, page=1, countNearby=0, countBorder=0 => [1, 2, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 1, 0, 0)).toEqual([1, 2, -1]);
    });

    it('count=7, page=3, countNearby=0, countBorder=0 => [-1, 3, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 3, 0, 0)).toEqual([-1, 3, -1]);
    });

    it('count=7, page=4, countNearby=0, countBorder=0 => [-1, 4, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 4, 0, 0)).toEqual([-1, 4, -1]);
    });

    it('count=7, page=5, countNearby=0, countBorder=0 => [-1, 5, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 5, 0, 0)).toEqual([-1, 5, -1]);
    });

    it('count=7, page=6, countNearby=0, countBorder=0 => [-1, 6, 7]', () => {
      expect(GlnPaginationUtil.createPageBuffer(7, 6, 0, 0)).toEqual([-1, 6, 7]);
    });
  }

  count = 8;
  if (8 === count) {
    it('count=8, page=1, countNearby=1, countBorder=1 => [1, 2, 3, 4, 5, -1, 8]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 1, 1, 1)).toEqual([1, 2, 3, 4, 5, -1, 8]);
    });

    it('count=8, page=1, countNearby=1, countBorder=0 => [1, 2, 3, 4, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 1, 1, 0)).toEqual([1, 2, 3, 4, -1]);
    });
    it('count=8, page=1, countNearby=0, countBorder=1 => [1, 2, 3, -1, 8]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 1, 0, 1)).toEqual([1, 2, 3, -1, 8]);
    });

    it('count=8, page=1, countNearby=2, countBorder=0 => [1, 2, 3, 4, 5, 6, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 1, 2, 0)).toEqual([1, 2, 3, 4, 5, 6, -1]);
    });
    it('count=8, page=1, countNearby=0, countBorder=2 => [1, 2, 3, 4, -1, 7, 8]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 1, 0, 2)).toEqual([1, 2, 3, 4, -1, 7, 8]);
    });

    it('count=8, page=1, countNearby=3, countBorder=0 => [1, 2, 3, 4, 5, 6, 7, 8]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 1, 3, 0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });
    it('count=8, page=1, countNearby=0, countBorder=3 => [1, 2, 3, 4, 5, 6, 7, 8]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 1, 0, 3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('count=8, page=1, countNearby=4, countBorder=0 => [1, 2, 3, 4, 5, 6, 7, 8]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 1, 4, 0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });
    it('count=8, page=1, countNearby=0, countBorder=4 => [1, 2, 3, 4, 5, 6, 7, 8]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 1, 0, 4)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    //
    it('count=8, page=1, countNearby=0, countBorder=0 => [1, 2, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 1, 0, 0)).toEqual([1, 2, -1]);
    });

    it('count=8, page=3, countNearby=0, countBorder=0 => [-1, 3, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 3, 0, 0)).toEqual([-1, 3, -1]);
    });

    it('count=8, page=4, countNearby=0, countBorder=0 => [-1, 4, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 4, 0, 0)).toEqual([-1, 4, -1]);
    });

    it('count=8, page=5, countNearby=0, countBorder=0 => [-1, 5, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 5, 0, 0)).toEqual([-1, 5, -1]);
    });

    it('count=8, page=6, countNearby=0, countBorder=0 => [-1, 6, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 6, 0, 0)).toEqual([-1, 6, -1]);
    });

    it('count=8, page=7, countNearby=0, countBorder=0 => [-1, 7, 8]', () => {
      expect(GlnPaginationUtil.createPageBuffer(8, 7, 0, 0)).toEqual([-1, 7, 8]);
    });
  }

  count = 9;
  if (9 === count) {
    it('count=9, page=1, countNearby=1, countBorder=1 => [1, 2, 3, 4, 5, -1, 9]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 1, 1)).toEqual([1, 2, 3, 4, 5, -1, 9]);
    });

    it('count=9, page=1, countNearby=1, countBorder=0 => [1, 2, 3, 4, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 1, 0)).toEqual([1, 2, 3, 4, -1]);
    });
    it('count=9, page=1, countNearby=0, countBorder=1 => [1, 2, 3, -1, 9]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 0, 1)).toEqual([1, 2, 3, -1, 9]);
    });

    it('count=9, page=1, countNearby=2, countBorder=0 => [1, 2, 3, 4, 5, 6, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 2, 0)).toEqual([1, 2, 3, 4, 5, 6, -1]);
    });
    it('count=9, page=1, countNearby=0, countBorder=2 => [1, 2, 3, 4, -1, 8, 9]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 0, 2)).toEqual([1, 2, 3, 4, -1, 8, 9]);
    });

    it('count=9, page=1, countNearby=3, countBorder=0 => [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 3, 0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    it('count=9, page=1, countNearby=0, countBorder=3 => [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 0, 3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('count=9, page=1, countNearby=4, countBorder=0 => [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 4, 0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    it('count=9, page=1, countNearby=0, countBorder=4 => [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 0, 4)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('count=9, page=1, countNearby=5, countBorder=0 => [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 5, 0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    it('count=9, page=1, countNearby=0, countBorder=5 => [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 0, 5)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    //
    it('count=9, page=1, countNearby=0, countBorder=0 => [1, 2, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 1, 0, 0)).toEqual([1, 2, -1]);
    });

    it('count=9, page=3, countNearby=0, countBorder=0 => [-1, 3, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 3, 0, 0)).toEqual([-1, 3, -1]);
    });

    it('count=9, page=4, countNearby=0, countBorder=0 => [-1, 4, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 4, 0, 0)).toEqual([-1, 4, -1]);
    });

    it('count=9, page=5, countNearby=0, countBorder=0 => [-1, 5, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 5, 0, 0)).toEqual([-1, 5, -1]);
    });

    it('count=9, page=6, countNearby=0, countBorder=0 => [-1, 6, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 6, 0, 0)).toEqual([-1, 6, -1]);
    });

    it('count=9, page=7, countNearby=0, countBorder=0 => [-1, 7, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 7, 0, 0)).toEqual([-1, 7, -1]);
    });

    it('count=9, page=8, countNearby=0, countBorder=0 => [-1, 8, 9]', () => {
      expect(GlnPaginationUtil.createPageBuffer(9, 8, 0, 0)).toEqual([-1, 8, 9]);
    });
  }

  count = 10;
  if (10 === count) {
    it('count=10, page=1, countNearby=1, countBorder=1 => [1, 2, 3, 4, 5, -1, 10]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 1, 1)).toEqual([1, 2, 3, 4, 5, -1, 10]);
    });

    it('count=10, page=1, countNearby=1, countBorder=0 => [1, 2, 3, 4, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 1, 0)).toEqual([1, 2, 3, 4, -1]);
    });
    it('count=10, page=1, countNearby=0, countBorder=1 => [1, 2, 3, -1, 10]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 0, 1)).toEqual([1, 2, 3, -1, 10]);
    });

    it('count=10, page=1, countNearby=2, countBorder=0 => [1, 2, 3, 4, 5, 6, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 2, 0)).toEqual([1, 2, 3, 4, 5, 6, -1]);
    });
    it('count=10, page=1, countNearby=0, countBorder=2 => [1, 2, 3, 4, -1, 9, 10]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 0, 2)).toEqual([1, 2, 3, 4, -1, 9, 10]);
    });

    it('count=10, page=1, countNearby=3, countBorder=0 => [1, 2, 3, 4, 5, 6, 7, 8, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 3, 0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, -1]);
    });
    it('count=10, page=1, countNearby=0, countBorder=3 => [1, 2, 3, 4, 5, -1, 8, 9, 10]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 0, 3)).toEqual([1, 2, 3, 4, 5, -1, 8, 9, 10]);
    });

    it('count=10, page=1, countNearby=4, countBorder=0 => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 4, 0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
    it('count=10, page=1, countNearby=0, countBorder=4 => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 0, 4)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('count=10, page=1, countNearby=5, countBorder=0 => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 5, 0)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
    it('count=10, page=1, countNearby=0, countBorder=5 => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 0, 5)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    //
    it('count=10, page=1, countNearby=0, countBorder=0 => [1, 2, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 1, 0, 0)).toEqual([1, 2, -1]);
    });

    it('count=10, page=3, countNearby=0, countBorder=0 => [-1, 3, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 3, 0, 0)).toEqual([-1, 3, -1]);
    });

    it('count=10, page=4, countNearby=0, countBorder=0 => [-1, 4, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 4, 0, 0)).toEqual([-1, 4, -1]);
    });

    it('count=10, page=5, countNearby=0, countBorder=0 => [-1, 5, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 5, 0, 0)).toEqual([-1, 5, -1]);
    });

    it('count=10, page=6, countNearby=0, countBorder=0 => [-1, 6, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 6, 0, 0)).toEqual([-1, 6, -1]);
    });

    it('count=10, page=7, countNearby=0, countBorder=0 => [-1, 7, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 7, 0, 0)).toEqual([-1, 7, -1]);
    });

    it('count=10, page=8, countNearby=0, countBorder=0 => [-1, 8, -1]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 8, 0, 0)).toEqual([-1, 8, -1]);
    });

    it('count=10, page=9, countNearby=0, countBorder=0 => [-1, 9, 10]', () => {
      expect(GlnPaginationUtil.createPageBuffer(10, 9, 0, 0)).toEqual([-1, 9, 10]);
    });
  }
  //
});
