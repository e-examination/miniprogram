const wxApiPromisify = {

  /**
   * 对微信APIpromise化的公共函数
   */
  wxApiPromisify: (wxApiName, obj) => {
    return new Promise((resolve, reject) => {
      wx[wxApiName]({
        ...obj,  //这是啥语法？
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        }
      });
    });
  },

  /**
   * 微信API promise化的特殊案例
   */
  wxsetDataPromisify: (pageObj, obj) => {
    if (pageObj && obj){
      return new Promise((resolve, reject) => {
        pageObj.setdata(obj, resolve(obj));
      });
    }
  },
}

module.exports = wxApiPromisify;