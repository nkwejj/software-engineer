<!--
 * @FileDescription: 登录页面
 -->

<template>
    <div id="backcont">
        <div class="meituan-content">
            <div class="login-cont">
                <div class="meituan-title">海洋牧场可视化系统登录</div>

                <el-form size="large"  class="login-content-form" :model="ruleForm" :rules="rules">
                        <el-form-item class="meituan-user" prop="userName" >
                            <td><p>账号：</p></td>
                            <td><el-input type="text" placeholder="请输入账号" v-model="ruleForm.userName" style="width: 300px;"></el-input></td>
                        </el-form-item>

                        <el-form-item class="meituan-user" prop="password">
                            <td><p>密码:</p></td>
                            <td><el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" style="width: 300px;" shpw-password></el-input></td>
                        </el-form-item>

                        <el-form-item class="yanzheng" prop="code">
                            <td><p>验证码:&nbsp;</p></td>
                            <td><el-input 	type="text" maxlength="4" placeholder="请输入验证码" v-model="ruleForm.code" style="width: 150px;"></el-input></td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <SIdentify  class="tuxing" :identifyCode="identifyCode" @click="refreshCode"></SIdentify>
                        </el-form-item>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button class="meituan-btn" type="primary" round @click="login" :load="ruleForm.load">登录</el-button>
                        <el-button class="meituan-btn" type="primary" round @click="register" :load="ruleForm.load">注册</el-button>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script>
    import{reactive, ref,onMounted}from 'vue'
    import { ElMessage } from 'element-plus'
    import router from '../router/router'
    // import {postlogin} from '../utils/index'                                        //可以删除
    import SIdentify from '../components/SIdentify.vue'

    import {
        loginPost
    } from '../api/login.js'

    export default{
        components: {
            SIdentify: SIdentify,
        },
        setup(){
            const ruleForm = reactive({
                    userName: '',
                    password: '',
                    code: '',
                    load:'false'
                })
            // 验证验证码
            const checkCode=(rule, value, callback) => {
                console.log(value,"value")
            }
            // 自定义表单验证
            const rules = reactive({
                userName: [
                            { required: true, message: '请输入账号', trigger: 'blur' },
                            { min: 6, max: 12, message: '账号长度 在 6 到 12 长度之间', trigger: 'blur' },
                        ],
                password: [
                            { required: true, message: '请输入密码', trigger: 'blur' },
                            { min: 6, max: 12, message: '密码长度 在 6 到 12 长度之间', trigger: 'blur' },
                        ],
                code: [
                            { required: true, message: '请输入验证码', trigger: 'blur' },
                            { validator: checkCode, trigger: 'change' },
                    ],
            })
            
            const login= async ()=>{
                ruleForm.load=true
                const logindata={
                    account:'',
                    password:''
                }
                logindata.account=ruleForm.userName
                logindata.password=ruleForm.password

                //验证码正确
                if(identifyCode.value==ruleForm.code){

                    // router.push('/S1')

                    // 将菜单栏的选中项ID存储到本地存储中，ID为1。
                    // localStorage.setItem('menuid',JSON.stringify('1'))

                    // // 将Token信息存储到会话存储中，表示登录成功。
                    // sessionStorage.setItem('Token',"success")

                    //此行向上删除，解封下方代码
                    
                    const res = await loginPost(logindata)

                    // console.log(res.data.status)

                    if(res.data.status == 0){
                        //存储token和account
                        sessionStorage.setItem('Token',res)
                        sessionStorage.setItem('account',logindata.account)

                        ruleForm.load=false
                        router.push('/S1')

                        //登录菜单栏主页选项高亮
                        localStorage.setItem('menuid',JSON.stringify('1'))
                    }
                    //账号密码不存在
                    else{
                        ruleForm.password=''
                        ruleForm.code=''
                        ruleForm.load=false
                        refreshCode()
                        if(res.data.status == 1){  
                            ElMessage('账号或密码错误.')
                        }
                        // else{
                        //     console.log(res)
                        //     let faildata=res.split("_")
                                
                        //     ElMessage(`您已连续尝试${faildata[2]}次均出现账号或密码错误，
                        //     目前您的账户处于锁定状态，账号锁定期间登录服务不予受理，
                        //     请于${faildata[3]}之后再次尝试`)
                        // }
                    }

                }
                //验证码错误
                else{
                    ruleForm.code=''
                    ruleForm.load=false
                    ElMessage('验证码错误.')
                    refreshCode()
                }
            }

            const register=()=>{
                ruleForm.load=true
                router.push('/register')
            }
            
            onMounted(()=>{})


            //生成图形验证码
            const identifyCode=ref('4444')
            const identifyCodes=ref('0123456789abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            const randomNum = (min, max) => {
                return Math.floor(Math.random() * (max - min) + min);
            };
            const refreshCode = () => {
                identifyCode.value = "";
                makeCode(identifyCodes, 4);
            };
            const makeCode = (o, l) => {
                for (let i = 0; i < l; i++) {
                    identifyCode.value +=
                    identifyCodes.value[randomNum(0, identifyCodes.value.length)];
                }
            };
            
            return {login,register,rules,ruleForm,
                    randomNum,refreshCode,makeCode,identifyCode
            }

        },
    }

</script>

<style scoped="scoped">
.yanzheng{
    width: 600px;
    margin-top: 0;
    margin-left: 50px;
    padding-top: 30px;
    height: 40px;
    display: flex;
    align-items: center;
}

.tuxing{
    height: 40px;
    width: 100px;
}
</style>