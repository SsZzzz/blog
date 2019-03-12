import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'main'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/main',
          name: 'main',
          meta: {
            scrollTop: 0,
            labelid: null
          },
          component: () => import('./views/Main.vue')
        },
        {
          path: '/tags',
          name: 'tags',
          component: () => import('./views/Tags.vue')
        },
        {
          path: '/timeLine',
          name: 'timeLine',
          meta: {
            scrollTop: 0
          },
          component: () => import('./views/TimeLine.vue')
        },
        {
          path: '/aboutMe',
          name: 'aboutMe',
          component: () => import('./views/AboutMe.vue')
        },
        {
          path: '/improveInfo',
          name: 'improveInfo',
          component: () => import('./views/ImproveInfo.vue')
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('./views/Article.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('./views/Test.vue')
        },
      ]
    }
  ]
})

export default router;