<template>
    <div>
      <div class="register-form">
        <el-form :model="registerForm" class="forms" :rules="rulesReg" ref="registerForm">
          <div style="border-bottom: 1px solid #EEEEEE;width: 100%;padding: 5px 0">用户注册</div>
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
        name: "register",
        data(){
          const validatePhone=(rule,value,callback)=>{
            let numReg=/^[0-9]*$/;
            let numrule=new RegExp(numReg);
            if(!numrule.test(value)){
              return callback(new Error('请输入正确的电话格式'))
            }else{
              callback();
            }
          };
          return{
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
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
              ],
              phone:[
                {required:true,message:'请输入电话号码',trigger:'blur'},
                {min:11,max:11,trigger:'blur',message:'请输入正确的电话格式'},
                {validator:validatePhone,trigger:'blur'}
              ]
            }
          }
        },
      methods:{
        submitReg(formName){
          this.$refs[formName].validate((valid)=>{
            let phone=this.registerForm.phone;
            if(valid){
              Api.LRapiCall('post','/user/register',this.registerForm).then(resolve=>{
                this.$message.success('注册成功');
                setTimeout(()=>{
                  this.$router.push('/login')
                },3000);
              });
              console.log(this.registerForm,'任建的注册')
            }
          })
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
