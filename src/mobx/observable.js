import {
    object
} from "./obserableobject.js"
import { isObject } from "./utils.js"
// set map都支持 但是目前只实现支持obj的
export function observable(v) { // 值的类型可能很多种 每种代理的方式不一样
    if (isObject(v)) {
        return object(v)
    }
}
