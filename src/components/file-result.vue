<template>
    <div class="paper-class">
      <div class="paper-title">{{paper.title}}</div>
      <div class="paper-content">
        <div v-for="(item,index) in paper.question" :key="index" class="every">
          <div>{{item.title}}</div>
          <div>{{item.type}}</div>
        </div>
      </div>
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
              // console.log(this.paper);
              let questionIds=[];
              this.paper.question.forEach((item,index)=>{
                questionIds.push(item.id);
              });
              Api.apiCall('post','/paper/get_fill_result',{paperId:id,questionIds:questionIds}).then(resolve=>{
                // console.log(resolve.data.data,'最新数据 ');
                let answers=resolve.data.data;
                this.paper.question.forEach((item,index)=>{
                  for(let i=0;i<answers.length;i++){
                    if(answers[i].questionId===item.id){
                      item.count=answers[i].count;
                      break;
                    }
                  }
                });
                console.log(this.paper,'okkkk');
              },reject=>{

              });
            },reject=>{
              this.$message.error('找不到问卷了!!!');
            })
          }
      }
    }
</script>

<style scoped>
  .paper-title{
    margin-top: 20px;
    font-size: 20px;
    color: #387BE2;
  }
  .paper-class{
    background: #FFFFFF;
    border: 2px solid #FFFFFF;
    margin: 20px auto;
    width: 70%;
    min-height: 95%;
  }
</style>
