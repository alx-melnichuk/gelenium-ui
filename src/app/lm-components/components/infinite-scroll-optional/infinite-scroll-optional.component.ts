import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-optional',
  templateUrl: './infinite-scroll-optional.component.html',
  styleUrls: ['./infinite-scroll-optional.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollOptionalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
