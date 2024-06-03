import React, {useState} from "react";
import { Reaction, observable } from 'mobx'
export function useObserver(fn) {
    // 仅仅为了得到一个强行更新组件的函数
    const [, setState] = useState({})
    const forceUpdate = () => setState({})
    let reaction = new Reaction("observer", forceUpdate)
    let rendering;
    reaction.track(() => {
        rendering = fn()
    })
    return rendering
}
export function observer(oldComponent) {
    if (oldComponent.prototype && oldComponent.prototype.isReactComponent) {
        return makeClassComponentObserver(oldComponent)
    }
    let observerComponent = (props) => {
        return useObserver(() => oldComponent(props))
    }
    return observerComponent
}


function makeClassComponentObserver(ClassComponent) {
    const prototype = ClassComponent.prototype
    const originalRender = prototype.render
    prototype.render = function () {
        const boundOriginalRender = originalRender.bind(this)
        const reaction = new Reaction("render", () => React.Component.prototype.forceUpdate.call(this))
        let rendering;
        reaction.track(() => {
            rendering = boundOriginalRender()
        })
        return rendering
    }
    return ClassComponent
}

export function useLocalObservable(initializer) {
    return useState(() => observable(initializer(), {}, {
        autoBind: true
    }))[0]
}




















