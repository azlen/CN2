<template>
	<div class="characterInfoContainer">
        <div>
            <div class="characterInfo">
                <div id="characterContainer" v-bind:class="{ fadeout: fadeOut, fullscreen: expandCharacter }" v-on:transitionend="startStrokeOrderAnimation" :style="{
                    transform: `translate(${expand.translate.x}px, ${expand.translate.y}px)`
                }">
                    <svg ref="character" id="character" :class="`tone${character.tone}`" :style="{transform:`scale(${expand.scale.x}, ${expand.scale.y})`}" v-on:click="tapCharacter" width="200px" height="200px" viewBox="-512 -512 1024 1024">
                        <defs>
                            <clipPath v-for="(path, index) in character.strokes" :id="`stroke${character.character}${index}`">
                                <path :d="path" />
                            </clipPath>
                        </defs>
						<g class="immediateOffset" :transform="`translate(${-expand.translate.percx*1024}, ${-expand.translate.percy*1024})`">
							<g class="shrink" :transform="`scale(${1/expand.scale.x}, ${1/expand.scale.y}) translate(${expand.translate.percx*1024}, ${expand.translate.percy*1024})`">
								<g transform="scale(1, -1) translate(-512, -388)">
									<g v-for="group in character.groups">
										<g v-if="group != undefined" :transform="`translate(${group.offset.x}, ${group.offset.y})`">
											<path 
												v-for="median in group.medians"
												:d="median.path"
												:clip-path="`url(#stroke${character.character}${median.index})`"
												class="stroke"
												:style="{
													strokeDashoffset: median.totalLength,
													strokeDasharray: median.totalLength+1,
													transitionDelay: `${median.delay}s`,
													transitionDuration: `${median.duration}s`
												}"
												/>
											<text :x="group.bbox.x+group.bbox.width/2+512" :y="-group.bbox.y-512+175" :style="{
												fill: '#FFFFFF',
												fontSize: '75',
												transform: 'scale(1, -1)',
												textAnchor: 'middle',
											}">{{ group.definition }}</text>
										</g>
										<!--<rect :x="group.bbox.x+512" :y="group.bbox.y+512" :width="group.bbox.width" :height="group.bbox.height" fill="none" stroke="#FFFFFF"></rect>-->
									</g>
								</g>
							</g>
						</g>
                    </svg>
                </div>
            </div>
            <div class="paddedContainer characterInfo" :style="{
				transitionDelay: `${character.totalDuration + 0.2}s`,
			}">
                <div id="pronunciation"  :class="`tone${character.tone}`">{{ character.pinyin }}</div>
                <div id="definition">{{ character.definition }}</div> 
            </div>
        </div>
    </div>
</template>

<script>
	import { distance, angle } from './../../assets/js/util.js'
	
	import { mapState, mapActions } from 'vuex'

    export default {
        data(){
			return {
				expand: {
					scale: { x: 1, y: 1 },
					translate: { x: 0, y: 0, percx: 0, percy: 0 },
				},

				fadeOut: false,
				expandCharacter: false,
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
			/*...mapActions('data', {
				'downloadCharacterData': state => state.downloadCharacterData,
			}),*/
			tapCharacter() {
				if (this.fadeOut) {
					this.expandCharacter = !this.expandCharacter;
					this.fadeOut = false;

					if (this.expandCharacter === true) {
						let bbox = this.$refs.character.getBoundingClientRect();
						this.expand.scale.x = window.innerWidth / bbox.width;
						this.expand.scale.y = window.innerHeight / bbox.height;
						this.expand.translate.x = window.innerWidth / 2 - (bbox.x + bbox.width / 2);
						this.expand.translate.y = window.innerHeight / 2 - (bbox.y + bbox.height / 2);
						this.expand.translate.percx = this.expand.translate.x / window.innerWidth;
						this.expand.translate.percy = this.expand.translate.y / window.innerHeight;
					}
				} else if (/*!this.expandCharacter*/ true) {
					this.fadeOut = !this.fadeOut;
				}
			},
			startStrokeOrderAnimation() {
				// The fade-out resets strokeOffsets
				// This reveals the character and begins stroke order animation
				this.fadeOut = false; 
			},
		},
		mounted(){
			
		}
    }
</script>

<style scoped>
	.characterInfoContainer {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		overflow: visible;
	}
	.characterInfoContainer > div {
		margin: auto;
	}

	.characterInfo {
		display: flex;
		flex-direction: column;
	}
	#characterContainer {
		display: block;
		margin: auto;
		margin-top: 20px;
		/*transition: transform .3s ease-out;*/
	}
	#character {
		display: block;
		margin: auto;

		transition: background-color .3s ease-out;
		/*margin: 30px auto 0px auto;*/

		/*transition: top .5s ease-in-out, left .3s ease-out, width .3s ease-out, height .4s ease-in-out;*/
	}

	#character .stroke {
		stroke: #000000;
		fill: none;
		stroke-linecap: round;
		stroke-width: 180px;
		transition: stroke-dashoffset 1s ease-in-out;
	}
	#character.tone1 .stroke { stroke: #038FF4; }
	#character.tone2 .stroke { stroke: #13DF1C; }
	#character.tone3 .stroke { stroke: #FFB800; }
	#character.tone4 .stroke { stroke: #DA2929; }
	#character.tone5 .stroke { stroke: #999999; }

	#characterContainer.fadeout .stroke {
		transition-property: stroke-dashoffset;
		transition-duration: 0s !important;
		transition-delay: 0.5s !important;
	}
	#characterContainer.fadeout {
		transition: opacity 0.5s ease-in-out;
		opacity: 0;
	}

	.mint-swipe-items-wrap>div.is-active #characterContainer:not(.fadeout) .stroke {
		stroke-dashoffset: 0 !important;
	}
	.mint-swipe-items-wrap>div .characterInfo {
		transition: opacity 0.3s ease-out;
		opacity: 0;
	}
	.mint-swipe-items-wrap>div:not(.is-active) .characterInfo { transition-delay: 0 !important; }
	.mint-swipe-items-wrap>div.is-active .characterInfo { opacity: 1; }

	#characterContainer:not(.fullscreen) {
		transform: translate(0, 0) !important;
	}
	#characterContainer:not(.fullscreen) #character {
		transform: scale(1, 1) !important;
	}
	#characterContainer.fullscreen {
	}
	#characterContainer.fullscreen #character {
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 1000;
	}
	#characterContainer:not(.fullscreen) .shrink {
		transform: scale(1, 1) translate(0, 0) !important;	
	}
	#characterContainer text {
		transition: opacity .3s ease-out;
		opacity: 0;
	}
	#characterContainer.fullscreen text {
		opacity: 1;
	}
	#characterContainer:not(.fullscreen) .immediateOffset {
		transform: translate(0, 0) !important;
	}
	.shrink > g > g > g {
		transition: transform .3s ease-out;
	}
	#characterContainer:not(.fullscreen) .shrink > g > g > g {
		transform: translate(0, 0) !important;
	}

	#pronunciation {
		font-family: sans-serif;
		font-weight: bold;
		color: #000000;
		font-size: 26px;
		text-align: center;
		margin-top: -10px;
	}

	#pronunciation.tone1 { color: #038FF4; }
	#pronunciation.tone2 { color: #13DF1C; }
	#pronunciation.tone3 { color: #FFB800; }
	#pronunciation.tone4 { color: #DA2929; }
	#pronunciation.tone5 { color: #999999; }

	#definition {
		font-family: serif;
		font-style: italic;
		text-align: center;
		color: #6C8296;
		color: #8Ca2b6;
		margin-top: 10px;
	}
</style>
