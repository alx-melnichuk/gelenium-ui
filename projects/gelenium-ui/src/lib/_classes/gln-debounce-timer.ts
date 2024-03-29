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
// const handlerChange = glnDebounceTimerFn((event) => handlerInput(event), 200);
// function handlerInput(event) { console.log(event.target.value); }

export function glnDebounceTimerFn(this: any, func: (...arg0: any[]) => void, timeout = 300): (...args: any[]) => void {
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

// <input (input)="handlerChange($event)" />
// const handlerChange = glnDebounceTimerObjFn((event) => handlerInput(event), 200).run;
// function handlerInput(event) { console.log(event.target.value); }

export function glnDebounceTimerObjFn(
  this: any,
  func: (...arg0: any[]) => void,
  timeout = 300
): {
  run(...args: any[]): void;
  clear(): void;
} {
  const context = this;
  let timer: number | undefined;
  return {
    run(...args: any[]): void {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = undefined;
        func.apply(context, args);
      }, timeout);
    },
    clear(): void {
      window.clearTimeout(timer);
    },
  };
}
