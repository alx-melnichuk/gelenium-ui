import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { EXPANDED_HEIGHT } from '../constants/constants';
import { UrlItem, UrlItemUtil } from '../interfaces/url-item.interface';
import { URL_FRAME_INPUT, URL_INFINITE_SCROLL, URL_INPUT, URL_ROOT, URL_TEXTAREA } from './constants/url.constants';

@Component({
  selector: 'app-lm-components',
  templateUrl: './lm-components.component.html',
  styleUrls: ['./lm-components.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LmComponentsComponent implements OnInit, AfterViewInit {
  public expandedHeight = EXPANDED_HEIGHT;

  public expandedFrameInput = false;
  public urlListFrameInput: UrlItem[] = this.createUrlListFrameInput();

  public expandedInfiniteScroll = false;
  public urlListInfiniteScroll: UrlItem[] = this.createUrlListInfiniteScroll();

  public expandedInput = false;
  public urlListInput: UrlItem[] = this.createUrlListInput();

  public expandedTextarea = false;
  public urlListTextarea: UrlItem[] = this.createUrlListTextarea();

  constructor() {
    this.updateStatusExpandedByPathname();
    // eslint-disable-next-line no-restricted-syntax
    console.time('LmComponentsComponent');
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('LmComponentsComponent');
  }

  // ** Private API **

  // ** FrameInput **

  private getPathFrameInput(): string {
    return '/' + URL_ROOT + '/' + URL_FRAME_INPUT;
  }

  private createUrlListFrameInput(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathFrameInput();
    result.push(UrlItemUtil.create('Basic', url + '#Basic'));
    result.push(UrlItemUtil.create('Frame size', url + '#FrameSize'));
    result.push(UrlItemUtil.create('Label', url + '#Label'));
    result.push(UrlItemUtil.create('Helper text', url + '#HelperText'));
    result.push(UrlItemUtil.create('Border radius', url + '#BorderRadius'));
    result.push(UrlItemUtil.create('Palette', url + '#Palette'));
    result.push(UrlItemUtil.create('Config', url + '#Config'));
    result.push(UrlItemUtil.create('Api', url + '#Api'));
    return result;
  }

  // ** InfiniteScroll **

  private getPathInfiniteScroll(): string {
    return '/' + URL_ROOT + '/' + URL_INFINITE_SCROLL;
  }

  private createUrlListInfiniteScroll(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathInfiniteScroll();
    result.push(UrlItemUtil.create('Basic', url + '#Basic'));
    result.push(UrlItemUtil.create('Optional', url + '#Optional'));
    result.push(UrlItemUtil.create('Api', url + '#Api'));
    return result;
  }

  // ** Input **

  private getPathInput(): string {
    return '/' + URL_ROOT + '/' + URL_INPUT;
  }

  private createUrlListInput(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathInput();
    result.push(UrlItemUtil.create('Basic', url + '#Basic'));
    result.push(UrlItemUtil.create('Attributes', url + '#Attributes'));
    result.push(UrlItemUtil.create('Validation', url + '#Validation'));
    result.push(UrlItemUtil.create('Numerical value', url + '#NumericalValue'));
    result.push(UrlItemUtil.create('Ornaments', url + '#Ornaments'));
    result.push(UrlItemUtil.create('Item size', url + '#ItemSize'));
    result.push(UrlItemUtil.create('Helper text', url + '#HelperText'));
    result.push(UrlItemUtil.create('Border radius', url + '#BorderRadius'));
    result.push(UrlItemUtil.create('Palette', url + '#Palette'));
    result.push(UrlItemUtil.create('Api', url + '#Api'));
    return result;
  }

  // ** Textarea **

  private getPathTextarea(): string {
    return '/' + URL_ROOT + '/' + URL_TEXTAREA;
  }

  private createUrlListTextarea(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathTextarea();
    result.push(UrlItemUtil.create('Basic', url + '#Basic'));
    result.push(UrlItemUtil.create('Attributes', url + '#Attributes'));
    result.push(UrlItemUtil.create('Validation', url + '#Validation'));
    result.push(UrlItemUtil.create('Capability', url + '#Capability'));
    result.push(UrlItemUtil.create('Ornaments', url + '#Ornaments'));
    result.push(UrlItemUtil.create('Item size', url + '#ItemSize'));
    result.push(UrlItemUtil.create('Helper text', url + '#HelperText'));
    result.push(UrlItemUtil.create('Border radius', url + '#BorderRadius'));
    result.push(UrlItemUtil.create('Palette', url + '#Palette'));
    result.push(UrlItemUtil.create('Api', url + '#Api'));
    return result;
  }

  // ** -- **

  private updateStatusExpandedByPathname(): void {
    const pathname = location.pathname;
    this.expandedFrameInput = pathname.startsWith(this.getPathFrameInput());
    this.expandedInfiniteScroll = pathname.startsWith(this.getPathInfiniteScroll());
    this.expandedInput = pathname.startsWith(this.getPathInput());
    this.expandedTextarea = pathname.startsWith(this.getPathTextarea());
  }

  // ** **
}
