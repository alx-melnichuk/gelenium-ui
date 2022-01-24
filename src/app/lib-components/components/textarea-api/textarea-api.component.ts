import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-textarea-api',
  templateUrl: './textarea-api.component.html',
  styleUrls: ['./textarea-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaApiComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
