import React from "react"
import store from "./store"
import User from "./User"
import Todos from "./Todos"
import StoreContext from "./context.jsx"

export default function App() {
    return (
        <StoreContext.Provider value={store}>
            <User></User>
            <hr/>
            <Todos></Todos>
        </StoreContext.Provider>
    )
}












