<template>
  <div>
    <div class="register-form">
      <el-form :model="registerForm" class="forms"  ref="registerForm">
        <div style="border-bottom: 1px solid #EEEEEE;width: 100%;padding: 5px 0">修改用户信息</div>
        <el-form-item prop="username" style="width: 80%;margin-bottom: 10px">
          <el-input
            placeholder="请输入用户名"
            class="form-input"
            v-model="registerForm.username"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="usermail" style="width: 80%;margin-bottom: 10px">
          <el-input
            placeholder="请输入邮箱"
            class="form-input"
            v-model="registerForm.usermail"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone" style="width: 80%;margin-bottom: 10px">
          <el-input
            placeholder="请输入电话号码"
            class="form-input"
            v-model="registerForm.phone"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" style="width: 80%;margin-bottom: 10px">
          <el-input
            show-password
            v-model="registerForm.password"
            placeholder="请输入密码"
            class="form-input"
            clearable>
          </el-input>
        </el-form-item>
        <div class="login-reg-btn">
          <el-button type="primary" plain @click="submitReg('registerForm')">提交</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>

<script>
  import Api from '../common/api'
  export default {
    name: "update-info",
    data(){
      return{
        userInfo:'',
        registerForm:{
        },
      }
    },
    created(){
      let user = Api.getStorageItem('user');
      if (!user) {
        this.$router.push('/login');
      } else if (user === '过期') {
        localStorage.removeItem('user');
        this.$message.error('您的登录已经过期，请重新登录');
        this.$router.push('/login');
      } else {
        this.userInfo = user;
      }
    },
    methods:{
      submitReg(formName){
        this.registerForm.id=this.userInfo.id;
        this.registerForm.salt=this.userInfo.salt;
        // console.log(this.registerForm,'大家好，我是任建')
        Api.apiCall('post','/user/updateUser',this.registerForm).then(resolve=>{
          this.$message.success('修改成功');
          localStorage.removeItem("user");
          setTimeout(()=>{
            this.$router.push('/login')
          },3000);
        });
        // console.log(this.registerForm,'任建的注册')
      }
    }
  }
</script>

<style scoped>
  .register-form{
    border: 1px solid #EEEEEE;
    width: 20%;
    margin: 0 auto;
    margin-top: 100px;
  }
  .login-reg-btn{
    padding-bottom: 20px;
  }
</style>
