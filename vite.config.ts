/// <reference types="vitest" />
import type { ConfigEnv, UserConfig } from 'vite'
// import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import VueSetupExtend from 'vite-plugin-vue-setup-extend' // 使name可以写在script标签上。优雅定义vue文件name  ### 存在调试断点错乱问题 使用unplugin-vue-define-options/vite代替
// import DefineOptions from 'unplugin-vue-define-options/vite' // vue3.3 版本已提供
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { wrapperEnv } from './src/utils/getEnv'
import path from 'path'
// 引入资源分析工具
import { visualizer } from 'rollup-plugin-visualizer'
// Gzip
import viteCompression from 'vite-plugin-compression'
// mock
import { viteMockServe } from 'vite-plugin-mock'

import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return {
    plugins: [
      vue(),
      // * vite 可以使用 jsx/tsx 语法
      vueJsx(),
      // * name 可以写在 script 标签上
      // VueSetupExtend(),
      // DefineOptions(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: 'report.html', // 分析图生成的文件名
        open: true // 如果存在本地服务端口，将在打包后自动展示
      }),
      // Gzip
      viteCompression(),
      // mock
      viteMockServe({
        mockPath: 'mock',
        watchFiles: false, // # 设置为false， 否则mock文件一旦变动会生成很多mjs文件
        enable: true
      })
    ],
    resolve: {
      alias: {
        // '@': fileURLToPath(new URL('./src', import.meta.url))
        '@': path.join(__dirname, 'src')
      }
    },
    // 使用 scss.additionalData 来编译所有应用 scss 变量的组件。
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/var.scss" as *;`
        }
      },
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 19.2, // 1rem的大小
            propList: ['*'] // 需要转换的属性，这里选择全部都进行转换
          }),
          require('tailwindcss'), // 确保 TailwindCSS 插件被加载
          require('autoprefixer') // 确保 Autoprefixer 插件被加载
        ]
      }
    },
    // * 打包去除 console.log && debugger
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      outDir: 'dist',
      // minify: 'esbuild',
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      /* esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log */
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      rollupOptions: {
        output: {
          /* 处理打包文件太大警告 */
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //       return id.toString().split('node_modules/')[1].split('/')[0].toString();
          //   }
          // },
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: '0.0.0.0',
      open: viteEnv.VITE_OPEN,
      port: viteEnv.VITE_PORT,
      cors: true,
      // 代理跨域（mock 不需要配置跨域，直接能访问，这里只是个示例）
      proxy: {
        '/api': {
          target:
            /* "https://mock.apifox.cn/m1/1736346-0-default/" */ viteEnv.VITE_BASE_URL,
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    test: {
      // 启用类似 jest 的全局测试 API
      globals: true,
      // 使用 happy-dom 模拟 DOM
      // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
      environment: 'happy-dom'
    }
  }
})
