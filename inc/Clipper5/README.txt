============================================================
Javascript Clipper Change Log
============================================================
5.0.2.2 - 11 September 2013
* Bugfix: SlopesEqual() uses now big integers only when needed and causes speed improvements in certain cases.
* Bugfix: Fixed inconsistent use of DV in jsbn.js, in function bnpFromInt() DV replaced with this.DV.
* BugFix: ExPolygons structure is now working as expected.
* Added: Main Demo has now Ex-button in Polygon Explorer, which shows Solution as ExPolygons structure.
* Added: ExPolygons is now explained in wiki in https://sourceforge.net/p/jsclipper/wiki/ExPolygons/
* Update: Web Workers compatibility
* Added: Web Workers support page is available in https://sourceforge.net/p/jsclipper/wiki/Web%20Workers/

5.0.2.1 - 12 January 2013
* Update: Clipper library updated to version 5.0.2. The Area algorithm has been updated and is faster. 
  'CheckInputs' parameter of the OffsetPolygons function has been renamed 'AutoFix'.
* Added: ClipperLib.Clean(), which removes too near vertices to avoid micro-self-intersection-artifacts when offsetting.
* Added: ClipperLib.Lighten(), which reduces count of vertices using perpendicular distance reduction algorithm.
* Added: ClipperLib.Clone(), which make true clone of polygons.
Several updates to the Main Demo:
* Added: Clean, Simplify, Lighten buttons
* Change: Custom Polygons: input boxes to textareas to allow more data
* Added: Polygon Output Formats (Clipper, Plain, SVG)
* Update: Polygon Explorer: Also multipolygon is clickable (on Points column) 
* Added: Polygon Explorer: When numbers on Points or Points in subpolygons are clicked, the area of multipolygon or subpolygon is shown
* Update: Several updates to wiki in https://sourceforge.net/p/jsclipper/wiki/Home/

4.9.7.2 - 1 January 2013
* Update: Browser specific speedup for ClipperLib.Clipper.Round(), ClipperLib.Cast_Int32() and ClipperLib.Cast_Int64().
* Update: Major enhancements for Main Demo. Including benchmark, custom polygons and polygon importer.
* Update: Documentation is updated with new screenshots of Main Demo. Browser speedtest is published in Wiki.

4.9.7.1 - 12 December 2012
* Initial release