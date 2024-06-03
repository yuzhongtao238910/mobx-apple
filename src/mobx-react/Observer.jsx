import {Reaction} from "mobx";
import {useState} from "react";

export function Observer({children}) {
    const [, setState] = useState({})
    const forceUpdate = () => setState({})
    let reaction = new Reaction("observer", forceUpdate)
    let rendering;
    reaction.track(() => {
        rendering = children()
    })
    return rendering
}
