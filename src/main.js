import Vue from 'vue'
import index from './router'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'babel-polyfill'
import * as echarts from 'echarts'
import {post, fetch, patch, put, deletefn} from './utils/request'
import { domain, clientId } from '../auth_config.json';
import {Auth0Plugin} from "@/auth";


// Install the authentication plugin here
Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: appState => {
        index.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
})

Vue.config.productionTip = false;


Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$deletefn = deletefn;



new Vue({
    store,
    router: index,
    render: h => h(App),
}).$mount('#app')
