export function run<R>(action: () => R): R {
    return action()
}

export function take<T, R>(resource: T, action: (resource: T) => R): R {
    return action(resource);
}

export function takeNotNull<T, R>(resource: T, action: (resource: T) => R): R {
    if (resource != null) {
        return take(resource, action);
    }
    return null;
}

export function backup<T>(value: T, ...backups: Array<T>): T {
    if (value != null) {
        return value;
    }
    for (let i = 0; i < backups.length; i++) {
        if (backups[0] != null) {
            return backups[0]
        }
    }
}

export function safe<T>(value: any, property: string): T {
    if (value != null) {
        return value[property]
    }
    return null;
}
