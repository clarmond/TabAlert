/**
 * Used to draw attention to the current browser tab by flashing the document
 * title and/or favicon
 */

window.TabAlert = (function () {
	const publicObject = {};

	const DEFAULT_DELAY = 750;

	let intervalID;
	let countdown = -1;
	let originalTitle = '';
	let showOriginalTitle = false;

	function _changeFavicon(imageSource) {
		let favicon = document.querySelector('link[rel="shortcut icon"]');

		if (!favicon) {
			favicon = document.createElement('link');
			favicon.setAttribute('rel', 'shortcut icon');
			const head = document.querySelector('head');
			head.appendChild(favicon);
		}

		// favicon.setAttribute('type', 'image/png');
		favicon.setAttribute('href', imageSource);
	}

	function _changeTitle(message) {
		document.title = showOriginalTitle ? originalTitle : message;
		showOriginalTitle = !showOriginalTitle;
		countdown -= 1;
		if (countdown === -1) countdown = -1;
		if (countdown === 0) publicObject.stop();
	}


	/**
	 * Flashes the title on the browser tab
	 * @param {Object} args Arguments passed to function
	 * @param {String} args.message Message to flash in browser tab
	 * @param {Number} [args.times] Number of times to flash the message
	 * If no number is given, it will flash indefinitely until the
	 * stop() method is called
	 * @param {Number} [args.delay] How fast to flash the message.
	 * This is the number of milliseconds between changes.
	 */
	publicObject.flashTitle = function(args) {
		originalTitle = document.title;
		if (args.times === undefined) args.times = -1;
		if (args.delay === undefined) args.delay = DEFAULT_DELAY;
		countdown = args.times * 2;
		intervalID = window.setInterval(() => {
			_changeTitle(args.message);
		}, args.delay);
	}

	publicObject.stop = function() {
		window.clearInterval(intervalID);
		document.title = originalTitle;
	}

	return publicObject;
});
