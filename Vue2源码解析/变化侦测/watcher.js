export default class Watcher {
    // 在模板上，
    constructor(vm, expOrFn, callback = value => { }) {
        // vm: Vue实例
        // expOrFn: key值路径 例如：'data.a.b.c'的字符串路径
        // cb: 回调函数
        this.vm = vm
        // 回调函数
        this.callback = callback
        // getter: 对字符串路径进行解析，解析结果赋值给getter
        this.getter = parsePath(expOrFn)

        this.value = this.get()
    }

    get() {
        // 把需要收集的依赖放到全局作用域中
        window.target = this
        const vm = this.vm

        // 通过key路径解析，得到需要的value
        let value = this.getter.call(vm, vm)

        // 把全局作用域的临时依赖，进行回收
        window.target = undefined
        return value
    }

    update() {
        // 首先获取他们的旧值
        const oldValue = this.value
        // 获取他们的的新值, 
        this.value = this.get()
        const newValue = this.value // 获取他们的的新值
        // 进行回调函数，并把新值和旧值传入给回调函数
        // 调用回调函数，从而更新视图。
        this.callBack.call(this.vm, newValue, oldValue)
    }

}

/**
 * Parse simple path.
 * 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
 * 例如：
 * data = {a:{b:{c:2}}}
 * parsePath('a.b.c')(data)  // 2
 */
const bailRE = /[^\w.$]/
export function parsePath(path) {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}