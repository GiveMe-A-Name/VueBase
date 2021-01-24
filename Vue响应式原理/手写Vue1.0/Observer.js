class Observer {
    // 进行数据拦截
    constructor(data) {
        // 调用observe对象，进行数据的响应式注册
        this.observe(data)
    }

    // 注册响应式数据
    observe(data) {
        // 如果设置的数据类型为对象就设置为响应式数据
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.definePropertyReactive(data, key, data[key])
            })
        }
    }

    // 设置属性为响应式数据
    definePropertyReactive(obj, key, value) {
        // 利递归使深层属性转换为 响应式数据
        this.observe(value)
        const self = this
        // 负责收集依赖并发送通知
        let dep = new Dep()
        Object.defineProperty(obj, key, {
            enumrable: true,
            configurable: true,
            get() {
                // 订阅数据变化时, 往Dep中添加观察者, 收集依赖;
                // 如果Dep的静态属性有指向，就收集Dep的静态target
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newVal) {
                // 如果新设置的值也为对象, 也转换为响应式数据
                self.observe(newVal)
                if (newVal !== value) {
                    value = newVal
                }
                //  发送通知;
                dep.notify()
            }
        })
    }
}