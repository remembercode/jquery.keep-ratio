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
    var defaultOptions = { ratio: 4 / 3, calculate: 'height' };
	
	/**
     * @param {jQuery} $el
     * @param {{ratio: number, calculate: string}} options
     * @param {boolean=} forceRendering
     * @return {jQuery}
     */
    var resize = function ($el, options, forceRendering) {
		var resizeFunction;
		if (options.calculate === 'parent') {
			var width = $el.parent().width();
			var height = $el.parent().height();
			resizeFunction = function () {
				if ((height * options.ratio) < width) {
					$el.height(height);
					var newW = Math.round(height * options.ratio);
					if (Math.abs(newW - width) <= 5) {
						newW = width;
					}
					$el.width(newW);
				} else {
					var newH = Math.round(width / options.ratio);
					if (Math.abs(newH - height) <= 5) {
						newH = height;
					}
					$el.height(newH);
					$el.width(width);
				}
			};
		} else if (options.calculate === 'center') {
			var width = $el.parent().width();
			var height = $el.parent().height();
			resizeFunction = function () {
				if ((height * options.ratio) < width) {
					$el.height(height);
					var newW = Math.round(height * options.ratio);
					var offset = Math.abs(newW - width);
					if (offset <= 20) {
						newW = width;
					}
					$el.width(newW);
					$el.css("top", "0px");
					$el.css("left", (Math.abs(newW - width) / 2) + "px");
					//$el.css("padding", "0px");
					//$el.css("border-width", "0px");
					//$el.css("margin", "0px");
				} else {
					var newH = Math.round(width / options.ratio);
					var offset = Math.abs(newH - height);
					if (offset <= 20) {
						newH = height;
					}
					$el.height(newH);
					$el.width(width);
					$el.css("top", (Math.abs(newH - height) / 2) + "px");
					$el.css("left", "0px");
					//$el.css("padding", "0px");
					//$el.css("border-width", "0px");
					//$el.css("margin", "0px");
				}
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
