import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gln-layer',
  exportAs: 'glnLayer',
  // templateUrl: './gln-layer.component.html',
  template: '',
  styleUrls: ['./gln-layer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnLayerComponent implements OnInit, OnDestroy {
  constructor(public hostRef: ElementRef<HTMLElement>) {
    console.log(`GlnLayerComponent()`); // #
  }

  ngOnInit(): void {
    console.log(`GlnLayerComponent.OnInit()`); // #
  }
  ngOnDestroy(): void {
    console.log(`GlnLayerComponent.OnDestroy()`); // #
  }
}
