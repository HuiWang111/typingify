/*
 * @Autor: hui.wang
 * @Date: 2022-02-20 17:33:45
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-02-20 17:46:54
 * @emial: hui.wang@bizfocus.cn
 */
import { typeParser } from '../src/object'

describe('test object typeParser', () => {
    it('object typeParser should work with primitive type', () => {
        expect(typeParser({
            a: 'a',
            b: 1,
            c: false,
            d: undefined,
            e: null,
            f: Symbol(),
            h: 2n ** 53n,
            i: () => {
                return 1
            }
        })).toEqual(
            `export interface SomeType {
    a: string;
    b: number;
    c: boolean;
    d: undefined;
    e: null;
    f: symbol;
    h: bigint;
    // TODO: this is a function
    i: () => void;
}
`
        )
    })
})
