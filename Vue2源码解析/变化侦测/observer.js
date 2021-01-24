import Dep from "./dep"

export class Observer {
    constructor(value) {
        this.value = value

        // 给value新增一个__ob__属性，值为该value的Observer实例
        // 相当于为value打上标记，表示它已经被转化成响应式了，避免重复操作
        // def(value, '__ob__', this)

        if (Array.isArray(value)) {
            // 数组处理逻辑
        } else {
            this.walk(value)
        }
    }
    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }
}
/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
function defineReactive(obj, key, val) {
    if (arguments.length == 2) {
        val = obj[key]
    }
    if (typeof val === 'object') {
        new Observer(val)
    }
    // 每个object_data都实例化一个依赖管理器
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            // 由于每个对象都实例化了一个依赖管理器，
            // 可以进行依赖收集，只要调用getter 就把相关依赖进行收集
            dep.depend()
            return val;
        },
        set(newVal) {
            if (val === newVal) {
                return
            }
            // console.log(`${key}属性被修改了`);
            val = newVal;
            // 只要该数据触发setter，就通知相关依赖
            dep.notify();
        }
    })
}

let car = new Observer({
    brand: 'BMW',
    price: 3000
})
// console.log(car.brand)
console.log(car.value.brand)
console.log(car.value.price)