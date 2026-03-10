import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import router from './router';
import App from './App.vue';
import './reset.css';

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        // options: {
        //     darkModeSelector: '.app-dark'
        // }
    },
});
app.use(ToastService);

app.mount('#app');
