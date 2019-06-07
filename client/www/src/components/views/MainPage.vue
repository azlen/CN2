<template>
	<div id="page" :class="theme">
		<!-- SVG to render atypical UI components to create a unique interface -->
		<svg id="svg">
			<defs>
				<!-- Background for metaballs -->
				<linearGradient id="gradient" x1="-11" y1="-15" x2="428.095" y2="3.53381" gradientUnits="userSpaceOnUse">
					<stop stop-color="#1C5FAE"/>
					<stop offset="1" stop-color="#1AAD81"/>
				</linearGradient>
			</defs>
			
			<!-- Metaballs group -->
			<g fill="url(#gradient)">
				<!-- Randomly placed non-overlapping circles -->
				<circle v-for="circle in circles" :cx="circle.x" :cy="circle.y" :r="circle.r"></circle>

				<!-- SVG connectors between certain circles to create the metaball aesthetic -->
				<path v-for="path in connectors" :d="path"></path>
			</g>

			<!-- Learn button -->
			<g class="svg-button">
				
				<circle :cx="svgButton.x" :cy="svgButton.y" :r="svgButton.r" v-touch:tap="learnPage"></circle>
				
				<!-- Chinese character for learning; better to use SVG than import an entire chinese font just for one character -->
				<svg class="svg-button-text-zh" :x="svgButton.x-28" :y="svgButton.y-40" width="57" height="59" viewBox="0 0 57 59" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M32.212 10.416C31.38 7.664 29.14 3.44 26.9 0.239998L24.212 1.2C26.388 4.4 28.628 8.752 29.396 11.568L32.212 10.416ZM5.204 14.448H52.308V23.472H55.316V11.632H44.052C46.356 8.944 48.852 5.424 50.9 2.352L47.956 1.072C46.292 4.208 43.22 8.688 40.788 11.632H13.652L15.892 10.288C14.804 7.856 12.052 4.08 9.556 1.328L6.996 2.544C9.428 5.296 12.052 9.072 13.268 11.632H2.26V23.472H5.204V14.448ZM56.66 36.784H29.908V33.264C35.796 30.832 42.324 27.248 46.484 23.472L44.436 21.872L43.732 22.064H10.9V24.88H40.276C36.564 27.504 31.38 30.192 26.836 31.792V36.784H0.66V39.664H26.836V54.384C26.836 55.28 26.58 55.6 25.236 55.728C23.956 55.856 19.924 55.856 14.42 55.728C14.996 56.624 15.636 57.776 15.892 58.672C21.908 58.672 25.364 58.672 27.348 58.16C29.268 57.584 29.908 56.624 29.908 54.384V39.664H56.66V36.784Z" fill="#5ECCDB"/>
				</svg>
				<!-- English label for learn button -->
				<text class="svg-button-text-en"  :x="svgButton.x" :y="svgButton.y + 37">Learn</text>

				<!-- Daily goal text; attached to learn button group to keep relative position -->
				<text class="daily-goal-text" :x="svgButton.x" :y="svgButton.y + 90">Daily Goal</text>	
				<text class="daily-progress-text" :x="svgButton.x" :y="svgButton.y + 108">{{ dailyProgress }} / {{ dailyGoal }}</text>	
			</g>

			<!-- Progress bar arc -->
			<path class="progress" :d="`M ${svgButton.x-65} ${svgButton.y+65} A 92.3 92.3 0 1 1 ${svgButton.x+65} ${svgButton.y+65}`"></path>
			<path class="progress" :style="`stroke: url(#gradient); stroke-dasharray: 436; stroke-dashoffset: ${436-436*Math.min(dailyProgress/dailyGoal, 1)};`" :d="`M ${svgButton.x-65} ${svgButton.y+65} A 92.3 92.3 0 1 1 ${svgButton.x+65} ${svgButton.y+65}`"></path>
		</svg>
		<!-- As the SVG is absolutely positioned, the header needs to be in front of it in the DOM to display -->
		<header-component iconleft="menu" iconright="settings"></header-component>
	</div>
</template>

<script>
	import HeaderComponent from './../shared/HeaderComponent.vue'
	import metaball from './../../assets/js/metaball.js'
	import router from './../../vue/router/index.js'

	import { mapState, mapActions } from 'vuex'
	
	import { distance, random } from './../../assets/js/util.js'

	export default {
		data(){
			return {
				svgBBox: {},
				svgButton: {
					x: null,
					y: null,
					r: 70
				},
				circles: [],
				connectors: [],
				dailyProgress: 5,
				dailyGoal: 20,
			}
		},
		computed: {
			...mapState('options', {
				'simplifiedOrTraditional': state => state.simplifiedOrTraditional,
				'theme': state => state.theme,
			}),
		},
		components: {
			HeaderComponent,
			//ButtonBig
		},
		methods: {
			learnPage(e) {
				router.push('/learn');
			}
		},
		mounted(){
			//this.updateLanguage(navigator.language || navigator.userLanguage);
			this.svgBBox = document.querySelector('#svg').getBoundingClientRect();
			this.svgBBox = document.querySelector('body').getBoundingClientRect();

			//alert(`${this.svgBBox.height}, ${window.screen.height}, ${document.querySelector('body').getBoundingClientRect().height}`);

			this.svgButton.x = this.svgBBox.width/2;
			this.svgButton.y = this.svgBBox.height-130;
			
			let numCircles = 15;     // maximum number of circles
			let protection = 10000;  // maximum number of iterations
			let counter = 0;         // count of number of iterations
			
			this.connectors = [];    // paths of connectors between circles
			this.circles = [
				// these first four circles are initialized to prevent new -
				// circles from being generated in certain key locations

				// these no-go zones are later removed from the array -
				// so that they are not finally rendered in the SVG

				{ x: this.svgButton.x, y: this.svgButton.y+20, r: this.svgButton.r + 50},

				// bottom-left corner
				{ x: 0, y: this.svgBBox.height, r: 10 },

				// bottom-right corner
				{ x: this.svgBBox.width, y: this.svgBBox.height, r: 10 },

				// top-middle logo
				{ x: this.svgBBox.width/2, y: 30, r: 30 },


				// this circle is simply an initial "big" circle around the center of the screen
				// initializing with this constrained circle creates reliably better results
				{ 
					x: random.int(this.svgBBox.width/2 - 100, this.svgBBox.width/2 + 100),
					y: random.int(this.svgBBox.height/2 - 200, this.svgBBox.height/2 - 100),
					r: random.int(80, 120),
				}
			];
			
			// place circles randomly without overlap
			// stops if too many cycles do not produce desired result

			while(this.circles.length < numCircles && counter < protection) {

				// the circle is placed at random position with random radius
				let circle = {
					x: random.int(0, this.svgBBox.width),
					y: random.int(0, this.svgBBox.height),
					r: random.int(30, 120)
				}
				
				let overlapping = false;
				
				// check if circle is too close with any other circle
				for (var i = 0; i < this.circles.length; i++) {
					let existing = this.circles[i];
					let d = distance(circle.x, circle.y, existing.x, existing.y);

					// circles must be at least 40 pixels away from each other
					if (d < circle.r + existing.r + 40) {
						overlapping = true;
						break;
					}
				}
				
				// add circle to visualization 
				if (!overlapping) {
					this.circles.push(circle);      
				}

				// add to counter to prevent an infinite loop
				counter++;
			}
			
			// remove first four "guide" circles which exist to prevent new -
			// circles from being generated in several key locations.
			this.circles.shift();
			this.circles.shift();
			this.circles.shift();
			this.circles.shift();


			// generate metaball connections between nearby circles

			let unjoined = this.circles.slice();
			while (unjoined.length > 1) {
				let circle1 = unjoined.shift();

				for (let i = 0; i < unjoined.length; i++) {
					let circle2 = unjoined[i];
					let d = distance(circle1.x, circle1.y, circle2.x, circle2.y);
					if (d < circle1.r*2 + circle2.r*2) {
						unjoined.splice(i, 1);

						this.connectors.push(metaball(
							circle1.r, circle2.r,
							[circle1.x, circle1.y],
							[circle2.x, circle2.y],
						));
						break;
					}
				}
			}
			
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
		font-size: 56px;
		letter-spacing: -5px;

		pointer-events: none;
	}
	.svg-button .svg-button-text-en {
		font-family: "Noto Sans", serif;
		font-weight: bold;
		fill: #D2E6F4;
		text-anchor: middle;
		font-size: 15px;

		pointer-events: none;
	}

	.svg-button circle {
		transition: fill .2s ease;
		fill: #12415B;
	}
	.svg-button circle:active {
		fill: #22616B;
	}

	.progress {
		fill: none;
		stroke: #233A47;
		stroke-width: 15px;
		stroke-linecap: round;
	}

	.daily-goal-text {
		font-family: 'Lato', sans-serif;
		text-anchor: middle;
		font-weight: bold;
		fill: #435A67;
		font-size: 14px;
	}

	.daily-progress-text {
		font-family: 'Lato', sans-serif;
		text-anchor: middle;
		font-weight: bold;
		fill: #5ECCDB;
		font-size: 14px;
	}
</style>
