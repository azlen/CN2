<template>
	<div id="page" :class="theme">
		<header-component iconleft="home" iconright=""></header-component>
		<swipe v-if="loaded" ref="swipe" :auto="-1" :continuous="false" :show-indicators="false" v-on:change="onChange">
			<swipe-item>
				<learn-mode :hanzi="word"></learn-mode>
			</swipe-item>
			<!--<swipe-item>b</swipe-item>
			<swipe-item>c</swipe-item>-->
			<swipe-item>
				<draw-mode ref="draw" :hanzi="word"></draw-mode>
			</swipe-item>
			<swipe-item></swipe-item>
		</swipe>
		<div id="learn-nav">
			<div v-if="index === 0" class="nav-button" v-touch:tap="skip">Skip</div>
			<div v-if="index !== 0" class="nav-button" v-touch:tap="back">Back</div>
			<div class="current-section" style="font-weight: bold;">
				{{
					['Definition', 'Writing'][index]
				}}
			</div>
			<div class="nav-button" v-touch:tap="next">Next</div>
			<!--<div class="nav-button" v-touch:tap="navigate(0)">
				<img src="./src/assets/images/icons8_info_100px.png"/>
			</div>-->
			<!--<div class="nav-button" v-touch:tap="navigate(1)">
				<img src="./src/assets/images/icons8_brain_100px.png"/>
			</div>
			<div class="nav-button" v-touch:tap="navigate(2)">
				<img src="./src/assets/images/icons8_mind_map_100px.png"/>
			</div>-->
			<!--<div class="nav-button" v-touch:tap="navigate(1)">
				<img src="./src/assets/images/icons8_edit_100px.png"/>
			</div>
			<div class="nav-button" v-touch:tap="navigate(2)">
				<img src="./src/assets/images/icons8_right_100px.png"/>
			</div>-->
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
		data(){
			return {
				index: 0,
				loaded: false,
				swipe: undefined,
			}
		},
		computed: {
			...mapState('options', {
				'simplifiedOrTraditional': state => state.simplifiedOrTraditional,
				'theme': state => state.theme,
			}),
			...mapState('data', {
				'learnQueue': state => state.learnQueue,
				'word': state => state.learnQueue[0],
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
				this.index = newIndex;

				if(newIndex != 1) { this.$refs.draw.blah() }
				if(newIndex === 2) {
					this.$store.dispatch('data/nextCharacter');
					this.$refs.swipe.goto(0);
				}
			},
			next() {
				this.$refs.swipe.next();
			},
			back() {
				this.$refs.swipe.prev();
			},
			skip() {
				// TODO: not implemented
			}
			/*finishedLoading() {
				loaded = true;
			}*/
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

			this.$store.dispatch('data/downloadCharacterData', {
				'type': this.simplifiedOrTraditional,
				'words': this.learnQueue[0],
				callback() {
					//state.$store.commit('data/setExercises', state.order);
					state.loaded = true;

					//console.log("LOADED")
					//console.log(state.$store.words);
				}
			})

			//this.swipe = $refs.swipe;
			/*this.$store.dispatch('data/initExercises', { type: this.simplifiedOrTraditional, callback() { 
				
			} })*/
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
		/*height: 80px;
		padding-bottom: 20px;*/
		display: flex;
		flex: 1 0 1;
		/*justify-content: center;*/
	}

	#learn-nav > div {
		flex: 1;
		text-align: center;
		padding: 10px 0px 25px 0px;
	}

	.nav-button {
		opacity: 0.5;
	}

	/*.nav-button {
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-button > img {
		/*display: inline-block;*
		width: 40px;
	}*/
</style>
