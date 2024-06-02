import { observable, autorun } from "mobx"
import ReactDOM from 'react-dom/client'
// actions -> observable -> 计算值 -》 render
function App() {
    return (
        <h1>2</h1>
    )
}
function logger() {}


@logger
class Person {

}
let obj = {
    name: "appkle"
}
// 把一个普通对象变为可观察的对象
let proxyObj = observable(obj)
console.log(proxyObj, 20) // 把一个普通对象 变为 代理对象
/**
 * reactions: 的 目的 是自动发生的副作用 进行建模 他们的意义在于为可观察状态创建消费者 以及每当关联者的值发生变化的时候
 * 自动的运行副作用
 *
 * autorun：接受一个函数作为参数，每当该函数 观察到的值 发生变化的时候，就会自动的运行
 *
 * 默认会自动的运行一次
 */

// autorun 会自动运行一次，可以创建一个响应，以后每当依赖的可观察值发生变化后 都会重新的执行
autorun(() => {
    console.log(proxyObj.name)
})
proxyObj.name = "3233"

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)


















