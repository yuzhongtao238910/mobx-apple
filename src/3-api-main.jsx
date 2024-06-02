/*
reaction(() => value, (value, previousValue, reaction) => {
    sideEffect
}, options?)
reaction 类似于 autorun 但是可以让更加精细的控制要跟踪的可观察对象，他接受两个函数作为参数，第一个data函数
其是被跟踪的函数并且其返回值将会作为第二个函数 effect 函数的输入，重要的是注意：副作用只会对data函数之中被访问过的数据做出反应

这些数据可能少于effect函数之中实际使用的数据


when（）
    when(predicate: () => boolean, effect?: () => void, options)

    when 会观察 并运行给定的predicate函数，直到他返回true，一旦 predicate 返回了true，给定的effect函数就会执行 并且
    自动执行器函数将会被清理掉

    如果没有传入effect函数，when函数 返回一个promise类型的disposer 并允许手动取消

runInAction:
    使用方式： runInAction(fn)
    使用 runInAction 来创建一个会被立即调用的临时action 在异步进程之中非常有用
 */
import {autorun, makeAutoObservable, reaction, runInAction, when} from "mobx";

class Doubler {
    PI= 3.41
    value
    age = 100
    constructor(value) {
        makeAutoObservable(this, {
            PI: false,
        }, {
            autoBind: true
        })
        this.value = value
    }
    get double() {
        return this.value * 2
    }
    add() {
        this.value++
        this.value++
    }
    *fetch() {
        let amount = yield new Promise(resolve => {
            setTimeout(() => {
                resolve(1000)
            }, 2000)
        })
        this.value += amount
    }
}
let double = new Doubler(100)
// 不会立刻执行 只在值发生改变之后执行
reaction(() => double.value,  // data函数 他会返回一个值
    (value, previousValue) => { // 副作用 effect函数
    console.log(value)
    console.log(previousValue)
})

autorun(() => {
    console.log("======")
})
runInAction(() => {
    double.value++
    double.value++
    double.value++
    double.value++
})
double.fetch()
double.add()
// 只会走一次
let disposer = when(
    () => double.value > 3,
    () => {
        console.log(double.value, 61)
    }
)
disposer() // 一旦执行了，表示取消等待











