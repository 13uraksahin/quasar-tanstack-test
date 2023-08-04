import { RouteRecordRaw } from 'vue-router'

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

export default routes
