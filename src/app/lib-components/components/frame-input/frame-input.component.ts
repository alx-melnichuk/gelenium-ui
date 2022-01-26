import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AnchorScrollerService } from 'src/app/lib-core/services/anchor-scroller.service';

@Component({
  selector: 'app-frame-input',
  templateUrl: './frame-input.component.html',
  styleUrls: ['./frame-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameInputComponent implements AfterViewInit {
  public showNum = '';

  constructor(private anchorScrollerService: AnchorScrollerService) {
    // eslint-disable-next-line no-restricted-syntax
    console.time('FrameInputComponent');
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('FrameInputComponent');
    Promise.resolve().then(() => {
      this.anchorScrollerService.scrollByFragmentFromPath();
    });
  }
}
