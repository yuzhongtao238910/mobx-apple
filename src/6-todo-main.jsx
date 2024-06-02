// import { createRoot} from "react-dom/client"
// import App from "./App.jsx"
//
// const root = createRoot(document.getElementById("root"))
//
// root.render(
//     <App></App>
// )

import {autorun, observable} from "mobx"
let obj = {
    person: {
        name: "apple"
    }
}
const proxyObj = observable(obj)
autorun(() => {
    console.log(proxyObj.person.name)
    //

})
const { person }= proxyObj // 解构出来就不是响应式对象了
let {name } = person
name = "aaaaa"










