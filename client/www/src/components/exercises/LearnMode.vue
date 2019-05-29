<template>
	<div class="characterInfoContainer">
        <div>
            <div class="characterInfo">
                <character-display v-for="character in word.characters" :character="character"></character-display>
            </div>
            <div class="paddedContainer characterInfo" :style="{
				transitionDelay: `${totalDuration + 0.2}s`,
			}">
				<div id="pronunciation" :class="`tone${word.tone[0]}`" v-touch:tap="audio.play()">{{ word.pinyin[0] }}</div>
                <div id="definition">{{ word.definition }}</div>

				<!--<div id="sentences">
					<div class="exampleSentenceTitle">Example Sentences</div>
					<div class="sentence" v-for="sentence in word.sentences">
						<span>{{ sentence.cmn }}</span>
					</div>
				</div>-->
            </div>
        </div>
    </div>
</template>

<script>
	import { distance, angle } from './../../assets/js/util.js'

	import CharacterDisplay from './../shared/CharacterDisplay.vue'
	
	import { mapState, mapActions } from 'vuex'

    export default {
		props: [ 'hanzi' ],
		computed: {
			...mapState('data', {
				word(state) {
					return state.words[this.hanzi];
				},
				audio(state) {
					return new Audio(`http://192.168.0.19:3001/mp3/${state.words[this.hanzi].audioFile}`);
				},
				totalDuration(state) {
					let total = 0;
					let characters = state.words[this.hanzi].characters;
					for(let i = 0; i < characters.length; i++) {
						total += characters[i].totalDuration;
					}
					return total;
				}
			})
		},
		components: {
			CharacterDisplay
		},
		mounted(){
			
		}
    }
</script>

<style scoped>
	.mint-swipe-items-wrap>div.is-active #characterContainer:not(.fadeout) .stroke {
		stroke-dashoffset: 0 !important;
	}
	.mint-swipe-items-wrap>div .characterInfo {
		transition: opacity 0.3s ease-out;
		opacity: 0;
	}
	.mint-swipe-items-wrap>div:not(.is-active) .characterInfo { transition-delay: 0 !important; }
	.mint-swipe-items-wrap>div.is-active .characterInfo { opacity: 1; }

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
	/*#character {
		display: block;
		margin: auto;

		transition: background-color .3s ease-out;
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
	}*/

	#pronunciation {
		display: inline-block;
		margin: auto;

		font-family: sans-serif;
		font-weight: bold;
		color: #000000;
		font-size: 26px;
		text-align: center;
		margin-top: -10px;

		border-bottom: 2px dotted;
	}

	#pronunciation.tone1 { color: #038FF4; }
	#pronunciation.tone2 { color: #13DF1C; }
	#pronunciation.tone3 { color: #FFB800; }
	#pronunciation.tone4 { color: #DA2929; }
	#pronunciation.tone5 { color: #999999; }

	#pronunciation:active {
		opacity: 0.5;
	}

	#definition {
		font-family: serif;
		font-style: italic;
		text-align: center;
		color: #6C8296;
		color: #8Ca2b6;
		margin-top: 10px;
	}

	#sentences {
		margin-top: 40px;
		text-align: center;
	}
	.exampleSentenceTitle {
		font-family: "Lato", sans-serif;
		color: #4C5266;
		font-weight: bold;
		margin-bottom: 8px;
	}
	.sentence {
		display: block;
		color: #8Ca2b6;
		margin-bottom: 10px;
	}
	.sentence > span {
		border-bottom: 2px dotted #193459;
	}
</style>
