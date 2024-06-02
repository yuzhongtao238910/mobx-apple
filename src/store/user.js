import { makeAutoObservable } from "mobx"
class UserStore {
    username = ""
    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true
        })
    }
    get isLogin() {
        return this.username.length > 0
    }
    login(username) {
        this.username =username
    }
    logout() {
        this.username = ''
    }
}
const userStore = new UserStore()
export default userStore
