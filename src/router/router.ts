import { createRouter, createWebHistory } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

// declare module 'vue-router' {
//   interface _RouteRecordBase {
//     hidden?: boolean | string | number
//   }
// }

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login'
  },
  /* 登陆页面 */
  {
    path: '/login',
    name: 'login',
    meta: {
      hidden: true
    },
    component: () => import('@/views/login/index.vue')
  },
  /* layout 页面 */
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'House'
        }
      }
    ]
  },
  /* 表格 */
  {
    path: '/table',
    name: 'Table',
    component: Layout,
    redirect: '/table/index',
    children: [
      {
        path: 'index',
        name: 'TableIndex',
        component: () => import('@/views/table/index.vue'),
        meta: {
          title: '表格',
          icon: 'Headset'
        }
      }
    ]
  },
  /* axios */
  {
    path: '/axios',
    name: 'Axios',
    component: Layout,
    redirect: '/axios/index',
    children: [
      {
        path: 'index',
        name: 'AxiosIndex',
        component: () => import('@/views/axios/cancelToken/index.vue'),
        meta: {
          title: 'cancelToken',
          icon: 'Headset'
        }
      }
    ]
  },
  /* swiper */
  {
    path: '/swiper',
    name: 'Layout',
    component: Layout,
    redirect: '/swiper/swiper1',
    meta: {
      title: 'swiper',
      icon: 'Headset'
    },
    children: [
      {
        path: 'swiper1',
        name: 'swiper1',
        component: () => import('@/views/swiper/swiper1/index.vue'),
        meta: {
          title: 'swiper',
          icon: 'Headset'
        }
      },
      {
        path: 'swiper2',
        name: 'swiper2',
        component: () => import('@/views/swiper/swiper2/index.vue'),
        meta: {
          title: 'swiper2',
          icon: 'Headset'
        }
      },
      {
        path: 'swiper3',
        name: 'swiper3',
        component: () => import('@/views/swiper/swiper3/index.vue'),
        meta: {
          title: 'swiper3',
          icon: 'Headset'
        }
      }
    ]
  },
  /* 设计模式 */
  {
    path: '/designmode',
    name: 'Layout',
    component: Layout,
    redirect: '/designmode/observe',
    meta: {
      title: 'observe',
      icon: 'Headset'
    },
    children: [
      {
        path: 'observe',
        name: 'Observe',
        component: () => import('@/views/designMode/observe/index.vue'),
        meta: {
          title: '观察者',
          icon: 'Headset'
        }
      },
      {
        path: 'eventbus',
        name: 'Eventbus',
        component: () => import('@/views/designMode/eventbus/index.vue'),
        meta: {
          title: '事件总线',
          icon: 'Headset'
        }
      },
      {
        path: 'redux',
        name: 'Redux',
        component: () => import('@/views/designMode/redux/index.vue'),
        meta: {
          title: 'Redux',
          icon: 'Headset'
        }
      }
    ]
  },
  /* video */
  {
    path: '/video',
    name: 'Layout',
    component: Layout,
    redirect: '/video/index',
    meta: {
      title: 'video',
      icon: 'Headset'
    },
    children: [
      {
        path: 'index',
        name: 'VideoIndex',
        component: () => import('@/views/video/video/index.vue'),
        meta: {
          title: 'video',
          icon: 'Headset'
        }
      },
      {
        path: 'dplayer',
        name: 'DPlayer',
        component: () => import('@/views/video/dplayer/index.vue'),
        meta: {
          title: 'DPlayer',
          icon: 'Headset'
        }
      },
      {
        path: 'xgplayer',
        name: 'XGPlayer',
        component: () => import('@/views/video/xgplayer/index.vue'),
        meta: {
          title: 'XGPlayer',
          icon: 'Headset'
        }
      }
    ]
  },
  /* 嵌套菜单 */
  {
    path: '/menus',
    name: 'menus',
    component: Layout,
    redirect: '/menus/menu1',
    meta: {
      title: '菜单',
      icon: 'Menu'
    },
    children: [
      {
        path: 'menu1',
        name: 'menu1',
        component: () => import('@/views/menus/menu1/index.vue'),
        meta: {
          title: '菜单1',
          icon: 'FolderRemove'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'menu1-1',
            component: () => import('@/views/menus/menu1-1/index.vue'),
            meta: {
              title: '菜单1-1',
              icon: 'FolderRemove'
            }
          },
          {
            path: 'menu1-2',
            name: 'menu1-2',
            component: () => import('@/views/menus/menu1-2/index.vue'),
            meta: {
              title: '菜单1-2',
              icon: 'FolderRemove'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'menu2',
        component: () => import('@/views/menus/menu2/index.vue'),
        meta: {
          title: '菜单2',
          icon: 'FolderRemove'
        },
        children: [
          {
            path: 'menu2-1',
            name: 'menu2-1',
            component: () => import('@/views/menus/menu2-1/index.vue'),
            meta: {
              title: '菜单2-1',
              icon: 'FolderRemove'
            }
          }
        ]
      }
    ]
  },
  // fabric
  {
    path: '/fabric',
    name: 'fabric',
    component: Layout,
    redirect: '/fabric/curvetext',
    meta: {
      title: 'fabric',
      icon: 'Menu'
    },
    children: [
      {
        path: 'curvetext',
        name: 'curvetext',
        component: () => import('@/views/fabric/curvetext/index.vue'),
        meta: {
          title: '曲线文字',
          icon: 'FolderRemove'
        }
      }
    ]
  },
  /* echarts */
  {
    path: '/echarts',
    name: 'echarts',
    component: Layout,
    redirect: '/echarts/line',
    meta: {
      title: 'Echarts',
      icon: 'Menu'
    },
    children: [
      {
        path: 'line',
        name: 'Line',
        component: () => import('@/views/echarts/line/index.vue'),
        meta: {
          title: '折线图',
          icon: 'FolderRemove'
        }
      }
    ]
  },
  /* 404页面 */
  {
    path: '/:pathMatch(.*)*',
    meta: {
      hidden: true
    },
    name: 'not-found',
    component: () => import('@/views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
