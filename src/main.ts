import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from './App.vue'

const head = createHead()
createApp(App)
  .use(head)
  .mount('#app')
