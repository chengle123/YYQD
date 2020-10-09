import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({
    data: {
        
    },
    // 删除列表
    bindDelList(e) {
        console.log('删除列表', e)
        Dialog.confirm({
            title: '确认删除',
            message: '是否删除xxx的愿望！',
        }).then(() => {
            // on confirm
        }).catch(() => {
            // on cancel
        });
    },
    onLoad: function () {
        
    }
})