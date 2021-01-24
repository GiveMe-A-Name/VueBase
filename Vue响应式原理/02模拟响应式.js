const data = {
    name: 'Vue',
    age: 20,
}

observer(data)
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        return target
    }
    for (let key in target) {
        // 从对象中遍历他的属性
        defineRective(target, key, target[key])
    }
}

function defineRective(target, key, value) {

    // 对每个属性进行监听。
    Object.defineProperty(target, key, {
        // 注意这个传递的是target对象
        // get的时候，直接返回属性值
        get: function () {
            console.log(`监听获得${key}的值${value}`)
            return value
        },
        // set的时候，先对比值是否进行监听，
        set: function (newValue) {

            if (newValue !== value) {
                console.log(`监听修改${key}的值${value}修改为:${newValue}`)
                value = newValue
            }
        }
    })
}
data.name = 'hello Vue'
console.log(data.name)