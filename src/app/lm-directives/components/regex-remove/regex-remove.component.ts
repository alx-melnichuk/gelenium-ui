import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-regex-remove',
  templateUrl: './regex-remove.component.html',
  styleUrls: ['./regex-remove.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegexRemoveComponent {
  public showNum = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
