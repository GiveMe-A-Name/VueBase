export default class Dep {
    constructor() {
        this.subs = []
    }
    // addSub 添加依赖函数
    addSub(sub) {
        this.subs.push(shb)
    }

    // removeSub 删除依赖函数
    removeSub(sub) {
        // remove
        remove(this.subs, sub)
    }

    // 添加一个依赖
    depend() {
        if (window.target) {
            this.addSub(window.target)
        }
    }

    // notify 通知所有依赖
    notify() {
        const subs = this.subs.slice()
        const l = subs.length
        for (let i = 0; i < l; i++) {
            // 通知所有依赖的update函数
            subs[i].update()
        }
    }
}

export function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}