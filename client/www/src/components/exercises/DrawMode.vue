<template>
	<div class="drawingContainer">
		<div class="paddedContainer wordInformation">
			<div class="definition">{{ word.definition }}</div>
		</div>
		<div class="drawingArea">
			<svg class="drawingBoard" ref="svg" viewBox="-512 -512 1024 1024"
			     v-on:touchstart="touchStart" v-on:touchmove="touchMove" v-on:touchend="touchEnd">
				
				<g class="guides">
					<!-- diagonal guide == top-left -> bottom-right -->
					<path d="M-512,-512,L512,512"></path>

					<!-- vertical guide == top -> bottom -->
					<path d="M0,-512,L0,512"></path>

					<!-- diagonal guide == top-right -> bottom-left -->
					<path d="M512,-512,L-512,512"></path>
				</g>

				<path v-for="data in lines" :d="pointsToSVGPath(data)"></path>
			</svg>
		</div>
	</div>
</template>

<script>
	import { distance, angle, signedAngle, applyMatrix, createSVGMatrix } from './../../assets/js/util.js'
	import { kabsch, kabschSVGMatrix, equalizePointArrays, svgMatrixToString } from './../../assets/js/kabsch.js'
	
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
			// globalPosToSVGPos
			// :: converts point from screen XY coordinates to svg XY coordinates
			// globalPos = {x, y} point with screen coordinates (clientX, clientY)
			globalPosToSVGPos(globalPos) {
				let point = this.$refs.svg.createSVGPoint();
				point.x = globalPos.x;
				point.y = globalPos.y;
				
				let SVGPos = point.matrixTransform(this.$refs.svg.getScreenCTM().inverse());

				return SVGPos;
			},

			// touchStart (callback)
			// :: initialize stroke when user touches drawing area
			// e = event object
			touchStart(e) {
				e.preventDefault();
				e.stopPropagation();

				let touch = e.touches[0];
				let pos = this.globalPosToSVGPos({ x: touch.clientX, y: touch.clientY });

				this.drawing = true;
				this.lines.push({
					status: 0, // 0 == drawing; 1 == correct; -1 == wrong
					points: [[pos.x, pos.y]],
				});
			},

			// touchMove (callback)
			// :: add points to stroke following the user's finger
			// e = event object
			touchMove(e) {
				if(this.drawing === true) {
					e.preventDefault();
					e.stopPropagation();
					
					let touch = e.touches[0];
					let pos = this.globalPosToSVGPos({ x: touch.clientX, y: touch.clientY });

					let line = this.lines[this.lines.length-1];
					let point = [pos.x, pos.y];
					
					line.points.push(point);

					if(this.lines.length >= this.word.characters[0].medians.length) {
						//this.swipe.next();
					}
				}
			},

			// touchEnd (callback)
			// :: add last point to stroke and grade accuracy using kabsch algorithm
			// e = event object
			touchEnd(e) {
				if(this.drawing === true) {

					console.log('TOUCH END');

					e.preventDefault();
					e.stopPropagation();
					
					/*let touch = e.touches[0];
					let pos = this.globalPosToSVGPos({ x: touch.clientX, y: touch.clientY });

					let line = this.lines[this.lines.length-1];
					let point = [pos.x, pos.y];

					line.push(point);*/

					let check = this.checkStroke();

					this.drawing = false;

					//console.log(JSON.stringify(Object.keys(this.swipe)))
					//console.log(this.word.characters[0].medians.length);
				}
			},

			// pointsToSVGPath (DELETE THIS)
			// :: converts array of points into svg path string
			// :: duplicate of function in `kabsch.js`
			// :: perhaps move to `util.js`?
			pointsToSVGPath(points) {
				let pathString = '';
				for(let i = 0; i < points.length; i++) {
					pathString += i===0?'M':'L';

					pathString += points[i][0] + ' ' + points[i][1];
				}
				return pathString;
			},

			// checkStroke
			// :: grades accuracy of stroke using kabsch algorithm
			checkStroke() {
				// PLAN
				// 1. kabsch answer -> drawing
				// 2. reject under certain rotations ? unless stroke small enough to not matter
				// 3. drawing 0.5x morph -> answer ?? (option to change this)
				// 4. save matrix
				// 5. kabsch answer (under prev matrix) -> drawing; 2; 3;
				// 6. update matrix
				// 7. goto 5 until complete character

				let character = this.word.characters[0];
				let medians = character.medianPoints;

				// === STEP 1 ===
				// First we calculate kabsch transformation for all previously drawn points
				let baseTransform;
				
				if(this.lines.length > 1) {
					// point cloud which will contain all points of drawn lines flattened into single array
					let linePointCloud = [];
					// point cloud which will contain all points of medians flattened into single array
					let medianPointCloud = [];
					
					// populate point clouds with all lines except the current one being drawn
					for(let i = 0; i < this.lines.length - 1; i++) {
						let lineAtIndex = this.lines[i].points;
						let medianAtIndex = medians[i];

						// number of sampled points based on stroke length
						let nPoints = Math.round(character.medians.totalLength / 10);
						
						// sample an equal number of points along line and median
						let [equalizedLine, equalizedMedian] = equalizePointArrays(lineAtIndex, medianAtIndex, nPoints);

						// push all points to their respective "point cloud"
						linePointCloud = linePointCloud.concat(equalizedLine);
						medianPointCloud = medianPointCloud.concat(equalizedMedian);
					}

					// transformation of previous medians->lines serves as base matrix for future analysis
					baseTransform = kabsch(medianPointCloud, linePointCloud);
				} else {
					// empty base transformation if there are no lines already drawn
					baseTransform = {
						R: [1, 0, 0, 1],
						c: [1, 1],
						t: [0, 0]
					};
				}

				// Turn into function to constrain kabsch output?
				baseTransform.R = [1, 0, 0, 1];
				let avgScale = (baseTransform.c[0] + baseTransform.c[1]) / 2;
				let maxScaleDeviation = 0.2;
				let newScale = Math.min(Math.max(avgScale, 1.0-maxScaleDeviation), 1.0+maxScaleDeviation)
				
				baseTransform.c = [newScale, newScale];
				

				// === STEP 2 ===

				let currentStrokeIndex = this.lines.length - 1;

				let currentLine = this.lines[currentStrokeIndex].points;
				let currentMedian = medians[currentStrokeIndex];

				let nPoints = 40;
				let equalizedLines = equalizePointArrays(currentLine, currentMedian, nPoints);

				currentLine = equalizedLines[0];
				currentMedian = equalizedLines[1];

				let baseMatrix = kabschSVGMatrix(baseTransform);

				let baseMedian = applyMatrix(currentMedian, baseMatrix);

				let offsetTransform = kabsch(baseMedian, currentLine);
				let offsetMatrix = kabschSVGMatrix(offsetTransform);

				let mappedMedian = applyMatrix(baseMedian, offsetMatrix);

				//console.log(JSON.stringify(currentLine));
				//console.log(JSON.stringify(mappedMedian));

				let similarity = 0;
				for(let i = 0; i < nPoints; i++) {
					let p1 = currentLine[i];
					let p2 = mappedMedian[i];
					let dist = distance(p1[0], p1[1], p2[0], p2[1]);

					similarity += dist;
				}
				similarity /= nPoints;

				let rotationalSimilarity = 0;
				for(let i = 0; i < nPoints-5; i++) {
					let a1 = currentLine[i];
					let a2 = currentLine[i+5];
					let b1 = mappedMedian[i];
					let b2 = mappedMedian[i+5];

					let at = angle(a1[0], a1[1], a2[0], a2[1]);
					let bt = angle(b1[0], b1[1], b2[0], b2[1]);

					//console.log(at);
					//console.log(bt);

					let diff = signedAngle(at, bt);

					rotationalSimilarity += Math.abs(diff);
				}
				rotationalSimilarity /= nPoints-5;

				console.log('distance', similarity);
				console.log('rotational', rotationalSimilarity);
				console.log('transform', offsetTransform.t);



				//let matrixString = svgMatrixToString(matrix);

				//let mappedMedian = applyMatrix(B, matrix);

				//console.log(score);
				
				/*this.lines.pop();
				if(score < 50) {
					this.lines.push(mappedMedian);
				}*/

				if(similarity < 200 && rotationalSimilarity < 0.4) {
					this.lines[currentStrokeIndex].status = 1;
				} else {
					this.lines[currentStrokeIndex].status = -1;
				}


				//console.log(kabschOutput);
				//console.log(matrixString);
			},

			// blah (TEMPORARY)
			// :: removes all lines from display
			// :: called in `Learn.vue`
			blah() {
				this.lines = [];
			}
		},
		mounted(){
			// TEMPORARY: remove lines when swipe index changes
			// Perhaps there is a cleaner solution to this?
			/*this.swipe.addEventListener('change', function() {
				this.lines = [];
			}.bind(this))*/

			//this.lines.push();
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

	.guides path {
		fill: none;
		stroke: rgba(255, 255, 255,0.2);
		stroke-width: 1;
	}
</style>
