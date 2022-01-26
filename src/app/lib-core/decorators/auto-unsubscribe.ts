const doUnsubscribe = (subscription: { unsubscribe: () => void } | null) => {
  if (subscription != null && typeof subscription.unsubscribe === 'function') {
    subscription.unsubscribe();
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doUnsubscribeIfArray = (subscriptionsArray: any[]) => {
  if (Array.isArray(subscriptionsArray)) {
    subscriptionsArray.forEach(doUnsubscribe);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AutoUnsubscribe(config: { exclude?: string[]; includeArrays?: string[] } = { exclude: [], includeArrays: [] }): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (constructor: any): any => {
    const originalOnDestroy = constructor.prototype.ngOnDestroy;
    const excludeProperties = config.exclude || [];
    const includePropertiesAsArrays = Array.from(new Set(config.includeArrays || []));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor.prototype.ngOnDestroy = function (...args: any): void {
      for (const propertyName of Object.keys(this)) {
        if (excludeProperties.includes(propertyName)) {
          continue;
        }
        const property = this[propertyName];
        if (includePropertiesAsArrays.includes(propertyName)) {
          doUnsubscribeIfArray(property);
        } else {
          doUnsubscribe(property);
        }
      }

      if (originalOnDestroy && typeof originalOnDestroy === 'function') {
        originalOnDestroy.apply(this, args);
      }
    };
  };
}
