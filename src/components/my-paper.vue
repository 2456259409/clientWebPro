<template>
  <el-table
    :data="tableData"
    border
    style="width: 80%;margin: 0 auto">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="createUsername"
      label="创建者"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="250">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      align="center"
      width="200">
      <template slot-scope="scope">{{timeComputed(scope.row.createTime)}}</template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="deletePaper(scope.row,scope.row.index)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click="editPaper(scope.row,scope.row.index)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import Api from '../common/api'
  Date.prototype.format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };

  export default {
        name: "my-paper",
        methods: {
          deletePaper(paper,index){
            Api.apiCall('get','/paper/deletePaper/'+paper.id).then(resolve=>{
              console.log(resolve,'大王来了');
              if(resolve.code===200){
                this.$message.success('删除成功');
                this.tableData.splice(index,1);
              }else {
                this.$message.error('删除失败');
              }
            })
          },
          editPaper(paper){
            console.log(paper.id,'大家好，我是消磨');
            this.$router.push({
              path:'/index/addPaper',
              query:{
                id:paper.id
              }
            })
          },
          timeComputed(time){
            let date=new Date(time).format('yyyy-MM-dd HH:mm:ss');
            return date;
          }
        },
      computed:{

      },
      created(){
        // let user = Api.getStorageItem('user');
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
        Api.apiCall('get','/paper/get_paper_byId/'+this.userInfo.id).then(resolve=>{
          console.log(resolve.data.data,'人家大侠饶命');
          this.tableData=resolve.data.data;
        })
      },
        data(){
            return{
              userInfo:'',
              tableData: []
            }
        }
    }
</script>

<style scoped>

</style>
