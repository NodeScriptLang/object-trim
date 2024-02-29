# Object Trim

Trims objects recursively by applying various rules:

- total maximum of members (counting all array items and object keys, recursively)
- maximum number of items in each array
- maximum number of keys in each object
- maximum string length

Useful to create "previews" of big objects that don't destroy your database.

## Highlights

- 🔥 Zero dependencies
- 🗜 Tidy and compact
- 💻 Works in browser

## Usage

```ts
import { objectTrim } from '@nodescript/object-trim';

const obj = {
    foo: {
        a: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        b: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        c: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        d: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        e: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        g: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    bar: {
        a: 'Loooooooooooong string',
        b: 'Loooooooooooong string',
        c: 'Loooooooooooong string',
        d: 'Loooooooooooong string',
        e: 'Loooooooooooong string',
        f: 'Loooooooooooong string',
        g: 'Loooooooooooong string',
        h: 'Loooooooooooong string',
        i: 'Loooooooooooong string',
        j: 'Loooooooooooong string',
    }
};

const trimmed = objectTrim(obj, {
    maxArrayLength: 2,
    maxObjectFields: 4,
    maxStringLength: 4,
    maxTotalFields: 16,
});
```

Result:

```js
{
    foo: {
        a: [0, 1],
        b: [0, 1],
        c: [0, 1],
        d: [0, 1],
    },
    bar: {
        a: 'Loo…',
        b: 'Loo…',
    },
}
```

Or with `addPlaceholders: true` option:

```js
{
    foo: {
        a: [ 0, 1, '8 more items' ],
        b: [ 0, 1, '8 more items' ],
        c: [ 0, 1, '8 more items' ],
        d: [ 0, 1, '8 more items' ],
        '...': '3 more key(s)'
    },
    bar: {
        a: 'Loo…',
        b: 'Loo…',
        '...': '8 more key(s)',
    }
}
```
