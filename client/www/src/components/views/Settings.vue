<template>
	<div id="page" :class="theme">
		<header-component iconleft="chevron"></header-component>

		<div>
			<div class="option visualOption">
				<span class="optionName">Theme</span>

				<div class="visualOptionChoices">
					<input id="settings-dark-theme" type="radio" name="theme" value="dark" v-on:change="setOption" :checked="theme === 'dark'">
					<label id="settings-dark-theme-label" for="settings-dark-theme"></label>

					<input id="settings-paper-theme" type="radio" name="theme" value="paper" v-on:change="setOption" :checked="theme === 'paper'">
					<label id="settings-paper-theme-label" for="settings-paper-theme"></label>

					<input id="settings-light-theme" type="radio" name="theme" value="light" v-on:change="setOption" :checked="theme === 'light'">
					<label id="settings-light-theme-label" for="settings-light-theme"></label>
				</div>
			</div>

			<!--<div class="selectOption">
				<span class="optionName">Theme</span>
				<span class="optionValue">{{ theme | capitalize }}</span>
				<select :value="theme" name="theme" v-on:change="setOption">
					<option value="dark">Dark</option>
					<option value="light">Light</option>
				</select>
			</div>-->

			<div class="option selectOption">
				<span class="optionName">Character Set</span>
				<span class="optionValue">{{ simplifiedOrTraditional | capitalize }}</span>
				<select :value="simplifiedOrTraditional" name="simplifiedOrTraditional" v-on:change="setOption">
					<option value="traditional">Traditional</option>
					<option value="simplified">Simplified</option>
				</select>
			</div>

			<div class="option selectOption">
				<span class="optionName">Text Size</span>
				<span class="optionValue">{{ textSize | capitalize }}</span>
				<select :value="textSize" name="textSize" v-on:change="setOption">
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="large">Large</option>
				</select>
			</div>

			<div class="option selectOption">
				<span class="optionName">Pinyin Style</span>
				<span class="optionValue">{{ pinyinStyle | capitalize }}</span>
				<select :value="pinyinStyle" name="pinyinStyle" v-on:change="setOption">
					<option value="accent">Accent</option>
					<option value="number">Number</option>
					<option value="bopofomo">Bopofomo</option>
				</select>
			</div>

			<div class="option selectOption">
				<span class="optionName">Tone Colours</span>
				<span class="optionValue">{{ toneStyle | capitalize }}</span>
				<select :value="toneStyle" name="toneStyle" v-on:change="setOption">
					<option value="dummitt">Dummitt (¯R ´O ˇG `B)</option>
					<option value="unimelb">Unimelb (¯B ´G ˇP `R)</option>
					<option value="hanping">Hanping (¯B ´G ˇO `R)</option>
					<option value="pleco">Pleco  (¯R ´G ˇB `P)</option>
					<option value="thomas">Thomas  (¯G ´B ˇR `Blk)</option>
				</select>
			</div>

			<div class="option selectOption">
				<span class="optionName">Silent Mode</span>
				<span class="optionValue">{{ silentMode | capitalize }}</span>
				<select :value="silentMode" name="silentMode" v-on:change="setOption">
					<option value="on">On</option>
					<option value="off">Off</option>
				</select>
			</div>
		</div>
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
				'simplifiedOrTraditional': state => state.simplifiedOrTraditional,
				'silentMode': state => state.silentMode,
				'pinyinStyle': state => state.pinyinStyle,
				'toneStyle': state => state.toneStyle,
				//'nextCharacter': state => state.nextCharacter
			})
		},
		methods: {
			setOption(e) {
				let data = {};
				data[e.target.name] = e.target.value;
				this.$store.commit('options/setOption', data);
			},
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
	.visualOptionChoices input {
		display: none;
	}
	.visualOptionChoices {
		display: flex;
	}
	.visualOptionChoices label {
		flex: 1;
		height: 100px;
		border-radius: 10px;
		/*border: 1px solid #999999;*/
		border: 3px solid transparent;
	}
	.visualOptionChoices input:checked + label {
		border-color: #1B898F;
	}
	.visualOptionChoices label:not(:last-child) {
		margin-right: 15px;
	}
	.visualOptionChoices input[checked]+label {
		border: 4px solid #999999;
	}

	#settings-dark-theme+label {
		background-color: #000000;
	}
	#settings-light-theme+label {
		background-color: #FFFFFF;
	}
	#settings-paper-theme+label {
		background-color: #F1E1A9;
	}


	.option {
		position: relative;
		/*border-bottom: 1px solid rgba(125, 125, 125, 0.3);*/
		font-size: 14pt;
		padding: 11px 30px 15px 30px;
	}
	.option:first-child { margin-top: 29px }
	/*.option:nth-child(even) { background: rgba(255, 255, 255, 0.1) }
	#page.paper .option:nth-child(even),
	#page.light .option:nth-child(even) { background: rgba(0, 0, 0, 0.04) }*/

	.selectOption select {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.optionName {
		display: block;

		opacity: 0.4;
		text-transform: uppercase;
		font-size: 10pt;
		margin-bottom: 4px;
	}
	.optionValue {
		display: block;
	}
</style>
