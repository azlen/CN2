<template>
	<div id="page" :class="theme">
		<header-component iconleft="chevron"></header-component>
        <swipe :auto="-1" :continuous="false" :showIndicators="false">
			<swipe-item>
				<div class="paddedContainer">
					Test hello
				</div>
			</swipe-item>
			<swipe-item>
				<div class="paddedContainer">
					Test hello 2
				</div>
			</swipe-item>
		</swipe>
	</div>
</template>

<script>
	import HeaderComponent from './../shared/HeaderComponent.vue'
	import { distance, angle } from './../../assets/js/util.js'

	import { Swipe, SwipeItem } from 'vue-swipe'
	import { mapState, mapActions } from 'vuex'

	export default {
		computed: {
			...mapState('options', {
				'theme': state => state.theme,
				'textSize': state => state.textSize,
			})
		},
		methods: {
			...mapActions('data', {
				'downloadCharacterData': state => state.downloadCharacterData,
			})
		},
		components: {
			HeaderComponent,
			Swipe,
			SwipeItem
		},
		mounted(){
			
		}
	}
</script>

<style scoped>
	/* DEFAULT V-SWIPE STYLES */
	.mint-swipe,.mint-swipe-items-wrap{position:relative;height:100%}.mint-swipe-items-wrap{-webkit-transform:translateZ(0);transform:translateZ(0)}.mint-swipe-items-wrap>div{position:absolute;-webkit-transform:translateX(-100%);transform:translateX(-100%);width:100%;height:100%;display:none}.mint-swipe-items-wrap>div.is-active{display:block;-webkit-transform:none;transform:none}.mint-swipe-indicators{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.mint-swipe-indicator{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2;margin:0 3px}.mint-swipe-indicator.is-active{background:#fff}
	.mint-swipe { overflow-y: show; overflow-x: hidden } .mint-swipe-items-wrap { overflow: show }
</style>
