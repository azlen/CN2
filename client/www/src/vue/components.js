import Vue from 'vue'

//import VueTouch from 'vue-touch'
import { Swipe, SwipeItem } from 'vue-swipe'

//import { VueHammer } from 'vue2-hammer'
//console.log('TESTING')
//console.log(VueHammer);
//Vue.directive('v-hammer', VueHammer);
//VueHammer.install(Vue);
//Vue.use(VueHammer)

//Vue.use(VueTouch, { name: 'v-touch' });
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents);
Vue.use(Swipe, { name: 'v-swipe' });
Vue.use(SwipeItem, { name: 'v-swipe-item' });