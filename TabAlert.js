/**
 * Used to draw attention to the current browser tab by flashing the document
 * title and/or favicon
 *
 * @example
 * const tabAlert = new TabAlert();
 * tabAlert.flashTitle({ message: "Time's up!", times: 5 });
 */

window.TabAlert = (function () {
	const publicObject = {};

	const DEFAULT_DELAY = 750;

	let countdown = -1;
	let intervalID;
	let originalTitle = document.title;
	let showOriginalTitle = false;

	/**
	 * Takes a string (character) and creates a PNG image
	 * @param {String} str String to create icon from
	 * @returns {String} Returns a data URI
	 */
	function _createImageFromText(str) {
		if (document.querySelector('#_TabAlertCanvas') === null) {
			document.body.innerHTML += '<canvas id="_TabAlertCanvas" width="32" height="32" style="display:none"></canvas>';
		}
		const canvas = document.querySelector('#_TabAlertCanvas');
		const context = canvas.getContext('2d');

		context.font = '24px serif';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText(str, canvas.width / 2, canvas.height / 2);

		const canvasImage = canvas.toDataURL('image/png');

		return canvasImage;
	}

	function _changeFavicon(imageSource, imageType) {
		let favicon = document.querySelector('link[rel="shortcut icon"]');

		if (!favicon) {
			favicon = document.createElement('link');
			favicon.setAttribute('rel', 'shortcut icon');
			const head = document.querySelector('head');
			head.appendChild(favicon);
		}

		favicon.setAttribute('type', imageType);
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

	/**
	 * Stops the alert and restores the title and/or icon back to the original
	 */
	publicObject.stop = function() {
		window.clearInterval(intervalID);
		document.title = originalTitle;
	}

	publicObject.test = function() {
		x = _createImageFromText('🔔');
		console.log(x)
		_changeFavicon(x, 'image/png');
	}

	return publicObject;
});
