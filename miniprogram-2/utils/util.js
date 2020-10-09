
const formatRecodTime = (time) => {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  const hour = parseInt(time / 3600, 10)
  time %= 3600
  const minute = parseInt(time / 60, 10)
  time = parseInt(time % 60, 10)
  const second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}
/*格式化时间*/
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTime_ = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  console.log([year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':'))
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/*格式化数字*/
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/*校验手机号码*/
function checkMobile(str) {
  // let mobile =/^(13[0 - 9] | 14[5 - 9] | 15[0 - 35 - 9] | 166 | 17[0 - 8] | 18[0 - 9] | 19[89]) \d{8}$/,
  let mobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    phone = /^(0[0-9]{2,3}-?)?([2-9][0-9]{6,7})(-?[0-9]{1,4})?$/;

  if (!(mobile.test(str)) && !(phone.test(str))) {
    return false;
  }
  return true;
}

/*密码校验*/
function pwdStrength(password) {
  // let regex = /^(\w){6,20}$/;
  // return regex.test(pwd);
  let str = password;
  if (str == null || str.length < 6 || str.length > 20) {
    return false;
  }
  let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
  if (reg.test(str))
    return true;
}

/*获取会员登录code*/
function getCode() {
  let value = wx.getStorageSync('code')
  if (value) {
    return value
  } else {
    return ""
  }
}

/*获取会员登录APP_stoken*/
function getAppStoken() {
  let value = wx.getStorageSync('app_stoken')
  if (value) {
    return value
  } else {
    return ""
  }
}

/*获取微信登录access_taken*/
function getSessionKey() {
  let value = wx.getStorageSync('session_key')
  if (value) {
    return value
  } else {
    return ""
  }
}

/*获取微信用户openid*/
function getOpenId() {
  let value = wx.getStorageSync('openid')
  if (value) {
    return value
  } else {
    return ""
  }
}

/*获取微信用户已绑定的角色*/
function getCurrentTags() {
  let value = wx.getStorageSync('currentTags')
  if (value) {
    return value
  } else {
    return ""
  }
}

/*获取是否在免登录白名单中 */
function getIsInWhiteList(redirectUrl) {
  const list = getWhiteList();
  let isPermission = false;
  //console.log('getIsInWhiteList whiteList=', JSON.stringify(list));
  if (list) {
    list.map(function(listItem) {
      if (redirectUrl.indexOf(listItem.item) >= 0) {
        isPermission = true;
      }
    })
  }
  //console.log(66777, isPermission, redirectUrl, list);
  return isPermission;
}

function clearStorageLogout() {
  const whiteList = getWhiteList();
  const currentTags = getCurrentTags();
  const openid = getOpenId();
  const session_key = getSessionKey();
  const unionid = wx.getStorageSync('whiteList');
  
  wx.clearStorageSync();
  wx.setStorageSync('whiteList', whiteList);
  wx.setStorageSync('currentTags', currentTags);
  wx.setStorageSync('openid', openid);
  wx.setStorageSync('session_key', session_key);
  wx.setStorageSync('unionid', unionid);
}

/*获取免登录白名单*/
function getWhiteList() {
  const whiteList = wx.getStorageSync('whiteList')
  if (whiteList) {
    return whiteList
  } else {
    return null;
  }
}

/*获取上次免登录白名单的时间*/
function getWhiteListDate() {
  const whiteListDate = wx.getStorageSync('whiteListDate')
  if (whiteListDate) {
    return whiteListDate
  } else {
    return null;
  }
}

/*获取登录信息*/
function getLoginInfo() {
  let loginInfo = wx.getStorageSync('loginInfo')
  if (loginInfo) {
    return loginInfo
  } else {
    return {}
  }
}

/*获取跳转参数*/
function getRedirectParams(obj) {
  let result = ''
  for (let key in obj) {
    result += `&${key}=${obj[key]}`
  }
  return result
}

/*str,是否包含array中的元素*/
function IsNotcontainStr(array, str) {
  let result = true;
  array.forEach(item => {
    /*str存在于item字符串中*/
    if (str.indexOf(item) !== -1) {
      result = false;
      return false;
    }
  })
  return result
}

/* 获取完整的url，合并url与参数 */
function getFullUrl(url, params, isShareUrl) {
  console.log('getFullUrl url=',url, params)
  let paramsString = '',
    paramKey, index = 0,
    key;
  let newUrl = url;
  if (url.indexOf('#/') >= 0) {
    newUrl = url.split('#/')[1];
  }
  for (key in params) {
    const dot = index === 0 && newUrl.indexOf('?') < 0 ? '?' : '&';
    paramsString += dot + key + '=' + params[key];
    index++;
  }
  
  //hashUrl时间戳参数处理
  /*if (!isShareUrl) {
    let hashUrls;
    if (url.indexOf('#/') > 0) {
      hashUrls = url.split('#/');
    }
    if (hashUrls) {
      hashUrls[0] = getFullUrl(hashUrls[0], params);
      url = hashUrls[0] + '#/' + hashUrls[1];
    }
  }*/

  return url + paramsString;
}

/* 分解url及参数*/
function splitFullUrl(url) {
  let params = new Object();
  let hashUrls, newUrl, strs;

  //hash url
  if (url.indexOf('#/') > 0) {
    hashUrls = url.split('#/');
    url = hashUrls[1];
  }

  //
  newUrl = url;
  if (url.indexOf("?") != -1) {
    let str = url.substr(url.indexOf("?") + 1);
    strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      params[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
    newUrl = newUrl.split('?')[0];
  }
  if (hashUrls) {
    newUrl = hashUrls[0] + '#/' + newUrl;
  }
  return {
    params,
    url: newUrl,
  };
}

/**
 * 检测当前的小程序
 * 是否是最新版本，是否需要下载、更新
 */
function checkUpdateVersion(){
  //小程序更新机制
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
          updateManager.applyUpdate()
        })
        updateManager.onUpdateFailed(function () {
          wx.showModal({
            title: '已经有新版本了',
            content: '新版本已经上线，请您删除当前小程序，重新搜索打开。'
          })
        })
      }
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}
module.exports = {
  formatRecodTime,
  formatTime,
  formatTime_,
  checkMobile,
  pwdStrength,
  getAppStoken,
  getSessionKey,
  getOpenId,
  getCurrentTags,
  getLoginInfo,
  getRedirectParams,
  IsNotcontainStr,
  getIsInWhiteList,
  getWhiteList,
  getWhiteListDate,
  getFullUrl,
  splitFullUrl,
  checkUpdateVersion,
  clearStorageLogout,
  getCode
}