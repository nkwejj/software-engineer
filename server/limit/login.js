// 或许数据有效性验证放在 前端 ？ 
const joi = require('joi')

// string值只能为字符串
// alphanum值为a-z A-Z 0-9

// 帐号的验证
const account = joi.string().alphanum().min(6).max(12).required()

// 密码的验证
const password = joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()

exports.login_limit = {
    // 表示对 req.body 里面的数据进行验证
    body:{
        account,
        password
    }
}