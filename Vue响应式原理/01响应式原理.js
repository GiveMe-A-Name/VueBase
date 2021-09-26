const data = {
  name: 'person',
  age: 18
}
observer(data)

function observer(target) {
  if (target && typeof target === 'object') {
    for (const key in target) {
      defineReactive(target, key, target[key])
    }
  }
}

function defineReactive(obj, key, value) {
  Object.defineProperty(obj, key, {
    get() {
      // 做处理
      return value
    },
    set(newVal) {
      if (newVal !== value) {
        // 通知收集者
        value = newVal
      }
    }
  })
}
data.name = 'hello world'

console.log(data);
console.log(data.name)