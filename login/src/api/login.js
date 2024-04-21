import instance from "../http/index.js"

// 注册
export const registerPost = data =>{
    const {
        account,
        password
    } = data
    return instance({
        url:"/api/register",
        method:"POST",
        data:{
            account,
            password
        }
    })
}

// 登录
export const loginPost = data =>{
    const {
        account,
        password
    } = data
    return instance({
        url:"/api/login",
        method:"POST",
        data:{
            account,
            password
        }
    })
}