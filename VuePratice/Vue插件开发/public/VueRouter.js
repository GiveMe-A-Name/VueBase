class VueRouter {
    install(vue) {
        vue.component('my-router-link', {
            render(h) {
                return h('a', {}, '首页')
            }
        })
        vue.component('my-router-view', {
            render(h) {
                return h('h1', {}, '首页视图')
            }
        })
    }
}

export default VueRouter