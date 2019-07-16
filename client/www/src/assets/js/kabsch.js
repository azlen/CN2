// need to rewrite without numeric as to reduce requirements
const N = require('numeric');

const { createSVGMatrix } = require('./util.js');

// centroid
// :: returns mean ~vector~ of m-dimensional vectors in matrix
// A = N x m matrix
function centroid(A) {
	return N.div( A.reduce((a,b) => N.add(a,b), [0, 0]), A.length);
}

// kabsch
// :: calculate
// :: R, [a,b,c,d], rotation matrix (-1 <= a,b,c,d <= 1)
// :: t, [e,f], translation vector
// :: c, [g,h], scale multiplier vector
// A = N x m matrix
// B = N x m matrix
function kabsch(A, B) {
	console.assert(A.length === B.length);
	//-// console.assert(A.length > 0);
	//-// console.assert(A[0].length === B[0].length);

	// find dimension of vectors
	let m = A[0].length;

	// find centroids
	let centroid_A = centroid(A);
	let centroid_B = centroid(B);

	// centre the points
	let AA = A.map(v => N.sub(v, centroid_A));
	let BB = B.map(v => N.sub(v, centroid_B));

	// calculate covariance matrix
	let H = N.dot(N.transpose(AA), BB);

	// apply singular value decomposition to covariance matrix
	let { U, S, V } = N.svd(H);

	// calculate rotation matrix
	let R = N.dot(U, N.transpose(V));

	// create vector of length m, filled with 1's
	let fix = N.rep([m], 1);

	// special reflection case
	if (N.det(R) < 0) {
		console.log("reflection detected");
		
		// set `fix` to [1, 1, ... -1]
		fix[m - 1] = -1;
		// dot rotation matrix by diagonal matrix of `fix`
		// diagonal matrix of `fix` is [1, 1 ... -1] identity matrix
		R = N.dot(R, N.diag(fix));
	}

	// calculate translation vector
	let t = N.sub(centroid_B, centroid_A);

	// calculate variance of AA, BB
	let sigma_A = AA.reduce((a,b) => numeric.add(numeric.abs(a), numeric.abs(b)));
	let sigma_B = BB.reduce((a,b) => numeric.add(numeric.abs(a), numeric.abs(b)));

	// calculate scale multiplier vector with variance ratio
    let c = numeric.div(sigma_B, sigma_A);
    
    // flatten rotation matrix
    R = [].concat.apply([], R)

	// return output
	return {
		'R': R,
		't': t,
		'c': c
	}
}

// kabschSVGMatrix
// :: returns ~transformation matrix~ of kabsch algorithm to `tm`
// kabschOutput = output from `kabsch()` function
// A = N x m matrix
// B = N x m matrix
function kabschSVGMatrix(kabschOutput) {
    // let { R, t, c } = kabsch(A, B);

    let { R, t, c } = kabschOutput;

    let tm = createSVGMatrix();

	// calculate current scale from matrix
	let scaleX = Math.sqrt(tm.a*tm.a + tm.b*tm.b);
	let scaleY = Math.sqrt(tm.c*tm.c + tm.d*tm.d);

	// (scale) * (scale multiplier) * (rotation multiplier)
	tm.a = scaleX * c[0] * R[0];
	tm.b = scaleX * c[0] * R[1];
	tm.c = scaleY * c[1] * R[2];
	tm.d = scaleY * c[1] * R[3];

	// 100 0 0 100 0 0

	// (position) + (translation)
	tm.e = tm.e + t[0];
	tm.f = tm.f + t[1];

	return tm;
}

// svgMatrixToString
// :: converts `tm` to "matrix(a b c d e f)"
// tm = svg transformation matrix
function svgMatrixToString(tm) {
	return `matrix(${tm.a} ${tm.b} ${tm.c} ${tm.d} ${tm.e} ${tm.f})`
}

// pointsToSVGPath
// :: converts array of points into svg path string
// points = array of points, each point formated [x, y]
function pointsToSVGPath(points) {
    let pathString = '';
    for(let i = 0; i < points.length; i++) {
        pathString += i===0?'M':'L';

        pathString += points[i][0] + ' ' + points[i][1];
    }
    return pathString;
}

// equalizePointArrays
// :: turns two arrays of points into arrays of equal length
// :: by default takes the maximum length unless new length specified
// A = array A
// B = array B
function equalizePointArrays(A, B, newLength) {
    newLength = newLength || Math.max(A.length, B.length);

    let pathA = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let pathB = document.createElementNS("http://www.w3.org/2000/svg", "path");

    pathA.setAttribute('d', pointsToSVGPath(A));
    pathB.setAttribute('d', pointsToSVGPath(B));

    let totalLengthA = pathA.getTotalLength();
    let totalLengthB = pathB.getTotalLength();

    let newA = [];
    let newB = [];

    for(let i = 0; i < newLength; i++) {
        let percent = i / newLength;

        let pointA = pathA.getPointAtLength(totalLengthA * percent);
        let pointB = pathB.getPointAtLength(totalLengthB * percent);

        newA.push([pointA.x, pointA.y]);
        newB.push([pointB.x, pointB.y]);
    }

    return [newA, newB]
}

module.exports = {
    svgMatrixToString,
    kabschSVGMatrix,
    kabsch,
    pointsToSVGPath,
    equalizePointArrays
}