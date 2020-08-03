//app.js
import {wxApiPromisify, wxsetDataPromisify} from './utils/wxApiPromisify';

App({

  /**
   * onlaunch()方法，直接检验登录
   */
  onLaunch: function() {
    var _this = this;
    // 获取登录态信息
    this.getLoginInfo()
    .then(function(res) {
      if ((typeof res !== 'undefined') && res.token) {
        //获取用户全部的授权信息
        wxApiPromisify('getSetting')
        .then(function(setting) {
          _this.gData.logined = true;
          _this.gData.userinfo = res;
          _this.gData.authsetting = setting.authSetting;
          
          //执行页面定义的回调方法
          (_this.loginedCb && typeof(_this.loginedCb) === 'function') && _this.loginedCb();

        }, function(error) {
          return Promise.reject(error);
        });
      } else {
        return Promise.reject({
          errMsg: 'LoginInfo miss token!',
        });
      }
    })
    .catch(function(error) {
      wx.showModal({
        title: 'Error',
        content: error.errMsg,
      });
      return false;
    });
  }, 
  /**
   * 公共方法：exeLogin()
   * execute login
   * 执行登录操作
   */
  exeLogin: function(loginKey, timeout = 3000) {
    var _this = this;
    return new Promise((resolve, reject) => {
      wxApiPromisify('login', {
        'timeout': timeout
      })
      .then(function(res) {
        return wxApiPromisify ('request', {
          'method': 'post',//大写？
          'url': _this.gData.api.request + '/api/User/third', //请求地址
          'header': { // 请求头
            'Content-type': 'application/x-www-form-urlencoded',
          },
          'data': {
            'code': res.code,
            'platform': 'miniwechat',
          }
        })
      })
      .then(function(res) {
        //当服务器内部错误500时，wx.request仍然会执行success回调。因此增加状态码判断。
        if (res.statusCode === 200 && res.data.code === 1) {
          //获取到自定义登录态，存入缓存。异步执行即可。无需强制同步。
          wxApiPromisify('setStorage', {
            'key': loginKey,
            'data': res.data.data.userInfo,
          });
          //userinfo里面包含有用户昵称、头像、性别等信息，以及自定义登录态的token
          resolve(res.data.data.userinfo);
        } else {
          return Promise.reject({
            'errMsg': (res.data.msg ? 'ServerApi error:' + res.data.msg : 'Fail to network request!') + ' Please feedback to manager and close the miniprogram manually.'
          });
        }
      })
      .catch(function(error) {
        reject(error);
      });
    });
  },

    /**
     * 获取自定义登录态信息
     * getLoginInfo()
     */
  getLoginInfo: function(loginKey = 'loginInfo') {
    var _this = this;
    return new Promise((resolve, reject) => {
      wxApiPromisify('checkSession')
      .then(function() {
        //登录态有效，从缓存中读取 ????????????????????????
        return wxApiPromisify('getStorage', {
          'key': loginKey
        })
        .then(function(res) {
          //获取loginkey缓存成功。有res
          if(res.data){
            //缓存命中，并且值有效
            return Promise.resolve(res.data);
          } else {
            //缓存命中，值无效，重新登录
            return _this.exeLogin(loginKey, 3000);
          }
        },
        function() {
          //获取loginkey缓存失败，无res，重新登录
          return _this.exeLogin(loginKey, 3000);
        });
      },
      function() {
        //登录态失效，无res，重新登录  ????????????????????????????????
        return _this.exeLogin(loginKey, 3000);
      })
      .then(function(res) {
        resolve(res);
      })
      .catch(function(error) {
        reject(error);
      });
    })
  },

//???????????????????????????????????????????????????????????????????????????????????????????????
//https://www.jianshu.com/p/7414a543c622
  /**
   * [exeAuth 执行用户授权流程]
   * execute authorization
   * @param  {[string]} loginKey  自定义登录态信息缓存的key
   * @param  {[Object]} data      wx.getUserInfo接口返回的数据结构一致
   * @return {[Promise]}          返回一个Promise对象
   */
  exeAuth: function(loginKey, data) {
    var _this = this;

    return new Promise((resolve, reject) => {
      wxApiPromisify('request', {
        'method': 'POST',
        'url': _this.gData.api.request + '/api/User/thirdauth',
        'header': {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        'data': {
          'platform': 'miniwechat',
          'token': _this.gData.userinfo.token,
          'encryptedData': data.encryptedData,
          'iv': data.iv,
        }
      })
      .then(function(res) {
        //排除内部服务器错误的情况500，请求有效
        if (res.statusCode === 200 && res.data.code === 1) {
          //更新app.gData中的数据
          _this.gData.authsetting['scope.userInfo'] = true;
          _this.gData.userinfo = res.data.data.userinfo;

          //更新自定义登录态的缓存数据，异步执行即可。
          wxApiPromisify('setStorage', {
            'key': loginKey,
            'data': res.data.data.userinfo
          })
          .catch(function(error) {
            //倘若异步执行的结果失败，直接清除自定义登录态缓存，再次进入小程序时系统会自动重新登录生成新的
            console.warn(error.errMsg);
            wxApiPromisify('removeStorage', {
              'key': loginKey
            });
          });

          resolve(res.data.data.userinfo);
        } else {
          return Promise.reject({
            'errMsg': res.data.msg ? 'ServerApi error:' + res.data.msg : 'Fail to network request!'
          });
        }
      }).catch(function(error) {
        reject(error);
      });
    });
  },

  /**
   * 封装小程序页面的公共方法
   * 在小程序页面onShow里调用
   * @param {Object}  pageObj   小程序页面对象Page
   * @return {Object}           返回Promise对象，resolve方法执行验证授权(特指scope.userInfo)成功后的回调函数，reject方法是验证授权失败后的回调
   */
  pageOnShowInit: function(pageObj) {
    var _this = this;
    return new Promise((resolve, reject) => {
      /**
       * 这里通过pageObj.data.authsetting == (null || undefined)
       * 来区分pageObj.onLoad方法中是否已经执行完成设置页面授权列表(pageObj.data.authsetting)的方法，
       * 
       * 因为如果已经执行完成设置页面授权列表(pageObj.data.authsetting)的方法，并且获取到的授权列表为空的话，会把pageObj.data.authsetting赋值为
       * 空对象 pageObj.data.authsetting = {} ，所以pageObj.data.authsetting倘若要初始化时，请务必初始化为 null ，不能初始化为 {}，切记！
       */
      if (pageObj.data.authsetting === null || typeof pageObj.data.authsetting === 'undefined') {
        /**
         * pageObj.onLoad是异步获取用户授权信息的，很大可能会在 pageObj.onShow 之后才返回数据
         * 这里加入authorizedCb回调函数预防，回调方法会在pageObj.onLoad拿到用户授权状态列表后调用，详看app.pageOnLoadInit()
         */
        pageObj.authorizedCb = (res) => {
          if (res.authsetting['scope.userInfo'] === true) {
            //授权成功执行resolve
            resolve();
          } else {
            reject();
          }
        }
      } else {
        if (res.authsetting['scope.userInfo'] === true) {
          //授权成功执行resolve
          resolve();
        } else {
          reject();
        }
      }
    });
  },

  /**
   * 封装小程序页面的公共方法
   * 在小程序页面onLoad里调用
   * @param {Object}  pageObj   小程序页面对象Page
   * @param {Boolean} needAuth  是否检验用户授权(scope.userInfo)
   * @return {Object}           返回Promise对象，resolve方法执行验证登录成功后且不检验授权(特指scope.userInfo)的回调函数，reject方法是验证登录失败后的回调
   */
  pageOnLoadInit: function(pageObj, needAuth = false) {
    var _this = this;
    return new Promise((resolve, reject) => {
      _this.pageGetLoginInfo(pageObj) //获取有效的登录态信息。
      .then(function(res) {
        // console.log(_this.gData.logined);
        if (res.logined === true) {
          //登录成功、无需授权
          resolve(res);

          if (needAuth) {
            if (res.authsetting['scope.userInfo'] === false || typeof res.authsetting['scope.userInfo'] === 'undefined') {
              common.navigateTo('/pages/auth/auth');
            }
          }

        } else {
          reject({
            'errMsg': 'Fail to login.Please feedback to manager.'
          });
        }
      });
    });
  },

  /**
   * 获取小程序注册时返回的自定义登录态信息（小程序页面中调用）
   * 主要是解决pageObj.onLoad 之后app.onLaunch()才返回数据的问题
   */
  pageGetLoginInfo: function(pageObj) {
    var _this = this;
    return new Promise((resolve, reject) => {
      // console.log(_this.gData.logined);
      if (_this.gData.logined == true) {
        wxsetDataPromisify(pageObj, {
          'logined': _this.gData.logined,
          'authsetting': _this.gData.authsetting,
          'userinfo': _this.gData.userinfo
        })
        .then(function(data) {
          //执行pageObj.onShow的回调方法？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
          (pageObj.authorizedCb && typeof(pageObj.authorizedCb) === 'function') && pageObj.authorizedCb(data);
          resolve(data);
        });

      } else {
        /**
         * 小程序注册时（onlaunch），登录并发起网络请求，请求可能会在 pageObj.onLoad 之后才返回数据
         * 这里加入loginedCallback回调函数来预防，回调方法会在接收到请求后台返回的数据后执行，详看app.onLaunch()
         */
        _this.loginedCb = () => {
          wxsetDataPromisify(pageObj, {
            'logined': _this.gData.logined,
            'authsetting': _this.gData.authsetting,
            'userinfo': _this.gData.userinfo
          })
          .then(function(data) {
            //执行pageObj.onShow的回调方法
            (pageObj.authorizedCb && typeof(pageObj.authorizedCb) === 'function') && pageObj.authorizedCb(data);
            resolve(data);
          });
        }
      }
    });
  },
//???????????????????????????????????????????????????????????????????????????????????????????????????????????

  /**
   * 预定义全局控制字段
   */
  gData: {
    logined: false, //用户是否登录
    authsetting: null, //用户授权结果
    userinfo: null, //用户信息(包含自定义登录态token)
    mode: 2//体检状态，用于识别tab-examination页面的展示。1：未预约；2：已预约，未开始；3：已开始
  },
  /*
  globalData: {
    userInfo: null
  },
  */
})