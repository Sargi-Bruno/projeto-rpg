import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import InputSwitch from 'primevue/inputswitch'
import Checkbox from 'primevue/checkbox'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import ScrollTop from 'primevue/scrolltop'
import SelectButton from 'primevue/selectbutton'
import ProgressSpinner from 'primevue/progressspinner'
import Editor from 'primevue/editor'

import { vfmPlugin } from 'vue-final-modal'

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
app.use(vfmPlugin)
// app.use(createPinia())

app.component('PButton', Button)
  .component('PInputText', InputText)
  .component('PInputNumber', InputNumber)
  .component('PTextarea', Textarea)
  .component('PDropdown', Dropdown)
  .component('PMultiSelect', MultiSelect)
  .component('PInputSwitch', InputSwitch)
  .component('PCheckbox', Checkbox)
  .component('PTabView', TabView)
  .component('PTabPanel', TabPanel)
  .component('PAccordion', Accordion)
  .component('PAccordionTab', AccordionTab)
  .component('PScrollTop', ScrollTop)
  .component('PSelectButton', SelectButton)
  .component('PProgressSpinner', ProgressSpinner)
  .component('PEditor', Editor)

app.mount('#app')