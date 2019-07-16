import MainPageV2 from './../../components/views/MainPageV2.vue'
import Learn from './../../components/views/Learn.vue'
import Settings from './../../components/views/Settings.vue'
import Tutorial from './../../components/views/Tutorial.vue'
import Login from './../../components/views/Login.vue'

export default [
    { path: '/', component: MainPageV2 },
    { path: '/learn', component: Learn },
    { path: '/settings', component: Settings },
    { path: '/tutorial', component: Tutorial },

    { path: '/login', component: Login },
]
