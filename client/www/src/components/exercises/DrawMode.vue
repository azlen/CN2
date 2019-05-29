<template>
	<div class="drawingContainer">
		<div class="paddedContainer wordInformation">
			<div class="definition">{{ word.definition }}</div>
		</div>
		<div class="drawingArea">
			<svg class="drawingBoard" ref="drawingBoard" viewBox="-512 -512 1024 1024"
			     v-on:touchstart="touchStart" v-on:touchmove="touchMove" v-on:touchend="touchEnd">
				<path v-for="data in lines" :d="pointsToSVGPath(data)"></path>
			</svg>
		</div>
	</div>
</template>

<script>
	import { distance, angle } from './../../assets/js/util.js'
	
	import { mapState, mapActions } from 'vuex'

    export default {
		data() {
			return {
				drawing: false,
				lines: [],
			};
		},
		props: [ 'hanzi', 'swipe' ],
		computed: {
			...mapState('data', {
				word(state) {
					return state.words[this.hanzi];
				}
			})
		},
		methods: {
			globalPosToSVGPos(globalPos) {
				/*console.log('TEST');
				var relativeToElement = this.$refs.drawingBoard.createSVGPoint();
				console.log('TEST2');

				let SVGBBox = this.$refs.drawingBoard.getBoundingClientRect();
				relativeToElement.x = globalPos.x - SVGBBox.x;
				relativeToElement.y = globalPos.y - SVGBBox.y;

				console.log('TEST4');*/

				let point = this.$refs.drawingBoard.createSVGPoint();
				point.x = globalPos.x;
				point.y = globalPos.y;
				
				let SVGPos = point.matrixTransform(this.$refs.drawingBoard.getScreenCTM().inverse());

				return SVGPos;
				//
				/*let relativeToElement = {
					'x': p.x - SVGBBox.top,
					'y': p.y - SVGBBox.left,
				}*/

			},
			touchStart(e) {
				e.preventDefault();
				e.stopPropagation();

				let touch = e.touches[0];
				let pos = this.globalPosToSVGPos({ x: touch.clientX, y: touch.clientY });

				this.drawing = true;
				this.lines.push([{x:pos.x, y:pos.y}]);
			},
			touchMove(e) {
				if(this.drawing === true) {
					e.preventDefault();
					e.stopPropagation();
					
					let touch = e.touches[0];
					let pos = this.globalPosToSVGPos({ x: touch.clientX, y: touch.clientY });

					this.lines[this.lines.length-1].push({x:pos.x, y:pos.y});

					if(this.lines.length >= this.word.characters[0].medians.length) {
						this.swipe.next();
					}
				}

			},
			touchEnd(e) {
				if(this.drawing === true) {
					e.preventDefault();
					e.stopPropagation();
					
					let touch = e.touches[0];
					let pos = this.globalPosToSVGPos({ x: touch.clientX, y: touch.clientY });

					this.lines[this.lines.length-1].push({x:pos.x, y:pos.y});

					

					this.drawing = false;

					//console.log(JSON.stringify(Object.keys(this.swipe)))
					//console.log(this.word.characters[0].medians.length);
				}
			},
			pointsToSVGPath(points) {
				let pathString = '';
				for(let i = 0; i < points.length; i++) {
					pathString += i===0?'M':'L';

					pathString += points[i].x + ' ' + points[i].y;
				}
				return pathString;
			}
		},
		mounted(){

}
    }
</script>

<style scoped>
	.mint-swipe-items-wrap>div .drawingContainer {
		transition: opacity 0.3s ease-out;
		opacity: 0;
	}
	.mint-swipe-items-wrap>div:not(.is-active) .drawingContainer { transition-delay: 0 !important; }
	.mint-swipe-items-wrap>div.is-active .drawingContainer { opacity: 1; }

	.drawingContainer {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: visible;
		flex-direction: column;
	}

	.wordInformation {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.drawingArea {
		flex: 1 0 1;

		position: relative;
		width: 100%;
		padding-bottom: 120%;
	}
	.drawingBoard {
		position: absolute;
		top: 0; left: 0;
		width: 100%;
		height: 100%;
	}

	.definition {
		font-family: serif;
		font-style: italic;
		text-align: center;
		color: #6C8296;
		color: #8Ca2b6;
		margin-top: 10px;
	}

	path {
		fill: none;
		stroke: #FFFFFF;
		stroke-width: 20;
		stroke-linecap: round;
	}
</style>
