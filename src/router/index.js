import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../views/profile.vue'
import HistoryData from '../views/HistoryData.vue'
import HistoryDataDetail from '../views/HistoryDataDetail.vue'
import Home from "@/views/Home";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Profile',
        component: Profile,
        meta: {
            title: "Stress Measurement"
        }
    },
    {
        path: '/historyData',
        name: 'historyData',
        component: HistoryData,
        meta: {
            title: "Stress Measurement"
        }
    },
    {
        path: '/historyData/:id',
        name: 'historyDataDetail',
        component: HistoryDataDetail,
        meta: {
          title: "Stress Measurement"
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            title: "Stress Measurement"
        }
    },
]

const index = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default index