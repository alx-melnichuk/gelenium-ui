import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-frame-structure',
  templateUrl: './frame-structure.component.html',
  styleUrls: ['./frame-structure.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameStructureComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
