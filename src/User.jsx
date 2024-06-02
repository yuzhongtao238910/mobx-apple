import { Observer } from "mobx-react"
import {useContext, useRef} from "react";
import StoreContext from "./context.jsx"
const User = () => {
    const { userStore} = useContext(StoreContext)
    // console.log(userStore)
    const ref = useRef()
    return (
        <Observer>
            {() => {
                return (
                    <div>
                        {userStore.isLogin ? (
                            <>
                                <p>
                                    {userStore.username}
                                </p>
                                <button onClick={userStore.logout}>推出</button>
                            </>

                        ) : (
                            <>
                                <input ref={ref} type="text" />
                                <button onClick={() => userStore.login(ref.current.value)}>登录</button>
                            </>
                        )}
                    </div>
                )
            }}
        </Observer>
    )
}
export default User





















