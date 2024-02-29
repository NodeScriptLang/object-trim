import assert from 'assert';

import { objectTrim } from '../main/index.js';

describe('objectTrim', () => {

    describe('maxStringLength', () => {

        it('trims strings recursively', () => {
            const obj = {
                foo: 'Hello World!',
                bar: [
                    'Hello World!',
                    {
                        baz: 'Hello World!',
                    },
                ],
                short: 'Hi!',
            };
            const trimmed = objectTrim(obj, {
                maxStringLength: 6,
            });
            assert.deepStrictEqual(trimmed, {
                foo: 'Hello…',
                bar: [
                    'Hello…',
                    {
                        baz: 'Hello…',
                    },
                ],
                short: 'Hi!',
            });
        });

        it('supports custom abbr symbol', () => {
            const obj = {
                foo: 'Hello World!',
                bar: [
                    'Hello World!',
                    {
                        baz: 'Hello World!',
                    },
                ],
                short: 'Hi!',
            };
            const trimmed = objectTrim(obj, {
                maxStringLength: 6,
                stringAbbrSymbol: '†'
            });
            assert.deepStrictEqual(trimmed, {
                foo: 'Hello†',
                bar: [
                    'Hello†',
                    {
                        baz: 'Hello†',
                    },
                ],
                short: 'Hi!',
            });
        });

    });

    describe('maxTotalFields', () => {

        it('drops fields after reaching global maximum', () => {
            const obj = {
                foo: 1,
                bar: [
                    3,
                    {
                        baz: 5,
                        qux: 6,
                    },
                    7,
                    8,
                    9,
                ],
                quux: 10,
            };
            const trimmed = objectTrim(obj, {
                maxTotalFields: 5,
            });
            assert.deepStrictEqual(trimmed, {
                foo: 1,
                bar: [
                    3,
                    {
                        baz: 5,
                    },
                ],
            });
        });

        it('can add placeholders', () => {
            const obj = {
                foo: 1,
                bar: [
                    3,
                    {
                        baz: 5,
                        qux: 6,
                    },
                    7,
                    8,
                    9,
                ],
                quux: 10,
            };
            const trimmed = objectTrim(obj, {
                maxTotalFields: 5,
                addPlaceholders: true,
            });
            assert.deepStrictEqual(trimmed, {
                foo: 1,
                bar: [
                    3,
                    {
                        baz: 5,
                        '...': '1 more key(s)'
                    },
                    '3 more items',
                ],
                '...': '1 more key(s)',
            });
        });

    });

    describe('maxObjectFields', () => {

        it('trims objects by length', () => {
            const obj = {
                nested: {
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4,
                },
                one: 1,
                two: 2,
                three: 3,
                four: 4,
            };
            const trimmed = objectTrim(obj, {
                maxObjectFields: 2,
            });
            assert.deepStrictEqual(trimmed, {
                nested: {
                    one: 1,
                    two: 2,
                },
                one: 1,
            });
        });

    });

    describe('maxArrayLength', () => {

        it('trims arrays by length', () => {
            const obj = {
                one: [1, 2, 3, 4],
                two: [1, 2, 3, 4],
                nested: [
                    [1, 2, 3],
                    [1, 2, 3],
                    [1, 2, 3],
                ]
            };
            const trimmed = objectTrim(obj, {
                maxArrayLength: 2,
            });
            assert.deepStrictEqual(trimmed, {
                one: [1, 2],
                two: [1, 2],
                nested: [
                    [1, 2],
                    [1, 2],
                ]
            });
        });

    });

    describe('all together', () => {

        it('trims big object', () => {
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
            assert.deepStrictEqual(trimmed, {
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
            });
        });

    });

});
