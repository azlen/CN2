import Vue from 'vue'

import VueTouch from 'vue-touch'
import { Swipe, SwipeItem } from 'vue-swipe'

Vue.use(VueTouch, { name: 'v-touch' });
Vue.use(Swipe, { name: 'v-swipe' });
Vue.use(SwipeItem, { name: 'v-swipe-item' });