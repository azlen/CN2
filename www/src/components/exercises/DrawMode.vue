<template>
	<div class="drawModeContainer">
		<svg></svg>
	</div>
</template>

<script>
	import { distance, angle } from './../../assets/js/util.js'
	
	import { mapState, mapActions } from 'vuex'

    export default {
        data(){
			return {
				
			}
		},
		props: [ 'word' ],
		computed: {
			...mapState('data', {
				history: state => state.history,
				character(state) {
					return state.characters[this.word];
				}
			})
		},
		methods: {
			
		},
		mounted(){
			
		}
    }
</script>

<style scoped>
	
</style>
