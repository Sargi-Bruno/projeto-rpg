import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import MultiSelect from 'primevue/multiselect'
import Editor from 'primevue/editor'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('p-button', Button)
app.component('p-input-number', InputNumber)
app.component('p-multi-select', MultiSelect)
app.component('p-editor', Editor)

app.mount('#app')