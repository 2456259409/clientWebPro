<template>
    <div class="my-container">
      <div style="padding-top: 30px">
        <span class="title">后台用户管理</span>

        <div style="display: flex;justify-content: center;align-items: center;margin-bottom: 30px;margin-top: 30px">
          <el-button type="primary" plain @click="chanegKeyword(1)">所有用户</el-button>
          <el-button type="primary" plain @click="chanegKeyword(2)">禁用中</el-button>
          <el-button type="primary" plain @click="chanegKeyword(3)">正常账号</el-button>
        </div>

        <div class="my-table">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="id"
              width="80">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              width="170">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话"
              width="170">
            </el-table-column>
            <el-table-column
              prop="usermail"
              label="邮箱"
              width="200">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="disableUser(scope.row.id,scope.$index)" type="text" size="small" v-if="scope.row.status==1">禁用账号</el-button>
                <el-button @click="ableUser(scope.row.id,scope.$index)" type="text" size="small" v-else>解禁账号</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>
</template>

<script>
  import Api from '../common/api';
    export default {
        name: "back-user",
      created() {
          let user = Api.getStorageItem('user');
          if(!user){
            this.$router.push('/login');
            return;
          }
          this.userInfo=user;
          let param={
            pageNum:0,
            pageSize:10,
            keyword:1,
            userId:this.userInfo.id
          };
          Api.apiCall('post','/user/get_users',param).then(resolve=>{
            // console.log(resolve.data);
            this.tableData=resolve.data.data;
          })
      },
      data(){
          return{
            tableData: [],
            keyword:'',
            userInfo:''
          }
      },
      methods:{
        ableUser(id,index){
          let param={
            masterUserId:this.userInfo.id,
            userId:id
          };
          Api.apiCall('post','/user/able_user',param).then(resolve=>{
            if(this.keyword!=1){
              this.tableData.splice(index,1);
            }
            this.$message({
              message:resolve.data.msg,
              type: 'success'
            },reject=>{
              this.$message.error(reject.data.msg);
            });
          });
        },
        disableUser(id,index){
          let param={
            masterUserId:this.userInfo.id,
            userId:id
          };
          Api.apiCall('post','/user/disable_user',param).then(resolve=>{
            if(this.keyword!=1){
              this.tableData.splice(index,1);
            }
            this.$message({
              message:resolve.data.msg,
              type: 'success'
            },reject=>{
              this.$message.error(reject.data.msg);
            });
          });
        },
        chanegKeyword(index){
          this.keyword=index;
          let param={
            pageNum:0,
            pageSize:10,
            keyword:this.keyword,
            userId:this.userInfo.id
          };
          Api.apiCall('post','/user/get_users',param).then(resolve=>{
            // console.log(resolve.data);
            this.tableData=resolve.data.data;
          })
        }
      }
    }
</script>

<style scoped>
  .my-table{
    margin: 10px 20px;
  }
  .title{
    color: #387BE2;
    font-size: 20px;
  }
  .my-container{
    margin: 0 auto;
    width: 70%;
    background: #ffffff;
    height: 100%;
  }
</style>
