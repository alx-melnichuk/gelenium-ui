export class GlnDebounceTimer {
  private debounceTimer: number | undefined;
  public run(callback: () => void, delay?: number | undefined): void {
    this.clear();
    this.debounceTimer = window.setTimeout(() => {
      this.clear();
      callback();
    }, delay);
  }
  public clear(): void {
    window.clearTimeout(this.debounceTimer);
    this.debounceTimer = undefined;
  }
}

// <input (input)="handlerChange($event)" />
// const handlerChange = glnDebounceTimerFn((event) => handlerInput(event));
// function handlerInput(event) { console.log(event.target.value); }

export function glnDebounceTimerFn<U>(this: U, func: (...arg0: any[]) => void, timeout = 300): (...args: any[]) => any {
  const context = this;
  let timer: number | undefined;
  return (...args: any[]) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = undefined;
      func.apply(context, args);
    }, timeout);
  };
}
