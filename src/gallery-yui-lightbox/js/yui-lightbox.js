	
	/**
	* A YUI3 lightbox.
	* @module gallery-yui-lightbox
	* @requires overlay
	* @optional transition, io-base, swf
	* @author Josh Lizarraga
	*/
	
	/**
	* @class Lightbox
	* @extends Overlay
	* @constructor
	* @param {Object} config Configuration object.
	*/
	var Lightbox = function(config){
		
		Lightbox.superclass.constructor.apply(this, arguments);
		
	};
	
	/**
	* @property NAME
	* @type String
	* @default Lightbox
	*/
	Lightbox.NAME = 'Lightbox';
	
	/* ! Attributes */
	
	Lightbox.ATTRS = {
		
		/**
		* The lightbox's active boxified element.
		* @attribute active
		* @type Node
		* @default null
		*/
		active: {
			value: null
		},
		
		/**
		* The lightbox's description area.
		* @attribute description
		* @type Node
		* @default null
		*/
		description: {
			value: null
		},
		
		/**
		* The lightbox's navigation area.
		* @attribute nav
		* @type Node
		* @default null
		*/
		nav: {
			value: null
		},
		
		/**
		* The lightbox's counter area.
		* @attribute counter
		* @type Node
		* @default null
		*/
		counter: {
			value: null
		},
		
		/**
		* The lightbox's current gallery position.
		* @attribute current
		* @type Node
		* @default null
		*/
		current: {
			value: null
		},
		
		/**
		* The lightbox's total gallery items.
		* @attribute total
		* @type Node
		* @default null
		*/
		total: {
			value: null
		},
		
		/**
		* The lightbox's canvas.
		* @attribute canvas
		* @type Node
		* @default null
		*/
		canvas: {
			value: null
		},
		
		/**
		* The lightbox's canvas content.
		* @attribute canvasContent
		* @type Node
		* @default null
		*/
		canvasContent: {
			value: null
		},
		
		/**
		* The lightbox's throbber.
		* @attribute throbber
		* @type Node
		* @default null
		*/
		throbber: {
			value: null
		},
		
		/**
		* The throbber's throbby dot thingers.
		* @attribute throbbies
		* @type NodeList
		* @default null
		*/
		throbbies: {
			value: null
		},
		
		/**
		* YUI timer object for the throbber.
		* @attribute throbTimer
		* @type Object
		* @default null
		*/
		throbTimer: {
			value: null
		},
		
		/**
		* Current throb index.
		* @attribute throbIndex
		* @type Integer
		* @default 0
		*/
		throbIndex: {
			value: 0
		},
		
		/**
		* The lightbox's mask.
		* @attribute mask
		* @type Node
		* @default null
		*/
		mask: {
			value: null
		},
		
		/**
		* The mask's opacity.
		* @attribute maskOpacity
		* @type Float
		* @default 0.7 (from default skin CSS)
		*/
		maskOpacity: {
			value: null
		},
		
		/**
		* The current gallery elements, if any.
		* @attribute gallery
		* @type NodeList
		* @default null
		*/
		gallery: {
			value: null
		},
		
		/**
		* The index of the current gallery item.
		* @attribute galleryIndex
		* @type Integer
		* @default 0
		*/
		galleryIndex: {
			value: 0
		},
		
		/**
		* Custom args for a given gallery.
		* @attribute galleryArgs
		* @type Object
		* @default {}
		*/
		galleryArgs: {
			value: {}
		},
		
		/**
		* Minimum amount of padding to apply between the browser chrome and lightbox.
		* @attribute winPadding
		* @type Integer
		* @default 30
		*/
		winPadding: {
			value: 30
		},
		
		/**
		* Time in seconds of lightbox transitions.
		* @attribute duration
		* @type Float
		* @default 0.2
		*/
		duration: {
			value: 0.2
		},
		
		/**
		* Easing function to use for lightbox transitions.
		* @attribute easing
		* @type String
		* @default ease-out
		*/
		easing: {
			value: 'ease-out'
		},
		
		/**
		* Lightbox visibility.
		* @attribute visible
		* @type Boolean
		* @default false
		*/
		visible: {
			value: false
		},
		
		/**
		* The z-index to use for the lightbox.
		* @attribute zIndex
		* @type Integer
		* @default 30000
		*/
		zIndex: {
			value: 30000
		},
		
		/**
		* The content types to destroy when the lightbox is hiddden.
		* @attribute destructible
		* @type Array
		* @default ['iframe', 'swf']
		*/
		destructible: {
			value: ['iframe', 'swf']
		},
		
		/**
		* The current content type.
		* @attribute contentType
		* @type String
		* @default null
		*/
		contentType: {
			value: null
		},
		
		/**
		* The regex pattern to use for finding images.
		* @attribute imgRegex
		* @type RegExp
		* @default /\w*\.jpe?g|png|gif$/i
		*/
		imgRegex: {
			value: /\w*\.jpe?g|png|gif$/i
		},
		
		/**
		* The regex pattern to use for finding Flash files.
		* @attribute swfRegex
		* @type RegExp
		* @default /\w*\.swf(\?.*#?.*)?$/i
		*/
		swfRegex: {
			value: /\w*\.swf(\?.*#?.*)?$/i
		},
		
		/**
		* General file regex pattern.
		* @attribute fileRegex
		* @type RegExp
		* @default /\w*\.\w{3,4}$/i
		*/
		fileRegex: {
			value: /\w*\.\w{3,4}$/i
		},
		
		/**
		* IE gradient regex pattern.
		* @attribute gradientRegex
		* @type RegExp
		* @default /progid:DXImageTransform\.Microsoft\.Gradient\(startColorstr='.*', endColorstr='.*'\)/i
		*/
		gradientRegex: {
			value: /progid:DXImageTransform\.Microsoft\.Gradient\(startColorstr='.*', endColorstr='.*'\)/i
		},
		
		/**
		* Nested elements that use filters (such as gradients) in IE.
		* This is to workaround nested filter limitations in IE8.
		* @attribute ieFiltered
		* @type String|Node|NodeList
		* @default '.yui3-lightbox-button, .yui3-lightbox-counter'
		*/
		ieFiltered: {
			value: '.yui3-lightbox-button, .yui3-lightbox-counter'
		}
		
	};
	
	Y.extend(Lightbox, Y.Overlay, {
		
		/* ! Public Methods */
		
		/**
		* Wires up elements for lightboxn'.
		* This method is chainable.
		* @method boxify
		* @param {Node|NodeList|String} target The target(s) to boxify.
		* @param {Object} config Configuration object.
		* @chainable
		*/
		boxify: function(target, config){
			
			this.fire('boxify', target, config);
			
			return this;
			
		},
		
		/**
		* Hides the lightbox.
		* This method is chainable.
		* @method hide
		* @chainable
		*/
		hide: function(){
			
			this.fire('hide');
			
			return this;
			
		},
		
		/**
		* Displays the lightbox.
		* This method is chainable.
		* @method show
		* @chainable
		*/
		show: function(){
			
			this.fire('show');
			
			return this;
			
		},
		
		/**
		* Loads the target and displays the lightbox.
		* This method is chainable.
		* @method view
		* @chainable
		* @param {String} url Target url to load. Can also be a configuration object.
		* @param {String} text Text description to display.
		* @param {String} config Configuration object.
		*/
		view: function(url, text, config){
			
			var args = url;
			
			if( Y.Lang.isString(args) ){
				
				args = { url: url, text: text };
				
				if(config){
					for( var i in config ){
						if(config.hasOwnProperty(i)){ args[i] = config[i]; }
					}
				}
				
			}
			
			this.fire('view', args);
			
			return this;
			
		},
		
		/**
		* Displays the previous gallery item.
		* This method is chainable.
		* @method previous
		* @chainable
		*/
		previous: function(){
			
			this.fire('previous', true);
			
			return this;
			
		},
		
		/**
		* Displays the next gallery item.
		* This method is chainable.
		* @method next
		* @chainable
		*/
		next: function(){
			
			this.fire('next', false);
			
			return this;
			
		},
		
		/**
		* Loads an image.
		* This method is chainable.
		* @method loadImage
		* @chainable
		* @param {Object} args Configuration object.
		*/
		loadImage: function(args){
			
			args.image = true;
			
			args.contentType = 'image';
			
			this.fire('loadImage', args);
			
			return this;
			
		},
		
		/**
		* Loads an iframe.
		* This method is chainable.
		* @method loadIframe
		* @chainable
		* @param {Object} args Configuration object.
		*/
		loadIframe: function(args){
			
			args.iframe = true;
			
			args.contentType = 'iframe';
			
			this.fire('loadIframe', args);
			
			return this;
			
		},
		
		/**
		* Loads ajax content.
		* This method is chainable.
		* @method loadAJAX
		* @chainable
		* @param {Object} args Configuration object.
		*/
		loadAJAX: function(args){
			
			args.contentType = 'ajax';
			
			this.fire('loadAJAX', args);
			
			return this;
			
		},
		
		/**
		* Loads Flash content.
		* This method is chainable.
		* @method loadSWF
		* @chainable
		* @param {Object} args Configuration object.
		*/
		loadSWF: function(args){
			
			args.swf = true;
			
			args.contentType = 'swf';
			
			args.flashAttrs = args.flashAttrs || {};
			
			args.flashAttrs.wmode = args.flashAttrs.wmode || 'opaque';
			
			this.fire('loadSWF', args);
			
			return this;
			
		},
		
		/**
		* Loads a Node.
		* This method is chainable.
		* @method loadNode
		* @chainable
		* @param {Object} args Configuration object.
		*/
		loadNode: function(args){
			
			args.contentType = 'node';
			
			args.node = Y.Lang.isString(args.node) ? Y.one(args.node) : args.node;
			
			args.node = args.node.cloneNode(true);
			
			this.fire('loadNode', args);
			
			return this;
			
		},
		
		/**
		* Loads HTML.
		* This method is chainable.
		* @method loadHTML
		* @chainable
		* @param {Object} args Configuration object.
		*/
		loadHTML: function(args){
			
			args.contentType = 'html';
			
			args.node = Y.Node.create(args.html);
			
			this.fire('loadHTML', args);
			
			return this;
			
		},
		
		/* ! Protected Methods */
		
		/**
		* Wires up elements for lightboxn'.
		* @event _boxify
		* @protected
		*/
		_boxify: function(e, target, config){
			
			target = Y.Lang.isString(target) ? Y.all(target) : target;
			
			target.addClass(this.getClassName('boxified'));
			
			target.on('click', this._handleBoxifiedClick, this, config);
			
		},
		
		/**
		* Hides the lightbox.
		* @event _hide
		* @protected
		*/
		_hide: function(e){
			
			var that = this,
				cB = this.get('contentBox'),
				cC = this.get('canvasContent'),
				mask = this.get('mask'),
				
				hide = function(){
					
					that._fade(cB, 0, function(){
						
						that.get('nav').setStyles({
							display: 'none',
							opacity: 0
						});
						
						if( that.get('contentType') in that.get('destructible') ){
							
							cC.empty();
							
						}
						
						that._fade(mask, 0, function(){
							
							that.set('visible', false);
							
							mask.addClass(that.getClassName('hidden'));
							
						});
						
					});
					
				};
			
			if( Y.UA.ie == 8 ){
				
				this._fade(this.get('ieFiltered'), 0, hide);
				
			}
			
			else {
				
				hide();
				
			}
			
		},
		
		/**
		* Displays the lightbox.
		* @event _show
		* @protected
		*/
		_show: function(e){
			
			var that = this,
				cB = this.get('contentBox'),
				mask = this.get('mask'),
				nav = this.get('nav'),
				active = this.get('active'),
				gallery = this.get('gallery'),
				duration = this.get('duration'),
				easing = this.get('easing'),
				index;
			
			if(this.get('visible')){ return; }
			
			this.set('visible', true)
				._center();
			
			if( active && gallery ){
				
				index = gallery.indexOf(active);
				
				this.set('galleryIndex', index);
				
				this.get('current').setContent(index + 1);
				this.get('total').setContent(gallery.size());
				
				nav.setStyles({
					display: 'block',
					opacity: 1
				});
				
				this._clearFilter(nav);
				
			}
			
			mask.removeClass(that.getClassName('hidden'));
			
			this._fade(mask, this.get('maskOpacity'), function(){
				
				cB.setStyle('marginTop', '-20px')
					.transition({
						duration: duration,
						easing: easing,
						opacity: 1,
						marginTop: 0
					}, function(){
						
						that._clearFilter(cB);
						
						if( Y.UA.ie == 8 ){
							
							that._fade(that.get('ieFiltered'), 1);
							
						}
						
					});
				
			});
			
		},
		
		/**
		* Loads the target and displays the lightbox.
		* @event _view
		* @protected
		*/
		_view: function(args){
			
			if( args.image || this.get('imgRegex').test(args.url) ){
				
				this.loadImage(args);
				
			}
			else if( args.swf || this.get('swfRegex').test(args.url) ){
				
				this.loadSWF(args);
				
			}
			else if( args.ajax ){
				
				this.loadAJAX(args);
				
			}
			else if( args.html ){
				
				this.loadHTML(args);
				
			}
			else if( args.node ){
				
				this.loadNode(args);
				
			}
			else {
				
				this.loadIframe(args);
				
			}
			
		},
		
		/**
		* Displays the pevious (true) or next (false) gallery item.
		* @event _next
		* @protected
		*/
		_prevNext: function(e){
			
			var increment = e.type.split(':')[1] == 'previous' ? -1 : 1,
				current = this.get('current'),
				gallery = this.get('gallery'),
				args = this.get('galleryArgs'),
				index = this.get('galleryIndex') + increment,
				size = gallery.size(),
				duration = this.get('duration'),
				easing = this.get('easing'),
				target;
			
			if( index < 0 ){ index = size - 1; }
			else if( index >= size ){ index = 0; }
			
			target = gallery.item(index);
			
			this.set('galleryIndex', index);
			
			this._fade(this.get('counter'), 0, function(){
				
				current.setContent(index + 1);
				
			});
			
			args.url = this._getBestURL(target);
			args.text = this._getBestDescription(target);
			
			this.view(args);
			
		},
		
		/**
		* Centers the lightbox.
		* @event _center
		* @protected
		*/
		_center: function(e, target){
			
			this._ieFooterFix();
			
			this.get('boundingBox').setStyle('marginLeft', this._getMargin('left'))
									.setStyle('marginTop', this._getMargin('top'));
			
			return this;
			
		},
		
		/**
		* Calculates margins for animations.
		* @event _getMargin
		* @protected
		* @param {String} margin The margin to calculate.
		*/
		_getMargin: function(margin){
			
			if( Y.Lang.isString(margin) ){
				
				var dimension = margin == 'left' ? 'offsetWidth' : 'offsetHeight';
				
				margin = this.get('boundingBox').get(dimension);
				
			}
			
			return '-' + Math.round(margin/2) + 'px';
			
		},
		
		/**
		* Finds the best content target for an element.
		* @event _getBestURL
		* @protected
		* @param {Node} target The element to generate a target from.
		*/
		_getBestURL: function(target){
			
			if( target.get('href') ){ return target.get('href'); }
			
			if( target.get('src') ){ return target.get('src'); }
			
		},
		
		/**
		* Generates a description for an element.
		* @event _getBestDescription
		* @protected
		* @param {Node} target The element to generate a description from.
		*/
		_getBestDescription: function(target){
			
			if( target.get('title') ){ return target.get('title'); }
			
			if( target.get('alt') ){ return target.get('alt'); }
			
			if( target.get('textContent') ){ return target.get('textContent'); }
			
			if( target.get('innerText') ){ return target.get('innerText'); }
			
			var fallback = target.get('href') || target.get('src');
			
			if( this.get('imgRegex').test(fallback) ){
				
				return this.get('imgRegex').exec(fallback)[0];
				
			}
			
			if( this.get('fileRegex').test(fallback) ){
				
				return this.get('fileRegex').exec(fallback)[0];
				
			}
			
			return fallback;
			
		},
		
		/**
		* Loads content.
		* @event _loadContent
		* @protected
		*/
		_loadContent: function(args){
			
			var tag,
				
				callback = function(id, obj){
					
					if( args.ajax ){
						args.node.setContent(obj.responseText);
					}
					
					this.fire('load', args);
					
				};
			
			if( args.image ){
				tag = 'img';
			}
			else if( args.iframe ){
				tag = 'iframe';
			}
			else {
				tag = 'div';
			}
			
			if( !args.node ){
				
				args.node = Y.Node.create('<' + tag + '>');
				
				if( tag == 'div' ){ args.node.setStyle('height', '100%'); }
				
			}
			
			this._showThrobber();
			
			this._fade(this.get('description'), 0, function(){ this.setContent(args.text); });
			this._fade(this.get('canvasContent'), 0, function(){ this.setContent(args.node); });
			
			if( args.image || args.iframe ){
				
				args.node.on('load', callback, this);
				args.node.set('src', args.url);
				
			}
			else if( args.ajax ){
				
				Y.io(args.url, {
					on: { complete: callback },
					context: this
				});
				
			}
			else if( args.swf ){
				
				new Y.SWF(args.node, args.url, {
					version: args.flashVersion,
					fixedAttributes: args.flashAttrs,
					flashVars: args.flashVars
				});
				
				callback.call(this);
				
			}
			else {
				
				callback.call(this);
				
			}
			
		},
		
		/**
		* Lightbox content loaded event.
		* @event _load
		* @protected
		*/
		_load: function(args){
			
			var dimensions = this._calculateDimensions(args);
			
			this._resizeAndDisplay(
				dimensions.nodeWidth,
				dimensions.nodeHeight,
				dimensions.cbWidth,
				dimensions.cbHeight
			);
			
		},
		
		/**
		* Calculates new lightbox dimensions.
		* @method _calculateDimensions
		* @protected
		*/
		_calculateDimensions: function(args){
			
			var bB = this.get('boundingBox'),
				cB = this.get('contentBox'),
				canvas = this.get('canvas'),
				cC = this.get('canvasContent'),
				counter = this.get('counter'),
				duration = this.get('duration'),
				easing = this.get('easing'),
				measuredNode = args.node;
				
			if( Y.UA.ie == 9 ){
				measuredNode = args.node.cloneNode(false);
				measuredNode.setStyles({ position: 'absolute', top: '-9999em', left: '-9999em' })
					.detach();
				Y.one(document.body).append(measuredNode);
			}
			
			var nativeWidth = parseInt(measuredNode.get('width'), 10),
				nativeHeight = parseInt(measuredNode.get('height'), 10);
			
			if( Y.UA.ie == 9 ){ measuredNode.remove(); };
			
			var nodeWidth = args.width || nativeWidth,
				nodeHeight = args.height || nativeHeight,
				uiWidth = bB.get('offsetWidth') - cC.get('offsetWidth'),
				uiHeight = bB.get('offsetHeight') - cC.get('offsetHeight'),
				
				winWidth = cB.get('winWidth'),
				winHeight = cB.get('winHeight'),
				winPadding = this.get('winPadding')*2,
				
				ratio = nativeWidth / nativeHeight,
				newCBWidth,
				newCBHeigt,
				padWidth,
				padHeight;
			
			if( args.image ){
				
				if( !args.height ){
					nodeHeight = parseInt(nodeWidth / ratio, 10);
				}
				else if( !args.width ){
					nodeWidth = parseInt(nodeHeight * ratio, 10);
				}
				
				
			}
			else if( !nodeWidth || !nodeHeight ){
				
				nodeWidth = nodeWidth || winWidth - winPadding - uiWidth;
				nodeHeight = nodeHeight || winHeight - winPadding - uiHeight;
				
			}
			
			ratio = nodeWidth / nodeHeight;
			
			newCBWidth = nodeWidth + uiWidth;
			newCBHeight = nodeHeight + uiHeight;
			
			padWidth = newCBWidth + winPadding;
			padHeight = newCBHeight + winPadding;
			
			if( padWidth > winWidth ){
				
				newCBWidth = winWidth - winPadding;
				nodeWidth = newCBWidth - uiWidth;
				nodeHeight = parseInt(nodeWidth / ratio, 10);
				newCBHeight = nodeHeight + uiHeight;
				
			}
			else if( padHeight > winHeight ){
				
				newCBHeight = winHeight - winPadding;
				nodeHeight = newCBHeight - uiHeight;
				nodeWidth = parseInt(nodeHeight * ratio, 10);
				newCBWidth = nodeWidth + uiWidth;
				
			}
			
			if( args.image || args.iframe || args.ajax ){
				
				args.node.setStyle('width', '100%')
							.setStyle('height', '100%');
				
			}
			
			this.set('contentType', args.contentType)
			
			return {
				nodeWidth: nodeWidth,
				nodeHeight: nodeHeight,
				cbWidth: newCBWidth,
				cbHeight: newCBHeight
			};
			
		},
		
		/**
		* Resizes the lightbox and displays newly loaded content.
		* @method _resizeAndDisplay
		* @protected
		* @param {Integer} nodeWidth Width of canvas node.
		* @param {Integer} nodeHeight Height of canvas node.
		* @param {Integer} cbWidth contentBox width.
		* @param {Integer} cbHeight contentBox height.
		*/
		_resizeAndDisplay: function(nodeWidth, nodeHeight, cbWidth, cbHeight){
			
			var that = this,
				duration = this.get('duration'),
				easing = this.get('easing');
			
			this.get('boundingBox').transition({
				duration: duration,
				easing: easing,
				marginLeft: that._getMargin(cbWidth),
				marginTop: that._getMargin(cbHeight)
			});
			
			canvas = this.get('canvas').transition({
				duration: duration,
				easing: easing,
				width: nodeWidth + 'px',
				height: nodeHeight + 'px'
			}, function(){
				
				that._ieFooterFix();
				
				that._hideThrobber();
				
				that._fade([that.get('canvasContent'), that.get('description'), that.get('counter')], 1);
				
			});
			
		},
		
		/**
		* Adds loading class to lightbox canvas.
		* @method _showThrobber
		* @protected
		*/
		_showThrobber: function(){
			
			var throbber = this.get('throbber'),
				timer = this.get('throbTimer');
			
			if(timer){ timer.cancel(); }
			
			this._throb();
			this.set('throbTimer', Y.later(100, this, this._throb, null, true));
			
			throbber.removeClass(this.getClassName('hidden'));
			
			this._fade(throbber, 1);
			
			this.show();
			
		},
		
		/**
		* Removes loading class from lightbox canvas.
		* @method _hideThrobber
		* @protected
		*/
		_hideThrobber: function(){
			
			var that = this,
				throbber = this.get('throbber'),
				hidden = this.getClassName('hidden');
			
			this._fade(throbber, 0, function(){
				
				throbber.addClass(hidden);
				
				that.get('throbTimer').cancel();
				
			});
			
		},
		
		/**
		* Progresses the throb animation.
		* @method _throb
		* @protected
		*/
		_throb: function(){
			
			var throbbies = this.get('throbbies'),
				throb = this.get('throbIndex') + 1
				fade = 2;
			
			if( throb >= throbbies.size() + fade ){ throb = -(fade); }
			
			this.set('throbIndex', throb);
			
			throbbies.each(function(node, i){
				
				var padding = fade - Math.abs(throb - i);
				
				if( padding < 0 ){ padding = 0; }
				
				node.setStyle('padding', padding + 'px');
				
			});
			
		},
		
		/**
		* Fades element to a given opacity.
		* @method _fade
		* @protected
		* @param {Node|NodeList|Array} node Node(s) to fade.
		* @param {Float} opacity Opacity level to fade to.
		* @param {Function} callback Callback function for transition.
		*/
		_fade: function(node, opacity, callback){
			
			var that = this;
			
			if( Y.Lang.isArray(node) ){
				
				for( var i=0; i<node.length; i++ ){
					this._fade(node[i], opacity, callback);
				}
				
				return;
				
			}
			
			node.transition({
				duration: this.get('duration'),
				easing: this.get('easing'),
				opacity: opacity
			}, function(){
				
				if( opacity === 1 ){ that._clearFilter(node); }
				
				if( callback ){ callback.call(node); }
				
			});
			
		},
		
		/**
		* Sets "filter" attribute to null (for IE<9).
		* @method _clearFilter
		* @protected
		* @param {Node|NodeList} node The target Node(s).
		*/
		_clearFilter: function(node){
			
			var that = this,
				gradientRegex = this.get('gradientRegex'),
				gradient;
			
			if( !Y.UA.ie || Y.UA.ie > 8 ){ return; }
			
			if( node.size ){
				
				node.each(function(node){ that._clearFilter(node); });
				
				return;
				
			}
			
			node = Y.Node.getDOMNode(node);
			
			if( node.style.filter ){
				
				gradient = gradientRegex.exec(node.style.filter);
				
				node.style.filter = null;
				
				if( gradient ){ node.style.filter = gradient[0]; }
				
			}
			
		},
		
		/**
		* Handles lightbox button clicks.
		* @event _handleButtonClick
		* @protected
		*/
		_handleButtonClick: function(e){
			
			var target = e.target.ancestor('.' + this.getClassName('button'), true),
				lbClass = this.getClassName(),
				regex = new RegExp('button ' + lbClass + '-(.*)'),
				type = regex.exec(target.get('className'))[1];
			
			switch(type){
				case 'previous':
					this.previous();
					break;
				case 'next':
					this.next();
					break;
				case 'close':
					this.hide();
					break;
			}
			
		},
		
		/**
		* Handles clicks on boxified elements.
		* @event _handleBoxifiedClick
		* @protected
		*/
		_handleBoxifiedClick: function(e, config){
			
			var target = e.target.ancestor('.' + this.getClassName('boxified'), true),
				rel = e.target.get('rel'),
				gallery = rel ? Y.all('*[rel="' + rel + '"]') : null,
				args = config || {};
			
			e.preventDefault();
			
			if( gallery && gallery.size() === 1 ){ gallery = null; }
			
			this.set('active', target)
				.set('gallery', gallery)
				.set('galleryArgs', args);
			
			args.url = this._getBestURL(target);
			args.text = this._getBestDescription(target);
			
			this.view(args);
			
		},
		
		/**
		* Sets footer width for IE<8.
		* @event _ieFooterFix
		* @protected
		*/
		_ieFooterFix: function(){
			
			if( Y.UA.ie & Y.UA.ie < 8 ){
				
				this.getStdModNode(Y.WidgetStdMod.FOOTER)
					.setStyle('width', this.get('canvas').get('offsetWidth') + 'px');
				
			}
			
		},
		
		/**
		* Fallback method when transition module is absent.
		* @method __transitionFallback
		* @protected
		* @param {Object} config Configuration object.
		* @param {Function} callback Callback function.
		*/
		__transitionFallback: function(config, callback){
			
			for( var i in config ){
				
				if( config.hasOwnProperty(i) && i != 'duration' && i != 'easing' ){
					
					this.setStyle(i, config[i]);
					
				}
				
			}
			
			if(callback){ callback(); }
			
		},
		
		/* ! Lifecycle Methods */
		
		/**
		* Renders the lightbox.
		* @method renderUI
		*/
		renderUI: function(){
			
			// TODO: Clean this up.
			
			var	cB = this.get('contentBox'),
				lbClass = this.getClassName(),
				body = Y.one(document.body),
				mask = Y.Node.create('<div class="' + lbClass + '-mask ' + lbClass + '-hidden"></div>'),
				throbberHTML = '',
				throbber,
				footer,
				nav;
			
			this.setStdModContent(Y.WidgetStdMod.BODY, '\
				<div class="' + lbClass + '-canvas">\
					<div class="' + lbClass + '-canvas-content"></div>\
				</div>\
				<div class="' + lbClass + '-throbber ' + lbClass + '-hidden"></div>\
			');
			
			throbber = cB.one('.' + lbClass + '-throbber');
			
			for( var i=0; i<10; i++ ){ throbberHTML += '<div><span></span></div>'; }
			
			throbber.append(throbberHTML);
			
			this.set('throbbies', throbber.all('span'));
			
			this.setStdModContent(Y.WidgetStdMod.FOOTER, '\
				<div class="' + lbClass + '-nav">\
					<a class="' + lbClass + '-button ' + lbClass + '-previous" href="javascript:void(0);" title="Previous"><span></span><span></span></a>\
					<span class="' + lbClass + '-counter">\
						<span class="' + lbClass + '-current"></span><span class="' + lbClass + '-of">of</span><span class="' + lbClass + '-total"></span>\
					</span>\
					<a class="' + lbClass + '-button ' + lbClass + '-next" href="javascript:void(0);" title="Next"><span></span><span></span></a>\
				</div>\
				<div class="' + lbClass + '-controls">\
					<a class="' + lbClass + '-button ' + lbClass + '-close" href="javascript:void(0);" title="Close">x</a>\
				</div>\
				<p></p>\
			');
			
			body.append(mask);
			
			this.set('mask', mask)
				.set('canvas', cB.one('.' + lbClass + '-canvas'))
				.set('canvasContent', cB.one('.' + lbClass + '-canvas-content'))
				.set('throbber', cB.one('.' + lbClass + '-throbber'));
			
			footer = this.getStdModNode(Y.WidgetStdMod.FOOTER);
			nav = footer.one('.' + lbClass + '-nav');
			
			this.set('description', footer.one('p'))
				.set('nav', nav)
				.set('counter', nav.one('.' + lbClass + '-counter'))
				.set('current', nav.one('.' + lbClass + '-current'))
				.set('total', nav.one('.' + lbClass + '-total'));
			
			if( Y.UA.ie == 8 && Y.Lang.isString(this.get('ieFiltered')) ){
				
				this.set('ieFiltered', cB.all(this.get('ieFiltered')));
				
			}
			
		},
		
		/**
		* Binds event handlers and publishes lightbox events.
		* @method bindUI
		*/
		bindUI: function(){
			
			var events = [
					'show',
					'hide',
					'previous',
					'next',
					'boxify',
					'view',
					'loadImage',
					'loadIframe',
					'loadAJAX',
					'loadSWF',
					'loadNode',
					'loadHTML',
					'load'
				];
			
			for( var i=0, event, fn; i<events.length; i++ ){
				
				event = events[i];
				
				if( event == 'previous' || event == 'next' ){
					fn = '_prevNext';
				}
				else if( event.match('load') && event != 'load' ){
					fn = '_loadContent';
				}
				else {
					fn = '_' + event;
				}
				
				this.publish(event, { defaultFn: this[fn] });
				
			}
			
			this.get('contentBox').all('.' + this.getClassName('button')).on('click', this._handleButtonClick, this);
			
			this.get('mask').on('click', this.hide, this);
			
		},
		
		/**
		* Syncs lightbox UI.
		* @method syncUI
		*/
		syncUI: function(){
			
			var els,
				setOpacity = function(node){ node.setStyle('opacity', 0); };
			
			this.set('maskOpacity', this.get('mask').getStyle('opacity'));
			
			if( !this.get('visible') ){
				
				els = [
					this.get('contentBox'),
					this.get('mask'),
					this.get('throbber'),
					this.get('nav')
				];
				
				if( Y.UA.ie == 8 ){ els.push(this.get('ieFiltered')); }
				
				for( var i=0; i<els.length; i++ ){ setOpacity(els[i]); }
				
			}
			
		},
		
		/**
		* Initializes the class.
		* @method initializer
		*/
		initializer: function(){
			
			var destructible = this.get('destructible'),
				hash = {};
			
			if( Y.Lang.isArray(destructible) ){
				
				for( var i=0; i<destructible.length; i++ ){ hash[destructible[i]] = true; }
				
				this.set('destructible', hash);
				
			}
			
			if(!Y.Transition){
				
				Y.Node.prototype.transition = this.__transitionFallback;
				Y.NodeList.prototype.transition = this.__transitionFallback;
			
			}
			
		}
		
	});
	
	Y.Lightbox = Lightbox;
	