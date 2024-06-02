import {autorun, observable} from "mobx"

let obj = {
    name: 1
}
const proxyObj = observable(obj)
autorun(() => {
    console.log(proxyObj.name)
})
proxyObj.name = 2
