import {makeAutoObservable} from "mobx";
import { observer, Observer, useObserver } from "mobx-react"
import React from "react"

class Store {
    number = 1
    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true
        })
    }
    add() {
        this.number++
    }
}
let store = new Store()


// function Counter() {
//     return (
//         <>
//             <h1>238910 - {store.number}</h1>
//             <button onClick={store.add}>++</button>
//         </>
//     )
// }
// export default observer(Counter)


// 类组件的写法   observer装饰的是整个组件  同理于 observer(Counter)
// @observer
// class Counter extends React.Component {
//     render() {
//         return (
//             <>
//                 <h1>238910 - {store.number}</h1>
//                 <button onClick={store.add}>++</button>
//             </>
//         )
//     }
// }
//
// export default Counter

// function Child() {
//     console.log("render - child")
//     return (
//         <div>Child</div>
//     )
// }
// // Observer 设置响应式的区域 精细化更新
// export default function Counter() {
//     return (
//         <div>
//             <Observer>
//                 {
//                     () => (
//                         <>
//                             <p>{store.number}</p>
//                             <button onClick={store.add}>+++</button>
//                         </>
//                     )
//                 }
//             </Observer>
//             <Child></Child>
//         </div>
//     )
// }

export default function () {
    return useObserver(() => {
        return (
            <>
                <p>{store.number}</p>
                <button onClick={store.add}>+++</button>
            </>
        )
    })
}







