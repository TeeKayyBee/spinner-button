import { createApp } from 'vue'
import App from './App.vue'
import SpinnerButton from './components/SpinnerButton.vue'

const app = createApp(App)

app.component('spinner-button', SpinnerButton)

app.mount('#app')