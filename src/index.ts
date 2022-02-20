/*
 * @Autor: hui.wang
 * @Date: 2022-02-19 19:22:43
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-02-20 16:19:04
 * @emial: hui.wang@bizfocus.cn
 */
import axios from 'axios'
import { typeParser as typeParserBySwagger } from './swagger'

(async function () {
    /**
     * @param {object} res.data.paths api paths
     * @param {object} res.data.definitions data model
     */
    const res = await axios.get('https://petstore.swagger.io/v2/swagger.json')
    const { definitions } = res.data
    const code = typeParserBySwagger(definitions)

    // console.log(JSON.stringify(definitions, null, 4))
    // console.log(code)
})()
