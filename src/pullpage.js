;(function(window,undefined){

	function Funllpage () {};

	Funllpage.prototype = {
		/**
		 * 当前页
		 */
		iCount: 0,
		/**
		 * 滚动标识
		 */
		isScroll: false,
		iskeyUp:false,
		/**
		 * 计时器
		 */
		timer:null,
		slider: $(".slider"),
		/**
		 * 浏览器大小改变时候
		 */
		onSize:function(){


			$(".slider").each(function(i, elem) {
				$(this).css({
					height: $(window).height()
				});
			});

			var scroll_top = 0;

			if (this.iCount>=4) {
				scroll_top = $(window).height()*(this.iCount-3);
			}

			//重新设置margin-top
			$("html,body").scrollTop(scroll_top);
			
		},
		/**
		 * 初始化
		 */
		init: function(e) {
			var self = this;
			var _h = window.screen.height;
			var slider = self.slider;
			slider.css({
				height: _h + "px"
			});
			$('body').css({
				height: _h + "px"
			});
			/**
			 * [description]detail与wheelDelta
判断滚轮向上或向下在浏览器中也要考虑兼容性，现在五大浏览器（IE、Opera、Safari、Firefox、Chrome）中Firefox 使用detail，其余四类使用wheelDelta；两者只在取值上不一致，代表含义一致，detail与wheelDelta只各取两个 值，detail只取±3，wheelDelta只取±120，其中正数表示为向上，负数表示向下
			 */
			$(document).on('mousewheel DOMMouseScroll', function(e) {
				if (!self.isScroll) {
					self.isScroll = true;
					var e = e.originalEvent; // 获取当前鼠标位置
					var n = e.wheelDelta || -e.detail; 
					var v = n > 0 ? 1 : -1;
					if (v > 0) {
						--self.iCount;
					} else {
						++self.iCount;
					}
					var _top = self._sliderHight(self.iCount);
					self._sliderMethod(slider, {
						width: -_top
					});
					setTimeout(function() {
						self.isScroll = false;
					}, 700);
				}
			});

			$(document).bind('keydown', function(e) {
				if (!self.isScroll) {
					self.isScroll = true;
					if (e.keyCode == 38) {
						--self.iCount;
					} else if (e.keyCode == 40) {
						++self.iCount;
					}
					var _top = self._sliderHight(self.iCount);
					self._sliderMethod(slider, {
						width: -_top
					});
					setTimeout(function() {
						self.isScroll = false;
					}, 800);
				}

			});

			$(window).resize(function() {
			  	self.onSize();
			});
		},
		/**
		 * 滑动分页的效果
		 * @param  {[type]} obj  [description] 滑动对象 slider
		 * @param  {[type]} _top [description] 滑动距离
		 */
		_sliderMethod: function(obj, _top) {
			var self = this;
			var that = _top;
			var flag = true;
			clearInterval(self.timer);
			self.timer = setInterval(function() {
				for (var prop in that) {

					var s_top = obj.css('top') != "auto" ? parseInt(parseInt(obj.css('top'))) : 0;

					var speed = (that[prop] - s_top) / 8;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

					if (s_top != that[prop]) {
						flag = false;
					}

					var _tops = s_top + speed;
					obj.css({
						top: _tops + "px"
					});

					if (flag) {
						clearInterval(self.timer);
					};
				}
			}, 40);
		},
		/**
		 * 滑动距离方法
		 * @param  {[type]} num [description] 当前页
		 * @return {[type]}     [description] 返回滑动距离
		 */
		_sliderHight: function(num) {
			var self = this;
			var slider = self.slider,
				total = slider.length,
				_h = slider.height();
			if (num < 0) {
				self.iCount = 0;
				return;
			} else if (num >= total) {
				self.iCount = total - 1;
				return;
			}
			return num * _h;
		}
	}

	new Funllpage().init();
})(window);