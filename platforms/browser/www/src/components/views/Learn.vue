<template>
    <div id="page" class="dark">
        <header-component iconleft="chevron" iconright="settings"></header-component>
        <div class="paddedContainer characterInfo">
        	<!--<div id="character">{{ character }}</div>-->
        	<svg id="character" width="200px" height="200px" viewBox="0 0 1024 1024">
				<g transform="scale(1, -1) translate(0, -900)">
					<path v-for="path in strokes" :d="path"></path>

					<path v-for="path in medians" :d="path" stroke="#FFFFFF" style="fill: none"></path>
				</g>
			</svg>
        	<div id="pronounciation">{{ pinyin }}</div>
        	<div id="definition">{{ definition }}</div> 
        </div>
        <div class="filler"></div>
    </div>
</template>

<script>
	import HeaderComponent from './../shared/HeaderComponent.vue'
	import { distance, angle } from './../../assets/js/util.js'

	export default {
		data(){
			return {
				character: null,
				pinyin: null,
				strokes: null,
				medians: null,
				definition: null,
				sentences: []
			}
		},
		components: {
			HeaderComponent,
		},
		methods: {
			setCharacterData() {
				var state = this;
				this.$http.get('http://192.168.0.18:3001', { body: {} }).then(response => {
					state.character = response.body.simplified.character;
					state.strokes = response.body.simplified.strokes;
					state.pinyin = response.body.pinyinAccent;
					state.definition = response.body.definition2;

					state.medians = response.body.simplified.medians.map(function(A) {
						let end = A.length - 1;
						let a1 = angle(A[1][0], A[1][1], A[0][0], A[0][1]);
						let d1 = distance(A[1][0], A[1][1], A[0][0], A[0][1]);

						A[0][0] = A[1][0] + Math.cos(a1) * (d1 + 30);
						A[0][1] = A[1][1] + Math.sin(a1) * (d1 + 30);

						let a2 = angle(A[end-1][0], A[end-1][1], A[end][0], A[end][1]);
						let d2 = distance(A[end-1][0], A[end-1][1], A[end][0], A[end][1]);

						A[end][0] = A[end-1][0] + Math.cos(a2) * (d2 + 30);
						A[end][1] = A[end-1][1] + Math.sin(a2) * (d2 + 30);


						let path = `M${A[0][0]} ${A[0][1]}`;
						for (let i = 1; i < A.length; i++) {
							path += `L${A[i][0]} ${A[i][1]}`;
						}
						return path;
					})
				}, response => {
					// error callback
				});
			}
		},
		mounted(){
			this.setCharacterData()
		}
	}
</script>

<style scoped>
	.characterInfo {
		display: flex;
		flex-direction: column;
	}
	#character {
		font-family: 'PL UKai';
		color: #FFFFFF;
		font-size: 200px;
		color: #DA2929;
		text-align: center;
		margin-top: 30px;

		fill: #DA2929;
		width: 250px;
		height: 220px;
		margin: 30px auto 0px auto;
	}
	#pronounciation {
		font-family: "Noto Sans";
		font-weight: bold;
		color: #DA2929;
		font-size: 26px;
		text-align: center;
		margin-top: 20px;
	}
	#definition {
		font-family: 'Libre Baskerville', sans-serif;
		font-style: italic;
		text-align: center;
		color: #6C8296;
		color: #8Ca2b6;
		margin-top: 10px;
	}
</style>
