<template>
	<div id="page" class="dark">
		<header-component iconleft="chevron" iconright="settings"></header-component>
		<div class="paddedContainer characterInfo">
			<!--<div id="character">{{ character }}</div>-->

			<svg id="character" onclick="this.classList.toggle('animate')" width="200px" height="200px" viewBox="0 0 1024 1024">
				<defs>
					<clipPath v-for="(path, index) in strokes" :id="`stroke${index}`">
						<path :d="path" />
					</clipPath>
				</defs>
				<g transform="scale(1, -1) translate(0, -900)">
					<path 
						v-for="(median, index) in medians"
						:d="median.path"
						:clip-path="`url(#stroke${index})`"
						class="test"
						:style="{
							strokeDashoffset: median.totalLength,
							strokeDasharray: median.totalLength+1,
							transitionDelay: `${median.delay}s`,
							transitionDuration: `${median.duration}s`
						}"
						/>
					<!--:style="`stroke-dashoffset: ${median.totalLength}px; stroke-dasharray: ${median.totalLength+1}px; stroke-linecap: round; stroke-width: 180px;`"-->
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
				this.$http.get('http://192.168.0.18:3001', { params: { word: '哪' } }).then(response => {
					state.character = response.body.simplified.character;
					state.pinyin = response.body.pinyinAccent;
					state.definition = response.body.definition2;

					let drawSpeed = 1000;
					let delay = 0.5;

					let timeBetweenStrokes = 0.1;

					state.strokes = response.body.simplified.strokes;
					state.medians = response.body.simplified.medians.map(function(A, index) {
						let end = A.length - 1;
						let a1 = angle(A[1][0], A[1][1], A[0][0], A[0][1]);
						let d1 = distance(A[1][0], A[1][1], A[0][0], A[0][1]);

						A[0][0] = A[1][0] + Math.cos(a1) * (d1 + 110);
						A[0][1] = A[1][1] + Math.sin(a1) * (d1 + 110);

						let a2 = angle(A[end-1][0], A[end-1][1], A[end][0], A[end][1]);
						let d2 = distance(A[end-1][0], A[end-1][1], A[end][0], A[end][1]);

						A[end][0] = A[end-1][0] + Math.cos(a2) * (d2 + 0);
						A[end][1] = A[end-1][1] + Math.sin(a2) * (d2 + 0);

						let totalLength = 0;

						let path = `M${A[0][0]} ${A[0][1]}`;
						for (let i = 1; i < A.length; i++) {
							path += `L${A[i][0]} ${A[i][1]}`;
							totalLength += distance(A[i-1][0], A[i-1][1], A[i][0], A[i][1]);
						}

						let duration = totalLength / drawSpeed;
						let out = {
							//'stroke': response.body.simplified.strokes[index],
							'path': path,
							'totalLength': totalLength,
							'duration': duration,
							'delay': delay
						};

						delay += duration + timeBetweenStrokes;

						return out;
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
		/*font-family: 'PL UKai';
		color: #FFFFFF;
		font-size: 200px;
		color: #DA2929;
		text-align: center;
		margin-top: 30px;*/
		opacity: 0.;

		width: 250px;
		height: 220px;
		margin: 30px auto 0px auto;
	}

	#character .test {
		stroke: #DA2929;
		fill: none;
		stroke-linecap: round;
		stroke-width: 180px;
		transition: stroke-dashoffset 1s ease-in-out;
		
		
	}
	#character.animate .test {
		transition-property: stroke-dashoffset;
		transition-duration: 0s !important;
		transition-delay: 0.5s !important;
	}
	#character.animate {
		transition: opacity 0.5s ease-in-out;
		opacity: 0;
	}
	#character:not(.animate) .test {
		stroke-dashoffset: 0 !important;
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
