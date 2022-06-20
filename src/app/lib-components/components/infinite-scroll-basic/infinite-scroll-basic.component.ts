import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

import { LABEL_SHOW_SOURCE, LABEL_HTML, LABEL_TS, LABEL_CSS } from 'src/app/lib-core/constants/constants';

export interface Element {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

const CN_CNT = 5;
const CN_NAME1 = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David'];
const CN_NAME2 = ['Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy'];
const CN_NAME3 = ['Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley'];
const CN_SURNAME1 = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const CN_SURNAME2 = ['Hernandez', 'Lopez', 'Gonzales', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const CN_SURNAME3 = ['Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'];

@Component({
  selector: 'app-infinite-scroll-basic',
  templateUrl: './infinite-scroll-basic.component.html',
  styleUrls: ['./infinite-scroll-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public elements0: Element[] = [];
  public elements1: Element[] = [];
  public isLoading = false;

  private names: string[] = [...CN_NAME1, ...CN_NAME2, ...CN_NAME3];
  private surnames: string[] = [...CN_SURNAME1, ...CN_SURNAME2, ...CN_SURNAME3];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.elements0 = this.createElementList(CN_CNT);
    this.elements1 = this.createElementList(CN_CNT);
  }

  // ** Public API **

  public trackByIdFn(index: number, item: Element): string {
    return item?.name + item?.surname;
  }

  public doScroll(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.elements1.push(...this.createElementList(CN_CNT));
      this.isLoading = false;
      this.changeDetectorRef.markForCheck();
    }, 1000);
  }

  // ** Private API **

  private randomNumber(value: number): number {
    return Math.floor(Math.random() * value + 1);
  }

  private createPhone(): string {
    const part1 = ('000' + this.randomNumber(1000)).slice(-3);
    const part2 = ('000' + this.randomNumber(1000)).slice(-3);
    const part3 = ('000' + this.randomNumber(100)).slice(-2);
    const part4 = ('000' + this.randomNumber(100)).slice(-2);
    return part1 + '-' + part2 + '-' + part3 + '-' + part4;
  }

  private createElement(): Element {
    const cntN = this.names.length;
    const name = this.names[Math.floor(Math.random() * cntN)];
    const cntS = this.surnames.length;
    const surname = this.surnames[Math.floor(Math.random() * cntS)];
    const email = name + '.' + surname + '@gmail.com';
    const phone = this.createPhone();
    return { name, surname, email, phone };
  }

  private createElementList(cnt: number): Element[] {
    const result: Element[] = [];
    while (result.length < cnt) {
      result.push(this.createElement());
    }
    return result;
  }
}
