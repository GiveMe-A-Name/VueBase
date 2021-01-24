class Watcher {
    constructor(vm, key, callback = value => { }) {
        this.vm = vm
        // 
        this.key = key

        this.callback = callback

        this.oldValue = this.getOldValue()
    }
    getOldValue() {
        // 把Watcher对象挂载到 Dep类的静态属性 target中
        Dep.target = this
        // 收集得到模板中的旧值
        const oldVal = Compiler.compileUtil.getVal(this.key, this.vm)
        // 清空watcher对象,避免重复设置
        Dep.target = null

        return oldVal
    }
    // 当数据发生改变时更新视图
    update() {
        const newVal = Compiler.compileUtil.getVal(this.key, this.vm)
        if (newVal !== this.oldValue) {
            // 当数据发生变化的时候，使用newVal调用callback函数
            this.callback(newVal)
        }
    }
}