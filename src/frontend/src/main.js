import {createApp} from 'vue';

import App from './App.vue';
import './assets/fonts/fonts.css';
const Vue = createApp(App);
Vue.mount('#app');

window.oncontextmenu=function(e){
    e.preventDefault();
}

