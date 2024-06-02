/*
makeObservable:
    可以捕获 已经存在的对象属性 并且使他们可观察，任何的js对象（包括类的实例）

    都可以作为 target 被传递给这个函数，一般情况下 makeObservable 是在类的构造函数之中使用，并且他的第一个参数是this

makeAutoObservable:
    自动推断：
    所有的自有属性都是 obserable
    所有的getters 都是成为 computed
    所有的setters 都是 action
    所有的prototype之中的functions都成为 autoAction
    所有的prototype之中的generator functions 都将成为 flow
    在overrides参数之中标记为false的成员将不会被添加注解
 */
import {makeAutoObservable, action, autorun, computed, flow, makeObservable, observable} from "mobx";

class Doubler {
    PI=3.14
    value
    constructor(value) {
        // makeObservable(this, {
        //     value: observable,
        //     double: computed,   // 计算属性
        //     increment: action,   // action
        //     asyncIncrement: flow,
        //     fetch1: action.bound // 自动绑定this的实例
        // })
        makeAutoObservable(this, {
            PI: false // 特殊处理一下
        }, {
            autoBind: true // 自动绑定 this
        })
        this.value = value

    }
    get double() {
        return this.value * 2
    }
    // action 有很多的好处，1.action的内部会使用事务的机制 外界观察完了，才会走 状态的修改是批量的
    // 2. 只在action之中修改状态 比较好的排查错误
    increment() {
        this.value++
        this.value++
    }
    async fetch1() {
        let value = await new Promise(resolve => {
            setTimeout(() => {
                resolve(100)
            },1000)
        })
        this.value += value
    }
    * asyncIncrement() { // redux - thunk redux-saga
        let value = yield new Promise(resolve => {
            setTimeout(() => {
                resolve(8)
            },1000)
        })
        this.value += value
    }
}

let doubler = new Doubler(333)
autorun(() => {
    console.log(doubler.value)
    console.log(doubler.double)
})
doubler.increment()
doubler.asyncIncrement()
// doubler.fetch1()
// doubler.value = 1











