/*
 * BootstrapPlus
 * Copyright 2012 Adam Presley. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY Adam Presley "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL Adam Presley OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

BootstrapPlus = {};

/**
 * Class: BootstrapPlus.Modal
 * Wrapper for the Twitter Bootstrap modal plugin. This object 
 * generates all the necessary markup for you so you don't have to.
 *
 * Author:
 * 	Adam Presley
 */
BootstrapPlus.Modal = function(config) {
	this.getId = function() {
		return __config.id;
	};

	this.close = function() {
		__$modalDiv.modal("hide");
	};

	this.show = function() {
		__$modalDiv.modal("show");
	};

	this.toggle = function() {
		__$modalDiv.modal("toggle");
	};


	var
		__init = function() {
			var
				$header,
				$closeAnchor,
				$headerDiv,
				$body,
				$footer,

				item,
				cls;

			__$modalDiv = $("<div />").attr({
				"class": "modal hide" + ((__config.animate) ? " fade" : ""),
				id: __config.id
			});

			/*
			 * Header
			 */
			$closeAnchor = $("<a />").attr({
				"class": "close",
				"data-dismiss": "modal"
			}).html("x");

			$header = $("<h3 />").html(__config.header);

			$headerDiv = $("<div />").attr({ "class": "modal-header" });
			if (__config.headerStyle.length > 0) $headerDiv.attr({ "style": __config.headerStyle });
			$headerDiv.append($closeAnchor);
			$headerDiv.append($header);

			/*
			 * Body
			 */
			$body = $("<div />").attr({ "class": "modal-body" }).html(__config.body);
			if (__config.bodyStyle.length > 0) $body.attr({ "style": __config.bodyStyle });
			
			/*
			 * Footer
			 */
			$footer = $("<div />").attr({ "class": "modal-footer" });

			for (item in __config.buttons) {
				cls = "btn" + ((__config.buttons[item].type && __config.buttons[item].type === "primary") ? " btn-primary" : "");
				$("<a />").attr({ href: "#", "class": cls }).html(item).on("click", __config.buttons[item].handler).appendTo($footer);
			}

			/*
			 * Craft the final modal
			 */
			__$modalDiv.append($headerDiv);
			__$modalDiv.append($body);
			__$modalDiv.append($footer);

			$(document).append(__$modalDiv);
			__$modalDiv.modal({ keyboard: __config.keyboard, backdrop: __config.backdrop, show: __config.show });
			__$modalDiv.on("hidden", __destroy);
			
			__attachEvents();
		},

		__attachEvents = function() {
			for (var e in __config.events) {
				if (e === "hidden") {
					__$modalDiv.on(e, function() {
						__destroy();
						__config.events[e]();
					});
				}
				else {
					__$modalDiv.on(e, __config.events[e]);
				}
			}
		},

		__destroy = function() {
			__$modalDiv.remove();
		},


		__this = this,
		__config = $.extend({
			id: "bsp-modal-" + (new Date().getTime()),
			header: "Header",
			headerStyle: "",
			body: "",
			bodyStyle: "",
			buttons: {
				"Close": { type: "primary", handler: function(target) { __this.close(); } }
			},

			keyboard: true,
			backdrop: true,
			show: true,
			animate: true,

			events: {}
		}, config),

		__$modalDiv;

	__init();
};