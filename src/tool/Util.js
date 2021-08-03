/**
 * Util 工具类 补充WKEpg
 **/
;(function (window) {
  if (!(typeof window['WkEpg'] === 'object' && window['WkEpg'] !== undefined))
    window['WkEpg'] = {}
  if (
    !(
      typeof window['WkEpg'].Util === 'object' &&
      window['WkEpg'].Util !== undefined
    )
  )
    window['WkEpg'].Util = {}
  /**
   * 清空parame
   * @param url 地址
   */
  window['WkEpg'].Util.splitUrl = function (url) {
    if (url.indexOf('?') > 0) return url.split('?')[0]
    else return url
  }
  /**
   * 获取随机数组
   * @param num 最大值
   */
  window['WkEpg'].Util.getSjsz = function (num) {
    var ary = []
    for (var i = 0; i < num; i++) ary[i] = i + 1
    ary.sort(function () {
      return 0.5 - Math.random() //返回随机正负值
    })
    return ary //返回数组
  }

  /**
   * 数组排序
   * @param arr
   */
  window['WkEpg'].Util.shuffle = function (arr) {
    var i = arr.length,
      t,
      j
    while (i) {
      j = Math.floor(Math.random() * i--)
      t = arr[i]
      arr[i] = arr[j]
      arr[j] = t
    }
    return arr
  }

  /**
   * 函数节流
   * @param event 调用事件
   * @param interval 间隔时间
   * @param delaybool 关闭第一次
   */
  window['WkEpg'].Util.throttle = function (event, interval, delaybool) {
    var fn = event,
      timer,
      firstTime = true
    return function () {
      var _self = this,
        args = arguments
      if (firstTime && !!delaybool) {
        fn.apply(_self, args)
        return (firstTime = false)
      }
      if (timer) return false
      timer = setTimeout(function () {
        // 延迟一段时间执行
        clearTimeout(timer)
        timer = null
        fn.apply(_self, args)
      }, interval || 500)
    }
  }
  /**
   * 函数防抖
   * @param event 调用事件
   * @param interval 间隔时间
   */
  window['WkEpg'].Util.debounce = function (event, interval) {
    var timer,
      fn = event
    return function () {
      var args = arguments
      var _me = this
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(_me, args)
      }, interval || 500)
    }
  }
  /**
   * 通用单列
   * @param fn 调用事件
   */
  window['WkEpg'].Util.getSingle = function (fn) {
    var result
    return function () {
      return result || (result = fn.apply(this, arguments))
    }
  }
  /**
   */
  window['WkEpg'].Util.beforeFn = function (fn, beforefn) {
    return function () {
      beforefn.apply(this, arguments)
      return fn.apply(this, arguments)
    }
  }
  /**
   */
  window['WkEpg'].Util.afterFn = function (fn, afterfn) {
    return function () {
      var ret = fn.apply(this, arguments)
      afterfn.apply(this, arguments)
      return ret
    }
  }

  /**
   * 复制对象
   * @param newobj 新对象
   * @param obj 复制目标对象
   */
  window['WkEpg'].Util.installObjEvent = function (newobj, obj) {
    if (!typeof obj === 'object' && obj !== undefined) return false
    for (var i in obj) {
      newobj[i] = obj[i]
    }
  }
  /**
   * 遍历数组
   * @param ary
   * @param fn
   */
  window['WkEpg'].Util.each = function (ary, fn) {
    var ret
    for (var i = 0, l = ary.length; i < l; i++) {
      var n = ary[i]
      ret = fn.call(n, i, n)
    }
    return ret
  }
  /**
   * find
   * @param ary
   * @param fn
   * @param msg  true 找出数组中第一个符合条件的元素索引
   */
  window['WkEpg'].Util.find = function (ary, fn, msg) {
    var ret = -1,
      m = msg || false,
      o
    for (var i = 0, l = ary.length; i < l; i++) {
      var n = ary[i]
      o = fn.call(n, i, n)
      if (!!o) {
        ret = m ? i : n
        break
      }
    }
    return ret
  }
  /**
   * 类型判断
   * @param type 类型
   * @param content
   */
  window['WkEpg'].Util.isType = function (type, content) {
    return Object.prototype.toString.call(content) === '[object ' + type + ']'
  }
  /**
   * 数组
   */
  window['WkEpg'].Util.isArray = function (content) {
    return window['WkEpg'].Util.isType('Array', content)
  }
  /**
   * 空数组
   */
  window['WkEpg'].Util.isEmptyArray = function (content) {
    return window['WkEpg'].Util.isArray(content) && !content.length
  }
  /**
   * 类型是否为空
   * @param type 类型
   * @param content
   */
  window['WkEpg'].Util.isNullValue = function (value) {
    return (
      typeof value === 'undefined' ||
      (!value && value !== 0) ||
      value === '' ||
      value === 'null' ||
      value.length === 0
    )
  }

  /**
   * 创建虚拟DOM
   * @param param.tagName 节点
   * @param param.props 节点属性
   * @param param.children 子节点
   * @method render() 渲染且返回虚拟节点
   */
  window['WkEpg'].Util.elemCreator = function (param) {
    var Element,
      _tagName = param.tagName || '',
      _props = param.props || {},
      _children = param.children || []
    return {
      tagName: _tagName,
      props: _props,
      children: _children,
      render: function () {
        var propName,
          propValue,
          el = document.createElement(_tagName),
          props = _props
        for (propName in props) {
          propValue = props[propName]
          el.setAttribute(propName, propValue)
        }
        window['WkEpg'].Util.each(_children, function (index, child) {
          var childEl = null
          if (typeof child === 'object' && child.render)
            childEl = child.render()
          else childEl = document.createTextNode(child)
          el.appendChild(childEl)
        })
        return el
      }
    }
  }

  /**
   * 对象合并
   * */
  window['WkEpg'].Util.extend = function (a, b) {
    for (var key in b) {
      a[key] = b[key]
    }
    return a
  }

  /**
   * 对象合并
   * assign(obj1,obj2,....)
   * return objec
   */
  window['WkEpg'].Util.assign = function () {
    var args = Array.prototype.slice.call(arguments),
      u = this,
      o = {}
    if (args.length == 0) return false
    u.each(args, function (i, item) {
      if (typeof item === 'object' || u.isType('Object', item)) {
        for (var key in item) {
          o[key] = item[key]
        }
      }
    })
    return o
  }

  /**
   * 对象转param
   * return string
   */
  window['WkEpg'].Util.objectToParam = function (y) {
    if (!y) return ''
    var x,
      a = []
    for (x in y) a.push(x + '=' + y[x])
    return a.join('&')
  }

  /**
   * 时间格式
   * return string
   * ex: window["WkEpg"].Util.dateFormat(new Date(), 'Ymd')
   */
  window['WkEpg'].Util.dateFormat = function (time, format) {
    var t = new Date(time),
      format = format || 'Y-m-d h:i:s',
      year = t.getFullYear(),
      month = t.getMonth() + 1,
      day = t.getDate(),
      hours = t.getHours(),
      minutes = t.getMinutes(),
      seconds = t.getSeconds()
    month = month > 9 ? month : '0' + month
    day = day > 9 ? day : '0' + day
    hours = hours > 9 ? hours : '0' + hours
    minutes = minutes > 9 ? minutes : '0' + minutes
    seconds = seconds > 9 ? seconds : '0' + seconds
    var hash = {
      Y: year,
      m: month,
      d: day,
      h: hours,
      i: minutes,
      s: seconds
    }

    return format.replace(/\w/g, function (o) {
      return hash[o]
    })
  }

  /**
   * 数组过滤器
   * return array
   * ex: window["WkEpg"].Util.filter(arr, fn)
   */
  window['WkEpg'].Util.filter = function (context, fn) {
    var a = [],
      that = context
    for (var i = 0; i < that.length; i++) {
      fn(that[i], i, that) && a.push(that[i])
    }
    return a
  }

  /**
   * 根据key求两个对象数组交集
   * return array
   */
  window['WkEpg'].Util.objectInter = function (key, arr1, arr2) {
    var res,
      condition = []
    for (var i = 0; i < arr2.length; i++) {
      condition.push(arr2[i][key])
    }
    res = window['WkEpg'].Util.filter(arr1, function (v) {
      return condition.indexOf(v[key]) !== -1 // 利用filter方法来遍历是否有相同的元素
    })
    return res
  }

  /**
   * 绑定
   */
  window['WkEpg'].Util.bind = function (fn, context) {
    var self = fn
    return function () {
      return self.apply(context, arguments)
    }
  }

  /**
   *
   */
  window['WkEpg'].Util.reduce = function (arr, callback) {
    if (window['WkEpg'].Util.isEmptyArray(arr)) {
      return []
    } else {
      for (var i = 1, a = arr[0]; i < arr.length; i++) {
        a = callback(a, arr[i], i, arr)
      }
      return a
    }
  }
  /**
   *
   */
  window['WkEpg'].Util.map = function (arr, callback) {
    if (window['WkEpg'].Util.isEmptyArray(arr)) {
      return []
    } else {
      for (var i = 0, a = []; i < arr.length; i++) {
        a.push(callback(arr[i], i, arr))
      }
      return a
    }
  }
})(window)
;(function (window, document) {
  if (!(typeof window['WkEpg'] === 'object' && window['WkEpg'] !== undefined))
    window['WkEpg'] = {}
  /**
   * 事件监听
   * @method listen(key, callback) 监听器
   * @method trigger(key, data) 发送器
   * @demo
   * var Event = WkEpg.Monitor();
   * Event.trigger( 'click', 1 );
   * Event.trigger( 'click', 2 );
   * Event.listen( 'click', function( a ){
   *   console.log( a );
   * });
   */
  window['WkEpg'].Monitor = function () {
    var Event,
      global = this,
      _default = 'default'
    Event = (function () {
      var _listen,
        _trigger,
        _remove,
        _create,
        find,
        _slice = Array.prototype.slice,
        _shift = Array.prototype.shift,
        _unshift = Array.prototype.unshift,
        namespaceCache = {}

      _listen = function (key, fn, cache) {
        if (!cache[key]) cache[key] = []
        cache[key].push(fn)
      }

      _remove = function (key, cache, fn) {
        if (cache[key]) {
          if (fn) {
            for (var i = cache[key].length; i >= 0; i--) {
              if (cache[key][i] === fn) cache[key].splice(i, 1)
            }
          } else {
            cache[key] = []
          }
        }
      }

      _trigger = function () {
        var cache = _shift.call(arguments),
          key = _shift.call(arguments),
          args = arguments,
          _self = this,
          ret,
          stack = cache[key]
        if (!stack || !stack.length) return
        return window['WkEpg'].Util.each(stack, function () {
          return this.apply(_self, args)
        })
      }

      _create = function (namespace) {
        var namespace = namespace || _default
        var cache = {},
          offlineStack = []
        var ret = {
          listen: function (key, fn, last) {
            _listen(key, fn, cache)
            if (offlineStack === null) return
            if (last === 'last') {
              offlineStack.length && offlineStack.pop()()
            } else {
              window['WkEpg'].Util.each(offlineStack, function () {
                this()
              })
            }
            offlineStack = null
          },
          one: function (key, fn, last) {
            _remove(key, cache)
            this.listen(key, fn, last)
          },
          remove: function (key, fn) {
            _remove(key, cache, fn)
          },
          trigger: function () {
            var fn,
              args,
              _self = this
            _unshift.call(arguments, cache)
            args = arguments
            fn = function () {
              return _trigger.apply(_self, args)
            }
            if (offlineStack) return offlineStack.push(fn)

            return fn()
          }
        }
        return namespace
          ? namespaceCache[namespace]
            ? namespaceCache[namespace]
            : (namespaceCache[namespace] = ret)
          : ret
      }

      return {
        create: _create,
        one: function (key, fn, last) {
          var event = this.create()
          event.one(key, fn, last)
        },
        remove: function (key, fn) {
          var event = this.create()
          event.remove(key, fn)
        },
        listen: function (key, fn, last) {
          var event = this.create()
          event.listen(key, fn, last)
        },
        trigger: function () {
          var event = this.create()
          event.trigger.apply(this, arguments)
        }
      }
    })()
    return Event
  }
})(window, document)

/**
 * @MyPromise 不规范
 * @method
 *   then(onFulfilled, onRejected)
 *   catch(onRejected)
 */
;(function (window) {
  if (!(typeof window['WkEpg'] === 'object' && window['WkEpg'] !== undefined))
    window['WkEpg'] = {}

  var U = window['WkEpg'].Util

  // 三个状态：PENDING、FULFILLED、REJECTED
  var PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED'

  //
  function MyPromise(executor) {
    // 默认状态为 PENDING
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolveCallbacks = []
    this.onRejectCallbacks = []

    var my = this,
      resolve = function (value) {
        if (
          value &&
          (U.isType('Object', value) || U.isType('Function', value))
        ) {
          if (U.isType('Function', value.then)) {
            value.then(resolve, reject)
            return
          }
        }

        my.state = FULFILLED //改变状态

        my.value = value //保存结果

        U.each(my.onResolveCallbacks, function (i, item) {
          my.handleResolve(item)
        })
      },
      reject = function (reason) {
        if (my.state === PENDING) {
          my.state = REJECTED //改变状态

          my.reason = reason //保存结果

          U.each(my.onRejectCallbacks, function (i, item) {
            my.handleReject(item)
          })
        }
      }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  MyPromise.prototype.then = function (onFulfilled, onRejected) {
    var my = this,
      promise = new MyPromise(function (resolve, reject) {
        my.handleResolve({
          onFulfilled: onFulfilled || null,
          reResolve: resolve
        })
        my.handleReject({
          onRejected: onRejected || null,
          reReject: reject
        })
      })
    return promise
  }

  // 包含一个 catch 方法，并接收1个参数 onRejected
  MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
  }

  MyPromise.prototype.handleResolve = function (item) {
    if (this.state === PENDING) {
      this.onResolveCallbacks.push(item)
      return
    }
    //如果then中没有传递任何东西
    if (!item.onFulfilled) {
      item.reResolve(this.value)
      return
    }

    var ret = item.onFulfilled(this.value)

    item.reResolve(ret)
  }

  MyPromise.prototype.handleReject = function (item) {
    if (this.state === PENDING) {
      this.onRejectCallbacks.push(item)
      return
    }
    //如果then中没有传递任何东西
    if (!item.onRejected) {
      item.reReject(this.reason)
      return
    }
    // console.log(this.reason)
    var ret = item.onRejected(this.reason)
    item.reReject(ret)
  }

  // 向外暴露Promise
  window['WkEpg'].Promise = MyPromise

  // var Chain = function (fn) {
  //     this.fn = fn;
  //     this.nextFn = null;
  // };
  // Chain.prototype.setNext = function (nextFn) {
  //     return this.nextFn = nextFn;
  // };
  // Chain.prototype.request = function () {
  //     var ret = this.fn.apply(this, arguments);//执行当前方法
  //     if (ret === 'next') {//若当前方法执行完成，则请求next
  //         return this.nextFn && this.nextFn.request.apply(this.nextFn, arguments);
  //     }
  //     return ret;
  // }
  // Chain.prototype.next = function () {
  //     return this.nextFn && this.nextFn.request.apply(this.nextFn, arguments);
  // };
})(window)
