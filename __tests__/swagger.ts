/*
 * @Autor: hui.wang
 * @Date: 2022-02-20 16:16:50
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-02-20 17:47:48
 * @emial: hui.wang@bizfocus.cn
 */
import { typeParser } from '../src/swagger'
import { definitions } from '../test-data/swagger'

describe('test swagger typeParser', () => {
    it('swagger typeParser should work with primitive type', () => {
        expect(typeParser(definitions)).toEqual(
            `export interface ApiResponse {
    code?: number;
    type?: string;
    message?: string;
};
export interface Category {
    id?: number;
    name?: string;
};
export interface Pet {
    id?: number;
    category?: Category;
    name: string;
    photoUrls: string[];
    tags?: Tag[];
    status?: 'available' | 'pending' | 'sold';
};
export interface Tag {
    id?: number;
    name?: string;
};
export interface Order {
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    status?: 'placed' | 'approved' | 'delivered';
    complete?: boolean;
};
export interface User {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    userStatus?: number;
};
`
        )
    })
})
