/*
 * @Autor: hui.wang
 * @Date: 2022-02-19 21:47:49
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-02-20 16:45:46
 * @emial: hui.wang@bizfocus.cn
 */
// type Extract<T> = T extends Array<infer Item>
//     ? Item
//     : T

// TODO: Type 'T' is not assignable to type 'Extract<T>'.
// export function last<T>(param: T): Extract<T> {
//     if (Array.isArray(param)) {
//         return param[param.length - 1]
//     }

//     return param
// }

export function last<T>(param: T[]): T {
    return param[param.length - 1]
}
