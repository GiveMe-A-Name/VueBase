class Compiler {
    // 解析指令, 编译模板
    static compileUtil = { // 解析指令的对象

        // getVal 获取指令上的属性值
        getVal(key, vm) {

            // 利用reduce 获取实例对象深层的属性值 
            // 获得key 用.将字符串隔开
            // 并用reduce去获取从实例对象对应key的深层次的值
            return key.split('.').reduce((data, current) => {
                return data[current]
            }, vm.$data)
        },

        // seVal 修改实例上的值
        setVal(key, vm, inputVal) {
            // key: 属性值
            // vm: Vue实例对象
            // inputVal: 输入框的值
            let total = 'vm'
            if (key.split('.').length === 1) vm[key] = inputVal
            else {
                // 进行字符串的拼接
                key.split('.').forEach(k => total += `['${k}']`)
                total += '=' + `${'inputVal'}`
                eval(total) // 利用eval强行将字符串解析为函数执行
            }
        },

        // model 解析v-model指令
        model(node, key, vm) {
            const value = this.getVal(key, vm)
            // 数据 => 视图
            new Watcher(vm, key, newVal => {
                this.updater.modelUpdater(node, newVal)
            })

            // 视图 => 数据
            node.addEventListener('input', e => {
                this.setVal(key, vm, e.target.value)
            })
            this.updater.modelUpdater(node, value)
        },

        // html指令
    }
}