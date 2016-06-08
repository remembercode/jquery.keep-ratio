/**
 * A jQuery plugin for keeping the aspect ratio
 * https://github.com/loonkwil/jquery.keep-ratio
 * Date: Sept 14 2014
 * Fork And Update by Wangbing to 
 * https://github.com/remembercode/jquery.keep-ratio
 * Date: 2016.06.01
 */
(function (window) {
	'use strict';
	
	var $ = window.jQuery;
	var raf = window.requestAnimationFrame;
	
	/**
     * @type {{ratio: number, calculate: string}}
     */
    var defaultOptions = { ratio: 4 / 3, calculate: 'height', padding: 30 };
	
	/**
     * @param {jQuery} $el
     * @param {{ratio: number, calculate: string}} options
     * @param {boolean=} forceRendering
     * @return {jQuery}
     */
    var resize = function ($el, options, forceRendering) {
		var resizeFunction;
		if (options.calculate === 'parent') {
			resizeFunction = function () {
				var width = $el.parent().width();
				var height = $el.parent().height();
				var computeW = height * options.ratio;
				if (computeW < width) {
					$el.height(height);
					var newW = Math.round(height * options.ratio);
					var offset = Math.abs(newW - width);
					if (offset <= options.padding) {
						newW = width;
					}
					$el.width(newW);
				} else {
					var newH = Math.round(width / options.ratio);
					var offset = Math.abs(newH - height);
					if (offset <= options.padding) {
						newH = height;
					}
					$el.height(newH);
					$el.width(width);
				}
			};
		} else if (options.calculate === 'full') {
			resizeFunction = function () {
				$el.css({
					"width": "" + window.innerWidth + "px",
					"height": "" + window.innerHeight + "px"
				});
			};
		} else if (options.calculate === 'center') {
			resizeFunction = function () {
				if (!options.parent) options.parent = {};
				options.parent.width = $el.parent().width();
				options.parent.height = $el.parent().height();
				if (!options.computed) options.computed = {};
				options.computed.width = options.parent.height * options.ratio;
				if (!options.offset) options.offset = {};
				options.offset.width = options.computed.width - options.parent.width;
				if (!options.instance) options.instance = {};
				if (Math.abs(options.offset.width) <= options.padding) {
					options.instance.width = options.parent.width;
					options.instance.height = options.parent.height;
					options.instance.left = 0;
					options.instance.top = 0;
				} else if (options.offset.width < 0) {
					// ratio	w 16	h 9
					// parent	w 160px	h 9px
					// computed w 16px
					// offset	w -144px < 0
					// instance w 16px	h 9px
					// offset	w 144px
					// instance					t 0px l 72px
					options.instance.height = options.parent.height;
					options.instance.width = options.computed.width;//options.instance.height * options.ratio;
					options.offset.width = -options.offset.width;
					options.instance.top = 0;
					options.instance.left = options.offset.width / 2;;
				} else if (options.offset.width > 0) {
					// ratio	w 16	h 9
					// parent	w 16px	h 90px
					// computed w 160px
					// offset	w 144px	> 0
					// instance w 16px	h 9px
					// offset			h 81px
					// instance					t 72px l 0px
					options.instance.width = options.parent.width;
					options.instance.height = options.instance.width / options.ratio;
					options.offset.height = options.parent.height - options.instance.height;
					options.instance.top = options.offset.height / 2;
					options.instance.left = 0;
				}
				$el.css({
					"width": "" + options.instance.width + "px",
					"height": "" + options.instance.height + "px",
					"top": "" + options.instance.top + "px",
					"left": "" + options.instance.left + "px"
				});
			};
		} else if (options.calculate === 'height') {
			var width = $el.width();
			resizeFunction = function () {
				$el.height(Math.round(width / options.ratio));
			};
		} else {
			var height = $el.height();
			resizeFunction = function () {
				$el.width(Math.round(height * options.ratio));
			};
		}
		
		if (forceRendering) {
			resizeFunction();
		} else {
			raf(resizeFunction);
		}
		
		return $el;
	};
	
	/**
     * @param {jQuery} $els
     * @param {{ratio: number, calculate: string}} options
     * @param {boolean=} forceRendering
     * @return {jQuery}
     */
    var resizeAll = function ($els, options, forceRendering) {
		return $els.each(function () {
			resize($(this), options, forceRendering);
		});
	};
	
	
	/**
     * @param {{ratio: number, calculate: string}} options
     * @return {jQuery}
     */
    $.fn.keepRatio = function (options) {
		options = $.extend({}, defaultOptions, options);
		
		var $boxes = $(this);
		
		$(window).on('resize', function () {
			resizeAll($boxes, options);
		});
		
		return resizeAll($boxes, options, true);
	};
}(window));
