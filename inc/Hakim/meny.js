/**
 * @license -------------------------------------------------------------------
 *   module: Meny - A three dimensional and space efficient menu.
 *      src: http://lab.hakim.se/meny
 *   author: Hakim El Hattab
 * -------------------------------------------------------------------
 * Copyright (C) 2012 Hakim El Hattab <http://hakim.se>
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

var menyInit = function() {

	var meny = document.querySelector( '.meny' );
	var arrow = document.querySelector(".meny-arrow");
	meny.style.overflow = "hidden";
	arrow.style.display = "block";

	// Avoid throwing errors if the script runs on a page with 
	// no .meny
	if( !meny || !meny.parentNode ) { return; }

	var menyWrapper = meny.parentNode;
	
	// Add a class to identify the parent of the meny parts
	menyWrapper.className += ' meny-wrapper';

	var indentX = menyWrapper.offsetLeft,
		activateX = 25,
		deactivateX = meny.offsetWidth || 400,
		isActive = false,
		isMouseDown = false;

	var supports3DTransforms = 'WebkitPerspective' in document.body.style ||
								'MozPerspective' in document.body.style ||
								'msPerspective' in document.body.style ||
								'OPerspective' in document.body.style ||
								'perspective' in document.body.style;

	Event.add([meny, arrow], "mousedown", onMouseDown);

	onHashChange();

	// Fall back to more basic CSS
	if( !supports3DTransforms ) {
		document.documentElement.className += ' meny-no-transform';
	}

	document.documentElement.className += ' meny-ready';

	function onMouseDown( event, self ) {
		onMouseMove(event);
		Event.add(document, "mousemove", onMouseMove);
		Event.add(document, "mouseup", onMouseUp);
		isMouseDown = true;
	}
	
	function onMouseMove( event ) {
		var self = Event.proxy.getCoord(event);
		if (document.querySelector(".avgrund-active")) return;		
		if (!isMouseDown) {
			var x = self.x - indentX;
			if (x > deactivateX ) {
				deactivate();
				Event.remove(document, "mousemove", onMouseMove);
			} else if( x < activateX ) {
				activate();
				widget.windows.lazyloader(".meny .lazy");
			}
		}
	}

	function onMouseUp( event, self ) {
		onMouseMove(event);
		Event.remove(document, "mouseup", onMouseMove);
		isMouseDown = false;
	}

	function onHashChange( event ) {
		if( window.location.hash.match( 'fold' ) && !document.body.className.match( 'meny-fold' ) ) {
			addClass( document.body, 'meny-fold' );

			var clone = document.createElement( 'div' );
			clone.className = 'meny right';
			clone.innerHTML = meny.innerHTML + '<div class="cover"></div>';
			document.body.appendChild( clone );

			addClass( meny, 'left' );
		}
		else {
			removeClass( document.body, 'meny-fold' );

			var clone = document.querySelector( '.meny.right' );

			if( clone ) {
				clone.parentNode.removeChild( clone );
			}
		}
	}

	function activate() {
		if( isActive === false ) {
			isActive = true;
			addClass( document.documentElement, 'meny-active' );
			meny.style.overflow = "";
		}
	}

	function deactivate() {
		if( isActive === true ) {
			isActive = false;
			removeClass( document.documentElement, 'meny-active' );
			meny.style.overflow = "hidden";
		}
	}

	function addClass( element, name ) {
		element.className = element.className.replace( /\s+$/gi, '' ) + ' ' + name;
	}

	function removeClass( element, name ) {
		element.className = element.className.replace( name, '' );
	}

	window.setTimeout(function() {
		meny.style.opacity = 1;
	}, 150);

};