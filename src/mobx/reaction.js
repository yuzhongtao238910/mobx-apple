import { globalState} from "./utils.js"
export default class Reaction {
    constructor(name, onInvalidate) {
        this.name = name
        this.onInvalidate = onInvalidate
        this.observing = [] // 表示它观察到了哪些可观察到的变量
    }
    track(fn) { // trackingDerivation === reaction
        globalState.trackingDerivation = this // 当前正在执行的reaction
        fn.call()
        globalState.trackingDerivation = null // 重置为null
        bindDependencies(this) // 绑定 依赖
    }
    schedule() {
        globalState.pendingReactions.push(this)
        runReactions()
    }
    runReaction() {
        this.onInvalidate()
    }
}
function bindDependencies(derivation) {
    const { observing } = derivation
    observing.forEach((observableValue) => {
        observableValue.observers.add(derivation)
    })
}
function runReactions() {
    const allReactions = globalState.pendingReactions
    let reaction
    while (reaction = allReactions.shift()) {
        reaction.runReaction()
    }
}














