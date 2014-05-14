function linkify(selector, element) {
    if ("WebkitPerspective" in document.body.style || "MozPerspective" in document.body.style || "msPerspective" in document.body.style || "OPerspective" in document.body.style || "perspective" in document.body.style) {
		if (!element) return;
		var nodes = element.querySelectorAll(selector);
		for (var i = 0, len = nodes.length; i < len; i++) {
			var node = nodes[i];
			if (!node.className || !node.className.match(/roll/g)) {
				if (node.textContent !== node.innerHTML) continue;
				if (node.parentNode.className === "fakeInputContainer") {
					node.parentNode.className += " roll";
				}				
				///.fakeInputContainer input
				node.className += " roll";
				node.innerHTML = '<span data-title="' + node.innerHTML + '">' + node.innerHTML + '</span>';
			}
		};
	}
};