/*
useLocalObservable 返回对象的所有属性都是可观察的 getter将转换为计算属性 方法将绑定存储并且自动应用mobx事务
 */
import {useLocalObservable, Observer} from "mobx-react"
export default function () {
    // 自动变为可观察的
    const store = useLocalObservable(() =>({
        number: 1,
        add() {
            this.number++
        }
    }))
    return (
        <Observer>
            {
                () => (
                    <div>
                        <p>{store.number}</p>
                        <button onClick={store.add}>++</button>
                    </div>
                )
            }
        </Observer>
    )
}
