login_promise
    .then(() => {
        // 若登录成功，给sessionStorage加入一个标记，表示成功
        window.sessionStorage.setItem('is_login', 'true')
        // 向vuex.store提交数据
        this.$store.commit('logined', {
            username: this.username,
        })
        //进行路由跳转
        this.$router.push({ name: 'HelloWorld' })
    })
    .catch((reason) => {
        // 若不成功，需要接受promise抛出的错误
        // 并使用Tips组件提示出来
        this.errorMsg = reason
        this.showTip = true
        setTimeout(() => {
            this.showTip = false
            this.errorMsg = ''
        }, 900)
    })