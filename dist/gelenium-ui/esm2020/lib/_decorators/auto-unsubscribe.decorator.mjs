const doUnsubscribe = (subscription) => {
    if (subscription != null && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doUnsubscribeIfArray = (subscriptionsArray) => {
    if (Array.isArray(subscriptionsArray)) {
        subscriptionsArray.forEach(doUnsubscribe);
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AutoUnsubscribe(config = { exclude: [], includeArrays: [] }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (constructor) => {
        const originalOnDestroy = constructor.prototype.ngOnDestroy;
        const excludeProperties = config.exclude || [];
        const includePropertiesAsArrays = Array.from(new Set(config.includeArrays || []));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor.prototype.ngOnDestroy = function (...args) {
            for (const propertyName of Object.keys(this)) {
                if (excludeProperties.includes(propertyName)) {
                    continue;
                }
                const property = this[propertyName];
                if (includePropertiesAsArrays.includes(propertyName)) {
                    doUnsubscribeIfArray(property);
                }
                else {
                    doUnsubscribe(property);
                }
            }
            if (originalOnDestroy && typeof originalOnDestroy === 'function') {
                originalOnDestroy.apply(this, args);
            }
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by11bnN1YnNjcmliZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9nZWxlbml1bS11aS9zcmMvbGliL19kZWNvcmF0b3JzL2F1dG8tdW5zdWJzY3JpYmUuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sYUFBYSxHQUFHLENBQUMsWUFBZ0QsRUFBRSxFQUFFO0lBQ3pFLElBQUksWUFBWSxJQUFJLElBQUksSUFBSSxPQUFPLFlBQVksQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO1FBQzFFLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUM1QjtBQUNILENBQUMsQ0FBQztBQUVGLDhEQUE4RDtBQUM5RCxNQUFNLG9CQUFvQixHQUFHLENBQUMsa0JBQXlCLEVBQUUsRUFBRTtJQUN6RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUNyQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDM0M7QUFDSCxDQUFDLENBQUM7QUFFRiw4REFBOEQ7QUFDOUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxTQUEyRCxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRTtJQUMzSCw4REFBOEQ7SUFDOUQsT0FBTyxDQUFDLFdBQWdCLEVBQU8sRUFBRTtRQUMvQixNQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQzVELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDL0MsTUFBTSx5QkFBeUIsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVsRiw4REFBOEQ7UUFDOUQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsVUFBVSxHQUFHLElBQVM7WUFDeEQsS0FBSyxNQUFNLFlBQVksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtvQkFDNUMsU0FBUztpQkFDVjtnQkFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3BDLElBQUkseUJBQXlCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUNwRCxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDaEM7cUJBQU07b0JBQ0wsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN6QjthQUNGO1lBRUQsSUFBSSxpQkFBaUIsSUFBSSxPQUFPLGlCQUFpQixLQUFLLFVBQVUsRUFBRTtnQkFDaEUsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyQztRQUNILENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkb1Vuc3Vic2NyaWJlID0gKHN1YnNjcmlwdGlvbjogeyB1bnN1YnNjcmliZTogKCkgPT4gdm9pZCB9IHwgbnVsbCkgPT4ge1xuICBpZiAoc3Vic2NyaXB0aW9uICE9IG51bGwgJiYgdHlwZW9mIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuY29uc3QgZG9VbnN1YnNjcmliZUlmQXJyYXkgPSAoc3Vic2NyaXB0aW9uc0FycmF5OiBhbnlbXSkgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShzdWJzY3JpcHRpb25zQXJyYXkpKSB7XG4gICAgc3Vic2NyaXB0aW9uc0FycmF5LmZvckVhY2goZG9VbnN1YnNjcmliZSk7XG4gIH1cbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgZnVuY3Rpb24gQXV0b1Vuc3Vic2NyaWJlKGNvbmZpZzogeyBleGNsdWRlPzogc3RyaW5nW107IGluY2x1ZGVBcnJheXM/OiBzdHJpbmdbXSB9ID0geyBleGNsdWRlOiBbXSwgaW5jbHVkZUFycmF5czogW10gfSk6IGFueSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHJldHVybiAoY29uc3RydWN0b3I6IGFueSk6IGFueSA9PiB7XG4gICAgY29uc3Qgb3JpZ2luYWxPbkRlc3Ryb3kgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUubmdPbkRlc3Ryb3k7XG4gICAgY29uc3QgZXhjbHVkZVByb3BlcnRpZXMgPSBjb25maWcuZXhjbHVkZSB8fCBbXTtcbiAgICBjb25zdCBpbmNsdWRlUHJvcGVydGllc0FzQXJyYXlzID0gQXJyYXkuZnJvbShuZXcgU2V0KGNvbmZpZy5pbmNsdWRlQXJyYXlzIHx8IFtdKSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnkpOiB2b2lkIHtcbiAgICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIG9mIE9iamVjdC5rZXlzKHRoaXMpKSB7XG4gICAgICAgIGlmIChleGNsdWRlUHJvcGVydGllcy5pbmNsdWRlcyhwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSB0aGlzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgIGlmIChpbmNsdWRlUHJvcGVydGllc0FzQXJyYXlzLmluY2x1ZGVzKHByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICBkb1Vuc3Vic2NyaWJlSWZBcnJheShwcm9wZXJ0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9VbnN1YnNjcmliZShwcm9wZXJ0eSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9yaWdpbmFsT25EZXN0cm95ICYmIHR5cGVvZiBvcmlnaW5hbE9uRGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcmlnaW5hbE9uRGVzdHJveS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuIl19