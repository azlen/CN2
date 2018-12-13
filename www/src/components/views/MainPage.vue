<template>
    <div id="page" class="dark">
        <header-component></header-component>
        <div class="filler"></div>
        <div class="paddedContainer">
            <button-big to="/" title="Recall Mode" description="Test your memory"></button-big>
            <button-big to="/learn" title="New Vocabulary" description="Start learning 10 new words"></button-big>
            <button-big to="/" title="Practice" description="141 items to review" class="gradient"></button-big>
        </div>
    </div>
</template>

<script>
	import HeaderComponent from './../shared/HeaderComponent.vue'
    import ButtonBig from './../shared/ButtonBig.vue'

	export default {
		data(){
			return {
			}
		},
		components: {
			HeaderComponent,
            ButtonBig
		},
		mounted(){
			this.updateLanguage(navigator.language || navigator.userLanguage);
		}
	}
</script>

<style scoped>

</style>
