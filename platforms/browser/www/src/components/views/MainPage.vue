<template>
    <div id="page" class="dark">
        <header-component></header-component>
        <!--<div class="filler"></div>-->
        <svg id="svg">
        	<g class="svg-button">
        		<path :d="svgButton.connectorPath"/>
        		<circle :cx="svgButton.left.cx" :cy="svgButton.left.cy" :r="svgButton.left.r"></circle>
        		<text class="svg-button-text-zh" :x="svgButton.left.cx" :y="svgButton.left.cy + 5">学习</text>
        		<text class="svg-button-text-en"  :x="svgButton.left.cx" :y="svgButton.left.cy + 25">Review</text>		
        		
        		<v-touch tag="circle" :cx="svgButton.right.cx" :cy="svgButton.right.cy" :r="svgButton.right.r" v-on:tap="learnPage"></v-touch>
        		<text class="svg-button-text-zh"  :x="svgButton.right.cx" :y="svgButton.right.cy + 5">学</text>	
        		<text class="svg-button-text-en"  :x="svgButton.right.cx" :y="svgButton.right.cy + 25">Learn</text>	
        	</g>
        </svg>
        <!--<div class="paddedContainer">
            <button-big to="/" title="学习" description="Review"></button-big>
            <button-big to="/learn" title="学" description="Learn"></button-big>
            <button-big to="/" title="Practice" description="141 items to review" class="gradient"></button-big>
        </div>-->
    </div>
</template>

<script>
	import HeaderComponent from './../shared/HeaderComponent.vue'
    //import ButtonBig from './../shared/ButtonBig.vue'
    import metaball from './../../assets/js/metaball.js'
    import router from './../../vue/router/index.js'

	export default {
		data(){
			return {
				svgBBox: {},
				svgButton: {
					left: {
						cx: null,
						cy: null,
						r: 60
					},
					right: {
						cx: null,
						cy: null,
						r: 60
					},
					connectorPath: null,
				}
			}
		},
		components: {
			HeaderComponent,
            //ButtonBig
		},
		methods: {
			learnPage() {
				router.push('/learn')
			}
		},
		mounted(){
			//this.updateLanguage(navigator.language || navigator.userLanguage);
			let svgBBox = document.querySelector('#svg').getBoundingClientRect();

			this.svgButton.left.cx = svgBBox.width/2 - 75;
			this.svgButton.left.cy = svgBBox.height-100;

			this.svgButton.right.cx = svgBBox.width/2 + 75;
			this.svgButton.right.cy = svgBBox.height-100;

			this.svgButton.connectorPath = metaball(
				this.svgButton.left.r,
				this.svgButton.right.r,
				[this.svgButton.left.cx, this.svgButton.left.cy],
				[this.svgButton.right.cx, this.svgButton.right.cy]
			);
		}
	}
</script>

<style scoped>
	svg {
		flex: 1;
	}
	.svg-button {
		fill: #12415B;
	}


	.svg-button .svg-button-text-zh {
		font-family: "Noto Sans SC";
		fill: #5ECCDB;
		text-anchor: middle;
		font-weight: 200;
		font-size: 36px;
		letter-spacing: -5px;

		pointer-events: none;
	}
	.svg-button .svg-button-text-en {
		font-family: "Noto Sans", serif;
		font-weight: bold;
		fill: #FFFFFF;
		text-anchor: middle;
		font-size: 12px;

		pointer-events: none;
	}

	.svg-button circle {
		transition: fill .2s ease;
		fill: #12415B;
	}
	.svg-button circle:active {
		fill: #22616B;
	}
</style>
