<template>
	<div id="page" class="dark">
		<header-component iconleft="chevron" iconright="settings"></header-component>
		<div>{{ theme }}</div>
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
				'theme': state => state.theme,
				'textSize': state => state.textSize,
				//'nextCharacter': state => state.nextCharacter
			})
		},
		methods: {
			...mapActions('data', {
				'downloadCharacterData': state => state.downloadCharacterData,
			})
		},
		components: {
			HeaderComponent,
		},
		mounted(){
			
		}
	}
</script>

<style scoped>
	
</style>
