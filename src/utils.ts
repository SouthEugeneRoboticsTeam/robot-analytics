export function run<R>(action: () => R): R {
    return action()
}

export function take<T, R>(resource: T, action: (resource: T) => R): R {
    return action(resource);
}
