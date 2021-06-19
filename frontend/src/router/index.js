import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: () => import(/* webpackChunkName:'index'*/ '../views/Index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
          title: '设置',
          requireAuth: true,
          index: 2
        }
      },
      {
        path: '/sort',
        name: 'Sort',
        component: () => import('../views/Sort.vue'),
        meta: {
          title: '设置',
          requireAuth: true,
          index: 2
        }
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../views/My.vue'),
        meta: {
          title: '设置',
          requireAuth: true,
          index: 2
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '设置',
      requireAuth: true,
      index: 6
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: '设置',
      requireAuth: true,
      index: 7
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    meta: {
      title: '设置',
      requireAuth: true,
      index: 3
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      title: '设置',
      requireAuth: true,
      index: 3
    }
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../views/Address.vue'),
    meta: {
      title: '设置',
      requireAuth: true,
      index: 5
    }
  },
  {
    path: '/handle_address',
    name: 'add-address',
    component: () => import('../views/HandleAddress.vue'),
    meta: {
      title: '设置',
      requireAuth: true,
      index: 4
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/Order.vue'),
    meta: {
      title: '设置',
      requireAuth: true,
      index: 3
    }
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import('../views/Comment.vue'),
    meta: {
      title: '设置',
      requireAuth: true,
      index: 5
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/Pay.vue'),
    meta: {
      title: '设置',
      requireAuth: true,
      index: 4
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
