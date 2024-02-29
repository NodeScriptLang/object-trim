export type ObjectTrimOptions = {
    maxTotalFields: number;
    maxObjectFields: number;
    maxStringLength: number;
    maxArrayLength: number;
    addPlaceholders: boolean;
    stringAbbrSymbol: string;
    fieldsSoFar: number;
};

export function objectTrim(obj: any, options: Partial<ObjectTrimOptions> = {}): any {
    return trimAny(obj, {
        maxTotalFields: 1000,
        maxObjectFields: 100,
        maxStringLength: 200,
        maxArrayLength: 100,
        addPlaceholders: false,
        stringAbbrSymbol: '…',
        fieldsSoFar: 0,
        ...options,
    });
}

function trimAny(value: any, options: ObjectTrimOptions) {
    if (value == null) {
        return value;
    }
    switch (typeof value) {
        case 'object':
            return Array.isArray(value) ?
                trimArray(value, options) :
                trimObject(value, options);
        case 'boolean':
        case 'number':
            return value;
        case 'string':
            return trimString(value, options);
        default:
            return undefined;
    }
}

function trimString(value: string, options: ObjectTrimOptions): string {
    const { maxStringLength, stringAbbrSymbol } = options;
    const maxLength = maxStringLength - stringAbbrSymbol.length;
    if (value.length <= maxLength) {
        return value;
    }
    return value.substring(0, maxLength) + stringAbbrSymbol;
}

function trimObject(obj: Record<any, any>, options: ObjectTrimOptions) {
    const result: Record<any, any> = {};
    let i = 0;
    const keys = Object.keys(obj);
    for (const key of keys) {
        const isTrimmed = options.fieldsSoFar >= options.maxTotalFields || i >= options.maxObjectFields;
        if (isTrimmed) {
            if (options.addPlaceholders) {
                result['...'] = `${keys.length - i} more key(s)`;
            }
            break;
        }
        options.fieldsSoFar += 1;
        result[key] = trimAny(obj[key], options);
        i += 1;
    }
    return result;
}

function trimArray(arr: any[], options: ObjectTrimOptions) {
    const result: any[] = [];
    for (let i = 0; i < arr.length; i++) {
        const isTrimmed = options.fieldsSoFar >= options.maxTotalFields || i >= options.maxArrayLength;
        if (isTrimmed) {
            if (options.addPlaceholders) {
                result.push(`${arr.length - i} more items`);
            }
            break;
        }
        options.fieldsSoFar += 1;
        result.push(trimAny(arr[i], options));
    }
    return result;
}
