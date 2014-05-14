/**
 * @license -------------------------------------------------------------------
 * $1 Unistroke Recognizer
 * <http://depts.washington.edu/aimgroup/proj/dollar/>
 * -------------------------------------------------------------------
 * Copyright (c) 2007-2011, Jacob O. Wobbrock, Andrew D. Wilson and Yang Li.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of the University of Washington nor Microsoft,
 *      nor the names of its contributors may be used to endorse or promote 
 *      products derived from this software without specific prior written
 *      permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Jacob O. Wobbrock OR Andrew D. Wilson
 * OR Yang Li BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, 
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
 
/*
 * The $1 Unistroke Recognizer (C# version)
 *
 *		Jacob O. Wobbrock, Ph.D.
 * 		The Information School
 *		University of Washington
 *		Mary Gates Hall, Box 352840
 *		Seattle, WA 98195-2840
 *		wobbrock@uw.edu
 *
 *		Andrew D. Wilson, Ph.D.
 *		Microsoft Research
 *		One Microsoft Way
 *		Redmond, WA 98052
 *		awilson@microsoft.com
 *
 *		Yang Li, Ph.D.
 *		Department of Computer Science and Engineering
 * 		University of Washington
 *		The Allen Center, Box 352350
 *		Seattle, WA 98195-2840
 * 		yangli@cs.washington.edu
 *
 * The Protractor enhancement was published by Yang Li and programmed here by 
 * Jacob O. Wobbrock.
 *
 *	Li, Y. (2010). Protractor: A fast and accurate gesture 
 *	  recognizer. Proceedings of the ACM Conference on Human 
 *	  Factors in Computing Systems (CHI '10). Atlanta, Georgia
 *	  (April 10-15, 2010). New York: ACM Press, pp. 2169-2172.
 * 
 * This software is distributed under the "New BSD License" agreement:
 * 
*/


var DollarRecognizer = (function(root) {

//
// Point class
//
function Point(x, y) {
	this.x = x;
	this.y = y;
}
//
// Rectangle class
//
function Rectangle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.Width = width;
	this.Height = height;
}
//
// Template class: a unistroke template
//
function Template(name, points) {
	this.Name = name;
	this.Points = Resample(points, NumPoints);
	var radians = IndicativeAngle(this.Points);
	this.Points = RotateBy(this.Points, -radians);
	this.Points = ScaleTo(this.Points, SquareSize);
	this.Points = TranslateTo(this.Points, Origin);
	this.Vector = Vectorize(this.Points); // for Protractor
}
//
// Result class
//
function Result(name, score) {
	this.Name = name;
	this.Score = score;
}
//
// DollarRecognizer class constants
//
var NumTemplates = 16;
var NumPoints = 64;
var SquareSize = 250.0;
var Origin = new Point(0, 0);
var Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
var HalfDiagonal = 0.5 * Diagonal;
var AngleRange = Deg2Rad(45.0);
var AnglePrecision = Deg2Rad(2.0);
var Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio
//
// DollarRecognizer class
//
root = function() {
	this.Templates = new Array();
	// Circle
	this.Templates.push(new Template("circle", [{"x":553,"y":450},{"x":546,"y":450},{"x":536,"y":450},{"x":524,"y":450},{"x":514,"y":450},{"x":504,"y":445},{"x":493,"y":438},{"x":488,"y":430},{"x":484,"y":420},{"x":481,"y":414},{"x":480,"y":403},{"x":480,"y":378},{"x":494,"y":348},{"x":514,"y":323},{"x":541,"y":300},{"x":570,"y":288},{"x":596,"y":285},{"x":618,"y":286},{"x":636,"y":300},{"x":645,"y":324},{"x":647,"y":353},{"x":644,"y":382},{"x":627,"y":407},{"x":609,"y":428},{"x":597,"y":439},{"x":587,"y":447},{"x":577,"y":452},{"x":570,"y":454}]));
	this.Templates.push(new Template("circle", [{"x":511,"y":459},{"x":523,"y":459},{"x":576,"y":436},{"x":654,"y":380},{"x":695,"y":332},{"x":715,"y":295},{"x":726,"y":255},{"x":729,"y":222},{"x":729,"y":207},{"x":724,"y":197},{"x":714,"y":191},{"x":693,"y":188},{"x":665,"y":188},{"x":632,"y":199},{"x":594,"y":218},{"x":561,"y":239},{"x":542,"y":257},{"x":522,"y":284},{"x":511,"y":309},{"x":505,"y":348},{"x":505,"y":407},{"x":520,"y":441},{"x":537,"y":467},{"x":551,"y":480},{"x":562,"y":489}]));
	this.Templates.push(new Template("circle", [{"x":592,"y":307},{"x":591,"y":307},{"x":582,"y":307},{"x":571,"y":307},{"x":547,"y":307},{"x":517,"y":299},{"x":499,"y":293},{"x":474,"y":281},{"x":455,"y":271},{"x":444,"y":259},{"x":435,"y":240},{"x":435,"y":216},{"x":438,"y":173},{"x":463,"y":132},{"x":485,"y":113},{"x":520,"y":91},{"x":555,"y":77},{"x":599,"y":74},{"x":637,"y":74},{"x":671,"y":87},{"x":691,"y":101},{"x":710,"y":119},{"x":716,"y":126},{"x":718,"y":131},{"x":719,"y":137},{"x":704,"y":146},{"x":683,"y":159},{"x":671,"y":166},{"x":643,"y":186},{"x":627,"y":201},{"x":606,"y":226},{"x":599,"y":242},{"x":591,"y":263},{"x":588,"y":283},{"x":587,"y":305},{"x":587,"y":333},{"x":590,"y":354},{"x":600,"y":369},{"x":611,"y":384},{"x":619,"y":391}]));
	// Double Circle
	this.Templates.push(new Template("circle", [{x:787,y:422},{x:779,y:431},{x:765,y:434},{x:752,y:435},{x:743,y:435},{x:733,y:435},{x:723,y:434},{x:714,y:433},{x:705,y:432},{x:696,y:430},{x:687,y:427},{x:674,y:423},{x:662,y:416},{x:651,y:408},{x:642,y:399},{x:634,y:388},{x:631,y:380},{x:626,y:368},{x:624,y:356},{x:623,y:344},{x:625,y:332},{x:628,y:322},{x:633,y:313},{x:640,y:306},{x:649,y:299},{x:659,y:295},{x:670,y:291},{x:682,y:288},{x:696,y:287},{x:714,y:286},{x:724,y:287},{x:743,y:290},{x:756,y:294},{x:768,y:301},{x:778,y:310},{x:785,y:321},{x:791,y:334},{x:793,y:344},{x:796,y:362},{x:794,y:375},{x:790,y:388},{x:783,y:399},{x:774,y:408},{x:762,y:415},{x:749,y:421},{x:739,y:423},{x:724,y:426},{x:704,y:428},{x:688,y:427},{x:673,y:424},{x:659,y:421},{x:645,y:416},{x:637,y:412},{x:625,y:406},{x:615,y:399},{x:606,y:392},{x:602,y:387},{x:594,y:376},{x:592,y:368},{x:592,y:356},{x:597,y:347},{x:604,y:338},{x:614,y:330},{x:627,y:321},{x:642,y:314},{x:658,y:307},{x:669,y:304},{x:685,y:300},{x:701,y:297},{x:716,y:296},{x:725,y:296},{x:737,y:296},{x:747,y:296},{x:752,y:296},{x:759,y:296},{x:764,y:296},{x:769,y:297},{x:775,y:297},{x:779,y:296}]));
	// Check normal
	this.Templates.push(new Template("check", new Array(new Point(91, 185), new Point(93, 185), new Point(95, 185), new Point(97, 185), new Point(100, 188), new Point(102, 189), new Point(104, 190), new Point(106, 193), new Point(108, 195), new Point(110, 198), new Point(112, 201), new Point(114, 204), new Point(115, 207), new Point(117, 210), new Point(118, 212), new Point(120, 214), new Point(121, 217), new Point(122, 219), new Point(123, 222), new Point(124, 224), new Point(126, 226), new Point(127, 229), new Point(129, 231), new Point(130, 233), new Point(129, 231), new Point(129, 228), new Point(129, 226), new Point(129, 224), new Point(129, 221), new Point(129, 218), new Point(129, 212), new Point(129, 208), new Point(130, 198), new Point(132, 189), new Point(134, 182), new Point(137, 173), new Point(143, 164), new Point(147, 157), new Point(151, 151), new Point(155, 144), new Point(161, 137), new Point(165, 131), new Point(171, 122), new Point(174, 118), new Point(176, 114), new Point(177, 112), new Point(177, 114), new Point(175, 116), new Point(173, 118))));
	// Check upside down
	this.Templates.push(new Template("check", [{x:611,y:315},{x:615,y:320},{x:615,y:318},{x:618,y:321},{x:621,y:325},{x:623,y:328},{x:624,y:332},{x:626,y:337},{x:628,y:342},{x:630,y:347},{x:632,y:352},{x:635,y:361},{x:637,y:366},{x:641,y:372},{x:643,y:376},{x:646,y:380},{x:648,y:384},{x:652,y:388},{x:662,y:386},{x:666,y:381},{x:674,y:369},{x:683,y:356},{x:695,y:334},{x:707,y:313},{x:720,y:291},{x:734,y:267},{x:748,y:243},{x:763,y:219},{x:779,y:196},{x:789,y:182},{x:806,y:162},{x:822,y:145},{x:832,y:137},{x:841,y:130},{x:849,y:126},{x:856,y:123}]));
	this.Templates.push(new Template("check", [{x:686,y:314},{x:685,y:319},{x:683,y:323},{x:684,y:327},{x:684,y:332},{x:686,y:338},{x:687,y:343},{x:688,y:350},{x:690,y:356},{x:691,y:363},{x:693,y:368},{x:695,y:377},{x:697,y:382},{x:699,y:389},{x:701,y:395},{x:702,y:398},{x:703,y:402},{x:705,y:406},{x:706,y:408},{x:708,y:411},{x:715,y:406},{x:720,y:400},{x:729,y:389},{x:738,y:377},{x:754,y:357},{x:769,y:337},{x:786,y:316},{x:802,y:294},{x:819,y:271},{x:836,y:249},{x:846,y:235},{x:860,y:215},{x:867,y:203}])); 
	// Letter "s"
	this.Templates.push(new Template("s", [{x:830,y:71},{x:824,y:71},{x:814,y:73},{x:805,y:76},{x:795,y:79},{x:785,y:82},{x:774,y:86},{x:764,y:90},{x:754,y:94},{x:744,y:98},{x:735,y:102},{x:721,y:108},{x:709,y:114},{x:698,y:119},{x:693,y:122},{x:685,y:126},{x:682,y:129},{x:677,y:132},{x:673,y:134},{x:671,y:137},{x:670,y:139},{x:676,y:142},{x:683,y:143},{x:691,y:145},{x:702,y:146},{x:715,y:147},{x:729,y:148},{x:749,y:151},{x:765,y:153},{x:775,y:156},{x:789,y:159},{x:801,y:163},{x:813,y:168},{x:828,y:176},{x:837,y:183},{x:845,y:191},{x:849,y:197},{x:856,y:205},{x:858,y:210},{x:863,y:220},{x:862,y:227},{x:859,y:234},{x:854,y:239},{x:845,y:244},{x:833,y:248},{x:816,y:252},{x:799,y:252},{x:782,y:252},{x:764,y:250},{x:746,y:247},{x:727,y:244},{x:708,y:239},{x:690,y:235},{x:672,y:231},{x:661,y:228},{x:652,y:226},{x:639,y:224},{x:632,y:223},{x:622,y:222},{x:611,y:221},{x:605,y:220}]));
	this.Templates.push(new Template("s", [{x:879,y:116},{x:867,y:116},{x:853,y:117},{x:843,y:117},{x:835,y:119},{x:825,y:121},{x:815,y:123},{x:803,y:128},{x:792,y:133},{x:781,y:139},{x:772,y:144},{x:758,y:151},{x:752,y:154},{x:747,y:157},{x:739,y:162},{x:732,y:167},{x:729,y:172},{x:733,y:175},{x:741,y:180},{x:752,y:184},{x:765,y:189},{x:786,y:196},{x:798,y:200},{x:816,y:206},{x:827,y:209},{x:843,y:214},{x:850,y:216},{x:860,y:220},{x:868,y:224},{x:867,y:228},{x:859,y:232},{x:846,y:235},{x:830,y:239},{x:812,y:243},{x:793,y:247},{x:774,y:251},{x:755,y:255},{x:744,y:257},{x:726,y:259}]));
	this.Templates.push(new Template("s", [{x:443,y:141},{x:434,y:144},{x:425,y:149},{x:421,y:152},{x:417,y:155},{x:414,y:158},{x:410,y:163},{x:408,y:169},{x:404,y:174},{x:402,y:181},{x:398,y:191},{x:394,y:203},{x:392,y:217},{x:389,y:237},{x:390,y:254},{x:391,y:266},{x:394,y:290},{x:397,y:300},{x:400,y:309},{x:406,y:321},{x:412,y:330},{x:420,y:337},{x:429,y:342},{x:440,y:344},{x:454,y:344},{x:466,y:341},{x:484,y:334},{x:498,y:325},{x:512,y:315},{x:527,y:303},{x:542,y:290},{x:558,y:276},{x:575,y:262},{x:592,y:249},{x:610,y:237},{x:622,y:230},{x:639,y:221},{x:650,y:217},{x:666,y:211},{x:681,y:208},{x:700,y:207},{x:714,y:209},{x:725,y:215},{x:736,y:223},{x:745,y:233},{x:755,y:250},{x:761,y:265},{x:764,y:283},{x:766,y:301},{x:764,y:313},{x:762,y:331},{x:757,y:353},{x:751,y:362},{x:738,y:380},{x:729,y:387},{x:716,y:397},{x:701,y:405},{x:691,y:408},{x:676,y:414},{x:661,y:418},{x:652,y:418}]));
	this.Templates.push(new Template("s", [{"x":584,"y":207},{"x":582,"y":208},{"x":581,"y":210},{"x":578,"y":214},{"x":574,"y":222},{"x":570,"y":232},{"x":568,"y":239},{"x":567,"y":245},{"x":567,"y":250},{"x":567,"y":254},{"x":567,"y":258},{"x":567,"y":259},{"x":572,"y":261},{"x":587,"y":261},{"x":608,"y":258},{"x":636,"y":250},{"x":658,"y":243},{"x":684,"y":239},{"x":717,"y":239},{"x":739,"y":239},{"x":756,"y":249},{"x":769,"y":269},{"x":775,"y":285},{"x":781,"y":312},{"x":781,"y":334},{"x":777,"y":354},{"x":756,"y":379},{"x":709,"y":409},{"x":669,"y":428},{"x":596,"y":461},{"x":576,"y":471},{"x":560,"y":479},{"x":545,"y":486},{"x":540,"y":488},{"x":538,"y":489},{"x":537,"y":489}] ));
	this.Templates.push(new Template("s", [{"x":567,"y":103},{"x":564,"y":105},{"x":554,"y":111},{"x":543,"y":117},{"x":528,"y":129},{"x":525,"y":133},{"x":518,"y":141},{"x":515,"y":148},{"x":515,"y":153},{"x":515,"y":158},{"x":524,"y":166},{"x":539,"y":177},{"x":562,"y":192},{"x":578,"y":205},{"x":590,"y":224},{"x":593,"y":244},{"x":592,"y":254},{"x":581,"y":266},{"x":566,"y":274},{"x":547,"y":277},{"x":524,"y":278},{"x":501,"y":278},{"x":481,"y":274}] ));
	this.Templates.push(new Template("s", [{"x":607,"y":46},{"x":601,"y":46},{"x":590,"y":46},{"x":582,"y":49},{"x":574,"y":55},{"x":572,"y":57},{"x":569,"y":59},{"x":569,"y":65},{"x":567,"y":73},{"x":575,"y":83},{"x":591,"y":98},{"x":615,"y":117},{"x":651,"y":150},{"x":667,"y":176},{"x":675,"y":199},{"x":679,"y":230},{"x":679,"y":258},{"x":672,"y":273},{"x":657,"y":283},{"x":636,"y":290},{"x":613,"y":294},{"x":594,"y":295},{"x":578,"y":295},{"x":566,"y":295},{"x":560,"y":293}] ));
	// Ignore these shapes.
	this.Templates.push(new Template("*circle0", [{"x":558,"y":367},{"x":559,"y":367},{"x":562,"y":356},{"x":562,"y":323},{"x":562,"y":306},{"x":562,"y":295},{"x":561,"y":295},{"x":558,"y":295},{"x":550,"y":295},{"x":542,"y":300},{"x":530,"y":301},{"x":517,"y":302},{"x":503,"y":303},{"x":489,"y":303},{"x":469,"y":300},{"x":460,"y":284},{"x":449,"y":238},{"x":449,"y":173},{"x":459,"y":100},{"x":487,"y":37},{"x":524,"y":-15},{"x":570,"y":-61},{"x":604,"y":-79},{"x":665,"y":-92},{"x":714,"y":-92},{"x":761,"y":-68},{"x":787,"y":-39},{"x":806,"y":0},{"x":814,"y":67},{"x":809,"y":111},{"x":786,"y":163},{"x":762,"y":200},{"x":741,"y":228},{"x":727,"y":245},{"x":714,"y":263},{"x":706,"y":272},{"x":698,"y":282},{"x":694,"y":288},{"x":693,"y":293},{"x":693,"y":297},{"x":693,"y":300},{"x":699,"y":306},{"x":711,"y":314},{"x":731,"y":325},{"x":759,"y":338},{"x":795,"y":353},{"x":834,"y":363},{"x":873,"y":366},{"x":901,"y":366}]));
	this.Templates.push(new Template("*pepe0", [{"x":537,"y":358},{"x":537,"y":351},{"x":540,"y":318},{"x":553,"y":280},{"x":565,"y":252},{"x":583,"y":217},{"x":602,"y":186},{"x":619,"y":167},{"x":640,"y":152},{"x":666,"y":142},{"x":692,"y":136},{"x":710,"y":134},{"x":728,"y":134},{"x":744,"y":140},{"x":751,"y":167},{"x":751,"y":207},{"x":751,"y":256},{"x":742,"y":322},{"x":717,"y":367},{"x":675,"y":402},{"x":636,"y":425},{"x":556,"y":462},{"x":518,"y":472},{"x":488,"y":480},{"x":462,"y":486}]));
	this.Templates.push(new Template("*pepe1", [{"x":523,"y":332},{"x":543,"y":315},{"x":568,"y":281},{"x":607,"y":227},{"x":636,"y":195},{"x":670,"y":162},{"x":687,"y":151},{"x":714,"y":144},{"x":722,"y":144},{"x":731,"y":156},{"x":731,"y":191},{"x":723,"y":237},{"x":701,"y":290},{"x":669,"y":347},{"x":625,"y":399},{"x":592,"y":430},{"x":556,"y":461},{"x":524,"y":492},{"x":509,"y":507}]));
	this.Templates.push(new Template("*pepe2", [{"x":350,"y":319},{"x":364,"y":307},{"x":404,"y":264},{"x":475,"y":183},{"x":562,"y":87},{"x":593,"y":59},{"x":627,"y":35},{"x":647,"y":29},{"x":655,"y":29},{"x":665,"y":29},{"x":670,"y":30},{"x":671,"y":32},{"x":673,"y":42},{"x":661,"y":72},{"x":617,"y":124},{"x":545,"y":199},{"x":450,"y":303},{"x":356,"y":413},{"x":308,"y":483},{"x":276,"y":545},{"x":252,"y":605},{"x":244,"y":635},{"x":241,"y":663},{"x":240,"y":677},{"x":240,"y":687}]));
	this.Templates.push(new Template("*pepe3", [{"x":444,"y":346},{"x":456,"y":346},{"x":475,"y":337},{"x":512,"y":315},{"x":550,"y":282},{"x":590,"y":239},{"x":604,"y":222},{"x":619,"y":203},{"x":628,"y":190},{"x":630,"y":186},{"x":629,"y":192},{"x":619,"y":227},{"x":611,"y":272},{"x":604,"y":340},{"x":604,"y":410},{"x":604,"y":450},{"x":605,"y":482},{"x":611,"y":492},{"x":621,"y":503},{"x":632,"y":504},{"x":647,"y":497},{"x":666,"y":478},{"x":692,"y":448},{"x":719,"y":417},{"x":735,"y":398},{"x":745,"y":381},{"x":753,"y":369},{"x":757,"y":363},{"x":760,"y":360},{"x":761,"y":358}]));
	this.Templates.push(new Template("*pepeb", [{"x":581,"y":508},{"x":574,"y":500},{"x":541,"y":451},{"x":520,"y":399},{"x":503,"y":348},{"x":493,"y":312},{"x":485,"y":280},{"x":482,"y":269},{"x":480,"y":261},{"x":479,"y":258},{"x":478,"y":258},{"x":479,"y":257},{"x":480,"y":258},{"x":486,"y":258},{"x":502,"y":258},{"x":539,"y":245},{"x":592,"y":229},{"x":633,"y":223},{"x":663,"y":223},{"x":680,"y":225},{"x":691,"y":235},{"x":692,"y":259},{"x":673,"y":288},{"x":634,"y":332},{"x":605,"y":362},{"x":580,"y":384},{"x":565,"y":396},{"x":557,"y":402},{"x":554,"y":404},{"x":556,"y":405},{"x":565,"y":404},{"x":586,"y":398},{"x":616,"y":391},{"x":654,"y":390},{"x":690,"y":390},{"x":710,"y":401},{"x":734,"y":427},{"x":739,"y":457},{"x":739,"y":487},{"x":723,"y":509},{"x":697,"y":518},{"x":647,"y":519},{"x":612,"y":519},{"x":577,"y":513},{"x":555,"y":511},{"x":538,"y":510},{"x":532,"y":510}] ));
	this.Templates.push(new Template("*s0", [{"x":693,"y":150},{"x":685,"y":150},{"x":672,"y":151},{"x":658,"y":163},{"x":642,"y":184},{"x":628,"y":210},{"x":622,"y":226},{"x":619,"y":250},{"x":618,"y":284},{"x":619,"y":306},{"x":632,"y":323},{"x":660,"y":340},{"x":691,"y":350},{"x":729,"y":353},{"x":747,"y":353},{"x":775,"y":338}] ));
	this.Templates.push(new Template("*s1", [{"x":424,"y":279},{"x":424,"y":261},{"x":430,"y":237},{"x":441,"y":213},{"x":453,"y":192},{"x":466,"y":176},{"x":478,"y":169},{"x":489,"y":165},{"x":501,"y":163},{"x":512,"y":163},{"x":527,"y":168},{"x":537,"y":184},{"x":551,"y":210},{"x":564,"y":241},{"x":577,"y":273},{"x":582,"y":295},{"x":585,"y":308},{"x":588,"y":314},{"x":589,"y":317}]));
	this.Templates.push(new Template("*s2", [{"x":627,"y":143},{"x":609,"y":155},{"x":597,"y":172},{"x":586,"y":196},{"x":581,"y":213},{"x":576,"y":232},{"x":576,"y":249},{"x":576,"y":261},{"x":580,"y":273},{"x":600,"y":290},{"x":627,"y":307},{"x":642,"y":313},{"x":663,"y":323},{"x":672,"y":332},{"x":673,"y":342},{"x":673,"y":348},{"x":665,"y":356},{"x":649,"y":362},{"x":632,"y":363},{"x":617,"y":365},{"x":593,"y":365},{"x":578,"y":365},{"x":570,"y":365},{"x":562,"y":365}]));
	this.Templates.push(new Template("*s3", [{"x":501,"y":241},{"x":501,"y":243},{"x":500,"y":258},{"x":502,"y":275},{"x":520,"y":330},{"x":533,"y":354},{"x":555,"y":374},{"x":582,"y":384},{"x":620,"y":384},{"x":659,"y":356},{"x":707,"y":296},{"x":732,"y":245},{"x":753,"y":185},{"x":760,"y":147},{"x":762,"y":122},{"x":762,"y":100}]));
	this.Templates.push(new Template("*check0", [{"x":466,"y":292},{"x":470,"y":290},{"x":486,"y":267},{"x":542,"y":202},{"x":591,"y":160},{"x":638,"y":124},{"x":690,"y":95},{"x":717,"y":84},{"x":742,"y":74},{"x":749,"y":71},{"x":756,"y":70},{"x":757,"y":68}] ));
	this.Templates.push(new Template("*1", [{x:553,y:405},{x:555,y:401},{x:557,y:394},{x:560,y:389},{x:563,y:383},{x:567,y:378},{x:571,y:371},{x:575,y:363},{x:580,y:355},{x:584,y:347},{x:591,y:335},{x:597,y:324},{x:604,y:312},{x:609,y:305},{x:615,y:294},{x:621,y:284},{x:624,y:279},{x:631,y:268},{x:633,y:264},{x:637,y:258},{x:639,y:254},{x:642,y:250},{x:644,y:247},{x:645,y:245},{x:647,y:242},{x:645,y:245},{x:642,y:250},{x:641,y:254},{x:639,y:261},{x:638,y:271},{x:636,y:282},{x:635,y:295},{x:633,y:316},{x:632,y:336},{x:633,y:349},{x:633,y:376},{x:634,y:390},{x:636,y:401},{x:639,y:423},{x:642,y:432},{x:645,y:445},{x:649,y:457},{x:653,y:467},{x:657,y:476},{x:660,y:480}]));
	this.Templates.push(new Template("*2", [{x:541,y:525},{x:539,y:522},{x:542,y:518},{x:545,y:513},{x:549,y:505},{x:555,y:493},{x:565,y:475},{x:577,y:453},{x:596,y:418},{x:612,y:387},{x:629,y:355},{x:647,y:321},{x:658,y:301},{x:675,y:270},{x:686,y:252},{x:696,y:238},{x:710,y:218}]));
	this.Templates.push(new Template("*3", [{x:778,y:134},{x:764,y:145},{x:751,y:156},{x:738,y:174},{x:730,y:185},{x:720,y:196},{x:710,y:209},{x:701,y:223},{x:692,y:236},{x:682,y:248},{x:669,y:267},{x:656,y:285},{x:644,y:302},{x:632,y:319},{x:625,y:330},{x:616,y:345},{x:606,y:359},{x:598,y:372},{x:593,y:379}]));
	this.Templates.push(new Template("*check0", [{"x":871,"y":38},{"x":854,"y":42},{"x":836,"y":46},{"x":822,"y":50},{"x":806,"y":55},{"x":788,"y":61},{"x":770,"y":68},{"x":741,"y":78},{"x":721,"y":86},{"x":691,"y":97},{"x":663,"y":108},{"x":646,"y":115},{"x":622,"y":124},{"x":608,"y":128},{"x":597,"y":132},{"x":580,"y":138},{"x":572,"y":141},{"x":566,"y":142},{"x":556,"y":145},{"x":541,"y":147}] ));
	this.Templates.push(new Template("*check1", [{"x":445,"y":85},{"x":448,"y":87},{"x":455,"y":92},{"x":461,"y":96},{"x":467,"y":100},{"x":474,"y":106},{"x":482,"y":111},{"x":492,"y":117},{"x":507,"y":126},{"x":525,"y":136},{"x":545,"y":146},{"x":566,"y":157},{"x":588,"y":168},{"x":611,"y":179},{"x":633,"y":191},{"x":647,"y":197}] ));
	// Moon
	this.Templates.push(new Template("moon", [{"x":721,"y":500},{"x":715,"y":500},{"x":698,"y":500},{"x":664,"y":500},{"x":626,"y":494},{"x":580,"y":470},{"x":528,"y":422},{"x":499,"y":388},{"x":481,"y":361},{"x":464,"y":334},{"x":455,"y":317},{"x":451,"y":301},{"x":449,"y":274},{"x":458,"y":239},{"x":494,"y":187},{"x":534,"y":151},{"x":581,"y":120},{"x":613,"y":103},{"x":641,"y":90},{"x":672,"y":80},{"x":700,"y":74},{"x":721,"y":73},{"x":741,"y":73},{"x":756,"y":76},{"x":764,"y":80},{"x":772,"y":85},{"x":775,"y":87},{"x":777,"y":88},{"x":777,"y":89},{"x":772,"y":89},{"x":758,"y":95},{"x":735,"y":107},{"x":710,"y":122},{"x":685,"y":144},{"x":666,"y":166},{"x":649,"y":190},{"x":636,"y":212},{"x":626,"y":238},{"x":620,"y":269},{"x":619,"y":305},{"x":619,"y":341},{"x":629,"y":377},{"x":643,"y":408},{"x":653,"y":427},{"x":669,"y":458},{"x":682,"y":476},{"x":700,"y":494},{"x":715,"y":504},{"x":732,"y":517},{"x":740,"y":523},{"x":748,"y":527},{"x":752,"y":531}] ));
	// Triangle
	this.Templates.push(new Template("triangle0",[{"x":379,"y":330},{"x":430,"y":330},{"x":488,"y":330},{"x":550,"y":330},{"x":594,"y":330},{"x":626,"y":330},{"x":647,"y":330},{"x":663,"y":330},{"x":668,"y":330},{"x":671,"y":329},{"x":671,"y":323},{"x":667,"y":305},{"x":661,"y":277},{"x":655,"y":234},{"x":652,"y":183},{"x":648,"y":154},{"x":640,"y":129},{"x":633,"y":114},{"x":624,"y":107},{"x":612,"y":106},{"x":596,"y":106},{"x":581,"y":106},{"x":563,"y":111},{"x":542,"y":123},{"x":514,"y":145},{"x":483,"y":188},{"x":441,"y":252},{"x":414,"y":300},{"x":385,"y":349},{"x":370,"y":375},{"x":362,"y":392},{"x":355,"y":407},{"x":351,"y":413}] ));
	this.Templates.push(new Template("triangle1",[{"x":407,"y":478},{"x":412,"y":466},{"x":426,"y":435},{"x":449,"y":378},{"x":490,"y":293},{"x":516,"y":238},{"x":534,"y":201},{"x":542,"y":184},{"x":546,"y":174},{"x":548,"y":172},{"x":549,"y":176},{"x":552,"y":182},{"x":564,"y":199},{"x":591,"y":237},{"x":628,"y":288},{"x":672,"y":335},{"x":706,"y":371},{"x":717,"y":386},{"x":738,"y":414},{"x":740,"y":423},{"x":740,"y":428},{"x":735,"y":429},{"x":724,"y":429},{"x":709,"y":429},{"x":684,"y":429},{"x":627,"y":432},{"x":559,"y":445},{"x":509,"y":457},{"x":454,"y":474},{"x":424,"y":484},{"x":404,"y":492},{"x":391,"y":496},{"x":385,"y":498}] ));
	//
	// The $1 Gesture Recognizer API begins here -- 3 methods
	this.Recognize = function (points, useProtractor) {
		var r1 = this.Recognizer(points);
		var r2 = this.Recognizer(points.reverse());
		var r = r1.Score > r2.Score ? r1 : r2;
		return {
			Name: r.Name,
			Score: r.Score
		};
	};

	this.Recognizer = function(points, useProtractor) {
		points = Resample(points, NumPoints);
		var radians = IndicativeAngle(points);
		points = RotateBy(points, -radians);
		points = ScaleTo(points, SquareSize);
		points = TranslateTo(points, Origin);
		var vector = Vectorize(points); // for Protractor
		var b = Infinity;
		var t = 0;
		for (var i = 0; i < this.Templates.length; i++) { // for each unistroke template
			var d;
			if (useProtractor) { // for Protractor
				d = OptimalCosineDistance(this.Templates[i].Vector, vector);
			} else { // Golden Section Search (original $1)
				d = DistanceAtBestAngle(points, this.Templates[i], -AngleRange, +AngleRange, AnglePrecision);
			}
			if (d < b) {
				b = d; // best (least) distance
				t = i; // unistroke template
			}
		}
		return new Result(this.Templates[t].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal);
	};
	//
	// add/delete new templates
	//
	this.AddTemplate = function (name, points) {
		this.Templates[this.Templates.length] = new Template(name, points); // append new template
		var num = 0;
		for (var i = 0; i < this.Templates.length; i++) {
			if (this.Templates[i].Name == name) num++;
		}
		return num;
	}
	this.DeleteUserTemplates = function () {
		this.Templates.length = NumTemplates; // clear any beyond the original set
		return NumTemplates;
	};
	this.PathLength = PathLength;
}
//
// Private helper functions from this point down
//
function Resample(points, n) {
	var I = PathLength(points) / (n - 1); // interval length
	var D = 0.0;
	var newpoints = new Array(points[0]);
	for (var i = 1; i < points.length; i++) {
		var d = Distance(points[i - 1], points[i]);
		if ((D + d) >= I) {
			var qx = points[i - 1].x + ((I - D) / d) * (points[i].x - points[i - 1].x);
			var qy = points[i - 1].y + ((I - D) / d) * (points[i].y - points[i - 1].y);
			var q = new Point(qx, qy);
			newpoints[newpoints.length] = q; // append new point 'q'
			points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
			D = 0.0;
		} else D += d;
	}
	// somtimes we fall a rounding-error short of adding the last point, so add it if so
	if (newpoints.length == n - 1) {
		newpoints[newpoints.length] = new Point(points[points.length - 1].x, points[points.length - 1].y);
	}
	return newpoints;
}

function IndicativeAngle(points) {
	var c = Centroid(points);
	return Math.atan2(c.y - points[0].y, c.x - points[0].x);
}

function RotateBy(points, radians) { // rotates points around centroid
	var c = Centroid(points);
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);

	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = (points[i].x - c.x) * cos - (points[i].y - c.y) * sin + c.x
		var qy = (points[i].x - c.x) * sin + (points[i].y - c.y) * cos + c.y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}

function ScaleTo(points, size) { // non-uniform scale; assumes 2D gestures (i.e., no lines)
	var B = BoundingBox(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = points[i].x * (size / B.Width);
		var qy = points[i].y * (size / B.Height);
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}

function TranslateTo(points, pt) { // translates points' centroid
	var c = Centroid(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = points[i].x + pt.x - c.x;
		var qy = points[i].y + pt.y - c.y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}

function Vectorize(points) { // for Protractor
	var sum = 0.0;
	var vector = new Array();
	for (var i = 0; i < points.length; i++) {
		vector[vector.length] = points[i].x;
		vector[vector.length] = points[i].y;
		sum += points[i].x * points[i].x + points[i].y * points[i].y;
	}
	var magnitude = Math.sqrt(sum);
	for (var i = 0; i < vector.length; i++)
	vector[i] /= magnitude;
	return vector;
}

function OptimalCosineDistance(v1, v2) { // for Protractor
	var a = 0.0;
	var b = 0.0;
	for (var i = 0; i < v1.length; i += 2) {
		a += v1[i] * v2[i] + v1[i + 1] * v2[i + 1];
		b += v1[i] * v2[i + 1] - v1[i + 1] * v2[i];
	}
	var angle = Math.atan(b / a);
	return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
}

function DistanceAtBestAngle(points, T, a, b, threshold) {
	var x1 = Phi * a + (1.0 - Phi) * b;
	var f1 = DistanceAtAngle(points, T, x1);
	var x2 = (1.0 - Phi) * a + Phi * b;
	var f2 = DistanceAtAngle(points, T, x2);
	while (Math.abs(b - a) > threshold) {
		if (f1 < f2) {
			b = x2;
			x2 = x1;
			f2 = f1;
			x1 = Phi * a + (1.0 - Phi) * b;
			f1 = DistanceAtAngle(points, T, x1);
		} else {
			a = x1;
			x1 = x2;
			f1 = f2;
			x2 = (1.0 - Phi) * a + Phi * b;
			f2 = DistanceAtAngle(points, T, x2);
		}
	}
	return Math.min(f1, f2);
}

function DistanceAtAngle(points, T, radians) {
	var newpoints = RotateBy(points, radians);
	return PathDistance(newpoints, T.Points);
}

function Centroid(points) {
	var x = 0.0,
		y = 0.0;
	for (var i = 0; i < points.length; i++) {
		x += points[i].x;
		y += points[i].y;
	}
	x /= points.length;
	y /= points.length;
	return new Point(x, y);
}

function BoundingBox(points) {
	var minX = +Infinity,
		maxX = -Infinity,
		minY = +Infinity,
		maxY = -Infinity;
	for (var i = 0; i < points.length; i++) {
		if (points[i].x < minX) minX = points[i].x;
		if (points[i].x > maxX) maxX = points[i].x;
		if (points[i].y < minY) minY = points[i].y;
		if (points[i].y > maxY) maxY = points[i].y;
	}
	return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}

function PathDistance(pts1, pts2) {
	var d = 0.0;
	for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
	d += Distance(pts1[i], pts2[i]);
	return d / pts1.length;
}

function PathLength(points) {
	var d = 0.0;
	for (var i = 1; i < points.length; i++)
	d += Distance(points[i - 1], points[i]);
	return d;
}

function Distance(p1, p2) {
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;
	return Math.sqrt(dx * dx + dy * dy);
}

function Deg2Rad(d) {
	return (d * Math.PI / 180.0);
}

function Rad2Deg(r) {
	return (r * 180.0 / Math.PI);
}

return root;

})({});