// 导入数据库
const db = require('../db/index.js')
// 导入加密中间件
const bcrypt = require('bcrypt')
// 导入jwt，用于生成token
const jwt = require('jsonwebtoken')
// 导入jwt配置文件，用于加密和解密
const jwtconfig = require('../jwt_config/index.js')

exports.register = (req,res) =>{
    // res.send('注册')

    // req 是前端传过来的数据，也就是request
    // res 是返回给前端的数据，也就是response
    const reginfo = req.body

    // 第一步：判断前端传过来的数据是否为空
    if(!reginfo.account || !reginfo.password){
        return res.send({
            status: 1,
            message: '账号或密码不能为空'
        })
    }

    // 第二步：判断帐号是否存在
    // mysql 的 select 语句
    const sql = 'select * from users where account = ?'
    db.query(sql,reginfo.account,(err,result)=>{
        if(result.length > 0){
            return res.send({
                status: 1,
                message: '账号已存在'
            })
        }
        // 第三步：对密码进行加密
        // 需要使用加密中间件 bcrypt.js
        // 第一个参数为传入的密码，第二个参数为加密后的长度
        reginfo.password = bcrypt.hashSync(reginfo.password,10)

        // 第四步：把账号密码插入到users表里面
        const sql1 = 'insert into users set ?'
        // 注册身份
        const identity = '用户'
        // // 创建时间
        // const create_time = new Date()
        db.query(sql1,{
            account:reginfo.account,
            password:reginfo.password,
            identity
        },(err,result)=>{
            // 插入失败
            // affectedRows为影响的行数，如果插入失败，那么就没有影响的行数，也就是行数不为1
            if(result.affectedRows !== 1){
                return res.send({
                    status: 1,
                    message: '注册帐号失败'
                })
            }
            res.send({
                status: 1,
                message: '注册帐号成功'
            })
        })
    })
    
}

exports.login = (req,res) =>{
    // res.send('登录')
    const loginfo = req.body
    // 第一步：查看数据表中有没有前端传过来的帐号
    const sql = 'select * from users where account = ?'
    db.query(sql,loginfo.account,(err,result)=>{
        // 执行sql语句失败的情况，一般在数据库断开的情况会执行失败
        if(err) return res.cc(err)
        if(result.length !== 1) return res.cc('登录失败')
        // 第二步：对前端传过来的密码进行解密
        const compareResult = bcrypt.compareSync(loginfo.password,result[0].password)
        if(!compareResult){
            return res.cc('登录失败')
        }
        // 第三步：对帐号是否冻结做判定（数据库中设置字段，这里不作处理）

        // 第四步：生成返回给前端的token
        const user = {
            ...result[0],
            password:'',
            imgaeUrl:'',
            create_time:'',
            update_time:''
        }
        // 设置token的有效时长，有效期为 7h
        const tokenStr = jwt.sign(user,jwtconfig.jwtSecretKey,{
            expiresIn:'7h'
        })
        res.send({
            result:result[0],
            status:0,
            message:'登录成功',
            token:'Bearer ' + tokenStr,
        })
    })
}

