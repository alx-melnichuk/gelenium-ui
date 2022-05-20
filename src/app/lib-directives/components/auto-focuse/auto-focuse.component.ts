import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-auto-focuse',
  templateUrl: './auto-focuse.component.html',
  styleUrls: ['./auto-focuse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoFocuseComponent {
  public showNum = '';
}
