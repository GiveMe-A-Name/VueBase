const data = {
    name: 'Vue',
    age: 20,
    friend: {
        friendName: 'xqx'
    },
    color: ['red', 'blue', 'green']
}


const oldArrayProto = Array.prototype
const newArrProto = Object.create(oldArrayProto)
const methodNames = ['push', 'pop', 'shift', 'unshift']
methodNames.forEach(methodName => {
    newArrProto[methodName] = function () {
        console.log(`更新视图`)
        oldArrayProto[methodName].call(this, ...arguments)
    }
})
observer(data)
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        return target
    }

    if (Array.isArray(target)) {
        target.__proto__ = newArrProto
    }

    for (let key in target) {
        defineRective(target, key, target[key])
    }
}

// 设置监听
function defineRective(target, key, value) {
    // 进行深度监听
    observer(value)

    //设置get和set监听
    Object.defineProperty(target, key, {
        get: function () {
            // 进行依赖收集
            return value
        },
        set: function (newValue) {
            observer(newValue)
            if (newValue !== value) {
                value = newValue
                // 进行Dep的通知
                // dep.notify()
            }

        }
    })
}
data.color.push('helolo')