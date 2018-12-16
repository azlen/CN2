<template>
    <div id="page" class="dark">
        <header-component></header-component>
        <div class="filler"></div>
        <div class="paddedContainer">
            <button-big to="/" title="学习" description="Review"></button-big>
            <button-big to="/learn" title="学" description="Learn"></button-big>
            <!--<button-big to="/" title="Practice" description="141 items to review" class="gradient"></button-big>-->
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
