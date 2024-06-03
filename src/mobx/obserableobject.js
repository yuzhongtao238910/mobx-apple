/*
target -> obserableObjectAdministartion 可观察对象的管理器

 */
import {getNextId, addHiddenProp, $mobx, getAdm, globalState} from "./utils.js"
class ObservableValue {
    constructor(value) {
        this.value = value
        this.observers = new Set() // 此可以观察值的监听者 观察者
    }
    get() {
        reportObserved(this)
        return this.value
    }
    setNewValue(newValue) {
        this.value = newValue
        propagateChanged(this) // 广播
    }
}
function propagateChanged(observableValue) {
    const {observers} = observableValue
    observers.forEach(observer => {
        observer.runReaction()
    })
}
function reportObserved(observableValue) {
    const trackingDerivation = globalState.trackingDerivation
    if (trackingDerivation) {
        trackingDerivation.observing.push(observableValue)
    }
}
class ObservableObjectAdministration {
    constructor(target, values, name) {
        this.target = target
        this.values = values // 用来存放属性的信息
        this.name = name
    }
    get(key) {
        return this.target[key]
    }
    set(key, value) {
        // debugger
        if (this.values.has(key)) {
            return this.setObservablePropValue(key, value)
        }
        // this.target[key] = value
    }
    extend(key, descriptor) {
        this.defineObservableProperty(key, descriptor.value) // 1
    }
    defineObservableProperty(key, value) {
        const descriptor = {
            configurable: true,
            enumerable: true,
            get() {
                // this 是实际的代理对象
                return this[$mobx].getObservablePropValue(key)
            },
            set() {
                return this[$mobx].setObservablePropValue(key, value)
            }
        }
        Object.defineProperty(this.target, key, descriptor)
        this.values.set(key, new ObservableValue(value))
    }
    getObservablePropValue(key) {
        return this.values.get(key).get()
    }
    setObservablePropValue(key, value) {
        const observable = this.values.get(key)
        observable.setNewValue(value)
        return true
    }
}
function asObservableObject(target) {
    const name = `ObservableObject@${getNextId()}`
    const adm = new ObservableObjectAdministration(
        target,
        new Map(),
        name
    )
    addHiddenProp(target, $mobx, adm) // target[$mobx] = adm
    return target
}
const objectProxyTraps = {
    get(target, name) {
        return getAdm(target).get(name)
    },
    set(target, name, value) {
        return getAdm(target).set(name, value)
    }
}
function asDynamicObservableObject(target) {
    asObservableObject(target)
    const proxy = new Proxy(target, objectProxyTraps)
    return proxy
}
function extendObservable(proxyObject, properties) {
    // 获取属性描述器
    const descriptors = Object.getOwnPropertyDescriptors(properties)
    const adm = getAdm(proxyObject)
    Reflect.ownKeys(descriptors).forEach(key => {
        adm.extend(key, descriptors[key])
    })
    return proxyObject
}
export function object(target) {
    // 作为动态的可观察对象
    const dynamicObservableObject = asDynamicObservableObject({})
    return extendObservable(dynamicObservableObject, target)
}













































