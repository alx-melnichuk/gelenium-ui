import { Component, Input } from '@angular/core';

@Component({
  selector: 'gln-option3',
  template: '#{{value}}',
  styleUrls: ['./gln-option3.component.scss'],
})
export class GlnOption3Component {
  @Input()
  public key: string | undefined;
  @Input()
  public value: string | undefined;
}
