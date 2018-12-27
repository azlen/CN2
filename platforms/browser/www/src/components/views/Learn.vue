<template>
	<div id="page" class="dark">
		<header-component iconleft="chevron" iconright="settings"></header-component>
		<div class="characterInfo">
			<!--<div id="character">{{ character }}</div>-->
			<div id="characterContainer" v-bind:class="{ fadeout: fadeOut, fullscreen: expandCharacter }" v-on:transitionend="startStrokeOrderAnimation" :style="{
				transform: `translate(0px, ${screenHeight/2-charBBox.top-charBBox.height/2}px)`
			}">
				<svg id="character" :transform="`scale(${screenWidth/charBBox.width}, ${screenHeight/charBBox.width})`" v-on:click="tapCharacter" width="200px" height="200px" viewBox="-512 -512 1024 1024">
					<defs>
						<clipPath v-for="(path, index) in strokes" :id="`stroke${index}`">
							<path :d="path" />
						</clipPath>
					</defs>
					<g class="shrink" :transform="`scale(${charBBox.width/screenWidth}, ${charBBox.height/screenHeight})`">
						<g transform="scale(1, -1) translate(-512, -388)">
							<path 
								v-for="(median, index) in medians"
								:d="median.path"
								:clip-path="`url(#stroke${index})`"
								class="stroke"
								:style="{
									strokeDashoffset: median.totalLength,
									strokeDasharray: median.totalLength+1,
									transitionDelay: `${median.delay}s`,
									transitionDuration: `${median.duration}s`,
									stroke: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'][groups[index]]
								}"
								/>
							<!--:style="`stroke-dashoffset: ${median.totalLength}px; stroke-dasharray: ${median.totalLength+1}px; stroke-linecap: round; stroke-width: 180px;`"-->
						</g>
					</g>
				</svg>
			</div>
		</div>
		<div class="paddedContainer characterInfo">
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
				screenWidth: 1,
				screenHeight: 1,
				charBBox: {top:1,left:1,width:1,height:1},

				fadeOut: false,
				expandCharacter: false,

				character: null,
				pinyin: null,
				strokes: null,
				medians: null,
				components: null,
				groups: null,
				definition: null,
				sentences: [],
			}
		},
		components: {
			HeaderComponent,
		},
		methods: {
			tapCharacter() {
				console.log('test');
				if (this.fadeOut === true) {
					this.expandCharacter = !this.expandCharacter;
				}

				this.fadeOut = !this.fadeOut;
			},
			startStrokeOrderAnimation() {
				// The fade-out resets strokeOffsets
				// This reveals the character and begins stroke order animation
				this.fadeOut = false; 
			},
			setCharacterData() {
				var state = this;
				this.$http.get('http://192.168.0.11:3001', { params: { word: '燮' } }).then(response => {
					state.character = response.body.simplified.character;
					state.pinyin = response.body.pinyinAccent;
					state.definition = response.body.definition2;
					
					state.components = response.body.simplified.components;
					state.groups = response.body.simplified.groups;
					console.log(state.groups);

					let drawSpeed = 1000;
					let delay = 0.5;

					let timeBetweenStrokes = 0.1;

					state.strokes = response.body.simplified.strokes;
					state.medians = response.body.simplified.medians.map(function(A, index) {
						let end = A.length - 1;
						let a1 = angle(A[1][0], A[1][1], A[0][0], A[0][1]);
						let d1 = distance(A[1][0], A[1][1], A[0][0], A[0][1]);

						A[0][0] = A[1][0] + Math.cos(a1) * (d1 + 120);
						A[0][1] = A[1][1] + Math.sin(a1) * (d1 + 120);

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
			this.screenWidth = window.innerWidth;
			this.screenHeight = window.innerHeight;
			this.charBBox = document.querySelector('#character').getBoundingClientRect();
			this.setCharacterData();
		}
	}
</script>

<style scoped>
	.characterInfo {
		display: flex;
		flex-direction: column;
	}
	#characterContainer {
		display: block;
		margin: auto;
		margin-top: 20px;
		transition: transform .3s ease-out;
	}
	#character {
		display: block;
		margin: auto;
		/*margin: 30px auto 0px auto;*/

		/*transition: top .5s ease-in-out, left .3s ease-out, width .3s ease-out, height .4s ease-in-out;*/
		transition: transform 0s ease-out;
		transition-delay: .3s;
	}

	#character .stroke {
		stroke: #DA2929;
		fill: none;
		stroke-linecap: round;
		stroke-width: 180px;
		transition: stroke-dashoffset 1s ease-in-out;
	}
	#characterContainer.fadeout .stroke {
		transition-property: stroke-dashoffset;
		transition-duration: 0s !important;
		transition-delay: 0.5s !important;
	}
	#characterContainer.fadeout {
		transition: opacity 0.5s ease-in-out;
		opacity: 0;
	}
	#characterContainer:not(.fadeout) .stroke {
		stroke-dashoffset: 0 !important;
	}

	#characterContainer:not(.fullscreen), #characterContainer:not(.fullscreen) #character {
		transform: translate(0, 0) scale(1, 1) !important;
	}
	#characterContainer:not(.fullscreen) .shrink {
		transform: scale(1, 1) translate(0, 0);
		
	}
	#character .shrink {
		
		transition: transform 0s ease-out;
		transition-delay: .3s;
		/*transform: scale(0.5, 0.5) translate(512px, 512px);*/
	}

	#pronounciation {
		font-family: sans-serif;
		font-weight: bold;
		color: #DA2929;
		font-size: 26px;
		text-align: center;
		margin-top: 20px;
	}
	#definition {
		font-family: 'Cousine', sans-serif;
		font-style: italic;
		text-align: center;
		color: #6C8296;
		color: #8Ca2b6;
		margin-top: 10px;
	}
</style>
