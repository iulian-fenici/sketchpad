/**
 * @license -------------------------------------------------------------------
 *   module: Avgrund - Modal concept which aims to give a sense of depth.
 *      src: http://lab.hakim.se/avgrund
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

var avgrundInit = function() {

	var container = document.documentElement;
	var popup = document.querySelector( '.avgrund-popup' );
	var cover = document.querySelector( '.avgrund-cover' );
	var close = document.querySelector( '.avgrund-popup .close' );
	var currentState = null;

	container.className = container.className.replace( /\s+$/gi, '' ) + ' avgrund-ready';

	// Deactivate on ESC
	function onDocumentKeyUp( event ) {
		if( event.keyCode === 27 ) {
			deactivate();
		}
	}

	// Deactivate on click outside
	function onDocumentClick( event ) {
		if( event.target === cover ) {
			deactivate();
		}
	}

	function activate( state ) {
		if (document.querySelector(".avgrund-active")) return;
		document.addEventListener( 'keyup', onDocumentKeyUp, false );
		cover.addEventListener( 'click', onDocumentClick, false );

		removeClass( popup, currentState );
		addClass( popup, 'no-transition' );
		addClass( popup, state );

		setTimeout( function() {
			removeClass( popup, 'no-transition' );
			addClass( container, 'avgrund-active' );
		}, 0 );

		currentState = state;
		avgrund.active = true;
		
	}

	function deactivate() {
		document.removeEventListener( 'keyup', onDocumentKeyUp, false );
		cover.removeEventListener( 'click', onDocumentClick, false );
		removeClass( container, 'avgrund-active' );
		avgrund.active = false;
	}

	function disableBlur() {
		addClass( document.documentElement, 'no-blur' );
	}

	function addClass( element, name ) {
		element.className = element.className.replace( /\s+$/gi, '' ) + ' ' + name;
	}

	function removeClass( element, name ) {
		element.className = element.className.replace( name, '' );
	}

	window.avgrund = {
		activate: activate,
		deactivate: deactivate,
		disableBlur: disableBlur
	}

	close.onclick = avgrund.deactivate;
	popup.onclick = avgrund.deactivate;
	popup.querySelector("div").onclick = Event.stop;

};