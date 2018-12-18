<template>
    <div id="page" class="dark">
        
        <!--<div class="filler"></div>-->
        <svg id="svg">
        	<defs>
				<linearGradient id="gradient" x1="-11" y1="-15" x2="428.095" y2="3.53381" gradientUnits="userSpaceOnUse">
					<stop stop-color="#1C5FAE"/>
					<stop offset="1" stop-color="#1AAD81"/>
				</linearGradient>
			</defs>
			
			<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse">
				<circle v-for="circle in circles" :cx="circle.x" :cy="circle.y" :r="circle.r" fill="#000000"></circle>
			</mask>
			
        	<g mask="url(#mask0)">
        		<rect width="375" height="812" fill="url(#gradient)"/>
        	</g>
        
        	<g class="svg-button">
        		<!--<path :d="svgButton.connectorPath"/>
        		<circle :cx="svgButton.left.cx" :cy="svgButton.left.cy" :r="svgButton.left.r"></circle>
        		<text class="svg-button-text-zh" :x="svgButton.left.cx" :y="svgButton.left.cy + 5">学习</text>
        		<text class="svg-button-text-en"  :x="svgButton.left.cx" :y="svgButton.left.cy + 25">Review</text>	-->	
        		
        		<v-touch tag="circle" :cx="svgButton.x" :cy="svgButton.y" :r="svgButton.r" v-on:tap="learnPage"></v-touch>
        		<text class="svg-button-text-zh"  :x="svgButton.x" :y="svgButton.y + 5">学</text>	
        		<text class="svg-button-text-en"  :x="svgButton.x" :y="svgButton.y + 25">Learn</text>	
        	</g>
        </svg>
        <header-component></header-component>
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
    
    let random = {
    	int: function(a, b) {
    		return Math.floor(Math.random() * (b - a + 1) + a);
    	}
    }
    
    function distance(x1, y1, x2, y2) {
    	var a = x1 - x2;
		var b = y1 - y2;

		var c = Math.sqrt( a*a + b*b );
		
		return c;
    }

	export default {
		data(){
			return {
				//svgBBox: {},
				/*svgButton: {
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
				},*/
				svgButton: {
					x: null,
					y: null,
					r: 70
				},
				circles: []
				
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

			this.svgButton.x = svgBBox.width/2;
			this.svgButton.y = svgBBox.height-100;
			
			let numCircles = 15;
			let protection = 5000;
			let counter = 0;
			
			this.circles = [
				{ x: this.svgButton.x, y: this.svgButton.y+20, r: this.svgButton.r + 30},
				{ x: 0, y: svgBBox.height, r: 10 }, // prevent bottom-left corner
				{ x: svgBBox.width, y: svgBBox.height, r: 10 }, // prevent bottom-right corner
				{ x: svgBBox.width/2, y: 10, r: 10 }, // prevent under logo
				{ 
					x: random.int(svgBBox.width/2 - 100, svgBBox.width/2 + 100),
					y: random.int(svgBBox.height/2 - 200, svgBBox.height/2 - 100),
					r: random.int(80, 120),
				}
			];
			
			while(this.circles.length < numCircles && counter < protection) {
				let circle = {
					x: random.int(0, svgBBox.width),
					y: random.int(0, svgBBox.height),
					r: random.int(40, 120)
				}
				
				let overlapping = false;
				
				for (var i = 0; i < this.circles.length; i++) {
					let existing = this.circles[i];
					let d = distance(circle.x, circle.y, existing.x, existing.y);
					if (d < circle.r + existing.r + 40) {
						overlapping = true;
						break;
					}
				}
				
				if (!overlapping) {
					this.circles.push(circle);      
				}

				counter++;
			}
			
			this.circles.shift();
			this.circles.shift();
			this.circles.shift();
			this.circles.shift();
			
		}
	}
</script>

<style scoped>
	#page { z-index: -2;}
	svg {
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
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
