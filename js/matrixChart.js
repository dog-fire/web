;(function ( $, window, document, undefined ) {

	var pluginName = "MatrixChartPlugin",
	defaults = {
			/*
			list_x : [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100],
			list_y : [0,10,20,30],
			shapes:[
				{value_x : '5'  ,value_y : '0'  ,value_color : '2'},
				{value_x : '5'  ,value_y : '10' ,value_color : '2'},
				{value_x : '5'  ,value_y : '20' ,value_color : '3'},
				{value_x : '5'  ,value_y : '30' ,value_color : '4'},
				{value_x : '10'  ,value_y : '0'  ,value_color : '4'},
				{value_x : '10'  ,value_y : '10' ,value_color : '3'},
				{value_x : '10'  ,value_y : '20' ,value_color : '2'},
				{value_x : '10'  ,value_y : '30' ,value_color : '1'},
				{value_x : '15'  ,value_y : '0'  ,value_color : '1'},
				{value_x : '15'  ,value_y : '10' ,value_color : '2'},
				{value_x : '15'  ,value_y : '20' ,value_color : '3'},
				{value_x : '15'  ,value_y : '30' ,value_color : '4'},
				{value_x : '20'  ,value_y : '0'  ,value_color : '4'},
				{value_x : '20'  ,value_y : '10' ,value_color : '3'},
				{value_x : '20'  ,value_y : '20' ,value_color : '2'},
				{value_x : '20'  ,value_y : '30' ,value_color : '1'},
				{value_x : '25'  ,value_y : '0'  ,value_color : '4'},
				{value_x : '25'  ,value_y : '10' ,value_color : '3'},
				{value_x : '25'  ,value_y : '20' ,value_color : '2'},
				{value_x : '25'  ,value_y : '30' ,value_color : '1'},
				{value_x : '30'  ,value_y : '0'  ,value_color : '4'},
				{value_x : '30'  ,value_y : '10' ,value_color : '3'},
				{value_x : '30'  ,value_y : '20' ,value_color : '2'},
				{value_x : '30'  ,value_y : '30' ,value_color : '1'},
				{value_x : '35'  ,value_y : '0'  ,value_color : '4'},
				{value_x : '35'  ,value_y : '10' ,value_color : '3'},
				{value_x : '35'  ,value_y : '20' ,value_color : '2'},
				{value_x : '35'  ,value_y : '30' ,value_color : '1'}
			],
			*/
			shapeSize_width:'50',
			shapeSize_height:'50',
			shapeBlank_color:'#FFFFFF',
			yAxis_line_width:'10'
	};

	// The actual plugin constructor
	function Plugin( element, options ) {
		this.element = element;

		// jQuery has an extend method that merges the
		// contents of two or more objects, storing the
		// result in the first object. The first object
		// is generally empty because we don't want to alter
		// the default options for future instances of the plugin
		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {

			init: function() {
				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.options
				// you can add more functions like the one below and
				// call them like so: this.yourOtherFunction(this.element, this.options).


				this._contentInit();
				
				this._yAxisUnitDraw();
				this._yAxisDraw();
				this._shapeDraw();
				this._shapeOutput();
				this._xAxisDraw();
				this._xAxisUnitDraw();
				this._legendDraw();
				
			},

			_privatefunction : function() {

			},

			publicfunction : function() {

			},

			//ex: xk_Shape_0_Item_0
			getParser_id : function(aStrId) {
				var re = /\-/g;
				var tmp = strId.split('_');
				var info = {
					value_x : tmp[2].toString().replace(re,"."),
					value_y : tmp[3].toString().replace(re,".")
				};

				return info;
			},

			//ex: xk_Shape_0_Item_0
			_getMakeId : function(aValueX, aValueY) {
				var re = /\./g;				 
				var strId = "xk_";
				strId += "Shape_" + aValueX.toString().replace(re,"-") + "_" + aValueY.toString().replace(re,"-");
				return strId;
			},

			_contentInit : function() {
				var this_width = (this.options.list_x.length + 1) * Number(this.options.shapeSize_width) + Number(this.options.yAxis_line_width); 
				this_width = this_width + 100;
				var this_height = this.options.list_y.length * Number(this.options.shapeSize_height);

				$(this.element).css({
					'width' : this_width + 'px',
					'height' : this_height + 'px',
					'padding-top' :'10px'
				});
			},
			
			_legendDraw : function() {
				var legendDiv = $('<div></div>');
				
				legendDiv.css({
					'width' : $(this.element).css("width"),
					'height' : "40px",
					//'padding-top' : '10px',
					//'padding-left' : '600px',					
					'position' : 'absolute',
					'top' : '550px',
					'left' : '10px'
						
				});
				
				var colorDiv = $('<div></div>');
				colorDiv.css({
					'width' : '500px',
					'height' : "20px",
					'position' : 'relactive'
				});
				
				for (var i=1;i<=10;i++) {
					var legend = $('<div style="width:10px;height:10px;background:#FFCC00"></div>');
					legend.css({
						'width' : '25px',
						'height' : "20px",
						'background' : this._getColor_type1(i.toString()),
						'float' : 'left'
					});
					
					colorDiv.append(legend);
				}
				legendDiv.append(colorDiv);
				
				var textDiv = $('<div></div>');
				textDiv.css({
					'width' : '500px',
					'height' : "30px"
				});
				
				var text_1 = $('<div>low</div>');
				text_1.css({
					'width' : '115px',
					'height' : "30px",
					'float' : 'left'
				});
				textDiv.append(text_1);
				
				var text_2 = $('<div>mid</div>');
				text_2.css({
					'width' : '100px',
					'height' : "30px",
					'float' : 'left'
				});
				textDiv.append(text_2);
				
				var text_3 = $('<div>high</div>');
				text_3.css({
					'width' : '50px',
					'height' : "30px",
					'float' : 'left'
				});
				textDiv.append(text_3);
				legendDiv.append(textDiv);
				
				
				
				$(this.element).append(legendDiv);
			},
			
			_yAxisUnitDraw : function() {
				var text_3 = $('<div>(y value)</div>');
				text_3.css({
					'width' : '100px',
					'height' : "30px",
					'text-align' : 'left'
				});
				$(this.element).append(text_3);
			},

			_yAxisDraw : function() {
				var axis_y_height = Number(this.options.shapeSize_height) * this.options.list_y.length;
				var axis_y = $('<div></div>');	
				axis_y.css({
						'width' : this.options.shapeSize_width + 'px',
						'height' : axis_y_height + 'px',
						'float' : 'left'
					});

				for (var i = this.options.list_y.length-1; i >= 0; i--) {
					var shape_y = $('<div></div>');
					shape_y.css({
						'width' : this.options.shapeSize_width + 'px',
						'height' : this.options.shapeSize_height + 'px',
						'text-align' : 'right',						
						'background-color' : ""//this.options.shapeBlank_color 
					});	
					
					if (i == 0 || i == this.options.list_y.length-1) { //첫번째 마지막 출력					
						shape_y.append(this.options.list_y[i]);
					}
					else {
						if (this.options.list_y.length > 20) {
							var aa = Math.round(this.options.list_y.length / 10);
							if ((i%aa) == 0)
								shape_y.append(this.options.list_y[i]);
						}
						else {
							shape_y.append(this.options.list_y[i]);
						}
					}
					
					
						
					
					axis_y.append(shape_y);
				}
				$(this.element).append(axis_y);

				// y
				var axis_y_line = $('<div></div>');	
				axis_y_line.css({
						'width' : '10px',
						'height' : axis_y_height + 'px',
						
						'float' : 'left',
						'border-style' : 'solid',
						'border-top-width' : '0px',
						'border-bottom-width' : '0px',
						'border-left-width' : '0px',
						'border-right-width' : '1px',
						'border-right-color' : '#000000',
						'-moz-box-sizing': 'border-box',
                        '-webkit-box-sizing': 'border-box',
                        'box-sizing': 'border-box'
					});
				$(this.element).append(axis_y_line);
			},
			
			_xAxisUnitDraw : function() {
				
				
			},

			_xAxisDraw : function() {
				var axis_x_width = Number(this.options.shapeSize_width) * (this.options.list_x.length + 1) + Number(this.options.yAxis_line_width);
				var axis_x = $('<div></div>');	
				axis_x.css({
						'width' : axis_x_width + 'px',
						'height' : this.options.shapeSize_height + 'px'
					});

				var shape_tmp = $('<div></div>');
				shape_tmp.css({
						'width' : (Number(this.options.shapeSize_width) + Number(this.options.yAxis_line_width)) + 'px',
						'height' : this.options.shapeSize_height + 'px',
						'float' : 'left'						
					});	
				axis_x.append(shape_tmp);

				for (var i = 0; i < this.options.list_x.length; i++) {
					var shape_x = $('<div></div>');
					shape_x.css({
						'width' : this.options.shapeSize_width + 'px',
						'height' : this.options.shapeSize_height + 'px',
						'background-color' : "",//this.options.shapeBlank_color,
						'border-style' : 'solid',
						'border-top-width' : '1px',
						'border-bottom-width' : '0px',
						'border-left-width' : '0px',
						'border-right-width' : '0px',
						'border-top-color' : '#000000',
						'-moz-box-sizing': 'border-box',
                        '-webkit-box-sizing': 'border-box',
                        'box-sizing': 'border-box',
						'float' : 'left',
						'text-align' : 'center'
					});	
					shape_x.append(this.options.list_x[i]);
					axis_x.append(shape_x);
				}
				
				var www = (this.options.shapeSize_height * this.options.list_y.length ) + (this.options.shapeSize_height *2) + 10;
				var text_3 = $('<div>(x value)</div>');
				text_3.css({
					'width' : 100 + 'px',
					'height' : this.options.shapeSize_height + 'px',
					'position' : 'absolute',
					'top' :  + www + 'px',
					'left' : (axis_x_width-50) + 'px'
				});
				axis_x.append(text_3);
				$(this.element).append(axis_x);
			},


			_shapeDraw : function() {
				var thisPlugin = this; //
				var shapeCount = this.options.list_x.length * this.options.list_y.length;
				var shape_x_height = Number(this.options.shapeSize_height) * this.options.list_y.length;

				for (var i = 0; i < this.options.list_x.length; i++) {
					

					var shape_x = $('<div></div>');					
					shape_x.css({
						'width' : this.options.shapeSize_width + 'px',
						'height' : shape_x_height + 'px',
						'background-color' : this.options.shapeBlank_color,
						'float' : 'left'
					});

					for (var j = this.options.list_y.length-1; j >= 0; j--) {
						var shape_y = $('<div></div>');
						shape_y.css({
							'width' : this.options.shapeSize_width + 'px',
							'height' : this.options.shapeSize_height + 'px',
							'-moz-box-sizing': 'border-box',
	                        '-webkit-box-sizing': 'border-box',
	                        'box-sizing': 'border-box',
	                        'border-style' : 'solid',
	                        'border-width' : '1px',
	                        'border-color' : '#fff',//this.options.shapeBlank_color,
							'background-color' : this.options.shapeBlank_color
						});
						shape_y.attr('id',this._getMakeId(this.options.list_x[i],this.options.list_y[j]));
                		/*
						var shapeInner = $('<div></div>');
						shapeInner.css({
							'width' : this.options.shapeSize_width + 'px',
							'height' : this.options.shapeSize_height + 'px',
							'background-color' : this.options.shapeBlank_color
						});
						shape_y.append(shapeInner);
						*/
						shape_x.append(shape_y);
					}

					$(this.element).append(shape_x);
				}
				
				

			},

			_shapeOutput : function() {				
				for (var i = 0; i < this.options.shapes.length; i++) {
					var shapeItem = this.options.shapes[i];
					var strId = this._getMakeId(shapeItem.value_x,shapeItem.value_y);
					var shapeDiv =  $('#' + strId);
					//var shapeDiv =  $('#' + strId + ' div');
					shapeDiv.css({
						'-moz-box-sizing': 'border-box',
                        '-webkit-box-sizing': 'border-box',
                        'box-sizing': 'border-box',
                        'border-style' : 'solid',
                        'border-width' : '1px',
                        'border-color' : '#fff',//this.options.shapeBlank_color,
						'background-color' : this._getColor(shapeItem.value_color)
					});
				}

			},			

			_getColor_type1 : function(aColor) {
				var result = this.options.shapeBlank_color;
				switch(aColor) {
				    case '1':
				        result = '#FFCC00';
				        break;
				    case '2':
				        result = '#FFC214';
				        break;
				    case '3':
				        result = '#F4B500';
				        break;
				    case '4':
				        result = '#ECA523';
				        break;
				    case '5':
				        result = '#DD8800';
				        break;
				    case '6':
				        result = '#D27100';
				        break;
				    case '7':
				        result = '#C65B00';
				        break;
				    case '8':
				        result = '#A44D13';
				        break;
				    case '9':
				        result = '#933B00';
				        break;
				    case '10':
				        result = '#910000';
				        break;
				    default:
				        result = this.options.shapeBlank_color;
				} 
				return result;
			},

			_getColor : function(aColor) {
				var result = this.options.shapeBlank_color;
				switch(aColor) {
				    case '1':
				        result = '#ECA523';
				        break;
				    case '2':
				        result = '#DD8800';
				        break;
				    case '3':
				        result = '#D27100';
				        break;
				    case '4':
				        result = '#C65B00';
				        break;
				    case '5':
				        result = '#A44D13';
				        break;
				    case '6':
				        result = '#933B00';
				        break;
				    case '7':
				    case '8':
				    case '9':
				    case '10':
				        result = '#910000';
				        break;
				    default:
				        result = this.options.shapeBlank_color;
				} 
				return result;
			},
			

			

			testClick : function() {
			}

	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName,
						new Plugin( this, options ));
			}
		});
	};

})( jQuery, window, document );