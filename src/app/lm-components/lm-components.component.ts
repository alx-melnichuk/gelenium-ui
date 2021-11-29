import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { UrlItem, URL_COMPONENTS, URL_FRAME_INPUT, URL_INFINITE_SCROLL, URL_INPUT, URL_TEXTAREA } from './lm-components.interface';

@Component({
  selector: 'app-lm-components',
  templateUrl: './lm-components.component.html',
  styleUrls: ['./lm-components.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LmComponentsComponent implements OnInit {
  public expandedFrameInput = false;
  public frameInputUrlList: UrlItem[] = this.createFrameInputUrlList();
  public expandedInput = false;
  public inputUrlList: UrlItem[] = this.createInputUrlList();
  public expandedInfiniteScroll = false;
  public infiniteScrollUrlList: UrlItem[] = this.createInfiniteScrollUrlList();
  public expandedTextarea = false;
  public textareaUrlList: UrlItem[] = this.createTextareaUrlList();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.updateStatusExpandedByPathname();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  // ** Private API **

  private createUrlItem(label: string, url: string): UrlItem {
    return { label, url } as UrlItem;
  }

  // ** FrameInput **

  private getPathFrameInput(): string {
    return '/' + URL_COMPONENTS + '/' + URL_FRAME_INPUT;
  }

  private createFrameInputUrlList(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathFrameInput();
    result.push(this.createUrlItem('Basic', url + '#Basic'));
    result.push(this.createUrlItem('Frame size', url + '#FrameSize'));
    result.push(this.createUrlItem('Label', url + '#Label'));
    result.push(this.createUrlItem('Helper text', url + '#HelperText'));
    result.push(this.createUrlItem('Border radius', url + '#BorderRadius'));
    result.push(this.createUrlItem('Palette', url + '#Palette'));
    result.push(this.createUrlItem('Api', url + '#Api'));
    return result;
  }

  // ** Input **

  private getPathInput(): string {
    return '/' + URL_COMPONENTS + '/' + URL_INPUT;
  }

  private createInputUrlList(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathInput();
    result.push(this.createUrlItem('Basic', url + '#Basic'));
    result.push(this.createUrlItem('Attributes', url + '#Attributes'));
    result.push(this.createUrlItem('Validation', url + '#Validation'));
    result.push(this.createUrlItem('Numerical value', url + '#NumericalValue'));
    result.push(this.createUrlItem('Ornaments', url + '#Ornaments'));
    result.push(this.createUrlItem('Item size', url + '#ItemSize'));
    result.push(this.createUrlItem('Helper text', url + '#HelperText'));
    result.push(this.createUrlItem('Border radius', url + '#BorderRadius'));
    result.push(this.createUrlItem('Palette', url + '#Palette'));
    result.push(this.createUrlItem('Api', url + '#Api'));
    return result;
  }

  // ** InfiniteScroll **

  private getPathInfiniteScroll(): string {
    return '/' + URL_COMPONENTS + '/' + URL_INFINITE_SCROLL;
  }

  private createInfiniteScrollUrlList(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathInfiniteScroll();
    result.push(this.createUrlItem('Basic', url + '#Basic'));
    result.push(this.createUrlItem('Optional', url + '#Optional'));
    result.push(this.createUrlItem('Api', url + '#Api'));
    return result;
  }

  // ** Textarea **

  private getPathTextarea(): string {
    return '/' + URL_COMPONENTS + '/' + URL_TEXTAREA;
  }

  private createTextareaUrlList(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathTextarea();
    result.push(this.createUrlItem('Basic', url + '#Basic'));
    result.push(this.createUrlItem('Attributes', url + '#Attributes'));
    result.push(this.createUrlItem('Validation', url + '#Validation'));
    result.push(this.createUrlItem('Capability', url + '#Capability'));
    result.push(this.createUrlItem('Item size', url + '#ItemSize'));
    result.push(this.createUrlItem('Helper text', url + '#HelperText'));
    result.push(this.createUrlItem('Border radius', url + '#BorderRadius'));
    result.push(this.createUrlItem('Palette', url + '#Palette'));
    result.push(this.createUrlItem('Api', url + '#Api'));
    return result;
  }

  private updateStatusExpandedByPathname(): void {
    const pathname = location.pathname;
    this.expandedFrameInput = pathname.startsWith(this.getPathFrameInput());
    this.expandedInput = pathname.startsWith(this.getPathInput());
    this.expandedInfiniteScroll = pathname.startsWith(this.getPathInfiniteScroll());
    this.expandedTextarea = pathname.startsWith(this.getPathTextarea());
  }

  // ** **
}
