// import router
import { createRouter, createWebHistory  } from 'vue-router'

// define a route
const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/Index.vue')
    },
    {
        path: '/posts',
        name: 'posts',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/Posts.vue')
    },
    {
        path: '/admin',
        name: 'admin.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/admin/Index.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router