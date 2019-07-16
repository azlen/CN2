
// random
// :: set of functions for generating random numbers or choices
module.exports.random = {
	// random.int
	// :: generates random integer: a <= x <= b
	// a = lower bound for number range
	// b = upper bound for number range
	int: function(a, b) {
		return Math.floor(Math.random() * (b - a + 1) + a);
	},

	// random.float
	// :: generates random floating point number: a <= x <= b
	// a = lower bound for number range
	// b = upper bound for number range
	float: function(a, b) {
		return Math.random() * (b - a) + a;
	}
}

// distance
// :: calculates distance between two points
// x1 = x position of first point
// y1 = y position of first point
// x2 = x position of second point
// y2 = y position of second point
module.exports.distance = function(x1, y1, x2, y2) {
	var a = x1 - x2;
	var b = y1 - y2;

	var c = Math.sqrt( a*a + b*b );
	
	return c;
}


// angle
// :: calculates angle between two points in radians
// :: output range: (-PI, PI]
// cx = x position of first point
// cy = y position of first point
// ex = x position of second point
// ey = y position of second point
module.exports.angle = function(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx);

  return theta;
}

// signedAngle
// :: returns signed angle (angle between two angles)
// a1 = source angle
// a2 = target angle
module.exports.signedAngle = function(a1, a2) {
	return (a1 - a2 + Math.PI) % (Math.PI*2) - Math.PI;
}

// svg context used in multiple utility functions
let _svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// _isPoint
// :: checks true/false whether `p` is valid point of [x, y] format
// p = any array to check value
function _isPoint(p) {
	return (p.length == 2 && p[0].constructor === Number && p[1].constructor === Number);
}

// _applyMatrixToPoint
// :: applies matrix transformation to single [x, y] point
// point = [x, y]
// matrix = matrix to use in transformation
function _applyMatrixToPoint(point, matrix) {
	let originalPoint = _svg.createSVGPoint();

	originalPoint.x = point[0];
	originalPoint.y = point[1];

	// apply matrix transformation
	let transformedPoint = originalPoint.matrixTransform(matrix);

	return [transformedPoint.x, transformedPoint.y];
}

// _applyMatrixToArray
// :: applies matrix transformation to array of [x, y] points
// array = array of [x, y] points to transform
// matrix = matrix to use in transformation
function _applyMatrixToArray(array, matrix) {
	return array.map((point) => _applyMatrixToPoint(point, matrix));
}

// applyMatrix
// :: applies SVG matrix transformation and returns new set of points
// input = either single point or array of points
// matrix = instance of SVGMatrix with desired transformation
module.exports.applyMatrix = function(input, matrix) {
	if(_isPoint(input)) {
		return _applyMatrixToPoint(input, matrix);
	} else {
		return _applyMatrixToArray(input, matrix);
	}
}

// createSVGMatrix
// :: creates instance of empty SVGMatrix
// data = {a,b,c,d,e,f} matrix values to initialize SVGMatrix
module.exports.createSVGMatrix = function(data = {}) {
	let matrix = _svg.createSVGMatrix();

	// populate matrix with any intializing values passed into the function
	'abcdef'.split('').forEach(function(char) {
		if(data.hasOwnProperty(char)) {
			matrix[char] = data[char];
		}
	});

  	return matrix;
}

// createSVGPoint
// :: creates instance of empty SVGPoint
// x = horizontal position to initialize SVGPoint
// y = vertical position to initialize SVGPoint
module.exports.createSVGPoint = function(x = 0, y = 0) {
	let point = _svg.createSVGPoint();

	point.x = x;
	point.y = y;

	return point;
}