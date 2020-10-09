let util = require('./util.js');
let constant = require('./constant.js');
let errorLog = require('./errorLog.js')


let defaultOpts = {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
};

// 支持fiddler返回不太规则的数据
function parseData(data) {
  if (!data || typeof data !== 'string') {
    return data;
  }
  data = data.trim();

  try {
    data = JSON.parse(data);
  } catch (e) {
    data = (new Function('return ' + data))();
  }
  return data;
}

// 抛出错误信息
function throwException(url, data, code) {
  let msg = data.data.msg
  wx.showToast({
    title: msg,
    icon: 'none'
  });
  throw new Error(msg);
}

/**
 * 检查错误码
 * returnData : false, 默认不返回data
 */
function checkResult(url, data, options, params) {
  data = parseData(data) || {};
  const statusCode = data.statusCode || -1;
  /*检查响应状态*/
  if (statusCode === 200) {
    const code = data.data.code;
    /* 不在正确码、特殊码范围内报错*/
    if (code != 0 && code != 200 && !options.returnData) {
      // throwException(url, data, code)
      errorLog('api_error', {
        'url': url,
        'params': params,
        'statusCode': statusCode,
        'code': code,
        'err': data && data.data && data.data.msg ? data.data.msg : '',
      })
    }
    return data;
  } else {
    errorLog('api_error', {
      'url': url,
      'params': params,
      'statusCode': statusCode,
      'err': data && data.data && data.data.msg ? data.data.msg : constant.NETWORKERROR,
    })
    wx.showToast({
      title: constant.NETWORKERROR,
      type: 'error'
    });
    throw new Error(constant.NETWORKERROR);
  }

}

/*url拼接参数*/
function stitchUrlParam(url, param) {
  let mark = url.indexOf('?') === -1 ? '?' : '&';
  return url + mark + param;
}

/*处理get请求参数*/
function getRequestParams(obj) {
  let result = '',
    temp = [];
  for (let key in obj) {
    temp.push(`${key}=${obj[key]}`)
  }
  result = temp.join('&');
  return result
}

/**
 * 正常的接口request处理
 */
function getRequestJson(url, methods = 'POST', options = {}) {
  let headerTypeIsJson = options.headerTypeIsJson;

  /**
   * 设置header
   */
  let header = 'application/x-www-form-urlencoded;charset=UTF-8';
  if (headerTypeIsJson) {
    header = 'application/json;charset=UTF-8';
  }

  /**
   * 组装data
   */
  let data = options.body || {};
  url = stitchUrlParam(url, 'openid=' + util.getOpenId());
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: {
        'content-type': header
      },
      data: data,
      method: methods,
      success: function (res) {
        resolve(checkResult(url, res, options, data));
      },
      fail: function (res) {
        wx.showToast({
          title: '网络异常请重试',
          type: 'warn'
        });
        options.fail && options.fail();
        reject(res);
        errorLog('api_error', {
          'url': url,
          'params': data,
          'err': res && res.errMsg ? res.errMsg : ''
        });
      }
    });
  });
}

function requestPost(
  url,
  data,
  options = {},
  header = {}
) {
  if (util.getOpenId()) {
    url = stitchUrlParam(url, 'openid=' + util.getOpenId());
  }
  return new Promise((resolve, reject) => {
    header = Object.assign({}, {
      'content-type': 'application/json'
    }, header);

    wx.request({
      url,
      method: 'POST',
      header,
      data,
      success: (res) => {
        resolve(checkResult(url, res, options, data));
      },
      fail: (res) => {
        wx.showToast({
          title: '网络异常请重试',
          type: 'warn'
        });
        // options.fail && options.fail();
        reject(res);

        errorLog('api_error', {
          'url': url,
          'params': data,
          'err': res && res.errMsg ? res.errMsg : ''
        })
      }
    });
  });
}

function requestGet(url, options = {}) {
  options = Object.assign({}, defaultOpts, options);
  if (options.body) {
    url = stitchUrlParam(url, getRequestParams(options.body));
    delete options.body;
  }
  return getRequestJson(url, 'GET', options);
}

module.exports = {
  requestPost,
  requestGet,
};