import { makeAutoObservable } from "mobx"

class TodosStore {
    list = []
    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true
        })
    }
    add(todo) {
        this.list.push(todo)
    }
    get unCompletedCount() {
        return this.list.filter(todo => !todo.completed).length
    }
}
class TodoStore {
    text = ''
    completed = false
    constructor(text) {
        makeAutoObservable(this, {}, {
            autoBind: true
        })
        this.text = text
    }
    toggle() {
        this.completed = !this.completed
    }
}

// const todoStore = new TodoStore()
// export default todoStore

const todosStore = new TodosStore()
export default todosStore
export {
    TodoStore
}













