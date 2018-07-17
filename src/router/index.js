import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../home'
import Cart from '../cart'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
            path: '/',
            name: '首页',
            component: Home
        },
        {
            path: '/cart',
            name: '购物车',
            component: Cart
        }
    ]
})