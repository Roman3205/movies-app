import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3003'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('en')
dayjs.extend(relativeTime)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

createApp(App).use(router).mount('#app')
