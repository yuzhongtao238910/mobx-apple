import { makeAutoObservable} from "mobx"
import { useObserver, observer, useLocalObservable } from "./mobx-react"
import {  Observer } from "./mobx-react/Observer.jsx"
import React from "react";
// class Store {
//     number = 1;
//     constructor() {
//         makeAutoObservable(this, {}, {
//             autoBind: true
//         })
//     }
//     add() {
//         this.number++
//     }
// }
//
// let store = new Store()

// export default function () {
//     return (
//         <Observer>
//             {
//                 () => {
//                     return (
//                         <div>
//                             <p>{store.number}</p>
//                             <button onClick={store.add}>++</button>
//                         </div>
//                     )
//                 }
//             }
//         </Observer>
//     )
    // return useObserver(() => {
    //     return (
    //         <div>
    //             <p>{store.number}</p>
    //             <button onClick={store.add}>++</button>
    //             <Observer>
    //                 {
    //                     () => {
    //                         return (
    //                             <h2>22222</h2>
    //                         )
    //                     }
    //                 }
    //             </Observer>
    //         </div>
    //     )
    // })
// }

// export default observer(function () {
//     return (
//         <div>
//             <p>{store.number}</p>
//             <button onClick={store.add}>++</button>
//         </div>
//     )
// })

// @observer
// class Counter extends React.Component {
//     render() {
//         return (
//             <div>
//                 <p>{store.number}</p>
//                 <button onClick={store.add}>++</button>
//             </div>
//         )
//     }
// }

// export default observer(Counter)


export default function (props) {
    const store = useLocalObservable(() => {
        return {
            number: 1,
            add() {
                this.number++
            }
        }
    })
    return (
        <Observer>
            {
                () => {
                    return (
                        <div>
                            <p>{store.number}</p>
                            <button onClick={store.add}>++</button>
                        </div>
                    )
                }
            }
        </Observer>

    )
}















