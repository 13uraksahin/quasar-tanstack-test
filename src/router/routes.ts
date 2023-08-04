import { QSsrContext } from '@quasar/app-vite'
import { Pinia } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

export default function routes ({ store, ssrContext }: { store: Pinia, ssrContext?: QSsrContext | null }) {
  if (process.env.DEV) {
    if (process.env.CLIENT && store) {
      // console.log('store: ', store)
    } else if (process.env.SERVER && ssrContext) {
      console.log('ssrContext: ', ssrContext)
    }
  }

  const routes: RouteRecordRaw[] = [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { name: 'Index', path: '', component: () => import('pages/IndexPage.vue') },
        {
          name: 'Users',
          path: '/users',
          component: () => import('pages/Users/IndexPage.vue'),
          redirect: { name: 'UsersReadAll' },
          children: [
            { name: 'UsersReadAll', path: '', component: () => import('pages/Users/ReadAll.vue') },
            { name: 'UsersCreateUnique', path: '+', component: () => import('pages/Users/CreateUnique.vue') },
            { name: 'UsersUpdateUnique', path: 'update/:id', component: () => import('pages/Users/UpdateUnique.vue') }
          ]
        },
        {
          name: 'Posts',
          path: '/posts',
          component: () => import('pages/Posts/IndexPage.vue'),
          redirect: { name: 'PostsReadAll' },
          children: [
            { name: 'PostsReadAll', path: '', component: () => import('pages/Posts/ReadAll.vue') },
            { name: 'PostsCreateUnique', path: '+', component: () => import('pages/Posts/CreateUnique.vue') },
            { name: 'PostsUpdateUnique', path: 'update/:id', component: () => import('pages/Posts/UpdateUnique.vue') }
          ]
        }
      ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue')
    }
  ]

  return routes
}
