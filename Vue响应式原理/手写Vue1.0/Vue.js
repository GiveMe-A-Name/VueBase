class Vue {
    constructor(options) {
        // 如果Vue传入的不是对象，就抛出一个错误
        if (!(options instanceof Object)) {
            throw new TypeError('The parameter type should be an Object')
        }

        // 保存options抽取内部数据
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = options.el

        // 把options.data转化为响应式的数据,
        // 使用Object.definePropertyAPI
        // 将属性转化为getter & setter
        this._proxyData(this.$data)

        // 调用Observer类, 进行数据监听
        new Observer(this.$data)

        // 如果是用定义，就用Compiler函数进行css选择
        if (this.$el) new Compiler(this.$el, this)
    }

    // 注册响应式数据函数
    // 利用Object,definePrototype 进行数据劫持
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumberable: true,
                configurable: true,
                set(newVal) {
                    if (newVal !== data[key]) {
                        data[key] = newVal
                    }
                },
                get() {
                    return data[key]
                }
            })
        })
    }


}