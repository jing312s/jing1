/**
 * Created by 冯静 on 2019/8/28.
 */
var express=require('express');
var app=express();
//引入mongodb数据库
var db=require('./db.js');
//使用路由中间件
var router=express.Router();
//处理post请求
var bodyParser=require('body-parser');
//处理post中json的请求
app.use(bodyParser.json())
//处理post中字符串请求
app.use(bodyParser.urlencoded({ extended: false }));
// 使用静态资源
//app.use(express.static('static'));
//使用路由
app.use(router);
/*
 跨域处理
 1.代理  node-http-proxy
 2.jsonp  get方式
 3.后台解决
 设置请求响应头
 cors   get  post
 */
router.all('*',(req,res,next)=>{
    //允许所有域名进行访问
    res.header('Access-Control-Allow-Origin','*');
    //定义请求头类型
    res.header('Access-Control-Allow-Headers','content-type');
    //允许定义跨域访问的请求方式
    res.header('Access-Control-Allow-Methods','GET','POST','PUT','PATCH','DELETE','OPTIONS');
    //继续执行
    next();
})

//注册接口
router.post('/register',(req,res)=>{
    /*
    1.接收前端传输过来的值  body
     */

    var regUser={
        username:req.body.username,
        password:req.body.password,
        createAt:new Date(),
        updateAt:new Date(),
        phone:req.body.phone,
        email:req.body.email,
        tokenId:1
    }
    db.add("userData",regUser,(err,result)=>{
        if(err) throw err;
        res.send({"success":"ok"})
    })

})


//登录接口
router.get('/login',(req,res)=>{
    //接收前端传输的值 query
    //根据前端的值与数据库里面的用户数据进行对比 find
    //判断是否存在用户
    //再与数据里面的数据进行对比
    //一致时返回成功
    //前端进行登陆成功的跳转

    //接收前端传输的值
    var userData={
        username:req.query.username,
        password:req.query.password
    }

    //进行数据库的检索
    //先把数据库里面所有的数据取出
    //db.find('userData',{},(err,data)=>{
    db.find("userData",userData,(err,result)=>{
        console.log(result);
        if(result.length==0){
            res.send({'error':"无此用户"})
        }else if(result.length!=0&&result[0].password===req.query.password){
            //如果造成跨域，通过jsonp请求但未返回数据需要后端返回callback
            res.send({"success":"登录成功"})
        }
    })
    //})

})
app.listen(3000);
