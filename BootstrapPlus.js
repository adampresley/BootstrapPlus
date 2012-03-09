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
				class: "modal hide fade",
				id: __config.id
			});

			/*
			 * Header
			 */
			$closeAnchor = $("<a />").attr({
				class: "close",
				"data-dismiss": "modal"
			}).html("x");

			$header = $("<h3 />").html(__config.header);

			$headerDiv = $("<div />").attr({ class: "modal-header" });
			$headerDiv.append($closeAnchor);
			$headerDiv.append($header);

			/*
			 * Body
			 */
			$body = $("<div />").attr({ class: "modal-body" }).html(__config.body);

			/*
			 * Footer
			 */
			$footer = $("<div />").attr({ class: "modal-footer" });

			for (item in __config.buttons) {
				cls = "btn" + ((__config.buttons[item].type && __config.buttons[item].type === "primary") ? " btn-primary" : "");
				$("<a />").attr({ href: "#", class: cls }).html(item).on("click", __config.buttons[item].handler).appendTo($footer);
			}

			/*
			 * Craft the final modal
			 */
			__$modalDiv.append($headerDiv);
			__$modalDiv.append($body);
			__$modalDiv.append($footer);

			$(document).append(__$modalDiv);
			__$modalDiv.modal({ keyboard: __config.keyboard, backdrop: __config.backdrop, show: __config.show });

			__attachEvents();
		},

		__attachEvents = function() {
			for (var e in __config.events) {
				__$modalDiv.on(e, __config.events[e]);
			}
		},


		__this = this,
		__config = $.extend({
			id: "bsp-modal-" + (new Date().getTime()),
			header: "Header",
			body: "",
			buttons: {
				"Close": { type: "primary", handler: function(target) { __this.close(); } }
			},

			keyboard: true,
			backdrop: true,
			show: true,

			events: {}
		}, config),

		__$modalDiv;

	__init();
};