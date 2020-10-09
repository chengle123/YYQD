//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: ['a', 'b', 'c'],
    result: ['a', 'b']
  },
  //取消
  onCancel: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 分享
  onConfirm: function(){

  },
  // 多选
  onChange(event) {
    this.setData({
      result: event.detail
    });
  },
  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  onLoad: function () {},
  noop() {}
})
