<template>
	<div id="page" :class="theme">
		<header-component iconleft="chevron" iconright="settings"></header-component>
		<swipe :auto="-1" :continuous="false" :showIndicators="false">
			<swipe-item v-for="word in exercises">
				<learn-mode :hanzi="word"></learn-mode>
			</swipe-item>
		</swipe>
		
	</div>
</template>

<script>
	import HeaderComponent from './../shared/HeaderComponent.vue'
	import LearnMode from './../exercises/LearnMode.vue'
	import { distance, angle } from './../../assets/js/util.js'

	import { Swipe, SwipeItem } from 'vue-swipe'
	import { mapState, mapActions } from 'vuex'

	export default {
		computed: {
			...mapState('options', {
				'simplifiedOrTraditional': state => state.simplifiedOrTraditional,
				'theme': state => state.theme,
			}),
			...mapState('data', {
				'order': state => state.order,
				'exercises': state => state.exercises,
			})
		},
		methods: {
			 
		},
		components: {
			HeaderComponent,
			LearnMode,
			Swipe,
			SwipeItem,
		},
		mounted(){
			let state = this;
			/*this.$store.dispatch('data/downloadCharacterData', {
				'characterArray': this.order,
				callback() {
					state.$store.commit('data/setExercises', state.order);
				}
			})*/
			this.$store.dispatch('data/initExercises', { type: this.simplifiedOrTraditional, callback() { 
				
			 } })
		}
	}
</script>

<style scoped>
	/* DEFAULT V-SWIPE STYLES */
	.mint-swipe,.mint-swipe-items-wrap{position:relative;height:100%}.mint-swipe-items-wrap{-webkit-transform:translateZ(0);transform:translateZ(0)}.mint-swipe-items-wrap>div{position:absolute;-webkit-transform:translateX(-100%);transform:translateX(-100%);width:100%;height:100%;display:none}.mint-swipe-items-wrap>div.is-active{display:block;-webkit-transform:none;transform:none}.mint-swipe-indicators{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.mint-swipe-indicator{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2;margin:0 3px}.mint-swipe-indicator.is-active{background:#fff}
	.mint-swipe { overflow: show; } .mint-swipe-items-wrap { overflow: show }
</style>
