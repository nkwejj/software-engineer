// 导入express框架
const express = require('express');
// 创建express服务器实例
const app = express();
// 导入bodyparser
var bodyParser = require('body-parser');

//导入cors
const cors = require('cors');
//全局挂载
app.use(cors());

// 当extended为false时，值为数组或字符串；
// 当为true时，值为任意对象
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式数据
app.use(bodyParser.json());

// Express 中间件，用于处理错误信息并发送响应
app.use((req,res,next)=>{
    // status 为 1 为失败，默认为 1 
    res.cc = (err, status=1)=>{
        res.send({
            status,
            // 判断 err 是错误对象还是字符串
            message:err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 导入jwt
const jwtconfig = require('./jwt_config/index.js')
const {expressjwt:jwt} = require('express-jwt')
app.use(jwt({
    secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
}).unless({
    path:[/^\/api\//]
}))

// 引入路由模块
const loginRouter = require('./router/login')
app.use('/api', loginRouter)

// 对不符合joi规则的情况进行报错
app.use((req,res,next)=>{
    if(err instanceof Joi.ValidationError) return res.cc(err)
})

app.listen(3007, () => {
    console.log(`http://localhost:3007/`);
});