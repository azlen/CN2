<template>
	<div id="page" :class="theme">
		<header-component iconleft="chevron"></header-component>
        <div class="paddedContainer">
            <!--<div class="themeChoices">
				<input id="settings-dark-theme" type="radio" name="theme" value="dark" v-on:change="setOption" :checked="theme === 'dark'">
				<label id="settings-dark-theme-label" for="settings-dark-theme"><div></div></label>

				<input id="settings-light-theme" type="radio" name="theme" value="light" v-on:change="setOption" :checked="theme === 'light'">
				<label id="settings-light-theme-label" for="settings-light-theme"><div></div></label>
			</div>-->

			<div class="selectOption">
				<span class="optionName">Theme</span>
				<span class="optionValue">{{ theme | capitalize }}</span>
				<select :value="theme" name="theme" v-on:change="setOption">
					<option value="dark">Dark</option>
					<option value="light">Light</option>
				</select>
			</div>

			<div class="selectOption">
				<span class="optionName">Character Set</span>
				<span class="optionValue">{{ simplifiedOrTraditional | capitalize }}</span>
				<select :value="simplifiedOrTraditional" name="simplifiedOrTraditional" v-on:change="setOption">
					<option value="traditional">Traditional</option>
					<option value="simplified">Simplified</option>
				</select>
			</div>

			<div class="selectOption">
				<span class="optionName">Text Size</span>
				<span class="optionValue">{{ textSize | capitalize }}</span>
				<select :value="textSize" name="textSize" v-on:change="setOption">
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="large">Large</option>
				</select>
			</div>

			<div class="selectOption">
				<span class="optionName">Pinyin Style</span>
				<span class="optionValue">{{ pinyinStyle | capitalize }}</span>
				<select :value="pinyinStyle" name="pinyinStyle" v-on:change="setOption">
					<option value="accent">Accent</option>
					<option value="number">Number</option>
					<option value="bopofomo">Bopofomo</option>
				</select>
			</div>

			<div class="selectOption">
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

			<div class="selectOption">
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
	/*
	.themeChoices input {
		display: none;
	}
	.themeChoices {
		display: flex;
	}
	.themeChoices label {
		flex: 1;
		height: 100px;
		margin-right: 10px;
		border-radius: 5px;
		border: 1px solid #999999;
	}
	.themeChoices input[checked]+label {
		border: 4px solid #999999;
	}
	#settings-dark-theme+label {
		background-color: #000000;
		color: #FFFFFF;
	}
	#settings-light-theme+label {
		background-color: #FFFFFF;
		color: #000000;
	}*/


	.selectOption {
		position: relative;
		padding: 20px 20px;
		border-bottom: 1px solid rgba(125, 125, 125, 0.3);
		font-size: 14pt;
	}
	.selectOption select {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.selectOption .optionName {
		opacity: 0.3;
	}
	.selectOption .optionValue {
		float: right;
	}
</style>
