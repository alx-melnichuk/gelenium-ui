import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { HtmlElemUtil } from '../../_utils/html-elem.util';

@Directive({
  selector: '[glnColor]',
  exportAs: 'glnColor',
})
export class GlnColorDirective implements OnChanges {
  @Input()
  public glnColor: string | { [key: string]: string } | null | undefined;
  @Input()
  public glnColorElementRef: ElementRef<HTMLElement> | null | undefined;

  public elementRef: ElementRef<HTMLElement> = this.hostRef;

  private colorClearingMap: Map<string, string> = new Map();

  constructor(private hostRef: ElementRef<HTMLElement>) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['glnColorElementRef']) {
      this.elementRef = this.glnColorElementRef || this.hostRef;
    }
    if (changes['glnColor'] && this.glnColor != null) {
      const typeColor = typeof this.glnColor;
      const maps: Map<string, string> = new Map();
      if (typeColor === 'string') {
        maps.set('default', this.glnColor as string);
      } else if (typeColor === 'object') {
        const objColors = this.glnColor as { [key: string]: string };
        for (const key of Object.keys(objColors)) {
          maps.set(key, objColors[key]);
        }
      }
      const newMaps: Map<string, string> = maps.size === 0 ? this.colorClearingMap : maps;
      this.colorClearingMap = this.settingCssProoperties(newMaps);
    }
  }

  // ** Private methods **

  private settingCssProoperties(maps: Map<string, string>): Map<string, string> {
    const paramMaps: Map<string, string> = new Map();
    for (const [key, value] of maps) {
      if (value) {
        paramMaps.set(key, '');
      }
      const valueH = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-h');
      HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-h', valueH.trim());
      const valueS = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-s');
      HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-s', valueS.trim());
      const valueL = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-l');
      HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-l', valueL.trim());
      const valueCL = getComputedStyle(this.hostRef.nativeElement).getPropertyValue('--gln-' + value + '-cl');
      HtmlElemUtil.setProperty(this.elementRef, '--glncl-' + key + '-cl', valueCL.trim());
    }
    return paramMaps;
  }
}
