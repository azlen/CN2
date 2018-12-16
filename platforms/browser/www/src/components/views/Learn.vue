<template>
    <div id="page" class="dark">
        <header-component iconleft="chevron" iconright="settings"></header-component>
        <div class="paddedContainer characterInfo">
        	<div id="character">{{ character }}</div>
        	<div id="pronounciation">{{ pinyin }}</div>
        	<div id="definition">{{ definition }}</div> 
        </div>
        <div class="filler"></div>
    </div>
</template>

<script>
	import HeaderComponent from './../shared/HeaderComponent.vue'
	import hanzi from 'hanzi'

	export default {
		data(){
			return {
				character: null,
				pinyin: null,
				definition: null,
			}
		},
		components: {
			HeaderComponent,
		},
		methods: {
			setCharacter(char) {
				this.character = char;

				var definition = hanzi.definitionLookup(this.character);

				this.pinyin = definition.pinyin;
				this.definition = definition.definition;
			}
		},
		mounted(){
			this.setCharacter('你')
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
		color: #DA4949;
		text-align: center;
		margin-top: 30px;
	}
	#pronounciation {
		font-family: sans-serif;
		font-weight: bold;
		color: #DA4949;
		font-size: 24px;
		text-align: center;
		margin-top: 20px;
	}
	#definition {
		font-family: 'Noto Sans', sans-serif;
		text-align: center;
		color: #6C8296;
		margin-top: 10px;
	}
</style>
