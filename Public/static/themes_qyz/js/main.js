//gsap.registerPlugin(InertiaPlugin, CSSRulePlugin, Draggable, ScrollToPlugin, ScrollTrigger, SplitText);

var utils = {
    ua: $.ua,
    // 是否为 手机
    is_phone: $.ua.device.type == 'mobile',
    // 是否为 平板
    is_tablet: $.ua.device.type == 'tablet',
    // 是否为 移动端
    is_mobile: typeof $.ua.device.type !== 'undefined',
    // 是否为 ios
    is_ios: $.ua.os.name == 'iOS',
    // 是否为 android
    is_android: $.ua.os.name == 'Android',
    // 是否为 个人微信
    is_wechat: $.ua.browser.name == 'WeChat',
    // 是否为 企业微信
    is_cochat: $.ua.ua.match(/WxWork/i) == 'wxwork',
    // 是否为 null
    is_null: function(a) {
      return (a === null);
    },
    // 是否为 undefined
    is_undefined: function(a) {
      return typeof a == 'undefined';
    },
    // 是否为空
    is_none: function(a) {
      return (this.is_null(a) || this.is_undefined(a) || a === '' || a === 'undefined');
    },
    // 是否为 true
    is_true: function(a) {
      return (a === true || a === 'true');
    },
    // 是否为 false
    is_false: function(a) {
      return (a === false || a === 'false');
    },
    // 是否为数组
    is_array: function(a) {
      return (a instanceof Array);
    },
    // 是否为数字
    is_number: function(a) {
      return ((a instanceof Number || typeof a == 'number') && !isNaN(a));
    },
    // 是否为百分数
    is_percentage: function(a) {
      return (this.is_string(a) && a.slice(-1) == '%');
    },
    // 是否为字符串
    is_string: function(a) {
      return ((a instanceof String || typeof a == 'string') && !this.is_none(a) && !this.is_true(a) && !this.is_false(a));
    },
    // 是否为函数
    is_function: function(a) {
      return (a instanceof Function || typeof a == 'function');
    },
    // 是否为布尔
    is_boolean: function(a) {
      return (a instanceof Boolean || typeof a == 'boolean' || this.is_true(a) || this.is_false(a));
    },
    // 是否为jq对象
    is_jquery: function(a) {
      return (a instanceof jQuery);
    },
    // 是否为对象
    is_object: function(a) {
      return ((a instanceof Object || typeof a == 'object') && !this.is_null(a) && !this.is_jquery(a) && !this.is_array(a) && !this.is_function(a));
    },
    // 是否为 dom 元素
    is_dom: function(a) {
      return (this.is_object(a) && a instanceof HTMLElement);
    },
    // 出发回调
    fireCallbacks: function($t, f, p) {
      if (f.length) {
        for (var i = 0; i < f.length; i++) {
          f[i].apply($t, p);
        }
      }
    },
  /**
   * rem 缩放函数
   * @param {Number} [dpx] 设计图宽度像素值;（窗口宽度大于此值时字号固定为 100px）
   * @param {Number} [mpx] 最小计算宽度像素值;（窗口宽度小于此值时字号固定为 mpx/dpx*100）
   */
    htmlSize: function (dpx, mpx) {
      foo();
  
      $(window).on('load resize', foo);
  
      function foo() {
        var ww = $(window).width() < mpx ? mpx : $(window).width();
        if (ww > dpx) {
          $('html').css({ 'font-size': '100px' });
        } else {
          $('html').css({ 'font-size': (ww / dpx) * 100 + 'px' });
        }
      }
    },
  /**
   * container 高度计算
   * 通过 x-container 的 data- 属性设置
      data-pt: true		是否为 x-container 添加 padding-top 值来填充 x-header 的高度
      data-mh: ''			元素 min-height 设置为 container 高度，多个元素逗号分隔（data-mh=".class1, .class2"）
      data-ch: ''			元素 height 设置为 container 高度，多个元素逗号分隔（data-ch=".class1, .class2"）
      data-sh: ''			元素设置为 屏幕高度减去头部高度，多个元素逗号分隔（data-sh=".class1, .class2"）
      data-wh: ''			元素 height 设置为 屏幕高度，多个元素逗号分隔（data-wh=".class1, .class2"）
   */
    contHeight: function () {
      var _this = this,
        header = $('.x-header'),
        container = $('.x-container'),
        footer = $('.x-footer'),
        padtop = !_this.is_none(container.data('pt')) ? container.data('pt') : true,
        mhelm = !_this.is_none(container.data('mh')) ? container.data('mh') : '',
        chelm = !_this.is_none(container.data('ch')) ? container.data('ch') : '',
        shelm = !_this.is_none(container.data('sh')) ? container.data('sh') : '',
        whelm = !_this.is_none(container.data('wh')) ? container.data('wh') : '';
  
      foo();
  
      $(window).on('load resize', foo);
  
      function foo() {
        var wHeight = $(window).height();
        var hHeight = header.outerHeight();
        var fHeight = footer.outerHeight();
  
        var cheight = wHeight - hHeight - fHeight;
  
        if (header.css('position') === 'fixed' || header.css('position') === 'absolute') {
          if (_this.is_true(padtop)) {
            container.css({ 'padding-top': hHeight + 'px' });
          }
          cheight = cheight + hHeight;
        }
  
        container.css({ 'min-height': cheight + 'px' });
  
        $(mhelm).each(function () {
          $(this).css({ 'min-height': container.height() + 'px' });
        });
  
        $(chelm).each(function () {
          console.log(container.height());
          
          $(this).css({ 'height': container.height() + 'px' });
        });
  
        $(shelm).each(function () {
          $(this).css({ 'height': wHeight - hHeight + 'px' });
        });
  
        $(whelm).each(function () {
          $(this).css({ 'height': wHeight + 'px' });
        });
      }
    },
  /**
   * 水平导航栏项目水平居中，运行此方法需要 .x-header 具有 .hz-nav 类名
   */
    horizontalNav: function () {
      if (!$('.x-header').hasClass('hz-nav')) return;
  
      if (!this.is_mobile) {
        getSubnavPos();
    
        $(window).on('resize', getSubnavPos);
      }
    
      function getSubnavPos() {
        $('.nav-lv2').each(function () {
          var $this = $(this);
          if ($this.hasClass('exp')) return;
    
          var wwidth = $(window).width(),
            twidth = $this.parent().width(),
            posl = $this.parent().offset().left,
            width = 0;
    
          if ((twidth / 2 + posl) > (wwidth / 2)) {
            width = (wwidth - (twidth / 2 + posl)) * 2;
          } else {
            width = (twidth / 2 + posl) * 2;
          }
    
          $this.css({ 'width': wwidth + 'px', left: -posl + 'px' }).find('.nav-grp').css({ 'width': width + 'px', 'margin-left': (twidth / 2 + posl) - (width / 2) + 'px' });
        });
      }
    },
  /**
   * 获取当前页面是否满屏
   */
    getFullScreen: function () {
      $('body').addClass('init-screen');
      foo();
  
      $(window).on('load resize scroll', foo);
  
      function foo() {
        if ($('body').outerHeight() > $(window).height()) {
          $('body').removeClass('full-screen');
        } else {
          $('body').addClass('full-screen');
        }
      }
    },
  /**
   * 禁止窗口滚动
   */
    unWinScroll: function () {
      // var stop = $(window).scrollTop();
      $('body').addClass('lock-screen');
      // $('body').css('top', -stop + 'px').addClass('lock-screen').data('stop', stop);
    },
  /**
   * 释放窗口滚动
   */
    enWinScroll: function () {
      $('body').removeClass('lock-screen');
      // $('body').css('top', '').removeClass('lock-screen');
      // $(window).scrollTop($('body').data('stop'));
    },
  /**
   * 禁止选中
   * @param {String} [elm] 类名(要加‘.’) 元素对象，多个元素逗号分隔（".class1, .class2"）
   */
    unSelect: function (elm) {
      $(elm).attr('unselectable', 'on').css({
        '-moz-user-select': '-moz-none',
        '-moz-user-select': 'none',
        '-o-user-select': 'none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none'
      }).on('selectstart', function () { return false; });
    },
  /**
   * 释放选中
   * @param {String} [elm] 类名(要加‘.’) 元素对象，多个元素逗号分隔（".class1, .class2"）
   */
    enSelect: function (elm) {
      $(elm).attr('unselectable', 'off').css({
        '-moz-user-select': 'text',
        '-moz-user-select': 'text',
        '-o-user-select': 'text',
        '-khtml-user-select': 'text',
        '-webkit-user-select': 'text',
        '-ms-user-select': 'text',
        'user-select': 'text'
      }).off('selectstart');
    }
  };
  
  /**
   * 弹窗模块
   * 非模态框，不适用整个窗体动态创建的情况，如果这种使用场景比较多，考虑将以下自运行函数命名为一个方法，动态创建后需调用一次该方法
   * @param	{string} [m='.pop-mod'] 弹窗模块包裹元素
   * @param	{string} [s='[pop-show]'] 点击该元素弹窗打开该属性值(.className)对应弹窗
   * @param	{string} [h='[pop-hide]'] 点击该元素弹窗关闭该属性值(.className)对应弹窗，空值为父级弹窗
   * @desc
   *	扩展 m 元素打开/关闭方法
   *	$(m).trigger('show');	打开弹窗
   *	$(m).trigger('hide');	关闭弹窗
   *	$(m).trigger('show', fn(m,t));	当弹窗打开时触发回调 @param m=this=当前弹窗; @param t=触发当前弹窗打开的元素;
   *	$(m).trigger('hide', fn(m,t));	当弹窗关闭时触发回调 @param m=this=当前弹窗; @param t=触发当前弹窗关闭的元素;
   *	$(m).trigger('show', [fn(m,t), true]);	打开弹窗并触发回调 @param m=this=当前弹窗; @param t=触发当前弹窗打开的元素;
   *	$(m).trigger('hide', [fn(m,t), true]);	关闭弹窗并触发回调 @param m=this=当前弹窗; @param t=触发当前弹窗关闭的元素;
   */
  
  $(function(){
      
      utils.htmlSize(750, 320);
      
      utils.getFullScreen();
  
    var mod = '.pop-mod',
      panel = '.pop-panel',
      show = '[pop-show]',
      hide = '[pop-hide]';
      
  //  document.addEventListener('touchmove', function (e) {
  //    if ($('body').hasClass('lock-screen')) {
  //      e.preventDefault();
  //    }
  //  }, { passive: false });
    
  //  $(panel).on('touchstart', tsFun);
    
  //  $(panel).on('touchmove', tmFun);
    
  //  $(mod).on('touchstart', function (e) {
  //    e.stopPropagation();
  //
  //    if (utils.is_android && !utils.is_wechat) {
  //      lock = true;
  //    }
  //  });
  //
  //  $(mod).on('touchend', function (e) {
  //    e.stopPropagation();
  //
  //    if (utils.is_android && !utils.is_wechat) {
  //      lock = false;
  //    }
  //  });
  
  //  $(mod).on('touchmove', function (e) {
  //    e.stopPropagation();
  //  });
  
    $(mod).on('show', function (e, fn, fire) {
      e.stopPropagation();
  
      if (utils.is_function(fn)) {
        $(this).data('pop-sf', fn);
  
        if (fire) {
          showFun($(this));
        }
      } else {
        showFun($(this));
      }
    });
    
    $(mod).on('hide', function (e, fn, fire) {
      e.stopPropagation();
  
      if (utils.is_function(fn)) {
        $(this).data('pop-hf', fn);
  
        if (fire) {
          hideFun($(this));
        }
      } else {
        hideFun($(this));
      }
    });
    
    $(show).on('click', function (e) {
      e.stopPropagation();
  
      var $this = $(this),
        $p = $($this.attr(replaceBrackets(show)));
  
      showFun($p, $this);
    });
    
    $(mod).find('.pop-close').on('click', function () {
      hideFun($(this).closest(mod), $(this));
    });
    
    $(hide).on('click', function (e) {
      e.stopPropagation();
  
      var $this = $(this), $p = null;
  
      if (!utils.is_undefined($(e.target).attr('pop-hide'))) {
        
        if (utils.is_none($this.attr(replaceBrackets(hide)))) {
          $p = $this.closest(mod);
        } else {
          $p = $($this.attr(replaceBrackets(hide)));
    
          if ($this.closest(mod).length > 0) {
            $p = $p.add($this.closest(mod));
          }
        }
    
        hideFun($p, $this);
      }
    });
    
    function tsFun(e) {
      var $this = $(this);
  
      $this.data('ts', e.originalEvent.targetTouches[0].pageY);
      $this.data('te', $this.scrollTop());
    }
  
    function tmFun(e) {
      var $this = $(this),
        tm = e.originalEvent.targetTouches[0].pageY;
      
          gsap.to($this, {
        duration: 0.2,
        overwrite: true,
        scrollTo: { y: 2*($this.data('ts') - tm) + $this.data('te') },
        onComplete: function () {
          $this.data('te', $this.scrollTop());
        }
      });
    }
    
    function replaceBrackets(str) {
      return str.replace(/\[|\]/g, '');
    }
  
    function showFun($m, t) {
      if ($m.length < 1) {
        return;
      }
  
      $m.addClass('x-show');
  
      utils.unWinScroll();
  
      if (!utils.is_undefined($m.data('pop-sf'))) {
        $m.data('pop-sf').call($m, $m, t || null);
      }
    }
  
    function hideFun($m, t) {
      if ($m.length < 1) {
        return;
      }
  
      $m.removeClass('x-show');
  
      var time = null;
  
      clearTimeout(time);
      time = setTimeout(function () {
        if ($m.find('video').length > 0) {
          $m.find('video').each(function () {
            this.pause();
          });
        }
      }, gsap.getProperty($m[0], 'transition-duration') * 1000);
  
      utils.enWinScroll();
  
      if (!utils.is_undefined($m.data('pop-hf'))) {
        $m.data('pop-hf').call($m, $m, t || null);
      }
    }    
      
  ///
  });
  
  function audioAutoPlay(id, p) {
      if($(id).length === 0){
          return;
      }
      
      var audio = $(id)[0],
          play = function () {
              audio.play();
              if(p){
                  audio.pause();
              }
              document.removeEventListener("touchstart", play, false);
          };
      
      if(!p){
          audio.play();
      }
      
      document.addEventListener("WeixinJSBridgeReady", function () {
          play();
      }, false);
      
      document.addEventListener('YixinJSBridgeReady', function () {
          play();
      }, false);
      
      document.addEventListener("touchstart", play, false);
  }
  
  