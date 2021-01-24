var data = {
    name: 'Jack Wang',
    age: 21,
    salary: 3500,
    array: ['Jack', 'should', 'fighting']
};

// 模拟渲染
function render() {
    console.log('render');
}

// 定义需要重写的数组方法
var method = ['push', 'pop', 'unshift', 'shift', 'reverse', 'sort', 'splice'];
// 获取数组原型
var arrayProto = Array.prototype;
// 创建新的原型对象
var proto = Object.create(arrayProto);
// 遍历需要重写的数组方法
method.forEach(function (method) {
    // 修改新的原型对象
    proto[method] = function () {
        // 调用数组原型方法
        var res = arrayProto[method].call(this, ...arguments);
        render();
        return res;
    };
});

// 进行数据劫持/代理
observe(data);

// 数据劫持/代理方法
function observe(obj) {
    // 非对象类型直接返回
    if (!obj || typeof obj !== 'object') {
        return;
    }
    // 如果为数组则将新的原型添加到其原型链上
    // 那么如果执行'push','pop','shift'等方法，会从原型链从下往上进行委托
    // 所以调用方法被proto对象拦截，这样就达到了监听数组'push','pop'等方法的目的
    if (Array.isArray(obj)) {
        obj.__proto__ = proto;
        return;
    }
    // 遍历对象 key 将其传入
    Object.keys(obj).forEach(function (key) {
        defineReactive(obj, key, obj[key]);
    });
}

// 设置对象属性
function defineReactive(obj, key, value) {
    // 递归监听子属性
    observe(value);
    Object.defineProperty(obj, key, {
        // 重写 getter
        get: function () {
            console.log('get');
            return value;
        },
        // 重写 setter
        set: function (newValue) {
            console.log('set', newValue);
            // 递归监听新设置的Value
            observe(newValue);
            // 若新值不等于旧值 则发生渲染
            if (newValue !== value) {
                render();
                value = newValue;
            }
        }
    });
}

