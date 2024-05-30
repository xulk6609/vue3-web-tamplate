import { createApp, type Directive } from 'vue'
import App from './App.vue'
import router from './utils'
import './utils/rem'

import '@/styles/main.scss'
// 统一导入 element 图标
import * as Icons from '@element-plus/icons-vue'
// 引入element样式
import 'element-plus/dist/index.css'
// 使用pinai store
import pinia from '@/store/index'
/* 引入iconfont */
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
// 使用国际化 vue-i18n
import I18n from '@/language/index'
import * as directives from '@/directives'

const app = createApp(App)

// 自定义指令
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

// 注册全局 element-icons 组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(router).use(pinia).use(I18n)

app.mount('#app')
