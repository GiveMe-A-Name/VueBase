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
      return value
    },
    set(newVal) {
      if (newVal !== value) {
        value = newVal
      }
    }
  })
}
data.name = 'hello world'

console.log(data.name)