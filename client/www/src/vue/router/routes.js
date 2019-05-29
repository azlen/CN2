import MainPage from './../../components/views/MainPage.vue'
import Learn from './../../components/views/Learn.vue'
import Settings from './../../components/views/Settings.vue'
import Tutorial from './../../components/views/Tutorial.vue'

export default [
    { path: '/', component: MainPage },
    { path: '/learn', component: Learn },
    { path: '/settings', component: Settings },
    { path: '/tutorial', component: Tutorial },
]
