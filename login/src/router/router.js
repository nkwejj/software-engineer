import { createRouter,createWebHashHistory } from "vue-router";
import login from '../views/login.vue'
import register from '../views/register.vue'
import S1 from '../views/S1.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            redirect:"/login"
        },
        {//登录界面
            path:"/login",
            name:"login",
            component:login
        },
        {//注册界面
            path:"/register",
            name:"register",
            component:register
        },
        {
            path:"/S1",
            name:"S1",
            component:S1
        }
    ]
});

export default router;