/*
makeObservable:
    可以捕获 已经存在的对象属性 并且使他们可观察，任何的js对象（包括类的实例）

    都可以作为 target 被传递给这个函数，一般情况下 makeObservable 是在类的构造函数之中使用，并且他的第一个参数是this

 */
import {autorun, makeObservable, observable} from "mobx";

class Doubler {
    value
    constructor(value) {
        makeObservable(this, {
            value: observable
        })
        this.value = value
    }
}

let doubler = new Doubler(333)
autorun(() => {
    console.log(doubler.value)
})
doubler.value = '33'











