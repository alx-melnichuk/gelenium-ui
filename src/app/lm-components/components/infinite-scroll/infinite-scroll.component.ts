import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

export interface Element {
  name: string;
  surname: string;
  email: string;
  city: string;
  phone: string;
}

const CN_CNT = 5;
const CN_NAME1 = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David'];
const CN_NAME2 = ['Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy'];
const CN_NAME3 = ['Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley'];
const CN_SURNAME1 = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const CN_SURNAME2 = ['Hernandez', 'Lopez', 'Gonzales', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const CN_SURNAME3 = ['Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'];
const CN_CITY1 = ['New York', 'Chicago', 'Charleston', 'Las Vegas', 'Seattle', 'San Francisco', 'Washington', 'New Orleans'];
const CN_CITY2 = ['Palm Springs', 'San Diego', 'St. Louis', 'Sedona', 'Honolulu', 'Miami Beach', 'Branson', 'Boston', 'Savannah'];
const CN_CITY3 = ['Orlando', 'Portland', 'Lahaina', 'Saint Augustine', 'Nashville', 'Los Angeles', 'San Antonio', 'Austin'];

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent implements OnInit {
  public list: Element[] = [];

  private nameList: string[] = [...CN_NAME1, ...CN_NAME2, ...CN_NAME3];
  private surnameList: string[] = [...CN_SURNAME1, ...CN_SURNAME2, ...CN_SURNAME3];
  private cityList: string[] = [...CN_CITY1, ...CN_CITY2, ...CN_CITY3];

  constructor() {
    this.list = this.createElementList(CN_CNT);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  // ** Public API **

  public trackByIdFn(index: number, item: Element): string {
    return item?.name + item?.surname;
  }

  public doScroll(): void {
    console.log('doScroll()');
    setTimeout(() => {
      this.list.push(...this.createElementList(CN_CNT));
    }, 1000);
  }

  // ** Private API **

  private randomNumber(value: number): number {
    return Math.floor(Math.random() * value + 1);
  }

  private createPhone(): string {
    const part1 = ('000' + this.randomNumber(1000)).substr(-3);
    const part2 = ('000' + Math.floor(Math.random() * 1000 + 1)).substr(-3);
    const part3 = ('000' + Math.floor(Math.random() * 100 + 1)).substr(-2);
    const part4 = ('000' + Math.floor(Math.random() * 100 + 1)).substr(-2);
    return part1 + '-' + part2 + '-' + part3 + '-' + part4;
  }

  private createElement(): Element {
    const name = this.nameList[Math.floor(Math.random() * this.nameList.length)];
    const surname = this.surnameList[Math.floor(Math.random() * this.surnameList.length)];
    const email = name + '.' + surname + '@gmail.com';
    const city = this.cityList[Math.floor(Math.random() * this.cityList.length)];
    const phone = this.createPhone();
    return { name, surname, email, city, phone };
  }

  private createElementList(cnt: number): Element[] {
    const result: Element[] = [];
    while (result.length < cnt) {
      result.push(this.createElement());
    }
    return result;
  }
}
