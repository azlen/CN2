<template>
    <div id="page" class="dark">
        <header-component iconleft="chevron" iconright="settings"></header-component>
        <div class="paddedContainer characterInfo">
        	<div id="character">是</div>
        	<div id="pronounciation">shì</div>
        	<div id="definition">is... to be</div> 
        </div>
        <div class="filler"></div>
    </div>
</template>

<script>
	import HeaderComponent from './../shared/HeaderComponent.vue'

	export default {
		data(){
			return {
			}
		},
		components: {
			HeaderComponent,
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
		font-family: 'Lato', serif;
		font-style: italic;
		text-align: center;
		color: #6C8296;
		margin-top: 10px;
	}
</style>
