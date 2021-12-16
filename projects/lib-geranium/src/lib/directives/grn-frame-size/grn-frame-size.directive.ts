import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FrameSize, FrameSizeUtil } from '../../interfaces/frame-size.interface';

@Directive({
  selector: '[grnFrameSize]',
})
export class GrnFrameSizeDirective implements OnInit {
  @Input()
  public grnFrameSize: string | null = null;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    private host: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    console.log('[grnFrameSaze]=' + this.grnFrameSize);
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'red');
    this.renderer.setStyle(this.elementRef.nativeElement, '--gfi-size2', 'red');
    this.elementRef.nativeElement.style.setProperty('--gfi-size4', 'red');
    // grn-set-styles
    // this.renderer.setProperty(this.elementRef.nativeElement, '--gfi-size3', 'red');
    // this.sanitizer.bypassSecurityTrustStyle(`--height: ${this.height}px`);
    // this.host.nativeElement.style.setProperty('--gfi-size4', 'red');

    // const frameSize: FrameSize = FrameSizeUtil.convert((this.grnFrameSize || '').toString(), FrameSize.wide) as FrameSize;
    // // const frameSize = FrameSizeUtil.create(this.grnFrameSaze, this.config?.frameSize || null);
    // const value = FrameSizeUtil.getValue(frameSize);
    // if (value != null) {
    //   this.renderer.setStyle(this.elementRef.nativeElement, '--gfi-size2', value + 'px');
    //   console.log('[grnFrameSaze]');
    // }
  }
}
