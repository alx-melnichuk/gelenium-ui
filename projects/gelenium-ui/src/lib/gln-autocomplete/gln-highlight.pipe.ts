import { Pipe, PipeTransform } from '@angular/core';

/**
 * A channel for highlighting the desired text fragment.
 *
 * Example 1:
 *
 * <input type="text" [(ngModel)]="searchText" />
 * <p [innerHtml]="'Text to highlight: Block and Example.' | glnHighlight: searchText"></p>
 *
 * searchText = 'block';
 * Result:
 *   <p>Text to highlight: <mark>Block</mark> and Example.</p>
 *
 *
 * Example 2:
 *   The division into fragments is performed by the following symbols:
 *   ' ', '-', '[', ']', '/', '{', '}', '(', ')', '*', '+', '?', '.', '\', '^', '$', '|'
 *
 * <input type="text" [(ngModel)]="searchText" />
 * <p [innerHtml]="'Text to highlight: Block and Example.' | glnHighlight: searchText: true"></p>
 *
 * searchText = 'block example';
 * Result:
 *   <p>Text to highlight: <mark>Block</mark> and <mark>Example</mark>.</p>
 */
@Pipe({
  name: 'glnHighlight',
})
export class GlnHighlightPipe implements PipeTransform {
  transform(original: unknown, search: unknown, isSearchByAllWords?: unknown): unknown {
    let result: string = original as string;
    if (!!result && !!search) {
      let pattern = search as string;
      if (isSearchByAllWords) {
        pattern = pattern
          .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
          .split(' ')
          .filter((word) => word.length > 0)
          .join('|');
      }
      const regex = new RegExp(pattern, 'gi');
      const match = result.match(regex);
      result = match ? result.replace(regex, (matcher) => `<mark>${matcher}</mark>`) : result;
    }
    return result;
  }
}
