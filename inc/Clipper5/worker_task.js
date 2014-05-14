// Worker related functionalities:
if (typeof(document) === "undefined" && typeof(importScripts) !== "undefined") // test if we are in worker scope
{
  importScripts('clipper.js');

  self.addEventListener('message', function(e) // We listen messages from the main page
  {
    var data = e.data;
    // according to received commands (draw500, draw6000, draw12000) we call draw() to get svg data and send it to the main page
    switch (data.cmd)
    {
      case 'draw500':
        var DrawingStart = Date.now();
        var svg = draw(500);
        var DrawingEnd = Date.now();
        var DrawingTime = DrawingEnd - DrawingStart;
        var TransferStart = Date.now();
        self.postMessage({result:svg, DrawingTime:DrawingTime, TransferStart:TransferStart});
        break;
      case 'draw6000':
        var DrawingStart = Date.now();
        var svg = draw(6000);
        var DrawingEnd = Date.now();
        var DrawingTime = DrawingEnd - DrawingStart;
        var TransferStart = Date.now();
        self.postMessage({result:svg, DrawingTime:DrawingTime, TransferStart:TransferStart});
        break;
      case 'draw12000':
        var DrawingStart = Date.now();
        var svg = draw(12000);
        var DrawingEnd = Date.now();
        var DrawingTime = DrawingEnd - DrawingStart;
        var TransferStart = Date.now();
        self.postMessage({result:svg, DrawingTime:DrawingTime, TransferStart:TransferStart});
        break;
      default:
        self.postMessage('Unknown command: ' + data.msg);
    };
  }, false);
}

// SVG source is created here
function draw(count)
{
  var cpr = new ClipperLib.Clipper();
  var polygons;
  var scale = 100;
  var joinType = ClipperLib.JoinType.jtRound;
  var svg = "", offsetted_polygon, miterLimit = 2, AutoFix = false, i, xstart, ystart, xend, yend;  
  svg += '<svg style="margin-top:10px;margin-right:10px;margin-bottom:10px;background-color:#dddddd" width="800" height="320">';
  for(i = 0; i < count; i++)
  {
    xstart = Math.round(Math.random()*800);
    ystart = Math.round(Math.random()*320);
    xend = Math.round(Math.random()*800);
    yend = Math.round(Math.random()*320);
    polygons = new Array();
	polygons.push([{X:xstart, Y:ystart}, {X:xend, Y:yend }]);
	// We cannot use console.log for debugging, but self.postMessage:
    //self.postMessage(JSON.stringify(polygons));
    polygons = scaleup(polygons, scale);
    offsetted_polygon = cpr.OffsetPolygons(polygons, 5 * scale, joinType, miterLimit, AutoFix);
    //self.postMessage(JSON.stringify(JSON.stringify(offsetted_polygon)));
    svg += '<path stroke="black" fill="' + randomColor({red:255, green:255, blue:255}) + '" stroke-width="1" d="' + polys2path(offsetted_polygon, scale) + '"/>';
  }
  svg += '</svg>';
  return svg;
}

// Helper function to scale up polygon coordinates
function scaleup(poly, scale) {
  var i, j;
  if (!scale) scale = 1;
  for(i = 0; i < poly.length; i++) {
    for(j = 0; j < poly[i].length; j++) {
      poly[i][j].X *= scale;
      poly[i][j].Y *= scale;
    }
  }
  return poly;
}

// Helper function to convert Polygons object to SVG path string
function polys2path (poly, scale) {
  var path = "", i, j;
  if (!scale) scale = 1;
  for(i = 0; i < poly.length; i++) {
    for(j = 0; j < poly[i].length; j++) {
      if (!j) path += "M";
      else path += "L";
      path += (poly[i][j].X / scale) + "," + (poly[i][j].Y / scale);
    }
    path += "Z";
  }
  return path;
}

// Helpers function to get random color in hex
function randomColor(mix) {
  var rand = Math.random, round = Math.round;
  var red = round(rand()*255);
  var green = round(rand()*255);
  var blue = round(rand()*255);
  if (mix != null) {
    red = round((red + mix.red) / 2);
    green = round((green + mix.green) / 2);
    blue = round((blue + mix.blue) / 2);
  }
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  return (rgbToHex(red, green, blue));
}