/**
 * Used to draw attention to the current browser tab by flashing the document
 * title and/or favicon
 *
 * @example
 * const tabAlert = new TabAlert();
 * tabAlert.alert({ message: "Time's up!", icon: "stopwatch", times: 5 });
 */

window.TabAlert = (function () {
	const publicObject = {};

	const DEFAULT_DELAY = 500;
	const ICONS = {
		'bellhop bell': '🛎',
		'speech balloon': '💬',
		'police car light': '🚨',
		'stop sign': '🛑',
		'hour g;ass done': '⌛',
		'alarm clock': '⏰',
		'stopwatch': '⏱',
		'timer clock': '⏲',
		'star': '⭐',
		'fire': '🔥',
		'party popper': '🎉',
		'bell': '🔔',
		'envelope with arrow': '📩',
		'locked': '🔒',
		'exclamation mark': '❗',
		'red circle': '🔴',
	}

	let alertIcon = {
		image: '',
		type: '',
	};
	let alertTitle = '';
	let countdown = -1;
	let intervalID;
	let originalIcon = {
		image: '',
		type: '',
	};
	let originalTitle = document.title;
	let showOriginal = true;

	/**
	 * Takes a string (character) and creates a PNG image
	 * @param {String} str String to create icon from
	 * @returns {String} Returns a data URI
	 */
	function _createImageFromText(str) {
		const imageType = 'image/png';

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

		return { image: canvasImage, type: imageType };
	}

	/**
	 * Changes favicon to the icon selected
	 */
	function _changeFavicon() {
		let favicon = document.querySelector('link[rel="shortcut icon"]');

		if (!favicon) {
			favicon = document.createElement('link');
			favicon.setAttribute('rel', 'shortcut icon');
			const head = document.querySelector('head');
			head.appendChild(favicon);
		}

		if (showOriginal) {
			favicon.setAttribute('type', originalIcon.type);
			favicon.setAttribute('href', originalIcon.image);
		} else {
			favicon.setAttribute('type', alertIcon.type);
			favicon.setAttribute('href', alertIcon.image);
		}
	}

	/**
	 * Changes the title
	 */
	function _changeTitle() {
		document.title = showOriginal ? originalTitle : alertTitle;
	}

	/**
	 * Attempts to retrieve the original favicon and returns an object
	 * with the image and type
	 */
	function _getOriginalFavicon() {
		const favicon = document.querySelector('link[rel="shortcut icon"]');
		if (favicon) {
			return {
				image: favicon.getAttribute('href'),
				type: favicon.getAttribute('type'),
			};
		}
	}

	/**
	 * Starts timer for alerts
	 * @param {Number} [delay] Number of milliseconds between changes
	 */
	function _startTimer(delay) {
		showOriginal = true;
		if ((delay === undefined) || (isNaN(delay))) {
			delay = DEFAULT_DELAY;
		}
		intervalID = window.setInterval(() => {
			_timerEvent();
		}, delay);
	}

	/**
	 * Called every X milliseconds while timer is active
	 */
	function _timerEvent() {
		showOriginal = !showOriginal;
		countdown -= 1;
		if (countdown < -1) countdown = -1;
		if (countdown === 0) publicObject.stop();
		if (alertIcon.image !== '') _changeFavicon();
		if (alertTitle !== '') _changeTitle();
	}

	/**
	 * Flashes the title and/or icon on the browser tab
	 * @param {Object} args Arguments passed to function
	 * @param {String} [args.message] Message to flash in browser tab
	 * @param {String} [args.icon] Icon to replace favicon with.
	 * @param {Number} [args.times] Number of times to flash the message
	 * If no number is given, it will flash indefinitely until the
	 * stop() method is called
	 * @param {Number} [args.delay] How fast to flash the message.
	 * This is the number of milliseconds between changes.
	 * <b>Note<b>: Intervals may slow down when the tab is not active.
	 * @example
	 * const tabAlert = new TabAlert();
	 * tabAlert.alert({ message: "Time's Up!", icon: "stopwatch", times: 3 });
	 */
	publicObject.alert = function(args) {
		if (args.message !== undefined) {
			originalTitle = document.title;
			alertTitle = args.message;
		} else {
			alertTitle = '';
		}
		if ((args.icon !== undefined) && (ICONS[args.icon])) {
			originalIcon = _getOriginalFavicon();
			alertIcon = _createImageFromText(ICONS[args.icon]);
		} else {
			alertIcon.image = '';
			alertIcon.type = '';
		}
		if (args.times !== undefined) {
			countdown = args.times * 2;
		} else {
			countdown = 0;
		}
		if (args.delay !== undefined) {
			alertDelay = DEFAULT_DELAY;
		}
		_startTimer();
	}

	/**
	 * Stops the alert and restores the title and/or icon back to the original
	 */
	publicObject.stop = function() {
		window.clearInterval(intervalID);
		document.title = originalTitle;
	}

	return publicObject;
});
