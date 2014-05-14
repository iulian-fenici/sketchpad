var Intersection = {};
Intersection.intersectPolygonRectangle = function (points, rect) {
	var min = rect[0];
	var max = rect[3];
	var topRight = rect[1];
	var bottomLeft = rect[2];
	var inter1 = Intersection.intersectLinePolygon(min, topRight, points);
	var inter2 = Intersection.intersectLinePolygon(topRight, max, points);
	var inter3 = Intersection.intersectLinePolygon(max, bottomLeft, points);
	var inter4 = Intersection.intersectLinePolygon(bottomLeft, min, points);
	var result = [];
	if (inter1.length) result.push(inter1);
	if (inter2.length) result.push(inter2);
	if (inter3.length) result.push(inter3);
	if (inter4.length) result.push(inter4);
	return result;
};

Intersection.intersectLinePolygon = function (a1, a2, points) {
	var result = [];
	var length = points.length;
	for (var i = 0; i < length; i++) {
		var b1 = points[i];
		var b2 = points[(i + 1) % length];
		var inter = Intersection.intersectLineLine(a1, a2, b1, b2);
		if (inter.length) result.push(inter);
	}
	return result;
};

Intersection.intersectLineLine = function (a1, a2, b1, b2) {
	var result;
	var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
	var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
	var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
	if (u_b != 0) {
		var ua = ua_t / u_b;
		var ub = ub_t / u_b;
		if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
			result = [];
			result.push({
				x: a1.x + ua * (a2.x - a1.x),
				y: a1.y + ua * (a2.y - a1.y)
			});
		} else {
			result = [];
		}
	} else {
		if (ua_t == 0 || ub_t == 0) {
			result = []
		} else {
			result = []
		}
	}
	return result;
};

var points = [{"cmd":"M","x":26,"y":0},{"cmd":"L","x":25,"y":1},{"cmd":"L","x":24,"y":2},{"cmd":"L","x":23,"y":3},{"cmd":"L","x":22,"y":3},{"cmd":"L","x":21,"y":3},{"cmd":"L","x":20,"y":3},{"cmd":"L","x":19,"y":3},{"cmd":"L","x":18,"y":2},{"cmd":"L","x":17,"y":2},{"cmd":"L","x":16,"y":3},{"cmd":"L","x":16,"y":4},{"cmd":"L","x":15,"y":5},{"cmd":"L","x":15,"y":6},{"cmd":"L","x":14,"y":7},{"cmd":"L","x":13,"y":7},{"cmd":"L","x":12,"y":8},{"cmd":"L","x":11,"y":9},{"cmd":"L","x":10,"y":10},{"cmd":"L","x":10,"y":11},{"cmd":"L","x":10,"y":12},{"cmd":"L","x":9,"y":13},{"cmd":"L","x":8,"y":13},{"cmd":"L","x":7,"y":14},{"cmd":"L","x":7,"y":15},{"cmd":"L","x":6,"y":16},{"cmd":"L","x":6,"y":17},{"cmd":"L","x":5,"y":18},{"cmd":"L","x":5,"y":19},{"cmd":"L","x":5,"y":20},{"cmd":"L","x":5,"y":21},{"cmd":"L","x":6,"y":21},{"cmd":"L","x":7,"y":22},{"cmd":"L","x":8,"y":23},{"cmd":"L","x":9,"y":24},{"cmd":"L","x":8,"y":25},{"cmd":"L","x":7,"y":26},{"cmd":"L","x":6,"y":27},{"cmd":"L","x":5,"y":27},{"cmd":"L","x":4,"y":27},{"cmd":"L","x":3,"y":28},{"cmd":"L","x":2,"y":29},{"cmd":"L","x":1,"y":30},{"cmd":"L","x":0,"y":31},{"cmd":"L","x":0,"y":32},{"cmd":"L","x":0,"y":33},{"cmd":"L","x":0,"y":34},{"cmd":"L","x":0,"y":35},{"cmd":"L","x":1,"y":35},{"cmd":"L","x":2,"y":36},{"cmd":"L","x":3,"y":36},{"cmd":"L","x":4,"y":36},{"cmd":"L","x":5,"y":37},{"cmd":"L","x":6,"y":37},{"cmd":"L","x":7,"y":38},{"cmd":"L","x":8,"y":39},{"cmd":"L","x":9,"y":40},{"cmd":"L","x":10,"y":41},{"cmd":"L","x":11,"y":42},{"cmd":"L","x":12,"y":43},{"cmd":"L","x":13,"y":43},{"cmd":"L","x":14,"y":44},{"cmd":"L","x":15,"y":44},{"cmd":"L","x":16,"y":45},{"cmd":"L","x":17,"y":45},{"cmd":"L","x":18,"y":45},{"cmd":"L","x":19,"y":45},{"cmd":"L","x":19,"y":44},{"cmd":"L","x":19,"y":43},{"cmd":"L","x":20,"y":42},{"cmd":"L","x":21,"y":41},{"cmd":"L","x":22,"y":40},{"cmd":"L","x":23,"y":40},{"cmd":"L","x":24,"y":41},{"cmd":"L","x":25,"y":41},{"cmd":"L","x":26,"y":42},{"cmd":"L","x":26,"y":43},{"cmd":"L","x":27,"y":44},{"cmd":"L","x":26,"y":45},{"cmd":"L","x":25,"y":46},{"cmd":"L","x":25,"y":47},{"cmd":"L","x":25,"y":48},{"cmd":"L","x":26,"y":48},{"cmd":"L","x":27,"y":48},{"cmd":"L","x":28,"y":49},{"cmd":"L","x":29,"y":49},{"cmd":"L","x":30,"y":49},{"cmd":"L","x":31,"y":49},{"cmd":"L","x":32,"y":49},{"cmd":"L","x":33,"y":49},{"cmd":"L","x":34,"y":49},{"cmd":"L","x":35,"y":49},{"cmd":"L","x":36,"y":49},{"cmd":"L","x":37,"y":49},{"cmd":"L","x":38,"y":49},{"cmd":"L","x":39,"y":49},{"cmd":"L","x":40,"y":49},{"cmd":"L","x":41,"y":49},{"cmd":"L","x":42,"y":48},{"cmd":"L","x":43,"y":48},{"cmd":"L","x":44,"y":49},{"cmd":"L","x":45,"y":49},{"cmd":"L","x":46,"y":49},{"cmd":"L","x":47,"y":48},{"cmd":"L","x":48,"y":48},{"cmd":"L","x":49,"y":48},{"cmd":"L","x":50,"y":48},{"cmd":"L","x":51,"y":48},{"cmd":"L","x":52,"y":47},{"cmd":"L","x":53,"y":47},{"cmd":"L","x":54,"y":47},{"cmd":"L","x":55,"y":47},{"cmd":"L","x":56,"y":46},{"cmd":"L","x":57,"y":46},{"cmd":"L","x":58,"y":46},{"cmd":"L","x":59,"y":46},{"cmd":"L","x":60,"y":45},{"cmd":"L","x":60,"y":44},{"cmd":"L","x":60,"y":43},{"cmd":"L","x":61,"y":42},{"cmd":"L","x":62,"y":41},{"cmd":"L","x":63,"y":41},{"cmd":"L","x":64,"y":42},{"cmd":"L","x":65,"y":42},{"cmd":"L","x":66,"y":43},{"cmd":"L","x":67,"y":42},{"cmd":"L","x":68,"y":42},{"cmd":"L","x":69,"y":41},{"cmd":"L","x":70,"y":40},{"cmd":"L","x":71,"y":40},{"cmd":"L","x":72,"y":39},{"cmd":"L","x":73,"y":38},{"cmd":"L","x":74,"y":37},{"cmd":"L","x":75,"y":36},{"cmd":"L","x":76,"y":35},{"cmd":"L","x":77,"y":34},{"cmd":"L","x":78,"y":34},{"cmd":"L","x":79,"y":34},{"cmd":"L","x":80,"y":34},{"cmd":"L","x":81,"y":33},{"cmd":"L","x":82,"y":34},{"cmd":"L","x":82,"y":33},{"cmd":"L","x":82,"y":32},{"cmd":"L","x":82,"y":31},{"cmd":"L","x":81,"y":30},{"cmd":"L","x":80,"y":29},{"cmd":"L","x":79,"y":28},{"cmd":"L","x":79,"y":27},{"cmd":"L","x":78,"y":26},{"cmd":"L","x":78,"y":25},{"cmd":"L","x":78,"y":24},{"cmd":"L","x":77,"y":23},{"cmd":"L","x":77,"y":22},{"cmd":"L","x":76,"y":22},{"cmd":"L","x":75,"y":23},{"cmd":"L","x":74,"y":24},{"cmd":"L","x":73,"y":25},{"cmd":"L","x":72,"y":26},{"cmd":"L","x":71,"y":27},{"cmd":"L","x":70,"y":26},{"cmd":"L","x":69,"y":25},{"cmd":"L","x":68,"y":24},{"cmd":"L","x":67,"y":23},{"cmd":"L","x":66,"y":22},{"cmd":"L","x":65,"y":22},{"cmd":"L","x":64,"y":22},{"cmd":"L","x":63,"y":21},{"cmd":"L","x":62,"y":20},{"cmd":"L","x":61,"y":20},{"cmd":"L","x":60,"y":20},{"cmd":"L","x":59,"y":20},{"cmd":"L","x":58,"y":20},{"cmd":"L","x":57,"y":20},{"cmd":"L","x":56,"y":21},{"cmd":"L","x":55,"y":21},{"cmd":"L","x":54,"y":21},{"cmd":"L","x":53,"y":20},{"cmd":"L","x":53,"y":19},{"cmd":"L","x":53,"y":18},{"cmd":"L","x":53,"y":17},{"cmd":"L","x":52,"y":16},{"cmd":"L","x":52,"y":15},{"cmd":"L","x":52,"y":14},{"cmd":"L","x":52,"y":13},{"cmd":"L","x":52,"y":12},{"cmd":"L","x":52,"y":11},{"cmd":"L","x":53,"y":10},{"cmd":"L","x":52,"y":9},{"cmd":"L","x":52,"y":8},{"cmd":"L","x":51,"y":7},{"cmd":"L","x":50,"y":6},{"cmd":"L","x":49,"y":6},{"cmd":"L","x":48,"y":6},{"cmd":"L","x":47,"y":5},{"cmd":"L","x":46,"y":4},{"cmd":"L","x":45,"y":3},{"cmd":"L","x":44,"y":4},{"cmd":"L","x":44,"y":5},{"cmd":"L","x":44,"y":6},{"cmd":"L","x":44,"y":7},{"cmd":"L","x":43,"y":8},{"cmd":"L","x":42,"y":8},{"cmd":"L","x":41,"y":9},{"cmd":"L","x":40,"y":8},{"cmd":"L","x":39,"y":7},{"cmd":"L","x":39,"y":6},{"cmd":"L","x":39,"y":5},{"cmd":"L","x":38,"y":4},{"cmd":"L","x":37,"y":4},{"cmd":"L","x":36,"y":4},{"cmd":"L","x":35,"y":4},{"cmd":"L","x":34,"y":5},{"cmd":"L","x":34,"y":6},{"cmd":"L","x":33,"y":7},{"cmd":"L","x":32,"y":6},{"cmd":"L","x":32,"y":5},{"cmd":"L","x":32,"y":4},{"cmd":"L","x":31,"y":3},{"cmd":"L","x":30,"y":2},{"cmd":"L","x":30,"y":1},{"cmd":"L","x":29,"y":0},{"cmd":"L","x":28,"y":0},{"cmd":"L","x":27,"y":0},{"cmd":"Z","x":26,"y":0}];
var rect = [{"x":12,"y":-16},{"x":31,"y":57},{"x":31,"y":-16},{"x":12,"y":57}] 
 
Intersection.intersectPolygonRectangle(points, rect);