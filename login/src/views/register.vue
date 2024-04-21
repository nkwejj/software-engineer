<!--
 * @FileDescription: 登录页面
 -->

 <template>
    <div id="backcont">
        <div class="meituan-content">
            <div class="register-cont">
                <div class="meituan-title">海洋牧场可视化系统注册</div>

                <el-form size="large"  class="login-content-form" :model="ruleForm" :rules="rules">
                        <el-form-item class="meituan-user" prop="userName" >
                            <td><p>账号：</p></td>
                            <td><el-input type="text" placeholder="请输入账号" v-model="ruleForm.userName" style="width: 300px;"></el-input></td>
                        </el-form-item>

                        <el-form-item class="meituan-user" prop="password1">
                            <td><p>密码:</p></td>
                            <td><el-input type="password" placeholder="请输入密码" v-model="ruleForm.password1" style="width: 300px;" shpw-password></el-input></td>
                        </el-form-item>

                        <el-form-item class="meituan-user" prop="password2">
                            <td><p>密码:</p></td>
                            <td><el-input type="password" placeholder="请确认密码" v-model="ruleForm.password2" style="width: 300px;" shpw-password></el-input></td>
                        </el-form-item>

                        <el-form-item class="yanzheng" prop="code">
                            <td><p>验证码:&nbsp;</p></td>
                            <td><el-input 	type="text" maxlength="4" placeholder="请输入验证码" v-model="ruleForm.code" style="width: 150px;"></el-input></td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <SIdentify  class="tuxing" :identifyCode="identifyCode" @click="refreshCode"></SIdentify>
                        </el-form-item>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button class="meituan-btn" type="primary" round @click="register" :load="ruleForm.load">注册</el-button>
                        <el-button class="meituan-btn" type="primary" round @click="back2login" :load="ruleForm.load">返回</el-button>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script>
    import{reactive, ref,onMounted}from 'vue'
    import { ElMessage } from 'element-plus'
    import router from '../router/router'
    import SIdentify from '../components/SIdentify.vue'

    import {
        registerPost
    } from '../api/login.js'

    export default{
        components: {
            SIdentify: SIdentify,
        },
        setup(){
            const ruleForm = reactive({
                    userName: '',
                    password1: '',
                    password2: '',
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
                            { min: 6, max: 12, message: '账号长度 在 6 到 12长度之间', trigger: 'blur' },
                        ],
                password1: [
                            { required: true, message: '请输入密码', trigger: 'blur' },
                            { min: 6, max: 12, message: '密码长度 在 6 到 12长度之间', trigger: 'blur' },
                        ],
                password2: [
                            { required: true, message: '请确认密码', trigger: 'blur' },
                            { min: 6, max: 12, message: '密码长度 在 6 到 12长度之间', trigger: 'blur' },
                        ],
                code: [
                            { required: true, message: '请输入验证码', trigger: 'blur' },
                            { validator: checkCode, trigger: 'change' },
                    ],
            })
            
            const register = async ()=>{
                ruleForm.load=true
                const registerdata={
                    account:'',
                    password:''
                }
                registerdata.account=ruleForm.userName
                registerdata.password=ruleForm.password1
                

                if(ruleForm.password1 != ruleForm.password2){
                    ElMessage('两次密码输入不一致.')
                }


                 //验证码正确
                 else if(identifyCode.value==ruleForm.code){

                    const res = await registerPost(registerdata)

                    ElMessage('帐号注册成功.')

                    console.log(res)
                }
                //验证码错误
                else{
                    ruleForm.code=''
                    ruleForm.load=false
                    ElMessage('验证码错误.')
                    refreshCode()
                }
            }

            const back2login=()=>{
                
                router.push('/login')
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
            
            return {register,back2login,rules,ruleForm,
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