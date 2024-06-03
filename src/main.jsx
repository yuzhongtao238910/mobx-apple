// function logger(target) {
//     console.log(target)
// }
// @logger
// class Person {
//     constructor() {
//         this.value = "333"
//     }
// }
// import {
//     observable, autorun
// } from "mobx"
//
// let obj = {
//     name: 1
// }
// let proxyObj = observable(obj)
// console.log(proxyObj)
//
// // autorun 负责创建一个响应器 其实就是观察者 负责观察对应的值
// autorun(() => {
//     console.log(proxyObj.name)
// })

// import {autorun, observable} from "./mobx"
// let obj = {
//     name: 1,
//     age: 2
// }
// let obj2 = {
//     home: {
//         name: "beijing"
//     }
// }
// let proxyObj = observable(obj)
//
// autorun(() => {
//     console.log(proxyObj.name)
// })
// setTimeout(() => {
//     proxyObj.name = "9999"
// }, 1000)



import { createRoot } from "react-dom/client"
import Counter from "./Counter.jsx"


const root = createRoot(document.getElementById("root"))


root.render(
    <Counter></Counter>
)







