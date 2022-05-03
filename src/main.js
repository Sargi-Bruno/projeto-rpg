import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import SelectButton from 'primevue/selectbutton'
import InputSwitch from 'primevue/inputswitch'
import Editor from 'primevue/editor'
import Menubar from 'primevue/menubar'
import Card from 'primevue/card'

import { initializeApp } from 'firebase/app'
// import { createPinia } from 'pinia'

const firebaseConfig = {
    apiKey: "AIzaSyDzhifEXXAAo0hNdghzuTZiOSDtp_MttWU",
    authDomain: "projeto-rpg-f1c50.firebaseapp.com",
    projectId: "projeto-rpg-f1c50",
    storageBucket: "projeto-rpg-f1c50.appspot.com",
    messagingSenderId: "851387745048",
    appId: "1:851387745048:web:da1ffb95ae0a5871b6546d"
  }

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
// app.use(createPinia())

app.component('p-button', Button)
app.component('p-input-text', InputText)
app.component('p-input-number', InputNumber)
app.component('p-dropdown', Dropdown)
app.component('p-multi-select', MultiSelect)
app.component('p-select-button', SelectButton)
app.component('p-input-switch', InputSwitch)
app.component('p-editor', Editor)
app.component('p-menubar', Menubar)
app.component('p-card', Card)

app.mount('#app')