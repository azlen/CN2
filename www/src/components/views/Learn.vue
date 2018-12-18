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

	export default {
		data(){
			return {
				character: null,
				pinyin: null,
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
					state.character = response.body.simplified;
					state.pinyin = response.body.pinyinAccent;
					state.definition = response.body.definition;
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
	}
	#pronounciation {
		font-family: sans-serif;
		font-weight: bold;
		color: #DA2929;
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
