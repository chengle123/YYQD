//index.js
//获取应用实例
const app = getApp();
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        dialogShow: false,
        buttons: [{text: '取消'}, {text: '确定'}],
    },
    // 分享
    bindViewShare: function(){
        wx.navigateTo({
            url: '../share/index'
        })
    },
    // 删除列表
    bindDelList(e) {
        console.log('删除列表', e)
        Dialog.confirm({
            title: '确认删除',
            message: '是否删除这条愿望！',
        }).then(() => {
            // on confirm
        }).catch(() => {
            // on cancel
        });
    },
    // 编辑列表
    bindEditList(e) {
        console.log('编辑列表', e)
    },
    //新增
    bindViewTap: function() {
        wx.navigateTo({
        //   url: '../add/index'
        url: '../collectContent/index'
        })
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                }
            })
        }
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

})
