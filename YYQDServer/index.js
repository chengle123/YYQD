var MongoClient = require("mongodb").MongoClient;
const path = require('path');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let app = express();
let server = require('http').createServer(app);
app.use((req,res,next)=>{
    req.headers['content-type'] && (req.headers['content-type'] = req.headers['content-type'].replace('utf8','utf-8'));
    next();
});
app.use(bodyParser.urlencoded({ limit:'50mb', extended: false }));
app.use(bodyParser.json({limit:'50mb'}));
// app.use(express.static(path.join(__dirname, './app')));
server.listen(6788, function() {
    console.log('Ready');
});
var DB_URL = "mongodb://localhost:27017/chm";

var db;
MongoClient.connect(DB_URL, function(error, db){
    console.log('连接数据库成功!');
    db = db;
    console.log(error, db)
// selectData(db.collection('user'), {
//     wxId: 'adsf54sf4sf',
//     wxName: '测试',
// }).then(data=>{
//     console.log(data.result)
//     // dataOperation('查询用户', data.error, data.result, res);
// }).catch(error=>{
//     res.json({
//         result: 'error',
//         data: '',
//         msg: '查询用户失败',
//         code: '100002'
//     })
// })
});

// 查询用户
router.post('/getAccount', function(req, res) {
    try{
        selectData(db.collection('user'), {
            wxId: req.body.wxId,
            wxName: req.body.wxName,
        }).then(data=>{
            dataOperation('查询用户', data.error, data.result, res);
        }).catch(error=>{
            res.json({
                result: 'error',
                data: '',
                msg: '查询用户失败',
                code: '100002'
            })
        })
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '查询用户失败',
            code: '100001'
        })
	}
})

// 新增用户
router.post('/addAccount', function(req, res) {
    try{
        insertData(db.collection('user'), {
            wxId: req.body.wxId,
        }).then(data=>{
            dataOperation('新增用户', data.error, data.result, res);
        }).catch(error=>{
            res.json({
                result: 'error',
                data: '',
                msg: '新增用户失败',
                code: '100002'
            })
        })
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '新增用户失败',
            code: '100001'
        })
	}
})

// 查询愿望列表
router.post('/getQR', function(req, res) {
    try{
        selectData(db.collection('desire'), {
            userId: req.body.userId,
            delStatus: 1
        }).then(data=>{
            dataOperation('查询愿望列表', data.error, data.result, res);
        }).catch(error=>{
            res.json({
                result: 'error',
                data: '',
                msg: '查询愿望列表失败',
                code: '100002'
            })
        })
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '查询愿望列表失败',
            code: '100001'
        })
	}
})

// 新增愿望
router.post('/addDesire', function(req, res) {
    try{
        insertData(db.collection('desire'), {
            userId: req.body.userId,
            title: req.body.title,
            images: req.body.images,
            memo: req.body.memo,
            status: 0,
            delStatus: 1
        }).then(data=>{
            dataOperation('新增愿望', data.error, data.result, res);
        }).catch(error=>{
            res.json({
                result: 'error',
                data: '',
                msg: '新增愿望失败',
                code: '100002'
            })
        });
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '新增愿望失败',
            code: '100001'
        })
	}
})

// 编辑愿望
router.post('/updateDesire', function(req, res) {
    try{
        updateData(db.collection('desire'), {
            userId: req.body.userId
        }, {$set: {
            title: req.body.title,
            images: req.body.images,
            memo: req.body.memo,
            status: req.body.status,
        }}).then(data=>{
            dataOperation('编辑愿望', data.error, data.result, res);
        }).catch(error=>{
            res.json({
                result: 'error',
                data: '',
                msg: '编辑愿望失败',
                code: '100002'
            })
        });
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '编辑愿望失败',
            code: '100001'
        })
	}
})

// 删除愿望
router.post('/DelDesire', function(req, res) {
    try{
        updateData(db.collection('desire'), {
            userId: req.body.userId
        }, {$set: {
            delStatus: 0
        }}).then(data=>{
            dataOperation('删除愿望', data.error, data.result, res);
        }).catch(error=>{
            res.json({
                result: 'error',
                data: '',
                msg: '删除愿望失败',
                code: '100002'
            })
        });
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '删除愿望失败',
            code: '100001'
        })
	}
})

// 查看愿望详情
router.post('/getDesireDetail', function(req, res) {
    try{
        selectData(db.collection('desire'), {
            id: req.body.id,
        }).then(data=>{
            dataOperation('查看愿望详情', data.error, data.result, res);
        }).catch(error=>{
            res.json({
                result: 'error',
                data: '',
                msg: '查询用户失败',
                code: '100002'
            })
        })
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '查看愿望详情失败',
            code: '100001'
        })
	}
})

// 查看收藏
router.post('/getQR', function(req, res) {
    try{
        res.json({
            result: 'error',
            data: '',
            msg: '成功'
        })
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '失败',
            code: '100001'
        })
	}
})

// 查看收藏列表
router.post('/getQR', function(req, res) {
    try{
        res.json({
            result: 'error',
            data: '',
            msg: '成功'
        })
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '失败',
            code: '100001'
        })
	}
})

// 收藏分享愿望
router.post('/getQR', function(req, res) {
    try{
        res.json({
            result: 'error',
            data: '',
            msg: '成功'
        })
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '失败',
            code: '100001'
        })
	}
})

// 删除分享愿望
router.post('/getQR', function(req, res) {
    try{
        res.json({
            result: 'error',
            data: '',
            msg: '成功'
        })
	}catch(e) {
        res.json({
            result: 'error',
            data: '',
            msg: '失败',
            code: '100001'
        })
	}
})





app.use('/', router);



// 数据操作返回
function dataOperation (title, error, result, res){
    console.log(result);
    if(error){
        res.json({
            result: 'error',
            data: [],
            msg: title + '失败',
            code: '100004'
        })
    }else{
        res.json({
            result: 'success',
            data: '',
            msg: title + '成功',
            code: '100004'
        })
    }
    db.close();
}

// 数据库操作

/**
 * 用户表结构user
 * @param {int} id  {用户id}
 * @param {text} wxId   {微信id}
 * @param {text} wxName   {微信名}
 * @param {text} collection {收藏数据}
 */
/**
 * 数据表结构desire
 * @param {int} id  {愿望id}
 * @param {int} userId  {用户id}
 * @param {text} title  {标题}
 * @param {text} images {图片}
 * @param {text} memo  {备注}
 * @param {int} status {0: 未实现, 1: 已实现}
 * @param {int} delStatus {0: 已删除, 1: 未删除}
 */

// 增
function insertData(devices, data, Fn){
    // var data = {"name":"node","age":22,"addr":"nb","addTime":new Date()};
    
    return new Promise(function(resolve, reject) {
        devices.insert(data,function(error, result){
          if(error){
            return reject(error);
          }else{
            return resolve({error, result});
          }
        });
    })
}

// 改
function updateData(devices, whereData, updateDat){
    // var whereData = {"name":"node"}
    // var updateDat = {$set: {"age":26}}; //如果不用$set，替换整条数据
    return new Promise(function(resolve, reject) {
        devices.update(whereData, updateDat, function(error, result){
          if(error){
            return reject(error);
          }else{
            return resolve({error, result});
          }
        });
    })
}

// 查
function selectData(collection, whereData) {
        return new Promise(function(resolve, reject) {
            collection.find(whereData,function(error, result){
              if(error){
                return reject(error);
              }else{
                return resolve({error, result});
              }
            });
        })
        //查询数据
        // collection.find(whereData,function(error, cursor){
        // //   cursor.each(function(error,doc){
        // //       if(doc){
        // //           //console.log(doc);
        // //           if (doc.addTime) {
        // //               console.log("addTime: "+doc.addTime);
        // //           }
        // //       }
        // //   });
        //     // Fn(error, cursor);
            
        // });
}
// 删
// function deleteData(db)
// {
//     var devices = db.collection('vip');
//     var data = {"name":"node"};
//     devices.remove(data, function(error, result){
//         if (error) {
//             console.log('Error:'+ error);
//         }else{
//         }
//         db.close();
//     })
// }