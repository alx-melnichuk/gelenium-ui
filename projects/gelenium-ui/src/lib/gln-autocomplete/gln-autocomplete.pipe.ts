import { NgIterable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'glnAutocomplete',
})
export class GlnAutocompletePipe implements PipeTransform {
  transform(value: NgIterable<any> | null | undefined, ...args: unknown[]): NgIterable<any> | null | undefined {
    console.log(`Pipe()`);
    return value;
  }
}
