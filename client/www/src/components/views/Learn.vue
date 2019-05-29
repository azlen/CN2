<template>
	<div id="page" :class="theme">
		<header-component iconleft="chevron" iconright="settings"></header-component>
		<swipe ref="swipe" :auto="-1" :continuous="false" :show-indicators="false" v-on:change="onChange">
			<swipe-item>
				<learn-mode :hanzi="word" :swipe="$refs.swipe"></learn-mode>
			</swipe-item>
			<swipe-item>b</swipe-item>
			<swipe-item>c</swipe-item>
			<swipe-item>d</swipe-item>
			<swipe-item>NEXT CHARACTER</swipe-item>
		</swipe>
		<div id="learn-nav">
			<div class="nav-button" v-touch:tap="navigate(0)">
				<img src="./src/assets/images/icons8_info_100px.png"/>
			</div>
			<div class="nav-button" v-touch:tap="navigate(1)">
				<img src="./src/assets/images/icons8_brain_100px.png"/>
			</div>
			<div class="nav-button" v-touch:tap="navigate(2)">
				<img src="./src/assets/images/icons8_mind_map_100px.png"/>
			</div>
			<div class="nav-button" v-touch:tap="navigate(3)">
				<img src="./src/assets/images/icons8_edit_100px.png"/>
			</div>
			<div class="nav-button" v-touch:tap="navigate(4)"></div>
		</div>
	</div>
</template>

<script>
	import HeaderComponent from './../shared/HeaderComponent.vue'
	import LearnMode from './../exercises/LearnMode.vue'
	import DrawMode from './../exercises/DrawMode.vue'
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
			navigate(index) {
				return () => {
					let temp_speed = this.$refs.swipe.speed;

					this.$refs.swipe.speed = 1;
					this.$refs.swipe.goto(index);

					this.$refs.swipe.speed = temp_speed;
				}
			},
			onChange(newIndex) {
				if(newIndex === 4) {
					alert("test");
				}
			}
		},
		components: {
			HeaderComponent,
			LearnMode,
			DrawMode,
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
		},
		
	}
</script>

<style scoped>
	/* DEFAULT V-SWIPE STYLES */
	.mint-swipe,.mint-swipe-items-wrap{position:relative;flex: 1;}.mint-swipe-items-wrap{-webkit-transform:translateZ(0);transform:translateZ(0)}.mint-swipe-items-wrap>div{position:absolute;-webkit-transform:translateX(-100%);transform:translateX(-100%);width:100%;height:100%;display:none}.mint-swipe-items-wrap>div.is-active{display:block;-webkit-transform:none;transform:none}.mint-swipe-indicators{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.mint-swipe-indicator{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2;margin:0 3px}.mint-swipe-indicator.is-active{background:#fff}
	.mint-swipe { overflow: show; } .mint-swipe-items-wrap { overflow: show }

	/**/
	#page {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	#learn-nav {
		display: flex;
		flex: 1 0 1;
		justify-content: center;
	}

	.nav-button {
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-button > img {
		/*display: inline-block;*/
		width: 40px;
	}
</style>
