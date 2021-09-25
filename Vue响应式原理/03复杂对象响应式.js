const data = {
  name: 'Vue',
  age: 20,
  friend: {
    friendName: 'xqx'
  }
}

observer(data)
function observer(target) {
  if (target && typeof target !== 'object') {
    for (let key in target) {
      defineRective(target, key, target[key])
    }
  }
}

// 设置监听
function defineRective(target, key, value) {
  // 进行深度监听,
  // 如果value 是对象，就继续监听下去
  observer(value)

  //设置get和set监听
  Object.defineProperty(target, key, {
    get: function () {
      // 进行依赖的通知
      return value
    },
    set: function (newValue) {
      //  在设置的时候进行深度set
      observer(newValue)
      if (newValue !== value) {
        // 进行依赖的notify
        value = newValue
      }
    }
  })
}
console.log(data.friend.friendName)
data.friend.friendName = 'hello js'
// console.log(data.friend.friendName)