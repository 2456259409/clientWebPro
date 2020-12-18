<template>
    <div class="paper-class">
      填写情况
    </div>
</template>

<script>
  import Api from '../common/api';
    export default {
        name: "file-result",
      data(){
          return{
            paper:'',
            paperResult:''
          }
      },
      created() {
          // console.log(this.$route.query.id,'任建在此');
          let id = this.$route.query.id;
          if(!id){
            this.$router.push('/index/myPaper')
          }else {
            Api.apiCall('get','/paper/getById/'+id).then(resolve=>{
              this.paper=resolve.data.data;
            },reject=>{
              this.$message.error('找不到问卷了!!!');
            })
          }

          Api.apiCall('post','/paper/get_fill_result',{paperId:id}).then(resolve=>{
            console.log(resolve.data.data,'最新数据 ');
          },reject=>{

          });
      }
    }
</script>

<style scoped>
  .paper-class{
    background: #FFFFFF;
    border: 2px solid #FFFFFF;
    margin: 20px auto;
    width: 70%;
    min-height: 95%;
  }
</style>
