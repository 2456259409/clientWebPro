<template>
  <div>
    <div class="login-form">
      <el-form :model="loginForm" class="forms" :rules="rulesLogin" ref="loginForm" v-if="!isRegistering">
        <div style="border-bottom: 1px solid #EEEEEE;width: 100%;padding: 5px 0">用户登录</div>
        <el-form-item prop="username" style="width: 80%;">
          <el-input
            placeholder="请输入用户名"
            class="form-input"
            v-model="loginForm.username"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" style="width: 80%;">
          <el-input
            show-password
            v-model="loginForm.password"
            placeholder="请输入密码"
            class="form-input"
            clearable>
          </el-input>
        </el-form-item>
        <div class="login-reg-btn">
          <el-button type="primary" plain @click="formSubmit('loginForm')">登录</el-button>
          <el-button type="primary" plain @click="registerRJ">注册</el-button>
        </div>
      </el-form>

      <!--任建-->
      <el-form :model="registerForm" class="forms" :rules="rulesReg" ref="registerForm" v-if="isRegistering">
        <div style="border-bottom: 1px solid #EEEEEE;width: 100%;padding: 5px 0">用户注册</div>
        <el-form-item prop="username" style="width: 80%;">
          <el-input
            placeholder="请输入用户名"
            class="form-input"
            v-model="loginForm.username"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="usermail" style="width: 80%;" v-if="isRegistering">
          <el-input
            placeholder="请输入邮箱"
            class="form-input"
            v-model="loginForm.usermail"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" style="width: 80%;">
          <el-input
            show-password
            v-model="loginForm.password"
            placeholder="请输入密码"
            class="form-input"
            clearable>
          </el-input>
        </el-form-item>
        <div class="login-reg-btn">
          <el-button type="primary" plain @click="formSubmit('loginForm')" v-if="!isRegistering">登录</el-button>
          <el-button type="primary" plain @click="registerRJ" v-if="!isRegistering">{{regiMsg}}</el-button>
          <el-button type="primary" plain @click="submitReg" v-if="isRegistering">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
  </template>
<script>
  import Api from '../common/api'
  export default {
    name:'login',
    data() {
      return {
        isRegistering:false,
        regiMsg:'注册',
        loginForm:{
          username:'',
          password:'',
        },
        rulesLogin:{
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'},
            {min:2,max:12,trigger:'blur',message:'用户名位数必须在2-12位之间'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
            {min:2,max:12,trigger:'blur',message:'密码位数必须在2-12位之间'}
          ]
        },
        registerForm:{
          username:'',
          password:'',
          usermail:'',
          phone:''
        },
        rulesReg:{
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'},
            {min:2,max:12,trigger:'blur',message:'用户名位数必须在2-12位之间'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
            {min:2,max:12,trigger:'blur',message:'密码位数必须在2-12位之间'}
          ],
          usermail:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          phone:[
            {
              type: 'phone', message: '请输入正确的电话号码', trigger: ['blur', 'change']
            }
          ]
        }
      };
    },
    methods: {
      registerRJ(){
        // this.isRegistering=!this.isRegistering;
        // this.regiMsg='提交';
        this.$router.push('/register')
      },
      submitReg(formName){

      },
      async formSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {

            console.log('数据进入后台验证');
            let params={
              username:this.loginForm.username,
                password:this.loginForm.password
            };
            Api.LRapiCall('post','/user/login',params).then(resolve=>{
              // console.log(resolve,'任建');
                // console.log('返回的数据在这儿');
              // sessionStorage.setItem('user',JSON.stringify(resolve.data.data));
              Api.setStorageItem('user',resolve.data.data,10*60);
              this.$router.push('/');
            },reject=>{
              console.log(reject);
              this.$message.error(reject.data.msg);
            })
            // console.log(result,'任建');

          } else {
            console.log('error submit!!');
            return false
          }
        })
      }
    }
  };
</script>

<style acoped>
  .login-reg-btn{
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .login-form{
    border: 1px solid #EEEEEE;
    width: 20%;
    margin: 0 auto;
    height: 265px;
    margin-top: 200px;
  }
  .forms{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .form-input{
    width: 100%;
    padding: 10px 0;
  }
</style>
