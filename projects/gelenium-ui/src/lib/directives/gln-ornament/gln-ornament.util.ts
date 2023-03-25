import { ElementRef, QueryList } from '@angular/core';

import { GlnOrnament } from './gln-ornament.interface';

export class GlnOrnamentUtil {
  public static getElements(
    queryList: QueryList<GlnOrnament> | null,
    elem?: ElementRef<HTMLElement> | undefined
  ): ElementRef<HTMLElement>[] {
    return (queryList?.toArray() || []).map((item: GlnOrnament) => item.hostRef).concat(elem != null ? [elem] : []);
  }
}
