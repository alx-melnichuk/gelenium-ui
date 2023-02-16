import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

@Directive()
export abstract class GlnTooltipBaseComponent implements OnDestroy {
  public message: string = '';

  constructor() {}

  public ngOnDestroy(): void {}

  public show(delay: number): void {}

  public hide(delay: number): void {}

  public isVisible(): boolean {
    return false;
  }
}

@Component({
  selector: 'gln-tooltip-cmp',
  exportAs: 'glnTooltipCmp',
  templateUrl: './gln-tooltip.component.html',
  styleUrls: ['./gln-tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnTooltipComponent extends GlnTooltipBaseComponent implements OnDestroy {
  @Input()
  public text: string = '';

  private isVisibility: boolean | null = null;
  private showTimeoutId: NodeJS.Timeout | undefined;
  private hideTimeoutId: NodeJS.Timeout | undefined;

  constructor(public hostRef: ElementRef<HTMLElement>, private changeDetectorRef: ChangeDetectorRef) {
    super();
    console.log(`GlnTooltipCmp();`); // #
  }

  public override ngOnDestroy(): void {
    clearTimeout(this.showTimeoutId);
    clearTimeout(this.hideTimeoutId);
  }

  /** Shows an animated tooltip.
   * @param delay Number of milliseconds to delay displaying the tooltip.
   */
  public override show(delay: number): void {
    // Cancel delayed hiding, if it has been set.
    clearTimeout(this.hideTimeoutId);

    this.showTimeoutId = setTimeout(() => {
      this.isVisibility = true;
      this.showTimeoutId = undefined;
      this.changeDetectorRef.markForCheck();
    }, delay);
  }

  /** Hides the tooltip with animation after the specified delay in ms.
   * @param delay Number of milliseconds to delay hiding the tooltip.
   */
  public override hide(delay: number): void {
    // Cancel delayed showing, if it has been set.
    clearTimeout(this.showTimeoutId);

    this.hideTimeoutId = setTimeout(() => {
      this.isVisibility = false;
      this.hideTimeoutId = undefined;

      this.changeDetectorRef.markForCheck();
    }, delay);
  }

  /** Whether the tooltip is currently displayed. */
  public override isVisible(): boolean {
    return this.isVisibility === true;
  }
}
