let mobxGuid = 0
export const $mobx = Symbol("mobx administration") // 一个标识
export function isObject(v) {
    return typeof v === 'object' && v !== null
}

export function getNextId() {
    return ++mobxGuid
}

// 添加隐藏属性
export function addHiddenProp(obj, propName, value) {
    Object.defineProperty(obj, propName, {
        enumerable: false,
        writable: true,
        configurable: false,
        value
    })
}

export function getAdm(target) {
    return target[$mobx]
}



























