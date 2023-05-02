import { DomPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Renderer2, ViewEncapsulation } from '@angular/core';
import { EventListenerType, EventListenerUtil } from '../_utils/event-listener.util';
import { GlnSnackbarConfig } from './gln-snackbar-config.interface';

export type SnackbarContainerItemResult = {
  showAnimationCompleted: () => void;
  hideAnimationCompleted: () => void;
};

type SnackbarContainerItem = {
  wrapperPortal: DomPortalOutlet;
  listeners: EventListenerType[];
};

@Component({
  selector: 'gln-snackbar-container',
  exportAs: 'glnSnackbarContainer',
  template: ``,
  styleUrls: ['./gln-snackbar-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSnackbarContainerComponent {
  private wrapperMap: Map<number, { wrapperPortal: DomPortalOutlet; listeners: EventListenerType[] }> = new Map();
  private appendWrapperFn: () => void = () => {};
  private removeWrapperFn: () => void = () => {};

  constructor(
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    config: GlnSnackbarConfig,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-snackbar2-container');
    this.renderer.setAttribute(this.hostRef.nativeElement, 'role', 'presentation');

    const horizontal: string = config.horizontal || GlnSnackbarConfig.defaultHorizontal;
    this.renderer.setAttribute(this.hostRef.nativeElement, 'hor-' + horizontal, '');

    const vertical: string = config.vertical || GlnSnackbarConfig.defaultVertical;
    this.renderer.setAttribute(this.hostRef.nativeElement, 'ver-' + vertical, '');
  }

  public setAppendWrapperFn(fn: () => void): void {
    this.appendWrapperFn = fn;
  }
  public setRemoveWrapperFn(fn: () => void): void {
    this.removeWrapperFn = fn;
  }

  public wrapperMapSize(): number {
    return this.wrapperMap.size;
  }

  public getItemByIndex(index: number): number | undefined {
    let result: number | undefined = undefined;
    if (-1 < index && index < this.wrapperMap.size) {
      const buff: number[] = Array.from(this.wrapperMap.keys());
      result = buff[index];
    }
    console.log(`*getItemByIndex(${index}); result=${result};`); // #
    return result;
  }

  public createWrapper(id: number, classNames: string[], transition: string): HTMLElement {
    console.log(`*createWrapper(${id})`); // #
    const wrapper: HTMLElement = this.document.createElement('div');
    wrapper.id = `glnsbc-wrapper-${id}`;
    wrapper.classList.add('gln-container-wrapper');
    wrapper.style.width = 'inherit';

    for (let idx = 0; idx < classNames.length; idx++) {
      if (!!classNames[idx]) {
        wrapper.classList.add(classNames[idx]);
      }
    }
    if (!!transition) {
      wrapper.setAttribute(transition, '');
      const transitionList: string[] = transition.split('-');
      if (transitionList.length > 0) {
        wrapper.setAttribute(transitionList[0], '');
      }
    }
    this.hostRef.nativeElement.appendChild(wrapper);

    return wrapper;
  }

  public appendWrapper(id: number, wrapperPortal: DomPortalOutlet): SnackbarContainerItemResult {
    console.log(`*appendWrapper(${id})`); // #
    const result: SnackbarContainerItemResult = {
      showAnimationCompleted: () => {},
      hideAnimationCompleted: () => {},
    };
    const animationEventFnc: () => void = () => {
      console.log(`*animationEventFnc(${id})`); // #
      const isShow: boolean | null = this.animationEndForWrapper(wrapperPortal.outletElement);
      if (isShow) {
        result.showAnimationCompleted();
      } else {
        result.hideAnimationCompleted();
        this.removeWrapper(id);
      }
    };
    const listeners: EventListenerType[] = [];
    listeners.push([wrapperPortal.outletElement, 'animationend', () => animationEventFnc()]);
    listeners.push([wrapperPortal.outletElement, 'animationcancel', () => animationEventFnc()]);

    this.wrapperMap.set(id, { wrapperPortal, listeners });
    EventListenerUtil.addListeners(listeners);
    this.appendWrapperFn();
    return result;
  }

  public showWrapper(id: number): void {
    console.log(`*showWrapper(${id})`); // #
    const item: SnackbarContainerItem | undefined = this.wrapperMap.get(id);
    if (!!item) {
      item.wrapperPortal.outletElement.setAttribute('animated', '');
      item.wrapperPortal.outletElement.setAttribute('is-show', '');
    }
  }

  public hideWrapper(id: number): void {
    console.log(`*hideWrapper(${id})`); // #
    const item: SnackbarContainerItem | undefined = this.wrapperMap.get(id);
    if (!!item) {
      item.wrapperPortal.outletElement.setAttribute('animated', '');
      item.wrapperPortal.outletElement.setAttribute('is-hide', '');
    }
  }

  public removeWrapper(id: number): void {
    console.log(`*removeWrapper(${id})`); // #
    const item: SnackbarContainerItem | undefined = this.wrapperMap.get(id);
    if (!!item) {
      EventListenerUtil.removeListeners(item.listeners);
      item.wrapperPortal.detach();
      item.wrapperPortal.dispose();
      this.wrapperMap.delete(id);
      this.removeWrapperFn();
    }
  }

  // ** Private methods **

  private animationEndForWrapper(wrapper: Element | null): boolean | null {
    console.log(`*animationEndForWrapper(${wrapper?.getAttribute('id')})`); // #
    let result: boolean | null = null;
    if (!!wrapper) {
      wrapper.removeAttribute('animated');
      result = wrapper.hasAttribute('is-show');
      if (result) {
        wrapper.removeAttribute('is-show');
      } else {
        wrapper.removeAttribute('is-hide');
      }
    }
    console.log(`*animationEndForWrapper(${wrapper?.getAttribute('id')}): result=${result}  ${result ? 'is-show' : 'is-hide'}`); // #
    return result;
  }
}
