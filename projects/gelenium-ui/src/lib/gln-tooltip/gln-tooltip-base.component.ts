import { Directive, TemplateRef } from '@angular/core';

@Directive()
export abstract class GlnTooltipBaseComponent {
  public content: Record<string, unknown> | null = null;
  public isVisibility: boolean | null = null;
  public text: string | null | undefined = null;
  public templateRef: TemplateRef<unknown> | null = null;

  constructor() {}

  // ** Public methods **

  public show(): void {
    this.isVisibility = true;
  }

  public hide(): void {
    this.isVisibility = false;
  }

  public isVisible(): boolean {
    return !!this.isVisibility;
  }

  public setOption(options: Record<string, unknown>): void {}
}
