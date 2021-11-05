/* eslint-disable @typescript-eslint/no-explicit-any */

// https://dzone.com/articles/handling-property-changes-using-decorator-an-alter

export function PropertyChange<T = any>(methodName: string, scope?: any) {
  return (target: T, key: keyof T): void => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(target, key);
    let val: any;

    // Wrap hook methods
    Object.defineProperty(target, key, {
      set(value) {
        const previousValue = val;
        if (previousValue === value) {
          return;
        }

        val = value;
        if (!!originalDescriptor && !!originalDescriptor.set) {
          originalDescriptor.set.call(this, value);
        }

        if (!!methodName && val !== previousValue) {
          this[methodName].call(scope || this, value, previousValue);
        }
      },
      get() {
        if (!!originalDescriptor && !!originalDescriptor.get) {
          return originalDescriptor.get.call(this);
        }
        return val;
      },
    });
  };
}

/*
import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { PropertyChange } from './property-change.decorator';

@Component({
  selector: 'hello-prop-decorator-example',
  template: `...`,
  styles: [`h1 { font-family: Lato; border-top: 1px solid #CCCCCC;}`]
})
export class HelloPropDecoratorExampleComponent {
  public greetings: string = '';
  
  @Input() 
  @PropertyChange('onNameChange')
  name: string;
  
  onNameChange(newName: string) {
    this.greetings = newName + '!!!!!';
  }
}
*/

// https://medium.com/angular-in-depth/creatively-decouple-ngonchanges-fab95395cc6e

// This is different from Angular's SimpleChange as it adds generic type T
export interface PropSimpleChange<T> {
  firstChange: boolean;
  previousValue: T;
  currentValue: T;
  isFirstChange: () => boolean;
}

export function PropertyChange2<T = any>(callback: (value: T, simpleChange?: PropSimpleChange<T>) => void): any {
  const cachedValueKey = Symbol();
  const isFirstChangeKey = Symbol();

  return (target: any, key: PropertyKey) => {
    Object.defineProperty(target, key, {
      set: function (value) {
        // change status of "isFirstChange"
        if (this[isFirstChangeKey] === undefined) {
          this[isFirstChangeKey] = true;
        } else {
          this[isFirstChangeKey] = false;
        }
        // No operation if new value is same as old value
        if (!this[isFirstChangeKey] && this[cachedValueKey] === value) {
          return;
        }
        const oldValue = this[cachedValueKey];
        this[cachedValueKey] = value;
        const simpleChange: PropSimpleChange<T> = {
          firstChange: this[isFirstChangeKey],
          previousValue: oldValue,
          currentValue: this[cachedValueKey],
          isFirstChange: () => this[isFirstChangeKey],
        };
        callback.call(this, this[cachedValueKey], simpleChange);
      },
      get: function () {
        return this[cachedValueKey];
      },
    });
  };
}
/*
export class AppComponent {
  @PropertyChange2<string>(function (value, simpleChange) {
      console.log(`title is changed to: ${value}`);
  })
  @Input()
  title: string;
}
*/
