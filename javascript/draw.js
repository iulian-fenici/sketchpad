var preventDefault = true;

var init = {
	'canvas' : function(w, h, u) {
		gui_swatch.id = 'CO';
		function z(n) {
			return (Math.floor(Math.random() * n));
		}
		$('ctx_box').width = canvas.W = w;
		$('ctx_box').height = canvas.H = h;
		crop.apply({
			X : 0,
			Y : 0
		}, {
			X : w,
			Y : h
		});
		if (isNaN(vars.winW) || isNaN(vars.winH)) {
			vars.winW = parseInt(canvas.W);
			vars.winH = parseInt(canvas.H);
		}
		if (u) {
			var img = new Image();
			img.src = u;
			img.onload = function() {
				var c = $2D('ctx_box');
				co.del(c);
				c.drawImage(img, 0, 0, canvas.W, canvas.H);
			};
		} else {
			var a = {
				X : 0,
				Y : 0
			}, b = {
				X : w,
				Y : h
			}, c = $2D('ctx_box');
			c.rect(0, 0, w, h);
			co.gradient(a, b, c, vars.GD[z(vars.GD.length)], 'fill', 1);
		}
	},
	'content' : function() {
		// Windows
		if (vars.winMax == 1) {
			win_size.max();
		} else if (!isNaN(vars.winW)) {
			win_size.fu({
				W : zero(vars.winW),
				H : zero(vars.winH)
			}, win_size.construct({}));
		} else {
			canvas.resize(700, 575);
		}
		init.canvas(700, 575);
		gui.options();
		gui_tools.imageMap();
		// Interface
		gui_palette.update('stroke');
		gui_palette.update('fill');
		gui_palette.zindex(vars.id);
		crop.ratio_mk();
		gui_color.mk();
		gui_gradient.mk();
		gui_pattern.mk();
		gui_swatch.mk();
		win.feed();
		gui_tools.imageCurrent(vars.tool);
		canvas.mode_sw(vars.mode = vars.mode ? vars.mode : 'paint');
		canvas.history_mk();
		init.events();
	},
	'events' : function() {
		// Canvas
		var o = $('cBound');
		o.oncontextmenu = function(e) {
			if ({
				'zoom' : 1,
				'path' : 1,
				'shape' : 1,
				'marquee' : 1
			}[vars.type])
				return false;
		};
		o.ondblclick = function(e) {
			if (vars.type == 'text') {
				noMove();
				// co.core(e, text.core);
			}
		};
		o.onmousemove = function(e) {
			if (stop) {
				if ({
					'marquee' : 1,
					'text' : 1,
					'crop' : 1
				}[vars.type]) {
					mouse.cursor(e, this);
				}
				if (vars.type == 'picker') {
					var a = XY(e);
					a.X -= abPos(this).X;
					a.Y -= abPos(this).Y;
					a.X = Math.max(0, Math.min(canvas.W - 1, a.X));
					a.Y = Math.max(0, Math.min(canvas.H - 1, a.Y));
					picker.core(a, '', 'move');
				}
			}
		};
		o.onmousedown = function(e) {
			if (vars.type == 'crop') {
				co.core(e, crop.core);
			} else if (vars.type == 'fill') {
				co.core(e, draw.fill);
			} else if (vars.type == 'marquee') {
				co.core(e, marquee.core);
			} else if (vars.type == 'picker') {
				var a = XY(e);
				a.X -= abPos(this).X;
				a.Y -= abPos(this).Y;
				a.X = Math.max(0, Math.min(canvas.W - 1, a.X));
				a.Y = Math.max(0, Math.min(canvas.H - 1, a.Y));
				picker.core(a, a, 'down', e);
			} else if (vars.type == 'shape') {
				co.core(e, draw.shape);
			} else if (vars.type == 'text') {
				co.core(e, draw.text);
			} else if ({
				'calligraphy' : 1,
				'stamp' : 1
			}[vars.type]) {
				if (stamp.loaded) {
					co.core(e, draw[vars.type]);
				} else {
					noMove();
				}
			} else if (vars.type == 'spirograph') {
				co.core(e, draw.spirograph);
			} else if ({
				'brush' : 1,
				'pencil' : 1,
				'eraser' : 1
			}[vars.type]) {
				co.core(e, draw[vars.type]);
			} else {
				return noMove();
			}
			return false;
		};
		o.onmouseout = function(e) {
			if (stop) {
				if (vars.type == 'picker') {
					var a = XY(e);
					a.X -= abPos(this).X;
					a.Y -= abPos(this).Y;
					a.X = Math.max(0, Math.min(canvas.W - 1, a.X));
					a.Y = Math.max(0, Math.min(canvas.H - 1, a.Y));
					picker.core(a);
				}
			}
		};
		// Mouse Wheel
		var o = {
			'stamp' : $C('MM', 'options'),
			'hi' : $C('MM', 'history'),
			'CO' : $C('CO', 'swatch'),
			'GD' : $C('GD', 'swatch'),
			'PT' : $C('PT', 'swatch')
		};
		function addWheel(id) {
			Event.add(o[id][0], {
				el : 'DOMMouseScroll',
				e : 'onmousewheel'
			}, function(event) {
				gui.Y.id = id;
				gui.Y.wheel(event);
				event.preventDefault();
			});
		}
		;
		for ( var i in o)
			addWheel(i);
		// Window CoreXY
		var o = $C('gui', document.body);
		for ( var i = 0; i < o.length; i++) {
			if (o[i].onmousedown)
				continue;
			Event.add(o[i], {
				el : 'mousedown',
				e : 'onmousedown'
			}, function(event) {
				core.fu(this.id, event, {
					fu : core.win,
					Y1 : 19,
					z : true
				});
			});
		}
	},
	'images' : function() {
		var dir = 'media/gui/';
		op_8x8 = new Image();
		op_8x8.src = dir + 'op_8x8.gif';
		path = {
			point : new Image(),
			node_select : new Image()
		};
		path.point.src = dir + 'point.png';
		path.node_select.src = dir + 'node_select.png';
	},
	'swatch' : function() {
		var rand = N.rand;
		init.images();
		if (typeof ScreenMetrics == 'function') {
			$.metrics = ScreenMetrics();
		}
		function PT(v, n) {
			var n = vars.PT.length;
			var random;
			if (vars['PT*'] == 'Squidfingers')
				random = Math.random() > .5 ? '82' : '105';
			else
				random = rand(n);
			src = gui_pattern.dir + vars['PT*'] + '/'
					+ (gui_swatch.n[v + 'PT'] = random) + '-live.jpg';
			gui_pattern.o[v].src = src;
			vars[v + 'PT'].src = src;
			gui_swatch.n[v + 'PT'] = n - gui_swatch.n[v + 'PT'];
		}
		function CO(v) {
			var n = vars[v].length, a = rand(n), z = rand(n);
			vars['fill' + v] = vars[v][a];
			gui_swatch.n['fill' + v] = a + 1;
			vars['stroke' + v] = vars[v][z];
			gui_swatch.n['stroke' + v] = z + 1;
		}
		vars.CO = Q.CO[vars['CO*']];
		vars.GD = Q.GD[vars['GD*']];
		vars.PT = Q.PT[vars['PT*']];
		CO('CO');
		CO('GD');
		PT('fill');
		PT('stroke');
		// setTimeout( init.content, 1000);

		gui_pattern.o.fill.onload = function() {
			if (gui_pattern.o.stroke.loaded)
				init.content();
			gui_pattern.o.fill.loaded = 1;
		};
		gui_pattern.o.stroke.onload = function() {
			if (gui_pattern.o.fill.loaded)
				init.content();
			gui_pattern.o.stroke.loaded = 1;
		};
	}
};

var ants = [];
var ants_n = 0;

window.onresize = win.feed;
window.currentBlob = null;
window.currentPort = null;
window.saveDrawing = function() {
	window.location.href = $('ctx_box').toDataURL();
};
window.onload = function() {
	if (document.location.hash == '#snapshot') {
		document.body.style.background = 'transparent';
		// FIXME: Waiting on toBlob for Canvas
		window.saveDrawing = function(e) {
			if (!window.currentPort) {
				window.href = $('ctx_box').toDataURL();
			}
			var n = $('ctx_box').toDataURL();
			window.currentPort.postMessage("send", '*');
			window.currentPort.postMessage(n, '*');
			return false;
		};
		window.onmessage = function(event) {
			if (event.origin.indexOf('chrome-extension:') == -1)
				if (event.origin != 'http://mugtug.com')
					if (event.origin != 'https://mugtugdarkroom.appspot.com')
						if (event.origin != 'https://mugtugsketchpad.appspot.com')
							return;
			if (event.source != window.self)
				event.source.postMessage("recv", '*');
			var data = event.data;
			if (typeof (data) == 'object' && data.type) {
				if (window.currentBlob)
					webkitURL.revokeObjectURL(window.currentBlob);
				window.currentBlob = webkitURL.createObjectURL(data);
				data = window.currentBlob;
				window.currentPort = event.source;
			}
			if (data.indexOf(':') > -1) {
				var a = document.createElement('img');
				a.onload = function() {
					var width = a.naturalWidth;
					var height = a.naturalHeight;
					win_size.fu({
						W : width,
						H : height
					}, win_size.construct({}));
					canvas.resize(width, height);
					init.canvas(width, height, data);
				};
				a.src = data;
			}
		};
		if (window.parent && window.parent != window.self) {
			// FIXME: Don't ack until load, otherwise we'll overwrite the image.
			setTimeout(function() {
				if (window.parent.postMessage)
					window.parent.postMessage('ack', '*');
			}, 300);
		}
	}
	setTimeout(function() {
		dtx2D = document.createElement("canvas");
		ctx2D = dtx2D.getContext('2d');
	}, 100);
	setTimeout(init.swatch, 250);
	setTimeout(
			function() {
				data2pattern(
						ants,
						[
								"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAMklEQVQYlYXOtw0AMAzEQO6/NN04QAlW+cdCAALmOzsftGjAHGRUX9DhDSbcNmMJuocXA4afYTYwTaEAAAAASUVORK5CYII=",
								"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAMklEQVQYlYXPsQ0AMAjEQO+/tFOkIALxQaI6FwDgu334YAUL3iCgQ/tNJFQr2L4hoeoBA4afYdiStBMAAAAASUVORK5CYII=",
								"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAMklEQVQYlWP4DwUMDAwoGC6OTxIqh1sSQwEWSYQCHJIQBXgk/2PIoruJAZ/k/////wMAA4afYVpnmEkAAAAASUVORK5CYII=",
								"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAALUlEQVQYlWP4jwYYGBhQMT7J////IxRgk4QrwCUJlcMtiaEAh4PxSkIU4PMqAAOGn2Gql3FAAAAAAElFTkSuQmCC" ]);
			}, 200);
};

// /------ PARTS OF LIBRARIES

Color = {};
Color.HEX_STRING = function(o) {

	var z = o.toString(16), n = z.length;

	while (n < 6) {
		z = '0' + z;
		n++;
	}

	return z;

};

Color.RGB_HSV = function(o) { // - RGB from 0 to 255

	var _R = o.R / 255, _G = o.G / 255, _B = o.B / 255, H, S, V;

	var min = Math.min(_R, _G, _B), max = Math.max(_R, _G, _B), D = max - min;

	V = max;

	if (D == 0) {
		H = 0;
		S = 0;
	} // No chroma

	else { // Chromatic data

		S = D / max;

		var DR = (((max - _R) / 6) + (D / 2)) / D;
		var DG = (((max - _G) / 6) + (D / 2)) / D;
		var DB = (((max - _B) / 6) + (D / 2)) / D;

		if (_R == max)
			H = DB - DG;
		else if (_G == max)
			H = (1 / 3) + DR - DB;
		else if (_B == max)
			H = (2 / 3) + DG - DR;

		if (H < 0)
			H += 1;
		if (H > 1)
			H -= 1;

	}

	return {
		H : H * 360,
		S : S * 100,
		V : V * 100
	};

};

Color.HSV_RGB = function(o) {

	var H = o.H / 360, S = o.S / 100, V = o.V / 100, R, G, B;

	if (S == 0) {
		R = G = B = Math.round(V * 255);
	}

	else {
		if (H >= 1)
			H = 0;

		H = 6 * H;
		D = H - Math.floor(H);
		A = Math.round(255 * V * (1 - S));
		B = Math.round(255 * V * (1 - (S * D)));
		C = Math.round(255 * V * (1 - (S * (1 - D))));
		V = Math.round(255 * V);

		switch (Math.floor(H)) {

		case 0:
			R = V;
			G = C;
			B = A;
			break;
		case 1:
			R = B;
			G = V;
			B = A;
			break;
		case 2:
			R = A;
			G = V;
			B = C;
			break;
		case 3:
			R = A;
			G = B;
			B = V;
			break;
		case 4:
			R = C;
			G = A;
			B = V;
			break;
		case 5:
			R = V;
			G = A;
			B = B;
			break;

		}
	}

	return {
		R : R,
		G : G,
		B : B
	};

};